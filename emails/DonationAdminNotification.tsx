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

interface DonationAdminNotificationProps {
  donorName: string;
  donorEmail: string;
  amount: number;
  frequency: "onetime" | "monthly";
  message?: string;
  phone?: string;
}

export default function DonationAdminNotification({
  donorName = "John Doe",
  donorEmail = "johndoe@example.com",
  amount = 100,
  frequency = "onetime",
  message = "",
  phone = "",
}: DonationAdminNotificationProps) {
  return (
    <Html>
      <Head />
      <Preview>New Donation from {donorName}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Alert Banner */}
          <Section style={alertBanner}>
            <Text style={alertText}>New Donation Alert</Text>
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
            <Heading style={h1}>New Donation Received</Heading>

            <Text style={introText}>
              You&apos;ve received a new{" "}
              {frequency === "monthly" ? "monthly" : "one-time"} donation from{" "}
              <span style={highlight}>{donorName}</span>. Please review the
              details below:
            </Text>

            {/* Donation Details Card */}
            <Section style={detailsCard}>
              <Heading as="h3" style={detailsHeading}>
                Donation Details:
              </Heading>

              <Row style={detailRow}>
                <Column style={detailLabelColumn}>
                  <Text style={detailLabel}>Amount:</Text>
                </Column>
                <Column style={detailValueColumn}>
                  <Text style={detailValue}>${amount}</Text>
                </Column>
              </Row>

              <Row style={detailRow}>
                <Column style={detailLabelColumn}>
                  <Text style={detailLabel}>Frequency:</Text>
                </Column>
                <Column style={detailValueColumn}>
                  <Text style={detailValue}>
                    {frequency === "monthly" ? "Monthly" : "One-time"}
                  </Text>
                </Column>
              </Row>

              <Row style={detailRow}>
                <Column style={detailLabelColumn}>
                  <Text style={detailLabel}>Donor:</Text>
                </Column>
                <Column style={detailValueColumn}>
                  <Text style={detailValue}>{donorName}</Text>
                </Column>
              </Row>

              <Row style={detailRow}>
                <Column style={detailLabelColumn}>
                  <Text style={detailLabel}>Email:</Text>
                </Column>
                <Column style={detailValueColumn}>
                  <Link href={`mailto:${donorEmail}`} style={emailLink}>
                    {donorEmail}
                  </Link>
                </Column>
              </Row>

              {phone && (
                <Row style={detailRow}>
                  <Column style={detailLabelColumn}>
                    <Text style={detailLabel}>Phone:</Text>
                  </Column>
                  <Column style={detailValueColumn}>
                    <Text style={detailValue}>{phone}</Text>
                  </Column>
                </Row>
              )}
            </Section>

            {/* Message Section */}
            {message && (
              <Section style={messageSection}>
                <Heading as="h3" style={messageHeading}>
                  Message from donor:
                </Heading>
                <Text style={messageText}>&quot;{message}&quot;</Text>
              </Section>
            )}

            <Text style={actionText}>
              Please follow up with the donor to complete the donation process
              and send a personalized thank you.
            </Text>

            {/* Action Buttons */}
            <Section style={actionSection}>
              <Button
                style={primaryButton}
                href="https://www.hezain.org/admin/dashboard/donations"
              >
                View in Dashboard
              </Button>

              <Button style={secondaryButton} href={`mailto:${donorEmail}`}>
                Email Donor
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
              donation system.
            </Text>

            <Text style={footerText}>
              For technical support, please contact your website administrator.
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
}

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

const highlight = {
  color: "#11922f",
  fontWeight: "600",
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

const emailLink = {
  color: "#1CABE2",
  textDecoration: "none",
  fontSize: "14px",
};

const messageSection = {
  backgroundColor: "#f8f9fa",
  borderRadius: "8px",
  padding: "20px",
  border: "1px solid #e6ebf1",
  marginBottom: "25px",
};

const messageHeading = {
  color: "#333333",
  fontSize: "16px",
  fontWeight: "600",
  margin: "0 0 10px",
};

const messageText = {
  color: "#666666",
  fontSize: "14px",
  fontStyle: "italic",
  lineHeight: "22px",
  margin: "0",
};

const actionText = {
  color: "#333333",
  fontSize: "15px",
  lineHeight: "24px",
  margin: "0 0 20px",
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

const timeStamp = {
  color: "#999999",
  fontSize: "12px",
  fontStyle: "italic",
  textAlign: "right" as const,
  margin: "20px 0 0",
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
