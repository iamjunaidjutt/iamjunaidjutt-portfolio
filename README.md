
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
GROQ_MODEL=llama-3.1-8b-instant
GITHUB_TOKEN=optional_read_only_github_token
TAVILY_API_KEY=optional_tavily_search_key
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
The chatbot has up to four tools. `search_github` and `get_github_readme` read
Junaid's public repositories and work without a token; `GITHUB_TOKEN` is
optional (read-only) and raises GitHub's rate limit. `web_search` only appears
when `TAVILY_API_KEY` is set and is limited to Junaid's own site and GitHub.
`email_follow_up` only appears when `EMAIL` and `EMAIL_PASSWORD` are set; it
needs the visitor's own email address, replies go to that address, and it is
limited to `CHAT_EMAIL_LIMIT_PER_DAY` (default 3) per IP. Tool use works best
with a larger Groq model than `llama-3.1-8b-instant`; set `GROQ_MODEL` to one
that Groq lists as supporting tool use.

Open `http://localhost:3000` after the development server starts. The chatbot
answers only from [`data/profile.ts`](data/profile.ts), so update that file
whenever the CV changes. Information that is not present there should not be
added to chatbot responses.

### Repo Activity

![Activity](https://repobeats.axiom.co/api/embed/56e1e66c25ecbec1fca4904356afdf26058e8771.svg "Repobeats analytics image")
