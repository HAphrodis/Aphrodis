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
  Link,
  //  Img
} from "@react-email/components";

interface VerificationEmailProps {
  code: string;
  expiresInMinutes: number;
  userName: string;
  location: {
    city?: string;
    country?: string;
    browser?: string;
    os?: string;
    ip: string;
  };
}

export const VerificationEmail = ({
  code,
  expiresInMinutes,
  userName,
  location,
}: VerificationEmailProps) => {
  const previewText = `Your Ishimwe Jean Baptiste verification code is ${code}`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* <Section style={logoContainer}>
            <Img src="https://hezain.org/org/logo-landscape.jpg" width="auto" height="87" alt="Ishimwe Jean Baptiste Logo" />
          </Section> */}
          <Heading style={heading}>Admin Authentication</Heading>
          <Text style={greeting}>Dear {userName},</Text>
          <Text style={paragraph}>
            You are receiving this email because you have enabled Two-Factor
            Authentication for your Ishimwe Jean Baptiste Admin Dashboard
            account. To complete the sign-in process, please enter the
            verification code below.
          </Text>

          <Section style={codeContainer}>
            <Text style={codeStyle}>{code}</Text>
          </Section>

          <Text style={paragraph}>
            This verification code will expire in {expiresInMinutes} minutes.
          </Text>

          <Section style={deviceInfo}>
            <Text style={deviceInfoText}>Login Attempt Details:</Text>
            <Text style={deviceInfoDetail}>
              Location: {location.city}, {location.country}
              <br />
              Browser: {location.browser}
              <br />
              Operating System: {location.os}
              <br />
              IP Address: {location.ip}
            </Text>
          </Section>

          <Hr style={hr} />

          <Text style={footer}>
            If you did not attempt to sign in to your Ishimwe Jean Baptiste
            Admin Dashboard, please ignore this email and report immediately to{" "}
            <Link href="mailto:possowiba01@gmail.com" style={link}>
              develper team
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

const greeting = {
  margin: "0 0 15px",
  fontSize: "16px",
  lineHeight: "1.4",
  color: "#1a56db",
  fontWeight: "600",
};

const codeContainer = {
  background: "linear-gradient(to right, #1a56db, #3182ce)",
  borderRadius: "8px",
  margin: "24px 0",
  padding: "24px",
  textAlign: "center" as const,
};

const codeStyle = {
  fontFamily: "monospace",
  fontSize: "32px",
  fontWeight: "700",
  color: "#ffffff",
  letterSpacing: "8px",
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

const link = {
  color: "#1a56db",
  textDecoration: "underline",
};

export default VerificationEmail;
