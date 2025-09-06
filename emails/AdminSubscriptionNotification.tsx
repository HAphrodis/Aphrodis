// emails\AdminSubscriptionNotification.tsx
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

interface AdminSubscriptionNotificationProps {
  subscriberEmail: string;
}

export const AdminSubscriptionNotification: React.FC<
  AdminSubscriptionNotificationProps
> = ({ subscriberEmail }) => (
  <Html>
    <Head />
    <Preview>
      New Newsletter Subscription: {subscriberEmail} has joined your mailing
      list!
    </Preview>
    <Body style={main}>
      <Container style={container}>
        {/* Alert Banner */}
        <Section style={alertBanner}>
          <Text style={alertText}>New Subscriber Alert</Text>
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
          <Heading style={h1}>New Newsletter Subscription</Heading>

          <Text style={introText}>
            Great news! Someone new has just subscribed to the Ishimwe Jean
            Baptiste newsletter.
          </Text>

          {/* Subscriber Details Card */}
          <Section style={detailsCard}>
            <Heading as="h3" style={detailsHeading}>
              Subscriber Details
            </Heading>
            <Hr style={cardDivider} />

            <Row style={detailRow}>
              <Column style={detailLabelColumn}>
                <Text style={detailLabel}>Email:</Text>
              </Column>
              <Column style={detailValueColumn}>
                <Text style={detailValue}>{subscriberEmail}</Text>
              </Column>
            </Row>

            <Row style={detailRow}>
              <Column style={detailLabelColumn}>
                <Text style={detailLabel}>Date:</Text>
              </Column>
              <Column style={detailValueColumn}>
                <Text style={detailValue}>
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

            <Row style={detailRow}>
              <Column style={detailLabelColumn}>
                <Text style={detailLabel}>Source:</Text>
              </Column>
              <Column style={detailValueColumn}>
                <Text style={detailValue}>Website Subscription Form</Text>
              </Column>
            </Row>
          </Section>

          <Text style={actionText}>
            Remember to update your mailing list to include this new subscriber
            in your next newsletter campaign.
          </Text>

          <Text style={statsText}>
            <strong>Subscriber Growth Stats:</strong> Keep up the great work!
            Your subscriber base continues to grow, helping us spread awareness
            about Ishimwe Jean Baptiste&apos;s mission.
          </Text>

          {/* Action Buttons */}
          <Section style={actionSection}>
            <Button
              style={primaryButton}
              href="https://www.hezain.org/admin/dashboard/subscribers"
            >
              View All Subscribers
            </Button>

            <Button
              style={secondaryButton}
              href="https://www.hezain.org/admin/dashboard/newsletters/create"
            >
              Create Newsletter
            </Button>
          </Section>
        </Section>

        {/* Quick Actions */}
        <Section style={quickActionsSection}>
          <Heading style={quickActionsHeading}>Quick Actions</Heading>
          <Row>
            <Column style={actionIconColumn}>
              <Link
                href="https://www.hezain.org/admin/dashboard/subscribers"
                style={actionIconLink}
              >
                <div style={actionIconWrapper}>
                  <Img
                    src="https://cdn-icons-png.flaticon.com/512/1250/1250680.png"
                    alt="View Subscribers"
                    width="32"
                    height="32"
                  />
                </div>
                <Text style={actionIconText}>View Subscribers</Text>
              </Link>
            </Column>

            <Column style={actionIconColumn}>
              <Link
                href="https://www.hezain.org/admin/dashboard/newsletters/create"
                style={actionIconLink}
              >
                <div style={actionIconWrapper}>
                  <Img
                    src="https://cdn-icons-png.flaticon.com/512/2258/2258853.png"
                    alt="Create Newsletter"
                    width="32"
                    height="32"
                  />
                </div>
                <Text style={actionIconText}>Create Newsletter</Text>
              </Link>
            </Column>

            <Column style={actionIconColumn}>
              <Link
                href="https://www.hezain.org/admin/dashboard/analytics"
                style={actionIconLink}
              >
                <div style={actionIconWrapper}>
                  <Img
                    src="https://cdn-icons-png.flaticon.com/512/1828/1828859.png"
                    alt="View Analytics"
                    width="32"
                    height="32"
                  />
                </div>
                <Text style={actionIconText}>View Analytics</Text>
              </Link>
            </Column>
          </Row>
        </Section>

        {/* Footer */}
        <Section style={footer}>
          <Text style={footerText}>
            This is an automated notification from the Ishimwe Jean Baptiste
            system.
          </Text>

          <Text style={footerText}>
            <Link href="https://www.hezain.org" style={footerLink}>
              www.hezain.org
            </Link>
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

export default AdminSubscriptionNotification;

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
  border: "1px solid #e6ebf1",
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

const detailsCard = {
  backgroundColor: "#f0f9f1",
  borderRadius: "8px",
  padding: "20px",
  border: "1px solid #d1e7dd",
  marginBottom: "25px",
};

const detailsHeading = {
  color: "#00753c",
  fontSize: "18px",
  fontWeight: "bold",
  margin: "0 0 15px",
};

const cardDivider = {
  borderTop: "1px solid #d1e7dd",
  margin: "10px 0 15px",
};

const detailRow = {
  marginBottom: "8px",
};

const detailLabelColumn = {
  width: "30%",
};

const detailValueColumn = {
  width: "70%",
};

const detailLabel = {
  color: "#666666",
  fontSize: "14px",
  fontWeight: "600",
  margin: "0",
};

const detailValue = {
  color: "#333333",
  fontSize: "14px",
  margin: "0",
};

const actionText = {
  color: "#333333",
  fontSize: "15px",
  lineHeight: "24px",
  margin: "0 0 15px",
};

const statsText = {
  color: "#333333",
  fontSize: "15px",
  lineHeight: "24px",
  margin: "0 0 20px",
  backgroundColor: "#f8f9fa",
  padding: "15px",
  borderRadius: "6px",
  border: "1px solid #e6ebf1",
};

const actionSection = {
  textAlign: "center" as const,
  margin: "25px 0",
};

const primaryButton = {
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

const secondaryButton = {
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

const quickActionsSection = {
  backgroundColor: "#f8f9fa",
  padding: "25px 20px",
  textAlign: "center" as const,
  borderTop: "1px solid #e6ebf1",
};

const quickActionsHeading = {
  color: "#333333",
  fontSize: "18px",
  fontWeight: "bold",
  margin: "0 0 20px",
};

const actionIconColumn = {
  padding: "0 10px",
  textAlign: "center" as const,
};

const actionIconLink = {
  textDecoration: "none",
  display: "block",
};

const actionIconWrapper = {
  backgroundColor: "#ffffff",
  borderRadius: "50%",
  padding: "12px",
  width: "32px",
  height: "32px",
  margin: "0 auto 8px",
  border: "1px solid #e6ebf1",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const actionIconText = {
  color: "#11922f",
  fontSize: "14px",
  fontWeight: "600",
  margin: "0",
};

const footer = {
  backgroundColor: "#333333",
  padding: "20px",
  textAlign: "center" as const,
};

const footerText = {
  color: "#ffffff",
  fontSize: "14px",
  margin: "0 0 10px",
};

const footerLink = {
  color: "#ffffff",
  textDecoration: "underline",
};

const copyright = {
  color: "#aaaaaa",
  fontSize: "12px",
  margin: "20px 0 0",
};
