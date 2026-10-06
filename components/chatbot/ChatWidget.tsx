"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
	Bot,
	Loader2,
	MessageCircle,
	Plus,
	RotateCcw,
	Send,
	X,
} from "lucide-react";
import type { Components } from "react-markdown";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useEffect, useRef, useState } from "react";

type Message = {
	role: "user" | "assistant";
	content: string;
};

const welcomeMessages = [
	"Hi, I'm Junaid's AI assistant. I can help you explore his work, projects, skills, and experience. What would you like to know?",
	"Welcome. I'm Junaid's AI assistant, here to help you learn about his work, projects, and technical background.",
	"Hello! I'm Junaid's AI assistant. Ask me about his role, projects, skills, or career experience.",
];

const initialMessage: Message = { role: "assistant", content: welcomeMessages[0] };
const legacyWelcomeMessage =
	"Hi! I can answer questions about Junaid's work, projects and skills. What would you like to know?";

const createWelcomeMessage = (): Message => ({
	role: "assistant",
	content: welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)],
});

const chatStorageKey = "junaid-portfolio-chat-history";
const maxStoredMessages = 50;

const isStoredMessage = (value: unknown): value is Message => {
	if (!value || typeof value !== "object") {
		return false;
	}

	const message = value as Partial<Message>;
	return (
		(message.role === "user" || message.role === "assistant") &&
		typeof message.content === "string"
	);
};

const getStoredMessages = (): Message[] => {
	if (typeof window === "undefined") {
		return [initialMessage];
	}

	try {
		const storedValue = localStorage.getItem(chatStorageKey);
		if (!storedValue) {
			return [initialMessage];
		}

		const parsedValue: unknown = JSON.parse(storedValue);
		if (!Array.isArray(parsedValue)) {
			return [initialMessage];
		}

		const messages = parsedValue.filter(isStoredMessage).slice(-maxStoredMessages);
		if (messages[0]?.role === "assistant" && messages[0].content === legacyWelcomeMessage) {
			messages[0] = initialMessage;
		}
		return messages.length > 0 ? messages : [initialMessage];
	} catch {
		return [initialMessage];
	}
};

