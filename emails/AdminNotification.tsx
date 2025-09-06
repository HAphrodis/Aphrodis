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

interface AdminNotificationProps {
  senderName: string;
  senderEmail: string;
  message: string;
  phone: string;
}

export const AdminNotification: React.FC<AdminNotificationProps> = ({
  senderName,
  senderEmail,
  message,
  phone,
}) => (
  <Html>
    <Head />
    <Preview>New contact form submission from {senderName}</Preview>
    <Body style={main}>
      <Container style={container}>
        {/* Header with alert banner */}
        <Section style={alertBanner}>
          <Text style={alertText}>New Message Alert</Text>
        </Section>

        {/* Logo section */}
        <Section style={headerSection}>
          <Row>
            <Column>
              <Img
                src="https://www.hezain.org/org/logo-landscape.jpg"
                alt="Ishimwe Jean Baptiste Logo"
                width="200"
                height="auto"
                style={logo}
              />
            </Column>
          </Row>
        </Section>

        {/* Main content */}
        <Section style={contentSection}>
          <Heading style={h1}>New Contact Form Submission</Heading>

          <Text style={introText}>
            You&apos;ve received a new message through the Ishimwe Jean Baptiste
            website contact form. Please review the details below:
          </Text>

          <Section style={messageCard}>
            <Row>
              <Column>
                <Text style={fieldLabel}>Sender:</Text>
              </Column>
              <Column>
                <Text style={fieldValue}>{senderName}</Text>
              </Column>
            </Row>

            <Row>
              <Column>
                <Text style={fieldLabel}>Email:</Text>
              </Column>
              <Column>
                <Text style={fieldValue}>
                  <Link href={`mailto:${senderEmail}`} style={emailLink}>
                    {senderEmail}
                  </Link>
                </Text>
              </Column>
            </Row>

            <Row>
              <Column>
                <Text style={fieldLabel}>Phone:</Text>
              </Column>
              <Column>
                <Text style={fieldValue}>{phone || "Not provided"}</Text>
              </Column>
            </Row>

            <Hr style={messageDivider} />

            <Text style={messageLabel}>Message Content:</Text>
            <Text style={messageContent}>{message}</Text>
          </Section>

          <Section style={ctaSection}>
            <Button
              style={ctaButton}
              href="https://www.hezain.org/admin/dashboard/messages"
            >
              View All Messages
            </Button>

            <Button style={replyButton} href={`mailto:${senderEmail}`}>
              Reply Directly
            </Button>
          </Section>

          <Text style={timeStamp}>
            Received on: {new Date().toLocaleDateString()} at{" "}
            {new Date().toLocaleTimeString()}
          </Text>
        </Section>

        <Hr style={divider} />

        {/* Footer */}
        <Section style={footer}>
          <Text style={footerText}>
            This is an automated notification from the Ishimwe Jean Baptiste
            website contact form.
          </Text>

          <Text style={footerText}>
            For technical support, please contact your website developer.
          </Text>

          <Text style={copyright}>
            © {new Date().getFullYear()} Ishimwe Jean Baptiste. All rights
            reserved.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default AdminNotification;

// Styles
const main = {
  backgroundColor: "#f8f9fa",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
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

const alertBanner = {
  backgroundColor: "#11922f",
  padding: "12px",
  textAlign: "center" as const,
};

const alertText = {
  color: "#ffffff",
  fontSize: "16px",
  fontWeight: "bold",
  margin: "0",
};

const headerSection = {
  padding: "24px 30px 15px",
  textAlign: "center" as const,
};

const logo = {
  margin: "0 auto",
};

const contentSection = {
  padding: "10px 40px 30px",
};

const h1 = {
  color: "#00753c",
  fontSize: "24px",
  fontWeight: "bold",
  textAlign: "center" as const,
  margin: "10px 0 20px",
};

const introText = {
  color: "#333333",
  fontSize: "16px",
  lineHeight: "24px",
  marginBottom: "25px",
};

const messageCard = {
  backgroundColor: "#f8f9fa",
  borderRadius: "8px",
  padding: "20px",
  border: "1px solid #e6ebf1",
  marginBottom: "25px",
};

const fieldLabel = {
  color: "#666666",
  fontSize: "14px",
  fontWeight: "600",
  margin: "0 0 8px",
  width: "80px",
};

const fieldValue = {
  color: "#333333",
  fontSize: "14px",
  margin: "0 0 8px",
};

const emailLink = {
  color: "#1CABE2",
  textDecoration: "none",
};

const messageDivider = {
  borderTop: "1px dashed #e6ebf1",
  margin: "15px 0",
};

const messageLabel = {
  color: "#666666",
  fontSize: "14px",
  fontWeight: "600",
  margin: "0 0 10px",
};

const messageContent = {
  color: "#333333",
  fontSize: "14px",
  lineHeight: "22px",
  backgroundColor: "#ffffff",
  padding: "15px",
  borderRadius: "6px",
  border: "1px solid #e6ebf1",
  margin: "0",
  whiteSpace: "pre-line" as const,
};

const ctaSection = {
  textAlign: "center" as const,
  margin: "25px 0",
};

const ctaButton = {
  backgroundColor: "#11922f",
  borderRadius: "6px",
  color: "#ffffff",
  fontSize: "14px",
  fontWeight: "600",
  textDecoration: "none",
  textAlign: "center" as const,
  padding: "10px 20px",
  margin: "0 10px 10px 0",
};

const replyButton = {
  backgroundColor: "#1CABE2",
  borderRadius: "6px",
  color: "#ffffff",
  fontSize: "14px",
  fontWeight: "600",
  textDecoration: "none",
  textAlign: "center" as const,
  padding: "10px 20px",
  margin: "0 0 10px 10px",
};

const timeStamp = {
  color: "#999999",
  fontSize: "12px",
  fontStyle: "italic",
  textAlign: "right" as const,
  margin: "0",
};

const divider = {
  borderTop: "1px solid #e6ebf1",
  margin: "0",
};

const footer = {
  backgroundColor: "#f8f9fa",
  padding: "20px 40px",
  textAlign: "center" as const,
};

const footerText = {
  color: "#666666",
  fontSize: "12px",
  lineHeight: "18px",
  margin: "0 0 10px",
};

const copyright = {
  color: "#999999",
  fontSize: "12px",
  margin: "20px 0 0",
};
