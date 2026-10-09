# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Next.js 13 portfolio site for Muhammad Junaid with an AI chatbot assistant named **Juno**. The chatbot answers questions about Junaid's work, experience, projects, and skills using any OpenAI-compatible LLM (Gemini by default) with tool calling capabilities.

## Development Commands

```bash
# Install dependencies (uses pnpm)
pnpm install

# Run development server (http://localhost:3000)
pnpm dev

# Build for production
pnpm build

# Run production build locally
pnpm start

# Lint
pnpm lint
```

## Architecture

### App Structure (Next.js 13 App Router)

- **`app/`** — Next.js App Router pages and API routes
  - `app/(routes)/page.tsx` — Main portfolio page
  - `app/contact/(routes)/page.tsx` — Contact page
  - `app/api/chat/route.ts` — Chatbot API (SSE streaming endpoint)
  - `app/api/contact/route.ts` — Contact form API
  - `app/layout.tsx` — Root layout with fonts and theme provider
  - `app/globals.css` — Global styles and Tailwind imports

- **`components/`** — React components
  - Section components: `HeroSection.tsx`, `About.tsx`, `Experience.tsx`, `Projects.tsx`, `Skills.tsx`, `Services.tsx`, `Leadership.tsx`, `Training.tsx`
  - Navigation: `Navbar.tsx`, `MainNav.tsx`, `Footer.tsx`
  - Utilities: `SmoothScroll.tsx` (Lenis), `ScrollToTop.tsx`, `PageWrapper.tsx`
  - `chatbot/ChatWidget.tsx` — The entire chatbot UI (launcher, message thread, input)
  - `ui/` — shadcn/ui components (button, input, form, label, etc.)

- **`lib/`** — Utilities and business logic
  - `lib/chat/` — Chatbot implementation
    - `agent.ts` — Agentic loop (streaming, tool calling, Gemini 3 thought signature handling)
    - `assistant.ts` — Assistant identity (name, greetings, suggestions, teaser lines)
    - `systemPrompt.ts` — System prompt builder (profile + repo list + tool instructions)
    - `tools.ts` — Tool definitions and execution (GitHub repo tools, web search, email follow-up)
    - `rateLimit.ts` — Upstash Redis rate limiting (per-IP, per-minute and per-day)
  - `lib/utils.ts` — cn utility for Tailwind class merging

- **`data/`** — Static data
  - `data/profile.ts` — **Single source of truth (SSOT)** for Junaid's profile. A heavily-typed configuration that drives both the React UI (Section components like Experience, Projects, Services, HeroSection) and the Chatbot system prompt context. Update it whenever the CV changes.

- **`config/`** — Site configuration (metadata, nav links, social links)
- **`public/`** — Static assets (images, resume PDF)

### Chatbot Architecture

The chatbot uses a **server-streaming architecture** with tool calling:

1. **Frontend** (`components/chatbot/ChatWidget.tsx`):
   - Sends user messages to `/api/chat` (POST with message history)
   - Receives SSE (Server-Sent Events) stream with `data: {...}` events
   - Event types: `{text, status, reset, error, done}`
   - Displays streaming text, tool use status messages, and error states

2. **API Route** (`app/api/chat/route.ts`):
   - Rate limits per IP (Upstash Redis)
   - Validates message history (max 100 messages, sliding window of last 20)
   - Builds system prompt with `data/profile.ts` + live GitHub repo list
   - Streams response using `runChatAgent` from `lib/chat/agent.ts`

3. **Agent Loop** (`lib/chat/agent.ts`):
   - Streams LLM response chunks to frontend
   - Detects tool calls and executes them (max 4 rounds, 3 calls per round)
   - **Gemini 3 specific**: Preserves and returns `extra_content.google.thought_signature` from tool calls (Gemini 3 rejects requests without it)
   - Handles tool-use failures gracefully (falls back to answering without tools)
   - Shows tool status messages: "Checking Junaid's GitHub...", "Searching the web...", etc.

4. **Tools** (`lib/chat/tools.ts`):
   - `search_github` — Search all public repos (uses GitHub API or cached list)
   - `get_github_readme`, `list_github_files`, `read_github_file` — Read repo contents (text files and notebooks only; blocks `.env` and key files)
   - `web_search` — Tavily API or Gemini native grounded search (conditionally enabled)
   - `email_follow_up` — Sends email via nodemailer (rate limited to 3/day per IP)

### Styling

- **Tailwind CSS** with custom theme in `tailwind.config.ts`
- **shadcn/ui** components (configured in `components.json`)
- **Dark mode** via `next-themes` (class-based, toggle in navbar)
- Custom fonts: Roboto and Poppins (loaded in `app/layout.tsx`)
- **Framer Motion** for animations
- **Lenis** for smooth scrolling (`components/SmoothScroll.tsx`)

### Path Aliases

TypeScript paths are configured in `tsconfig.json`:
- `@/*` maps to repository root
- Example: `@/components/ui/button` → `/components/ui/button.tsx`

