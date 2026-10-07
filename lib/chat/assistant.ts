// One place for the assistant's identity. The system prompt (server) and the chat
// widget (browser) both read from here, so the name and wording never drift apart.
export const ASSISTANT = {
	name: "Juno",
	tagline: "Junaid's AI assistant",
	launcherTitle: "Ask Juno",
	launcherSubtitle: "about Junaid's work",
	teaser: "Curious what Junaid has built? Ask me anything.",
	greetings: [
		"Hi, I'm Juno, Junaid's AI assistant. Ask me about his work, projects or skills, and I'll tell you what I know.",
		"Hey there, I'm Juno. I can tell you about Junaid's work, what he's built, and what he's looking for next.",
		"Hello! I'm Juno, the AI assistant on Junaid's site. What would you like to know about him?",
	],
	suggestions: [
		"What is Junaid working on right now?",
		"Which of his projects should I look at first?",
		"What is his tech stack?",
		"Is he open to new roles?",
	],
} as const;
