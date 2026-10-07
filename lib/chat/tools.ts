import type { ChatCompletionTool } from "openai/resources/chat/completions";
import { z } from "zod";

import { mailOptions, transporter } from "@/config/nodemailer";
import { checkEmailLimit } from "@/lib/chat/rateLimit";

const githubOwner = "iamjunaidjutt";
const TOOL_TIMEOUT_MS = 6000;
const MAX_RESULT_CHARS = 4000;
const README_CHARS = 5000;
const FILE_CHARS = 6000;
const MAX_FILE_BYTES = 400_000;
const INDEX_TIMEOUT_MS = 2500;
const CACHE_TTL_MS = 10 * 60 * 1000;

export type ToolContext = { ip: string };

/* ----------------------------- tool definitions ---------------------------- */

const searchGithubTool: ChatCompletionTool = {
	type: "function",
	function: {
		name: "search_github",
		description:
			"List or search ALL of Junaid's public GitHub repositories, including forks (name, language, description, link). Leave query empty to list everything. Use it to find which repository matches a project, course or technology.",
		parameters: {
			type: "object",
			properties: {
				query: {
					type: "string",
					description: "Optional keywords such as a project name or technology. Empty means list all.",
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
			"Read the README of one of Junaid's GitHub repositories. Use the exact repository name from the repository list.",
		parameters: {
			type: "object",
			properties: { repo: { type: "string", description: "Exact repository name." } },
			required: ["repo"],
		},
	},
};

const listFilesTool: ChatCompletionTool = {
	type: "function",
	function: {
		name: "list_github_files",
		description:
			"List the files and folders inside a repository (or a folder of it). Use it to see how a repository is organised, for example which folders hold the individual projects of a course.",
		parameters: {
			type: "object",
			properties: {
				repo: { type: "string", description: "Exact repository name." },
				path: { type: "string", description: "Optional folder path. Empty means the repository root." },
			},
			required: ["repo"],
		},
	},
};

const readFileTool: ChatCompletionTool = {
	type: "function",
	function: {
		name: "read_github_file",
		description:
			"Read one text file from a repository (README, markdown, source code or a Jupyter notebook). Long files are truncated.",
		parameters: {
			type: "object",
			properties: {
				repo: { type: "string", description: "Exact repository name." },
				path: { type: "string", description: "File path inside the repository." },
			},
			required: ["repo", "path"],
		},
	},
};

const webSearchTool: ChatCompletionTool = {
	type: "function",
	function: {
		name: "web_search",
		description:
			"Search the web. scope 'junaid' (default) searches only Junaid's own website and GitHub. scope 'general' searches the open web: use it ONLY to explain a public course, tool, company or technology that Junaid mentions (for example a course syllabus). General results describe that thing, never Junaid.",
		parameters: {
			type: "object",
			properties: {
				query: { type: "string", description: "A focused search query." },
				scope: { type: "string", enum: ["junaid", "general"], description: "Where to search." },
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

// Only offer tools that can actually run, so the model never calls a dead tool.
// Add this helper to detect if Gemini native search should handle web queries
export const isGeminiNativeSearchEnabled = (model = "", baseURL = ""): boolean => {
    const isGeminiEndpoint =
        baseURL.includes("generativelanguage.googleapis.com") ||
        model.toLowerCase().startsWith("gemini");
    const isEnabled = process.env.GEMINI_NATIVE_SEARCH === "true";

    return isGeminiEndpoint && isEnabled;
};

// Only offer tools that can actually run, so the model never calls a dead tool
export const getChatTools = (model = "", baseURL = ""): ChatCompletionTool[] => {
    const tools: ChatCompletionTool[] = [searchGithubTool, readmeTool, listFilesTool, readFileTool];

    // Priority 1: Gemini Native Search Grounding
    // If Gemini native search is enabled, Google's servers run search automatically
    // without invoking your local client execution tool.
    const useGeminiNative = isGeminiNativeSearchEnabled(model, baseURL);

    // Priority 2: Fallback to Tavily custom function tool
    if (!useGeminiNative && process.env.TAVILY_API_KEY) {
        tools.push(webSearchTool);
    }

    if (process.env.EMAIL && process.env.EMAIL_PASSWORD) {
        tools.push(emailTool);
    }

    return tools;
};

/* --------------------------------- helpers --------------------------------- */

const cache = new Map<string, { expires: number; value: string }>();

const fromCache = (key: string, allowStale = false): string | null => {
	const hit = cache.get(key);
	return hit && (allowStale || hit.expires > Date.now()) ? hit.value : null;
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

// One cached list call instead of GitHub's search API: unauthenticated requests are
// limited to 60 per hour per IP, and Vercel shares IPs between many sites. Set
// GITHUB_TOKEN (read-only, no extra permissions) to raise that limit. If GitHub
// fails, the last good list is reused.
const fetchRepos = async (timeoutMs = TOOL_TIMEOUT_MS): Promise<Repo[] | null> => {
	const fresh = fromCache("repos");

	if (fresh) {
		return JSON.parse(fresh) as Repo[];
	}

	try {
		const response = await fetch(
			`https://api.github.com/users/${githubOwner}/repos?type=owner&sort=updated&per_page=100`,
			{ headers: githubHeaders(), cache: "no-store", signal: AbortSignal.timeout(timeoutMs) },
		);

		if (response.ok) {
			const repos = (await response.json()) as Repo[];
			toCache("repos", JSON.stringify(repos));
			return repos;
		}
	} catch {
		// fall through to the stale copy
	}

	const stale = fromCache("repos", true);
	return stale ? (JSON.parse(stale) as Repo[]) : null;
};

const compactLine = (repo: Repo): string => {
	const description = (repo.description ?? "").replace(/\s+/g, " ").slice(0, 90);
	const tags = [repo.language, repo.fork ? "fork of someone else's repository" : null].filter(Boolean);
	return `- ${repo.name}${tags.length ? ` (${tags.join(", ")})` : ""}${description ? `: ${description}` : ""}`;
};

// A short list of every public repository, added to the system prompt so questions
// like "list all his repos" work even when the model does not call a tool.
export const getRepoIndex = async (): Promise<string> => {
	const repos = await fetchRepos(INDEX_TIMEOUT_MS);

	if (!repos || repos.length === 0) {
		return "";
	}

	return `Public repositories on github.com/${githubOwner} (${repos.length} in total). Forks are other people's work that Junaid copied to study; never say he wrote them.\n${repos.map(compactLine).join("\n")}`;
};

const STOP_WORDS = new Set([
	"the", "and", "for", "with", "his", "him", "has", "have", "that", "this", "what",
	"which", "show", "list", "about", "tell", "project", "projects", "repo", "repos",
	"repository", "repositories", "github", "code", "built", "made", "junaid", "all",
	"every", "everything", "any", "some", "many", "public", "his", "their", "give",
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

	const tokens = (query ?? "")
		.toLowerCase()
		.split(/[^a-z0-9.+#]+/)
		.filter((token) => token.length > 1 && !STOP_WORDS.has(token));

	const scored = repos
		.map((repo) => {
			const haystack = `${repo.name} ${repo.description ?? ""} ${repo.language ?? ""} ${(repo.topics ?? []).join(" ")}`
				.toLowerCase()
				.replace(/[-_]/g, " ");
			return { repo, score: tokens.filter((token) => haystack.includes(token)).length };
		})
		.filter((item) => item.score > 0)
		.sort((a, b) => b.score - a.score);

	// No real keywords ("list all his repos") or nothing matched: return everything.
	if (tokens.length === 0 || scored.length === 0) {
		return clip(
			`${tokens.length === 0 ? "All" : "No keyword match; showing all"} ${repos.length} public repositories. Forks are other people's work.\n${repos.map(compactLine).join("\n")}`,
			MAX_RESULT_CHARS * 2,
		);
	}

	return clip(
		JSON.stringify({
			note: "Best matches first. Forks are other people's work that Junaid copied.",
			repositories: scored.slice(0, 8).map(({ repo }) => ({
				name: repo.name,
				fork: repo.fork,
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
		.object({ repo: repoSchema })
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

const repoSchema = z
	.string()
	.trim()
	.regex(/^[A-Za-z0-9._-]{1,100}$/)
	.refine((value) => !value.includes(".."));

const noTraversal = (value: string): boolean => !value.split("/").includes("..");

const pathBase = z
	.string()
	.trim()
	.max(200)
	.regex(/^[A-Za-z0-9._@ /()+-]*$/);

const pathSchema = pathBase.refine(noTraversal);
const filePathSchema = pathBase.min(1).refine(noTraversal);

const encodePath = (path: string): string =>
	path
		.split("/")
		.filter(Boolean)
		.map(encodeURIComponent)
		.join("/");

const TEXT_FILE = /\.(md|mdx|txt|py|ipynb|js|jsx|ts|tsx|json|toml|ya?ml|cfg|ini|sh|sql|java|cs|html|css)$/i;
const BLOCKED_FILE = /(^|\/)(\.env[^/]*|.*\.(pem|key|p12)|id_rsa[^/]*)$/i;

const notebookToText = (raw: string): string => {
	try {
		const notebook = JSON.parse(raw) as {
			cells?: Array<{ cell_type?: string; source?: string[] | string }>;
		};
		const join = (source?: string[] | string) => (Array.isArray(source) ? source.join("") : (source ?? ""));

		return (notebook.cells ?? [])
			.map((cell) =>
				cell.cell_type === "markdown"
					? join(cell.source)
					: cell.cell_type === "code"
						? `[code]\n${join(cell.source).split("\n").slice(0, 25).join("\n")}`
						: "",
			)
			.filter(Boolean)
			.join("\n\n");
	} catch {
		return raw;
	}
};

const listGithubFiles = async (argumentsJson: string): Promise<string> => {
	const { repo, path } = z
		.object({ repo: repoSchema, path: pathSchema.optional() })
		.parse(parseArguments(argumentsJson));
	const key = `tree:${repo.toLowerCase()}:${path ?? ""}`;
	const cached = fromCache(key);

	if (cached) {
		return cached;
	}

	const response = await fetch(
		`https://api.github.com/repos/${githubOwner}/${encodeURIComponent(repo)}/contents/${encodePath(path ?? "")}`,
		{ headers: githubHeaders(), cache: "no-store", signal: AbortSignal.timeout(TOOL_TIMEOUT_MS) },
	);

	if (response.status === 404) {
		return "That repository or folder was not found.";
	}

	if (!response.ok) {
		return "GitHub is temporarily unavailable.";
	}

	const data = (await response.json()) as unknown;

	if (!Array.isArray(data)) {
		return "That path is a file, not a folder. Use read_github_file.";
	}

	const entries = (data as Array<{ name: string; type: string; size?: number }>)
		.slice(0, 80)
		.map((entry) => `${entry.type === "dir" ? "[dir]" : "[file]"} ${entry.name}`)
		.join("\n");
	const result = clip(entries || "The folder is empty.");
	toCache(key, result);
	return result;
};

const readGithubFile = async (argumentsJson: string): Promise<string> => {
	const { repo, path } = z
		.object({ repo: repoSchema, path: filePathSchema })
		.parse(parseArguments(argumentsJson));

	if (!TEXT_FILE.test(path) || BLOCKED_FILE.test(path)) {
		return "That file type cannot be read.";
	}

	const key = `file:${repo.toLowerCase()}:${path}`;
	const cached = fromCache(key);

	if (cached) {
		return cached;
	}

	const response = await fetch(
		`https://api.github.com/repos/${githubOwner}/${encodeURIComponent(repo)}/contents/${encodePath(path)}`,
		{
			headers: githubHeaders("application/vnd.github.raw+json"),
			cache: "no-store",
			signal: AbortSignal.timeout(TOOL_TIMEOUT_MS),
		},
	);

	if (response.status === 404) {
		return "That file was not found.";
	}

	if (!response.ok) {
		return "GitHub is temporarily unavailable.";
	}

	if (Number(response.headers.get("content-length")) > MAX_FILE_BYTES) {
		return "That file is too large to read.";
	}

	let text = await response.text();

	if (/\.ipynb$/i.test(path)) {
		text = notebookToText(text);
	}

	const result = clip(
		text.replace(/!\[[^\]]*\]\([^)]*\)/g, "").replace(/\n{3,}/g, "\n\n").trim() || "The file is empty.",
		FILE_CHARS,
	);
	toCache(key, result);
	return result;
};

const webSearch = async (argumentsJson: string): Promise<string> => {
	const { query, scope } = z
		.object({
			query: z.string().trim().min(1).max(200),
			scope: z.enum(["junaid", "general"]).optional(),
		})
		.parse(parseArguments(argumentsJson));
	const apiKey = process.env.TAVILY_API_KEY;
	const general = scope === "general";

	if (!apiKey) {
		return "Web search is not configured. Use the profile and GitHub results only.";
	}

	const response = await fetch("https://api.tavily.com/search", {
		method: "POST",
		headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
		body: JSON.stringify({
			// "junaid" scope stays on his own pages: an open search for "Muhammad Junaid"
			// returns other people with the same name. "general" is for explaining a public
			// course, tool or company, so it searches the open web.
			query: general ? query : `${query} ${githubOwner}`,
			search_depth: "basic",
			max_results: 5,
			...(general ? {} : { include_domains: ["iamjunaidjutt.vercel.app", "github.com"] }),
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
			case "list_github_files":
				return await listGithubFiles(argumentsJson);
			case "read_github_file":
				return await readGithubFile(argumentsJson);
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
