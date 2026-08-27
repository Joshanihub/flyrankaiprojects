"use client";

import { useChat } from "@ai-sdk/react";
import ReactMarkdown from "react-markdown";
import { useEffect, useRef, useState } from "react";

const SAMPLE_SCENARIOS = [
  {
    label: "Debugging under pressure",
    text: "I was responsible for a production outage that started at 11pm. Our checkout service was returning 500 errors. I had 30 minutes to fix it before it became a major business issue. I started by checking the recent deployments, found a config change that had silently broken the DB connection string, rolled it back, and verified the fix. The team lead found out I had done it solo and was surprised. I am not sure if I handled it the right way or just got lucky.",
  },
  {
    label: "Disagreeing with a senior engineer",
    text: "During a code review, a senior engineer asked me to add a caching layer that I thought would introduce more complexity than the performance gain warranted. I pushed back, explained my reasoning using benchmarks I had run locally, and suggested we measure first before building. They disagreed but said they'd consider it. The next day they agreed with my approach. I am not sure whether I communicated this well or just got lucky that the data was on my side.",
  },
  {
    label: "Onboarding to a legacy codebase",
    text: "I joined a team mid-sprint and had to ship a feature in a 6-year-old Rails monolith with no documentation and inconsistent test coverage. I spent the first day reading the git history and writing down what I thought each module did. On day two I made a small change that broke an unrelated part of the app because of a shared global state I hadn't seen. I caught it in code review, fixed it, but it slowed me down. I ended up shipping on time but felt like I was operating blind the whole time.",
  },
];

