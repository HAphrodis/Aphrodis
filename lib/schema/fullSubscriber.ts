import { z } from "zod";

export const subscriberSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),
  names: z
    .string()
    .min(1, { message: "Name is required" })
    .min(3, { message: "Name is short" }),
});

export type SubscriberFormData = z.infer<typeof subscriberSchema>;
