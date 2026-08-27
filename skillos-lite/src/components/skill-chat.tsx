"use client";

import { useChat } from "@ai-sdk/react";
import ReactMarkdown from "react-markdown";
import { useEffect, useRef, useState } from "react";

export function SkillChat() {
  const [input, setInput] = useState("");
  const [isAtBottom, setIsAtBottom] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { messages, sendMessage, status, stop, error } = useChat();
  const isLoading = status === "submitted" || status === "streaming";

  useEffect(() => {
    if (isAtBottom) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isAtBottom]);

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
      <div ref={scrollContainerRef} onScroll={handleScroll} className="flex-1 space-y-5 overflow-y-auto p-5 sm:p-7">
        {messages.length === 0 ? (
          <div className="flex min-h-[24rem] flex-col justify-center">
            <p className="eyebrow">Start anywhere</p>
            <h2 className="mt-4 max-w-md text-2xl font-semibold tracking-[-0.02em] text-[var(--ink)]">
              Tell me about a moment when the work got difficult.
            </h2>
            <p className="mt-3 max-w-md text-sm leading-6 text-[var(--muted)]">
              Include what you were trying to do, what went wrong, and how you responded. Specific beats polished.
            </p>
          </div>
        ) : (
          messages.map((message) => (
            <div key={message.id} className={message.role === "user" ? "ml-auto max-w-[85%]" : "max-w-[85%]"}>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
                {message.role === "user" ? "You" : "SkillOS"}
              </p>
              <div className={message.role === "user" ? "bg-[var(--accent)] px-4 py-3 text-sm leading-6 text-white" : "border-l-2 border-[var(--accent)] px-4 py-1 text-sm leading-7 text-[var(--ink)]"}>
                {message.parts.map((part, index) => 
                  part.type === "text" ? (
                    message.role === "user" ? (
                      <span key={`${message.id}-${index}`}>{part.text}</span>
                    ) : (
                      <ReactMarkdown 
                        key={`${message.id}-${index}`}
                        components={{
                          h3: ({node, ...props}) => <h3 className="mt-5 mb-1 text-xs font-bold uppercase tracking-wider text-[var(--accent-dark)] first:mt-0" {...props} />,
                          strong: ({node, ...props}) => <strong className="font-semibold text-[var(--ink)]" {...props} />,
                          p: ({node, ...props}) => <p className="mb-3 last:mb-0" {...props} />
                        }}
                      >
                        {part.text}
                      </ReactMarkdown>
                    )
                  ) : null
                )}
              </div>
            </div>
          ))
        )}
        {status === "submitted" ? <p className="text-sm text-[var(--muted)]">Reading the signal...</p> : null}
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