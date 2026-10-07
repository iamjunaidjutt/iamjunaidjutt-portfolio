import type { ChatCompletionTool } from "groq-sdk/resources/chat/completions";
import { z } from "zod";

import { mailOptions, transporter } from "@/config/nodemailer";

const githubOwner = "iamjunaidjutt";

export const chatTools: ChatCompletionTool[] = [
	{
		type: "function",
		function: {
			name: "search_github",
			description: "Search Junaid's public GitHub repositories and project details.",
			parameters: {
				type: "object",
				properties: {
					query: { type: "string", description: "A short repository or project search query." },
				},
				required: ["query"],
			},
		},
	},
	{
		type: "function",
		function: {
			name: "web_search",
			description: "Search the public web for current information related to Junaid or his public projects.",
			parameters: {
				type: "object",
				properties: {
					query: { type: "string", description: "A focused web search query." },
				},
				required: ["query"],
			},
		},
	},
	{
		type: "function",
		function: {
			name: "email_follow_up",
			description: "Email Junaid a user question when the profile and available searches cannot answer it.",
			parameters: {
				type: "object",
				properties: {
					question: { type: "string", description: "The unanswered user question." },
				},
				required: ["question"],
			},
		},
	},
];

const querySchema = z.object({ query: z.string().trim().min(1).max(200) });
const questionSchema = z.object({ question: z.string().trim().min(1).max(500) });

const githubHeaders = (): HeadersInit => ({
	Accept: "application/vnd.github+json",
	"User-Agent": "iamjunaidjutt-portfolio-chatbot",
	...(process.env.GITHUB_TOKEN
		? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
		: {}),
});

const searchGithub = async (argumentsJson: string): Promise<string> => {
	const { query } = querySchema.parse(JSON.parse(argumentsJson));
	const searchQuery = `${query} user:${githubOwner}`;
	const response = await fetch(
		`https://api.github.com/search/repositories?q=${encodeURIComponent(searchQuery)}&sort=updated&per_page=5`,
		{ headers: githubHeaders(), cache: "no-store" },
	);

	if (!response.ok) {
		return "GitHub search is temporarily unavailable.";
	}

	const data = (await response.json()) as {
		items?: Array<{
			name?: string;
			html_url?: string;
			description?: string | null;
			language?: string | null;
			stargazers_count?: number;
		}>;
	};

	return JSON.stringify(
		(data.items ?? []).map((repository) => ({
			name: repository.name,
			url: repository.html_url,
			description: repository.description,
			language: repository.language,
			stars: repository.stargazers_count,
		})),
	);
};

const webSearch = async (argumentsJson: string): Promise<string> => {
	const { query } = querySchema.parse(JSON.parse(argumentsJson));
	const apiKey = process.env.TAVILY_API_KEY;

	if (!apiKey) {
		return "Web search is not configured. Use the profile and GitHub results only.";
	}

	const response = await fetch("https://api.tavily.com/search", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ api_key: apiKey, query, search_depth: "basic", max_results: 5 }),
		cache: "no-store",
	});

	if (!response.ok) {
		return "Web search is temporarily unavailable.";
	}

	const data = (await response.json()) as {
		results?: Array<{ title?: string; url?: string; content?: string }>;
	};

	return JSON.stringify(
		(data.results ?? []).map((result) => ({
			title: result.title,
			url: result.url,
			summary: result.content,
		})),
	);
};

const emailFollowUp = async (argumentsJson: string): Promise<string> => {
	const { question } = questionSchema.parse(JSON.parse(argumentsJson));

	if (!process.env.EMAIL || !process.env.EMAIL_PASSWORD) {
		return "Email follow-up is not configured.";
	}

	await transporter.sendMail({
		...mailOptions,
		subject: "Portfolio chatbot follow-up question",
		text: `A visitor asked a question the chatbot could not answer:\n\n${question}`,
	});

	return "The question was emailed to Junaid for follow-up.";
};

export const executeChatTool = async (name: string, argumentsJson: string): Promise<string> => {
	switch (name) {
		case "search_github":
			return searchGithub(argumentsJson);
		case "web_search":
			return webSearch(argumentsJson);
		case "email_follow_up":
			return emailFollowUp(argumentsJson);
		default:
			return "That tool is not available.";
	}
};
