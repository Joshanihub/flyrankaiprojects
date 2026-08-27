import Link from "next/link";

export const metadata = {
  title: "About | SkillOS Lite",
  description: "Learn how SkillOS Lite turns reflection into measurable career progression.",
};

export default function AboutPage() {
  return (
    <main className="mx-auto min-h-[calc(100vh-74px)] w-full max-w-4xl px-6 py-16 lg:px-10">
      <p className="eyebrow">The idea</p>
      <h1 className="mt-4 text-4xl font-semibold tracking-[-0.03em] text-[var(--ink)]">Make reflection useful.</h1>
      
      <section className="mt-12 space-y-10 border-t border-[var(--line)] pt-10">
        <div>
          <h2 className="text-xl font-medium tracking-tight text-[var(--ink)]">The Mission</h2>
          <p className="mt-4 max-w-2xl leading-7 text-[var(--muted)]">
            Most people don't lack skills—they lack the vocabulary to describe what they are already doing. SkillOS Lite turns everyday work stories into practical feedback about the skills they reveal. We believe that forcing you to narrate a moment of difficulty is the fastest way to extract genuine signal about your engineering ability.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-medium tracking-tight text-[var(--ink)]">The FlyRank Internship Track</h2>
          <p className="mt-4 max-w-2xl leading-7 text-[var(--muted)]">
            This application was built as the capstone project for the FlyRank Frontend AI Engineering internship. Over the course of the track, the focus was entirely on production readiness: strict TypeScript types, accessible forms validated with Zod, React Suspense for loading skeletons, and robust error boundaries. 
          </p>
          <p className="mt-4 max-w-2xl leading-7 text-[var(--muted)]">
            The core difference between an MVP and a production app is what happens when things go wrong. SkillOS Lite is designed to handle failure gracefully, whether that means a downed API or an invalid user payload.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-medium tracking-tight text-[var(--ink)]">Architecture & Tech Stack</h2>
          <ul className="mt-4 max-w-2xl list-inside list-disc space-y-2 leading-7 text-[var(--muted)]">
            <li><strong>Next.js App Router:</strong> Server-first architecture with targeted Client Components.</li>
            <li><strong>Vercel AI SDK:</strong> Streaming integration with Google's Gemini LLMs for progressive rendering.</li>
            <li><strong>Tailwind CSS v4:</strong> Utility-first styling tied to custom design tokens.</li>
            <li><strong>React Hook Form & Zod:</strong> Type-safe, accessible form management.</li>
          </ul>
        </div>
      </section>

      <div className="mt-16 pb-20">
        <Link href="/evaluate" className="button-primary">
          Start an evaluation <span aria-hidden="true">-&gt;</span>
        </Link>
      </div>
    </main>
  );
}