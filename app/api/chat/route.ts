import OpenAI from "openai";
import type { ChatCompletionMessageParam } from "openai/resources/chat/completions";
import { NextResponse } from "next/server";
import { z } from "zod";

import { type ChatEvent, runChatAgent } from "@/lib/chat/agent";
import { checkRateLimit } from "@/lib/chat/rateLimit";
import { buildSystemPrompt } from "@/lib/chat/systemPrompt";
import { executeChatTool, getChatTools, getRepoIndex } from "@/lib/chat/tools";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_HISTORY_REPLY_CHARS = 6000;

const messagesSchema = z.object({
    messages: z
        .array(
            z.discriminatedUnion("role", [
                z.object({
                    role: z.literal("user"),
                    content: z.string().trim().min(1).max(2000), // Increased from 500
                }),
                z.object({
                    role: z.literal("assistant"),
                    // Long earlier answers are shortened, not rejected. Rejecting them made every
                    // later message fail with "Invalid request".
                    content: z
                        .string()
                        .trim()
                        .min(1)
                        .transform((value) => value.slice(0, MAX_HISTORY_REPLY_CHARS)),
                }),
            ]),
        )
        .max(100) // Increased from 12 to 100 messages per session; High ceiling for safety; sliding window manages actual model context
        .refine((messages) => messages.at(-1)?.role === "user"),
});

const fallbackReply =
    "I don't know about that one. Junaid would be the best person to ask: you can email him at info.iamjunaidjutt@gmail.com or use the contact page.";

const isQuotaError = (error: unknown): boolean => {
    if (!error || typeof error !== "object") return false;

    const candidate = error as { status?: number; code?: number; message?: string };
    const message = candidate.message?.toLowerCase() ?? "";

    return (
        candidate.status === 429 ||
        candidate.code === 429 ||
        message.includes("quota") ||
        message.includes("rate limit") ||
        message.includes("resource_exhausted") ||
        message.includes("too many requests")
    );
};

const getProviderErrorMessage = (error: unknown): string => {
    if (isQuotaError(error)) {
        return "The assistant is temporarily busy. Please wait a minute and try again.";
    }

    if (!error || typeof error !== "object") {
        return "The assistant is temporarily unavailable. Please try again in a moment.";
    }

    const candidate = error as { status?: number; code?: number; message?: string };
    const message = candidate.message?.toLowerCase() ?? "";

    if (
        candidate.status === 401 ||
        candidate.status === 403 ||
        message.includes("api key") ||
        message.includes("authentication")
    ) {
        return "The assistant is not configured correctly right now. Please try again later.";
    }

    if (
        candidate.status === 400 ||
        candidate.status === 404 ||
        message.includes("model")
    ) {
        return "The assistant model is unavailable right now. Please try again later.";
    }

    return "The assistant is temporarily unavailable. Please try again in a moment.";
};

export async function POST(request: Request) {
    try {
        // 1. Allow larger request payloads (e.g., 64KB instead of 8KB)
        const contentLength = Number(request.headers.get("content-length"));
        if (contentLength > 64_000) {
            return NextResponse.json(
                { error: "Request body is too large." },
                { status: 413 },
            );
        }

        const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

        if (!(await checkRateLimit(ip))) {
            return NextResponse.json(
                { error: "Too many questions. Please try again later." },
                { status: 429 },
            );
        }

        let body: unknown;

        try {
            body = await request.json();
        } catch {
            return NextResponse.json({ error: "Invalid request" }, { status: 400 });
        }

        const parsed = messagesSchema.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json({ error: "Invalid request" }, { status: 400 });
        }

        const apiKey = process.env.LLM_API_KEY || process.env.GEMINI_API_KEY;
        // No default model on purpose: a hard-coded name goes stale (gemini-1.5-flash is gone).
        const model = process.env.LLM_MODEL;
        const baseURL = process.env.LLM_BASE_URL || "https://generativelanguage.googleapis.com/v1beta/openai/";

        if (!apiKey || !model) {
            return NextResponse.json(
                { error: "The assistant is not configured yet. Please try again later." },
                { status: 500 },
            );
        }

        const client = new OpenAI({
            apiKey,
            baseURL,
        });

        const repoIndex = await getRepoIndex();

        // Keep the last 20 messages so the conversation can continue indefinitely. Start at the
        // first visitor message: the greeting is an assistant message, some providers reject a
        // history that opens with one, and it only costs tokens.
        const recentMessages = parsed.data.messages.slice(-20);
        while (recentMessages[0]?.role === "assistant") {
            recentMessages.shift();
        }

        const messages: ChatCompletionMessageParam[] = [
            { role: "system", content: buildSystemPrompt(repoIndex) },
            ...recentMessages,
        ];

        const encoder = new TextEncoder();
        const stream = new ReadableStream({
            async start(controller) {
                const sendEvent = (event: ChatEvent) => {
                    controller.enqueue(encoder.encode(`data: ${JSON.stringify(event)}\n\n`));
                };

                try {
                    await runChatAgent({
                        client,
                        model,
                        messages,
                        tools: getChatTools(),
                        ip,
                        sendEvent,
                        execute: executeChatTool,
                        fallbackReply,
                    });
                } catch (error) {
                    sendEvent({ error: getProviderErrorMessage(error) });
                } finally {
                    controller.close();
                }
            },
        });

        return new Response(stream, {
            headers: {
                "Cache-Control": "no-cache, no-transform",
                Connection: "keep-alive",
                "Content-Type": "text/event-stream",
            },
        });
    } catch (error) {
        if (isQuotaError(error)) {
            return NextResponse.json(
                { error: getProviderErrorMessage(error) },
                { status: 429 },
            );
        }

        return NextResponse.json({ error: getProviderErrorMessage(error) }, { status: 500 });
    }
}