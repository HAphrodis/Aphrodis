import {
  Body,
  Button,
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

interface AdminUnsubscribeNotificationProps {
  subscriberEmail: string;
  reason: string;
  feedback: string;
}

export const AdminUnsubscribeNotification: React.FC<
  AdminUnsubscribeNotificationProps
> = ({ subscriberEmail, reason, feedback }) => (
  <Html>
    <Head />
    <Preview>
      Newsletter Unsubscription: {subscriberEmail} has unsubscribed
    </Preview>
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

        {/* Notification Banner */}
        <Section style={notificationBanner}>
          <Img
            src="https://cdn-icons-png.flaticon.com/512/1828/1828843.png"
            alt="Unsubscribe Alert"
            width="60"
            height="60"
            style={notificationIcon}
          />
          <Heading style={notificationHeading}>Unsubscribe Alert</Heading>
        </Section>

        {/* Main Content */}
        <Section style={contentSection}>
          <Text style={greeting}>Dear Admin,</Text>
          <Text style={paragraph}>
            A subscriber has unsubscribed from the Ishimwe Jean Baptiste
            newsletter.
          </Text>

          <Section style={subscriberCard}>
            <Heading style={subscriberCardHeading}>Unsubscribe Details</Heading>
            <Hr style={cardDivider} />
            <Row>
              <Column style={labelColumn}>
                <Text style={labelText}>Email:</Text>
              </Column>
              <Column style={valueColumn}>
                <Text style={valueText}>{subscriberEmail}</Text>
              </Column>
            </Row>
            <Row>
              <Column style={labelColumn}>
                <Text style={labelText}>Date:</Text>
              </Column>
              <Column style={valueColumn}>
                <Text style={valueText}>
                  {new Date().toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Text>
              </Column>
            </Row>
            <Row>
              <Column style={labelColumn}>
                <Text style={labelText}>Reason:</Text>
              </Column>
              <Column style={valueColumn}>
                <Text style={valueText}>{reason}</Text>
              </Column>
            </Row>
            {feedback && (
              <Row>
                <Column style={labelColumn}>
                  <Text style={labelText}>Feedback:</Text>
                </Column>
                <Column style={valueColumn}>
                  <Text style={valueText}>{feedback}</Text>
                </Column>
              </Row>
            )}
          </Section>

          <Section style={ctaSection}>
            <Button
              style={ctaButton}
              href="https://www.hezain.org/admin/dashboard/subscribers"
            >
              View Subscriber List
            </Button>
          </Section>

          <Text style={paragraph}>
            Please review this feedback to help improve our newsletter content
            and subscriber retention.
          </Text>
        </Section>

        {/* Footer */}
        <Section style={footer}>
          <Text style={footerText}>
            This is an automated notification from the Ishimwe Jean Baptiste
            system.
          </Text>
          <Text style={footerText}>
            <Link href="https://hezain.org" style={footerLink}>
              www.hezain.org
            </Link>
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default AdminUnsubscribeNotification;

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
  padding: "20px 0",
  textAlign: "center" as const,
};

const logo = {
  margin: "0 auto",
};

// Notification banner styles
const notificationBanner = {
  backgroundColor: "#ff6b6b",
  color: "#ffffff",
  padding: "30px 20px",
  textAlign: "center" as const,
};

const notificationIcon = {
  margin: "0 auto 15px",
};

const notificationHeading = {
  fontSize: "24px",
  fontWeight: "bold",
  margin: "0",
  color: "#ffffff",
};

// Content section styles
const contentSection = {
  padding: "30px 20px",
};

const greeting = {
  fontSize: "18px",
  fontWeight: "bold",
  color: "#333333",
  margin: "0 0 15px",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "24px",
  color: "#555555",
  margin: "0 0 20px",
};

// Subscriber card styles
const subscriberCard = {
  backgroundColor: "#f9f9f9",
  borderRadius: "6px",
  padding: "20px",
  margin: "20px 0",
  border: "1px solid #e0e0e0",
};

const subscriberCardHeading = {
  fontSize: "18px",
  fontWeight: "bold",
  color: "#ff6b6b",
  margin: "0 0 15px",
};

const cardDivider = {
  borderColor: "#e0e0e0",
  margin: "10px 0 15px",
};

const labelColumn = {
  width: "30%",
};

const valueColumn = {
  width: "70%",
};

const labelText = {
  fontSize: "14px",
  fontWeight: "bold",
  color: "#666666",
  margin: "0 0 10px",
};

const valueText = {
  fontSize: "14px",
  color: "#333333",
  margin: "0 0 10px",
};

// CTA section styles
const ctaSection = {
  textAlign: "center" as const,
  margin: "30px 0",
};

const ctaButton = {
  backgroundColor: "#11922f",
  color: "#ffffff",
  padding: "12px 24px",
  borderRadius: "4px",
  fontWeight: "bold",
  fontSize: "16px",
  textDecoration: "none",
  textAlign: "center" as const,
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
