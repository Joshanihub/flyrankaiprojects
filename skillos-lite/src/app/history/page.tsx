"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

interface HistoryEntry {
  id: string;
  date: string;
  preview: string;
  messages: Array<{
    id: string;
    role: "user" | "assistant";
    parts: Array<{ type: string; text?: string }>;
  }>;
}

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function HistoryPage() {
  const [evaluations, setEvaluations] = useState<HistoryEntry[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const raw = localStorage.getItem("skillos_history");
      if (raw) setEvaluations(JSON.parse(raw));
    } catch {
      /* localStorage unavailable */
    }
  }, []);

  function clearHistory() {
    localStorage.removeItem("skillos_history");
    setEvaluations([]);
    setExpanded(null);
  }

  if (!mounted) return null;

  return (
    <main className="mx-auto min-h-[calc(100vh-74px)] w-full max-w-4xl px-6 py-16 lg:px-10">
      <div className="flex items-end justify-between">
        <div>
          <p className="eyebrow">Your trail</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.03em] text-[var(--ink)]">
            Past evaluations
          </h1>
        </div>
        {evaluations.length > 0 && (
          <button
            onClick={clearHistory}
            className="text-xs text-[var(--muted)] underline-offset-2 hover:text-[var(--ink)] hover:underline"
          >
            Clear all
          </button>
        )}
      </div>

      {evaluations.length === 0 ? (
        <div
          className="mt-12 flex flex-col items-start border border-dashed border-[var(--line)] px-8 py-12"
          role="status"
          aria-label="No evaluations yet"
        >
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
            Completed evaluations are saved here so you can track how your skill
            reads change over time. Start your first one to see it appear.
          </p>
          <Link href="/evaluate" className="button-primary mt-7">
            Start an evaluation <span aria-hidden="true">-&gt;</span>
          </Link>
        </div>
      ) : (
        <ul className="mt-10 space-y-4" aria-label="Past evaluations">
          {evaluations.map((entry) => (
            <li
              key={entry.id}
              className="border border-[var(--line)] bg-white/40 transition-colors"
            >
              <button
                className="flex w-full items-center justify-between px-6 py-5 text-left"
                onClick={() =>
                  setExpanded(expanded === entry.id ? null : entry.id)
                }
                aria-expanded={expanded === entry.id}
              >
                <div>
                  <p className="text-sm font-medium text-[var(--ink)]">
                    {entry.preview}
                  </p>
                  <p className="mt-1 text-xs text-[var(--muted)]">
                    {formatDate(entry.date)}
                  </p>
                </div>
                <span
                  aria-hidden="true"
                  className={`ml-4 shrink-0 text-sm text-[var(--muted)] transition-transform ${expanded === entry.id ? "rotate-90" : ""}`}
                >
                  ›
                </span>
              </button>

              {expanded === entry.id && (
                <div className="space-y-4 border-t border-[var(--line)] px-6 py-5">
                  {entry.messages.map((msg) => {
                    const textPart = msg.parts?.find(
                      (p) => p.type === "text"
                    );
                    if (!textPart || !("text" in textPart)) return null;
                    return (
                      <div
                        key={msg.id}
                        className={
                          msg.role === "user" ? "ml-auto max-w-[85%]" : "max-w-[85%]"
                        }
                      >
                        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
                          {msg.role === "user" ? "You" : "SkillOS"}
                        </p>
                        <div
                          className={
                            msg.role === "user"
                              ? "bg-[var(--accent)] px-4 py-3 text-sm leading-6 text-white break-words"
                              : "border-l-2 border-[var(--accent)] px-4 py-1 text-sm leading-7 text-[var(--ink)] break-words"
                          }
                        >
                          {msg.role === "user" ? (
                            textPart.text
                          ) : (
                            <ReactMarkdown
                              components={{
                                h3: ({ node, ...props }) => (
                                  <h3
                                    className="mt-5 mb-1 text-xs font-bold uppercase tracking-wider text-[var(--accent-dark)] first:mt-0"
                                    {...props}
                                  />
                                ),
                                strong: ({ node, ...props }) => (
                                  <strong
                                    className="font-semibold text-[var(--ink)]"
                                    {...props}
                                  />
                                ),
                                p: ({ node, ...props }) => (
                                  <p className="mb-3 last:mb-0" {...props} />
                                ),
                              }}
                            >
                              {textPart.text as string}
                            </ReactMarkdown>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}

      {evaluations.length > 0 && (
        <p className="mt-8 text-xs text-[var(--muted)]">
          {evaluations.length} evaluation{evaluations.length !== 1 ? "s" : ""}{" "}
          stored in your browser. Clearing site data will remove them.
        </p>
      )}
    </main>
  );
}