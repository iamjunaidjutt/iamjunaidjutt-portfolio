"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
	Bot,
	Loader2,
	Plus,
	RotateCcw,
	Send,
	X,
	Maximize2,
	Minimize2,
} from "lucide-react";
import { useEffect, useRef, useState, useMemo } from "react";

import { ASSISTANT } from "@/lib/chat/assistant";
import { usePathname } from "next/navigation";
import { useActiveSection } from "@/lib/hooks/useActiveSection";
import { getStarterSuggestions, deriveFollowUps } from "@/lib/chat/suggestions";
import { useFocusTrap } from "@/lib/hooks/useFocusTrap";
import { MessageRow } from "./MessageRow";

type Message = {
	role: "user" | "assistant";
	content: string;
};

const welcomeMessages = ASSISTANT.greetings;

const initialMessage: Message = { role: "assistant", content: welcomeMessages[0] };
const legacyWelcomeMessage =
	"Hi! I can answer questions about Junaid's work, projects and skills. What would you like to know?";

const createWelcomeMessage = (): Message => ({
	role: "assistant",
	content: welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)],
});

const chatStorageKey = "junaid-portfolio-chat-history";
const teaserStorageKey = "junaid-portfolio-chat-teaser-dismissed";
const layoutStorageKey = "junaid-portfolio-chat-layout";

// How the nudge repeats: first appearance, how long it stays, and the pause before it returns.
const teaserFirstDelayMs = 3000;
const teaserVisibleMs = 6000;
const teaserPauseMs = 4000;
const maxStoredMessages = 100;

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

