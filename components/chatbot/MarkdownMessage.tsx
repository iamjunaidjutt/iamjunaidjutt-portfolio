"use client";

import type { Components } from "react-markdown";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cleanAssistantText } from "@/lib/chat/text";

const markdownComponents: Components = {
	p: ({ children }) => <p className="m-0 mt-2 first:mt-0">{children}</p>,
	h1: ({ children }) => <h1 className="m-0 text-base font-semibold">{children}</h1>,
	h2: ({ children }) => <h2 className="m-0 text-sm font-semibold">{children}</h2>,
	h3: ({ children }) => <h3 className="m-0 mt-3 font-semibold first:mt-0">{children}</h3>,
	ul: ({ children }) => <ul className="m-0 mt-2 list-disc pl-5 first:mt-0">{children}</ul>,
	ol: ({ children }) => <ol className="m-0 mt-2 list-decimal pl-5 first:mt-0">{children}</ol>,
	li: ({ children }) => <li className="mt-1 first:mt-0">{children}</li>,
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

export default function MarkdownMessage({ content }: { content: string }) {
	return (
		<ReactMarkdown
			components={markdownComponents}
			remarkPlugins={[remarkGfm]}
		>
			{cleanAssistantText(content)}
		</ReactMarkdown>
	);
}
