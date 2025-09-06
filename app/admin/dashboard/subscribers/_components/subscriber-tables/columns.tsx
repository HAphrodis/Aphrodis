/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { useState } from "react";
import type { Subscriber } from "@/types/subscriber";
import type { ColumnDef } from "@tanstack/react-table";
import { formatTime } from "@/utils/formatTime";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { EditSubscriberDialog } from "../edit-subscriber-dialog";
import { DeleteSubscriberDialog } from "../delete-subscriber-dialog";
import { apiService } from "@/lib/axios";
import { toast } from "sonner";

export const columns: ColumnDef<Subscriber>[] = [
  {
    accessorKey: "id",
    header: "#",
    cell: ({ row }) => {
      return <div className="pr-1">{row.index + 1}</div>;
    },
  },
  {
    accessorKey: "name",
    header: "NAME",
    cell: ({ row }) => {
      return <div>{row.original.name || "N/A"}</div>;
    },
  },
  {
    accessorKey: "email",
    header: "EMAIL",
    cell: ({ row }) => {
      return <div>{row.original.email}</div>;
    },
  },
  {
    accessorKey: "timestamp",
    header: "SUBSCRIBED ON",
    cell: ({ row }) => {
      return <div>{formatTime(row.original.timestamp)}</div>;
    },
  },
  {
    accessorKey: "status",
    header: "STATUS",
    cell: ({ row }) => {
      const status = row.original.status;
      // Customize badge color using className
      return (
        <Badge
          className={
            status === "active"
              ? "bg-green-100 rounded-2xl text-green-800 border-green-200"
              : "bg-red-100 text-red-800 rounded-2xl border-red-200"
          }
        >
          {status === "active" ? "Active" : "Unsubscribed"}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const subscriber = row.original;
      const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
      const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

      const handleStatusToggle = async () => {
        try {
          const newStatus =
            subscriber.status === "active" ? "unsubscribed" : "active";

          interface ApiResponse {
            success: boolean;
            data: Subscriber;
            message?: string;
            error?: {
              code: string;
              message: string;
            };
          }

          const result = await apiService.patch<ApiResponse>(
            `/subscribers/${subscriber.id}`,
            {
              status: newStatus,
            },
          );

          if (!result.success) {
            throw new Error(
              result.error?.message || "Failed to update subscriber status",
            );
          }

          toast.success(
            `Subscriber ${newStatus === "active" ? "activated" : "unsubscribed"} successfully`,
          );
          window.location.reload(); // Refresh the page to show updated data
        } catch (error) {
          console.error("Error updating subscriber status:", error);
          toast.error("Failed to update subscriber status");
        }
      };

      return (
        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => setIsEditDialogOpen(true)}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleStatusToggle}>
                {subscriber.status === "active" ? "Unsubscribe" : "Activate"}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setIsDeleteDialogOpen(true)}
                className="text-red-600"
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <EditSubscriberDialog
            subscriber={subscriber}
            isOpen={isEditDialogOpen}
            onClose={() => setIsEditDialogOpen(false)}
          />

          <DeleteSubscriberDialog
            subscriber={subscriber}
            isOpen={isDeleteDialogOpen}
            onClose={() => setIsDeleteDialogOpen(false)}
          />
        </div>
      );
    },
  },
];
