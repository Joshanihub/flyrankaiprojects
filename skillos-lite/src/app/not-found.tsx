import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[calc(100vh-74px)] flex-col items-center justify-center px-6 text-center">
      <p className="eyebrow">404</p>
      <h1 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-[var(--ink)]">
        Nothing here.
      </h1>
      <p className="mt-3 max-w-sm text-sm leading-6 text-[var(--muted)]">
        The page you are looking for does not exist or has moved.
      </p>
      <Link
        href="/"
        className="button-primary mt-8"
      >
        Back to home
      </Link>
    </main>
  );
}
