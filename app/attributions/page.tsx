// app\attributions\page.tsx
"use client";

import type React from "react";

import { motion } from "framer-motion";
import { MouseLight } from "@/components/shared/mouse-light";
import { ExternalLink } from "lucide-react";
import { useRef } from "react";
import { ParticlesBackground } from "@/components/shared/particles-background";
import PageHeader from "@/components/shared/page-header";

const GlowingText = ({ children }: { children: React.ReactNode }) => (
  <span className="relative">
    <span className="absolute -inset-1 blur-sm bg-emerald-400/30 rounded-lg"></span>
    <span className="relative text-emerald-400">{children}</span>
  </span>
);

const AnimatedLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 transition-colors"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    {children} <ExternalLink className="h-4 w-4" />
  </motion.a>
);

export default function AttributionPage() {
  const containerRef = useRef(null);

  return (
    <div
      className="relative min-h-screen bg-[#002922] overflow-hidden"
      ref={containerRef}
    >
      <MouseLight />
      <ParticlesBackground />

      <PageHeader
        title="Attributions"
        highlightedTitle="Page"
        subtitle="The journey and inspirations behind this website."
      />

      <div className=" top-0 z-[-2]  w-screen  bg-[radial-gradient(#ffffff49_1px,transparent_1px)] bg-[size:40px_40px]">
        <div className="relative mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-16"
          >
            {/* Content */}
            <div className="space-y-8  leading-relaxed text-white/80">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Welcome to the behind-the-scenes of my{" "}
                <GlowingText>digital space</GlowingText>! This website is a
                culmination of inspiration, learning, and creativity.
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                The journey began with a passion for web development and a
                desire to showcase my work. As I evolved as a developer, so did
                this website. It&apos;s built using modern web technologies,
                with <GlowingText>Next.js</GlowingText> at its core, styled with{" "}
                <GlowingText>Tailwind CSS</GlowingText>, and brought to life
                with <GlowingText>Framer Motion</GlowingText> animations.
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="space-y-4"
              >
                <p>
                  I&apos;d like to express my gratitude to the following
                  creators and their amazing portfolios that inspired various
                  aspects of this website:
                </p>
                <ul className="ml-6 list-disc space-y-2">
                  <li>
                    <AnimatedLink href="https://magicui.design/docs/templates/portfolio">
                      MagicUI
                    </AnimatedLink>{" "}
                    for their stunning UI components and templates that
                    influenced my design choices.
                  </li>
                  <li>
                    <AnimatedLink href="https://magic-portfolio.com/">
                      Magic Portfolio
                    </AnimatedLink>{" "}
                    for showcasing creative ways to present projects and skills.
                  </li>
                  <li>
                    <AnimatedLink href="https://theodorusclarence.com/">
                      Theodorus Clarence
                    </AnimatedLink>{" "}
                    whose clean and modern developer portfolio inspired the
                    overall structure.
                  </li>
                  <li>
                    <AnimatedLink href="https://www.bharatkara.com">
                      Bharat Kara
                    </AnimatedLink>{" "}
                    for innovative design elements and smooth interactions that
                    influenced my UI.
                  </li>
                  <li>
                    <AnimatedLink href="https://aayushbharti.in/">
                      Aayush Bharti
                    </AnimatedLink>{" "}
                    whose unique layout and visual style inspired some of my
                    creative decisions.
                  </li>
                </ul>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
              >
                The <GlowingText>emerald theme</GlowingText> and subtle
                animations were carefully chosen to create a unique and
                memorable experience. I aimed to balance aesthetics with
                functionality, ensuring that the site not only looks good but
                also performs well and is accessible to all users.
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                As I continue to grow as a developer, this website will evolve
                too. It&apos;s not just a portfolio, but a testament to my
                journey in web development. I&apos;m always open to feedback and
                new ideas, so feel free to reach out if you have any suggestions
                or just want to connect!
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1 }}
                className="mt-12 text-center"
              ></motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
