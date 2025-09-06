import Notification, { type INotification } from "@/models/Notification";

export interface CreateNotificationData {
  title: string;
  message: string;
  type: "error" | "warning" | "success" | "info";
  link?: string;
  read?: boolean;
  archived?: boolean;
  timestamp?: string;
  createdAt?: string;
  updatedAt?: string;
  id?: string;
  _id?: string;
}

export async function createNotification(
  data: CreateNotificationData,
): Promise<INotification> {
  try {
    const notification = await Notification.create({
      title: data.title,
      message: data.message,
      type: data.type,
      link: data.link,
      read: data.read ?? false,
      archived: data.archived ?? false,
    });
    return notification;
  } catch (error) {
    console.error("Failed to create notification:", error);
    throw new Error("Failed to create notification");
  }
}

export async function createSubscriberNotification(
  email: string,
): Promise<INotification> {
  return createNotification({
    title: "New Subscriber",
    message: `${email} has subscribed to your newsletter`,
    type: "success",
    link: "/admin/subscribers",
  });
}

/**
 * Updated contact notification to include optional phone and subject.
 */
export async function createContactNotification(
  name: string,
  email: string,
  preview: string,
  phone?: string,
  subject?: string,
): Promise<INotification> {
  const messagePreview =
    preview.length > 50 ? `${preview.substring(0, 50)}...` : preview;

  let messageText = `${name} (${email}) sent: "${messagePreview}"`;
  if (phone) messageText += ` | Phone: ${phone}`;
  if (subject) messageText += ` | Subject: ${subject}`;

  return createNotification({
    title: "New Message",
    message: messageText,
    type: "info",
    link: "/admin/messages",
  });
}

export async function createErrorNotification(
  title: string,
  message: string,
  link?: string,
): Promise<INotification> {
  return createNotification({ title, message, type: "error", link });
}

export async function createSuccessNotification(
  title: string,
  message: string,
  link?: string,
): Promise<INotification> {
  return createNotification({ title, message, type: "success", link });
}

export async function createWarningNotification(
  title: string,
  message: string,
  link?: string,
): Promise<INotification> {
  return createNotification({ title, message, type: "warning", link });
}

export async function createInfoNotification(
  title: string,
  message: string,
  link?: string,
): Promise<INotification> {
  return createNotification({ title, message, type: "info", link });
}

// Utility function to get notification stats
export async function getNotificationStats() {
  try {
    const { notifications } = await Notification.getAllSorted();

    return {
      total: notifications.length,
      unread: notifications.filter((n) => !n.read).length,
      read: notifications.filter((n) => n.read).length,
      archived: notifications.filter((n) => n.archived).length,
      byType: {
        error: notifications.filter((n) => n.type === "error").length,
        warning: notifications.filter((n) => n.type === "warning").length,
        success: notifications.filter((n) => n.type === "success").length,
        info: notifications.filter((n) => n.type === "info").length,
      },
    };
  } catch (error) {
    console.error("Failed to get notification stats:", error);
    return {
      total: 0,
      unread: 0,
      read: 0,
      archived: 0,
      byType: { error: 0, warning: 0, success: 0, info: 0 },
    };
  }
}
