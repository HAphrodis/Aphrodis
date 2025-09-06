"use client";

import { useRef, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Mail,
  ArrowRight,
  CheckCircle,
  Loader,
  Send,
  AlertCircle,
} from "lucide-react";
import { SectionSeparator } from "./ui/section-separator";
import { TextEffect } from "@/components/motion-primitives/text-effect";
import { AnimatedGroup } from "@/components/motion-primitives/animated-group";
import { useEffect } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { messageSchema, type MessageInput } from "@/lib/validations/message";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";

export default function ContactSection() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const sectionRef = useRef(null);
  const formRef = useRef<HTMLFormElement>(null);
  const isInView = useInView(sectionRef, {
    once: false,
    amount: 0.1,
    margin: "-100px 0px",
  });
  const controls = useAnimation();

  const form = useForm<MessageInput>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const { isSubmitting } = form.formState;

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  async function onSubmit(data: MessageInput) {
    setErrorMessage(null);

    try {
      const response = await fetch("/api/contact", {
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
        throw new Error(
          responseData.error || "Failed to send message. Please try again.",
        );
      }

      setIsSubmitted(true);
      toast.success("Message sent successfully!", {
        description: "I'll get back to you as soon as possible.",
      });
      form.reset();

      // Reset form after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    } catch (err) {
      const error = err as Error;
      setErrorMessage(error.message);
      toast.error("Failed to send message", {
        description: error.message,
      });
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        bounce: 0.3,
        duration: 0.8,
      },
    },
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden"
    >
      {/* Background Effects */}
      <div
        aria-hidden
        className="absolute inset-0 isolate opacity-65 contain-strict"
      >
        <div className="w-[35rem] h-[80rem] translate-y-[10rem] absolute left-0 top-0 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(160,100%,85%,.05)_0,hsla(160,100%,55%,.01)_50%,hsla(160,100%,45%,0)_80%)]" />
        <div className="h-[80rem] absolute right-0 bottom-0 w-60 rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(160,100%,85%,.04)_0,hsla(160,100%,45%,.01)_80%,transparent_100%)] [translate:5%_-50%]" />
      </div>

      <div className="absolute inset-0 -z-10 size-full [background:radial-gradient(125%_125%_at_50%_10%,transparent_0%,#002922_75%)]"></div>

      {/* Glowing orbs */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-400/5 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-400/5 rounded-full blur-3xl"></div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <SectionSeparator variant="glow" />
      </motion.div>

      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid lg:grid-cols-2 gap-12 lg:gap-24"
        >
          {/* Left Column */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div className="space-y-6">
              <motion.div
                className="flex items-center gap-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
                <span className="text-emerald-400">Available for work</span>
              </motion.div>

              <TextEffect
                preset="fade-in-blur"
                speedSegment={0.3}
                as="h2"
                className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight"
              >
                {"Let's write something extraordinary together"}
              </TextEffect>

              <AnimatedGroup
                variants={{
                  container: {
                    visible: {
                      transition: {
                        staggerChildren: 0.05,
                        delayChildren: 0.4,
                      },
                    },
                  },
                  item: itemVariants,
                }}
              >
                <p className="text-emerald-100/80 text-lg">
                  Leveraging technology, design, and data to create impactful solutions.
                </p>
              </AnimatedGroup>
            </div>

            <AnimatedGroup
              variants={{
                container: {
                  visible: {
                    transition: {
                      staggerChildren: 0.1,
                      delayChildren: 0.6,
                    },
                  },
                },
                item: itemVariants,
              }}
              className="space-y-6"
            >
              <div className="gap-4 flex flex-col sm:flex-row items-center">
                <Link href="/booking">
                  <Button
                    variant="outline"
                    size="lg"
                    className="group relative w-auto overflow-hidden rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white border-0 px-8 py-6 text-lg font-medium transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] active:scale-[0.98]"
                  >
                    <span className="relative flex text-white items-center gap-2">
                      Book a call
                      <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-white/10 transition-transform duration-300 group-hover:translate-x-1">
                        <ArrowRight className="h-4 w-4 text-white transition-transform duration-300 group-hover:scale-110 rotate-1" />
                      </span>
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-emerald-500 opacity-0 transition-opacity duration-300 group-hover:opacity-30" />
                  </Button>
                </Link>

                <motion.a
                  href="mailto:ijbapte@gmail.com"
                  className="group relative flex items-center gap-2 rounded-full bg-emerald-500/10 px-6 py-3 text-emerald-200/80 transition-all duration-300 hover:bg-emerald-500/20 hover:text-emerald-400 hover:shadow-[0_0_20px_rgba(16,185,129,0.2)]"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Mail className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                  <span className="relative">
                    ijbapte@gmail.com
                    <span className="absolute bottom-0 left-0 h-px w-0 bg-emerald-400 transition-all duration-300 group-hover:w-full" />
                  </span>
                </motion.a>
              </div>
            </AnimatedGroup>

            {/* Decorative elements */}
            <div className="absolute -bottom-10 left-1/4 w-1 h-1 bg-emerald-400 rounded-full animate-ping opacity-70"></div>
            <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-emerald-400 rounded-full animate-ping opacity-50 animation-delay-1000"></div>
          </motion.div>

          {/* Right Column */}
          <motion.div variants={itemVariants} className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-transparent blur-3xl -z-10" />

            <motion.div
              initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.4, duration: 0.8, type: "spring" }}
              className="backdrop-blur-sm bg-emerald-950/40 rounded-2xl p-4 sm:p-8 border border-emerald-500/10 shadow-[0_0_25px_rgba(16,185,129,0.1)]"
            >
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center space-y-4"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 10 }}
                  >
                    <CheckCircle className="h-16 w-16 text-emerald-400" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-emerald-400">
                    Message Sent!
                  </h3>
                  <p className="text-emerald-100/80">
                    Thank you for reaching out. I&apos;ll get back to you soon.
                  </p>
                </motion.div>
              ) : (
                <Form {...form}>
                  <form
                    ref={formRef}
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem className="space-y-1">
                          <label
                            htmlFor="name"
                            className="text-sm text-emerald-200/80"
                          >
                            Your name
                          </label>
                          <FormControl>
                            <Input
                              id="name"
                              className="bg-emerald-950/50 border-emerald-500/20 focus:border-emerald-400 text-white placeholder:text-emerald-500/60 transition-all duration-300 focus:shadow-[0_0_15px_rgba(16,185,129,0.15)]"
                              placeholder="John Doe"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-xs text-red-400" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="space-y-1">
                          <label
                            htmlFor="email"
                            className="text-sm text-emerald-200/80"
                          >
                            Your email
                          </label>
                          <FormControl>
                            <Input
                              id="email"
                              type="email"
                              className="bg-emerald-950/50 border-emerald-500/20 focus:border-emerald-400 text-white placeholder:text-emerald-500/60 transition-all duration-300 focus:shadow-[0_0_15px_rgba(16,185,129,0.15)]"
                              placeholder="john@example.com"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-xs text-red-400" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem className="space-y-1">
                          <label
                            htmlFor="message"
                            className="text-sm text-emerald-200/80"
                          >
                            Your message
                          </label>
                          <FormControl>
                            <Textarea
                              id="message"
                              className="bg-emerald-950/50 border-emerald-500/20 focus:border-emerald-400 text-white placeholder:text-emerald-500/60 min-h-[7rem] transition-all duration-300 focus:shadow-[0_0_15px_rgba(16,185,129,0.15)]"
                              placeholder="Tell me about your project..."
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-xs text-red-400" />
                        </FormItem>
                      )}
                    />

                    {errorMessage && (
                      <div className="flex items-center gap-2 text-sm text-red-400 bg-red-950/20 p-3 rounded-md border border-red-500/20">
                        <AlertCircle className="h-4 w-4 flex-shrink-0" />
                        <span>{errorMessage}</span>
                      </div>
                    )}

                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting}
                      className={cn(
                        "w-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all duration-300",
                        isSubmitting && "opacity-90",
                      )}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader className="mr-2 h-4 w-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              )}
            </motion.div>

            {/* Form glow effects */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-emerald-400/10 rounded-full blur-3xl"></div>
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-emerald-400/5 rounded-full blur-3xl"></div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
