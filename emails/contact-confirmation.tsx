import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface ContactConfirmationProps {
  name: string;
}

export const ContactConfirmationEmail = ({
  name,
}: ContactConfirmationProps) => {
  const baseUrl = "https://www.aphrodis.online";
  const currentYear = new Date().getFullYear();

  return (
    <Html>
      <Head />
      <Preview>Thank you for contacting me! I'll get back to you soon.</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header with logo */}
          <Section style={headerSection}>
           <div style={{ display: 'inline-block', overflow: 'hidden', borderRadius: '50%' }}
             onMouseOver={e => (e.currentTarget.firstChild as HTMLElement).style.transform = 'scale(1.5)'}
             onMouseOut={e => (e.currentTarget.firstChild as HTMLElement).style.transform = 'scale(1)'}
           >
             <Img
               src={`${baseUrl}/images/aphro.jpg`}
               alt="Portfolio Logo"
               width="500"
               height="500"
               style={{ ...logo, transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1)", cursor: "zoom-in" }}
             />
           </div>
          </Section>

          {/* Confirmation Banner */}
          <Section style={confirmationBanner}>
            <Heading style={bannerHeading}>Message Received!</Heading>
            <Text style={bannerText}>Thank you for reaching out</Text>
          </Section>

          {/* Main Content */}
          <Section style={contentSection}>
            <Text style={greeting}>Hello {name},</Text>

            <Text style={text}>
              Thank you for contacting me through my portfolio website. I've
              received your message and will review it shortly.
            </Text>

            <Text style={text}>
              I typically respond within 24-48 hours during business days. If
              your matter is urgent, please feel free to reach out to me
              directly at{" "}
              <Link href="mailto:hakuzweaphossy@gmail.com" style={linkStyle}>
                hakuzweaphossy@gmail.com
              </Link>
              .
            </Text>

            <Text style={text}>
              In the meantime, you might want to check out my portfolio to learn
              more about my work and expertise.
            </Text>

            <Section style={ctaSection}>
              <Button style={ctaButton} href={`${baseUrl}/work`}>
                Explore My Projects
              </Button>
            </Section>

            <Hr style={divider} />

            <Text style={text}>
              I look forward to discussing how we can work together to bring
              your ideas to life.
            </Text>

            <Text style={signature}>
              Best regards,
              <br />
              Aphrodis Hakuzweyezu
              <br />
              Full Stack Developer
            </Text>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              Aphrodis Hakuzweyezu | Full Stack Developer
            </Text>
            <Text style={footerText}>
              <Link href={baseUrl} style={footerLink}>
                {baseUrl}
              </Link>
            </Text>
            <Hr style={footerDivider} />
            <Text style={footerNote}>
              This is an automated response to your contact form submission.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default ContactConfirmationEmail;

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

const headerSection = {
  padding: "24px 0",
  textAlign: "center" as const,
  backgroundColor: "#ffffff",
  borderBottom: "1px solid #e2e8f0",
};

const logo = {
  margin: "0 auto",
  borderRadius: "50%",
  objectFit: 'cover' as const,
  width: "90px",
  height: "90px",
  display: "block",
};

const confirmationBanner = {
  backgroundColor: "#10b981", // Emerald 500
  backgroundImage: "linear-gradient(135deg, #10b981 0%, #059669 100%)", // Emerald gradient
  padding: "40px 20px",
  textAlign: "center" as const,
};

const bannerHeading = {
  color: "#ffffff",
  fontSize: "28px",
  fontWeight: "bold",
  margin: "0 0 10px",
  textAlign: "center" as const,
};

const bannerText = {
  color: "#ffffff",
  fontSize: "16px",
  margin: "0",
  opacity: "0.9",
  textAlign: "center" as const,
};

const contentSection = {
  padding: "30px 40px",
  backgroundColor: "#ffffff",
};

const greeting = {
  color: "#111827", // Dark text for light theme
  fontSize: "18px",
  lineHeight: "26px",
  fontWeight: "bold",
  margin: "0 0 15px",
};

const text = {
  color: "#374151", // Gray-700
  fontSize: "16px",
  lineHeight: "26px",
  margin: "0 0 20px",
};

const linkStyle = {
  color: "#10b981", // Emerald 500
  textDecoration: "underline",
};

const signature = {
  color: "#374151", // Gray-700
  fontSize: "16px",
  lineHeight: "26px",
  margin: "30px 0 0",
};

const ctaSection = {
  textAlign: "center" as const,
  margin: "30px 0",
};

const ctaButton = {
  backgroundColor: "#10b981", // Emerald 500
  borderRadius: "6px",
  color: "#ffffff",
  fontSize: "16px",
  fontWeight: "600",
  textDecoration: "none",
  textAlign: "center" as const,
  padding: "12px 24px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
};

const divider = {
  borderTop: "1px solid #e2e8f0", // Gray-200
  margin: "30px 0",
};

const footer = {
  textAlign: "center" as const,
  backgroundColor: "#f8fafc", // Gray-50
  padding: "30px 20px",
  color: "#374151", // Gray-700
  borderTop: "1px solid #e2e8f0", // Gray-200
};

const footerText = {
  fontSize: "14px",
  color: "#4b5563", // Gray-600
  margin: "0 0 10px",
};

const footerLink = {
  color: "#10b981", // Emerald 500
  textDecoration: "underline",
};

const footerDivider = {
  borderColor: "#e2e8f0", // Gray-200
  margin: "20px 0",
};

const footerNote = {
  fontSize: "12px",
  color: "#6b7280", // Gray-500
  margin: "0",
};
