/* eslint-disable react/no-unescaped-entities */
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import type * as React from "react";

interface FeedbackConfirmationProps {
  subscriberEmail: string;
  feedback?: string;
  reason?: string;
}

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://www.aphrodis.online/";

export const FeedbackConfirmation: React.FC<FeedbackConfirmationProps> = ({
  subscriberEmail,
  feedback,
}) => (
  <Html>
    <Head />
    <Preview>
      Thank you for your valuable feedback - Ishimwe Jean Baptiste
    </Preview>
    <Body style={main}>
      <Container style={container}>
        {/* Header with logo */}
        {/* <Section style={headerSection}>
          <Img
            src={`${process.env.NEXT_PUBLIC_APP_URL}/logo.png`}
            alt="Ishimwe Jean Baptiste"
            width="120"
            height="40"
            style={logo}
          />
        </Section> */}

        {/* Main Content */}
        <Section style={contentSection}>
          <Heading style={heading}>
            Thank You for Your Valuable Feedback! 🙏
          </Heading>

          <Text style={paragraph}>Hello there,</Text>

          <Text style={paragraph}>
            I sincerely appreciate you taking the time to share your thoughts
            with me. Your feedback is incredibly valuable and helps me
            continuously improve my newsletter content and the insights I share
            about full-stack development.
          </Text>

          {feedback && (
            <Section style={feedbackBox}>
              <Heading style={feedbackBoxHeading}>Your Feedback:</Heading>
              <Text style={feedbackText}>"{feedback}"</Text>
            </Section>
          )}
          <Text style={paragraph}>
            You will continue to receive my newsletter with the latest updates
            about my projects, development insights, tech tutorials, and
            opportunities in the full-stack development world. I'm committed to
            making every email worth your time.
          </Text>

          <Section style={infoBox}>
            <Heading style={infoBoxHeading}>What's Coming Next 🚀</Heading>
            <Text style={infoBoxText}>
              I'm constantly working to improve my content based on feedback
              like yours. In the coming weeks, you can expect:
            </Text>
            <ul style={infoBoxList}>
              <li style={infoBoxListItem}>
                Deep dives into modern full-stack development techniques
              </li>
              <li style={infoBoxListItem}>
                Behind-the-scenes looks at my latest projects and challenges
              </li>
              <li style={infoBoxListItem}>
                Interactive tutorials and code examples you can follow along
              </li>
              <li style={infoBoxListItem}>
                Career insights and lessons learned from my development journey
              </li>
            </ul>
          </Section>

          <Hr style={divider} />

          <Text style={paragraph}>
            Have more feedback or questions? I'd love to hear from you at{" "}
            <Link href="mailto:hakuzweaphossy@gmail.com" style={link}>
              hakuzweaphossy@gmail.com
            </Link>
            .
          </Text>

          <Text style={paragraph}>
            Thank you for being part of my journey and helping me create better
            content!
          </Text>
        </Section>

        {/* Social Media */}
        <Section style={socialSection}>
          <Text style={socialHeading}>Connect with me:</Text>
          <table style={socialTable}>
            <tr>
              <td style={socialTableCell}>
                <Link href={`${baseUrl}`} style={socialLink}>
                  <Img
                    src={`${baseUrl}/icons/globe.png`}
                    width="25"
                    height="25"
                    alt="Website"
                    style={socialIcon}
                  />
                </Link>
                <Link href="https://linkedin.com/in/hbapte" style={socialLink}>
                  <Img
                    src={`${baseUrl}/icons/linkedin.png`}
                    width="25"
                    height="25"
                    alt="LinkedIn"
                    style={socialIcon}
                  />
                </Link>
                <Link href="https://twitter.com/hbaptee" style={socialLink}>
                  <Img
                    src={`${baseUrl}/icons/twitter.png`}
                    width="25"
                    height="25"
                    alt="Twitter"
                    style={socialIcon}
                  />
                </Link>
                <Link href="https://github.com/hbapte" style={socialLink}>
                  <Img
                    src={`${baseUrl}/icons/github.png`}
                    width="25"
                    height="25"
                    alt="GitHub"
                    style={socialIcon}
                  />
                </Link>
              </td>
            </tr>
          </table>
        </Section>

        {/* Footer */}
        <Section style={footer}>
          <Text style={footerText}>
            Ishimwe Jean Baptiste | Full Stack Developer
          </Text>
          <Text style={footerText}>
            <Link href={process.env.NEXT_PUBLIC_APP_URL} style={footerLink}>
              Visit My Portfolio
            </Link>
          </Text>
          <Hr style={footerDivider} />
          <Text style={unsubscribeText}>
            You're receiving this email because you're subscribed to my
            newsletter.
            <br />
            <Link
              href={`${process.env.NEXT_PUBLIC_APP_URL}/unsubscribe?email=${encodeURIComponent(subscriberEmail)}`}
              style={unsubscribeLink}>
              Unsubscribe
            </Link>
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default FeedbackConfirmation;

// Main styles
const main = {
  backgroundColor: "#f5f5f5",
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  padding: "20px 0",
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  maxWidth: "600px",
  borderRadius: "8px",
  overflow: "hidden",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.05)",
};

