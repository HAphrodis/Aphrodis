import { z } from "zod";

export const auditLogQuerySchema = z.object({
  searchTerm: z.string().optional(),
  filterAction: z.string().optional(),
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().default(10),
});

export type AuditLogQueryParams = z.infer<typeof auditLogQuerySchema>;

export const auditLogSchema = z.object({
  id: z.string(),
  action: z.string(),
  user: z.string(),
  timestamp: z.string(),
  details: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type AuditLog = z.infer<typeof auditLogSchema>;
