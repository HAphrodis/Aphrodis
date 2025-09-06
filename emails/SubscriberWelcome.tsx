// emails\SubscriberWelcome.tsx
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
import * as React from "react";

interface SubscriberWelcomeProps {
  subscriberEmail: string;
}

export const SubscriberWelcome: React.FC<SubscriberWelcomeProps> = ({
  subscriberEmail,
}) => {
  // You can replace these with your actual icon URLs
  const baseUrl = "https://www.hezain.org";

  return (
    <Html>
      <Head />
      <Preview>
        Welcome to the Aphrodi Hakuzweyezu family! 🌱 Discover our mission,
        programs, and impact.
      </Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header with logo */}
          <Section style={headerSection}>
            <Img
              src="https://www.hezain.org/org/logo-landscape.jpg"
              alt="Aphossy Logo"
              width="220"
              height="auto"
              style={logo}
            />
          </Section>

          {/* Welcome Banner */}
          <Section style={welcomeBanner}>
            <Heading style={bannerHeading}>Welcome to Our Community!</Heading>
            <Text style={bannerText}>
              Thank you for joining the Aphrodi Hakuzweyezu newsletter
            </Text>
          </Section>

          {/* Main Content */}
          <Section style={contentSection}>
            <Text style={greeting}>Dear Friend,</Text>

            <Text style={text}>
              We're thrilled to welcome you to our growing community of
              changemakers! By subscribing to our newsletter, you've taken the
              first step in joining our mission to improve nutrition and care in
              Rwanda.
            </Text>

            <Text style={subheading}>
              <strong>What you can expect from us:</strong>
            </Text>

            <Row style={featureRow}>
              <Column style={featureColumn}>
                <Text style={featureIcon}>📰</Text>
                <Text style={featureTitle}>Latest News</Text>
                <Text style={featureText}>
                  Updates on our programs and initiatives
                </Text>
              </Column>
              <Column style={featureColumn}>
                <Text style={featureIcon}>📝</Text>
                <Text style={featureTitle}>Blog Posts</Text>
                <Text style={featureText}>
                  Insightful articles about our work
                </Text>
              </Column>
              <Column style={featureColumn}>
                <Text style={featureIcon}>📅</Text>
                <Text style={featureTitle}>Events</Text>
                <Text style={featureText}>Invitations to upcoming events</Text>
              </Column>
            </Row>

            <Section style={ctaSection}>
              <Button style={ctaButton} href="https://www.hezain.org/programs">
                Explore Our Programs
              </Button>
            </Section>

            <Hr style={divider} />

            {/* About Us Section */}
            <Heading style={sectionHeading}>
              About Aphrodi Hakuzweyezu
            </Heading>
            <Text style={text}>
              Aphrodi Hakuzweyezu is dedicated to improving nutrition and care
              in Rwanda. Our programs focus on sustainable solutions that
              empower communities and create lasting positive change.
            </Text>

            <Section style={imageSection}>
              <Img
                src="https://www.hezain.org/org/hero-image.jpg"
                alt="Aphrodi Hakuzweyezu in action"
                width="100%"
                height="auto"
                style={contentImage}
              />
            </Section>

            <Section style={ctaSection}>
              <Button
                style={secondaryButton}
                href="https://www.hezain.org/about"
              >
                Learn More About Us
              </Button>
            </Section>
          </Section>

          {/* Social Media */}
          <Section style={socialSection}>
            <Text style={socialHeading}>Connect with us:</Text>
            <table style={socialTable}>
              <tr>
                <td style={socialTableCell}>
                  <Link href="https://www.hezain.org" style={socialLink}>
                    <Img
                      src={`${baseUrl}/icons/globe.png`}
                      width="25"
                      height="25"
                      alt="Website"
                      style={socialIcon}
                    />
                  </Link>
                  <Link
                    href="https://twitter.com/hezainitiatives"
                    style={socialLink}
                  >
                    <Img
                      src={`${baseUrl}/icons/twitter-x.png`}
                      width="25"
                      height="25"
                      alt="Twitter"
                      style={socialIcon}
                    />
                  </Link>
                  <Link
                    href="https://instagram.com/hezainitiative"
                    style={socialLink}
                  >
                    <Img
                      src={`${baseUrl}/icons/instagram.png`}
                      width="25"
                      height="25"
                      alt="Instagram"
                      style={socialIcon}
                    />
                  </Link>
                  <Link
                    href="https://www.linkedin.com/company/heza-initiative"
                    style={socialLink}
                  >
                    <Img
                      src={`${baseUrl}/icons/linkedin.png`}
                      width="25"
                      height="25"
                      alt="LinkedIn"
                      style={socialIcon}
                    />
                  </Link>
                  <Link
                    href="https://youtube.com/@hezainitiative"
                    style={socialLink}
                  >
                    <Img
                      src={`${baseUrl}/icons/youtube.png`}
                      width="25"
                      height="25"
                      alt="YouTube"
                      style={socialIcon}
                    />
                  </Link>
                </td>
              </tr>
            </table>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              Aphrodi Hakuzweyezu | Rulindo, Rwanda
            </Text>
            <Text style={footerText}>
              Phone: +250788977568 | Email:{" "}
              <Link href="mailto:hezainitiative@gmail.com" style={footerLink}>
                hezainitiative@gmail.com
              </Link>
            </Text>
            <Text style={footerText}>
              <Link href="https://www.hezain.org" style={footerLink}>
                www.hezain.org
              </Link>
            </Text>
            <Hr style={footerDivider} />
            <Text style={unsubscribeText}>
              You&apos;re receiving this email because you subscribed to our
              newsletter.
              <br />
              <Link
                href={`https://www.hezain.org/unsubscribe?email=${encodeURIComponent(subscriberEmail)}`}
                style={unsubscribeLink}
              >
                Unsubscribe
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default SubscriberWelcome;

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

const headerSection = {
  padding: "24px 0",
  textAlign: "center" as const,
  backgroundColor: "#ffffff",
  borderBottom: "1px solid #e6ebf1",
};

const logo = {
  margin: "0 auto",
};

const welcomeBanner = {
  backgroundColor: "#11922f",
  backgroundImage: "linear-gradient(135deg, #11922f 0%, #00753c 100%)",
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
  color: "#333333",
  fontSize: "18px",
  lineHeight: "26px",
  fontWeight: "bold",
  margin: "0 0 15px",
};

const text = {
  color: "#333333",
  fontSize: "16px",
  lineHeight: "26px",
  margin: "0 0 20px",
};

const subheading = {
  color: "#11922f",
  fontSize: "16px",
  lineHeight: "26px",
  margin: "0 0 20px",
};

const featureRow = {
  margin: "20px 0 30px",
};

const featureColumn = {
  textAlign: "center" as const,
  padding: "0 10px",
};

const featureIcon = {
  fontSize: "32px",
  margin: "0 0 10px",
};

const featureTitle = {
  fontSize: "16px",
  fontWeight: "bold",
  color: "#11922f",
  margin: "0 0 5px",
};

const featureText = {
  fontSize: "14px",
  color: "#666666",
  margin: "0",
};

const ctaSection = {
  textAlign: "center" as const,
  margin: "30px 0",
};

const ctaButton = {
  backgroundColor: "#11922f",
  borderRadius: "6px",
  color: "#ffffff",
  fontSize: "16px",
  fontWeight: "600",
  textDecoration: "none",
  textAlign: "center" as const,
  padding: "12px 24px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
};

const secondaryButton = {
  backgroundColor: "#1CABE2",
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
  borderTop: "1px solid #e6ebf1",
  margin: "30px 0",
};

const sectionHeading = {
  color: "#11922f",
  fontSize: "22px",
  fontWeight: "bold",
  margin: "0 0 20px",
};

const imageSection = {
  margin: "20px 0",
};

const contentImage = {
  borderRadius: "8px",
  border: "1px solid #e6ebf1",
};

const socialSection = {
  textAlign: "center" as const,
  backgroundColor: "#ffffff",
  padding: "25px 20px",
  borderTop: "1px solid #e6ebf1",
};

const socialHeading = {
  color: "#666666",
  fontSize: "16px",
  fontWeight: "600",
  margin: "0 0 15px",
  textAlign: "center" as const,
};

const socialTable = {
  width: "100%",
};

const socialTableCell = {
  textAlign: "center" as const,
};

const socialLink = {
  display: "inline-block",
  margin: "0 8px",
  textDecoration: "none",
};

const socialIcon = {
  borderRadius: "50%",
  padding: "8px",
  backgroundColor: "#f8f9fa",
  border: "1px solid #e6ebf1",
};

const footer = {
  textAlign: "center" as const,
  backgroundColor: "#333333",
  padding: "30px 20px",
  color: "#ffffff",
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

const footerDivider = {
  borderColor: "#555555",
  margin: "20px 0",
};

const unsubscribeText = {
  fontSize: "12px",
  color: "#aaaaaa",
  margin: "0",
};

const unsubscribeLink = {
  color: "#aaaaaa",
  textDecoration: "underline",
};
