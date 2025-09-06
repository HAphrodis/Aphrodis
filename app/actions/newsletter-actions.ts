/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import Newsletter from "@/models/Newsletter";
import { auth } from "@/utils/auth";
import AuditLog from "@/models/AuditLog";

export async function getPublicNewsletter(id: string) {
  try {
    const newsletter = await Newsletter.findById(id);

    if (!newsletter) {
      return { success: false, error: "Newsletter not found" };
    }

    // Only allow viewing sent newsletters
    if (newsletter.status !== "sent") {
      return { success: false, error: "Newsletter not available for viewing" };
    }

    return {
      success: true,
      newsletter: {
        id: newsletter.id,
        subject: newsletter.subject,
        previewText: newsletter.previewText,
        content: newsletter.content,
        sentAt: newsletter.sentAt,
      },
    };
  } catch (error) {
    console.error("Error fetching newsletter:", error);
    return { success: false, error: "Failed to fetch newsletter" };
  }
}

export async function createNewsletter(data: {
  title: string;
  subject: string;
  content: string;
  previewText: string;
  tags?: string[];
}) {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return { success: false, error: "Unauthorized" };
    }

    const newsletter = await Newsletter.create({
      title: data.title,
      subject: data.subject,
      content: data.content,
      previewText: data.previewText,
      status: "draft",
      createdBy:
        typeof session.user.userId === "string"
          ? session.user.userId
          : undefined,
      tags: data.tags ? data.tags.join(",") : "",
    });

    // Create audit log
    await AuditLog.create({
      action: "Newsletter Created",
      user:
        typeof session.user.email === "string" ? session.user.email : "Unknown",
      details: `Created newsletter: ${data.title}`,
    });

    return { success: true, newsletter };
  } catch (error) {
    console.error("Error creating newsletter:", error);
    return { success: false, error: "Failed to create newsletter" };
  }
}

export async function updateNewsletter(
  id: string,
  data: Partial<{
    title: string;
    subject: string;
    content: string;
    previewText: string;
    status: "draft" | "scheduled" | "sent";
    scheduledFor: string;
    tags: string[];
  }>,
) {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return { success: false, error: "Unauthorized" };
    }

    const existingNewsletter = await Newsletter.findById(id);
    if (!existingNewsletter) {
      return { success: false, error: "Newsletter not found" };
    }

    // Prepare update data
    const updateData: Record<string, any> = { ...data };

    // Convert tags array to string if provided
    if (data.tags) {
      updateData.tags = data.tags.join(",");
    }

    const newsletter = await Newsletter.updateById(id, updateData);

    // Create audit log
    await AuditLog.create({
      action: "Newsletter Updated",
      user:
        typeof session.user.email === "string" ? session.user.email : "Unknown",
      details: `Updated newsletter: ${existingNewsletter.title}`,
    });

    return { success: true, newsletter };
  } catch (error) {
    console.error("Error updating newsletter:", error);
    return { success: false, error: "Failed to update newsletter" };
  }
}

export async function deleteNewsletter(id: string) {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return { success: false, error: "Unauthorized" };
    }

    const newsletter = await Newsletter.findById(id);
    if (!newsletter) {
      return { success: false, error: "Newsletter not found" };
    }

    // Don't allow deleting sent newsletters
    if (newsletter.status === "sent") {
      return { success: false, error: "Cannot delete sent newsletters" };
    }

    await Newsletter.deleteById(id);

    // Create audit log
    await AuditLog.create({
      action: "Newsletter Deleted",
      user:
        typeof session.user.email === "string" ? session.user.email : "Unknown",
      details: `Deleted newsletter: ${newsletter.title}`,
    });

    return { success: true };
  } catch (error) {
    console.error("Error deleting newsletter:", error);
    return { success: false, error: "Failed to delete newsletter" };
  }
}

export async function getNewsletters(
  options: {
    page?: number;
    limit?: number;
    status?: "draft" | "scheduled" | "sent" | "all";
    tag?: string;
  } = {},
) {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return { success: false, error: "Unauthorized" };
    }

    const page = options.page || 1;
    const limit = options.limit || 10;
    const offset = (page - 1) * limit;

    const { newsletters, total } = await Newsletter.getAllSorted({
      limit,
      offset,
      status: options.status,
      tag: options.tag,
      sortBy: "createdAt",
      sortOrder: "desc",
    });

    return {
      success: true,
      newsletters,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  } catch (error) {
    console.error("Error fetching newsletters:", error);
    return { success: false, error: "Failed to fetch newsletters" };
  }
}

export async function trackNewsletterOpen(id: string) {
  try {
    const newsletter = await Newsletter.findById(id);
    if (!newsletter) {
      return { success: false };
    }

    await Newsletter.incrementCounter(id, "openCount");
    return { success: true };
  } catch (error) {
    console.error("Error tracking newsletter open:", error);
    return { success: false };
  }
}

export async function trackNewsletterClick(id: string) {
  try {
    const newsletter = await Newsletter.findById(id);
    if (!newsletter) {
      return { success: false };
    }

    await Newsletter.incrementCounter(id, "clickCount");
    return { success: true };
  } catch (error) {
    console.error("Error tracking newsletter click:", error);
    return { success: false };
  }
}
