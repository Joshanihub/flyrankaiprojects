import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SkillOS Lite — Skill evaluation, made practical",
  description: "Turn real work moments into clear skill signals. AI-powered evaluation built for engineers.",
};

const SAMPLE_OUTPUT = {
  scenario: "Debugging under pressure",
  skill: "Systematic Debugging",
  proficiency: 78,
  level: "Proficient",
  strength: "You narrowed the problem space before reaching for a fix — checking recent deployments first rather than jumping to logs or restarts. That sequencing is the signal worth carrying forward.",
  nextChallenge: "Try diagnosing a failure you didn't cause. Work through a postmortem from a public incident (Stripe, Cloudflare, GitHub) and write down the three earliest signals that should have triggered an alert.",
};

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Tell the story",
    detail: "Start with the raw, unstructured version. Name the tool, the deadline, what went wrong first. Don't worry about polish — specific always beats smooth.",
  },
  {
    step: "02",
    title: "Get the signal",
    detail: "The AI reads your scenario through the lens of a principal engineering manager — rating your proficiency level, identifying the core skill, and naming exactly what you demonstrated.",
  },
  {
    step: "03",
    title: "Choose the stretch",
    detail: "You get one concrete next challenge calibrated to push your identified skill to the next level of seniority. Not a book recommendation — an action.",
  },
];

const WHO_ITS_FOR = [
  {
    title: "Engineers preparing for reviews",
    detail: "Turn the work you did this quarter into a vocabulary you can actually use when discussing your impact.",
  },
  {
    title: "New grads finding their footing",
    detail: "Build confidence by seeing which patterns in your early work are already strong and which to develop next.",
  },
  {
    title: "Senior engineers leveling up",
    detail: "The gap between senior and staff is often about the shape of your judgment, not the amount of code you ship.",
  },
];

