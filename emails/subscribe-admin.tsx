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

interface SubscribeAdminProps {
  email: string;
}

export const SubscribeAdminEmail = ({ email }: SubscribeAdminProps) => {
  const baseUrl = "https://www.aphrodis.online";
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <Html>
      <Head />
      <Preview>
        New Newsletter Subscription: {email} has joined your mailing list!
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
                  src={`${baseUrl}/images/aphro.jpg`}
                  alt="Portfolio Logo"
                  width="500"
                  height="500"
                  style={logo}
                />
              </Column>
            </Row>
          </Section>

          {/* Main content */}
          <Section style={contentSection}>
            <Heading style={h1}>New Newsletter Subscription</Heading>

            <Text style={introText}>
              Great news! Someone new has just subscribed to your portfolio
              newsletter.
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
                  <Text style={detailValue}>{email}</Text>
                </Column>
              </Row>

              <Row style={detailRow}>
                <Column style={detailLabelColumn}>
                  <Text style={detailLabel}>Date:</Text>
                </Column>
                <Column style={detailValueColumn}>
                  <Text style={detailValue}>{currentDate}</Text>
                </Column>
              </Row>

              <Row style={detailRow}>
                <Column style={detailLabelColumn}>
                  <Text style={detailLabel}>Source:</Text>
                </Column>
                <Column style={detailValueColumn}>
                  <Text style={detailValue}>Portfolio Website</Text>
                </Column>
              </Row>
            </Section>

            <Text style={actionText}>
              This subscriber has been automatically added to your newsletter
              list. A welcome email has been sent to them.
            </Text>

            {/* Action Buttons */}
            <Section style={actionSection}>
              <Button
                style={primaryButton}
                href={`${baseUrl}/admin/dashboard/subscribers`}
              >
                View All Subscribers
              </Button>

              <Button
                style={secondaryButton}
                href={`${baseUrl}/admin/dashboard/newsletters/create`}
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
                  href={`${baseUrl}/admin/dashboard/subscribers`}
                  style={actionIconLink}
                >
                  <div style={actionIconWrapper}>
                    <Img
                      src={`${baseUrl}/icons/users.png`}
                      alt="View Subscribers"
                      width="24"
                      height="24"
                      style={actionIcon}
                    />
                  </div>
                  <Text style={actionIconText}>View Subscribers</Text>
                </Link>
              </Column>

              <Column style={actionIconColumn}>
                <Link
                  href={`${baseUrl}/admin/dashboard/newsletters/create`}
                  style={actionIconLink}
                >
                  <div style={actionIconWrapper}>
                    <Img
                      src={`${baseUrl}/icons/mail.png`}
                      alt="Create Newsletter"
                      width="24"
                      height="24"
                      style={actionIcon}
                    />
                  </div>
                  <Text style={actionIconText}>Create Newsletter</Text>
                </Link>
              </Column>

              <Column style={actionIconColumn}>
                <Link
                  href={`${baseUrl}/admin/dashboard/analytics`}
                  style={actionIconLink}
                >
                  <div style={actionIconWrapper}>
                    <Img
                      src={`${baseUrl}/icons/chart.png`}
                      alt="View Analytics"
                      width="24"
                      height="24"
                      style={actionIcon}
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
              This is an automated notification from your portfolio website.
            </Text>

            <Text style={footerText}>
              <Link href={baseUrl} style={footerLink}>
                {baseUrl}
              </Link>
            </Text>

            <Text style={copyright}>
              © {new Date().getFullYear()} Aphrodis Hakuzweyezu. All rights
              reserved.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default SubscribeAdminEmail;

// Styles
const main = {
  backgroundColor: "#0a0f16",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
  padding: "20px 0",
};

const container = {
  backgroundColor: "#0f172a",
  margin: "0 auto",
  maxWidth: "600px",
  borderRadius: "8px",
  overflow: "hidden",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  border: "1px solid #1e293b",
};

const alertBanner = {
  backgroundColor: "#10b981",
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
  borderRadius: "50%",
  objectFit: 'cover' as const,
  width: "90px",
  height: "90px",
  display: "block",
};

const contentSection = {
  padding: "10px 40px 30px",
};

const h1 = {
  color: "#10b981",
  fontSize: "24px",
  fontWeight: "bold",
  textAlign: "center" as const,
  margin: "10px 0 20px",
};

const introText = {
  color: "#cbd5e1",
  fontSize: "16px",
  lineHeight: "24px",
  marginBottom: "25px",
};

const detailsCard = {
  backgroundColor: "#1e293b",
  borderRadius: "8px",
  padding: "20px",
  border: "1px solid #334155",
  marginBottom: "25px",
};

const detailsHeading = {
  color: "#10b981",
  fontSize: "18px",
  fontWeight: "bold",
  margin: "0 0 15px",
};

const cardDivider = {
  borderTop: "1px solid #334155",
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
  color: "#94a3b8",
  fontSize: "14px",
  fontWeight: "600",
  margin: "0",
};

const detailValue = {
  color: "#cbd5e1",
  fontSize: "14px",
  margin: "0",
};

const actionText = {
  color: "#cbd5e1",
  fontSize: "15px",
  lineHeight: "24px",
  margin: "0 0 15px",
};

const actionSection = {
  textAlign: "center" as const,
  margin: "25px 0",
};

const primaryButton = {
  backgroundColor: "#10b981",
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
  backgroundColor: "#3b82f6",
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
  backgroundColor: "#1e293b",
  padding: "25px 20px",
  textAlign: "center" as const,
  borderTop: "1px solid #334155",
};

const quickActionsHeading = {
  color: "#cbd5e1",
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
  backgroundColor: "#0f172a",
  borderRadius: "50%",
  padding: "12px",
  width: "24px",
  height: "24px",
  margin: "0 auto 8px",
  border: "1px solid #334155",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const actionIcon = {
  width: "24px",
  height: "24px",
};

const actionIconText = {
  color: "#10b981",
  fontSize: "14px",
  fontWeight: "600",
  margin: "0",
};

const footer = {
  backgroundColor: "#0f172a",
  padding: "20px",
  textAlign: "center" as const,
  borderTop: "1px solid #1e293b",
};

const footerText = {
  color: "#cbd5e1",
  fontSize: "14px",
  margin: "0 0 10px",
};

const footerLink = {
  color: "#10b981",
  textDecoration: "underline",
};

const copyright = {
  color: "#64748b",
  fontSize: "12px",
  margin: "20px 0 0",
};
