// One place for the assistant's identity and user-facing copy. The system prompt (server)
// and the chat widget (browser) both read from here, so wording never drifts apart.

export type SectionId =
	| "about"
	| "experience"
	| "stack"
	| "training"
	| "projects"
	| "leadership";

type AssistantConfig = {
	name: string;
	tagline: string;
	launcherTitle: string;
	launcherSubtitle: string;
	contactEmail: string;
	placeholder: string;
	disclaimer: string;
	errorMessage: string;
	teasers: readonly string[];
	returningTeasers: readonly string[];
	greetings: readonly string[];
	suggestions: readonly string[];
	contextSuggestions: {
		byRoute: Record<string, readonly string[]>;
		bySection: Record<SectionId, readonly string[]>;
	};
};

export const ASSISTANT = {
	name: "Juno",
	tagline: "Junaid's AI assistant",
	launcherTitle: "Ask Juno",
	launcherSubtitle: "about Junaid's work",
	contactEmail: "info.iamjunaidjutt@gmail.com",
	placeholder: "Ask about Junaid's work...",
	disclaimer:
		"AI can make mistakes. For anything important, email Junaid directly.",
	errorMessage:
		"Something went wrong on my side. Please try again, or email Junaid directly.",
	// Shown one at a time, in this order, each time the nudge comes back. Keep the first one
	// as the main line; use a single entry if you do not want the wording to change.
	teasers: [
		"Curious what Junaid has built? Ask me about his work.",
		"Want a quick tour of his projects? Just ask.",
		"Looking for his tech stack or availability? I can help.",
		"Wondering if he's open to new roles? I can answer that.",
		"Not sure where to start? Ask me about his work.",
	],
	// Shown when the visitor has already chatted (messages.length > 1)
	returningTeasers: [
		"Anything else you'd like to know about his work?",
		"Want details on a specific project or skill?",
		"Curious about his availability or tech stack?",
		"Happy to go deeper on any project.",
		"Ask me about his projects, stack or availability.",
	],
	greetings: [
		"Hi, I'm Juno, Junaid's AI assistant. Ask me about his work, projects or skills.",
		"Hey, I'm Juno. Ask me what Junaid does, what he's built, or what he's looking for next.",
		"Hello, I'm Juno, an AI assistant on Junaid's site. What would you like to know about him?",
	],
	suggestions: [
		"What is Junaid working on right now?",
		"Which of his projects should I look at first?",
		"What is his tech stack?",
		"Is he open to new roles?",
	],
	contextSuggestions: {
		byRoute: {
			"/contact": [
				"How can I reach Junaid?",
				"What's the best way to get in touch?",
			],
			"/": [
				"What does Junaid do?",
				"What is he working on right now?",
				"Is he open to new roles?",
			],
		},
		bySection: {
			about: ["What's his background?", "Where is he based?"],
			experience: [
				"Tell me about his current role",
				"What has he built at Devsinc?",
			],
			stack: [
				"What's his main tech stack?",
				"What tools does he use daily?",
			],
			training: [
				"What courses has he taken?",
				"Tell me about his AI/ML training",
			],
			projects: [
				"What's his most interesting project?",
				"Tell me about his GitHub repos",
			],
			leadership: [
				"What leadership roles has he held?",
				"Tell me about his work at SOFTEC",
				"What did he do in the Aspire Leaders Program?",
			],
		},
	},
} as const satisfies AssistantConfig;