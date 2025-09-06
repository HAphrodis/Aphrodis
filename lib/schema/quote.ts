import * as z from "zod";

export const quoteSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  projectType: z.string().min(1, { message: "Please select a project type." }),
  budget: z.string().optional(),
  timeline: z.string().min(1, { message: "Please select a timeline." }),
  projectDetails: z
    .string()
    .min(10, { message: "Please provide more details about your project." }),
});
