"use client";

import type { Message } from "@/types/message";
import { Button } from "@/components/ui/button";
import { Mail, Archive, Star } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";
import { apiService } from "@/lib/axios";

interface QuickActionsProps {
  message: Message;
  onClose: () => void;
}

export function QuickActions({ message }: QuickActionsProps) {
  const [isStarred, setIsStarred] = useState(false); // Star is not supported in new API
  const [isArchived, setIsArchived] = useState(message.status === "archived");
  const [isRead, setIsRead] = useState(
    message.status === "read" ||
      message.status === "replied" ||
      message.status === "archived",
  );

  const handleAction = async (action: string) => {
    try {
      let newStatus: string;

      // Map actions to new API status
      switch (action) {
        case "toggleRead":
          newStatus = isRead ? "unread" : "read";
          break;
        case "toggleArchive":
          newStatus = isArchived ? "read" : "archived";
          break;
        case "toggleStar":
          // Star is not supported in new API, but we'll keep the UI working
          setIsStarred(!isStarred);
          toast.success(isStarred ? "Message unstarred" : "Message starred");
          return;
        default:
          newStatus = "read";
      }

      interface ApiResponse {
        success: boolean;
        data: Message;
        message?: string;
        error?: {
          code: string;
          message: string;
        };
      }

      const result = await apiService.patch<ApiResponse>(
        `/messages/${message.id}`,
        { status: newStatus },
      );

      if (!result.success) {
        throw new Error(result.error?.message || "Failed to perform action");
      }

      switch (action) {
        case "toggleRead":
          setIsRead(!isRead);
          break;
        case "toggleArchive":
          setIsArchived(!isArchived);
          break;
      }

      toast.success(result.message || "Action completed successfully");
    } catch (error) {
      console.error("error", error);
      toast.error("An error occurred");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="grid grid-cols-2 gap-4">
        <Button
          variant="outline"
          className="w-full justify-start"
          onClick={() => handleAction("toggleArchive")}
        >
          <Archive className="mr-2 h-4 w-4" />
          {isArchived ? "Unarchive" : "Archive"}
        </Button>
        <Button
          variant="outline"
          className={`w-full justify-start ${isStarred ? "bg-yellow-100 hover:bg-yellow-200 dark:text-black" : ""}`}
          onClick={() => handleAction("toggleStar")}
        >
          <Star
            className={`mr-2 h-4 w-4 ${isStarred ? "fill-yellow-400" : ""}`}
          />
          {isStarred ? "Unstar" : "Star"}
        </Button>

        <Button
          variant="outline"
          className="col-span-2 w-full"
          onClick={() => handleAction("toggleRead")}
        >
          <Mail className="mr-2 h-4 w-4" />
          Mark as {isRead ? "Unread" : "Read"}
        </Button>
      </div>
    </motion.div>
  );
}
