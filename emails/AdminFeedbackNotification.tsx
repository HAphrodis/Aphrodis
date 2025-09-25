import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import type * as React from "react";

interface AdminFeedbackNotificationProps {
  subscriberEmail: string;
  feedback: string;
  timestamp: string;
  reason: string;
}

export const AdminFeedbackNotification: React.FC<
  AdminFeedbackNotificationProps
> = ({ subscriberEmail, feedback, reason, timestamp }) => (
  <Html>
    <Head />
    <Preview>New subscriber feedback received from {subscriberEmail}</Preview>
    <Body style={main}>
      <Container style={container}>
        {/* Header */}
        <Section style={headerSection}>
          <Heading style={headerHeading}>📝 New Subscriber Feedback</Heading>
        </Section>

        {/* Main Content */}
        <Section style={contentSection}>
          <Text style={paragraph}>
            A subscriber has provided feedback about the newsletter.
          </Text>

          <Section style={detailsBox}>
            <Heading style={detailsHeading}>Feedback Details</Heading>

            <Text style={detailItem}>
              <strong>Email:</strong> {subscriberEmail}
            </Text>

            <Text style={detailItem}>
              <strong>Timestamp:</strong> {new Date(timestamp).toLocaleString()}
            </Text>

            <Text style={detailItem}>
              <strong>Status:</strong> Subscriber remained subscribed
            </Text>

            <Hr style={detailsDivider} />

            <Text style={feedbackLabel}>
              <strong>Feedback:</strong>
            </Text>
            <Text style={feedbackText}>&quot;{feedback}&quot;</Text>
          </Section>

          <Section style={actionBox}>
            <Heading style={actionHeading}>Recommended Actions</Heading>
            <ul style={actionList}>
              <li style={actionItem}>
                Review the feedback for content improvement opportunities
              </li>
              <li style={actionItem}>
                Consider reaching out to the subscriber for more detailed
                insights
              </li>
              <li style={actionItem}>
                Update newsletter content strategy based on this feedback
              </li>
            </ul>
          </Section>

          <Text style={paragraph}>
            <Link
              href={`${process.env.NEXT_PUBLIC_APP_URL}/admin/dashboard/subscribers`}
              style={dashboardLink}>
              View Subscriber Dashboard →
            </Link>
          </Text>
        </Section>

        {/* Footer */}
        <Section style={footer}>
          <Text style={footerText}>Portfolio Notification System</Text>
          <Text style={footerText}>
            This is an automated notification. Please do not reply to this
            email.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default AdminFeedbackNotification;

// Styles
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

const headerSection = {
  backgroundColor: "#064e3b",
  padding: "20px",
  textAlign: "center" as const,
};

const headerHeading = {
  fontSize: "24px",
  fontWeight: "bold",
  color: "#ffffff",
  margin: "0",
};

const contentSection = {
  padding: "30px 20px",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "24px",
  color: "#555555",
  margin: "0 0 20px",
};

const detailsBox = {
  backgroundColor: "#f0fdf4",
  borderRadius: "6px",
  padding: "20px",
  margin: "20px 0",
  border: "1px solid #10b981",
};

const detailsHeading = {
  fontSize: "18px",
  fontWeight: "bold",
  color: "#064e3b",
  margin: "0 0 15px",
};

const detailItem = {
  fontSize: "15px",
  lineHeight: "22px",
  color: "#555555",
  margin: "0 0 10px",
};

const detailsDivider = {
  borderColor: "#e0e0e0",
  margin: "15px 0",
};

const feedbackLabel = {
  fontSize: "15px",
  color: "#064e3b",
  margin: "0 0 10px",
};

const feedbackText = {
  fontSize: "15px",
  lineHeight: "22px",
  color: "#333333",
  fontStyle: "italic",
  backgroundColor: "#ffffff",
  padding: "15px",
  borderRadius: "4px",
  border: "1px solid #d1d5db",
  margin: "0",
};

const actionBox = {
  backgroundColor: "#ecfdf5",
  borderRadius: "6px",
  padding: "20px",
  margin: "20px 0",
  border: "1px solid #10b981",
};

const actionHeading = {
  fontSize: "16px",
  fontWeight: "bold",
  color: "#065f46",
  margin: "0 0 15px",
};

const actionList = {
  margin: "0",
  paddingLeft: "20px",
};

const actionItem = {
  fontSize: "14px",
  lineHeight: "20px",
  color: "#065f46",
  margin: "0 0 8px",
};

const dashboardLink = {
  color: "#10b981",
  textDecoration: "underline",
  fontWeight: "bold",
};

const footer = {
  backgroundColor: "#f3f4f6",
  color: "#6b7280",
  padding: "20px",
  textAlign: "center" as const,
};

const footerText = {
  fontSize: "12px",
  color: "#6b7280",
  margin: "0 0 5px",
};
