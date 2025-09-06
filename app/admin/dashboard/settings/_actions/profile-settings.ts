/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { z } from "zod";
import StaffMember from "@/models/Staff";
import { auth } from "@/utils/auth";
import AuditLog from "@/models/AuditLog";

const profileFormSchema = z.object({
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  avatarUrl: z.string().optional(),
});

export type ProfileFormValues = z.infer<typeof profileFormSchema>;

export async function getProfileData() {
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
      firstName: staff.firstName,
      lastName: staff.lastName,
      email: staff.email,
      role: staff.role,
      createdAt: staff.createdAt,
      updatedAt: staff.updatedAt,
      avatarUrl: staff.avatarUrl,
    };
  } catch (error) {
    console.error("Error getting profile data:", error);
    return { error: "Failed to fetch profile data" };
  }
}

export async function updateProfile(values: ProfileFormValues) {
  try {
    const validatedFields = profileFormSchema.safeParse(values);

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

    const oldFirstName = staff.firstName;
    const oldLastName = staff.lastName;
    const oldAvatarUrl = staff.avatarUrl;

    // Update staff data
    const updatedData: Record<string, any> = {
      firstName: values.firstName,
      lastName: values.lastName,
    };

    // Handle avatar URL
    if (values.avatarUrl === "") {
      updatedData.avatarUrl = "";
    } else if (values.avatarUrl && values.avatarUrl !== oldAvatarUrl) {
      updatedData.avatarUrl = values.avatarUrl;
    }

    // Update the staff member
    await StaffMember.updateById(session.user.userId as string, updatedData);

    // Create audit log entry
    await AuditLog.create({
      action: "Profile Update",
      user: staff.email,
      details: `Admin updated their profile. Changes: ${
        oldFirstName !== values.firstName
          ? `First Name (${oldFirstName} -> ${values.firstName})`
          : ""
      }${
        oldLastName !== values.lastName
          ? `${oldFirstName !== values.firstName ? ", " : ""}Last Name (${oldLastName} -> ${values.lastName})`
          : ""
      }${oldAvatarUrl !== updatedData.avatarUrl ? (updatedData.avatarUrl ? ", Avatar updated" : ", Avatar removed") : ""}`,
    });

    return {
      success: "Profile updated successfully",
      avatarUrl: updatedData.avatarUrl || staff.avatarUrl,
    };
  } catch (error) {
    console.error("Error updating profile:", error);
    return { error: "Failed to update profile" };
  }
}
