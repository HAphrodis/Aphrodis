"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaXTwitter,
  FaFacebook,
  FaWhatsapp,
  FaLinkedinIn,
} from "react-icons/fa6";
import { Share2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ShareButtonsProps {
  url: string;
  title: string;
  description?: string;
}

export function ShareButtons({
  url = typeof window !== "undefined" ? window.location.href : "",
  title = "Check out this post",
}: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const shareLinks = [
    {
      icon: FaXTwitter,
      label: "Twitter",
      onClick: () => {
        window.open(
          `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
          "_blank",
        );
      },
      className: "text-[#1DA1F2] hover:opacity-80",
    },
    {
      icon: FaFacebook,
      label: "Facebook",
      onClick: () => {
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
          "_blank",
        );
      },
      className: "text-[#4267B2] hover:opacity-80",
    },
    {
      icon: FaWhatsapp,
      label: "WhatsApp",
      onClick: () => {
        window.open(
          `https://api.whatsapp.com/send?text=${encodeURIComponent(title + " " + url)}`,
          "_blank",
        );
      },
      className: "text-[#25D366] hover:opacity-80",
    },
    {
      icon: FaLinkedinIn,
      label: "LinkedIn",
      onClick: () => {
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
          "_blank",
        );
      },
      className: "text-[#0077B5] hover:opacity-80",
    },
  ];

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          url,
        });
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      copyToClipboard();
    }
  };

  return (
    <TooltipProvider>
      <div className="ml-12 space-y-4 pt-2 sm:ml-0 sm:pt-0">
        <div className="flex items-center gap-4">
          <span className="text-sm text-white">Share:</span>
          <div className="flex items-center gap-3">
            {shareLinks.map((link, index) => (
              <Tooltip key={index}>
                <TooltipTrigger asChild>
                  <button
                    onClick={link.onClick}
                    className={`${link.className} transition-opacity`}
                    aria-label={`Share on ${link.label}`}
                  >
                    <link.icon className="h-5 w-5" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Share on {link.label}</p>
                </TooltipContent>
              </Tooltip>
            ))}
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={handleShare}
                  className="text-white transition-opacity hover:opacity-80"
                  aria-label="Share via..."
                >
                  <Share2 className="h-5 w-5" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  {typeof navigator.share !== "undefined"
                    ? "Share via..."
                    : "Copy link"}
                </p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
        <AnimatePresence>
          {copied && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 rounded bg-black px-2 py-1 text-sm text-white"
            >
              Copied!
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </TooltipProvider>
  );
}
