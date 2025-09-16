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

interface SubscribeConfirmationProps {
  email: string;
}

export const SubscribeConfirmationEmail = ({
  email,
}: SubscribeConfirmationProps) => {
  const baseUrl = "https://www.aphrodis.online";
  // const currentYear = new Date().getFullYear()

  return (
    <Html>
      <Head />
      <Preview>
        Welcome to my newsletter! Stay updated with my latest projects and
        articles.
      </Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header with logo */}
          <Section style={headerSection}>
            <Img
              src={`${baseUrl}/images/aphro.jpg`}
              alt="Portfolio Logo"
              width="120"
              height="120"
              style={logo}
            />
          </Section>

          {/* Welcome Banner */}
          <Section style={welcomeBanner}>
            <Heading style={bannerHeading}>Welcome to My Newsletter!</Heading>
            <Text style={bannerText}>
              Thank you for subscribing to my portfolio updates
            </Text>
          </Section>

          {/* Main Content */}
          <Section style={contentSection}>
            <Text style={greeting}>Hello there,</Text>

            <Text style={text}>
              Thank you for subscribing to my newsletter! I&apos;m excited to
              have you join my community of readers and followers. You&apos;ll
              now receive updates on my latest projects, articles, and resources
              directly to your inbox.
            </Text>

            <Text style={subheading}>
              <strong>What you can expect:</strong>
            </Text>

            <Row style={featureRow}>
              <Column style={featureColumn}>
                <Text style={featureIcon}>📝</Text>
                <Text style={featureTitle}>Articles</Text>
                <Text style={featureText}>
                  In-depth technical articles and tutorials
                </Text>
              </Column>
              <Column style={featureColumn}>
                <Text style={featureIcon}>💻</Text>
                <Text style={featureTitle}>Projects</Text>
                <Text style={featureText}>
                  Updates on my latest portfolio projects
                </Text>
              </Column>
              {/* <Column style={featureColumn}>
                <Text style={featureIcon}>🔧</Text>
                <Text style={featureTitle}>Resources</Text>
                <Text style={featureText}>
                  Useful tools and resources for developers
                </Text>
              </Column> */}
            </Row>

            <Section style={ctaSection}>
              <Button style={ctaButton} href={`${baseUrl}/projects`}>
                Explore My Projects
              </Button>
            </Section>

            <Hr style={divider} />

            {/* About Section */}
            <Heading style={sectionHeading}>About Me</Heading>
            <Text style={text}>
              I&apos;m a passionate full-stack developer focused on creating
              innovative web solutions. My portfolio showcases projects built
              with modern technologies and best practices in web development.
            </Text>

            <Section style={imageSection}>
              <Img
                src={`${baseUrl}/images/portfolio-preview.jpg`}
                alt="Portfolio Preview"
                width="100%"
                height="auto"
                style={contentImage}
              />
            </Section>

            <Section style={ctaSection}>
              <Button style={secondaryButton} href={`${baseUrl}/about`}>
                Learn More About Me
              </Button>
            </Section>
          </Section>

          {/* Social Media */}
          <Section style={socialSection}>
            <Text style={socialHeading}>Connect with me:</Text>
            <table style={socialTable}>
              <tr>
                <td style={socialTableCell}>
                  <Link href={`${baseUrl}`} style={socialLink}>
                    <Img
                      src={`${baseUrl}/icons/globe.png`}
                      width="25"
                      height="25"
                      alt="Website"
                      style={socialIcon}
                    />
                  </Link>
                  <Link href="https://x.com/Aphossy1" style={socialLink}>
                    <Img
                      src={`${baseUrl}/icons/twitter.png`}
                      width="25"
                      height="25"
                      alt="Twitter"
                      style={socialIcon}
                    />
                  </Link>
                  <Link href="https://github.com/Haphrodis" style={socialLink}>
                    <Img
                      src={`${baseUrl}/icons/github.png`}
                      width="25"
                      height="25"
                      alt="GitHub"
                      style={socialIcon}
                    />
                  </Link>
                  <Link
                    href="www.linkedin.com/in/aphrodis-hakuzweyezu-675677304"
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
                </td>
              </tr>
            </table>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              Aphrodis Hakuzweyezu
            </Text>
            <Text style={footerText}>
              Email:{" "}
              <Link href="mailto:possowiba01@gmail.com" style={footerLink}>
                possowiba01@gmail.com
              </Link>
            </Text>
            <Text style={footerText}>
              <Link href={baseUrl} style={footerLink}>
                {baseUrl}
              </Link>
            </Text>
            <Hr style={footerDivider} />
            <Text style={unsubscribeText}>
              You&apos;re receiving this email because you subscribed to my
              newsletter.
              <br />
              <Link
                href={`${baseUrl}/unsubscribe?email=${encodeURIComponent(email)}`}
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

export default SubscribeConfirmationEmail;

// Styles
const main = {
  backgroundColor: "#0a0f16",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
  padding: "20px 0",
};

const container = {
  backgroundColor: "#0f172a",
  margin: "0 auto",
  maxWidth: "600px",
  borderRadius: "8px",
  overflow: "hidden",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  border: "1px solid #1e293b",
};

const headerSection = {
  padding: "24px 0",
  textAlign: "center" as const,
  backgroundColor: "#0f172a",
  borderBottom: "1px solid #1e293b",
};

const logo = {
  margin: "0 auto",
  borderRadius: "50%",
  objectFit: 'cover' as const,
  width: "120px",
  height: "120px",
  display: "block",
};

const welcomeBanner = {
  backgroundColor: "#10b981",
  backgroundImage: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
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
  backgroundColor: "#0f172a",
};

const greeting = {
  color: "#ffffff",
  fontSize: "18px",
  lineHeight: "26px",
  fontWeight: "bold",
  margin: "0 0 15px",
};

const text = {
  color: "#cbd5e1",
  fontSize: "16px",
  lineHeight: "26px",
  margin: "0 0 20px",
};

const subheading = {
  color: "#10b981",
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
  color: "#10b981",
  margin: "0 0 5px",
};

const featureText = {
  fontSize: "14px",
  color: "#94a3b8",
  margin: "0",
};

const ctaSection = {
  textAlign: "center" as const,
  margin: "30px 0",
};

const ctaButton = {
  backgroundColor: "#10b981",
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
  backgroundColor: "#3b82f6",
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
  borderTop: "1px solid #1e293b",
  margin: "30px 0",
};

const sectionHeading = {
  color: "#10b981",
  fontSize: "22px",
  fontWeight: "bold",
  margin: "0 0 20px",
};

const imageSection = {
  margin: "20px 0",
};

const contentImage = {
  borderRadius: "8px",
  border: "1px solid #1e293b",
};

const socialSection = {
  textAlign: "center" as const,
  backgroundColor: "#0f172a",
  padding: "25px 20px",
  borderTop: "1px solid #1e293b",
};

const socialHeading = {
  color: "#94a3b8",
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
  backgroundColor: "#1e293b",
  border: "1px solid #334155",
};

const footer = {
  textAlign: "center" as const,
  backgroundColor: "#0f172a",
  padding: "30px 20px",
  color: "#ffffff",
  borderTop: "1px solid #1e293b",
};

const footerText = {
  fontSize: "14px",
  color: "#cbd5e1",
  margin: "0 0 10px",
};

const footerLink = {
  color: "#10b981",
  textDecoration: "underline",
};

const footerDivider = {
  borderColor: "#1e293b",
  margin: "20px 0",
};

const unsubscribeText = {
  fontSize: "12px",
  color: "#64748b",
  margin: "0",
};

const unsubscribeLink = {
  color: "#64748b",
  textDecoration: "underline",
};
