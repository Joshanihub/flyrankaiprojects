import Link from "next/link";

export const metadata = {
  title: "History | SkillOS Lite",
  description: "Your past skill evaluations.",
};

export default function HistoryPage() {
  // Persistence is not yet implemented — evaluations live in the browser session only.
  // This page shows the intended empty state until a storage layer is added.
  const evaluations: never[] = [];

  return (
    <main className="mx-auto min-h-[calc(100vh-74px)] w-full max-w-4xl px-6 py-16 lg:px-10">
      <p className="eyebrow">Your trail</p>
      <h1 className="mt-4 text-4xl font-semibold tracking-[-0.03em] text-[var(--ink)]">
        Past evaluations
      </h1>

      {evaluations.length === 0 ? (
        <div
          className="mt-12 flex flex-col items-start border border-dashed border-[var(--line)] px-8 py-12"
          role="status"
          aria-label="No evaluations yet"
        >
          {/* Empty state visual mark */}
          <div
            aria-hidden="true"
            className="flex h-12 w-12 items-center justify-center border border-[var(--line)] bg-white/60 text-xl text-[var(--muted)]"
          >
            ○
          </div>

          <h2 className="mt-6 text-lg font-semibold text-[var(--ink)]">
            No evaluations yet
          </h2>
          <p className="mt-2 max-w-sm text-sm leading-6 text-[var(--muted)]">
            Completed evaluations will be saved here so you can track how your
            skill reads change over time. Start your first one to see it appear.
          </p>

          <Link href="/evaluate" className="button-primary mt-7">
            Start an evaluation <span aria-hidden="true">-&gt;</span>
          </Link>
        </div>
      ) : (
        <ul className="mt-10 space-y-4" aria-label="Past evaluations">
          {evaluations.map((item, index) => (
            <li key={index} className="border border-[var(--line)] p-5">
              {JSON.stringify(item)}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}