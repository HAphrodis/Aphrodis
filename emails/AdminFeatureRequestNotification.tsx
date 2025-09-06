/* eslint-disable react/no-unescaped-entities */
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import type { IFeatureRequest } from "@/models/FeatureRequest";

interface AdminFeatureRequestNotificationProps {
  featureRequest: IFeatureRequest;
}

export const AdminFeatureRequestNotification = ({
  featureRequest,
}: AdminFeatureRequestNotificationProps) => {
  const previewText = `Your Feature Request: ${featureRequest.title}`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>Feature Request Received</Heading>

          <Text style={paragraph}>
            Thank you for submitting a feature request to my portfolio website.
            I've received your request and will review it soon.
          </Text>

          <Section style={detailsContainer}>
            <Text style={detailsHeading}>Your Request Details:</Text>
            <Text style={detailsText}>
              <strong>Title:</strong> {featureRequest.title}
              <br />
              <strong>Priority:</strong> {featureRequest.priority}
              <br />
              <strong>Date Submitted:</strong>{" "}
              {new Date(featureRequest.createdAt).toLocaleString()}
            </Text>
          </Section>

          <Section style={descriptionContainer}>
            <Text style={descriptionHeading}>Description You Provided:</Text>
            <Text style={descriptionText}>{featureRequest.description}</Text>
          </Section>

          <Text style={paragraph}>
            I'll review your request and determine if it can be implemented.
            You'll receive updates on the status of your request via email.
          </Text>

          <Section style={statusContainer}>
            <Text style={statusHeading}>Current Status:</Text>
            <Text style={statusText}>
              <span style={statusBadge}>
                {featureRequest.status.toUpperCase()}
              </span>
            </Text>
          </Section>

          <Text style={footer}>
            This is an automated message from my portfolio website. If you have
            any questions, please contact me directly.
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "40px 20px",
  maxWidth: "600px",
  backgroundColor: "#ffffff",
  borderRadius: "8px",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
};

const heading = {
  fontSize: "24px",
  letterSpacing: "-0.5px",
  lineHeight: "1.3",
  fontWeight: "700",
  color: "#3b82f6",
  textAlign: "center" as const,
  padding: "0 0 20px",
};

const paragraph = {
  margin: "0 0 15px",
  fontSize: "15px",
  lineHeight: "1.4",
  color: "#3c4149",
};

const detailsContainer = {
  backgroundColor: "#f0f9ff",
  borderLeft: "4px solid #3b82f6",
  borderRadius: "4px",
  padding: "16px",
  margin: "24px 0",
};

const detailsHeading = {
  fontSize: "16px",
  fontWeight: "600",
  color: "#3b82f6",
  margin: "0 0 8px",
};

const detailsText = {
  fontSize: "14px",
  lineHeight: "1.6",
  color: "#3c4149",
  margin: "0",
};

const descriptionContainer = {
  backgroundColor: "#f8fafc",
  borderRadius: "4px",
  padding: "16px",
  margin: "24px 0",
  border: "1px solid #e2e8f0",
};

const descriptionHeading = {
  fontSize: "16px",
  fontWeight: "600",
  color: "#3c4149",
  margin: "0 0 8px",
};

const descriptionText = {
  fontSize: "14px",
  lineHeight: "1.6",
  color: "#4a5568",
  margin: "0",
  whiteSpace: "pre-wrap" as const,
};

const statusContainer = {
  textAlign: "center" as const,
  margin: "24px 0",
  padding: "16px",
  backgroundColor: "#f8fafc",
  borderRadius: "4px",
  border: "1px solid #e2e8f0",
};

const statusHeading = {
  fontSize: "16px",
  fontWeight: "600",
  color: "#3c4149",
  margin: "0 0 8px",
};

const statusText = {
  fontSize: "14px",
  lineHeight: "1.6",
  color: "#4a5568",
  margin: "0",
};

const statusBadge = {
  backgroundColor: "#3b82f6",
  color: "#ffffff",
  padding: "4px 8px",
  borderRadius: "4px",
  fontSize: "12px",
  fontWeight: "600",
};

const footer = {
  fontSize: "12px",
  lineHeight: "1.5",
  color: "#64748b",
  margin: "32px 0 0",
  textAlign: "center" as const,
};

export default AdminFeatureRequestNotification;
