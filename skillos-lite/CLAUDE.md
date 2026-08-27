# Project: SkillOS Lite

## Stack

- Next.js App Router
- TypeScript with strict mode
- Tailwind CSS
- Vercel AI SDK with Google Gemini (planned)
- React Hook Form and Zod for form validation (planned)

## Conventions

- Use Server Components by default; add `"use client"` only for interactive UI.
- Use kebab-case file names and PascalCase component names.
- Keep API keys in `.env.local`; never commit secrets.
- Keep loading, empty, and error states visible in user-facing flows.
- Use accessible labels, focus states, and meaningful button text.

## Component patterns

- Type every component prop and form value.
- Keep route pages small and move reusable UI into `src/components`.
- Prefer Tailwind classes and the existing design tokens in `globals.css`.

## Form rules (learned from FE-03 workflow drill)

- Forms use `react-hook-form` + `zod` via `zodResolver`. Never use uncontrolled inputs or
  manual `useState` for form values.
- Every input must have a matching `htmlFor`/`id` pair, an `aria-describedby` pointing to
  its inline error element, and `aria-invalid` driven by form validation state.
- Every user-facing async action (submit, save, fetch) must expose at least three states —
  loading, success, and error — with loading changing button label and success/error announced
  via `role="status"` or `role="alert"` respectively.

## AI assistant notes

When generating code, include TypeScript types, error handling, loading behavior, and accessible markup. Review generated code manually before accepting it, especially API input validation and assumptions about third-party SDK versions.
