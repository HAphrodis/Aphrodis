// lib\schema\member.ts
import { z } from "zod";

export const studentSchema = z.object({
  first_name: z
    .string()
    .min(1, "First name is required")
    .min(2, "First name must be at least 2 characters"),
  last_name: z
    .string()
    .min(1, "Last name is required")
    .min(2, "Last name must be at least 2 characters"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .min(10, "Invalid phone number"),
  student_id: z
    .string()
    .min(1, "Student ID is required")
    .min(9, "Student ID must be at least 9 characters"),
  level: z.enum(["1", "2", "3", "4"], {
    required_error: "Please select your year of study",
  }),
  department: z.enum(["HND", "EHS"], {
    required_error: "Please select your department",
  }),
  terms: z.boolean().refine((value) => value, {
    message: "You must agree to the terms and conditions",
  }),
  requirements: z.boolean().refine((value) => value, {
    message: "You must agree to the registration requirements",
  }),
});

export const sponsorSchema = z.object({
  names: z.string().min(3, "Name(s) must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  organization: z
    .string()
    .min(2, "Organization name must be at least 2 characters"),
  sponsor_type: z.enum(["individual", "corporate", "ngo", "academic"], {
    required_error: "Please select a sponsorship type",
  }),
  message: z.string().optional(),
});

export type StudentFormData = z.infer<typeof studentSchema>;
export type SponsorFormData = z.infer<typeof sponsorSchema>;