export default function HomePage() {
  return (
    <main className="page-shell">
      {/* Hero */}
      <section className="hero-grid mx-auto flex w-full max-w-6xl flex-1 items-center px-6 py-20 lg:px-10">
        <div className="max-w-3xl">
          <p className="eyebrow">A small tool for getting unstuck</p>
          <h1 className="mt-5 max-w-2xl text-5xl font-semibold leading-[1.04] tracking-[-0.04em] text-[var(--ink)] sm:text-7xl">
            Turn the work you did into the skill you can name.
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-[var(--muted)]">
            Describe a real work moment. Get a clear read on the skill behind it,
            plus one concrete next challenge.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link className="button-primary" href="/evaluate">
              Start an evaluation <span aria-hidden="true">-&gt;</span>
            </Link>
            <Link className="button-quiet" href="/about">
              How it works
            </Link>
          </div>
        </div>
        <div className="hidden lg:block lg:pl-20" aria-hidden="true">
          <div className="signal-card">
            <div className="flex items-center justify-between border-b border-[var(--line)] pb-4 text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
              <span>Latest read</span>
              <span className="status-dot">Live</span>
            </div>
            <p className="mt-7 text-sm text-[var(--muted)]">Scenario signal</p>
            <p className="mt-2 text-xl font-medium leading-7 text-[var(--ink)]">
              {SAMPLE_OUTPUT.scenario}
            </p>
            <div className="mt-8 h-2 overflow-hidden rounded-full bg-[#dfe5de]">
              <div className="h-full w-[78%] rounded-full bg-[var(--accent)]" />
            </div>
            <div className="mt-3 flex justify-between text-xs text-[var(--muted)]">
              <span>{SAMPLE_OUTPUT.level}</span>
              <span>{SAMPLE_OUTPUT.proficiency} / 100</span>
            </div>
            <p className="mt-8 border-l-2 border-[var(--accent)] pl-4 text-sm leading-6 text-[var(--muted)]">
              {SAMPLE_OUTPUT.strength}
            </p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-t border-[var(--line)]">
        <div className="mx-auto w-full max-w-6xl px-6 py-16 lg:px-10">
          <p className="eyebrow">How it works</p>
          <div className="mt-10 grid gap-10 sm:grid-cols-3">
            {HOW_IT_WORKS.map((item) => (
              <div key={item.step}>
                <p className="text-4xl font-semibold tracking-[-0.04em] text-[var(--line)]">{item.step}</p>
                <h3 className="mt-4 text-lg font-semibold text-[var(--ink)]">{item.title}</h3>
                <p className="mt-2 text-sm leading-7 text-[var(--muted)]">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sample output preview */}
      <section className="border-t border-[var(--line)] bg-white/30">
        <div className="mx-auto w-full max-w-6xl px-6 py-16 lg:px-10">
          <p className="eyebrow">What an evaluation looks like</p>
          <h2 className="mt-4 max-w-xl text-3xl font-semibold tracking-[-0.03em] text-[var(--ink)]">
            Not a score. A read.
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-7 text-[var(--muted)]">
            This is a real evaluation output for the scenario: <em>"{SAMPLE_OUTPUT.scenario}"</em>
          </p>
          <div className="mt-10 border border-[var(--line)] bg-white/60 p-7 sm:p-10">
            <div className="grid gap-8 sm:grid-cols-3">
              <div>
                <p className="eyebrow mb-2">Skill identified</p>
                <p className="text-lg font-semibold text-[var(--ink)]">{SAMPLE_OUTPUT.skill}</p>
              </div>
              <div>
                <p className="eyebrow mb-2">Proficiency</p>
                <div className="flex items-end gap-3">
                  <p className="text-4xl font-semibold tracking-tight text-[var(--ink)]">{SAMPLE_OUTPUT.proficiency}</p>
                  <p className="mb-1 text-sm text-[var(--muted)]">/ 100 · {SAMPLE_OUTPUT.level}</p>
                </div>
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[#dfe5de]">
                  <div className="h-full rounded-full bg-[var(--accent)]" style={{ width: `${SAMPLE_OUTPUT.proficiency}%` }} />
                </div>
              </div>
              <div />
            </div>
            <div className="mt-8 border-t border-[var(--line)] pt-8">
              <p className="eyebrow mb-3">Strength identified</p>
              <p className="max-w-2xl text-sm leading-7 text-[var(--ink)]">{SAMPLE_OUTPUT.strength}</p>
            </div>
            <div className="mt-8 border-t border-[var(--line)] pt-8">
              <p className="eyebrow mb-3">Next challenge</p>
              <p className="max-w-2xl text-sm leading-7 text-[var(--ink)]">{SAMPLE_OUTPUT.nextChallenge}</p>
            </div>
          </div>
          <div className="mt-8">
            <Link href="/evaluate" className="button-primary">
              Get your own read <span aria-hidden="true">-&gt;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <section className="border-t border-[var(--line)]">
        <div className="mx-auto w-full max-w-6xl px-6 py-16 lg:px-10">
          <p className="eyebrow">Who it's for</p>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {WHO_ITS_FOR.map((item) => (
              <div key={item.title} className="border border-[var(--line)] bg-white/40 p-6">
                <h3 className="text-base font-semibold text-[var(--ink)]">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA footer strip */}
      <section className="border-t border-[var(--line)] bg-[var(--accent)]">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-6 px-6 py-12 sm:flex-row sm:items-center lg:px-10">
          <div>
            <p className="text-lg font-semibold text-white">Ready to find the signal?</p>
            <p className="mt-1 text-sm text-white/70">Takes 3 minutes. No account required.</p>
          </div>
          <Link
            href="/evaluate"
            className="inline-flex min-h-11 items-center bg-white px-6 text-sm font-semibold text-[var(--accent-dark)] hover:bg-[#f0f4ef]"
          >
            Start an evaluation <span aria-hidden="true" className="ml-2">-&gt;</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
