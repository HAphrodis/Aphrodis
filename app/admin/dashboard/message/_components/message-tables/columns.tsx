/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { useState } from "react";
import type { Message } from "@/types/message";
import type { ColumnDef } from "@tanstack/react-table";
import { formatTime } from "@/utils/formatTime";
import { Mail, MailOpen, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { DataTableColumnHeader } from "./data-table-column-header";
import { MessageDialog } from "../message-dialog";
import { Button } from "@/components/ui/button";
import { DeleteConfirmDialog } from "../delete-confirm-dialog";
import { toast } from "sonner";
import { apiService } from "@/lib/axios";

interface ColumnProps {
  onRefresh: () => void;
}

export const createColumns = ({
  onRefresh,
}: ColumnProps): ColumnDef<Message>[] => [
  {
    accessorKey: "id",
    header: "#",
    cell: ({ row }) => {
      return <div className="pr-1">{row.index + 1}</div>;
    },
  },
  {
    accessorKey: "timestamp",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="DATE" />
    ),
    cell: ({ row }) => {
      return <div className={cn("")}>{formatTime(row.original.timestamp)}</div>;
    },
    enableSorting: true,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="SENDER" />
    ),
    cell: ({ row }) => {
      return <div className={cn("")}>{row.original.name}</div>;
    },
    enableSorting: true,
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="EMAIL" />
    ),
    cell: ({ row }) => {
      return <div className="">{row.original.email}</div>;
    },
    enableSorting: true,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="STATUS"
        className="mx-auto"
      />
    ),
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <div className="ml-6 flex">
          {status === "unread" ? (
            <Mail className="h-4 w-4 text-blue-500" />
          ) : (
            <MailOpen className="text-muted-foreground h-4 w-4" />
          )}
        </div>
      );
    },
    enableSorting: true,
  },
  {
    accessorKey: "message",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="CONTENT" />
    ),
    cell: ({ row }) => {
      return (
        <div className="max-w-[200px] truncate">{row.original.message}</div>
      );
    },
    enableSorting: true,
  },
  {
    id: "actions",
    header: "ACTIONS",
    cell: ({ row }) => {
      const message = row.original;
      const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

      const handleDelete = async () => {
        try {
          interface ApiResponse {
            success: boolean;
            data: { id: string };
            message?: string;
            error?: {
              code: string;
              message: string;
            };
          }

          const result = await apiService.delete<ApiResponse>(
            `/messages/${message.id}`,
          );

          if (!result.success) {
            throw new Error(
              result.error?.message || "Failed to delete message",
            );
          }

          toast.success("Message deleted successfully");
          onRefresh();
        } catch (error) {
          console.error("error", error);
          toast.error("Failed to delete message");
        }
      };

      return (
        <div className="flex justify-center space-x-2">
          <MessageDialog message={message} onRefresh={onRefresh} />
          <Button
            variant="ghost"
            size="icon"
            className="text-red-500"
            onClick={() => setIsDeleteDialogOpen(true)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
          <DeleteConfirmDialog
            isOpen={isDeleteDialogOpen}
            onClose={() => setIsDeleteDialogOpen(false)}
            onConfirm={handleDelete}
          />
        </div>
      );
    },
  },
];
