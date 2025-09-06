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

interface NewsletterTemplateProps {
  previewText: string;
  title: string;
  content: string;
  subscriberEmail: string;
  date: string;
  unsubscribeUrl: string;
  viewInBrowserUrl: string;
}

export const NewsletterTemplate: React.FC<NewsletterTemplateProps> = ({
  previewText,
  title,
  content,
  // subscriberEmail,
  date,
  unsubscribeUrl,
  viewInBrowserUrl,
}) => (
  <Html>
    <Head />
    <Preview>{previewText}</Preview>
    <Body style={main}>
      <Container style={container}>
        {/* View in browser link */}
        <Section style={viewInBrowserSection}>
          <Link href={viewInBrowserUrl} style={viewInBrowserLink}>
            View this email in your browser
          </Link>
        </Section>

        {/* Header with Logo */}
        <Section style={headerSection}>
          <Img
            src="https://hezain.org/org/logo-landscape.jpg"
            alt="Ishimwe Jean Baptiste Logo"
            width="200"
            height="auto"
            style={logo}
          />
        </Section>

        {/* Colorful Ribbon */}
        <Section style={ribbonSection}>
          <Row>
            <Column
              style={{
                width: "25%",
                backgroundColor: "#11922f",
                height: "8px",
              }}
            ></Column>
            <Column
              style={{
                width: "25%",
                backgroundColor: "#00753c",
                height: "8px",
              }}
            ></Column>
            <Column
              style={{
                width: "25%",
                backgroundColor: "#1CABE2",
                height: "8px",
              }}
            ></Column>
            <Column
              style={{
                width: "25%",
                backgroundColor: "#62d572",
                height: "8px",
              }}
            ></Column>
          </Row>
        </Section>

        {/* Date Banner */}
        <Section style={dateBanner}>
          <Text style={dateText}>{date}</Text>
        </Section>

        {/* Main Content */}
        <Section style={contentSection}>
          <Heading style={heading}>{title}</Heading>
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </Section>

        {/* Featured Story Section */}
        <Section style={featuredStorySection}>
          <Heading style={featuredStoryHeading}>Featured Story</Heading>
          <Row>
            <Column
              style={{
                width: "100%",
                paddingRight: "0",
                paddingBottom: "15px",
              }}
            >
              <Img
                src="https://hezain.org/images/featured-story.jpg"
                alt="Featured Story"
                width="100%"
                height="auto"
                style={featuredStoryImage}
              />
            </Column>
          </Row>
          <Row>
            <Column style={{ width: "100%" }}>
              <Text style={featuredStoryTitle}>
                Transforming Lives in Rwanda
              </Text>
              <Text style={featuredStoryText}>
                Meet Claudine, whose life has been transformed through our
                community programs. Through skills training and support, she now
                runs her own business and provides for her family.
              </Text>
              <div style={readMoreButtonWrapper}>
                <Button style={readMoreButton} href="https://hezain.org/about">
                  Read More
                </Button>
              </div>
            </Column>
          </Row>
        </Section>

        {/* Impact Stats Section */}
        <Section style={impactStatsSection}>
          <Heading style={impactHeading}>Our Impact</Heading>
          <Row>
            <Column style={statColumn}>
              <Text style={statNumber}>1000+</Text>
              <Text style={statLabel}>Children Supported</Text>
            </Column>
            <Column style={statColumn}>
              <Text style={statNumber}>7</Text>
              <Text style={statLabel}>Districts Served</Text>
            </Column>
            <Column style={statColumn}>
              <Text style={statNumber}>500+</Text>
              <Text style={statLabel}>Women Empowered</Text>
            </Column>
          </Row>
        </Section>

        {/* Call to Action */}
        <Section style={ctaSection}>
          <Heading style={ctaHeading}>Support Our Mission</Heading>
          <Text style={ctaText}>
            Your support helps us continue our work in empowering communities in
            Rwanda. Join us in making a difference today!
          </Text>
          <div style={ctaButtonWrapper}>
            <Button style={ctaButton} href="https://hezain.org/donate">
              Donate Now
            </Button>
          </div>
        </Section>

        {/* Social Media Section */}
        <Section style={socialSection}>
          <Heading style={socialHeading}>Connect With Us</Heading>
          <table style={socialTable}>
            <tr>
              <td style={socialTableCell}>
                <Link href="https://www.hezain.org" style={socialLink}>
                  <Img
                    src="https://cdn-icons-png.flaticon.com/512/1006/1006771.png"
                    width="26"
                    height="26"
                    alt="Website"
                    style={socialIcon}
                  />
                </Link>
                <Link
                  href="https://twitter.com/hezainitiatives"
                  style={socialLink}
                >
                  <Img
                    src="https://cdn-icons-png.flaticon.com/512/3670/3670151.png"
                    width="26"
                    height="26"
                    alt="Twitter"
                    style={socialIcon}
                  />
                </Link>
                <Link
                  href="https://instagram.com/hezainitiative"
                  style={socialLink}
                >
                  <Img
                    src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png"
                    width="26"
                    height="26"
                    alt="Instagram"
                    style={socialIcon}
                  />
                </Link>
                <Link
                  href="https://www.linkedin.com/company/heza-initiative"
                  style={socialLink}
                >
                  <Img
                    src="https://cdn-icons-png.flaticon.com/512/3536/3536505.png"
                    width="26"
                    height="26"
                    alt="LinkedIn"
                    style={socialIcon}
                  />
                </Link>
                <Link
                  href="https://youtube.com/@hezainitiative"
                  style={socialLink}
                >
                  <Img
                    src="https://cdn-icons-png.flaticon.com/512/3670/3670147.png"
                    width="26"
                    height="26"
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
          <Img
            src="https://hezain.org/org/logo-landscape.jpg"
            alt="Ishimwe Jean Baptiste Logo"
            width="120"
            height="auto"
            style={footerLogo}
          />
          <Text style={footerTagline}>
            Building Healthier Communities Together
          </Text>
          <Text style={footerText}>
            Ishimwe Jean Baptiste | Rulindo, Northern Province, Rwanda
          </Text>
          <Text style={footerText}>
            Phone: +250788977568 | Email:{" "}
            <Link href="mailto:hezainitiative@gmail.com" style={footerLink}>
              hezainitiative@gmail.com
            </Link>
          </Text>
          <Text style={footerText}>
            <Link href="https://hezain.org" style={footerLink}>
              www.hezain.org
            </Link>
          </Text>
          <Hr style={footerDivider} />
          <Text style={unsubscribeText}>
            You&apos;re receiving this email because you subscribed to our
            newsletter.
            <br />
            <Link href={unsubscribeUrl} style={unsubscribeLink}>
              Unsubscribe
            </Link>{" "}
            |{" "}
            <Link href={viewInBrowserUrl} style={unsubscribeLink}>
              View in browser
            </Link>
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default NewsletterTemplate;

// Main styles
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

// View in browser section
const viewInBrowserSection = {
  backgroundColor: "#f8f9fa",
  padding: "8px 20px",
  textAlign: "center" as const,
};

const viewInBrowserLink = {
  color: "#666666",
  fontSize: "12px",
  textDecoration: "underline",
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

// Ribbon section
const ribbonSection = {
  width: "100%",
  margin: "0 0 -1px 0",
  padding: "0",
};

// Date banner styles
const dateBanner = {
  backgroundColor: "#11922f",
  padding: "10px 20px",
  textAlign: "center" as const,
};

const dateText = {
  color: "#ffffff",
  margin: "0",
  fontSize: "14px",
  fontWeight: "bold",
};

// Content section styles
const contentSection = {
  padding: "30px 40px",
};

const heading = {
  fontSize: "26px",
  fontWeight: "bold",
  color: "#11922f",
  margin: "0 0 20px",
  textAlign: "center" as const,
};

// Featured story section
const featuredStorySection = {
  backgroundColor: "#f0f9f1",
  padding: "30px 40px",
  borderTop: "1px solid #e6ebf1",
  borderBottom: "1px solid #e6ebf1",
};

const featuredStoryHeading = {
  fontSize: "22px",
  fontWeight: "bold",
  color: "#00753c",
  margin: "0 0 20px",
  textAlign: "center" as const,
};

const featuredStoryImage = {
  borderRadius: "8px",
  width: "100%",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
};

const featuredStoryTitle = {
  fontSize: "18px",
  fontWeight: "bold",
  color: "#333333",
  margin: "0 0 10px",
};

const featuredStoryText = {
  fontSize: "15px",
  lineHeight: "1.6",
  color: "#555555",
  margin: "0 0 15px",
};

const readMoreButtonWrapper = {
  textAlign: "left" as const,
  marginTop: "15px",
};

const readMoreButton = {
  backgroundColor: "#00753c",
  color: "#ffffff",
  padding: "10px 20px",
  borderRadius: "6px",
  fontSize: "14px",
  fontWeight: "600",
  textDecoration: "none",
  display: "inline-block",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
};

// Impact stats section
const impactStatsSection = {
  backgroundColor: "#ffffff",
  padding: "40px 20px",
  textAlign: "center" as const,
};

const impactHeading = {
  fontSize: "22px",
  fontWeight: "bold",
  color: "#11922f",
  margin: "0 0 30px",
  textAlign: "center" as const,
};

const statColumn = {
  padding: "0 10px",
  width: "33.33%",
  textAlign: "center" as const,
};

const statNumber = {
  fontSize: "32px",
  fontWeight: "bold",
  color: "#1CABE2",
  margin: "0 0 5px",
};

const statLabel = {
  fontSize: "14px",
  color: "#555555",
  margin: "0",
  fontWeight: "500",
};

// CTA section styles
const ctaSection = {
  backgroundColor: "#11922f",
  backgroundImage: "linear-gradient(135deg, #11922f 0%, #00753c 100%)",
  padding: "40px 20px",
  textAlign: "center" as const,
};

const ctaHeading = {
  fontSize: "24px",
  fontWeight: "bold",
  color: "#ffffff",
  margin: "0 0 15px",
};

const ctaText = {
  fontSize: "16px",
  color: "#ffffff",
  margin: "0 0 25px",
  lineHeight: "1.5",
};

const ctaButtonWrapper = {
  textAlign: "center" as const,
};

const ctaButton = {
  backgroundColor: "#ffffff",
  color: "#11922f",
  padding: "12px 30px",
  borderRadius: "6px",
  fontWeight: "bold",
  fontSize: "16px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
};

// Social media section styles
const socialSection = {
  backgroundColor: "#f8f9fa",
  padding: "30px 20px",
  textAlign: "center" as const,
  borderTop: "1px solid #e6ebf1",
};

const socialHeading = {
  fontSize: "18px",
  fontWeight: "bold",
  color: "#333333",
  margin: "0 0 20px",
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
  padding: "6px",
  backgroundColor: "#ffffff",
  border: "1px solid #e6ebf1",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
};

// Footer styles
const footer = {
  backgroundColor: "#333333",
  color: "#ffffff",
  padding: "40px 20px 30px",
  textAlign: "center" as const,
};

const footerLogo = {
  margin: "0 auto 15px",
};

const footerTagline = {
  color: "#1CABE2",
  fontSize: "16px",
  fontWeight: "600",
  margin: "0 0 20px",
};

const footerText = {
  fontSize: "14px",
  color: "#ffffff",
  margin: "0 0 10px",
};

const footerLink = {
  color: "#1CABE2",
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
  lineHeight: "1.5",
};

const unsubscribeLink = {
  color: "#aaaaaa",
  textDecoration: "underline",
};
