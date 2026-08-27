"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/evaluate", label: "Evaluate" },
  { href: "/history", label: "History" },
  { href: "/about", label: "About" },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-30 border-b border-[var(--line)] bg-[var(--background)]/90 px-6 py-5 backdrop-blur lg:px-10">
      <nav className="mx-auto flex max-w-6xl items-center justify-between" aria-label="Main navigation">
        <Link href="/" className="flex items-center gap-2 text-sm font-bold tracking-[-0.02em] text-[var(--ink)]">
          <span className="flex h-6 w-6 items-center justify-center bg-[var(--accent)] text-xs font-bold text-white">S</span>
          SkillOS <span className="font-normal text-[var(--muted)]">Lite</span>
        </Link>
        <div className="flex items-center gap-1 text-sm text-[var(--muted)]">
          {links.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded px-3 py-1.5 transition-colors ${
                  isActive
                    ? "bg-[var(--accent)] font-semibold text-white"
                    : "hover:bg-[#e7ebe4] hover:text-[var(--ink)]"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}