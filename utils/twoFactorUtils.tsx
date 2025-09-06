// utils\twoFactorUtils.tsx
import { TwoFactorToken } from "@/models/Staff";
import crypto from "crypto";
import { Resend } from "resend";
import logger from "@/utils/logger";
import { render } from "@react-email/render";
import VerificationEmail from "@/emails/verification-code";
import { UAParser } from "ua-parser-js";

const resend = new Resend(process.env.RESEND_API_KEY);
const EXPIRES_IN_MINUTES = 5;

export const generateTwoFactorToken = async (email: string) => {
  const token = crypto.randomInt(100000, 999999).toString();
  const expires = new Date(
    new Date().getTime() + EXPIRES_IN_MINUTES * 60 * 1000,
  );

  const existingToken = await TwoFactorToken.findOne({ email });

  if (existingToken) {
    await TwoFactorToken.deleteOne({ email });
  }

  const twoFactorToken = await TwoFactorToken.create({
    email,
    token,
    expires,
  });

  return twoFactorToken;
};

interface LocationInfo {
  ip: string;
  city?: string;
  country?: string;
  userAgent: string;
}

export const sendTwoFactorTokenEmail = async (
  email: string,
  token: string,
  userName: string,
  locationInfo: LocationInfo,
) => {
  try {
    const parser = new UAParser(locationInfo.userAgent);
    const browser = parser.getBrowser();
    const os = parser.getOS();

    const emailHtml = await render(
      <VerificationEmail
        code={token}
        expiresInMinutes={EXPIRES_IN_MINUTES}
        userName={userName}
        location={{
          city: locationInfo.city || "Unknown",
          country: locationInfo.country || "Unknown",
          browser: `${browser.name} ${browser.version}`,
          os: `${os.name} ${os.version}`,
          ip: locationInfo.ip,
        }}
      />,
    );

    const result = await resend.emails.send({
      from: `Ishimwe Jean Baptiste <${process.env.ADMIN_EMAIL}>`,
      to: email,
      subject: "Your Verification Code",
      html: emailHtml,
    });

    logger.info(`2FA email sent to ${email}: ${result}`);
    return result;
  } catch (error) {
    logger.error(`Failed to send 2FA email to ${email}: ${error}`);
    throw error;
  }
};
