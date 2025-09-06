import type { Metadata } from "next";

export const siteMetadata: Metadata = {
  metadataBase: new URL("https://www.aphrodis.me"),
  title: {
    default: "Aphrodis | Full Stack Developer",
    template: "%s | HAphrodis Portfolio",
  },
  description:
    "Full Stack Developer specializing in React, Next.js, Node.js, and modern web technologies. Building scalable applications and exceptional user experiences.",
  applicationName: "HAphrodis Portfolio",
  authors: [
    {
      name: "Hakuzweyezu Aphrodis",
      url: "https://www.aphrodis.me",
    },
  ],
  generator: "Next.js",
  keywords: [
    "Hakuzweyezu Aphrodis",
    "Full Stack Developer",
    "React Developer",
    "Next.js Developer",
    "Node.js Developer",
    "JavaScript Developer",
    "TypeScript Developer",
    "Frontend Developer",
    "Backend Developer",
    "Web Developer",
    "Software Engineer",
    "MongoDB",
    "PostgreSQL",
    "GraphQL",
    "TailwindCSS",
    "Express.js",
    "Kigali Rwanda",
    "Environmental Health Practitioner",
    "Public Health Enthusiast",
    "Researcher",
    "Research Analyst",
    "Tech Enthusiast",
    "Open Source Contributor",
    "Freelance Developer",
    "PSVF Scholar",
  ],
  referrer: "origin-when-cross-origin",
  creator: "Hakuzweyezu Aphrodis",
  publisher: "Hakuzweyezu Aphrodis",
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://www.aphrodis.me",
    languages: {
      "en-US": "https://www.aphrodis.me",
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-96x96.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
  twitter: {
    card: "summary_large_image",
    site: "@HAphrodis",
    creator: "@HAphrodis",
    title: "Hakuzweyezu Aphrodis | Full Stack Developer",
    description:
      "Full Stack Developer specializing in React, Next.js, Node.js, and modern web technologies. Building scalable applications and exceptional user experiences.",
    images: ["https://www.aphrodis.me/screenshot.jpg"],
  },
  openGraph: {
    title: "Hakuzweyezu Aphrodis | Full Stack Developer",
    description:
      "Full Stack Developer specializing in React, Next.js, Node.js, and modern web technologies. Building scalable applications and exceptional user experiences.",
    url: "https://www.aphrodis.me",
    siteName: "aphrodis Portfolio",
    images: [
      {
        url: "https://www.aphrodis.me/screenshot.jpg",
        width: 1200,
        height: 630,
        alt: "Hakuzweyezu Aphrodis - Full Stack Developer Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
    countryName: "Rwanda",
    emails: ["hakuzweaphossy@gmail.com"],
    phoneNumbers: ["+250784343073"],
  },
  appleWebApp: {
    capable: true,
    title: "aphrodis Portfolio",
    statusBarStyle: "black-translucent",
  },
  formatDetection: {
    telephone: true,
    date: true,
    address: true,
    email: true,
    url: true,
  },
  category: "Technology & Software Development",
  classification:
    "Full Stack Development, Web Development, Software Engineering",
  abstract:
    "Portfolio of Hakuzweyezu Aphrodis, a Full Stack Developer from Rwanda specializing in modern web technologies including React, Next.js, Node.js, and database systems.",
  other: {
    "theme-color": "#111827",
  },
};
