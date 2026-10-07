import type OpenAI from "openai";
import type {
	ChatCompletionMessageParam,
	ChatCompletionTool,
} from "openai/resources/chat/completions";

export type ChatEvent = {
	text?: string;
	status?: string;
	reset?: boolean;
	error?: string;
	done?: boolean;
};

type PendingToolCall = {
	id: string;
	name: string;
	arguments: string;
	// Gemini 3 attaches a "thought signature" to tool calls (extra_content.google.thought_signature)
	// and rejects the next request with a 400 if it is not sent back unchanged.
	extraContent?: unknown;
};
type ModelTurn = { text: string; toolCalls: PendingToolCall[] };

type ExecuteTool = (name: string, args: string, context: { ip: string }) => Promise<string>;

const MAX_TOOL_ROUNDS = 4;
const MAX_TOOL_CALLS_PER_ROUND = 3;

const TOOL_STATUS: Record<string, string> = {
	search_github: "Checking Junaid's GitHub...",
	get_github_readme: "Reading the project README...",
	list_github_files: "Looking through the repository...",
	read_github_file: "Reading a file from GitHub...",
	web_search: "Searching the web...",
	email_follow_up: "Sending your question to Junaid...",
};

// A 400 that points at the tools (bad schema, missing thought signature, a malformed
// tool call from a small model) is recoverable: answer again without tools.
export const isToolUseFailure = (error: unknown): boolean => {
	if (!error || typeof error !== "object") {
		return false;
	}

	const candidate = error as { status?: number; message?: string; error?: unknown };
	const details = `${candidate.message ?? ""} ${JSON.stringify(candidate.error ?? "")}`.toLowerCase();

	return (
		candidate.status === 400 &&
		/tool_use_failed|failed_generation|failed to call a function|thought_signature|function call|functioncall|tools\[|\btools?\b/.test(
			details,
		)
	);
};

// Used for the no-tools retry. Turns tool calls and results into plain text so the
// provider has no function-call parts left to validate.
export const flattenToolMessages = (messages: ChatCompletionMessageParam[]): ChatCompletionMessageParam[] => {
	const names = new Map<string, string>();
	const flattened: ChatCompletionMessageParam[] = [];

	for (const message of messages) {
		if (message.role === "assistant" && "tool_calls" in message && message.tool_calls?.length) {
			for (const call of message.tool_calls) {
				if (call.type === "function") {
					names.set(call.id, call.function.name);
				}
			}
			if (typeof message.content === "string" && message.content.trim()) {
				flattened.push({ role: "assistant", content: message.content });
			}
		} else if (message.role === "tool") {
			const content = typeof message.content === "string" ? message.content : "";
			flattened.push({
				role: "user",
				content: `[Result of ${names.get(message.tool_call_id) ?? "a lookup"}: ${content}]`,
			});
		} else {
			flattened.push(message);
		}
	}

	return flattened;
};

// Google recommends the default temperature (1.0) for every Gemini 3 model: lower
// values can cause looping or worse answers. Other models keep a low temperature.
export const resolveTemperature = (model: string): number | undefined => {
	const configured = process.env.LLM_TEMPERATURE;

	if (configured && Number.isFinite(Number(configured))) {
		return Number(configured);
	}

	return /^gemini-3/i.test(model) ? undefined : 0.3;
};

const REASONING_LEVELS = new Set(["none", "minimal", "low", "medium", "high"]);

const runModelTurn = async ({
	client,
	model,
	messages,
	tools,
	onText,
}: {
	client: OpenAI;
	model: string;
	messages: ChatCompletionMessageParam[];
	tools: ChatCompletionTool[];
	onText: (text: string) => void;
}): Promise<ModelTurn> => {
	const temperature = resolveTemperature(model);
	const effort = process.env.LLM_REASONING_EFFORT?.toLowerCase();

	const attempt = async (withTools: boolean): Promise<ModelTurn> => {
		const responseStream = await client.chat.completions.create({
			model,
			messages: withTools ? messages : flattenToolMessages(messages),
			max_tokens: 2500,
			stream: true,
			...(temperature === undefined ? {} : { temperature }),
			...(effort && REASONING_LEVELS.has(effort)
				? { reasoning_effort: effort as "low" }
				: {}),
			...(withTools && tools.length > 0 ? { tools, tool_choice: "auto" as const } : {}),
		});

		let text = "";
		const calls: PendingToolCall[] = [];
		const byIndex = new Map<number, PendingToolCall>();
		let current: PendingToolCall | undefined;

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
				const incoming = part as typeof part & { extra_content?: unknown };
				const hasIndex = typeof incoming.index === "number";
				let entry = hasIndex ? byIndex.get(incoming.index) : current;

				// Gemini often leaves out `index` and sends every call whole, with its own id.
				// A different id means a different call, even when the index repeats.
				const isNewCall =
					!entry || (Boolean(incoming.id) && Boolean(entry.id) && incoming.id !== entry.id);

				if (isNewCall) {
					entry = { id: incoming.id || `call_${calls.length}`, name: "", arguments: "" };
					calls.push(entry);
					if (hasIndex) {
						byIndex.set(incoming.index, entry);
					}
				}

				const target = entry as PendingToolCall;

				if (incoming.id) {
					target.id = incoming.id;
				}
				if (incoming.function?.name && !target.name) {
					target.name = incoming.function.name;
				}
				if (incoming.function?.arguments) {
					target.arguments += incoming.function.arguments;
				}
				if (incoming.extra_content) {
					target.extraContent = incoming.extra_content;
				}

				current = target;
			}
		}

		return { text, toolCalls: calls.filter((call) => call.name) };
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
	client,
	model,
	messages,
	tools,
	ip,
	sendEvent,
	execute,
	fallbackReply,
}: {
	client: OpenAI;
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
			client,
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
				function: { name: call.name, arguments: call.arguments || "{}" },
				// Sent back exactly as received (the thought signature).
				...(call.extraContent ? { extra_content: call.extraContent } : {}),
			})),
		} as ChatCompletionMessageParam);

		const results = await Promise.all(
			turn.toolCalls.map(async (call, index) => {
				// Every tool call id needs an answer, even the ones we refuse to run.
				if (index >= MAX_TOOL_CALLS_PER_ROUND) {
					return "Skipped: too many tool calls in one step.";
				}

				sendEvent({ status: TOOL_STATUS[call.name] ?? "Working on it..." });
				return execute(call.name, call.arguments || "{}", { ip });
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