const normalizeAssistantMarkdown = (content: string): string =>
	content
		.replace(
			/([^\n])(?=\*\*(?:Current Role|Key Responsibilities|Impact|Tools & Technologies)\*\*)/g,
			"$1\n",
		)
		.replace(
			/(### (?:Current Role|Primary Project|Key Responsibilities|Impact|Tools & Technologies))(?=\S)/gi,
			"$1\n",
		)
		.replace(/(^#{1,6}\s+[^\n]*?[a-z])(?=[A-Z][a-z])/gm, "$1\n")
		.replace(/([^\n])\s*-\s+(?=(?:\*\*|[A-Z]))/g, "$1\n- ")
		.replace(
			/(^|\n)(\s*[-*+]\s+[^\n]+)\n(?!\s*(?:[-*+]|#{1,6}\s)|\s*$)/gm,
			"$1$2 ",
		)
		.replace(/\n[ \t]*\n(?=[ \t]*[-*+]\s+)/g, "\n")
		.replace(/([.!?)])(?=\*\*[A-Z][^*\n]{2,60}\*\*)/g, "$1\n")
		.replace(
			/\*\*(Current Role|Primary Project|Key Responsibilities|Impact|Tools & Technologies)\*\*/gi,
			"### $1",
		)
		.replace(/(^|\n)(\s*-\s+\*\*[^*\n]+\*\*):(?=\S)/g, "$1$2: ")
		.replace(/([a-z])(?=\d)/g, "$1 ")
		.replace(/(\d)(?=[A-Za-z])/g, "$1 ");

const suggestions = [
	"What does Junaid do at Devsinc?",
	"Which projects show his AI work?",
	"What is his tech stack?",
	"Is he open to remote roles?",
];

const markdownComponents: Components = {
	p: ({ children }) => <p className="m-0">{children}</p>,
	h1: ({ children }) => <h1 className="m-0 text-base font-semibold">{children}</h1>,
	h2: ({ children }) => <h2 className="m-0 text-sm font-semibold">{children}</h2>,
	h3: ({ children }) => <h3 className="m-0 font-semibold">{children}</h3>,
	ul: ({ children }) => <ul className="m-0 list-disc pl-5">{children}</ul>,
	ol: ({ children }) => <ol className="m-0 list-decimal pl-5">{children}</ol>,
	li: ({ children }) => <li>{children}</li>,
	a: ({ children, href }) => (
		<a
			href={href}
			target="_blank"
			rel="noreferrer"
			className="font-medium text-[var(--coral)] underline underline-offset-2"
		>
			{children}
		</a>
	),
	blockquote: ({ children }) => (
		<blockquote className="border-l-2 border-[var(--coral)] pl-3 italic">
			{children}
		</blockquote>
	),
	pre: ({ children }) => (
		<pre className="my-0.5 overflow-x-auto rounded-md bg-[var(--surface)] p-2 text-xs">
			{children}
		</pre>
	),
	code: ({ children }) => (
		<code className="rounded bg-[var(--surface)] px-1 py-0.5 text-[0.85em]">{children}</code>
	),
};

export default function ChatWidget() {
	const [isOpen, setIsOpen] = useState(false);
	const [messages, setMessages] = useState<Message[]>([initialMessage]);
	const [hasLoadedStoredMessages, setHasLoadedStoredMessages] = useState(false);
	const [input, setInput] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const textareaRef = useRef<HTMLTextAreaElement>(null);
	const messagesEndRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!isOpen) {
			return;
		}

		textareaRef.current?.focus();
	}, [isOpen]);

	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages, isLoading, error]);

	useEffect(() => {
		setMessages(getStoredMessages());
		setHasLoadedStoredMessages(true);
	}, []);

	useEffect(() => {
		if (!hasLoadedStoredMessages) {
			return;
		}

		try {
			localStorage.setItem(chatStorageKey, JSON.stringify(messages.slice(-maxStoredMessages)));
		} catch {
			// Storage can be unavailable in private browsing or when it is full.
		}
	}, [hasLoadedStoredMessages, messages]);

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				setIsOpen(false);
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, []);

	const sendMessage = async (content: string, addUserMessage = true) => {
		const trimmedContent = content.trim();
		if (!trimmedContent || isLoading) {
			return;
		}

		const nextMessages = addUserMessage
			? [...messages, { role: "user" as const, content: trimmedContent }]
			: messages;
		const requestMessages = nextMessages.slice(-10);

		setError(null);
		setInput("");
		if (addUserMessage) {
			setMessages(nextMessages);
		}
		setIsLoading(true);
		setMessages((currentMessages) => [
			...currentMessages,
			{ role: "assistant", content: "" },
		]);

		try {
			const response = await fetch("/api/chat", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ messages: requestMessages }),
			});

			if (!response.ok) {
				const data = (await response.json()) as { error?: string };
				throw new Error(data.error || "Something went wrong. Please try again.");
			}

			if (!response.body) {
				throw new Error("Something went wrong. Please try again.");
			}

			const reader = response.body.getReader();
			const decoder = new TextDecoder();
			let buffer = "";

			const appendText = (text: string) => {
				setMessages((currentMessages) => {
					const updatedMessages = [...currentMessages];
					const lastMessage = updatedMessages.at(-1);

					if (lastMessage?.role === "assistant") {
						updatedMessages[updatedMessages.length - 1] = {
							...lastMessage,
							content: lastMessage.content + text,
						};
					}

					return updatedMessages;
				});
			};

			while (true) {
				const { done, value } = await reader.read();
				buffer += decoder.decode(value, { stream: !done });
				const events = buffer.split("\n\n");
				buffer = events.pop() || "";

				for (const event of events) {
					const dataLine = event.split("\n").find((line) => line.startsWith("data: "));
					if (!dataLine) {
						continue;
					}

					const data = JSON.parse(dataLine.slice(6)) as {
						text?: string;
						error?: string;
					};
					if (data.error) {
						throw new Error(data.error);
					}
					if (data.text) {
						appendText(data.text);
					}
				}

				if (done) {
					break;
				}
			}
		} catch (requestError) {
			setMessages((currentMessages) => {
				const lastMessage = currentMessages.at(-1);
				return lastMessage?.role === "assistant" && !lastMessage.content
					? currentMessages.slice(0, -1)
					: currentMessages;
			});
			setError(
				requestError instanceof Error
					? requestError.message
					: "Something went wrong. Please try again.",
			);
		} finally {
			setIsLoading(false);
		}
	};

	const handleSubmit = () => {
		void sendMessage(input);
	};

	const handleRetry = () => {
		const lastUserMessage = [...messages].reverse().find((message) => message.role === "user");
		if (lastUserMessage) {
			void sendMessage(lastUserMessage.content, false);
		}
	};

	const clearChat = () => {
		setMessages([createWelcomeMessage()]);
		try {
			localStorage.removeItem(chatStorageKey);
		} catch {
			// Ignore storage failures; the in-memory chat is still cleared.
		}
		setError(null);
		setInput("");
	};

	return (
		<>
			<AnimatePresence>
				{isOpen && (
					<motion.section
						initial={{ opacity: 0, y: 12 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: 12 }}
						transition={{ duration: 0.2 }}
						role="dialog"
						aria-label="Ask about Junaid"
						className="fixed inset-x-3 bottom-3 top-16 z-[60] flex flex-col overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] shadow-2xl md:inset-x-auto md:bottom-24 md:right-6 md:top-auto md:h-[min(560px,70vh)] md:w-[min(380px,calc(100vw-2rem))]"
					>
						<header className="flex min-h-[4.5rem] items-center justify-between border-b border-[var(--line)] bg-[var(--graphite)] px-4 py-3 text-[var(--on-ink)]">
							<div className="flex min-w-0 items-center gap-3">
								<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--chat-assistant)] text-white shadow-sm leading-none">
									<Bot size={20} />
								</div>
								<div className="flex min-w-0 flex-col justify-center gap-1">
									<h2 className="truncate text-sm font-semibold leading-tight">Junaid&apos;s AI Assistant</h2>
									<p className="inline-flex h-4 items-center gap-1.5 text-[11px] leading-none text-white/70">
										<span className="chat-status-dot" />
										Online
									</p>
								</div>
							</div>
							<div className="flex shrink-0 items-center gap-1">
								<button
									type="button"
									aria-label="Start a new chat"
									title="New chat"
									onClick={clearChat}
									className="flex h-9 w-9 items-center justify-center rounded-md text-white/75 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--coral)]"
								>
									<Plus size={18} />
								</button>
								<button
									type="button"
									aria-label="Close chat"
									onClick={() => setIsOpen(false)}
									className="flex h-9 w-9 items-center justify-center rounded-md text-[var(--muted-ink)] transition hover:bg-[var(--paper)] hover:text-[var(--ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--coral)]"
								>
									<X size={18} />
								</button>
							</div>
						</header>

						<div
							aria-live="polite"
							data-lenis-prevent
							className="min-h-0 flex-1 touch-pan-y space-y-4 overflow-y-auto overscroll-contain px-4 py-4"
						>
							{messages.map((message, index) => (
								<div
									key={`${message.role}-${index}`}
									className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
								>
									{message.role === "assistant" && (
										<div className="mr-2 mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-[var(--chat-assistant)] text-white">
											<Bot size={14} />
										</div>
									)}
									<div
										className={`max-w-[86%] whitespace-pre-wrap rounded-xl px-3 py-3 text-sm leading-5 ${
											message.role === "user"
													? "bg-[var(--chat-user)] text-white"
												: "bg-[var(--paper)] text-[var(--ink)]"
										}`}
									>
										{message.role === "assistant" ? (
											<ReactMarkdown
												components={markdownComponents}
												remarkPlugins={[remarkGfm]}
											>
												{normalizeAssistantMarkdown(message.content)}
											</ReactMarkdown>
										) : (
											message.content
										)}
									</div>
								</div>
							))}

							{messages.length === 1 && (
								<div className="flex flex-wrap gap-2 pt-1">
									{suggestions.map((suggestion) => (
										<button
											key={suggestion}
											type="button"
											onClick={() => void sendMessage(suggestion)}
											disabled={isLoading}
											className="rounded-full border border-[var(--line)] px-3 py-1.5 text-left text-xs text-[var(--muted-ink)] transition hover:border-[var(--coral)] hover:text-[var(--coral)] disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--coral)]"
										>
											{suggestion}
										</button>
									))}
								</div>
							)}

							{isLoading && (
								<div className="flex justify-start">
									<div className="rounded-xl bg-[var(--paper)] px-3 py-2 text-[var(--muted-ink)]">
										<Loader2 className="animate-spin" size={17} aria-label="Assistant is typing" />
									</div>
								</div>
							)}

							{error && (
								<div className="flex items-center gap-2 rounded-lg bg-[var(--paper)] px-3 py-2 text-xs text-[var(--muted-ink)]">
									<span className="flex-1">{error}</span>
									<button
										type="button"
										onClick={handleRetry}
										aria-label="Try again"
										className="inline-flex shrink-0 items-center gap-1 font-medium text-[var(--coral)] hover:underline"
									>
										<RotateCcw size={13} /> Try again
									</button>
								</div>
							)}
							<div ref={messagesEndRef} />
						</div>

						<form
							onSubmit={(event) => {
								event.preventDefault();
								handleSubmit();
							}}
							className="border-t border-[var(--line)] p-3"
						>
							<div className="flex items-end gap-2 rounded-lg border border-[var(--line)] bg-[var(--paper)] p-2 focus-within:border-[var(--coral)]">
								<textarea
									ref={textareaRef}
									value={input}
									maxLength={500}
									onChange={(event) => setInput(event.target.value)}
									onKeyDown={(event) => {
										if (event.key === "Enter" && !event.shiftKey) {
											event.preventDefault();
											handleSubmit();
										}
									}}
									placeholder="Ask a question..."
									aria-label="Your question"
									rows={2}
									className="max-h-28 min-h-[42px] flex-1 resize-none bg-transparent text-sm text-[var(--ink)] outline-none placeholder:text-[var(--muted-ink)]"
								/>
								<button
									type="submit"
									aria-label="Send message"
									disabled={isLoading || !input.trim()}
									className="rounded-md bg-[var(--coral)] p-2 text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--coral)]"
								>
									<Send size={17} />
								</button>
							</div>
							<p className="mt-1 text-right text-[10px] text-[var(--muted-ink)]">{input.length}/500</p>
						</form>
					</motion.section>
				)}
			</AnimatePresence>

			<button
				type="button"
				aria-label="Ask about Junaid"
				aria-hidden={isOpen}
				tabIndex={isOpen ? -1 : 0}
				onClick={() => setIsOpen((open) => !open)}
				className={`fixed bottom-5 right-6 z-[60] rounded-full bg-[var(--coral)] p-4 text-white shadow-lg transition hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--coral)] focus-visible:ring-offset-2 ${isOpen ? "pointer-events-none opacity-0 md:pointer-events-auto md:opacity-100" : ""}`}
			>
				<MessageCircle size={25} />
			</button>
		</>
	);
}