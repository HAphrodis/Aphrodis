"use client";

import { useState, useEffect } from "react";

export function useReadingProgress() {
  const [completion, setCompletion] = useState(0);

  useEffect(() => {
    function updateScrollCompletion() {
      // Get the total scrollable height
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      // If there's nothing to scroll, we're at 100%
      if (scrollHeight <= 0) {
        setCompletion(100);
        return;
      }

      // Calculate the percentage scrolled
      const scrollTop = window.scrollY;
      const currentProgress = (scrollTop / scrollHeight) * 100;

      // Update state
      setCompletion(Math.min(100, Math.max(0, currentProgress)));
    }

    // Set initial value
    updateScrollCompletion();

    // Add scroll event listener
    window.addEventListener("scroll", updateScrollCompletion);

    // Clean up
    return () => window.removeEventListener("scroll", updateScrollCompletion);
  }, []);

  return completion;
}
