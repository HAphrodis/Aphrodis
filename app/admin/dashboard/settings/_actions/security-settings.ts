"use server";

import { z } from "zod";
import StaffMember from "@/models/Staff";
import { auth } from "@/utils/auth";
import AuditLog from "@/models/AuditLog";
import { sendSecurityNotificationEmail } from "@/utils/notificationUtils";

const ResetPasswordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(8, "Password must be at least 8 characters"),
});

// Removed unused SecuritySettingsSchema to resolve the compile error

export async function updateSecuritySettings(values: {
  currentPassword?: string;
  newPassword?: string;
  isTwoFactorEnabled?: boolean;
}) {
  try {
    const session = (await auth()) as {
      user: { userId: string; email: string };
    } | null;

    if (!session || !session.user) {
      return { error: "Unauthorized" };
    }

    const existingStaff = await StaffMember.findById(session.user.userId);

    if (!existingStaff) {
      return { error: "Staff member not found" };
    }

    // Handle password change
    if (values.currentPassword && values.newPassword) {
      // Verify current password first
      const passwordsMatch = await StaffMember.comparePassword(
        session.user.userId,
        values.currentPassword,
      );

      if (!passwordsMatch) {
        // Return error without requiring logout
        return {
          error: "Incorrect current password",
          requireLogout: false,
          isTwoFactorEnabled: existingStaff.isTwoFactorEnabled === "true",
        };
      }

      await StaffMember.updateById(session.user.userId, {
        password: values.newPassword,
        passwordLastChanged: new Date().toISOString(),
      });

      // Create audit log for password change
      await AuditLog.create({
        action: "Password Change",
        user: existingStaff.email,
        details: "Admin changed their password",
      });

      // Send security notification email
      try {
        await sendSecurityNotificationEmail({
          type: "password_change",
          userEmail: existingStaff.email,
          userName: `${existingStaff.firstName} ${existingStaff.lastName}`,
          ipAddress: "Unknown", // In a real implementation, you'd pass the IP from the client
          userAgent: "Unknown", // In a real implementation, you'd pass the user agent from the client
        });
      } catch (error) {
        console.error("Failed to send security notification email:", error);
      }

      return {
        success: "Password updated successfully",
        requireLogout: true,
        isTwoFactorEnabled: existingStaff.isTwoFactorEnabled === "true",
      };
    }

    // Handle 2FA toggle
    if (typeof values.isTwoFactorEnabled !== "undefined") {
      const newValue = values.isTwoFactorEnabled ? "true" : "false";

      await StaffMember.updateById(session.user.userId, {
        isTwoFactorEnabled: newValue,
      });

      // Create audit log for two-factor authentication change
      await AuditLog.create({
        action: "Two-Factor Authentication Change",
        user: existingStaff.email,
        details: `Admin ${values.isTwoFactorEnabled ? "enabled" : "disabled"} two-factor authentication`,
      });

      // Send security notification email
      try {
        await sendSecurityNotificationEmail({
          type: values.isTwoFactorEnabled ? "2fa_enabled" : "2fa_disabled",
          userEmail: existingStaff.email,
          userName: `${existingStaff.firstName} ${existingStaff.lastName}`,
          ipAddress: "Unknown", // In a real implementation, you'd pass the IP from the client
          userAgent: "Unknown", // In a real implementation, you'd pass the user agent from the client
        });
      } catch (error) {
        console.error("Failed to send security notification email:", error);
      }

      return {
        success: `Two-factor authentication ${values.isTwoFactorEnabled ? "enabled" : "disabled"} successfully`,
        requireLogout: true,
        isTwoFactorEnabled: values.isTwoFactorEnabled,
      };
    }

    // If no changes were requested, just return current state
    return {
      message: "No changes made",
      isTwoFactorEnabled: existingStaff.isTwoFactorEnabled === "true",
    };
  } catch (error) {
    console.error("Error updating security settings:", error);
    return {
      error: "Failed to update security settings",
      requireLogout: false,
    };
  }
}

export async function resetPassword(
  values: z.infer<typeof ResetPasswordSchema>,
) {
  try {
    const validatedFields = ResetPasswordSchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: "Invalid fields!" };
    }

    const session = await auth();
    if (!session || !session.user) {
      return { error: "Unauthorized" };
    }

    const staff = await StaffMember.findById(session.user.userId as string);

    if (!staff) {
      return { error: "Staff member not found!" };
    }

    const isPasswordValid = await StaffMember.comparePassword(
      session.user.userId as string,
      values.currentPassword,
    );

    if (!isPasswordValid) {
      return { error: "Current password is incorrect!" };
    }

    await StaffMember.updateById(session.user.userId as string, {
      password: values.newPassword,
      passwordLastChanged: new Date().toISOString(),
    });

    // Create audit log for password reset
    await AuditLog.create({
      action: "Password Reset",
      user: staff.email,
      details: "Admin reset their password",
    });

    // Send security notification email
    try {
      await sendSecurityNotificationEmail({
        type: "password_change",
        userEmail: staff.email,
        userName: `${staff.firstName} ${staff.lastName}`,
        ipAddress: "Unknown", // In a real implementation, you'd pass the IP from the client
        userAgent: "Unknown", // In a real implementation, you'd pass the user agent from the client
      });
    } catch (error) {
      console.error("Failed to send security notification email:", error);
    }

    return { success: "Password updated successfully!" };
  } catch (error) {
    console.error("Error resetting password:", error);
    return { error: "Failed to reset password" };
  }
}
