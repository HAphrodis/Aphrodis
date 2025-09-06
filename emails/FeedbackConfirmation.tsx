/* eslint-disable react/no-unescaped-entities */
import {
  Body,
  Container,
  Column,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";
import type * as React from "react";

interface FeedbackConfirmationProps {
  subscriberEmail: string;
}

export const FeedbackConfirmation: React.FC<FeedbackConfirmationProps> = ({
  subscriberEmail,
}) => (
  <Html>
    <Head />
    <Preview>Thank you for your feedback - Ishimwe Jean Baptiste</Preview>
    <Body style={main}>
      <Container style={container}>
        {/* Header with Logo */}
        <Section style={headerSection}>
          <Img
            src="https://hezain.org/org/logo-landscape.jpg"
            alt="Ishimwe Jean Baptiste Logo"
            width="150"
            height="auto"
            style={logo}
          />
        </Section>

        {/* Main Content */}
        <Section style={contentSection}>
          <Heading style={heading}>Thank You for Your Feedback</Heading>

          <Text style={paragraph}>Hello,</Text>

          <Text style={paragraph}>
            We appreciate you taking the time to share your thoughts with us.
            Your feedback is invaluable and will help us improve our newsletter
            content and communications.
          </Text>

          <Text style={paragraph}>
            You will continue to receive our newsletter with updates about HEZA
            Initiative's programs, impact stories, and news.
          </Text>

          <Section style={infoBox}>
            <Heading style={infoBoxHeading}>What's Coming Next</Heading>
            <Text style={infoBoxText}>
              We're constantly working to improve our content and make it more
              relevant to our subscribers. In the coming weeks, you can expect:
            </Text>
            <ul style={infoBoxList}>
              <li style={infoBoxListItem}>
                Stories from our community impact programs
              </li>
              <li style={infoBoxListItem}>
                Updates on our nutrition initiatives in Rwanda
              </li>
              <li style={infoBoxListItem}>
                Opportunities to get involved with our mission
              </li>
            </ul>
          </Section>

          <Hr style={divider} />

          <Text style={paragraph}>
            If you have any additional feedback or questions, please don't
            hesitate to contact us at{" "}
            <Link href="mailto:hezainitiative@gmail.com" style={link}>
              hezainitiative@gmail.com
            </Link>
            .
          </Text>
        </Section>

        {/* Social Media Section */}
        <Section style={socialSection}>
          <Heading style={socialHeading}>Connect With Us</Heading>
          <Row style={socialRow}>
            <Column style={socialColumn}>
              <Link
                href="https://twitter.com/hezainitiatives"
                style={socialLink}
              >
                <Img
                  src="https://cdn4.iconfinder.com/data/icons/social-media-flat-7/64/Social-media_Twitter-512.png"
                  alt="Twitter"
                  width="32"
                  height="32"
                />
              </Link>
            </Column>
            <Column style={socialColumn}>
              <Link
                href="https://www.linkedin.com/company/heza-initiative"
                style={socialLink}
              >
                <Img
                  src="https://cdn4.iconfinder.com/data/icons/social-media-flat-7/64/Social-media_Linkedin-512.png"
                  alt="LinkedIn"
                  width="32"
                  height="32"
                />
              </Link>
            </Column>
            <Column style={socialColumn}>
              <Link
                href="https://instagram.com/hezainitiative"
                style={socialLink}
              >
                <Img
                  src="https://cdn4.iconfinder.com/data/icons/social-media-flat-7/64/Social-media_Instagram-512.png"
                  alt="Instagram"
                  width="32"
                  height="32"
                />
              </Link>
            </Column>
            <Column style={socialColumn}>
              <Link
                href="https://youtube.com/@hezainitiative"
                style={socialLink}
              >
                <Img
                  src="https://cdn4.iconfinder.com/data/icons/social-media-flat-7/64/Social-media_YouTube-512.png"
                  alt="YouTube"
                  width="32"
                  height="32"
                />
              </Link>
            </Column>
          </Row>
        </Section>

        {/* Footer */}
        <Section style={footer}>
          <Text style={footerText}>
            Ishimwe Jean Baptiste | Rulindo, Rwanda
          </Text>
          <Text style={footerText}>
            <Link href="https://hezain.org" style={footerLink}>
              www.hezain.org
            </Link>
          </Text>
          <Hr style={footerDivider} />
          <Text style={unsubscribeText}>
            You're receiving this email because you're subscribed to our
            newsletter.
            <br />
            <Link
              href={`https://hezain.org/unsubscribe?email=${encodeURIComponent(subscriberEmail)}`}
              style={unsubscribeLink}
            >
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
const headerSection = {
  backgroundColor: "#ffffff",
  padding: "24px 0",
  textAlign: "center" as const,
};

const logo = {
  margin: "0 auto",
};

// Content styles
const contentSection = {
  padding: "30px 20px",
};

const heading = {
  fontSize: "24px",
  fontWeight: "bold",
  color: "#11922f",
  margin: "0 0 20px",
  textAlign: "center" as const,
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "24px",
  color: "#555555",
  margin: "0 0 20px",
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
  color: "#11922f",
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
  color: "#11922f",
  textDecoration: "underline",
};

// Social media section styles
const socialSection = {
  backgroundColor: "#f9f9f9",
  padding: "25px 20px",
  textAlign: "center" as const,
};

const socialHeading = {
  fontSize: "18px",
  fontWeight: "bold",
  color: "#333333",
  margin: "0 0 20px",
};

const socialRow = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const socialColumn = {
  padding: "0 10px",
};

const socialLink = {
  display: "inline-block",
};

// Footer styles
const footer = {
  backgroundColor: "#333333",
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
