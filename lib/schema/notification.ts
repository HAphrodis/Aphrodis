// lib/schema/notification.ts
import { z } from "zod";

export const notificationSchema = z.object({
  _id: z.string().optional(),
  title: z.string().min(1, "Title is required"),
  message: z.string().min(1, "Message is required"),
  type: z.enum(["error", "warning", "success", "info"]),
  timestamp: z.string().datetime({ message: "Invalid timestamp format" }),
  read: z.boolean().default(false),
  archived: z.boolean().default(false),
  link: z.string().optional(),
  id: z.string().optional(),
});

export type NotificationData = z.infer<typeof notificationSchema>;
