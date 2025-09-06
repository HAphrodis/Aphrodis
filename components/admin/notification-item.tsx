"use client";

import type * as React from "react";
import {
  AlertTriangle,
  CheckCircle,
  Ellipsis,
  Info,
  XCircle,
  ExternalLink,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface NotificationItemProps {
  notification: {
    id?: string;
    _id?: string;
    title: string;
    message: string;
    type: "error" | "warning" | "success" | "info";
    timestamp: string;
    read: string | boolean;
    archived: string | boolean;
    link?: string;
  };
  onMarkAsRead: () => void;
  onArchive: () => void;
  onDelete: () => void;
}

const typeConfig: Record<
  string,
  {
    icon: React.ComponentType<{ className?: string }>;
    iconColor: string;
    badgeColor: string;
    bgColor: string;
    borderColor: string;
  }
> = {
  error: {
    icon: XCircle,
    iconColor: "text-red-500",
    badgeColor: "bg-red-50 text-red-700 border-red-200 hover:bg-red-100",
    bgColor: "hover:bg-red-50/50",
    borderColor: "border-l-red-500",
  },
  warning: {
    icon: AlertTriangle,
    iconColor: "text-yellow-500",
    badgeColor:
      "bg-yellow-50 text-yellow-700 border-yellow-200 hover:bg-yellow-100",
    bgColor: "hover:bg-yellow-50/50",
    borderColor: "border-l-yellow-500",
  },
  success: {
    icon: CheckCircle,
    iconColor: "text-green-500",
    badgeColor:
      "bg-green-50 text-green-700 border-green-200 hover:bg-green-100",
    bgColor: "hover:bg-green-50/50",
    borderColor: "border-l-green-500",
  },
  info: {
    icon: Info,
    iconColor: "text-blue-500",
    badgeColor: "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100",
    bgColor: "hover:bg-blue-50/50",
    borderColor: "border-l-blue-500",
  },
};

export function NotificationItem({
  notification,
  onMarkAsRead,
  onArchive,
  onDelete,
}: NotificationItemProps) {
  const isRead = notification.read === "true" || notification.read === true;
  const isArchived =
    notification.archived === "true" || notification.archived === true;

  const config = typeConfig[notification.type] || typeConfig.info;
  const Icon = config.icon;

  // Format timestamp to be more readable
  const formatTimestamp = (timestamp: string) => {
    try {
      const date = new Date(timestamp);
      const now = new Date();
      const diffInMinutes = Math.floor(
        (now.getTime() - date.getTime()) / (1000 * 60),
      );

      if (diffInMinutes < 1) return "Just now";
      if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
      if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
      if (diffInMinutes < 10080)
        return `${Math.floor(diffInMinutes / 1440)}d ago`;
      return date.toLocaleDateString();
    } catch {
      return timestamp;
    }
  };

  const NotificationContent = () => (
    <div className="flex-1 space-y-2 min-w-0">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <h4 className="text-sm font-medium text-gray-900 truncate">
            {notification.title}
          </h4>
          <Badge
            variant="outline"
            className={cn("text-xs font-medium", config.badgeColor)}
          >
            {notification.type}
          </Badge>
          {!isRead && (
            <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />
          )}
        </div>
      </div>

      <p className="text-sm text-gray-600 dark:text-gray-200 line-clamp-2 leading-relaxed">
        {notification.message}
      </p>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <Clock className="w-3 h-3" />
          <span>{formatTimestamp(notification.timestamp)}</span>
        </div>

        {notification.link && (
          <Link
            href={notification.link}
            className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 font-medium transition-colors"
          >
            View details
            <ExternalLink className="w-3 h-3" />
          </Link>
        )}
      </div>
    </div>
  );

  return (
    <div
      className={cn(
        "group relative border-l-4 transition-all duration-200",
        config.borderColor,
        config.bgColor,
        !isRead ? "bg-blue-50/10" : "hover:bg-gray-50/30",
        isArchived && "opacity-75",
      )}
    >
      <div className="flex items-start gap-4 p-4">
        <div className="flex-shrink-0 mt-0.5">
          <Icon className={cn("h-5 w-5", config.iconColor)} />
        </div>

        {notification.link ? (
          <Link href={notification.link} className="flex-1 min-w-0">
            <NotificationContent />
          </Link>
        ) : (
          <NotificationContent />
        )}

        <div className="flex-shrink-0">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <span className="sr-only">Open notification actions</span>
                <Ellipsis className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {!isRead && (
                <DropdownMenuItem
                  onClick={onMarkAsRead}
                  className="cursor-pointer"
                >
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Mark as read
                </DropdownMenuItem>
              )}

              {!isArchived && (
                <DropdownMenuItem
                  onClick={onArchive}
                  className="cursor-pointer"
                >
                  <Info className="mr-2 h-4 w-4" />
                  Archive
                </DropdownMenuItem>
              )}

              {notification.link && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href={notification.link} className="cursor-pointer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Open link
                    </Link>
                  </DropdownMenuItem>
                </>
              )}

              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={onDelete}
                className="cursor-pointer text-red-600 focus:text-red-600"
              >
                <XCircle className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Status indicators */}
      <div className="absolute top-2 right-2 flex gap-1">
        {isArchived && (
          <Badge variant="secondary" className="text-xs px-1.5 py-0.5">
            Archived
          </Badge>
        )}
      </div>
    </div>
  );
}
