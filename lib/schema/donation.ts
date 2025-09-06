import { z } from "zod";
// import { parsePhoneNumber, isValidPhoneNumber } from "libphonenumber-js";

export const donationSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: "First name is required" })
    .min(2, { message: "First name is too short" }),

  lastName: z
    .string()
    .min(1, { message: "Last name is required" })
    .min(2, { message: "Last name is too short" }),

  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Please enter a valid email address" })
    .max(254, { message: "Email must not exceed 254 characters" }),

  phone: z.string().optional(),

  country: z.string().min(1, { message: "Country is required" }),

  amount: z.number().min(1, { message: "Amount must be at least 1" }),

  frequency: z.enum(["onetime", "monthly"], {
    errorMap: () => ({ message: "Please select a valid donation frequency" }),
  }),

  message: z.string().optional(),
});

export type DonationFormData = z.infer<typeof donationSchema>;
