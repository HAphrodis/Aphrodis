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

interface ContactNotificationProps {
  name: string;
  email: string;
  message: string;
  phone?: string;    // Optional
  subject?: string;  // Optional
}

export const ContactNotificationEmail = ({
   name,
  email,
  message,
  phone,
  subject,
}: ContactNotificationProps) => {
  const baseUrl = "https://possomushrooms.shop";
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
        New contact message from {name} ({email})
      </Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Alert Banner */}
          <Section style={alertBanner}>
            <Text style={alertText}>New Contact Message</Text>
          </Section>

          {/* Logo section */}
          <Section style={headerSection}>
            <Row>
              <Column>
                <Img
                  src={`${baseUrl}/images/posso.png`}
                  alt="Portfolio Logo"
                  width="120"
                  height="auto"
                  style={logo}
                />
              </Column>
            </Row>
          </Section>

          {/* Main content */}
          <Section style={contentSection}>
            <Heading style={h1}>You've Received a New Message</Heading>

            <Text style={introText}>
              Someone has just contacted you through your portfolio website.
            </Text>

            {/* Contact Details Card */}
            <Section style={detailsCard}>
              <Heading as="h3" style={detailsHeading}>
                Contact Details
              </Heading>
              <Hr style={cardDivider} />

              <Row style={detailRow}>
                <Column style={detailLabelColumn}>
                  <Text style={detailLabel}>Name:</Text>
                </Column>
                <Column style={detailValueColumn}>
                  <Text style={detailValue}>{name}</Text>
                </Column>
              </Row>

              <Row style={detailRow}>
                <Column style={detailLabelColumn}>
                  <Text style={detailLabel}>Email:</Text>
                </Column>
                <Column style={detailValueColumn}>
                  <Text style={detailValue}>{email}</Text>
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
              <Row style={detailRow}>
                <Column style={detailLabelColumn}>
                  <Text style={detailLabel}>Date:</Text>
                </Column>
                <Column style={detailValueColumn}>
                  <Text style={detailValue}>{currentDate}</Text>
                </Column>
              </Row>
            </Section>

            {/* Message Content */}
            <Section style={messageCard}>
              <Heading as="h3" style={messageHeading}>
                Message
              </Heading>
              <Hr style={cardDivider} />
              <Text style={messageContent}>{message}</Text>
            </Section>

            {/* Action Buttons */}
            <Section style={actionSection}>
              <Button style={primaryButton} href={`mailto:${email}`}>
                Reply to {name}
              </Button>

              <Button
                style={secondaryButton}
                href={`${baseUrl}/admin/dashboard/messages`}
              >
                View All Messages
              </Button>
            </Section>
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

export default ContactNotificationEmail;

// Updated styles for light theme compatibility with emerald green accent
const main = {
  backgroundColor: "#f8fafc", // Light background
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
  padding: "20px 0",
};

const container = {
  backgroundColor: "#ffffff", // White background
  margin: "0 auto",
  maxWidth: "600px",
  borderRadius: "8px",
  overflow: "hidden",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.05)",
  border: "1px solid #e2e8f0",
};

const alertBanner = {
  backgroundColor: "#10b981", // Emerald 500
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
  backgroundColor: "#ffffff",
};

const logo = {
  margin: "0 auto",
};

const contentSection = {
  padding: "10px 40px 30px",
  backgroundColor: "#ffffff",
};

const h1 = {
  color: "#10b981", // Emerald 500
  fontSize: "24px",
  fontWeight: "bold",
  textAlign: "center" as const,
  margin: "10px 0 20px",
};

const introText = {
  color: "#374151", // Gray-700
  fontSize: "16px",
  lineHeight: "24px",
  marginBottom: "25px",
};

const detailsCard = {
  backgroundColor: "#f8fafc", // Gray-50
  borderRadius: "8px",
  padding: "20px",
  border: "1px solid #e2e8f0", // Gray-200
  marginBottom: "25px",
};

const messageCard = {
  backgroundColor: "#f8fafc", // Gray-50
  borderRadius: "8px",
  padding: "20px",
  border: "1px solid #e2e8f0", // Gray-200
  marginBottom: "25px",
};

const detailsHeading = {
  color: "#10b981", // Emerald 500
  fontSize: "18px",
  fontWeight: "bold",
  margin: "0 0 15px",
};

const messageHeading = {
  color: "#10b981", // Emerald 500
  fontSize: "18px",
  fontWeight: "bold",
  margin: "0 0 15px",
};

const messageContent = {
  color: "#374151", // Gray-700
  fontSize: "16px",
  lineHeight: "26px",
  margin: "0",
  whiteSpace: "pre-wrap" as const,
};

const cardDivider = {
  borderTop: "1px solid #e2e8f0", // Gray-200
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
  color: "#6b7280", // Gray-500
  fontSize: "14px",
  fontWeight: "600",
  margin: "0",
};

const detailValue = {
  color: "#374151", // Gray-700
  fontSize: "14px",
  margin: "0",
};

const actionSection = {
  textAlign: "center" as const,
  margin: "25px 0",
};

const primaryButton = {
  backgroundColor: "#10b981", // Emerald 500
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
  backgroundColor: "#0ea5e9", // Sky 500
  borderRadius: "6px",
  color: "#ffffff",
  fontSize: "14px",
  fontWeight: "600",
  textDecoration: "none",
  textAlign: "center" as const,
  padding: "10px 20px",
  margin: "0 0 10px 10px",
};

const footer = {
  backgroundColor: "#f8fafc", // Gray-50
  padding: "20px",
  textAlign: "center" as const,
  borderTop: "1px solid #e2e8f0", // Gray-200
};

const footerText = {
  color: "#4b5563", // Gray-600
  fontSize: "14px",
  margin: "0 0 10px",
};

const footerLink = {
  color: "#10b981", // Emerald 500
  textDecoration: "underline",
};

const copyright = {
  color: "#6b7280", // Gray-500
  fontSize: "12px",
  margin: "20px 0 0",
};