## Chatbot Configuration

### Environment Variables

The chatbot requires these variables in `.env.local`:

```env
# LLM Provider (any OpenAI-compatible endpoint)
LLM_BASE_URL="https://generativelanguage.googleapis.com/v1beta/openai/"
LLM_API_KEY="your_api_key"
LLM_MODEL="gemini-3.1-flash-lite"  # NO default: pick a current model name
LLM_REASONING_EFFORT=""  # Optional: minimal | low | medium | high
LLM_TEMPERATURE=""  # Optional. Leave empty for Gemini 3 (Google recommends default of 1.0)

# GitHub tools (works without token, but rate-limited to 60/hour/IP)
GITHUB_TOKEN="ghp_..."  # Read-only token recommended for production

# Web search (choose ONE)
TAVILY_API_KEY="tvly-..."  # Tavily API (can be limited to Junaid's site/GitHub)
# OR
GEMINI_GROUNDED_SEARCH="true"  # Google Search through Gemini native API
GEMINI_SEARCH_MODEL=""  # Optional: model for grounded search (defaults to LLM_MODEL)

# Rate limiting (Upstash Redis required)
UPSTASH_REDIS_REST_URL="https://..."
UPSTASH_REDIS_REST_TOKEN="..."
CHAT_RATE_LIMIT_PER_MINUTE=20
CHAT_RATE_LIMIT_PER_DAY=200

# Email follow-up tool (optional)
EMAIL="info.iamjunaidjutt@gmail.com"
EMAIL_PASSWORD="..."
CHAT_EMAIL_LIMIT_PER_DAY=3
```

### Important Model Requirements

- **No default model name**: `LLM_MODEL` must be explicitly set because model names go stale (e.g., `gemini-1.5-flash` was retired). Check Google's models page for current names.
- **Gemini 3 compatibility**: The agent preserves `extra_content.google.thought_signature` from tool calls and sends it back unchanged (Gemini 3 returns 400 without it).
- **Tool calling required**: The LLM must support function calling (OpenAI format).

### Keeping Chatbot Answers Accurate

The chatbot answers **only** from:
1. `data/profile.ts` — **Update this file whenever the CV changes**
2. Live GitHub repository list (fetched from GitHub API, cached on failure)
3. Tool results (repo files, web search, etc.)

The assistant **cannot** answer from memory or training data. If the answer isn't in `data/profile.ts` or tool results, it defers to the fallback: "Junaid would be the best person to ask."

### Chatbot Identity and Wording

All chatbot identity strings live in **`lib/chat/assistant.ts`**:
- Name: "Juno"
- Greetings (rotated randomly)
- Starter suggestions
- Launcher button text
- Teaser lines (rotated each time the launcher appears)

Change them there so the system prompt and frontend stay in sync.

## Key Technical Patterns

### Rate Limiting

Rate limiting uses **Upstash Redis** with two sliding windows per IP:
- 20 requests per minute
- 200 requests per day

Email follow-up tool has a separate limit: 3 emails per day per IP.

Implementation: `lib/chat/rateLimit.ts`

### SSE Streaming Protocol

The chat API streams events in Server-Sent Events format:
```
data: {"text": "chunk"}\n\n
data: {"status": "Checking Junaid's GitHub..."}\n\n
data: {"done": true}\n\n
```

Event types:
- `{text: string}` — LLM response chunk
- `{status: string}` — Tool execution status
- `{reset: true}` — Clear current message (before showing tool status)
- `{error: string}` — Error message
- `{done: true}` — End of stream

### Tool Execution Limits

To prevent runaway loops:
- Max 4 tool execution rounds
- Max 3 tool calls per round
- Tool calls with malformed arguments are caught and return error messages

### Conversation History Management

Message history in `app/api/chat/route.ts`:
- Accepts up to 100 messages per request (high ceiling for safety)
- Uses sliding window: keeps last 20 messages
- Truncates old assistant messages to 6000 chars (prevents "Invalid request" errors from oversized history)
- Strips leading assistant messages from history (some providers reject history that opens with an assistant message)

### Error Handling

Provider errors are mapped to user-friendly messages in `app/api/chat/route.ts`:
- 429 / quota errors → "The assistant is temporarily busy. Please wait a minute and try again."
- 401 / 403 / API key errors → "The assistant is not configured correctly right now."
- 400 / 404 / model errors → "The assistant model is unavailable right now."
- Tool-use 400 errors → Retry without tools (handles Gemini 3 thought signature issues gracefully)

## Component Conventions

- Use **React Server Components** by default (`app/` directory pages and layouts)
- Add `"use client"` only when needed (interactivity, hooks, browser APIs)
- Import UI components from `@/components/ui/`
- Use `cn()` from `@/lib/utils` for conditional Tailwind classes
- Framer Motion for animations (fade in, slide in, stagger children)
- Responsive design: mobile-first Tailwind breakpoints

## TypeScript

Strict mode enabled. All files should be `.ts` or `.tsx`.
