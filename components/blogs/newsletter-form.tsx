// components\blog\newsletter-form.tsx
"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Loader, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  subscribeSchema,
  type SubscribeInput,
} from "@/lib/validations/newsletter";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

export function NewsletterForm() {
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<SubscribeInput>({
    resolver: zodResolver(subscribeSchema),
    defaultValues: {
      email: "",
      status: "active" as "active" | "inactive",
    },
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(data: SubscribeInput) {
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error(
            responseData.error || "Too many attempts. Please try again later.",
          );
        }
        if (response.status === 409) {
          throw new Error("This email is already subscribed to my newsletter.");
        }
        throw new Error(
          responseData.error || "Failed to subscribe. Please try again.",
        );
      }

      setIsSuccess(true);
      toast.success("Successfully subscribed!", {
        description: "Check your email for confirmation.",
      });
      form.reset();
    } catch (err) {
      const error = err as Error;
      toast.error(error.message);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-4 hidden rounded-lg border border-[#c1dbf7] bg-gray-50 p-4 shadow-md dark:text-black md:block">
      <div className="mb-4 flex items-center gap-3">
         <div className="relative">
        <div className="absolute inset-0 animate-ping rounded-full bg-emerald-400/20" />
        <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-[#04877F]">
          <Send className="h-5 w-5 text-white" />
        </div>
      </div>
        <div>
          <h3 className="text-lg font-semibold text-[#04877F]">Stay Updated</h3>
          <p className="text-Xs text-gray-600 ">
            Get notified about new articles
          </p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <Input
                      placeholder="your@email.com"
                      className="w-full  border-gray-300 bg-white text-black dark:border-gray-300 dark:bg-white dark:text-black"
                      disabled={isSubmitting || isSuccess}
                      {...field}
                    />
                    <AnimatePresence>
                      {isSuccess && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.5 }}
                          className="absolute top-1/2 right-3 -translate-y-1/2">
                          <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </FormControl>
                <FormMessage className="mt-1 text-xs text-red-400" />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={isSubmitting || isSuccess}
             effect="shineHover"
            className={cn(
              "w-full transition-all duration-200",
              "bg-[#04877F] text-white hover:bg-[#04877F]/80",
              "border border-emerald-500/20",
              "disabled:cursor-not-allowed disabled:opacity-50",
              isSuccess && "border-emerald-500/50 bg-emerald-500/30",
            )}>
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <Loader className="h-4 w-4 animate-spin" />
                Subscribing...
              </span>
            ) : isSuccess ? (
              <span className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" />
                Subscribed!
              </span>
            ) : (
              "Subscribe to Newsletter"
            )}
          </Button>
        </form>
      </Form>

      {/* Background gradient effect */}
        {/* Background gradient effect */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-emerald-500/5" />
      </div>
    </motion.div>
  );
}
