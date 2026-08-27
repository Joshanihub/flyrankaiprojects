import { SkillChat } from "@/components/skill-chat";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Evaluate | SkillOS Lite",
  description: "Describe a work scenario and get a structured skill evaluation powered by AI.",
};

const SCENARIO_TIPS = [
  { label: "Be specific", detail: "Name the tool, the deadline, the constraint. Vague stories produce vague signals." },
  { label: "Include the failure", detail: "What went wrong first? The recovery is usually where the real skill lives." },
  { label: "One scenario at a time", detail: "If you mix two situations, the signal blurs. Start with the one that surprised you most." },
];

export default function EvaluatePage() {
  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-14 lg:px-10">
      <p className="eyebrow">Evaluation room</p>
      <h1 className="mt-4 text-4xl font-semibold tracking-[-0.03em] text-[var(--ink)]">What happened?</h1>
      <p className="mt-4 max-w-xl leading-7 text-[var(--muted)]">
        A useful evaluation starts with the messy version of the story. The conversation will surface the skill behind it.
      </p>

      <div className="mt-10">
        <SkillChat />
      </div>

      <section className="mt-14 border-t border-[var(--line)] pt-10">
        <p className="eyebrow mb-6">Tips for a strong evaluation</p>
        <div className="grid gap-5 sm:grid-cols-3">
          {SCENARIO_TIPS.map((tip) => (
            <div key={tip.label} className="border border-[var(--line)] bg-white/40 p-5">
              <p className="text-sm font-semibold text-[var(--ink)]">{tip.label}</p>
              <p className="mt-1 text-sm leading-6 text-[var(--muted)]">{tip.detail}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}