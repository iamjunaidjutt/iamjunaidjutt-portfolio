
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

The portfolio chatbot answers questions about Muhammad Junaid's work,
experience, education, projects, and skills. It uses Groq and
Upstash Redis for request rate limiting.

### Environment variables

Add these variables to `.env.local`:

```env
GROQ_API_KEY=your_groq_api_key
GROQ_MODEL=openai/gpt-oss-20b
GITHUB_TOKEN=optional_read_only_github_token
TAVILY_API_KEY=optional_tavily_search_key
GROQ_NATIVE_WEB_SEARCH=false
CHAT_RATE_LIMIT_PER_MINUTE=20
CHAT_RATE_LIMIT_PER_DAY=200
UPSTASH_REDIS_REST_URL=your_upstash_redis_rest_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_rest_token
```

To get a Groq key, open [Groq Console](https://console.groq.com/keys), sign in,
and create an API key. `llama-3.1-8b-instant` is the fast default; replace
`GROQ_MODEL` with another available Groq model if needed. Create a free database at [Upstash](https://upstash.com/),
then copy its REST URL and REST token into the two `UPSTASH_REDIS_*` variables.
The rate-limit variables control the per-IP request limits; the defaults allow
20 questions per minute and 200 per day.
The chatbot has up to six tools. A live list of all public repositories
(including forks, which are marked as other people's work) is added to every
prompt, and four GitHub tools read them: `search_github`, `get_github_readme`,
`list_github_files` and `read_github_file` (text files and notebooks only; `.env`
and key files are blocked). They work without a token, but unauthenticated
GitHub calls are limited to 60 per hour per IP and Vercel shares IPs, so set
`GITHUB_TOKEN` (read-only, public data, no extra permissions) in production.
If GitHub fails, the last good list is reused.

`web_search` only appears when `TAVILY_API_KEY` is set. Scope `junaid` is limited
to Junaid's own site and GitHub; scope `general` searches the open web and is
for explaining public courses and tools, never for facts about Junaid.
`email_follow_up` only appears when `EMAIL` and `EMAIL_PASSWORD` are set; it
needs the visitor's own email address, replies go to that address, and it is
limited to `CHAT_EMAIL_LIMIT_PER_DAY` (default 3) per IP.

Groq retired `llama-3.1-8b-instant`, `llama-3.3-70b-versatile` and the Compound
systems in 2026, so the default model is `openai/gpt-oss-20b`. Groq's built-in
search is now `browser_search`, available on the gpt-oss models only. Set
`GROQ_NATIVE_WEB_SEARCH=true` to use it instead of Tavily. It cannot be limited
to Junaid's own domains, so Tavily stays the default.

Open `http://localhost:3000` after the development server starts. The chatbot
answers only from [`data/profile.ts`](data/profile.ts), so update that file
whenever the CV changes. Information that is not present there should not be
added to chatbot responses.

### Repo Activity

![Activity](https://repobeats.axiom.co/api/embed/56e1e66c25ecbec1fca4904356afdf26058e8771.svg "Repobeats analytics image")
