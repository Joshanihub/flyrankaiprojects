"use client";

import { useState } from "react";

export default function SettingsPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [notifications, setNotifications] = useState(false);
  const [saved, setSaved] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaved(true);
  }

  return (
    <main className="mx-auto min-h-[calc(100vh-74px)] w-full max-w-4xl px-6 py-16 lg:px-10">
      <h1 className="text-4xl font-semibold tracking-[-0.03em] text-[var(--ink)]">Settings</h1>
      {saved && <p className="mt-4 text-green-600">Saved!</p>}
      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <div>
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="ml-2 border px-2 py-1"
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="ml-2 border px-2 py-1"
          />
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={notifications}
              onChange={(e) => setNotifications(e.target.checked)}
              className="mr-2"
            />
            Enable notifications
          </label>
        </div>
        <button type="submit" className="bg-[var(--accent)] px-4 py-2 text-white">
          Save
        </button>
      </form>
    </main>
  );
}
