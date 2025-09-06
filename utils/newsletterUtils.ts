import Newsletter from "@/models/Newsletter";
import Subscriber from "@/models/Subscriber";
import { Resend } from "resend";
import { render } from "@react-email/render";
import NewsletterEmail from "@/emails/NewsletterEmail";
import AuditLog from "@/models/AuditLog";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendNewsletter(newsletterId: string, testEmail?: string) {
  try {
    // Get the newsletter
    const newsletter = await Newsletter.findById(newsletterId);
    if (!newsletter) {
      throw new Error("Newsletter not found");
    }

    // Prepare newsletter data for the email template
    const newsletterData = {
      id: newsletter.id,
      title: newsletter.title,
      subject: newsletter.subject,
      content: newsletter.content,
      previewText: newsletter.previewText,
      sentAt: newsletter.sentAt,
    };

    // Generate plain text version
    const plainText = `${newsletter.title}\n\n${newsletter.previewText}\n\nView this email in your browser: ${process.env.NEXT_PUBLIC_DOMAIN}/newsletter/${newsletter.id}`;

    // If this is a test send
    if (testEmail) {
      const result = await resend.emails.send({
        from: `Portfolio <${process.env.ADMIN_EMAIL}>`,
        to: testEmail,
        subject: `[TEST] ${newsletter.subject}`,
        html: await render(
          NewsletterEmail({
            newsletter: newsletterData,
            trackingId: newsletter.id,
          }),
        ),
        text: plainText,
      });

      await AuditLog.create({
        action: "Newsletter Test Sent",
        user: "System",
        details: `Test email sent for newsletter: ${newsletter.title} to ${testEmail}`,
      });

      return { success: true, result };
    }

    // For actual sending, get all active subscribers
    const subscribers: { email: string }[] =
      (await Subscriber.findByStatus("active")) ?? [];
    if (subscribers.length === 0) {
      throw new Error("No active subscribers found");
    }

    // Update newsletter status to sent
    await Newsletter.updateById(newsletterId, {
      status: "sent",
      sentAt: new Date().toISOString(),
      sentToCount: subscribers.length.toString(),
    });

    // Send to all subscribers in batches of 50
    const batchSize = 50;
    let sentCount = 0;

    for (let i = 0; i < subscribers.length; i += batchSize) {
      const batch = subscribers.slice(i, i + batchSize);
      const emails = batch.map(
        (subscriber: { email: string }) => subscriber.email,
      );

      await resend.emails.send({
        from: `Portfolio <${process.env.ADMIN_EMAIL}>`,
        to: emails,
        subject: newsletter.subject,
        html: await render(
          NewsletterEmail({
            newsletter: newsletterData,
            trackingId: newsletter.id,
          }),
        ),
        text: plainText,
      });

      sentCount += batch.length;
    }

    await AuditLog.create({
      action: "Newsletter Sent",
      user: "System",
      details: `Newsletter: ${newsletter.title} sent to ${sentCount} subscribers`,
    });

    return { success: true, sentCount };
  } catch (error) {
    console.error("Error sending newsletter:", error);
    await AuditLog.create({
      action: "Newsletter Send Failed",
      user: "System",
      details: `Failed to send newsletter: ${error}`,
    });
    throw error;
  }
}

export async function processScheduledNewsletters() {
  try {
    const scheduledNewsletters = await Newsletter.getScheduledNewsletters();

    for (const newsletter of scheduledNewsletters) {
      try {
        await sendNewsletter(newsletter.id);
      } catch (error) {
        console.error(
          `Error sending scheduled newsletter ${newsletter.id}:`,
          error,
        );
      }
    }

    return { success: true, processed: scheduledNewsletters.length };
  } catch (error) {
    console.error("Error processing scheduled newsletters:", error);
    return { success: false, error: String(error) };
  }
}
