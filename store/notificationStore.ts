import { create } from "zustand";
import axios from "axios";
import type { NotificationData } from "@/lib/schema/notification";

interface NotificationState {
  notifications: NotificationData[];
  loading: boolean;
  error: string | null;
  fetchNotifications: () => Promise<void>;
  updateNotification: (id: string, action: string) => Promise<void>;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [],
  loading: false,
  error: null,

  fetchNotifications: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get("/api/notifications");
      // console.log("API Response:", response.data);

      // Fix: Access the correct property from the API response
      const notificationsData = response.data?.data?.notifications || [];

      // Filter out null values and ensure we always have an array
      const validNotifications = Array.isArray(notificationsData)
        ? notificationsData.filter(
            (notification) =>
              notification !== null && notification !== undefined,
          )
        : [];

      // console.log("Valid notifications:", validNotifications);

      set({
        notifications: validNotifications,
        loading: false,
        error: null,
      });
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
      set({
        notifications: [], // Ensure it's always an array
        loading: false,
        error: "Failed to fetch notifications",
      });
    }
  },

  updateNotification: async (_id, action) => {
    try {
      const response = await axios.post("/api/notifications", {
        id: _id,
        action,
      });

      if (action === "delete") {
        set((state) => ({
          notifications: state.notifications.filter((n) => n._id !== _id),
        }));
      } else {
        // Fix: Access the correct property from the response
        const updatedNotification =
          response.data?.data?.notification || response.data?.notification;

        set((state) => ({
          notifications: state.notifications.map((n) =>
            n._id === _id ? { ...n, ...updatedNotification } : n,
          ),
        }));
      }
    } catch (error) {
      console.error("Failed to update notification:", error);
      set((state) => ({
        notifications: state.notifications, // Keep existing notifications
        loading: false,
        error: "Failed to update notification",
      }));
    }
  },
}));
