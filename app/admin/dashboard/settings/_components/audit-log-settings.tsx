/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Search,
  Filter,
  RefreshCw,
  Download,
  Info,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAuditLogStore } from "@/store/auditLogStore";

interface AuditLogSettingsProps {
  setIsLoading: (isLoading: boolean) => void;
}

export function AuditLogSettings({ setIsLoading }: AuditLogSettingsProps) {
  const {
    logs,
    totalLogs,
    totalPages,
    currentPage,
    actionTypes,
    isLoading,
    error,
    searchTerm,
    filterAction,
    logsPerPage,
    setSearchTerm,
    setFilterAction,
    setLogsPerPage,
    setCurrentPage,
    fetchLogs,
  } = useAuditLogStore();

  // Update parent loading state
  useEffect(() => {
    setIsLoading(isLoading);
  }, [isLoading, setIsLoading]);

  // Initial fetch
  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  const handleSearch = () => {
    setCurrentPage(1);
    fetchLogs();
  };

  const resetFilters = () => {
    setSearchTerm("");
    setFilterAction("");
    setCurrentPage(1);
    fetchLogs();
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchLogs();
  };

  const handleLogsPerPageChange = (value: string) => {
    setLogsPerPage(Number.parseInt(value, 10));
    setCurrentPage(1);
    fetchLogs();
  };

  const getActionBadgeColor = (action: string) => {
    const actionLower = action.toLowerCase();
    if (actionLower.includes("login") || actionLower.includes("success"))
      return "bg-green-100 text-green-800";
    if (
      actionLower.includes("error") ||
      actionLower.includes("fail") ||
      actionLower.includes("invalid")
    )
      return "bg-red-100 text-red-800";
    if (actionLower.includes("update") || actionLower.includes("change"))
      return "bg-blue-100 text-blue-800";
    if (actionLower.includes("create")) return "bg-purple-100 text-purple-800";
    if (actionLower.includes("delete")) return "bg-orange-100 text-orange-800";
    return "bg-gray-100 text-gray-800";
  };

  const getActionIcon = (action: string) => {
    const actionLower = action.toLowerCase();
    if (actionLower.includes("login") || actionLower.includes("success"))
      return <CheckCircle className="h-4 w-4 text-green-600" />;
    if (
      actionLower.includes("error") ||
      actionLower.includes("fail") ||
      actionLower.includes("invalid")
    )
      return <XCircle className="h-4 w-4 text-red-600" />;
    if (actionLower.includes("update") || actionLower.includes("change"))
      return <Info className="h-4 w-4 text-blue-600" />;
    if (actionLower.includes("create"))
      return <CheckCircle className="h-4 w-4 text-purple-600" />;
    if (actionLower.includes("delete"))
      return <AlertTriangle className="h-4 w-4 text-orange-600" />;
    return <Info className="h-4 w-4 text-gray-600" />;
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (error) {
      return "Invalid date";
    }
  };

  const exportToCSV = () => {
    try {
      // Create CSV content
      const headers = ["Action", "User", "Timestamp", "Details"];
      const csvRows = [headers];

      logs.forEach((log) => {
        const row = [
          log.action || "",
          log.user || "",
          formatDate(log.timestamp) || "",
          log.details || "",
        ];
        csvRows.push(row);
      });

      const csvContent = csvRows
        .map((row) =>
          row.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(","),
        )
        .join("\n");

      // Create and download the file
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute(
        "download",
        `audit-logs-${new Date().toISOString().split("T")[0]}.csv`,
      );
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success("Audit logs exported successfully");
    } catch (error) {
      console.error("Failed to export audit logs:", error);
      toast.error("Failed to export audit logs");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 py-4 text-white">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle className="text-2xl">Audit Logs</CardTitle>
              <CardDescription className="text-gray-100">
                View and manage system activity logs
              </CardDescription>
            </div>
            <div className="mt-4 md:mt-0">
              <Button
                variant="secondary"
                size="sm"
                onClick={exportToCSV}
                disabled={isLoading || logs.length === 0}
              >
                <Download className="mr-2 h-4 w-4" />
                Export CSV
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="mt-6">
          <div className="mb-6 flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-2">
            <div className="flex-1">
              <Input
                placeholder="Search by user, action or details..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
            </div>
            <Select value={filterAction} onValueChange={setFilterAction}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Filter by action" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Actions</SelectItem>
                {actionTypes.map((action) => (
                  <SelectItem key={action} value={action}>
                    {action}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              onClick={handleSearch}
              disabled={isLoading}
              className="w-full md:w-auto"
            >
              {isLoading ? (
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Search className="mr-2 h-4 w-4" />
              )}
              {isLoading ? "Searching..." : "Search"}
            </Button>
            <Button
              onClick={resetFilters}
              variant="outline"
              className="w-full md:w-auto"
            >
              <Filter className="mr-2 h-4 w-4" />
              Reset Filters
            </Button>
          </div>

          {error ? (
            <div className="flex h-40 flex-col items-center justify-center rounded-md border border-red-200 bg-red-50 p-6 text-center">
              <AlertTriangle className="mb-2 h-8 w-8 text-red-500" />
              <h3 className="text-lg font-medium text-red-800">
                Failed to load audit logs
              </h3>
              <p className="mt-1 text-sm text-red-600">
                There was an error loading the audit logs. Please try again.
              </p>
              <Button onClick={fetchLogs} variant="outline" className="mt-4">
                <RefreshCw className="mr-2 h-4 w-4" />
                Retry
              </Button>
            </div>
          ) : logs.length === 0 && !isLoading ? (
            <div className="flex h-40 flex-col items-center justify-center rounded-md border p-6 text-center">
              <Info className="mb-2 h-8 w-8 text-gray-400" />
              <h3 className="text-lg font-medium text-gray-900">
                No audit logs found
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchTerm || filterAction
                  ? "Try adjusting your search filters to find what you're looking for."
                  : "There are no audit logs in the system yet."}
              </p>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[180px]">Action</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead className="w-[180px]">Timestamp</TableHead>
                    <TableHead>Details</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading
                    ? Array.from({ length: logsPerPage }).map((_, index) => (
                        <TableRow key={`skeleton-${index}`}>
                          <TableCell>
                            <Skeleton className="h-6 w-24" />
                          </TableCell>
                          <TableCell>
                            <Skeleton className="h-6 w-32" />
                          </TableCell>
                          <TableCell>
                            <Skeleton className="h-6 w-32" />
                          </TableCell>
                          <TableCell>
                            <Skeleton className="h-6 w-full" />
                          </TableCell>
                        </TableRow>
                      ))
                    : logs.map((log) => (
                        <TableRow key={log.id}>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <div>{getActionIcon(log.action)}</div>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>{log.action}</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                              <Badge
                                className={getActionBadgeColor(log.action)}
                              >
                                {log.action}
                              </Badge>
                            </div>
                          </TableCell>
                          <TableCell className="font-medium">
                            {log.user}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-1">
                              <Clock className="h-3 w-3 text-gray-400" />
                              <span>{formatDate(log.timestamp)}</span>
                            </div>
                          </TableCell>
                          <TableCell className="max-w-md truncate">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <span className="cursor-help">
                                    {log.details}
                                  </span>
                                </TooltipTrigger>
                                <TooltipContent className="max-w-sm">
                                  <p>{log.details}</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </TableCell>
                        </TableRow>
                      ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col items-center justify-between space-y-4 border-t px-6 py-4 sm:flex-row sm:space-y-0">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <span>Show</span>
            <Select
              value={logsPerPage.toString()}
              onValueChange={handleLogsPerPageChange}
            >
              <SelectTrigger className="h-8 w-[70px]">
                <SelectValue placeholder={logsPerPage.toString()} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
            <span>per page</span>
            <span className="ml-4">
              {totalLogs > 0 ? (
                <>
                  Showing {(currentPage - 1) * logsPerPage + 1}-
                  {Math.min(currentPage * logsPerPage, totalLogs)} of{" "}
                  {totalLogs}
                </>
              ) : (
                "No results"
              )}
            </span>
          </div>

          {totalPages > 1 && (
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => handlePageChange(currentPage - 1)}
                    className={
                      currentPage === 1 ? "pointer-events-none opacity-50" : ""
                    }
                  />
                </PaginationItem>

                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter((page) => {
                    // Show first page, last page, current page, and pages around current page
                    return (
                      page === 1 ||
                      page === totalPages ||
                      Math.abs(page - currentPage) <= 1
                    );
                  })
                  .map((page, index, array) => {
                    // Add ellipsis if there are gaps
                    const prevPage = array[index - 1];
                    const showEllipsisBefore = prevPage && page - prevPage > 1;

                    return (
                      <React.Fragment key={page}>
                        {showEllipsisBefore && (
                          <PaginationItem>
                            <span className="flex h-9 w-9 items-center justify-center">
                              ...
                            </span>
                          </PaginationItem>
                        )}
                        <PaginationItem>
                          <PaginationLink
                            onClick={() => handlePageChange(page)}
                            isActive={currentPage === page}
                          >
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      </React.Fragment>
                    );
                  })}

                <PaginationItem>
                  <PaginationNext
                    onClick={() => handlePageChange(currentPage + 1)}
                    className={
                      currentPage === totalPages
                        ? "pointer-events-none opacity-50"
                        : ""
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
}
