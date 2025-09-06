"use client";

import type React from "react";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, X } from "lucide-react";

export default function NewsletterSubscription() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send this to your backend
    alert(`Subscribed with email: ${email}`);
    setEmail("");
    setIsOpen(false);
  };

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 left-8 z-50"
      >
        <Button
          onClick={() => setIsOpen(true)}
          className="bg-emerald-500 hover:bg-emerald-400 text-[#002922]"
        >
          <Mail className="h-5 w-5 mr-2" />
          Subscribe
        </Button>
      </motion.div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <div className="bg-[#002922] p-8 rounded-lg w-96 relative">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="absolute top-2 right-2 text-emerald-300 hover:text-emerald-100"
              >
                <X className="h-5 w-5" />
              </Button>
              <h2 className="text-2xl font-bold mb-4 text-emerald-300">
                Subscribe to Our Newsletter
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full p-2 bg-emerald-700 text-white placeholder-emerald-300 border-emerald-600 focus:border-emerald-400"
                />
                <Button
                  type="submit"
                  className="w-full bg-emerald-500 hover:bg-emerald-400 text-[#002922]"
                >
                  Subscribe
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
