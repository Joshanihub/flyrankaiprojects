# FE-03: AI Workflow Drill — WORKFLOW.md

## Feature

A user settings form with three fields: display name, email address, and an email-notifications
toggle. The form appears at `/settings`. The drill compares two prompting approaches on this
same feature.

---

## Round 1 — Vague prompt (branch: `workflow-vague`)

**Prompt used:**

> "Build a settings form with name, email, and notifications toggle."

**What came out:**

The AI produced a single-file page component with three controlled inputs wired to `useState`.
It compiled and rendered. That is where the wins ended.

**Specific problems in the diff:**

- **No validation at all.** Submitting with an empty name and a malformed email (e.g., `notanemail`)
  sets `saved = true` and shows "Saved!". The form does not reject bad input.

- **No error states visible to the user.** There is no path from submission to any message
  explaining what went wrong. A screen reader user gets nothing; a sighted user gets a green
  "Saved!" even on invalid data.

- **No `htmlFor` / `id` pairing on two of the three fields.** The `<label>` elements wrap
  text only. Clicking the "Name" label does not focus the name input. NVDA announces the
  input with no accessible name.

- **No `aria-invalid` or `aria-describedby`.** Assistive technology cannot tell a user
  that a field is in an error state.

- **No loading or saving state.** The button label never changes. A slow network leaves the
  user with no confirmation that anything happened.

- **Uncontrolled checkbox labeled imprecisely.** The checkbox uses uncontrolled state lifted
  into a parent `useState`. Acceptable, but the label is "Enable notifications" with no
  secondary description of what that means.

**Review effort for round 1:** I had to manually re-read every field and check accessibility
in the browser inspector. Caught all of the above through inspection — none of it was visible
in the source without deliberately looking.

---

## Round 2 — Precise prompt (branch: `workflow-precise`)

**Prompt used:**

> "Build a settings form component at `src/components/settings-form.tsx`. Use react-hook-form
> with zodResolver. Import the Zod schema from `src/lib/settings-schema.ts` (create that file
> too). Fields: display name (required, max 80 chars), email (required, valid format), email
> notifications checkbox.
>
> Per-field requirements: `htmlFor`/`id` pair, `aria-describedby` pointing to the error `<p>`,
> `aria-invalid` on the input when the field has an error, `role=alert` on the error paragraph.
>
> Form-level: `noValidate` on the form element, `mode: 'onTouched'` for validation trigger.
> Submit button disabled until `isDirty && isValid`. Show three save states: saving (button
> label changes to 'Saving…'), saved (`role=status` success message), error (`role=alert`
> failure message). Simulate async save with a 600ms timeout — note the TODO comment to
> replace with a real API call.
>
> Also create the page at `src/app/settings/page.tsx` as a Server Component that imports
> SettingsForm. Add page-level metadata (`title`, `description`). Write the component, then
> verify it compiles with `npm run build` and that labels and error IDs are correctly linked."

**What came out:**

A `settings-schema.ts` file with the Zod schema and exported type, a `SettingsForm` Client
Component, and a Server Component page wrapper. The build passed without TypeScript errors.

**Specific improvements visible in the diff:**

- `aria-describedby="settings-name-error"` links the error `<p>` to the input — screen readers
  announce the error text immediately after the field value.
- `aria-invalid={!!errors.name}` is present on every input. NVDA announces "invalid entry"
  before reading the field.
- `role="alert"` on error paragraphs and `role="status"` on the saved confirmation: assistive
  technology announces these automatically when they appear.
- The submit button is disabled (`!isDirty || !isValid`) — clicking Save on an untouched form
  does nothing and cannot accidentally submit empty data.
- Three save states (`saving`, `saved`, `error`) give visible and announced feedback.
- The Zod schema is in its own file. A future API route can import and reuse the same schema
  rather than duplicating validation logic.

**Review effort for round 2:** I checked the compiled HTML once in the browser inspector to
confirm `aria-describedby` targets existed. Found none — the build passed, so the main review
was confirming the runtime behavior of save states and keyboard tab order. Significantly less
re-reading than round 1.

---

## AI mistake I caught

In round 2 the AI initially placed the `<SettingsForm />` import inside the same file as the
schema. That would have forced the schema to be a Client Component (because the form is). I
moved the schema to `src/lib/settings-schema.ts` so it stays importable from Server Components
and future API routes without pulling in the `"use client"` boundary.

---

## What the diff teaches

The vague-prompt version took less time to generate and more time to review: every field needed
manual accessibility checking, and the missing validation meant I had to decide whether to patch
it or regenerate. The precise-prompt version took longer to write the prompt and was faster
end-to-end: the review was confirming expected behavior rather than hunting for problems.

The gap that surprised me most was accessibility. I expected validation to be the main
difference. The vague version had no `htmlFor`/`id` pairings, no `aria-invalid`, and no error
announcement. That is not a cosmetic issue — it makes the form unusable with a screen reader.
The precise prompt caught this because I named the requirement explicitly.

---

## Three rules added to CLAUDE.md

1. Forms use `react-hook-form` + `zod`, never uncontrolled inputs.
2. Every input has `htmlFor`/`id`, `aria-describedby` pointing to its error element, and
   `aria-invalid` driven by form state.
3. Every user-facing async action has at least three states: loading, success, and error —
   all announced with `role="status"` or `role="alert"`.
