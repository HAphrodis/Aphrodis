"use server";

import { z } from "zod";
import StaffMember from "@/models/Staff";
import { auth } from "@/utils/auth";
import AuditLog from "@/models/AuditLog";

const notificationSettingSchema = z.object({
  setting: z.enum(["emailNotifications", "pushNotifications"]),
  value: z.boolean(),
});

export type NotificationSetting = z.infer<typeof notificationSettingSchema>;

export async function getNotificationSettings() {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return { error: "Unauthorized" };
    }

    const staff = await StaffMember.findById(session.user.userId as string);
    if (!staff) {
      return { error: "Staff member not found" };
    }

    return {
      emailNotifications: staff.emailNotifications === "true",
      pushNotifications: staff.pushNotifications === "true",
    };
  } catch (error) {
    console.error("Error getting notification settings:", error);
    return { error: "Failed to fetch notification settings" };
  }
}

export async function updateNotificationSetting({
  setting,
  value,
}: NotificationSetting) {
  try {
    const validatedFields = notificationSettingSchema.safeParse({
      setting,
      value,
    });

    if (!validatedFields.success) {
      return { error: "Invalid fields!" };
    }

    const session = await auth();
    if (!session || !session.user) {
      return { error: "Unauthorized" };
    }

    const staff = await StaffMember.findById(session.user.userId as string);
    if (!staff) {
      return { error: "Staff member not found" };
    }

    const oldValue = staff[setting];
    const newValue = value ? "true" : "false";

    // Update the staff member
    await StaffMember.updateById(session.user.userId as string, {
      [setting]: newValue,
    });

    // Create audit log for notification setting update
    await AuditLog.create({
      action: "Notification Setting Update",
      user: staff.email,
      details: `User updated ${setting}: ${oldValue} -> ${newValue}`,
    });

    return { success: `${setting} updated successfully`, value };
  } catch (error) {
    console.error("Error updating notification setting:", error);
    return { error: "Failed to update notification setting" };
  }
}
