export default function HealthLoading() {
  return (
    <main className="mx-auto min-h-[calc(100vh-74px)] w-full max-w-4xl px-6 py-16 lg:px-10">
      {/* Eyebrow skeleton */}
      <div className="h-3 w-24 animate-pulse rounded-sm bg-[var(--line)]" aria-hidden="true" />
      {/* Heading skeleton */}
      <div className="mt-5 h-9 w-44 animate-pulse rounded-sm bg-[var(--line)]" aria-hidden="true" />
      {/* Status card skeleton */}
      <div
        className="mt-8 border border-[var(--line)] p-5"
        aria-busy="true"
        aria-label="Checking system health"
      >
        <div className="h-4 w-36 animate-pulse rounded-sm bg-[var(--line)]" aria-hidden="true" />
        <div className="mt-2 h-3 w-52 animate-pulse rounded-sm bg-[var(--line)]" aria-hidden="true" />
      </div>
      {/* JSON preview skeleton */}
      <div className="mt-6 h-48 w-full animate-pulse rounded-sm bg-[var(--line)]" aria-hidden="true" />
      <span className="sr-only">Fetching system health data, please wait.</span>
    </main>
  );
}
