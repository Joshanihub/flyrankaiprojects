"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { settingsSchema, type SettingsValues } from "@/lib/settings-schema";

export function SettingsForm() {
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved" | "error">("idle");

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm<SettingsValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      name: "",
      email: "",
      notifications: false,
    },
    mode: "onTouched",
  });

  async function onSubmit(data: SettingsValues) {
    setSaveState("saving");
    try {
      // Simulated async save — replace with a real API call in production
      await new Promise<void>((resolve) => setTimeout(resolve, 600));
      console.log("Saved:", data);
      setSaveState("saved");
    } catch {
      setSaveState("error");
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      aria-label="User settings"
      className="mt-8 max-w-lg space-y-6"
    >
      {/* Name */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="settings-name" className="text-sm font-medium text-[var(--ink)]">
          Display name
        </label>
        <input
          id="settings-name"
          type="text"
          autoComplete="name"
          aria-describedby={errors.name ? "settings-name-error" : undefined}
          aria-invalid={!!errors.name}
          {...register("name")}
          className="border border-[var(--line)] bg-[var(--background)] px-3 py-2.5 text-sm text-[var(--ink)] outline-none placeholder:text-[var(--muted)] focus:border-[var(--accent)] aria-[invalid=true]:border-[#934838]"
          placeholder="Your name"
        />
        {errors.name && (
          <p id="settings-name-error" role="alert" className="text-xs text-[#934838]">
            {errors.name.message}
          </p>
        )}
      </div>

      {/* Email */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="settings-email" className="text-sm font-medium text-[var(--ink)]">
          Email address
        </label>
        <input
          id="settings-email"
          type="email"
          autoComplete="email"
          aria-describedby={errors.email ? "settings-email-error" : undefined}
          aria-invalid={!!errors.email}
          {...register("email")}
          className="border border-[var(--line)] bg-[var(--background)] px-3 py-2.5 text-sm text-[var(--ink)] outline-none placeholder:text-[var(--muted)] focus:border-[var(--accent)] aria-[invalid=true]:border-[#934838]"
          placeholder="you@example.com"
        />
        {errors.email && (
          <p id="settings-email-error" role="alert" className="text-xs text-[#934838]">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Notifications toggle */}
      <div className="flex items-start gap-3">
        <input
          id="settings-notifications"
          type="checkbox"
          {...register("notifications")}
          className="mt-0.5 h-4 w-4 accent-[var(--accent)]"
        />
        <label htmlFor="settings-notifications" className="flex flex-col gap-0.5">
          <span className="text-sm font-medium text-[var(--ink)]">Email notifications</span>
          <span className="text-xs text-[var(--muted)]">
            Receive a summary email when a new evaluation is saved.
          </span>
        </label>
      </div>

      {/* Save state feedback */}
      {saveState === "saved" && (
        <p role="status" className="text-sm text-[var(--accent-dark)]">
          Settings saved.
        </p>
      )}
      {saveState === "error" && (
        <p role="alert" className="text-sm text-[#934838]">
          Save failed. Please try again.
        </p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={!isDirty || !isValid || saveState === "saving"}
        className="min-h-11 bg-[var(--accent)] px-5 text-sm font-semibold text-white hover:bg-[var(--accent-dark)] disabled:cursor-not-allowed disabled:opacity-40"
      >
        {saveState === "saving" ? "Saving…" : "Save settings"}
      </button>
    </form>
  );
}
