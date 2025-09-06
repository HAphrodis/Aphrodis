import { create } from "zustand";
import { apiService } from "@/lib/axios";

interface AuditLog {
  id: string;
  action: string;
  user: string;
  timestamp: string;
  details: string;
  createdAt: string;
  updatedAt: string;
}

interface AuditLogState {
  logs: AuditLog[];
  totalLogs: number;
  totalPages: number;
  currentPage: number;
  actionTypes: string[];
  isLoading: boolean;
  error: string | null;
  searchTerm: string;
  filterAction: string;
  logsPerPage: number;

  // Actions
  setSearchTerm: (term: string) => void;
  setFilterAction: (action: string) => void;
  setLogsPerPage: (count: number) => void;
  setCurrentPage: (page: number) => void;
  fetchLogs: () => Promise<void>;
  createLog: (action: string, details: string) => Promise<void>;
}

export const useAuditLogStore = create<AuditLogState>((set, get) => ({
  logs: [],
  totalLogs: 0,
  totalPages: 0,
  currentPage: 1,
  actionTypes: [],
  isLoading: false,
  error: null,
  searchTerm: "",
  filterAction: "",
  logsPerPage: 10,

  setSearchTerm: (term) => set({ searchTerm: term }),
  setFilterAction: (action) => set({ filterAction: action }),
  setLogsPerPage: (count) => set({ logsPerPage: count }),
  setCurrentPage: (page) => set({ currentPage: page }),

  fetchLogs: async () => {
    const { searchTerm, filterAction, currentPage, logsPerPage } = get();

    set({ isLoading: true, error: null });

    try {
      const response = await apiService.get<{
        success: boolean;
        data: {
          logs: AuditLog[];
          totalLogs: number;
          totalPages: number;
          currentPage: number;
          actionTypes: string[];
        };
        message?: string;
      }>("/admin/audit-logs", {
        params: {
          searchTerm: searchTerm || undefined,
          filterAction: filterAction || undefined,
          page: currentPage,
          limit: logsPerPage,
        },
      });

      const data = response.data;
      set({
        logs: data.logs,
        totalLogs: data.totalLogs,
        totalPages: data.totalPages,
        currentPage: data.currentPage,
        actionTypes: data.actionTypes,
      });
    } catch (error) {
      console.error("Failed to fetch audit logs:", error);
      set({ error: "Failed to fetch audit logs" });
    } finally {
      set({ isLoading: false });
    }
  },

  createLog: async (action, details) => {
    try {
      await apiService.post("/admin/audit-logs", {
        action,
        details,
      });

      // Optionally refresh logs after creating a new one
      await get().fetchLogs();
    } catch (error) {
      console.error("Error creating audit log:", error);
    }
  },
}));
