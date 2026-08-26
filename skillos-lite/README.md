# SkillOS Lite

An AI-powered skill evaluation interface built as part of the FlyRank Frontend AI Engineering internship.

## What it does

SkillOS Lite turns a real work scenario into a structured conversation about the skill it demonstrates. The first version focuses on a simple evaluation flow, a small history area, and a health check route.

## Current routes

- `/` - introduction and entry point
- `/evaluate` - evaluation interface placeholder
- `/history` - saved evaluations placeholder
- `/about` - project context
- `/health` - server-side fetch health check

## Tech stack

Next.js 16 · App Router · TypeScript · Tailwind CSS · npm

## Run locally

```bash
npm install
copy .env.example .env.local
# Add your GOOGLE_GENERATIVE_AI_API_KEY to .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Status

The application shell is complete. The streaming evaluation conversation is the next implementation step.

## Environment variables

`GOOGLE_GENERATIVE_AI_API_KEY` is required to send evaluation messages. The key is read only by the server route and should never be committed.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
