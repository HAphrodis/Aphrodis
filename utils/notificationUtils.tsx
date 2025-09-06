import { Resend } from "resend";
import { render } from "@react-email/render";
import LoginNotificationEmail from "@/emails/login-notification";
import SecurityNotificationEmail from "@/emails/security-notification";
import logger from "@/utils/logger";
import { UAParser } from "ua-parser-js";
import Notification from "@/models/Notification";

type NotificationType = "error" | "warning" | "success" | "info";

interface CreateNotificationOptions {
  title: string;
  message: string;
  type: NotificationType;
  link?: string;
}

const resend = new Resend(process.env.RESEND_API_KEY);

// Parse the allowlisted emails from environment variable
const getAllowlistedEmails = (): string[] => {
  const allowlist = process.env.ALLOWLISTED_DEVELOPER_EMAILS || "";
  return allowlist.split(",").map((email) => email.trim().toLowerCase());
};

interface LocationInfo {
  ip: string;
  city?: string;
  country?: string;
  userAgent: string;
}

export const sendLoginNotificationEmail = async (
  userDetails: {
    name: string;
    email: string;
  },
  locationInfo: LocationInfo,
  sessionId: string,
) => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL || "admin@example.com";

    const allowlistedEmails = getAllowlistedEmails();

    // Skip notification if user email is in the allowlist
    if (allowlistedEmails.includes(userDetails.email.toLowerCase())) {
      logger.info(
        `Login notification skipped for allowlisted email: ${userDetails.email}`,
      );
      return { id: "skipped", message: "Email in allowlist" };
    }

    if (!adminEmail) {
      logger.warn("Admin email not configured. Login notification not sent.");
      return null;
    }

    const parser = new UAParser(locationInfo.userAgent);
    const browser = parser.getBrowser();
    const os = parser.getOS();

    const loginTime = new Date().toLocaleString("en-US", {
      timeZone: "Africa/Kigali",
      dateStyle: "full",
      timeStyle: "long",
    });

    const emailHtml = await render(
      <LoginNotificationEmail
        userName={userDetails.name}
        userEmail={userDetails.email}
        loginTime={loginTime}
        location={{
          ip: locationInfo.ip,
          city: locationInfo.city || "Unknown",
          country: locationInfo.country || "Unknown",
          browser: `${browser.name || "Unknown"} ${browser.version || ""}`,
          os: `${os.name || "Unknown"} ${os.version || ""}`,
        }}
        sessionId={sessionId}
      />,
    );

    const result = await resend.emails.send({
      from: `Portfolio's Security <${process.env.ADMIN_EMAIL}>`,
      to: adminEmail,
      subject: `New Admin Login: ${userDetails.name} (${userDetails.email})`,
      html: emailHtml,
    });

    logger.info(
      `Login notification email sent to admin: ${JSON.stringify(result)}`,
    );
    return result;
  } catch (error) {
    logger.error(`Failed to send login notification email: ${error}`);
    return null;
  }
};

interface SecurityNotificationParams {
  type: "password_change" | "2fa_enabled" | "2fa_disabled" | "account_update";
  userEmail: string;
  userName: string;
  ipAddress: string;
  userAgent: string;
}

export const sendSecurityNotificationEmail = async (
  params: SecurityNotificationParams,
) => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL || "admin@example.com";

    const allowlistedEmails = getAllowlistedEmails();

    // Skip notification if user email is in the allowlist
    if (allowlistedEmails.includes(params.userEmail.toLowerCase())) {
      logger.info(
        `Security notification skipped for allowlisted email: ${params.userEmail}`,
      );
      return { id: "skipped", message: "Email in allowlist" };
    }

    if (!adminEmail) {
      logger.warn(
        "Admin email not configured. Security notification not sent.",
      );
      return null;
    }

    const parser = new UAParser(params.userAgent);
    const browser = parser.getBrowser();
    const os = parser.getOS();

    const actionTime = new Date().toLocaleString("en-US", {
      timeZone: "Africa/Kigali",
      dateStyle: "full",
      timeStyle: "long",
    });

    // Get action title and description based on type
    let actionTitle = "";
    let actionDescription = "";

    switch (params.type) {
      case "password_change":
        actionTitle = "Password Changed";
        actionDescription = "Your account password was changed.";
        break;
      case "2fa_enabled":
        actionTitle = "Two-Factor Authentication Enabled";
        actionDescription =
          "Two-factor authentication was enabled for your account.";
        break;
      case "2fa_disabled":
        actionTitle = "Two-Factor Authentication Disabled";
        actionDescription =
          "Two-factor authentication was disabled for your account.";
        break;
      case "account_update":
        actionTitle = "Account Information Updated";
        actionDescription = "Your account information was updated.";
        break;
    }

    const emailHtml = await render(
      <SecurityNotificationEmail
        userName={params.userName}
        userEmail={params.userEmail}
        actionTime={actionTime}
        actionTitle={actionTitle}
        actionDescription={actionDescription}
        location={{
          ip: params.ipAddress,
          browser: `${browser.name || "Unknown"} ${browser.version || ""}`,
          os: `${os.name || "Unknown"} ${os.version || ""}`,
        }}
        loginTime={""}
        sessionId={""}
      />,
    );

    const result = await resend.emails.send({
      from: `Portfolio's Security <${process.env.ADMIN_EMAIL}>`,
      to: [adminEmail, params.userEmail], // Send to both admin and user
      subject: `Security Alert: ${actionTitle}`,
      html: emailHtml,
    });

    logger.info(`Security notification email sent: ${JSON.stringify(result)}`);
    return result;
  } catch (error) {
    logger.error(`Failed to send security notification email: ${error}`);
    return null;
  }
};

export async function createNotification(options: CreateNotificationOptions) {
  try {
    const notification = await Notification.create({
      title: options.title,
      message: options.message,
      type: options.type,
      timestamp: new Date().toISOString(),
      read: false,
      archived: false,
      link: options.link,
    });

    return notification;
  } catch (error) {
    console.error("Failed to create notification:", error);
    throw error;
  }
}

export async function createFeatureRequestNotification(
  featureRequestId: string,
  title: string,
  status: string,
) {
  const statusMap: Record<string, { type: NotificationType; message: string }> =
    {
      pending: {
        type: "info",
        message:
          "Your feature request has been received and is pending review.",
      },
      "in-progress": {
        type: "info",
        message: "Your feature request is now being worked on.",
      },
      completed: {
        type: "success",
        message: "Your feature request has been completed and deployed.",
      },
      rejected: {
        type: "warning",
        message:
          "Your feature request has been reviewed and cannot be implemented at this time.",
      },
    };

  const statusInfo = statusMap[status] || {
    type: "info",
    message: `Your feature request status has been updated to ${status}.`,
  };

  return createNotification({
    title: `Feature Request: ${title}`,
    message: statusInfo.message,
    type: statusInfo.type,
    link: `/admin/dashboard/feature-requests?id=${featureRequestId}`,
  });
}

export async function createSecurityNotification(
  action: string,
  details: string,
) {
  return createNotification({
    title: "Security Alert",
    message: `${action}: ${details}`,
    type: "warning",
    link: "/admin/dashboard/settings",
  });
}

export async function createSystemNotification(title: string, message: string) {
  return createNotification({
    title,
    message,
    type: "info",
  });
}
