// emails\login-notification.tsx
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Hr,
  //  Img,
  Button,
  Link,
} from "@react-email/components";

interface LoginNotificationProps {
  userName: string;
  userEmail: string;
  loginTime: string;
  location: {
    ip: string;
    city?: string;
    country?: string;
    browser?: string;
    os?: string;
  };
  sessionId: string;
}

export const LoginNotificationEmail = ({
  userName,
  userEmail,
  loginTime,
  location,
  sessionId,
}: LoginNotificationProps) => {
  const previewText = `New login to Ishimwe Jean Baptiste Admin Dashboard by ${userName}`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* <Section style={logoContainer}>
            <Img src="https://hezain.org/org/logo-landscape.jpg" width="150" height="87" alt="Ishimwe Jean Baptiste Logo" />
          </Section> */}
          <Heading style={heading}>Login Alert</Heading>

          <Text style={paragraph}>
            This is an automated security notification to inform you that a user
            has successfully logged into the Ishimwe Jean Baptiste Admin
            Dashboard.
          </Text>

          <Section style={alertContainer}>
            <Text style={alertHeading}>Login Details:</Text>
            <Text style={alertText}>
              <strong>User:</strong> {userName} ({userEmail})
              <br />
              <strong>Time:</strong> {loginTime}
              <br />
              <strong>Session ID:</strong> {sessionId}
            </Text>
          </Section>

          <Section style={deviceInfo}>
            <Text style={deviceInfoText}>Device & Location Information:</Text>
            <Text style={deviceInfoDetail}>
              <strong>IP Address:</strong> {location.ip}
              <br />
              <strong>Location:</strong> {location.city || "Unknown"},{" "}
              {location.country || "Unknown"}
              <br />
              <strong>Browser:</strong> {location.browser || "Unknown"}
              <br />
              <strong>Operating System:</strong> {location.os || "Unknown"}
            </Text>
          </Section>

          <Hr style={hr} />

          <Text style={warningText}>
            If this login was not authorized or you don&apos;t recognize this
            activity, please take immediate action:
          </Text>

          <Section style={actionContainer}>
            <Button
              style={actionButton}
              href={`${process.env.NEXT_PUBLIC_DOMAIN}/admin/dashboard/security?sessions`}
            >
              Review Active Sessions
            </Button>
          </Section>

          <Text style={footer}>
            Also remember to report immediately to{" "}
            <Link href="mailto:possowiba01@gmail.com" style={link}>
              developer team
            </Link>
            . Your account security is our top priority.
          </Text>

          <Text style={signature}>Best regards</Text>
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

// const logoContainer = {
//   textAlign: "center" as const,
//   marginBottom: "24px",
// }

const heading = {
  fontSize: "24px",
  letterSpacing: "-0.5px",
  lineHeight: "1.3",
  fontWeight: "700",
  color: "#1a56db",
  textAlign: "center" as const,
  padding: "0 0 20px",
};

const paragraph = {
  margin: "0 0 15px",
  fontSize: "15px",
  lineHeight: "1.4",
  color: "#3c4149",
};

const alertContainer = {
  backgroundColor: "#f0f9ff",
  borderLeft: "4px solid #1a56db",
  borderRadius: "4px",
  padding: "16px",
  margin: "24px 0",
};

const link = {
  color: "#1a56db",
  textDecoration: "underline",
};

const alertHeading = {
  fontSize: "16px",
  fontWeight: "600",
  color: "#1a56db",
  margin: "0 0 8px",
};

const alertText = {
  fontSize: "14px",
  lineHeight: "1.6",
  color: "#3c4149",
  margin: "0",
};

const deviceInfo = {
  background: "#f8fafc",
  borderRadius: "8px",
  padding: "20px",
  margin: "24px 0",
  border: "1px solid #e2e8f0",
};

const deviceInfoText = {
  fontSize: "14px",
  lineHeight: "1.4",
  color: "#1a56db",
  fontWeight: "600",
  margin: "0 0 8px",
};

const deviceInfoDetail = {
  fontSize: "14px",
  lineHeight: "1.6",
  color: "#4a5568",
  margin: 0,
};

const warningText = {
  fontSize: "15px",
  lineHeight: "1.5",
  color: "#e53e3e",
  fontWeight: "500",
  margin: "24px 0 16px",
};

const actionContainer = {
  textAlign: "center" as const,
  margin: "24px 0",
};

const actionButton = {
  backgroundColor: "#1a56db",
  borderRadius: "4px",
  color: "#ffffff",
  fontSize: "14px",
  fontWeight: "600",
  textDecoration: "none",
  textAlign: "center" as const,
  padding: "12px 20px",
};

const hr = {
  borderColor: "#e2e8f0",
  margin: "24px 0",
};

const footer = {
  fontSize: "14px",
  lineHeight: "1.5",
  color: "#64748b",
  margin: "0 0 16px",
};

const signature = {
  fontSize: "14px",
  lineHeight: "1.5",
  color: "#1a56db",
  fontWeight: "600",
  margin: "30px 0 10px 0",
};

export default LoginNotificationEmail;
