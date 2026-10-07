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

const messagesSchema = z.object({
    messages: z
        .array(
            z.discriminatedUnion("role", [
                z.object({
                    role: z.literal("user"),
                    content: z.string().trim().min(1).max(500),
                }),
                z.object({
                    role: z.literal("assistant"),
                    content: z.string().trim().min(1).max(2000),
                }),
            ]),
        )
        .max(12)
        .refine((messages) => messages.at(-1)?.role === "user"),
});

const fallbackReply =
    "I do not know that yet. Please email Junaid at info.iamjunaidjutt@gmail.com or use the contact page.";

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
        const contentLength = Number(request.headers.get("content-length"));

        if (contentLength > 8000) {
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

        const apiKey = process.env.LLM_API_KEY || process.env.GEMINI_API_KEY || process.env.GROQ_API_KEY;
        const model = process.env.LLM_MODEL || "gemini-1.5-flash";
        const baseURL = process.env.LLM_BASE_URL || "https://generativelanguage.googleapis.com/v1beta/openai/";

        if (!apiKey) {
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
        const messages: ChatCompletionMessageParam[] = [
            { role: "system", content: buildSystemPrompt(repoIndex) },
            ...parsed.data.messages,
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
                        baseURL,
                        messages,
                        tools: getChatTools(model, baseURL),
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