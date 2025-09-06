import { z } from "zod";

export const featureRequestSchema = z.object({
  title: z
    .string()
    .min(5, "Title must be at least 5 characters")
    .max(100, "Title must be at most 100 characters"),
  description: z
    .string()
    .min(20, "Description must be at least 20 characters")
    .max(1000, "Description must be at most 1000 characters"),
  priority: z.enum(["low", "medium", "high"]).default("medium"),
  requestedBy: z.string().email("Please provide a valid email address"),
});

export type FeatureRequestInput = z.infer<typeof featureRequestSchema>;

export const featureRequestUpdateSchema = z.object({
  title: z
    .string()
    .min(5, "Title must be at least 5 characters")
    .max(100, "Title must be at most 100 characters")
    .optional(),
  description: z
    .string()
    .min(20, "Description must be at least 20 characters")
    .max(1000, "Description must be at most 1000 characters")
    .optional(),
  priority: z.enum(["low", "medium", "high"]).optional(),
  status: z
    .enum(["pending", "in-progress", "completed", "rejected"])
    .optional(),
});

export type FeatureRequestUpdate = z.infer<typeof featureRequestUpdateSchema>;
