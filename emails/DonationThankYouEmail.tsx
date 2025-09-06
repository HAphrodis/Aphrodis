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
import * as React from "react";

interface DonationThankYouEmailProps {
  donorName: string;
  amount: number;
  frequency: "onetime" | "monthly";
}

export default function DonationThankYouEmail({
  donorName = "Valued Supporter",
  amount = 100,
  frequency = "onetime",
}: DonationThankYouEmailProps) {
  // You can replace these with your actual icon URLs
  const baseUrl = "https://www.hezain.org";

  return (
    <Html>
      <Head />
      <Preview>Thank you for your donation to Ishimwe Jean Baptiste!</Preview>
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

          {/* Donation Banner */}
          <Section style={donationBanner}>
            <Heading style={bannerHeading}>
              Thank You For Your{" "}
              {frequency === "monthly" ? "Monthly" : "One-Time"} Donation!
            </Heading>
            <Text style={bannerText}>
              Your generosity makes our work possible
            </Text>
          </Section>

          {/* Main Content */}
          <Section style={contentSection}>
            <Text style={greeting}>Dear {donorName},</Text>

            <Text style={text}>
              Thank you for your generous{" "}
              {frequency === "monthly" ? "monthly" : "one-time"} donation of{" "}
              <span style={highlight}>${amount}</span> to{" "}
              <span style={highlight}>Ishimwe Jean Baptiste</span>. Your support
              makes a significant difference in our mission to improve nutrition
              and health outcomes for children and families across Rwanda.
            </Text>

            {/* Impact Section */}
            <Section style={impactSection}>
              <Heading as="h3" style={impactHeading}>
                Your Impact:
              </Heading>
              <Text style={impactText}>
                Your donation will help us provide nutritious meals, health
                education, and sustainable solutions for communities in need. We
                are committed to ensuring your contribution creates lasting
                positive change.
              </Text>
            </Section>

            <Text style={text}>
              Our team will contact you shortly to complete the donation
              process. In the meantime, if you have any questions, please
              don&apos;t hesitate to reach out to us at{" "}
              <Link href="mailto:hezainitiative@gmail.com" style={emailLink}>
                hezainitiative@gmail.com
              </Link>
              .
            </Text>

            <Section style={ctaSection}>
              <Button style={ctaButton} href="https://www.hezain.org/impact">
                See Your Impact
              </Button>
            </Section>

            <Hr style={divider} />

            <Text style={signature}>
              With gratitude,
              <br />
              <span style={signatureName}>The Ishimwe Jean Baptiste Team</span>
            </Text>
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

          {/* Quick Links */}
          <Section style={quickLinksSection}>
            <Link href="https://www.hezain.org" style={quickLink}>
              Visit our website
            </Link>
            <Text style={quickLinkDivider}>•</Text>
            <Link href="https://www.hezain.org/impact" style={quickLink}>
              See our impact
            </Link>
            <Text style={quickLinkDivider}>•</Text>
            <Link href="https://www.hezain.org/contact" style={quickLink}>
              Contact us
            </Link>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerTagline}>
              Building Healthier Communities Together
            </Text>
            <Hr style={footerDivider} />

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

const headerSection = {
  padding: "24px 0",
  textAlign: "center" as const,
  backgroundColor: "#ffffff",
  borderBottom: "1px solid #e6ebf1",
};

const logo = {
  margin: "0 auto",
};

const donationBanner = {
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

const impactSection = {
  backgroundColor: "#f0f9f1",
  borderRadius: "8px",
  padding: "20px",
  borderLeft: "4px solid #11922f",
  margin: "0 0 20px",
};

const impactHeading = {
  color: "#00753c",
  fontSize: "18px",
  fontWeight: "bold",
  margin: "0 0 10px",
};

const impactText = {
  color: "#333333",
  fontSize: "15px",
  lineHeight: "24px",
  margin: "0",
};

const emailLink = {
  color: "#1CABE2",
  textDecoration: "none",
  fontWeight: "500",
};

const ctaSection = {
  textAlign: "center" as const,
  margin: "30px 0 20px",
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
  margin: "20px 0",
};

const signature = {
  fontSize: "16px",
  lineHeight: "24px",
  textAlign: "center" as const,
  margin: "0",
  color: "#333333",
};

const signatureName = {
  color: "#11922f",
  fontWeight: "600",
  fontSize: "18px",
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

const quickLinksSection = {
  textAlign: "center" as const,
  padding: "0 20px 25px",
  backgroundColor: "#ffffff",
};

const quickLink = {
  color: "#1CABE2",
  fontSize: "14px",
  textDecoration: "none",
  display: "inline-block",
};

const quickLinkDivider = {
  color: "#cccccc",
  display: "inline-block",
  margin: "0 8px",
  fontSize: "14px",
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
