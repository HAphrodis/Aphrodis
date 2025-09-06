"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  AlertCircle,
  Send,
  Loader,
  Mail,
  User,
} from "lucide-react";

interface SubscribeFormProps {
  initialEmail: string;
}

export function SubscribeForm({ initialEmail }: SubscribeFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState(initialEmail);
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      if (!validateEmail()) {
        setIsLoading(false);
        return;
      }

      const response = await fetch("/api/subscriber/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          name: name || null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to subscribe");
      }

      setSuccess(true);

      // Redirect to success page after a short delay
      setTimeout(() => {
        router.push("/subscribe/success");
      }, 2000);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const validateEmail = () => {
    if (!email) {
      setError("Email is required");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return false;
    }

    setError("");
    return true;
  };

  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-lg">
      <AnimatePresence mode="wait">
        {!success ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="mb-1 block text-sm font-medium text-gray-700"
                  >
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-md border border-gray-300 px-4 py-2 pl-10 transition-colors focus:border-[#11922f] focus:ring-[#11922f]"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="name"
                    className="mb-1 block text-sm font-medium text-gray-700"
                  >
                    Your Name (Optional)
                  </label>
                  <div className="relative">
                    <User className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-md border border-gray-300 px-4 py-2 pl-10 transition-colors focus:border-[#11922f] focus:ring-[#11922f]"
                      placeholder="John Doe"
                    />
                  </div>
                </div>

                {error && (
                  <div className="rounded border-l-4 border-red-500 bg-red-50 p-4">
                    <div className="flex items-center">
                      <AlertCircle className="mr-2 h-5 w-5 text-red-500" />
                      <p className="text-sm text-red-700">{error}</p>
                    </div>
                  </div>
                )}

                <div className="pt-4">
                  <button
                    type="submit"
                    className="flex w-full items-center justify-center rounded-md bg-[#11922f] px-6 py-3 text-white transition-colors hover:bg-[#00753c]"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader className="mr-2 h-5 w-5 animate-spin" />
                        Subscribing...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-5 w-5" />
                        Subscribe to Newsletter
                      </>
                    )}
                  </button>
                </div>

                <p className="mt-4 text-center text-xs text-gray-500">
                  By subscribing, you agree to receive our newsletter emails.
                  You can unsubscribe at any time. We respect your privacy and
                  will never share your information with third parties.
                </p>
              </form>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="px-6 py-8 text-center"
          >
            <div className="mb-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#11922f]/10 p-4"
              >
                <CheckCircle2 className="h-10 w-10 text-[#11922f]" />
              </motion.div>
            </div>

            <h2 className="mb-2 text-2xl font-bold text-gray-800">
              Thank You for Subscribing!
            </h2>

            <p className="mb-6 text-gray-600">
              You&apos;ve successfully subscribed to the Ishimwe Jean Baptiste
              newsletter. Check your inbox soon for updates and news about our
              programs.
            </p>

            <div className="animate-pulse">
              <p className="text-sm text-gray-500">
                Redirecting to confirmation page...
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
