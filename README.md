
# Muhammad Junaid

Thank you for considering contributing to this project! We appreciate your efforts to make it better.

To contribute to this project, please read the guidelines first from CONTRIBUTING.MD file!

### Setting up Locally

1. Copy the `.env.example` to `.env.local`

```bash
cp .env.example .env.local
```

2. Install packages via pnpm

```bash
pnpm install
```

3. Run the Next.js development server

```bash
pnpm dev
```

## Chatbot

The portfolio assistant, **Juno**, answers questions about Muhammad Junaid's work,
experience, education, projects, and skills. Its name, greetings, starter
questions and the launcher text live in [`lib/chat/assistant.ts`](lib/chat/assistant.ts).
It talks to any OpenAI-compatible endpoint (Gemini by default) and uses Upstash
Redis for per-IP rate limiting.

### Environment variables

Add these variables to `.env.local`:

```env
LLM_BASE_URL=https://generativelanguage.googleapis.com/v1beta/openai/
LLM_API_KEY=your_gemini_api_key
LLM_MODEL=gemini-3.1-flash-lite
GITHUB_TOKEN=optional_read_only_github_token
TAVILY_API_KEY=optional_tavily_search_key
GEMINI_GROUNDED_SEARCH=false
CHAT_RATE_LIMIT_PER_MINUTE=20
CHAT_RATE_LIMIT_PER_DAY=200
UPSTASH_REDIS_REST_URL=your_upstash_redis_rest_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_rest_token
```

Create a key in [Google AI Studio](https://aistudio.google.com/apikey). There is
**no default model**: set `LLM_MODEL` to a current model name from Google's
models page, because names go stale. Optional tuning: `LLM_REASONING_EFFORT`
(`minimal`, `low`, `medium`, `high`) and `LLM_TEMPERATURE`. For Gemini 3 models
no temperature is sent unless you set one, because Google recommends the default.

Create a free database at [Upstash](https://upstash.com/), then copy its REST URL
and REST token into the two `UPSTASH_REDIS_*` variables. The rate-limit variables
control the per-IP limits; the defaults allow 20 questions per minute and 200 per day.

### Tools

A live list of all public repositories (forks are marked as other people's work)
is added to every prompt, and four GitHub tools read them: `search_github`,
`get_github_readme`, `list_github_files` and `read_github_file` (text files and
notebooks only; `.env` and key files are blocked). They work without a token, but
unauthenticated GitHub calls are limited to 60 per hour per IP and Vercel shares
IPs, so set `GITHUB_TOKEN` (read-only, public data) in production. If GitHub
fails, the last good list is reused.

`web_search` appears when `TAVILY_API_KEY` is set, or when
`GEMINI_GROUNDED_SEARCH=true` (Google Search through Gemini's native API, using
`GEMINI_API_KEY` or `LLM_API_KEY`, and `GEMINI_SEARCH_MODEL` if you want a model
other than `LLM_MODEL`). Tavily can be limited to Junaid's own site and GitHub.
Gemini grounding is only used for explaining public courses and tools, never for
facts about Junaid, and may be billed per search on paid plans, so check Google's
pricing page. Google Search grounding is not available through the
OpenAI-compatible chat endpoint, which is why it runs as a separate request.

`email_follow_up` appears when `EMAIL` and `EMAIL_PASSWORD` are set. It needs the
visitor's own email address, replies go to that address, and it is limited to
`CHAT_EMAIL_LIMIT_PER_DAY` (default 3) per IP.

### Keeping it accurate

The assistant answers only from [`data/profile.ts`](data/profile.ts), the live
repository list, and its tools, so update `data/profile.ts` whenever the CV changes.
On Gemini 3 models, tool calls carry a "thought signature" that must be sent back
unchanged; `lib/chat/agent.ts` does this.

### Repo Activity

![Activity](https://repobeats.axiom.co/api/embed/56e1e66c25ecbec1fca4904356afdf26058e8771.svg "Repobeats analytics image")
