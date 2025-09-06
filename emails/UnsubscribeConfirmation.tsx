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
import type * as React from "react";

interface UnsubscribeConfirmationProps {
  subscriberEmail: string;
}

export const UnsubscribeConfirmation: React.FC<
  UnsubscribeConfirmationProps
> = ({ subscriberEmail }) => (
  <Html>
    <Head />
    <Preview>
      You&apos;ve been unsubscribed from Ishimwe Jean Baptiste newsletter
    </Preview>
    <Body style={main}>
      <Container style={container}>
        {/* Header with Logo */}
        <Section style={headerSection}>
          <Img
            src="https://hezain.org/org/logo-landscape.jpg"
            alt="Ishimwe Jean Baptiste Logo"
            width="150"
            height="auto"
            style={logo}
          />
        </Section>

        {/* Main Content */}
        <Section style={contentSection}>
          <Heading style={heading}>You&apos;ve Been Unsubscribed</Heading>

          <Text style={paragraph}>Hello,</Text>

          <Text style={paragraph}>
            We&apos;re confirming that you&apos;ve been successfully
            unsubscribed from the Ishimwe Jean Baptiste newsletter. You will no
            longer receive our regular updates.
          </Text>

          <Text style={paragraph}>
            We&apos;re sorry to see you go, but we respect your decision. If you
            unsubscribed by mistake or change your mind in the future, you can
            always resubscribe using the button below.
          </Text>

          <Section style={ctaSection}>
            <Button
              style={ctaButton}
              href={`https://hezain.org/subscribe?email=${encodeURIComponent(subscriberEmail)}`}
            >
              Resubscribe
            </Button>
          </Section>

          <Hr style={divider} />

          <Text style={paragraph}>
            If you have any questions or need assistance, please don&apos;t
            hesitate to contact us at{" "}
            <Link href="mailto:hezainitiative@gmail.com" style={link}>
              hezainitiative@gmail.com
            </Link>
            .
          </Text>

          <Text style={paragraph}>
            Thank you for your past interest in Ishimwe Jean Baptiste. We wish
            you all the best!
          </Text>
        </Section>

        {/* Footer */}
        <Section style={footer}>
          <Text style={footerText}>
            Ishimwe Jean Baptiste | Rulindo, Rwanda
          </Text>
          <Text style={footerText}>
            <Link href="https://hezain.org" style={footerLink}>
              www.hezain.org
            </Link>
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default UnsubscribeConfirmation;

// Main styles
const main = {
  backgroundColor: "#f5f5f5",
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  padding: "20px 0",
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  maxWidth: "600px",
  borderRadius: "8px",
  overflow: "hidden",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.05)",
};

// Header styles
const headerSection = {
  backgroundColor: "#ffffff",
  padding: "24px 0",
  textAlign: "center" as const,
};

const logo = {
  margin: "0 auto",
};

// Content styles
const contentSection = {
  padding: "30px 20px",
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
  lineHeight: "24px",
  color: "#555555",
  margin: "0 0 20px",
};

const ctaSection = {
  textAlign: "center" as const,
  margin: "30px 0",
};

const ctaButton = {
  backgroundColor: "#11922f",
  color: "#ffffff",
  padding: "12px 24px",
  borderRadius: "4px",
  fontWeight: "bold",
  fontSize: "16px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
};

const divider = {
  borderColor: "#e0e0e0",
  margin: "30px 0",
};

const link = {
  color: "#11922f",
  textDecoration: "underline",
};

// Footer styles
const footer = {
  backgroundColor: "#333333",
  color: "#ffffff",
  padding: "20px",
  textAlign: "center" as const,
};

const footerText = {
  fontSize: "14px",
  color: "#ffffff",
  margin: "0 0 10px",
};

const footerLink = {
  color: "#ffffff",
  textDecoration: "underline",
};