export function SkillChat() {
  const [input, setInput] = useState("");
  const [isAtBottom, setIsAtBottom] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [sessionId] = useState(() => Math.random().toString(36).substring(7));
  const { messages, sendMessage, status, stop, error } = useChat();
  const isLoading = status === "submitted" || status === "streaming";

  useEffect(() => {
    if (isAtBottom) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isAtBottom]);

  useEffect(() => {
    if (messages.length > 0) {
      try {
        const history = JSON.parse(localStorage.getItem("skillos_history") || "[]");
        const existingIndex = history.findIndex((h: { id: string }) => h.id === sessionId);
        
        // Find the first text part from the user
        const firstUserMsg = messages.find(m => m.role === "user");
        let preview = "Evaluation";
        if (firstUserMsg && firstUserMsg.parts) {
          const textPart = firstUserMsg.parts.find((p: any) => p.type === "text");
          if (textPart && 'text' in textPart) {
            preview = (textPart.text as string).substring(0, 60) + "...";
          }
        }

        const summary = {
          id: sessionId,
          date: new Date().toISOString(),
          preview,
          messages,
        };

        if (existingIndex >= 0) {
          history[existingIndex] = summary;
        } else {
          history.unshift(summary);
        }
        localStorage.setItem("skillos_history", JSON.stringify(history));
      } catch (e) {
        console.error("Failed to save history", e);
      }
    }
  }, [messages, sessionId]);

  function handleScroll() {
    const container = scrollContainerRef.current;
    if (!container) return;

    const distanceFromBottom = container.scrollHeight - container.scrollTop - container.clientHeight;
    setIsAtBottom(distanceFromBottom < 48);
  }

  function handleSubmit(event: { preventDefault: () => void }) {
    event.preventDefault();
    const trimmedInput = input.trim();

    if (!trimmedInput || isLoading) return;
    sendMessage({ text: trimmedInput });
    setInput("");
  }

  return (
    <section className="flex min-h-[34rem] flex-col border border-[var(--line)] bg-white/45" aria-label="Skill evaluation chat">
      <div ref={scrollContainerRef} onScroll={handleScroll} className="flex-1 space-y-5 overflow-y-auto overflow-x-hidden p-5 sm:p-7">
        {messages.length === 0 ? (
          <div className="flex min-h-[24rem] flex-col justify-center">
            <p className="eyebrow">Start anywhere</p>
            <h2 className="mt-4 max-w-md text-2xl font-semibold tracking-[-0.02em] text-[var(--ink)]">
              Tell me about a moment when the work got difficult.
            </h2>
            <p className="mt-3 max-w-md text-sm leading-6 text-[var(--muted)]">
              Include what you were trying to do, what went wrong, and how you responded. Specific beats polished.
            </p>
            <div className="mt-8">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">Try a sample scenario</p>
              <div className="flex flex-wrap gap-2">
                {SAMPLE_SCENARIOS.map((s) => (
                  <button
                    key={s.label}
                    type="button"
                    onClick={() => setInput(s.text)}
                    className="border border-[var(--line)] bg-white/60 px-3 py-1.5 text-xs font-medium text-[var(--ink)] transition-colors hover:border-[var(--accent)] hover:bg-[var(--accent)] hover:text-white"
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          messages.map((message) => (
            <div key={message.id} className={message.role === "user" ? "ml-auto max-w-[85%]" : "max-w-[85%]"}>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
                {message.role === "user" ? "You" : "SkillOS"}
              </p>
              <div className={message.role === "user" ? "bg-[var(--accent)] px-4 py-3 text-sm leading-6 text-white break-words" : "border-l-2 border-[var(--accent)] px-4 py-1 text-sm leading-7 text-[var(--ink)] break-words"}>
                {message.parts.map((part, index) => 
                  part.type === "text" ? (
                    message.role === "user" ? (
                      <span key={`${message.id}-${index}`}>{part.text}</span>
                    ) : (
                      <div key={`${message.id}-${index}`} className="animate-fade-in-up overflow-x-auto">
                        <ReactMarkdown 
                          components={{
                            h3: ({node, ...props}) => <h3 className="mt-5 mb-1 text-xs font-bold uppercase tracking-wider text-[var(--accent-dark)] first:mt-0" {...props} />,
                            strong: ({node, ...props}) => <strong className="font-semibold text-[var(--ink)]" {...props} />,
                            p: ({node, ...props}) => <p className="mb-3 last:mb-0" {...props} />,
                            pre: ({node, ...props}) => <pre className="overflow-x-auto max-w-full bg-[#f4f2ec] p-3 my-2 text-xs" {...props} />
                          }}
                        >
                          {part.text}
                        </ReactMarkdown>
                      </div>
                    )
                  ) : null
                )}
              </div>
            </div>
          ))
        )}
        {status === "submitted" ? <p className="animate-pulse-opacity text-sm font-medium tracking-wide text-[var(--accent)]">Thinking...</p> : null}
        {status === "streaming" ? <p className="animate-pulse-opacity text-xs tracking-wide text-[var(--muted)]">Sending...</p> : null}
        {error ? <p className="border border-[#e5b8b0] bg-[#fff4f1] p-3 text-sm text-[#934838]" role="alert">{error.message || "Something went wrong. Try again."}</p> : null}
        <div ref={messagesEndRef} />
      </div>

      {!isAtBottom ? (
        <button type="button" onClick={() => { setIsAtBottom(true); messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }} className="self-end px-5 py-2 text-xs font-semibold text-[var(--accent-dark)] hover:underline">
          Jump to latest
        </button>
      ) : null}

      <form onSubmit={handleSubmit} className="border-t border-[var(--line)] p-4 sm:p-5">
        <label htmlFor="scenario" className="sr-only">Describe your skill scenario</label>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
          <textarea
            id="scenario"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="I had to..."
            rows={3}
            disabled={isLoading}
            className="min-h-20 flex-1 resize-none border border-[var(--line)] bg-[var(--background)] px-3 py-3 text-sm text-[var(--ink)] outline-none placeholder:text-[var(--muted)] focus:border-[var(--accent)]"
          />
          {isLoading ? (
            <button type="button" onClick={stop} className="min-h-11 bg-[#934838] px-5 text-sm font-semibold text-white hover:bg-[#71372d]">Stop</button>
          ) : (
            <button type="submit" disabled={!input.trim()} className="min-h-11 bg-[var(--accent)] px-5 text-sm font-semibold text-white hover:bg-[var(--accent-dark)] disabled:cursor-not-allowed disabled:opacity-40">Send</button>
          )}
        </div>
        <p className="mt-3 text-xs text-[var(--muted)]">Press Send when you have enough detail. You can add context in the next message.</p>
      </form>
    </section>
  );
}