"use client";

import { cn } from "@/lib/utils";

import { useEffect, useState } from "react";
import { Bell, RefreshCw, Archive, CheckCheck } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NotificationItem } from "./notification-item";
import { useNotificationStore } from "@/store/notificationStore";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import moment from "moment";
import { NotificationSettings } from "./notification-settings";
import { toast } from "sonner";

export function NotificationPopover() {
  const {
    notifications,
    loading,
    error,
    fetchNotifications,
    updateNotification,
  } = useNotificationStore();
  const [isOpen, setIsOpen] = useState(false);

  // Ensure notifications is always an array before filtering
  const safeNotifications = Array.isArray(notifications) ? notifications : [];

  const unreadCount = safeNotifications.filter((n) => {
    const isRead = n.read === true;
    const isArchived = n.archived == true;
    return !isRead && !isArchived;
  }).length;

  const readCount = safeNotifications.filter((n) => {
    const isRead = n.read === true;
    return isRead && n.archived === false;
  }).length;

  useEffect(() => {
    if (isOpen) {
      fetchNotifications();
    }
  }, [isOpen, fetchNotifications]);

  const handleAction = async (id: string, action: string) => {
    try {
      await updateNotification(id, action);

      // Show success toast
      switch (action) {
        case "markAsRead":
          toast.success("Notification marked as read");
          break;
        case "archive":
          toast.success("Notification archived");
          break;
        case "delete":
          toast.success("Notification deleted");
          break;
      }
    } catch (error) {
      console.error("Failed to update notification:", error);
      toast.error("Failed to update notification");
    }
  };

  const handleMarkAllAsRead = async () => {
    const unreadNotifications = safeNotifications.filter((n) => {
      const isRead = n.read === true;
      const isArchived = n.archived === true;
      return !isRead && !isArchived;
    });

    try {
      await Promise.all(
        unreadNotifications.map((notification) =>
          updateNotification(
            notification.id || notification._id || "",
            "markAsRead",
          ),
        ),
      );
      toast.success(
        `Marked ${unreadNotifications.length} notifications as read`,
      );
    } catch (error) {
      console.error("Failed to mark all as read:", error);
      toast.error("Failed to mark all notifications as read");
    }
  };

  const handleRefresh = () => {
    fetchNotifications();
    toast.success("Notifications refreshed");
  };

  // Show error state if there's an error
  if (error) {
    return (
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
                {unreadCount}
              </span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[400px] p-4" align="end">
          <div className="text-center">
            <div className="text-red-500 mb-2">
              <Bell className="h-8 w-8 mx-auto" />
            </div>
            <p className="text-sm font-medium text-red-600">
              Error loading notifications
            </p>
            <p className="text-xs text-gray-500 mt-1">{error}</p>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              className="mt-3"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Retry
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    );
  }

  const inboxNotifications = safeNotifications.filter((n) => {
    const isArchived = n.archived === true;
    return !isArchived;
  });

  const archivedNotifications = safeNotifications.filter((n) => {
    const isArchived = n.archived === true;
    return isArchived;
  });

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white animate-pulse">
              {unreadCount > 99 ? "99+" : unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[420px] rounded-md p-0" align="end">
        <div className="border-b bg-gray-700 px-4 py-1">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-900 dark:text-gray-300">
              Notifications
            </h3>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRefresh}
                disabled={loading}
              >
                <RefreshCw
                  className={cn("h-4 w-4", loading && "animate-spin")}
                />
              </Button>
              <NotificationSettings />
            </div>
          </div>
        </div>

        <Tabs defaultValue="inbox" className="w-full ">
          <div className="border-b px-4 py-1">
            <TabsList className="grid h-9 grid-cols-3 w-full">
              <TabsTrigger value="inbox" className="text-sm">
                Inbox ({unreadCount})
              </TabsTrigger>
              <TabsTrigger value="archive" className="text-sm">
                Archive ({archivedNotifications.length})
              </TabsTrigger>

              <TabsTrigger value="read" className="text-sm">
                Read ({readCount})
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="inbox" className="p-0 m-0">
            {inboxNotifications.length > 0 && (
              <div className="border-b px-4 py-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleMarkAllAsRead}
                  disabled={unreadCount === 0}
                  className="text-xs"
                >
                  <CheckCheck className="h-3 w-3 mr-1" />
                  Mark all as read
                </Button>
              </div>
            )}

            <ScrollArea className="h-[400px]">
              {loading ? (
                <div className="space-y-1">
                  {Array.from({ length: 3 }).map((_, idx) => (
                    <div key={idx} className="p-4 border-l-4 border-gray-200">
                      <div className="flex gap-4">
                        <Skeleton circle width={20} height={20} />
                        <div className="flex-1">
                          <Skeleton height={16} width="80%" className="mb-2" />
                          <Skeleton height={14} width="60%" className="mb-2" />
                          <Skeleton height={12} width="40%" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : inboxNotifications.length === 0 ? (
                <div className="p-8 text-center">
                  <Bell className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                  <p className="text-sm font-medium text-gray-500">
                    No notifications
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    You&apos;re all caught up!
                  </p>
                </div>
              ) : (
                <div className="divide-y">
                  {inboxNotifications.map((notification) => (
                    <NotificationItem
                      key={notification.id || notification._id}
                      notification={{
                        ...notification,
                        timestamp: moment(notification.timestamp).fromNow(),
                      }}
                      onMarkAsRead={() =>
                        handleAction(
                          notification.id || notification._id || "",
                          "markAsRead",
                        )
                      }
                      onArchive={() =>
                        handleAction(
                          notification.id || notification._id || "",
                          "archive",
                        )
                      }
                      onDelete={() =>
                        handleAction(
                          notification.id || notification._id || "",
                          "delete",
                        )
                      }
                    />
                  ))}
                </div>
              )}
            </ScrollArea>
          </TabsContent>

          <TabsContent value="archive" className="p-0 m-0">
            <ScrollArea className="h-[400px]">
              {archivedNotifications.length === 0 ? (
                <div className="p-8 text-center">
                  <Archive className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                  <p className="text-sm font-medium text-gray-500">
                    No archived notifications
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Archived notifications will appear here
                  </p>
                </div>
              ) : (
                <div className="divide-y">
                  {archivedNotifications.map((notification) => (
                    <NotificationItem
                      key={notification.id || notification._id}
                      notification={{
                        ...notification,
                        timestamp: moment(notification.timestamp).fromNow(),
                      }}
                      onMarkAsRead={() =>
                        handleAction(
                          notification.id || notification._id || "",
                          "markAsRead",
                        )
                      }
                      onDelete={() =>
                        handleAction(
                          notification.id || notification._id || "",
                          "delete",
                        )
                      }
                      onArchive={() => {
                        // Archive action not needed for already archived items
                        // console.log("Item already archived");
                      }}
                    />
                  ))}
                </div>
              )}
            </ScrollArea>
          </TabsContent>

          <TabsContent value="read" className="p-0 m-0">
            <ScrollArea className="h-[400px]">
              {safeNotifications.filter((n) => n.read === true).length === 0 ? (
                <div className="p-8 text-center">
                  <CheckCheck className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                  <p className="text-sm font-medium text-gray-500">
                    No read notifications
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Read notifications will appear here
                  </p>
                </div>
              ) : (
                <div className="divide-y">
                  {safeNotifications
                    .filter((n) => n.read === true)
                    .map((notification) => (
                      <NotificationItem
                        key={notification.id || notification._id}
                        notification={{
                          ...notification,
                          timestamp: moment(notification.timestamp).fromNow(),
                        }}
                        onMarkAsRead={() =>
                          handleAction(
                            notification.id || notification._id || "",
                            "markAsRead",
                          )
                        }
                        onArchive={() =>
                          handleAction(
                            notification.id || notification._id || "",
                            "archive",
                          )
                        }
                        onDelete={() =>
                          handleAction(
                            notification.id || notification._id || "",
                            "delete",
                          )
                        }
                      />
                    ))}
                </div>
              )}
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </PopoverContent>
    </Popover>
  );
}
