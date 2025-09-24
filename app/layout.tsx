// app/layout.tsx
import type React from "react";
import type { Metadata } from "next";
import "@/styles/globals.css";
import { Chelsea_Market } from "next/font/google";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { ViewTransitions } from "next-view-transitions";
import { Toaster } from "sonner";
import { siteMetadata } from "./siteMetadata";
import { jsonLd } from "./json-ld";
import ClientLayout from "./clientLayout";
import Script from "next/script"; // ✅ import Script

// Load Chelsea Market font
const chelseaMarket = Chelsea_Market({
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = siteMetadata;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ViewTransitions>
      <html lang="en">
        <head>
          {/* JSON-LD */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
            }}
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
          />
        </head>
        <body
          className={`${chelseaMarket.className} antialiased [&::-webkit-scrollbar]:w-1.5  
            [&::-webkit-scrollbar-track]:bg-[#002922] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-emerald-600
            dark:[&::-webkit-scrollbar-track]:bg-emerald-700 dark:[&::-webkit-scrollbar-thumb]:bg-[#002922]`}
        >
          {/* ✅ Google Analytics Script */}
          <Script
            src="https://www.googletagmanager.com/gtag/js?id=G-LP9WN8CTNQ"
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-LP9WN8CTNQ');
            `}
          </Script>

          <ThemeProvider>
            <Toaster richColors closeButton />
            <ClientLayout>{children}</ClientLayout>
          </ThemeProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
