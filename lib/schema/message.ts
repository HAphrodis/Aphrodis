// lib\schema\message.ts
import { z } from "zod";
// import { parsePhoneNumber, isValidPhoneNumber } from "libphonenumber-js";

export const messageSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Names are required" })
    .min(2, { message: "Names are too short" }),

  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Please enter a valid email address" })
    .max(254, { message: "Email must not exceed 254 characters" }),

  phone: z.string().min(1, { message: "Phone number is required" }),
  // .refine(
  //   (value) => {
  //     try {
  //       return isValidPhoneNumber(value);
  //     } catch {
  //       return false;
  //     }
  //   },
  //   { message: "Please enter a valid phone number" },
  // )
  // .transform((value) => {
  //   try {
  //     const phoneNumber = parsePhoneNumber(value);
  //     return phoneNumber.format("E.164");
  //   } catch {
  //     return value;
  //   }
  // })
  subject: z.string().optional(),
  message: z
    .string()
    .min(1, { message: "Message is required" })
    .min(3, { message: "Message must be at least 3 characters long" })
    .max(1000, { message: "Message must not exceed 1000 characters" })
    .refine((value) => value.trim().length > 0, {
      message: "Message cannot be only whitespace",
    }),
});

export type MessageFormData = z.infer<typeof messageSchema>;