// Header styles
// const headerSection = {
//   backgroundColor: "#10b981",
//   padding: "20px",
//   textAlign: "center" as const,
// }

// const logo = {
//   margin: "0 auto",
// }

// Content styles
const contentSection = {
  padding: "30px 20px",
};

const heading = {
  fontSize: "24px",
  fontWeight: "bold",
  color: "#10b981",
  margin: "0 0 20px",
  textAlign: "center" as const,
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "24px",
  color: "#555555",
  margin: "0 0 20px",
};

const feedbackBox = {
  backgroundColor: "#f0fdf4",
  borderRadius: "6px",
  padding: "20px",
  margin: "20px 0",
  border: "1px solid #10b981",
};

const feedbackBoxHeading = {
  fontSize: "16px",
  fontWeight: "bold",
  color: "#10b981",
  margin: "0 0 10px",
};

const feedbackText = {
  fontSize: "15px",
  lineHeight: "22px",
  color: "#333333",
  fontStyle: "italic",
  margin: "0",
};

const infoBox = {
  backgroundColor: "#f9f9f9",
  borderRadius: "6px",
  padding: "20px",
  margin: "20px 0",
  border: "1px solid #e0e0e0",
};

const infoBoxHeading = {
  fontSize: "18px",
  fontWeight: "bold",
  color: "#10b981",
  margin: "0 0 15px",
};

const infoBoxText = {
  fontSize: "15px",
  lineHeight: "22px",
  color: "#555555",
  margin: "0 0 15px",
};

const infoBoxList = {
  margin: "0",
  paddingLeft: "20px",
};

const infoBoxListItem = {
  fontSize: "15px",
  lineHeight: "22px",
  color: "#555555",
  margin: "0 0 8px",
};

const divider = {
  borderColor: "#e0e0e0",
  margin: "30px 0",
};

const link = {
  color: "#10b981",
  textDecoration: "underline",
};

// Social media section styles
const socialSection = {
  textAlign: "center" as const,
  backgroundColor: "#0f172a",
  padding: "25px 20px",
  borderTop: "1px solid #1e293b",
};

const socialHeading = {
  color: "#94a3b8",
  fontSize: "16px",
  fontWeight: "600",
  margin: "0 0 15px",
  textAlign: "center" as const,
};

const socialTable = {
  width: "100%",
};

const socialTableCell = {
  textAlign: "center" as const,
};

const socialLink = {
  display: "inline-block",
  margin: "0 8px",
  textDecoration: "none",
};

const socialIcon = {
  borderRadius: "50%",
  padding: "8px",
  backgroundColor: "#1e293b",
  border: "1px solid #334155",
};

// Footer styles
const footer = {
  backgroundColor: "#064e3b",
  color: "#ffffff",
  padding: "20px",
  textAlign: "center" as const,
};

const footerText = {
  fontSize: "14px",
  color: "#ffffff",
  margin: "0 0 10px",
};

const footerLink = {
  color: "#ffffff",
  textDecoration: "underline",
};

const footerDivider = {
  borderColor: "#555555",
  margin: "20px 0",
};

const unsubscribeText = {
  fontSize: "12px",
  color: "#aaaaaa",
  margin: "0",
};

const unsubscribeLink = {
  color: "#aaaaaa",
  textDecoration: "underline",
};
