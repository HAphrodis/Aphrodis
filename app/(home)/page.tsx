"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "@/components/common/footer";
import ContactSection from "@/components/ContactSection";
import { FloatingNavbar } from "@/components/common/navbar";
import ProjectSection from "@/components/work/Project-section";
import AboutSection from "@/components/about/AboutSection";
import ScrollToTop from "@/components/common/scroll-to-top";
import PageLoader from "@/components/common/page-loader";
import { MouseLight } from "@/components/shared/mouse-light";
import Hero from "@/components/Homepage";

const CONTENT_VARIANTS = {
  hidden: {
    y: 50,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 30,
      staggerChildren: 0.1,
    },
  },
};

const SECTION_VARIANTS = {
  hidden: {
    y: 30,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export default function Page() {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    setTimeout(() => setShowContent(true), 300);
  };

  // Prevent scrolling during loading
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isLoading]);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <PageLoader key="loader" onComplete={handleLoadingComplete} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showContent && (
          <motion.main
            key="content"
            variants={CONTENT_VARIANTS}
            initial="hidden"
            animate="visible"
            className="min-h-screen"
          >
            <MouseLight />
            <FloatingNavbar />

            <motion.div variants={SECTION_VARIANTS}>
              <Hero /> 
            </motion.div> 

            <motion.div variants={SECTION_VARIANTS}>
              <AboutSection /> 
            </motion.div> 

            <motion.div variants={SECTION_VARIANTS}>
              <ProjectSection /> 
            </motion.div> 

            {/* <motion.div variants={SECTION_VARIANTS}>
              <BlogSection />
            </motion.div> */}

            <motion.div variants={SECTION_VARIANTS}>
              <ContactSection />
            </motion.div>

            <ScrollToTop />
            <Footer />
          </motion.main>
        )}
      </AnimatePresence>
    </>
  );
}
