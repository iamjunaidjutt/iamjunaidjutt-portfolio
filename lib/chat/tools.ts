import type { ChatCompletionTool } from "groq-sdk/resources/chat/completions";
import { z } from "zod";

import { mailOptions, transporter } from "@/config/nodemailer";
import { checkEmailLimit } from "@/lib/chat/rateLimit";

const githubOwner = "iamjunaidjutt";
const TOOL_TIMEOUT_MS = 6000;
const MAX_RESULT_CHARS = 4000;
const README_CHARS = 5000;
const CACHE_TTL_MS = 10 * 60 * 1000;

export type ToolContext = { ip: string };

/* ----------------------------- tool definitions ---------------------------- */

const searchGithubTool: ChatCompletionTool = {
	type: "function",
	function: {
		name: "search_github",
		description:
			"List or search Junaid's public GitHub repositories (name, description, language, topics, link). Use it to find which repository matches a project question. Query is optional.",
		parameters: {
			type: "object",
			properties: {
				query: {
					type: "string",
					description: "Optional keywords such as a project name or technology.",
				},
			},
		},
	},
};

const readmeTool: ChatCompletionTool = {
	type: "function",
	function: {
		name: "get_github_readme",
		description:
			"Read the README of one of Junaid's GitHub repositories to answer detailed questions about that project. Use the exact repository name returned by search_github.",
		parameters: {
			type: "object",
			properties: {
				repo: { type: "string", description: "Exact repository name." },
			},
			required: ["repo"],
		},
	},
};

const webSearchTool: ChatCompletionTool = {
	type: "function",
	function: {
		name: "web_search",
		description:
			"Search Junaid's own website and GitHub for public information that is not in the profile. Do not use it for general questions.",
		parameters: {
			type: "object",
			properties: {
				query: { type: "string", description: "A focused search query." },
			},
			required: ["query"],
		},
	},
};

const emailTool: ChatCompletionTool = {
	type: "function",
	function: {
		name: "email_follow_up",
		description:
			"Email Junaid a visitor's question. Call it ONLY after the visitor has said they want Junaid to follow up AND has typed their own email address in this chat.",
		parameters: {
			type: "object",
			properties: {
				question: { type: "string", description: "The unanswered question." },
				visitor_email: {
					type: "string",
					description: "The email address the visitor typed, so Junaid can reply.",
				},
			},
			required: ["question", "visitor_email"],
		},
	},
};

// Groq's built-in web search now only exists as "browser_search" on the gpt-oss
// models (the old Compound systems were shut down on 21 Sep 2026).
export const supportsNativeSearch = (model: string): boolean => model.startsWith("openai/gpt-oss");

// Only offer tools that can actually run, so the model never calls a dead tool.
export const getChatTools = (model = ""): ChatCompletionTool[] => {
	const tools: ChatCompletionTool[] = [searchGithubTool, readmeTool];

	if (process.env.GROQ_NATIVE_WEB_SEARCH === "true" && supportsNativeSearch(model)) {
		// Runs on Groq's servers: no function to execute here, and no domain filter.
		tools.push({ type: "browser_search" });
	} else if (process.env.TAVILY_API_KEY) {
		tools.push(webSearchTool);
	}

	if (process.env.EMAIL && process.env.EMAIL_PASSWORD) {
		tools.push(emailTool);
	}

	return tools;
};

/* --------------------------------- helpers --------------------------------- */

const cache = new Map<string, { expires: number; value: string }>();

const fromCache = (key: string): string | null => {
	const hit = cache.get(key);
	return hit && hit.expires > Date.now() ? hit.value : null;
};

const toCache = (key: string, value: string): void => {
	cache.set(key, { expires: Date.now() + CACHE_TTL_MS, value });
};

const clip = (text: string, max = MAX_RESULT_CHARS): string =>
	text.length > max ? `${text.slice(0, max)}\n[truncated]` : text;

const parseArguments = (json: string): unknown => JSON.parse(json?.trim() ? json : "{}");

const githubHeaders = (accept = "application/vnd.github+json"): HeadersInit => ({
	Accept: accept,
	"User-Agent": "iamjunaidjutt-portfolio-chatbot",
	...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
});

type Repo = {
	name: string;
	description: string | null;
	language: string | null;
	topics?: string[];
	html_url: string;
	homepage: string | null;
	fork: boolean;
	updated_at: string;
};

// One cached list call instead of GitHub's search API: unauthenticated search is
// limited to ~10 requests/minute per IP, and Vercel shares IPs between sites.
const fetchRepos = async (): Promise<Repo[] | null> => {
	const cached = fromCache("repos");

	if (cached) {
		return JSON.parse(cached) as Repo[];
	}

	const response = await fetch(
		`https://api.github.com/users/${githubOwner}/repos?type=owner&sort=updated&per_page=100`,
		{ headers: githubHeaders(), cache: "no-store", signal: AbortSignal.timeout(TOOL_TIMEOUT_MS) },
	);

	if (!response.ok) {
		return null;
	}

	const repos = (await response.json()) as Repo[];
	toCache("repos", JSON.stringify(repos));
	return repos;
};

const STOP_WORDS = new Set([
	"the", "and", "for", "with", "his", "him", "has", "have", "that", "this", "what",
	"which", "show", "list", "about", "tell", "project", "projects", "repo", "repos",
	"repository", "repositories", "github", "code", "built", "made", "junaid",
]);

/* ---------------------------------- tools ---------------------------------- */

