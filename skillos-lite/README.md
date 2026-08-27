# SkillOS Lite

![SkillOS Lite](https://skillos-lite.vercel.app/og-image.png)

SkillOS Lite is an AI-powered skill evaluation interface built as the capstone project for the FlyRank Frontend AI Engineering internship. It demonstrates how to leverage modern LLMs (Google Gemini via Vercel AI SDK) to turn unstructured work scenarios into rigorous, structured skill assessments.

## 🚀 Live Demo

**[Experience SkillOS Lite here](https://flyrankaiprojects.vercel.app/)**

## ✨ Features

- **Streaming AI Evaluation**: Uses `useChat` and `streamText` to stream tokens progressively to the UI, providing a responsive and dynamic evaluation experience.
- **Expert-Level Assessments**: The AI is strictly prompted to act as a principal-level engineering manager, providing deep insights, actionable growth areas, and specific next challenges.
- **Accessible & Robust Forms**: Built with `react-hook-form` and `zod` schema validation, complete with strict ARIA standards (`role="alert"`, `aria-describedby`, `aria-invalid`) ensuring full usability for assistive technologies.
- **Comprehensive Error States**: Includes global 404 boundaries, route-level error boundaries, loading skeletons using React Suspense, and graceful handling of empty states.

## 🏗️ Architecture & Tech Stack

- **Framework**: [Next.js 16.3.3](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict Mode)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **AI Integration**: [Vercel AI SDK](https://sdk.vercel.ai/docs) + `@ai-sdk/google` (Gemini-3.6-Flash)
- **Validation**: [Zod](https://zod.dev/)
- **Deployment**: [Vercel](https://vercel.com/)

## 📂 Project Structure

- `/` — Landing page and entry point
- `/evaluate` — The core streaming AI chat interface
- `/history` — Saved evaluations (includes tailored empty states)
- `/settings` — Accessible, Zod-validated user settings form
- `/health` — Server-side fetch health check to verify backend connectivity

## 🛠️ Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/Joshanihub/flyrankaiprojects.git
   cd flyrankaiprojects/skillos-lite
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Copy the example environment file:
   ```bash
   cp .env.example .env.local
   ```
   Add your Gemini API key to `.env.local`:
   ```env
   GOOGLE_GENERATIVE_AI_API_KEY="your_api_key_here"
   ```
   *(Note: The API key is only accessed server-side via Next.js route handlers and is never exposed to the client).*

4. **Start the development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🧪 Deployment Hygiene

This project adheres to strict deployment and security hygiene:
- **No secrets in source control**: `.env.local` is gitignored. Only `.env.example` is tracked.
- **Type Safety**: The project passes `npm run build` and `npm run lint` with zero errors.
- **Graceful degradation**: All async UI actions handle loading, success, and error states visibly and accessibly.
