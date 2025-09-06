import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Button,
} from "@react-email/components";
import type { IFeatureRequest } from "@/models/FeatureRequest";

interface FeatureRequestNotificationProps {
  featureRequest: IFeatureRequest;
}

export const FeatureRequestNotification = ({
  featureRequest,
}: FeatureRequestNotificationProps) => {
  const previewText = `New Feature Request: ${featureRequest.title}`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>New Feature Request</Heading>

          <Text style={paragraph}>
            A new feature request has been submitted to your portfolio website.
          </Text>

          <Section style={detailsContainer}>
            <Text style={detailsHeading}>Request Details:</Text>
            <Text style={detailsText}>
              <strong>Title:</strong> {featureRequest.title}
              <br />
              <strong>Priority:</strong> {featureRequest.priority}
              <br />
              <strong>Requested By:</strong> {featureRequest.requestedBy}
              <br />
              <strong>Date:</strong>{" "}
              {new Date(featureRequest.createdAt).toLocaleString()}
            </Text>
          </Section>

          <Section style={descriptionContainer}>
            <Text style={descriptionHeading}>Description:</Text>
            <Text style={descriptionText}>{featureRequest.description}</Text>
          </Section>

          <Section style={actionContainer}>
            <Button
              style={actionButton}
              href={`${process.env.NEXT_PUBLIC_DOMAIN}/admin/dashboard/feature-requests?id=${featureRequest.id}`}
            >
              View Request
            </Button>
          </Section>

          <Text style={footer}>
            This is an automated message from your portfolio website. Please do
            not reply to this email.
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

const actionContainer = {
  textAlign: "center" as const,
  margin: "24px 0",
};

const actionButton = {
  backgroundColor: "#3b82f6",
  borderRadius: "4px",
  color: "#ffffff",
  fontSize: "14px",
  fontWeight: "600",
  textDecoration: "none",
  textAlign: "center" as const,
  padding: "12px 20px",
};

const footer = {
  fontSize: "12px",
  lineHeight: "1.5",
  color: "#64748b",
  margin: "32px 0 0",
  textAlign: "center" as const,
};

export default FeatureRequestNotification;
