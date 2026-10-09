"use client";

import { memo, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { Bot, Copy, Check } from "lucide-react";
import { cleanAssistantText } from "@/lib/chat/text";

const MarkdownMessage = dynamic(() => import("./MarkdownMessage"), {
	loading: () => <p className="m-0 mt-2 first:mt-0">Loading...</p>,
	ssr: false,
});

type MessageRowProps = {
	role: "user" | "assistant";
	content: string;
	isStreaming?: boolean;
	setLiveMessage?: (msg: string) => void;
};

function MessageRowComponent({ role, content, isStreaming, setLiveMessage }: MessageRowProps) {
	const [copied, setCopied] = useState(false);

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(content);
			setCopied(true);
			if (setLiveMessage) {
				setLiveMessage("Answer copied.");
			}
			setTimeout(() => setCopied(false), 2000);
		} catch (err) {
			// Clipboard not available
		}
	};

	const textContent = useMemo(() => {
		if (role === "user") return content;
		return cleanAssistantText(content);
	}, [role, content]);

	return (
		<div className={`flex ${role === "user" ? "justify-end" : "justify-start"}`}>
			{role === "assistant" && (
				<div className="mr-2 mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-[var(--chat-assistant)] text-white">
					<Bot size={14} />
				</div>
			)}
			<div className="relative group max-w-[86%]">
				<div
					className={`rounded-xl px-3 py-3 text-sm leading-5 ${
						role === "user"
							? "whitespace-pre-wrap bg-[var(--chat-user)] text-white"
							: "bg-[var(--paper)] text-[var(--ink)]"
					}`}
				>
					{role === "assistant" ? <MarkdownMessage content={content} /> : textContent}
				</div>
				{role === "assistant" && !isStreaming && content.trim() !== "" && (
					<button
						type="button"
						aria-label="Copy answer"
						onClick={handleCopy}
						className="absolute -right-8 bottom-1 p-1.5 text-[var(--muted-ink)] opacity-0 transition-all hover:bg-[var(--paper)] rounded-full hover:text-[var(--ink)] focus-visible:opacity-100 group-hover:opacity-100"
					>
						{copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
					</button>
				)}
			</div>
		</div>
	);
}

export const MessageRow = memo(MessageRowComponent);
