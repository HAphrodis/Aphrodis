"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { MouseLight } from "@/components/shared/mouse-light";
import { ParticlesBackground } from "@/components/shared/particles-background";
import PageHeader from "@/components/shared/page-header";

export default function GuestbookPage() {
  // Initialize Giscus when component mounts
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.setAttribute("data-repo", "hbapte/portfolio-discussion");
    script.setAttribute("data-repo-id", "R_kgDONtZraQ");
    script.setAttribute("data-category", "General");
    script.setAttribute("data-category-id", "DIC_kwDONtZrac4CmNL7");
    script.setAttribute("data-mapping", "pathname");
    script.setAttribute("data-strict", "0");
    script.setAttribute("data-reactions-enabled", "0");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "top");
    script.setAttribute("data-theme", "catppuccin_frappe");
    script.setAttribute("data-lang", "en");
    script.crossOrigin = "anonymous";
    script.async = true;

    const comments = document.getElementById("giscus-comments");
    if (comments) comments.appendChild(script);

    return () => {
      const comments = document.getElementById("giscus-comments");
      if (comments) comments.innerHTML = "";
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#002922]">
      <MouseLight />

      <PageHeader
        title="Guest"
        highlightedTitle="Book"
        subtitle="Leave whatever you like to say—message, appreciation, suggestions."
      />
      <div className="   w-screen  bg-[radial-gradient(#ffffff33_1px,transparent_1px)]  bg-[size:20px_20px]">
        <div className="mx-auto max-w-4xl px-4 py-24 sm:px-6 lg:px-8">
          <ParticlesBackground />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xs">
              {/* Giscus Comments Section */}
              <div id="giscus-comments" className="giscus-frame" />
            </div>

            <div className="text-center text-sm text-white/40">
              <p>
                For questions, you can leave them on the{" "}
                <a
                  href="#"
                  className="text-emerald-400/80 hover:text-emerald-400"
                >
                  AMA discussion
                </a>{" "}
                or email me at{" "}
                <a
                  href="mailto:ijbapte@gmail.com"
                  className="text-emerald-400/80 hover:text-emerald-400"
                >
                  ijbapte@gmail.com
                </a>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
