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
import { toast } from "sonner";

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

      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          name: name || null,
        }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        if (response.status === 429) {
          toast.error("Too many attempts", {
            description: responseData.error || "Please try again later.",
            duration: 5000,
          });
          return;
        }

        if (response.status === 409) {
          toast.error("Already subscribed", {
            description: "This email is already subscribed to my newsletter.",
            duration: 5000,
          });
          return;
        }

        throw new Error(
          responseData.error || "Failed to subscribe. Please try again.",
        );
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
    <div className="overflow-hidden z-50 overflow-y-auto rounded-xl rounded-t-xl border border-emerald-500/20 bg-white/95 p-0 text-gray-700 shadow-lg backdrop-blur-2xl md:p-6">
      <AnimatePresence mode="wait">
        {!success ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}>
            <div className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="mb-1 block text-sm font-medium text-[#04877F]">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-[#04877F]" />
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="focus:ring-opacity-50 w-full rounded-md border border-[#04877F]/50 bg-transparent px-4 py-2 pl-10 text-gray-700 ring-0 transition-colors placeholder:text-gray-700 focus:border-[#04877F] focus:ring-[#10b981] focus:outline-none"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="name"
                    className="mb-1 block text-sm font-medium text-[#04877F]">
                    Your Name (Optional)
                  </label>
                  <div className="relative">
                    <User className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-[#04877F]" />
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="focus:ring-opacity-50 w-full rounded-md border border-[#04877F]/50 bg-transparent px-4 py-2 pl-10 text-gray-700 ring-0 transition-colors placeholder:text-gray-700 focus:border-[#04877F] focus:ring-[#10b981] focus:outline-none"
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

                <div className="pt-2">
                  <button
                    type="submit"
                    className="flex w-full items-center justify-center rounded-md bg-[#04877F] px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-[#04877F]/80 focus:ring-2 focus:ring-[#04877F] focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                    disabled={isLoading}>
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

                <p className="mt-4 text-center text-xs text-gray-700">
                  By subscribing, you agree to receive my newsletter emails. You
                  can unsubscribe at any time. I respect your privacy and will
                  never share your information with third parties.
                </p>
              </form>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="px-6 py-8 text-center">
            <div className="mb-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  delay: 0.2,
                  type: "spring" as const,
                  stiffness: 200,
                }}
                className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#10b981]/10 p-4">
                <CheckCircle2 className="h-10 w-10 text-[#10b981]" />
              </motion.div>
            </div>

            <h2 className="mb-2 text-2xl font-bold text-gray-800">
              Thank You for Subscribing!
            </h2>

            <p className="mb-6 text-gray-700">
              You&apos;ve successfully subscribed to the Aphrodis
              newsletter. Check your inbox soon for updates and news about our
              programs.
            </p>

            <div className="animate-pulse">
              <p className="text-sm text-gray-700">
                Redirecting to confirmation page...
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
