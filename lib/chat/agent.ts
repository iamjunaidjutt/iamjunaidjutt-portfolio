import type Groq from "groq-sdk";
import type {
	ChatCompletionMessageParam,
	ChatCompletionTool,
} from "groq-sdk/resources/chat/completions";

export type ChatEvent = {
	text?: string;
	status?: string;
	reset?: boolean;
	error?: string;
	done?: boolean;
};

type PendingToolCall = { id: string; name: string; arguments: string };
type ModelTurn = { text: string; toolCalls: PendingToolCall[] };

type ExecuteTool = (name: string, args: string, context: { ip: string }) => Promise<string>;

const MAX_TOOL_ROUNDS = 4;
const MAX_TOOL_CALLS_PER_ROUND = 3;

const TOOL_STATUS: Record<string, string> = {
	search_github: "Checking Junaid's GitHub...",
	get_github_readme: "Reading the project README...",
	list_github_files: "Looking through the repository...",
	read_github_file: "Reading a file from GitHub...",
	web_search: "Searching Junaid's public pages...",
	email_follow_up: "Sending your question to Junaid...",
};

// Small Llama models sometimes produce a malformed tool call. Groq reports that as a
// 400 "tool_use_failed". That is recoverable: ask again without tools.
export const isToolUseFailure = (error: unknown): boolean => {
	if (!error || typeof error !== "object") {
		return false;
	}

	const candidate = error as { status?: number; message?: string; error?: unknown };
	const details = `${candidate.message ?? ""} ${JSON.stringify(candidate.error ?? "")}`.toLowerCase();

	return (
		candidate.status === 400 &&
		(details.includes("tool_use_failed") ||
			details.includes("failed_generation") ||
			details.includes("failed to call a function"))
	);
};

const runModelTurn = async ({
	groq,
	model,
	messages,
	tools,
	onText,
}: {
	groq: Groq;
	model: string;
	messages: ChatCompletionMessageParam[];
	tools: ChatCompletionTool[];
	onText: (text: string) => void;
}): Promise<ModelTurn> => {
	const attempt = async (withTools: boolean): Promise<ModelTurn> => {
		const responseStream = await groq.chat.completions.create({
			model,
			messages,
			temperature: 0.3,
			max_tokens: 1200,
			stream: true,
			// Groq recommends low effort for browser search: higher levels browse longer
			// and use many more tokens. It is also faster for a simple Q&A bot.
			...(model.startsWith("openai/gpt-oss") ? { reasoning_effort: "low" as const } : {}),
			...(withTools ? { tools, tool_choice: "auto" as const } : {}),
		});

		let text = "";
		const calls = new Map<number, PendingToolCall>();

		for await (const chunk of responseStream) {
			const delta = chunk.choices[0]?.delta;

			if (!delta) {
				continue;
			}

			if (delta.content) {
				text += delta.content;
				onText(delta.content);
			}

			for (const part of delta.tool_calls ?? []) {
				const entry = calls.get(part.index) ?? {
					id: `call_${part.index}`,
					name: "",
					arguments: "",
				};

				if (part.id) {
					entry.id = part.id;
				}
				if (part.function?.name && !entry.name) {
					entry.name = part.function.name;
				}
				if (part.function?.arguments) {
					entry.arguments += part.function.arguments;
				}

				calls.set(part.index, entry);
			}
		}

		return {
			text,
			toolCalls: [...calls.entries()]
				.sort(([a], [b]) => a - b)
				.map(([, call]) => call)
				.filter((call) => call.name),
		};
	};

	try {
		return await attempt(tools.length > 0);
	} catch (error) {
		if (tools.length > 0 && isToolUseFailure(error)) {
			return attempt(false);
		}
		throw error;
	}
};

export async function runChatAgent({
	groq,
	model,
	messages,
	tools,
	ip,
	sendEvent,
	execute,
	fallbackReply,
}: {
	groq: Groq;
	model: string;
	messages: ChatCompletionMessageParam[];
	tools: ChatCompletionTool[];
	ip: string;
	sendEvent: (event: ChatEvent) => void;
	execute: ExecuteTool;
	fallbackReply: string;
}): Promise<void> {
	const conversation = [...messages];
	let hasText = false;

	// The last round has no tools, so the loop always ends with a written answer.
	for (let round = 0; round <= MAX_TOOL_ROUNDS; round += 1) {
		const turn = await runModelTurn({
			groq,
			model,
			messages: conversation,
			tools: round < MAX_TOOL_ROUNDS ? tools : [],
			onText: (text) => {
				if (text.trim()) {
					hasText = true;
				}
				sendEvent({ text });
			},
		});

		if (turn.toolCalls.length === 0) {
			break;
		}

		// Anything streamed before a tool call is a half-finished thought. Clear it.
		if (turn.text) {
			hasText = false;
			sendEvent({ reset: true });
		}

		conversation.push({
			role: "assistant",
			content: turn.text || null,
			tool_calls: turn.toolCalls.map((call) => ({
				id: call.id,
				type: "function" as const,
				function: { name: call.name, arguments: call.arguments },
			})),
		});

		const results = await Promise.all(
			turn.toolCalls.map(async (call, index) => {
				// Every tool_call id needs an answer, even the ones we refuse to run.
				if (index >= MAX_TOOL_CALLS_PER_ROUND) {
					return "Skipped: too many tool calls in one step.";
				}

				sendEvent({ status: TOOL_STATUS[call.name] ?? "Working on it..." });
				return execute(call.name, call.arguments, { ip });
			}),
		);

		turn.toolCalls.forEach((call, index) => {
			conversation.push({ role: "tool", tool_call_id: call.id, content: results[index] });
		});
	}

	if (!hasText) {
		sendEvent({ text: fallbackReply });
	}
	sendEvent({ done: true });
}
