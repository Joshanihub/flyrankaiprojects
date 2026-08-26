import Link from "next/link";

const links = [
  { href: "/evaluate", label: "Evaluate" },
  { href: "/history", label: "History" },
  { href: "/about", label: "About" },
];

export function Nav() {
  return (
    <header className="border-b border-[var(--line)] bg-[var(--background)]/90 px-6 py-5 backdrop-blur lg:px-10">
      <nav className="mx-auto flex max-w-6xl items-center justify-between" aria-label="Main navigation">
        <Link href="/" className="text-sm font-bold tracking-[-0.02em] text-[var(--ink)]">
          SkillOS <span className="font-normal text-[var(--muted)]">Lite</span>
        </Link>
        <div className="flex items-center gap-5 text-sm text-[var(--muted)] sm:gap-7">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="transition-colors hover:text-[var(--ink)]">
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}