// Only touches invisible/odd characters. Spacing problems are fixed at the source
// (the stream), not with regexes that guess where spaces belong.
const cleanAssistantText = (content: string): string =>
	content
		.replace(/\r\n/g, "\n")
		.replace(/[\u00A0\u1680\u2000-\u200A\u202F\u205F\u3000]/g, " ")
		.replace(/[\u200B-\u200D\u2060\uFEFF]/g, "")
		.replace(/(\d)\s?\u00D7/g, "$1x")
		.replace(/([^\n])\n(#{1,6} )/g, "$1\n\n$2")
		.replace(/\n{3,}/g, "\n\n");




export default function ChatWidget() {
	const [isOpen, setIsOpen] = useState(false);
	const [messages, setMessages] = useState<Message[]>([initialMessage]);
	const [hasLoadedStoredMessages, setHasLoadedStoredMessages] = useState(false);
	const [input, setInput] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [statusText, setStatusText] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [liveMessage, setLiveMessage] = useState("");
	const [showTeaser, setShowTeaser] = useState(false);
	const [teaserIndex, setTeaserIndex] = useState(0);
	// null until sessionStorage has been read, so the nudge never flashes for someone who closed it.
	const [teaserDismissed, setTeaserDismissed] = useState<boolean | null>(null);
	const textareaRef = useRef<HTMLTextAreaElement>(null);
	const messagesEndRef = useRef<HTMLDivElement>(null);
	const previouslyFocusedRef = useRef<HTMLElement | null>(null);
	const dialogRef = useRef<HTMLElement>(null);
	const abortRef = useRef<AbortController | null>(null);
	const abortedRef = useRef(false);
	const [resetPending, setResetPending] = useState(false);
	const [followUpChips, setFollowUpChips] = useState<string[]>([]);
	const pathname = usePathname();
	const activeSection = useActiveSection();
	const currentSuggestions = ASSISTANT.suggestions;
	const layoutClasses = {
		compact: "md:inset-x-auto md:bottom-24 md:right-6 md:top-auto md:h-[min(560px,70vh)] md:w-[min(380px,calc(100vw-2rem))]",
		panel: "md:inset-x-auto md:bottom-24 md:right-6 md:top-auto md:h-[min(85vh,760px)] md:w-[min(620px,calc(100vw-2rem))]",
		fullscreen: "md:inset-3 md:h-auto md:w-auto",
	} as const;
	const reducedMotion = useReducedMotion();
	const [layout, setLayout] = useState<"compact" | "panel" | "fullscreen">("compact");

	useFocusTrap(dialogRef, isOpen);

	useEffect(() => {
		if (!isOpen) {
			if (typeof window !== 'undefined') window.dispatchEvent(new CustomEvent('lenis:start'));
			return;
		}

		previouslyFocusedRef.current = document.activeElement as HTMLElement;
		textareaRef.current?.focus();
		window.dispatchEvent(new CustomEvent("lenis:stop"));
	}, [isOpen]);

	useEffect(() => {
		return () => {
			abortRef.current?.abort();
		};
	}, [setLayout]);

	const closeChat = () => {
		setIsOpen(false);
		window.dispatchEvent(new CustomEvent("lenis:start"));
		requestAnimationFrame(() => previouslyFocusedRef.current?.focus());
	};

	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages, isLoading, error]);

	useEffect(() => {
		setMessages(getStoredMessages());
		setHasLoadedStoredMessages(true);
		try {
			const stored = localStorage.getItem(layoutStorageKey);
			if (stored === "panel" || stored === "fullscreen") {
				setLayout(stored);
			}
		} catch {}
	}, [setLayout]);

	useEffect(() => {
		try {
			localStorage.setItem(layoutStorageKey, layout);
		} catch {}
	}, [layout]);

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

	// A friendly nudge that comes back every so often. It stops for good once the visitor
	// closes it with the cross, opens the chat, or starts a conversation.
	useEffect(() => {
		try {
			setTeaserDismissed(sessionStorage.getItem(teaserStorageKey) === "1");
		} catch {
			// Storage can be unavailable; showing the nudge is harmless.
			setTeaserDismissed(false);
		}
	}, [setLayout]);

	useEffect(() => {
		if (isOpen) {
			setShowTeaser(false);
		}
	}, [isOpen]);

	const hasHistory = messages.length > 1;
	const activeTeasers = hasHistory ? ASSISTANT.returningTeasers : ASSISTANT.teasers;

	useEffect(() => {
		if (teaserDismissed !== false || isOpen || !hasLoadedStoredMessages) {
			setShowTeaser(false);
			return;
		}

		let timer = 0;

		const hide = () => {
			setShowTeaser(false);
			setTeaserIndex((index) => index + 1);
			timer = window.setTimeout(show, teaserPauseMs);
		};

		const show = () => {
			setShowTeaser(true);
			timer = window.setTimeout(hide, teaserVisibleMs);
		};

		timer = window.setTimeout(show, teaserFirstDelayMs);

		return () => window.clearTimeout(timer);
	}, [hasLoadedStoredMessages, isOpen, teaserDismissed]);

	const dismissTeaser = () => {
		setShowTeaser(false);
		setTeaserDismissed(true);
		try {
			sessionStorage.setItem(teaserStorageKey, "1");
		} catch {
			// Ignore: the nudge simply stays dismissed until this page is reloaded.
		}
	};

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape" && isOpen) {
				closeChat();
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [isOpen]);

	const sendMessage = async (content: string, addUserMessage = true) => {
		const trimmedContent = content.trim();
		if (!trimmedContent || isLoading) {
			return;
		}

		abortRef.current = new AbortController();
		abortedRef.current = false;

		const nextMessages = addUserMessage
			? [...messages, { role: "user" as const, content: trimmedContent }]
			: messages;
		const requestMessages = nextMessages.slice(-25); // Limit to last 25 messages for context

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
				// The body is not always JSON (a platform timeout returns plain text or HTML).
				const text = await response.text();
				let message = "Something went wrong. Please try again.";
				try {
					message = (JSON.parse(text) as { error?: string }).error || message;
				} catch {
					if (response.status >= 502) {
						message = "That took too long. Please try again.";
					}
				}
				throw new Error(message);
			}

			if (!response.body) {
				throw new Error("Something went wrong. Please try again.");
			}

			const reader = response.body.getReader();
			const decoder = new TextDecoder();
			let buffer = "";

			const resetAssistantText = () => {
				setMessages((currentMessages) => {
					const updatedMessages = [...currentMessages];
					const lastMessage = updatedMessages.at(-1);

					if (lastMessage?.role === "assistant") {
						updatedMessages[updatedMessages.length - 1] = { ...lastMessage, content: "" };
					}

					return updatedMessages;
				});
			};

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
				buffer += decoder.decode(value, { stream: !done }).replace(/\r\n/g, "\n");
				const events = buffer.split("\n\n");
				buffer = events.pop() || "";

				for (const event of events) {
					const dataLine = event.split("\n").find((line) => line.startsWith("data: "));
					if (!dataLine) {
						continue;
					}

					let data: { text?: string; status?: string; reset?: boolean; error?: string };
					try {
						data = JSON.parse(dataLine.slice(6));
					} catch {
						continue; // skip a broken event instead of failing the whole chat
					}
					if (data.error) {
						throw new Error(data.error);
					}
					if (data.status) {
						setStatusText(data.status);
							setLiveMessage(data.status);
					}
					if (data.reset) {
						resetAssistantText();
					}
					if (data.text) {
						setStatusText(null);
						appendText(data.text);
					}
				}

				if (done) {
					break;
				}
			}
		} catch (requestError: any) {
				if (requestError.name === "AbortError" || abortedRef.current) {
					setLiveMessage("Generation stopped.");
					return;
				}
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
			setStatusText(null);
		}
	};

	const handleSubmit = () => {
		if (!isLoading) {
			void sendMessage(input);
		}
	};

	useEffect(() => {
		if (!resetPending) return;
		const timer = window.setTimeout(() => setResetPending(false), 4000);
		return () => window.clearTimeout(timer);
	}, [resetPending]);

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
						initial={{ opacity: 0, y: reducedMotion ? 0 : 12 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: reducedMotion ? 0 : 12 }}
						transition={{ duration: 0.2 }}
						role="dialog"
						aria-modal="true" aria-labelledby="juno-dialog-title" ref={dialogRef as any}
						className={`fixed inset-x-3 bottom-3 top-16 z-[60] flex flex-col overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] shadow-2xl ${layoutClasses[layout]}`}
							style={{ transition: reducedMotion ? "none" : "width 0.2s, height 0.2s" }}
					>
						<header className="flex min-h-[4.5rem] items-center justify-between border-b border-[var(--line)] bg-[var(--graphite)] px-4 py-3 text-[var(--on-ink)]">
							<div className="flex min-w-0 items-center gap-3">
								<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--chat-assistant)] text-lg font-semibold leading-none text-white shadow-sm">
									{ASSISTANT.name.charAt(0)}
								</div>
								<div className="flex min-w-0 flex-col justify-center gap-1">
									<h2 id="juno-dialog-title" className="truncate text-sm font-semibold leading-tight">{ASSISTANT.name}</h2>
									<p className="inline-flex h-4 items-center gap-1.5 text-[11px] leading-none text-white/70">
										<span className="chat-status-dot" />
										Online · {ASSISTANT.tagline}
									</p>
								</div>
							</div>
							<div className="flex shrink-0 items-center gap-1">
									{resetPending ? (
										<div className="flex items-center gap-1 bg-white/10 rounded-md p-1 mr-1">
											<span className="text-[11px] font-medium px-2">New chat?</span>
											<button 
												onClick={() => { clearChat(); setResetPending(false); }}
												className="h-6 px-2 rounded-sm bg-[var(--coral)] text-white text-[10px] font-semibold transition hover:bg-opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
											>
												Yes
											</button>
											<button 
												onClick={() => setResetPending(false)}
												className="h-6 px-2 rounded-sm text-white/80 text-[10px] transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
											>
												No
											</button>
										</div>
									) : (
										<button
											type="button"
											aria-label="Start a new chat"
											title="New chat"
											onClick={() => setResetPending(true)}
											className="flex h-9 w-9 items-center justify-center rounded-md text-white/75 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--coral)]"
										>
											<Plus size={18} />
										</button>
									)}
								{layout !== "compact" && (
										<button
											type="button"
											aria-label="Shrink chat"
											title="Shrink chat"
											onClick={() => setLayout((l) => (l === "fullscreen" ? "panel" : "compact"))}
											className="hidden md:flex h-9 w-9 items-center justify-center rounded-md text-[var(--muted-ink)] transition hover:bg-[var(--paper)] hover:text-[var(--ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--coral)]"
										>
											<Minimize2 size={18} />
										</button>
									)}
									{layout !== "fullscreen" && (
										<button
											type="button"
											aria-label="Expand chat"
											title="Expand chat"
											onClick={() => setLayout((l) => (l === "compact" ? "panel" : "fullscreen"))}
											className="hidden md:flex h-9 w-9 items-center justify-center rounded-md text-[var(--muted-ink)] transition hover:bg-[var(--paper)] hover:text-[var(--ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--coral)]"
										>
											<Maximize2 size={18} />
										</button>
									)}
								<button
										type="button"
										aria-label="Close chat"
									onClick={closeChat}
									className="flex h-9 w-9 items-center justify-center rounded-md text-[var(--muted-ink)] transition hover:bg-[var(--paper)] hover:text-[var(--ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--coral)]"
								>
									<X size={18} />
								</button>
							</div>
						</header>

						<div
							
							data-lenis-prevent
							className="min-h-0 flex-1 touch-pan-y space-y-4 overflow-y-auto overflow-x-hidden overscroll-contain px-4 py-4"
						>
							{messages.map((message, index) => (
									<MessageRow
										key={`${message.role}-${index}`}
										role={message.role}
										content={message.content}
										isStreaming={isLoading && index === messages.length - 1}
										setLiveMessage={setLiveMessage}
									/>
								))}

								{messages.length === 1 && (
								<div className="flex flex-wrap gap-2 pt-1">
									{currentSuggestions.map((suggestion) => (
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
									<div className="flex items-center gap-2 rounded-xl bg-[var(--paper)] px-3 py-2 text-[var(--muted-ink)]">
										<Loader2 className="animate-spin" size={17} aria-hidden="true" />
										{statusText && <span className="text-xs">{statusText}</span>}
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
							
{followUpChips.length > 0 && messages.length > 1 && !isLoading && !error && (
									<div className="flex flex-wrap gap-2 pt-1 pb-2">
										{followUpChips.map((chip) => (
											<button
												key={chip}
												type="button"
												onClick={() => void sendMessage(chip)}
												className="rounded-full border border-[var(--line)] px-3 py-1.5 text-left text-[11px] text-[var(--muted-ink)] transition hover:border-[var(--coral)] hover:text-[var(--coral)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--coral)]"
											>
												{chip}
											</button>
										))}
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
									maxLength={2000}
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
							<p className="mt-1 text-right text-[10px] text-[var(--muted-ink)]">{input.length}/2000</p>
						</form>
					</motion.section>
				)}
			</AnimatePresence>

			<AnimatePresence>
				{showTeaser && !isOpen && (
					<motion.div
						key={teaserIndex}
						initial={{ opacity: 0, y: 8, scale: 0.96 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						exit={{ opacity: 0, y: 8, scale: 0.96 }}
						transition={{ duration: 0.25 }}
						className="fixed bottom-[5.25rem] right-6 z-[60] flex max-w-[15.5rem] items-start gap-1 rounded-2xl rounded-br-md border border-[var(--line)] bg-[var(--surface)] py-2 pl-3 pr-1 text-[var(--ink)] shadow-xl"
					>
						<button
							type="button"
							onClick={() => setIsOpen(true)}
							className="py-0.5 text-left text-sm leading-snug focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--coral)]"
						>
							{activeTeasers[teaserIndex % activeTeasers.length]}
						</button>
						<button
							type="button"
							aria-label="Dismiss"
							onClick={dismissTeaser}
							className="shrink-0 rounded-full p-1.5 text-[var(--muted-ink)] transition hover:text-[var(--ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--coral)]"
						>
							<X size={14} />
						</button>
					</motion.div>
				)}
			</AnimatePresence>

			<button
				type="button"
				aria-label={isOpen ? "Close chat" : `${ASSISTANT.launcherTitle} ${ASSISTANT.launcherSubtitle}`}
				aria-hidden={isOpen}
				tabIndex={isOpen ? -1 : 0}
				onClick={() => isOpen ? closeChat() : setIsOpen(true)}
				className={`chat-launcher fixed bottom-5 right-6 z-[60] flex items-center gap-3 rounded-full bg-[var(--chat-launcher-bg)] py-2 pl-2 pr-5 text-white shadow-lg transition hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--coral)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--surface)] ${isOpen ? layout !== "compact" ? "opacity-0 pointer-events-none" : "pointer-events-none opacity-0 md:pointer-events-auto md:opacity-100" : ""}`}
			>
				<span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/20 text-lg font-semibold leading-none">
					{isOpen ? <X size={20} /> : ASSISTANT.name.charAt(0)}
					{!isOpen && <span className="chat-launcher-dot" />}
				</span>
				<span className="flex flex-col text-left leading-tight">
					<span className="text-sm font-semibold">{isOpen ? "Close" : ASSISTANT.launcherTitle}</span>
					{!isOpen && (
						<span className="hidden text-[11px] text-white/85 sm:block">{ASSISTANT.launcherSubtitle}</span>
					)}
				</span>
			</button>
		</>
	);
}