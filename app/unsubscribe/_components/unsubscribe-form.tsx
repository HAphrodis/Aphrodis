/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Send,
  Loader,
} from "lucide-react";
import Link from "next/link";

interface UnsubscribeFormProps {
  initialEmail: string;
}

export function UnsubscribeForm({ initialEmail }: UnsubscribeFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState(initialEmail);
  const [reason, setReason] = useState("");
  const [customReason, setCustomReason] = useState("");
  const [feedback, setFeedback] = useState("");
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [staySubscribed, setStaySubscribed] = useState(false);

  const reasons = [
    "Too many emails",
    "Content not relevant",
    "I didn't sign up for this",
    "Email design/layout issues",
    "I'm receiving duplicate emails",
    "Other (please specify)",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const selectedReason =
        reason === "Other (please specify)" ? customReason : reason;

      const response = await fetch("/api/subscriber/unsubscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          reason: selectedReason,
          feedback,
          staySubscribed,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to unsubscribe");
      }

      setSuccess(true);
      setStep(3);
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

  const handleNextStep = () => {
    if (step === 1 && validateEmail()) {
      setStep(2);
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleStaySubscribed = async () => {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/subscriber/update-preferences", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          feedback,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update preferences");
      }

      setStaySubscribed(true);
      setSuccess(true);
      setStep(3);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-lg">
      {/* Progress bar */}
      <div className="bg-[#11922f]/10 p-4">
        <div className="h-2.5 w-full rounded-full bg-gray-200">
          <div
            className="h-2.5 rounded-full bg-[#11922f] transition-all duration-500 ease-in-out"
            style={{ width: `${(step / 3) * 100}%` }}
          ></div>
        </div>
        <div className="mt-2 flex justify-between text-sm text-gray-600">
          <span>Email</span>
          <span>Reason</span>
          <span>Confirmation</span>
        </div>
      </div>

      <div className="p-6">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="mb-4 text-xl font-semibold text-gray-800">
                Verify your email address
              </h2>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="mb-1 block text-sm font-medium text-gray-700"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-md border border-gray-300 px-4 py-2 transition-colors focus:border-[#11922f] focus:ring-[#11922f]"
                    placeholder="your@email.com"
                    required
                  />
                </div>

                {error && (
                  <div className="rounded border-l-4 border-red-500 bg-red-50 p-4">
                    <div className="flex items-center">
                      <AlertCircle className="mr-2 h-5 w-5 text-red-500" />
                      <p className="text-sm text-red-700">{error}</p>
                    </div>
                  </div>
                )}

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="flex items-center rounded-md bg-[#11922f] px-6 py-2 text-white transition-colors hover:bg-[#00753c]"
                  >
                    Next
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.form
              key="step2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              onSubmit={handleSubmit}
            >
              <h2 className="mb-4 text-xl font-semibold text-gray-800">
                Why are you unsubscribing?
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Please select a reason (optional)
                  </label>
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                    {reasons.map((r) => (
                      <div
                        key={r}
                        onClick={() => setReason(r)}
                        className={`cursor-pointer rounded-md border p-3 transition-all ${
                          reason === r
                            ? "border-[#11922f] bg-[#11922f]/10 text-[#11922f]"
                            : "border-gray-200 hover:border-gray-300"
                        } `}
                      >
                        {r}
                      </div>
                    ))}
                  </div>
                </div>

                {reason === "Other (please specify)" && (
                  <div>
                    <label
                      htmlFor="customReason"
                      className="mb-1 block text-sm font-medium text-gray-700"
                    >
                      Please specify
                    </label>
                    <input
                      type="text"
                      id="customReason"
                      value={customReason}
                      onChange={(e) => setCustomReason(e.target.value)}
                      className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-[#11922f] focus:ring-[#11922f]"
                      placeholder="Tell us why you're unsubscribing..."
                    />
                  </div>
                )}

                <div>
                  <label
                    htmlFor="feedback"
                    className="mb-1 block text-sm font-medium text-gray-700"
                  >
                    Additional feedback (optional)
                  </label>
                  <textarea
                    id="feedback"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    rows={3}
                    className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-[#11922f] focus:ring-[#11922f]"
                    placeholder="How can we improve our newsletter?"
                  ></textarea>
                </div>

                {error && (
                  <div className="rounded border-l-4 border-red-500 bg-red-50 p-4">
                    <div className="flex items-center">
                      <AlertCircle className="mr-2 h-5 w-5 text-red-500" />
                      <p className="text-sm text-red-700">{error}</p>
                    </div>
                  </div>
                )}

                <div className="flex flex-col justify-between gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="order-2 rounded-md border border-gray-300 px-6 py-2 text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900 sm:order-1"
                  >
                    Back
                  </button>

                  <div className="order-1 flex flex-col gap-3 sm:order-2 sm:flex-row">
                    <button
                      type="button"
                      onClick={handleStaySubscribed}
                      className="flex items-center justify-center rounded-md bg-[#1CABE2] px-6 py-2 text-white transition-colors hover:bg-[#1a96c5]"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <Loader className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <CheckCircle2 className="mr-2 h-4 w-4" />
                      )}
                      Stay Subscribed
                    </button>

                    <button
                      type="submit"
                      className="flex items-center justify-center rounded-md bg-[#11922f] px-6 py-2 text-white transition-colors hover:bg-[#00753c]"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <Loader className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Send className="mr-2 h-4 w-4" />
                      )}
                      Unsubscribe
                    </button>
                  </div>
                </div>
              </div>
            </motion.form>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="py-8 text-center"
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
                {staySubscribed
                  ? "Thank you for your feedback!"
                  : "You've been unsubscribed"}
              </h2>

              <p className="mx-auto mb-6 max-w-md text-gray-600">
                {staySubscribed
                  ? "We appreciate your feedback and will use it to improve our newsletter content."
                  : "You will no longer receive our newsletter emails. We're sorry to see you go and appreciate your feedback."}
              </p>

              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <Link
                  href="/"
                  className="inline-block rounded-md bg-[#11922f] px-6 py-2 text-white transition-colors hover:bg-[#00753c]"
                >
                  Return to Homepage
                </Link>

                {!staySubscribed && (
                  <button
                    onClick={() => {
                      setStaySubscribed(true);
                      handleStaySubscribed();
                    }}
                    className="rounded-md border border-[#11922f] bg-white px-6 py-2 text-[#11922f] transition-colors hover:bg-[#11922f]/10"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <Loader className="mx-auto h-4 w-4 animate-spin" />
                    ) : (
                      "Resubscribe"
                    )}
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
