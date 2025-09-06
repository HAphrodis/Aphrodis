"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Mail, Bell, LoaderIcon } from "lucide-react";
import {
  getNotificationSettings,
  updateNotificationSetting,
} from "../_actions/notification-settings";

interface NotificationSettingsProps {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

export function NotificationSettings({
  isLoading,
  setIsLoading,
}: NotificationSettingsProps) {
  const [settings, setSettings] = useState({
    emailNotifications: false,
    pushNotifications: false,
  });

  useEffect(() => {
    async function fetchSettings() {
      const fetchedSettings = await getNotificationSettings();
      if ("error" in fetchedSettings) {
        toast.error(fetchedSettings.error);
      } else {
        setSettings(fetchedSettings);
      }
    }
    fetchSettings();
  }, []);

  const handleToggle = async (
    setting: "emailNotifications" | "pushNotifications",
  ) => {
    setIsLoading(true);
    try {
      const newValue = !settings[setting];
      const result = await updateNotificationSetting({
        setting,
        value: newValue,
      });
      if ("error" in result) {
        toast.error(result.error);
      } else {
        setSettings((prev) => ({ ...prev, [setting]: newValue }));
        toast.success(result.success);
      }
    } catch (error) {
      console.error("error", error);
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
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
          <CardTitle className="text-xl">Notification Settings</CardTitle>
          <CardDescription className="text-gray-100">
            Manage your notification preferences.
          </CardDescription>
        </CardHeader>
        <CardContent className="mt-6 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="hover:bg-accent flex flex-row items-center justify-between rounded-lg border p-4 shadow-sm transition-all">
              <div className="flex items-center space-x-3 hover:text-gray-800">
                <Mail className="text-primary h-5 w-5" />
                <div className="space-y-0.5">
                  <p className="text-base font-semibold">Email Notifications</p>
                  <p className="text-muted-foreground text-sm">
                    Receive notifications via email.
                  </p>
                </div>
              </div>
              <Switch
                checked={settings.emailNotifications}
                onCheckedChange={() => handleToggle("emailNotifications")}
                disabled={isLoading}
              />
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="hover:bg-accent flex flex-row items-center justify-between rounded-lg border p-4 shadow-sm transition-all">
              <div className="flex items-center space-x-3 hover:text-gray-800">
                <Bell className="text-primary h-5 w-5" />
                <div className="space-y-0.5">
                  <p className="text-base font-semibold">Push Notifications</p>
                  <p className="text-muted-foreground text-sm">
                    Receive push notifications on your devices.
                  </p>
                </div>
              </div>
              <Switch
                checked={settings.pushNotifications}
                onCheckedChange={() => handleToggle("pushNotifications")}
                disabled={isLoading}
              />
            </div>
          </motion.div>
          {isLoading && (
            <div className="flex justify-center">
              <LoaderIcon className="text-primary h-6 w-6 animate-spin" />
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
