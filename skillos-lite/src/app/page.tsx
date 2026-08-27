export default function HomePage() {
  return (
    <main className="page-shell">
      <section className="hero-grid mx-auto flex w-full max-w-6xl flex-1 items-center px-6 py-20 lg:px-10">
        <div className="max-w-3xl">
          <p className="eyebrow">A small tool for getting unstuck</p>
          <h1 className="mt-5 max-w-2xl text-5xl font-semibold leading-[1.04] tracking-[-0.04em] text-[var(--ink)] sm:text-7xl">
            Turn the work you did into the skill you can name.
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-[var(--muted)]">
            Describe a real work moment. Get a clear read on the skill behind it,
            plus one useful next challenge.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a className="button-primary" href="/evaluate">
              Start an evaluation <span aria-hidden="true">-&gt;</span>
            </a>
            <a className="button-quiet" href="/about">
              How it works
            </a>
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
              Debugging under pressure
            </p>
            <div className="mt-8 h-2 overflow-hidden rounded-full bg-[#dfe5de]">
              <div className="h-full w-[78%] rounded-full bg-[var(--accent)]" />
            </div>
            <div className="mt-3 flex justify-between text-xs text-[var(--muted)]">
              <span>Proficient</span>
              <span>78 / 100</span>
            </div>
            <p className="mt-8 border-l-2 border-[var(--accent)] pl-4 text-sm leading-6 text-[var(--muted)]">
              You narrowed the problem before reaching for a fix. That is the
              signal worth carrying forward.
            </p>
          </div>
        </div>
      </section>
      <section className="mx-auto grid w-full max-w-6xl gap-10 border-t border-[var(--line)] px-6 py-16 sm:grid-cols-3 lg:px-10">
        <div>
          <p className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--accent)] text-lg font-semibold text-white">1</p>
          <h3 className="mt-5 text-lg font-semibold text-[var(--ink)]">Tell the story</h3>
          <p className="mt-2 text-sm leading-6 text-[var(--muted)]">Start with a raw, unstructured story about a moment your work got difficult. Don't worry about formatting or using the right keywords.</p>
        </div>
        <div>
          <p className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--accent)] text-lg font-semibold text-white">2</p>
          <h3 className="mt-5 text-lg font-semibold text-[var(--ink)]">Spot the skill</h3>
          <p className="mt-2 text-sm leading-6 text-[var(--muted)]">Our AI engine instantly processes your story to extract the core engineering skills you demonstrated, rating your proficiency on a 1-100 scale.</p>
        </div>
        <div>
          <p className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--accent)] text-lg font-semibold text-white">3</p>
          <h3 className="mt-5 text-lg font-semibold text-[var(--ink)]">Choose the next stretch</h3>
          <p className="mt-2 text-sm leading-6 text-[var(--muted)]">Receive a tailored, actionable challenge designed to push your identified skills to the next level of seniority.</p>
        </div>
      </section>
    </main>
  );
}
