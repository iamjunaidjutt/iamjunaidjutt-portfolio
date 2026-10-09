import { ASSISTANT } from "./assistant";
import type { SectionId } from "@/config/sections";

export function getStarterSuggestions({ pathname, section }: { pathname: string; section: SectionId | null }): readonly string[] {
	if (pathname === "/contact" && ASSISTANT.contextSuggestions.byRoute["/contact"]) {
		return ASSISTANT.contextSuggestions.byRoute["/contact"];
	}

	if (pathname === "/" && section && ASSISTANT.contextSuggestions.bySection[section as keyof typeof ASSISTANT.contextSuggestions.bySection]) {
		return ASSISTANT.contextSuggestions.bySection[section as keyof typeof ASSISTANT.contextSuggestions.bySection];
	}

	return ASSISTANT.suggestions;
}

export function deriveFollowUps(question: string, answer: string): string[] {
	const lowerQuestion = question.toLowerCase();
	const lowerAnswer = answer.toLowerCase();
	const chips: string[] = [];

	const add = (chip: string) => {
		if (!chips.includes(chip) && chips.length < 3) chips.push(chip);
	};

	if (lowerAnswer.includes("github") || lowerAnswer.includes("repo")) {
		add("Tell me about his repositories");
	}
	if (lowerAnswer.includes("devsinc") && !lowerQuestion.includes("devsinc")) {
		add("What did he build at Devsinc?");
	}
	if (lowerQuestion.includes("skill") || lowerQuestion.includes("stack")) {
		add("Where did he learn those?");
	}
	if (lowerAnswer.includes("course") || lowerAnswer.includes("training")) {
		add("Tell me about his personal projects");
	}
	if (lowerAnswer.includes("project")) {
		add("What tech stack does he normally use?");
	}

	if (chips.length === 0) {
		add("How can I reach him?");
	}

	return chips;
}
