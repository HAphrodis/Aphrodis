import * as z from "zod";

export const profileFormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  bio: z.string().max(160).min(4),
  urls: z.object({
    twitter: z
      .string()
      .url({ message: "Please enter a valid URL." })
      .optional()
      .or(z.literal("")),
    github: z
      .string()
      .url({ message: "Please enter a valid URL." })
      .optional()
      .or(z.literal("")),
  }),
});

export const appearanceFormSchema = z.object({
  theme: z.enum(["light", "dark", "system"], {
    required_error: "Please select a theme.",
  }),
});

export const notificationFormSchema = z.object({
  emailNotifications: z.boolean().default(false).optional(),
  pushNotifications: z.boolean().default(false).optional(),
});

export type ProfileFormValues = z.infer<typeof profileFormSchema>;
export type AppearanceFormValues = z.infer<typeof appearanceFormSchema>;
export type NotificationFormValues = z.infer<typeof notificationFormSchema>;
