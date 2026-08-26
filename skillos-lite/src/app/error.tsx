"use client";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex min-h-[calc(100vh-74px)] flex-col items-center justify-center px-6 text-center">
      <p className="eyebrow">A small interruption</p>
      <h1 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-[var(--ink)]">That did not load correctly.</h1>
      <p className="mt-3 max-w-md text-sm leading-6 text-[var(--muted)]">{error.message || "Please try the page again."}</p>
      <button type="button" onClick={reset} className="mt-7 min-h-11 bg-[var(--accent)] px-5 text-sm font-semibold text-white hover:bg-[var(--accent-dark)]">
        Try again
      </button>
    </main>
  );
}