"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileSettings } from "./profile-settings";
import { AppearanceSettings } from "./appearance-settings";
import { NotificationSettings } from "./notification-settings";
import { SecuritySettings } from "./security-settings";
import { AuditLogSettings } from "./audit-log-settings";

export function SettingsContent() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <Tabs defaultValue="profile" className="space-y-6">
      <TabsList>
        <TabsTrigger value="profile">Profile</TabsTrigger>
        <TabsTrigger value="appearance">Appearance</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
        <TabsTrigger value="audit-logs">Audit Logs</TabsTrigger>
      </TabsList>
      <TabsContent value="profile">
        <ProfileSettings isLoading={isLoading} setIsLoading={setIsLoading} />
      </TabsContent>
      <TabsContent value="appearance">
        <AppearanceSettings isLoading={isLoading} setIsLoading={setIsLoading} />
      </TabsContent>
      <TabsContent value="notifications">
        <NotificationSettings
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      </TabsContent>
      <TabsContent value="security">
        <SecuritySettings isLoading={isLoading} setIsLoading={setIsLoading} />
      </TabsContent>
      <TabsContent value="audit-logs">
        <AuditLogSettings setIsLoading={setIsLoading} />
      </TabsContent>

      {/* <TabsContent value="billing">
        <PlaceholderSettings title="Billing Settings" description="Manage your billing information and subscription." />
      </TabsContent> */}
    </Tabs>
  );
}
