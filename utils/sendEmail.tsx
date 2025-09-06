// utils/sendEmail.ts
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const adminEmail = process.env.ADMINN_EMAIL;

interface EmailOptions {
  to: string;
  subject: string;
  text?: string;
}

const sendEmail = async ({ to, subject, text }: EmailOptions) => {
  try {
    await resend.emails.send({
      from: `La Prima Ltd <${adminEmail}>`,
      to,
      subject,
      text,
      html: "",
    });
  } catch (error) {
    console.error(`Failed to send email to ${to}:`, error);
    throw new Error("Email sending failed");
  }
};

export default sendEmail;
