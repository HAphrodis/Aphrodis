/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type * as z from "zod";
import { SignInValidation } from "@/lib/validations/auth";
import { useAuthStore } from "@/store/authStore";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  LoaderIcon,
  EyeOffIcon,
  EyeIcon,
  Lock,
  Mail,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { VerificationInput } from "@/components/ui/verification-input";
import { motion, AnimatePresence } from "framer-motion";

export const SignInForm = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const callbackUrl = searchParams ? searchParams.get("callbackUrl") : null;
  const [error, setError] = useState<string | undefined>("");
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState<string | undefined>("");
  const [isLoading, setIsLoading] = useState(false);
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const setAuth = useAuthStore((state: { setAuth: any }) => state.setAuth);
  const [verificationCode, setVerificationCode] = useState("");
  const [verificationError, setVerificationError] = useState(false);
  const [lastSubmittedCode, setLastSubmittedCode] = useState("");

  const form = useForm<z.infer<typeof SignInValidation>>({
    resolver: zodResolver(SignInValidation),
    defaultValues: {
      email: "",
      password: "",
      code: "",
    },
  });

  // Handle verification code completion
  const handleVerificationComplete = () => {
    if (
      verificationCode.length === 6 &&
      !isLoading &&
      !verificationError &&
      verificationCode !== lastSubmittedCode
    ) {
      setLastSubmittedCode(verificationCode);
      form.handleSubmit(onSubmit)();
    }
  };

  // Update form values when verification code changes
  useEffect(() => {
    form.setValue("code", verificationCode);

    if (verificationError && verificationCode !== lastSubmittedCode) {
      setVerificationError(false);
    }
  }, [verificationCode, form, verificationError, lastSubmittedCode]);

  async function onSubmit(values: z.infer<typeof SignInValidation>) {
    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      const response = await fetch(`/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          code: showTwoFactor ? verificationCode : undefined,
        }),
        credentials: "include",
      });

      const result = await response.json();

      if (!response.ok) {
        // Improved error handling - extract detailed error message
        let errorMessage = "An error occurred during sign in";

        if (result.error?.message) {
          errorMessage = result.error.message;
        } else if (result.message) {
          errorMessage = result.message;
        } else if (response.status === 401) {
          errorMessage = "Invalid email or password";
        } else if (response.status === 429) {
          errorMessage = "Too many attempts. Please try again later";
        }

        setError(errorMessage);

        if (showTwoFactor) {
          setVerificationError(true);
        }

        setIsLoading(false);
        return;
      }

      if (result.data && result.data.twoFactorRequired) {
        setShowTwoFactor(true);
        form.setValue("code", "");
        setVerificationCode("");
        setLastSubmittedCode("");
        setIsLoading(false);
        return;
      }

      setSuccess(result.message || "Signed in successfully");
      setAuth(result.data.token, result.data.user);

      if (callbackUrl) {
        router.push(callbackUrl);
      } else {
        router.push("/admin/dashboard");
      }
    } catch (error) {
      console.error("Sign-in error:", error);
      setError(
        "Unable to connect to the server. Please check your connection and try again.",
      );

      if (showTwoFactor) {
        setVerificationError(true);
      }

      setIsLoading(false);
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <AnimatePresence mode="wait">
          {!showTwoFactor ? (
            <motion.div
              key="login"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="mb-6 text-center">
                <motion.h2
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                  className="text-2xl font-bold text-white"
                >
                  Sign in to your account
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="mt-1 text-sm text-gray-400"
                >
                  Enter your credentials to access the dashboard
                </motion.p>
              </div>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-300">
                      Email
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                          <Mail className="h-5 w-5" />
                        </div>
                        <Input
                          type="email"
                          placeholder="your.email@example.com"
                          {...field}
                          disabled={isLoading}
                          className="border-white/10 bg-white/5 pl-10 text-white placeholder:text-gray-500 focus:border-emerald-500 focus:ring-emerald-500/20"
                        />
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel className="text-sm font-medium text-gray-300">
                        Password
                      </FormLabel>
                      <a
                        href="#"
                        className="text-xs font-medium text-emerald-400 hover:text-emerald-300"
                      >
                        Forgot password?
                      </a>
                    </div>
                    <FormControl>
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                          <Lock className="h-5 w-5" />
                        </div>
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••••••"
                          {...field}
                          className="border-white/10 bg-white/5 pl-10 pr-10 text-white placeholder:text-gray-500 focus:border-emerald-500 focus:ring-emerald-500/20"
                          disabled={isLoading}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2 text-gray-400 hover:text-white"
                          onClick={togglePasswordVisibility}
                        >
                          {showPassword ? (
                            <EyeOffIcon className="h-5 w-5" />
                          ) : (
                            <EyeIcon className="h-5 w-5" />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="flex items-center">
                <div className="flex items-center space-x-2">
                  <div className="relative flex h-5 w-5 items-center justify-center">
                    <input
                      type="checkbox"
                      id="remember"
                      className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-white/10 bg-white/5 transition-colors checked:border-emerald-500 checked:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                    />
                    <svg
                      className="pointer-events-none absolute h-3 w-3 text-white opacity-0 peer-checked:opacity-100"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <label
                    htmlFor="remember"
                    className="cursor-pointer text-sm text-gray-400"
                  >
                    Remember me
                  </label>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="2fa"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="mb-6 text-center">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, type: "spring" }}
                  className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10"
                >
                  <ShieldCheck className="h-8 w-8 text-emerald-400" />
                </motion.div>
                <h2 className="mb-2 text-2xl font-bold text-white">
                  Two-Factor Authentication
                </h2>
                <p className="text-gray-400">
                  Enter the verification code sent to{" "}
                  <span className="font-medium text-emerald-400">
                    {form.getValues("email")}
                  </span>
                </p>
              </div>

              <motion.div
                className="flex justify-center p-6"
                animate={{
                  x: verificationError ? [0, -10, 10, -10, 10, 0] : 0,
                }}
                transition={{
                  duration: verificationError ? 0.5 : 0,
                  ease: "easeInOut",
                }}
              >
                <VerificationInput
                  value={verificationCode}
                  onChange={setVerificationCode}
                  disabled={isLoading}
                  onComplete={handleVerificationComplete}
                  hasError={verificationError}
                />
              </motion.div>

              <div className="text-center text-sm text-gray-400">
                <p>
                  Didn&apos;t receive a code?{" "}
                  <a
                    href="#"
                    className="font-medium text-emerald-400 hover:text-emerald-300"
                  >
                    Resend code
                  </a>
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Improved error display */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-md bg-red-500/10 p-3 text-sm text-red-400"
          >
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="mr-2 h-5 w-5"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z"
                  clipRule="evenodd"
                />
              </svg>
              {error}
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Button
            type="submit"
            className="group relative w-full overflow-hidden rounded-lg bg-gradient-to-r from-emerald-600 to-emerald-500 px-8 py-4 text-white transition-all duration-300 hover:from-emerald-500 hover:to-emerald-400"
            disabled={
              isLoading || (showTwoFactor && verificationCode.length !== 6)
            }
          >
            <span className="relative z-10 flex items-center justify-center font-medium">
              {isLoading ? (
                <LoaderIcon className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                <ArrowRight className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              )}
              {isLoading
                ? showTwoFactor
                  ? "Verifying..."
                  : "Signing in..."
                : showTwoFactor
                  ? "Verify Code"
                  : "Sign In"}
            </span>
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:animate-[shimmer_1s_forwards]"></div>
          </Button>

          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 rounded-md bg-emerald-500/10 p-3 text-sm text-emerald-400"
            >
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="mr-2 h-5 w-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                    clipRule="evenodd"
                  />
                </svg>
                {success}
              </div>
            </motion.div>
          )}
        </motion.div>
      </form>
    </Form>
  );
};
