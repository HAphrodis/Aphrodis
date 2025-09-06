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

interface ThankYouEmailProps {
  senderName: string;
}

export const ThankYouEmail: React.FC<ThankYouEmailProps> = ({ senderName }) => {
  // You can replace these with your actual icon URLs
  const baseUrl = "https://www.hezain.org";

  return (
    <Html>
      <Head />
      <Preview>Thank you for reaching out to Ishimwe Jean Baptiste!</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header with logo */}
          <Section style={headerSection}>
            <Img
              src="https://www.hezain.org/org/logo-landscape.jpg"
              alt="Ishimwe Jean Baptiste Logo"
              width="220"
              height="auto"
              style={logo}
            />
          </Section>

          {/* Notification Banner */}
          <Section style={notificationBanner}>
            <Heading style={bannerHeading}>
              Thank You For Contacting Us!
            </Heading>
            <Text style={bannerText}>
              We&apos;ve received your message and will respond shortly
            </Text>
          </Section>

          {/* Main Content */}
          <Section style={contentSection}>
            <Text style={greeting}>Dear {senderName},</Text>

            <Text style={text}>
              Thank you for reaching out to{" "}
              <span style={highlight}>Ishimwe Jean Baptiste</span>. Your message
              has been received, and our team is already reviewing it.
            </Text>

            <Text style={text}>
              We strive to respond to all inquiries within 24-48 hours. In the
              meantime, feel free to explore our programs and recent initiatives
              on our website.
            </Text>

            <Section style={ctaSection}>
              <Button style={ctaButton} href="https://www.hezain.org/programs">
                Explore Our Programs
              </Button>
            </Section>

            <Hr style={divider} />

            {/* Contact Section */}
            <Section style={contactSection}>
              <Heading as="h3" style={contactHeading}>
                Need immediate assistance?
              </Heading>
              <div style={contactCard}>
                <Row>
                  <Column style={contactColumn}>
                    <Text style={contactLabel}>Call us:</Text>
                    <Link href="tel:+250788228265" style={contactLink}>
                      +250 788 228 265
                    </Link>
                  </Column>
                </Row>
                <Row>
                  <Column style={contactColumn}>
                    <Text style={contactLabel}>Email us:</Text>
                    <Link
                      href="mailto:hezainitiative@gmail.com"
                      style={contactLink}
                    >
                      hezainitiative@gmail.com
                    </Link>
                  </Column>
                </Row>
              </div>
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
            <Text style={footerTagline}>
              Building Healthier Communities Together
            </Text>
            <Hr style={footerDivider} />
            {/* <Row>
              <Column style={footerColumn}>
                <Text style={footerColumnHeading}>Address</Text>
                <Text style={footerColumnText}>Rulindo, Northern Province - Rwanda</Text>
              </Column>
              <Column style={footerColumn}>
                <Text style={footerColumnHeading}>Contact</Text>
                <Text style={footerColumnText}>hezainitiative@gmail.com</Text>
              </Column>
            </Row> */}
            <div style={copyright}>
              <Text style={copyrightText}>
                © {new Date().getFullYear()} Ishimwe Jean Baptiste. All rights
                reserved.
              </Text>
            </div>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default ThankYouEmail;

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

const notificationBanner = {
  backgroundColor: "#11922f",
  padding: "30px 20px",
  textAlign: "center" as const,
};

const bannerHeading = {
  color: "#ffffff",
  fontSize: "24px",
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

const highlight = {
  color: "#11922f",
  fontWeight: "600",
};

const ctaSection = {
  textAlign: "center" as const,
  margin: "30px 0",
};

const ctaButton = {
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

const contactSection = {
  textAlign: "center" as const,
};

const contactHeading = {
  color: "#00753c",
  fontSize: "18px",
  fontWeight: "bold",
  margin: "0 0 15px",
  textAlign: "center" as const,
};

const contactCard = {
  backgroundColor: "#f8f9fa",
  borderRadius: "8px",
  padding: "20px",
  border: "1px solid #e6ebf1",
};

const contactColumn = {
  textAlign: "center" as const,
  margin: "10px 0",
};

const contactLabel = {
  color: "#666666",
  fontSize: "14px",
  fontWeight: "500",
  margin: "0 0 5px",
};

const contactLink = {
  color: "#1CABE2",
  fontSize: "16px",
  fontWeight: "600",
  textDecoration: "none",
};

const socialSection = {
  textAlign: "center" as const,
  backgroundColor: "#ffffff",
  padding: "25px 20px",
  borderTop: "1px solid #e6ebf1",
  borderBottom: "1px solid #e6ebf1",
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
  backgroundColor: "#f8f9fa",
  padding: "30px 20px",
  borderBottomLeftRadius: "8px",
  borderBottomRightRadius: "8px",
};

const footerTagline = {
  color: "#11922f",
  fontSize: "14px",
  fontWeight: "600",
  margin: "0 0 15px",
  letterSpacing: "0.5px",
};

const footerDivider = {
  borderTop: "1px solid #e6ebf1",
  margin: "15px 0 20px",
};

const copyright = {
  marginTop: "25px",
};

const copyrightText = {
  color: "#999999",
  fontSize: "12px",
  margin: "0",
};
