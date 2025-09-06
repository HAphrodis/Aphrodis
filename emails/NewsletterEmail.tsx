import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

export interface NewsletterEmailProps {
  newsletter: {
    id: string;
    title: string;
    subject: string;
    content: string;
    previewText: string;
    sentAt: string | null;
  };
  trackingId: string;
}

export const NewsletterEmail = ({
  newsletter,
  trackingId,
}: NewsletterEmailProps) => {
  const baseUrl = process.env.NEXT_PUBLIC_DOMAIN || "https://yourportfolio.com";
  const trackingPixel = `${baseUrl}/api/newsletter/track?id=${trackingId}&type=open`;

  // Function to add tracking to links
  const addTracking = (content: string): string => {
    // Replace all links with tracking links
    return content.replace(
      /<a\s+(?:[^>]*?\s+)?href=(["'])(.*?)\1/g,
      `<a href="$1${baseUrl}/api/newsletter/track?id=${trackingId}&type=click&target=$2$1`,
    );
  };

  return (
    <Html>
      <Head />
      <Preview>{newsletter.previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>{newsletter.title}</Heading>

          <Section
            style={content}
            dangerouslySetInnerHTML={{
              __html: addTracking(newsletter.content),
            }}
          />

          <Section style={footer}>
            <Text style={footerText}>
              You&apos;re receiving this email because you subscribed to my
              newsletter.
            </Text>
            <Text style={footerText}>
              <Link
                href={`${baseUrl}/unsubscribe?email={{email}}`}
                style={link}
              >
                Unsubscribe
              </Link>{" "}
              •{" "}
              <Link
                href={`${baseUrl}/newsletter/${newsletter.id}`}
                style={link}
              >
                View in browser
              </Link>
            </Text>
          </Section>

          {/* Tracking pixel */}
          <Img
            src={trackingPixel}
            width="1"
            height="1"
            alt=""
            style={{ display: "none" }}
          />
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

const heading = {
  fontSize: "24px",
  letterSpacing: "-0.5px",
  lineHeight: "1.3",
  fontWeight: "700",
  color: "#3b82f6",
  textAlign: "center" as const,
  padding: "0 0 20px",
};

const content = {
  margin: "0 0 32px",
  lineHeight: "1.5",
  color: "#3c4149",
};

const footer = {
  borderTop: "1px solid #e2e8f0",
  paddingTop: "20px",
};

const footerText = {
  fontSize: "12px",
  lineHeight: "1.5",
  color: "#64748b",
  textAlign: "center" as const,
  margin: "4px 0",
};

const link = {
  color: "#3b82f6",
  textDecoration: "underline",
};

export default NewsletterEmail;
