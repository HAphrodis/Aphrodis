"use server";

import { revalidatePath } from "next/cache";

interface NewsletterData {
  id?: string;
  title?: string;
  subject?: string;
  previewText?: string;
  content?: string;
  status?: "draft" | "scheduled" | "sent";
  scheduledFor?: string;
  senderName?: string;
  senderEmail?: string;
  segment?: string;
}

export async function createNewsletter(data: NewsletterData) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/newsletters`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: data.title,
          subject: data.subject,
          previewText: data.previewText,
          content: data.content,
          status: "draft",
          tags: data.segment === "recent" ? ["recent-subscribers"] : [],
        }),
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create newsletter");
    }

    const result = await response.json();
    revalidatePath("/admin/dashboard/newsletters");
    return { success: true, id: result.data.id };
  } catch (error) {
    console.error("Error creating newsletter:", error);
    return {
      error:
        (error instanceof Error
          ? error.message
          : "An unknown error occurred") || "Failed to create newsletter",
    };
  }
}

export async function sendNewsletter(data: NewsletterData) {
  try {
    // If we have an ID, we're sending an existing newsletter
    if (data.id) {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/newsletters/${data.id}/send`,
        {
          method: "POST",
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to send newsletter");
      }

      const result = await response.json();
      revalidatePath("/admin/dashboard/newsletters");
      return { success: true, id: result.data.id };
    }
    // Otherwise, we're creating and sending a new newsletter
    else {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/newsletters`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: data.title,
            subject: data.subject,
            previewText: data.previewText,
            content: data.content,
            status: "sent",
            tags: data.segment === "recent" ? ["recent-subscribers"] : [],
          }),
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to send newsletter");
      }

      const result = await response.json();
      revalidatePath("/admin/dashboard/newsletters");
      return { success: true, id: result.data.id };
    }
  } catch (error) {
    console.error("Error sending newsletter:", error);
    return {
      error:
        (error instanceof Error
          ? error.message
          : "An unknown error occurred") || "Failed to send newsletter",
    };
  }
}

export async function resendNewsletter(id: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/newsletters/${id}/resend`,
      {
        method: "POST",
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to resend newsletter");
    }

    const result = await response.json();
    revalidatePath("/admin/dashboard/newsletters");
    return { success: true, id: result.data.id };
  } catch (error) {
    console.error("Error resending newsletter:", error);
    return {
      error:
        (error instanceof Error
          ? error.message
          : "An unknown error occurred") || "Failed to resend newsletter",
    };
  }
}

export async function scheduleNewsletter(data: NewsletterData) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/newsletters`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: data.title,
          subject: data.subject,
          previewText: data.previewText,
          content: data.content,
          status: "scheduled",
          scheduledFor: data.scheduledFor,
          tags: data.segment === "recent" ? ["recent-subscribers"] : [],
        }),
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to schedule newsletter");
    }

    const result = await response.json();
    revalidatePath("/admin/dashboard/newsletters");
    return { success: true, id: result.data.id };
  } catch (error) {
    console.error("Error scheduling newsletter:", error);
    return {
      error:
        (error instanceof Error
          ? error.message
          : "An unknown error occurred") || "Failed to schedule newsletter",
    };
  }
}

export async function deleteNewsletter(id: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/newsletters/${id}`,
      {
        method: "DELETE",
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to delete newsletter");
    }

    revalidatePath("/admin/dashboard/newsletters");
    return { success: true };
  } catch (error) {
    console.error("Error deleting newsletter:", error);
    return {
      error:
        (error instanceof Error
          ? error.message
          : "An unknown error occurred") || "Failed to delete newsletter",
    };
  }
}

export async function getNewsletter(id: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/newsletters/${id}`,
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to get newsletter");
    }

    const result = await response.json();
    return { success: true, newsletter: result.data };
  } catch (error) {
    console.error("Error getting newsletter:", error);
    return {
      error:
        (error instanceof Error
          ? error.message
          : "An unknown error occurred") || "Failed to get newsletter",
    };
  }
}
