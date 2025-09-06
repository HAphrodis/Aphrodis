import { z } from "zod";

export const messageSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(100, "Name is too long")
    .trim(),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email address")
    .max(100, "Email is too long")
    .trim()
    .toLowerCase(),
  phone: z
    .string()
    .min(10, { message: "Please enter a valid phone number" })
    .max(20, { message: "Phone number must not exceed 15 characters" }),
  subject: z
    .string(),
  message: z
    .string()
    .min(5, { message: "Message must be at least 5 characters" })
    .max(1000, { message: "Message is too long" }),
});

export type MessageFormData = z.infer<typeof messageSchema>;
export type MessageInput = z.input<typeof messageSchema>;
