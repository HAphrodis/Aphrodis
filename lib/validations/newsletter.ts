// lib\validations\newsletter.ts

import * as z from "zod";

export const subscribeSchema = z.object({
  status: z
    .enum(["active", "inactive"], {
      errorMap: () => ({ message: "Invalid status" }),
    })
    .default("active"),

  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email address")
    .max(100, "Email is too long")
    .trim()
    .toLowerCase(),
});

export type SubscribeInput = z.infer<typeof subscribeSchema>;
