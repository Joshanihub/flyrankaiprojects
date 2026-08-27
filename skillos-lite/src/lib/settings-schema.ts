import { z } from "zod";

export const settingsSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(80, "Name must be 80 characters or fewer"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Enter a valid email address"),
  notifications: z.boolean(),
});

export type SettingsValues = z.infer<typeof settingsSchema>;
