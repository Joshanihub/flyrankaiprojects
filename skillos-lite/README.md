# SkillOS Lite

An AI-powered skill evaluation interface built as part of the FlyRank Frontend AI Engineering internship.

## What it does

SkillOS Lite turns a real work scenario into a structured conversation about the skill it demonstrates. Describe a situation where you applied a skill — the app evaluates what you demonstrated, assesses your proficiency level, identifies a strength, and suggests a concrete next challenge.

## Current routes

- `/` — introduction and entry point
- `/evaluate` — streaming AI evaluation interface
- `/history` — saved evaluations (coming soon)
- `/about` — project context
- `/health` — server-side fetch health check

## Tech stack

Next.js 14 · App Router · TypeScript · Tailwind CSS · Vercel AI SDK · Google Gemini

## Run locally

```bash
git clone https://github.com/Joshanihub/skillos-lite.git
cd skillos-lite
npm install
copy .env.example .env.local
# Add your GOOGLE_GENERATIVE_AI_API_KEY to .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment variables

| Variable                       | Description                                                            | Required |
| ------------------------------ | ---------------------------------------------------------------------- | -------- |
| `GOOGLE_GENERATIVE_AI_API_KEY` | Gemini API key from [aistudio.google.com](https://aistudio.google.com) | Yes      |

The key is read only by the server route handler and is never exposed to the client.

## Status

Application shell complete. Streaming evaluation conversation implemented. Testing and error state hardening in progress.
