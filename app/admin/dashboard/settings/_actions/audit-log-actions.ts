/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import type { z } from "zod";
import AuditLog from "@/models/AuditLog";
import { auth } from "@/utils/auth";
import { auditLogQuerySchema } from "@/lib/schema/auditLog";

export type AuditLogQueryParams = z.infer<typeof auditLogQuerySchema>;

export async function getAuditLogs(params: AuditLogQueryParams) {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return { error: "Unauthorized" };
    }

    const { searchTerm, filterAction, page, limit } =
      auditLogQuerySchema.parse(params);

    // Get all logs
    const allLogs = await AuditLog.getAll();

    // Filter logs based on search term and action
    let filteredLogs = [...allLogs];

    if (searchTerm) {
      const searchTermLower = searchTerm.toLowerCase();
      filteredLogs = filteredLogs.filter(
        (log) =>
          (log.user && log.user.toLowerCase().includes(searchTermLower)) ||
          (log.action && log.action.toLowerCase().includes(searchTermLower)) ||
          (log.details && log.details.toLowerCase().includes(searchTermLower)),
      );
    }

    if (filterAction && filterAction !== "all") {
      filteredLogs = filteredLogs.filter((log) => log.action === filterAction);
    }

    // Sort logs by timestamp (newest first)
    filteredLogs.sort((a, b) => {
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    });

    // Get unique action types for filtering
    const actionTypes = Array.from(
      new Set(allLogs.map((log) => log.action)),
    ).sort();

    // Calculate pagination
    const totalLogs = filteredLogs.length;
    const totalPages = Math.ceil(totalLogs / limit);
    const startIndex = (page - 1) * limit;
    const paginatedLogs = filteredLogs.slice(startIndex, startIndex + limit);

    return {
      logs: paginatedLogs.map((log) => ({
        ...log,
        id: log.id || `log-${log.timestamp}-${log.action}`, // Ensure id is always defined
      })),
      totalLogs,
      totalPages,
      currentPage: page,
      actionTypes,
    };
  } catch (error) {
    console.error("Error getting audit logs:", error);
    return { error: "Failed to fetch audit logs" };
  }
}

export async function createAuditLog(
  logData: Pick<any, "action" | "user" | "details">,
) {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return { error: "Unauthorized" };
    }

    const newLog = await AuditLog.create(logData);
    return { success: true, log: newLog };
  } catch (error) {
    console.error("Error creating audit log:", error);
    return { error: "Failed to create audit log" };
  }
}