const searchGithub = async (argumentsJson: string): Promise<string> => {
	const { query } = z
		.object({ query: z.string().trim().max(200).optional() })
		.parse(parseArguments(argumentsJson));
	const repos = await fetchRepos();

	if (!repos) {
		return "GitHub is temporarily unavailable.";
	}

	const own = repos.filter((repo) => !repo.fork);
	const tokens = (query ?? "")
		.toLowerCase()
		.split(/[^a-z0-9.+#]+/)
		.filter((token) => token.length > 1 && !STOP_WORDS.has(token));

	const scored = own
		.map((repo) => {
			const haystack = `${repo.name} ${repo.description ?? ""} ${repo.language ?? ""} ${(repo.topics ?? []).join(" ")}`
				.toLowerCase()
				.replace(/[-_]/g, " ");
			return { repo, score: tokens.filter((token) => haystack.includes(token)).length };
		})
		.filter((item) => item.score > 0)
		.sort((a, b) => b.score - a.score);

	const matched = scored.length > 0;
	const picked = (matched ? scored.map((item) => item.repo) : own).slice(0, 8);

	return clip(
		JSON.stringify({
			note: matched ? "Best matches first." : "No keyword match; showing the most recently updated repositories.",
			repositories: picked.map((repo) => ({
				name: repo.name,
				description: repo.description,
				language: repo.language,
				topics: repo.topics ?? [],
				url: repo.html_url,
				live_site: repo.homepage || null,
				last_updated: repo.updated_at?.slice(0, 10),
			})),
		}),
	);
};

const getGithubReadme = async (argumentsJson: string): Promise<string> => {
	const { repo } = z
		.object({
			repo: z
				.string()
				.trim()
				.regex(/^[A-Za-z0-9._-]{1,100}$/)
				.refine((value) => !value.includes("..")),
		})
		.parse(parseArguments(argumentsJson));

	const key = `readme:${repo.toLowerCase()}`;
	const cached = fromCache(key);

	if (cached) {
		return cached;
	}

	const response = await fetch(
		`https://api.github.com/repos/${githubOwner}/${encodeURIComponent(repo)}/readme`,
		{
			headers: githubHeaders("application/vnd.github.raw+json"),
			cache: "no-store",
			signal: AbortSignal.timeout(TOOL_TIMEOUT_MS),
		},
	);

	if (response.status === 404) {
		return "No README was found for that repository.";
	}

	if (!response.ok) {
		return "GitHub is temporarily unavailable.";
	}

	const text = (await response.text())
		.replace(/!\[[^\]]*\]\([^)]*\)/g, "") // images and badges
		.replace(/<[^>]+>/g, "") // raw HTML
		.replace(/\n{3,}/g, "\n\n")
		.trim();
	const result = clip(text || "The README is empty.", README_CHARS);
	toCache(key, result);
	return result;
};

const webSearch = async (argumentsJson: string): Promise<string> => {
	const { query } = z
		.object({ query: z.string().trim().min(1).max(200) })
		.parse(parseArguments(argumentsJson));
	const apiKey = process.env.TAVILY_API_KEY;

	if (!apiKey) {
		return "Web search is not configured. Use the profile and GitHub results only.";
	}

	const response = await fetch("https://api.tavily.com/search", {
		method: "POST",
		headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
		body: JSON.stringify({
			query: `${query} ${githubOwner}`,
			search_depth: "basic",
			max_results: 5,
			// Limited to Junaid's own pages: an open search for "Muhammad Junaid" returns
			// other people with the same name, and the bot would attribute it to him.
			include_domains: ["iamjunaidjutt.vercel.app", "github.com"],
		}),
		cache: "no-store",
		signal: AbortSignal.timeout(TOOL_TIMEOUT_MS),
	});

	if (!response.ok) {
		return "Web search is temporarily unavailable.";
	}

	const data = (await response.json()) as {
		results?: Array<{ title?: string; url?: string; content?: string }>;
	};

	return clip(
		JSON.stringify(
			(data.results ?? []).map((result) => ({
				title: result.title,
				url: result.url,
				summary: result.content?.slice(0, 500),
			})),
		),
	);
};

const emailFollowUp = async (argumentsJson: string, context: ToolContext): Promise<string> => {
	const { question, visitor_email: visitorEmail } = z
		.object({
			question: z.string().trim().min(1).max(500),
			visitor_email: z.string().trim().email().max(120),
		})
		.parse(parseArguments(argumentsJson));

	if (!process.env.EMAIL || !process.env.EMAIL_PASSWORD) {
		return "Email follow-up is not configured.";
	}

	if (!(await checkEmailLimit(context.ip))) {
		return "The email limit for today has been reached. Ask the visitor to use the contact form on the website instead.";
	}

	await transporter.sendMail({
		...mailOptions,
		replyTo: visitorEmail,
		subject: "Portfolio chatbot follow-up question",
		text: `A visitor asked a question the chatbot could not answer.\n\nReply to: ${visitorEmail}\n\nQuestion:\n${question}`,
	});

	return "The question was emailed to Junaid. He can reply to the visitor's email address.";
};

export const executeChatTool = async (
	name: string,
	argumentsJson: string,
	context: ToolContext,
): Promise<string> => {
	try {
		switch (name) {
			case "search_github":
				return await searchGithub(argumentsJson);
			case "get_github_readme":
				return await getGithubReadme(argumentsJson);
			case "web_search":
				return await webSearch(argumentsJson);
			case "email_follow_up":
				return await emailFollowUp(argumentsJson, context);
			default:
				return "That tool is not available.";
		}
	} catch {
		// Never throw out of a tool: the model should get a readable failure and recover,
		// not turn one bad tool call into a failed chat.
		return "The tool failed. Say you could not check that, and do not guess.";
	}
};
