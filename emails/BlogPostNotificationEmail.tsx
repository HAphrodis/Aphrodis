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
import * as React from "react";

interface BlogPostNotificationEmailProps {
  title: string;
  excerpt: string;
  slug: string;
  subscriberName?: string;
  featuredPhotoURL: string;
}

export const BlogPostNotificationEmail: React.FC<
  BlogPostNotificationEmailProps
> = ({
  title,
  excerpt,
  slug,
  subscriberName = "Valued Subscriber",
  featuredPhotoURL,
}) => (
  <Html>
    <Head />
    <Preview>New Blog Post: {title}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Img
          src="https://www.hezain.org/org/logo-landscape.jpg"
          alt="Ishimwe Jean Baptiste Logo"
          width="200"
          height="auto"
          style={logo}
        />
        <Heading style={h1}>New Blog Post Published</Heading>
        <Text style={text}>Dear {subscriberName},</Text>
        <Text style={text}>
          We&apos;re excited to share our latest blog post with you:
        </Text>
        <Section style={blogPostSection}>
          <Img
            src={featuredPhotoURL}
            alt={`Featured image for ${title}`}
            width="100%"
            height="auto"
            style={featuredImage}
          />
          <Heading style={h2}>{title}</Heading>
          <Text style={text}>{excerpt}</Text>
          <Link
            href={`${process.env.NEXT_PUBLIC_DOMAIN}/blogs/post/${slug}`}
            style={button}
          >
            Read Full Post
          </Link>
        </Section>
        <Text style={text}>
          Thank you for your continued interest in Ishimwe Jean Baptiste&apos;s
          content.
        </Text>
        <Text style={text}>
          Best regards,
          <br />
          Ishimwe Jean Baptiste Team
        </Text>
        <Section style={footer}>
          <Text style={footerText}>
            Visit our website:{" "}
            <Link href="https://www.hezain.org" style={link}>
              https://www.hezain.org
            </Link>
          </Text>
          <Text style={footerText}>
            Address: Rulindo, Northern Province - Rwanda
          </Text>
          <Text style={footerText}>
            Phone: +250 788 228 265 | Email:{" "}
            <Link href="mailto:hezainitiative@gmail.com" style={link}>
              hezainitiative@gmail.com
            </Link>
          </Text>
          <Text style={footerText}>
            Follow us on:{" "}
            <Link href="https://twitter.com/hezainitiatives" style={link}>
              X/Twitter
            </Link>
            {" | "}
            <Link href="https://instagram.com/hezainitiative" style={link}>
              Instagram
            </Link>
            {" | "}
            <Link
              href="https://www.linkedin.com/company/heza-initiative"
              style={link}
            >
              LinkedIn
            </Link>
            {" | "}
            <Link href="https://youtube.com/@hezainitiative" style={link}>
              YouTube
            </Link>
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default BlogPostNotificationEmail;

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
  maxWidth: "600px",
  borderRadius: "5px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
};

const logo = {
  margin: "0 auto",
  marginBottom: "20px",
  display: "block",
};

const h1 = {
  color: "#0056b3",
  fontSize: "24px",
  fontWeight: "bold",
  textAlign: "center" as const,
  margin: "30px 0",
};

const h2 = {
  color: "#0056b3",
  fontSize: "20px",
  fontWeight: "bold",
  margin: "20px 0",
  padding: "0 20px",
};

const text = {
  color: "#333",
  fontSize: "16px",
  lineHeight: "24px",
  textAlign: "left" as const,
  margin: "16px 0",
  padding: "0 20px",
};

const blogPostSection = {
  backgroundColor: "#f0f4f8",
  padding: "0 0 20px 0",
  borderRadius: "5px",
  margin: "20px 4px",
};

const featuredImage = {
  maxWidth: "100%",
  height: "auto",
  display: "block",
  margin: "0 auto 20px",
  borderRadius: "5px 5px 0 0",
};

const button = {
  backgroundColor: "#0056b3",
  borderRadius: "5px",
  color: "#fff",
  display: "inline-block",
  fontSize: "16px",
  fontWeight: "bold",
  padding: "12px 20px",
  textDecoration: "none",
  textAlign: "center" as const,
  margin: "20px 0 20px 20px",
};

const footer = {
  marginTop: "32px",
  textAlign: "center" as const,
  borderTop: "1px solid #e6ebf1",
  paddingTop: "20px",
};

const footerText = {
  fontSize: "14px",
  color: "#6b7280",
  margin: "8px 0",
};

const link = {
  color: "#0056b3",
  textDecoration: "none",
};
