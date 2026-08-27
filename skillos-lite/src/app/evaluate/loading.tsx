export default function EvaluateLoading() {
  return (
    <main className="mx-auto min-h-[calc(100vh-74px)] w-full max-w-4xl px-6 py-14 lg:px-10">
      {/* Eyebrow skeleton */}
      <div className="h-3 w-28 animate-pulse rounded-sm bg-[var(--line)]" aria-hidden="true" />
      {/* Heading skeleton */}
      <div className="mt-5 h-9 w-48 animate-pulse rounded-sm bg-[var(--line)]" aria-hidden="true" />
      {/* Subtitle skeleton */}
      <div className="mt-5 space-y-2">
        <div className="h-3 w-full max-w-sm animate-pulse rounded-sm bg-[var(--line)]" aria-hidden="true" />
        <div className="h-3 w-64 animate-pulse rounded-sm bg-[var(--line)]" aria-hidden="true" />
      </div>
      {/* Chat shell skeleton */}
      <div
        className="mt-10 flex min-h-[34rem] flex-col border border-[var(--line)] bg-white/45"
        aria-busy="true"
        aria-label="Loading evaluation interface"
      >
        <div className="flex flex-1 flex-col justify-center space-y-3 p-7">
          <div className="h-3 w-24 animate-pulse rounded-sm bg-[var(--line)]" aria-hidden="true" />
          <div className="h-6 w-80 animate-pulse rounded-sm bg-[var(--line)]" aria-hidden="true" />
          <div className="h-3 w-64 animate-pulse rounded-sm bg-[var(--line)]" aria-hidden="true" />
        </div>
        <div className="border-t border-[var(--line)] p-5">
          <div className="h-20 w-full animate-pulse rounded-sm bg-[var(--line)]" aria-hidden="true" />
        </div>
      </div>
      <span className="sr-only">Loading the evaluation interface, please wait.</span>
    </main>
  );
}
