/* eslint-disable react/no-unescaped-entities */
import {
  Body,
  Button,
  Container,
  Column,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";
import type * as React from "react";

interface AdminNewsletterNotificationProps {
  newsletterTitle: string;
  newsletterSubject: string;
  sentAt: string;
  sentToCount: number;
  failedCount: number;
  segment: string;
  adminUrl: string;
  newsletterId: string;
}

export const AdminNewsletterNotification: React.FC<
  AdminNewsletterNotificationProps
> = ({
  newsletterTitle,
  newsletterSubject,
  sentAt,
  sentToCount,
  failedCount,
  segment,
  adminUrl,
  newsletterId,
}) => (
  <Html>
    <Head />
    <Preview>Newsletter "{newsletterTitle}" has been sent successfully</Preview>
    <Body style={main}>
      <Container style={container}>
        {/* Success Banner */}
        <Section style={successBanner}>
          <Text style={successText}>Newsletter Sent Successfully</Text>
        </Section>

        {/* Header with Logo */}
        <Section style={headerSection}>
          <Img
            src="https://hezain.org/org/logo-landscape.jpg"
            alt="Ishimwe Jean Baptiste Logo"
            width="180"
            height="auto"
            style={logo}
          />
        </Section>

        {/* Colorful Ribbon */}
        <Section style={ribbonSection}>
          <Row>
            <Column
              style={{
                width: "25%",
                backgroundColor: "#11922f",
                height: "6px",
              }}
            ></Column>
            <Column
              style={{
                width: "25%",
                backgroundColor: "#00753c",
                height: "6px",
              }}
            ></Column>
            <Column
              style={{
                width: "25%",
                backgroundColor: "#1CABE2",
                height: "6px",
              }}
            ></Column>
            <Column
              style={{
                width: "25%",
                backgroundColor: "#62d572",
                height: "6px",
              }}
            ></Column>
          </Row>
        </Section>

        {/* Main Content */}
        <Section style={contentSection}>
          <Heading style={heading}>Newsletter Delivery Report</Heading>

          <Text style={paragraph}>
            Your newsletter{" "}
            <strong style={highlightText}>"{newsletterTitle}"</strong> has been
            sent successfully to your subscribers.
          </Text>

          {/* Newsletter Info Card */}
          <Section style={infoCard}>
            <Row>
              <Column>
                <Text style={infoCardTitle}>Newsletter Details</Text>

                <table style={detailsTable}>
                  <tr>
                    <td style={detailsLabelCell}>
                      <Text style={detailsLabel}>Title:</Text>
                    </td>
                    <td style={detailsValueCell}>
                      <Text style={detailsValue}>{newsletterTitle}</Text>
                    </td>
                  </tr>
                  <tr>
                    <td style={detailsLabelCell}>
                      <Text style={detailsLabel}>Subject:</Text>
                    </td>
                    <td style={detailsValueCell}>
                      <Text style={detailsValue}>{newsletterSubject}</Text>
                    </td>
                  </tr>
                  <tr>
                    <td style={detailsLabelCell}>
                      <Text style={detailsLabel}>Sent At:</Text>
                    </td>
                    <td style={detailsValueCell}>
                      <Text style={detailsValue}>{sentAt}</Text>
                    </td>
                  </tr>
                  <tr>
                    <td style={detailsLabelCell}>
                      <Text style={detailsLabel}>Segment:</Text>
                    </td>
                    <td style={detailsValueCell}>
                      <Text style={detailsValue}>
                        {segment === "recent"
                          ? "Recent Subscribers (30 days)"
                          : "All Subscribers"}
                      </Text>
                    </td>
                  </tr>
                </table>
              </Column>
            </Row>
          </Section>

          {/* Stats Section */}
          <Section style={statsSection}>
            <Row>
              <Column style={statColumn}>
                <Text style={statNumber}>{sentToCount}</Text>
                <Text style={statLabel}>Successfully Delivered</Text>
              </Column>
              <Column style={statColumn}>
                <Text style={statNumber}>{failedCount}</Text>
                <Text style={statLabel}>Failed Deliveries</Text>
              </Column>
              <Column style={statColumn}>
                <Text style={statNumber}>{sentToCount + failedCount}</Text>
                <Text style={statLabel}>Total Recipients</Text>
              </Column>
            </Row>
          </Section>

          {/* CTA Section */}
          <Section style={ctaSection}>
            <Button
              style={ctaButton}
              href={`${adminUrl}/dashboard/newsletters/${newsletterId}`}
            >
              View Newsletter Details
            </Button>
            <Button
              style={secondaryButton}
              href={`${adminUrl}/dashboard/newsletters`}
            >
              Manage All Newsletters
            </Button>
          </Section>

          {/* Tips Section */}
          <Section style={tipsSection}>
            <Text style={tipsTitle}>Tips for Better Engagement</Text>
            <ul style={tipsList}>
              <li style={tipItem}>
                Check your newsletter analytics in 24-48 hours to measure open
                rates and engagement
              </li>
              <li style={tipItem}>
                Consider sending follow-up emails to subscribers who didn't open
                your newsletter
              </li>
              <li style={tipItem}>
                Use A/B testing for future newsletters to optimize subject lines
                and content
              </li>
            </ul>
          </Section>
        </Section>

        {/* Footer */}
        <Section style={footer}>
          <Img
            src="https://hezain.org/org/logo-landscape.jpg"
            alt="Ishimwe Jean Baptiste Logo"
            width="120"
            height="auto"
            style={footerLogo}
          />
          <Text style={footerText}>
            This is an automated notification from the Ishimwe Jean Baptiste
            Newsletter System.
          </Text>
          <Text style={footerText}>
            © {new Date().getFullYear()} Ishimwe Jean Baptiste. All rights
            reserved.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default AdminNewsletterNotification;

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

const successBanner = {
  backgroundColor: "#11922f",
  padding: "12px 20px",
  textAlign: "center" as const,
};

const successText = {
  color: "#ffffff",
  fontSize: "16px",
  fontWeight: "bold",
  margin: "0",
};

const headerSection = {
  backgroundColor: "#ffffff",
  padding: "24px 0",
  textAlign: "center" as const,
};

const logo = {
  margin: "0 auto",
};

const ribbonSection = {
  width: "100%",
  margin: "0 0 -1px 0",
  padding: "0",
};

const contentSection = {
  padding: "30px 40px",
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
  lineHeight: "1.5",
  color: "#333333",
  margin: "0 0 25px",
  textAlign: "center" as const,
};

const highlightText = {
  color: "#11922f",
};

const infoCard = {
  backgroundColor: "#f8f9fa",
  borderRadius: "8px",
  padding: "20px",
  marginBottom: "25px",
  border: "1px solid #e6ebf1",
};

const infoCardTitle = {
  fontSize: "16px",
  fontWeight: "bold",
  color: "#333333",
  margin: "0 0 15px",
  textAlign: "center" as const,
};

const detailsTable = {
  width: "100%",
  borderCollapse: "collapse" as const,
};

const detailsLabelCell = {
  padding: "8px 10px 8px 0",
  width: "30%",
  verticalAlign: "top" as const,
};

const detailsValueCell = {
  padding: "8px 0",
  width: "70%",
};

const detailsLabel = {
  fontSize: "14px",
  color: "#666666",
  fontWeight: "600",
  margin: "0",
};

const detailsValue = {
  fontSize: "14px",
  color: "#333333",
  margin: "0",
};

const statsSection = {
  backgroundColor: "#ffffff",
  padding: "10px 0 25px",
  textAlign: "center" as const,
};

const statColumn = {
  padding: "0 10px",
  width: "33.33%",
  textAlign: "center" as const,
};

const statNumber = {
  fontSize: "28px",
  fontWeight: "bold",
  color: "#1CABE2",
  margin: "0 0 5px",
};

const statLabel = {
  fontSize: "13px",
  color: "#555555",
  margin: "0",
  fontWeight: "500",
};

const ctaSection = {
  textAlign: "center" as const,
  margin: "10px 0 30px",
};

const ctaButton = {
  backgroundColor: "#11922f",
  color: "#ffffff",
  padding: "12px 20px",
  borderRadius: "6px",
  fontWeight: "bold",
  fontSize: "14px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  margin: "0 10px 10px 0",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
};

const secondaryButton = {
  backgroundColor: "#ffffff",
  color: "#11922f",
  padding: "12px 20px",
  borderRadius: "6px",
  fontWeight: "bold",
  fontSize: "14px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  margin: "0 0 10px 10px",
  border: "1px solid #11922f",
};

const tipsSection = {
  backgroundColor: "#f0f9f1",
  borderRadius: "8px",
  padding: "20px",
  marginTop: "10px",
  border: "1px solid #d1e7d1",
};

const tipsTitle = {
  fontSize: "16px",
  fontWeight: "bold",
  color: "#00753c",
  margin: "0 0 15px",
};

const tipsList = {
  margin: "0",
  padding: "0 0 0 20px",
};

const tipItem = {
  fontSize: "14px",
  color: "#333333",
  margin: "0 0 10px",
  lineHeight: "1.5",
};

const footer = {
  backgroundColor: "#f8f9fa",
  padding: "30px 20px",
  textAlign: "center" as const,
  borderTop: "1px solid #e6ebf1",
};

const footerLogo = {
  margin: "0 auto 15px",
};

const footerText = {
  fontSize: "13px",
  color: "#666666",
  margin: "0 0 10px",
  lineHeight: "1.5",
};
