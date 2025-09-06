"use client";

import { useState, useEffect } from "react";
import type { Message } from "@/types/message";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { QuickActions } from "./quick-actions";
import { formatTime } from "@/utils/formatTime";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { apiService } from "@/lib/axios";

interface MessageDialogProps {
  message: Message;
  onRefresh: () => void;
}

export function MessageDialog({ message, onRefresh }: MessageDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [localMessage, setLocalMessage] = useState(message);

  useEffect(() => {
    if (isOpen && localMessage.status === "unread") {
      markAsRead();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const markAsRead = async () => {
    try {
      interface ApiResponse {
        success: boolean;
        data: Message;
        error?: {
          code: string;
          message: string;
        };
      }

      const result = await apiService.patch<ApiResponse>(
        `/messages/${message.id}`,
        { status: "read" },
      );

      if (!result.success) {
        throw new Error(
          result.error?.message || "Failed to mark message as read",
        );
      }

      setLocalMessage({ ...localMessage, status: "read" });
      onRefresh();
    } catch (error) {
      console.error("error", error);
      toast.error("Failed to mark message as read");
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    onRefresh();
  };

  return (
    <>
      <Button variant="ghost" size="icon" onClick={() => setIsOpen(true)}>
        <Eye className="h-4 w-4" />
      </Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>Message Details</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="font-bold">From:</span>
              <span className="col-span-3">
                {localMessage.name} ({localMessage.email})
              </span>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="font-bold">Date:</span>
              <span className="col-span-3">
                {formatTime(localMessage.timestamp)}
              </span>
            </div>
            <div className="grid grid-cols-4 gap-4">
              <span className="font-bold">Content:</span>
              <ScrollArea className="col-span-3 h-32 w-full">
                <span className="w-full">{localMessage.message}</span>
              </ScrollArea>
            </div>
          </div>
          <QuickActions message={localMessage} onClose={handleClose} />
        </DialogContent>
      </Dialog>
    </>
  );
}
