"use client";

import { useState, useEffect } from "react";
import { ChevronsUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVisible && (
        <Button
          onClick={scrollToTop}
          className="bg-primary fixed right-8 bottom-8 z-50 rounded-full p-3 text-white shadow-lg transition-all duration-300 hover:bg-secondary"
          aria-label="Back to top"
        >
          <ChevronsUp className="h-6 w-6" />
        </Button>
      )}
    </>
  );
}
