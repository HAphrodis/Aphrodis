"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Loader, Send, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  subscribeSchema,
  type SubscribeInput,
} from "@/lib/validations/newsletter";
import { toast } from "sonner";

interface NewsletterFormProps {
  className?: string;
  variant?: "default" | "footer" | "sidebar";
}

export function NewsletterForm({
  className,
  variant = "default",
}: NewsletterFormProps) {
  const [isHovered, setIsHovered] = useState(false);

  const form = useForm<SubscribeInput>({
    resolver: zodResolver(subscribeSchema),
    defaultValues: {
      email: "",
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
          toast.error("Too many attempts", {
            description: responseData.error || "Please try again later.",
            duration: 5000,
          });
          return;
        }

        if (response.status === 409) {
          toast.error("Already subscribed", {
            description: "This email is already subscribed to our newsletter.",
            duration: 5000,
          });
          return;
        }

        throw new Error(
          responseData.error || "Failed to subscribe. Please try again.",
        );
      }

      // Success case.
      toast.success("Successfully subscribed!", {
        description: "Thank you for subscribing to my newsletter.",
        duration: 5000,
      });

      form.reset();
    } catch (err) {
      const error = err as Error;
      toast.error("Subscription failed", {
        description: error.message || "Something went wrong. Please try again.",
        duration: 5000,
      });
    }
  }

  return (
    <div
      className={cn(
        "relative mb-4 md:mb-0 group mt-5",
        variant === "footer" && "max-w-md mx-auto",
        className,
      )}
    >
      {/* Decorative elements */}
      <div className="absolute -top-10 -right-10 w-20 h-20 bg-purple-400 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
      <div className="absolute -bottom-10 -left-10 w-20 h-20 bg-purple-400 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

      <motion.div
        className={cn(
          "group relative",
          variant === "footer" && "space-y-4",
          variant === "sidebar" && "space-y-3",
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className={cn("space-y-2", variant === "default" && "mb-4")}>
          <div className="flex items-center gap-2">
            <Mail
              className={cn(
                "h-6 w-6 text-purple-200 transition-all duration-300",
                isHovered && "scale-110 rotate-3",
              )}
            />
            <p
              className={cn(
                "font-medium",
                variant === "default" && "text-xl",
                variant === "footer" && "text-base",
                variant === "sidebar" && "text-xl",
              )}
            >
              Subscribe to my newsletter
            </p>
          </div>
          <p
            className={cn(
              "text-white/70",
              variant === "default" && "text-base",
              variant === "footer" && "text-sm",
              variant === "sidebar" && "text-xs",
            )}
          >
            Get the latest updates, articles, and resources delivered to your
            inbox.
          </p>
        </div>

       <Form {...form}>
  <form
    onSubmit={form.handleSubmit(onSubmit)}
    className="w-full"
  >
    <div className="flex items-center gap-2 w-full">
      {/* Input */}
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem className="flex-1">
            <FormControl>
              <div className="relative w-full">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className={cn(
                    "w-full h-10 bg-purple-100/10 border-purple-100/20 text-white placeholder:text-purple-100/70 transition-all duration-300",
                    "focus:border-purple-200 focus:ring-1 focus:ring-purple-100/30",
                    isHovered &&
                      "border-purple-500/40]"
                  )}
                  disabled={isSubmitting}
                  {...field}
                />
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 -z-10 rounded-md blur-sm bg-purple-500/5"
                    />
                  )}
                </AnimatePresence>
              </div>
            </FormControl>
            <FormMessage className="text-xs text-red-400 mt-1" />
          </FormItem>
        )}
      />

      {/* Button */}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="h-10 px-2 text-xs bg-purple-100/50 hover:bg-purple-200/60 text-black font-medium transition-all duration-300 hover:shadow-[0_0_20px_rgba(16,185,129,0.3)]"
      >
        {isSubmitting ? (
          <>
            <Loader className="mr-2 h-4 w-4 animate-spin" />
            Subscribing...
          </>
        ) : (
          <>
            <Send
              className={cn(
                "mr-1 h-4 w-4 transition-transform duration-300",
                isHovered && "translate-x-1 -translate-y-1"
              )}
            />
            Subscribe
          </>
        )}
      </Button>
    </div>
  </form>
</Form>


        {/* Privacy note */}
        <p
          className={cn(
            "text-white/40 mt-2",
            variant === "default" && "text-xs",
            variant === "footer" && "text-xs",
            variant === "sidebar" && "text-[10px]",
          )}
        >
          I respect your privacy. Unsubscribe at any time.
        </p>

        {/* Animated particles */}
        <AnimatePresence>
          {isHovered && (
            <>
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{
                    opacity: 0,
                    x: 0,
                    y: 0,
                    scale: 0,
                  }}
                  animate={{
                    opacity: [0, 0.5, 0],
                    x: Math.random() * 100 - 50,
                    y: Math.random() * -100,
                    scale: Math.random() * 0.5 + 0.5,
                  }}
                  transition={{
                    duration: 1.5,
                    delay: i * 0.1,
                  }}
                  className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full bg-purple-400/30"
                />
              ))}
            </>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
