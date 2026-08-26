import { SkillChat } from "@/components/skill-chat";

export default function EvaluatePage() {
  return (
    <main className="mx-auto min-h-[calc(100vh-74px)] w-full max-w-4xl px-6 py-14 lg:px-10">
      <p className="eyebrow">Evaluation room</p>
      <h1 className="mt-4 text-4xl font-semibold tracking-[-0.03em] text-[var(--ink)]">What happened?</h1>
      <p className="mt-4 max-w-xl text-[var(--muted)]">
        A useful evaluation starts with the messy version of the story. The conversation will help find the signal.
      </p>
      <div className="mt-10">
        <SkillChat />
      </div>
    </main>
  );
}