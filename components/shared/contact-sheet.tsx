"use client";

import { useEffect, useRef, useState } from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Mail,
  Loader,
  Send,
  AlertCircle,
  CheckCircle,
  PhoneIncoming,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
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
import { FaWhatsapp } from "react-icons/fa";
import { useAnimation, useInView } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ContactSheetProps {
  isOpen: boolean;
  onClose: () => void;
  email?: string;
}

export function ContactSheet({
  isOpen,
  onClose,
  email = "possowiba01@gmail.com",
}: ContactSheetProps) {
 const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const sectionRef = useRef(null);
  // const formRef = useRef<HTMLFormElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 });
  const controls = useAnimation();

  const form = useForm<MessageInput>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  const { isSubmitting } = form.formState;

  useEffect(() => {
    if (isInView) controls.start("visible");
  }, [isInView, controls]);

  async function onSubmit(data: MessageInput) {
    setErrorMessage(null);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error(
            responseData.error || "Too many attempts. Please try again later."
          );
        }
        throw new Error(
          responseData.error || "Failed to send message. Please try again."
        );
      }

      setIsSubmitted(true);
      toast.success("Message sent successfully!", {
        description: "We'll get back to you shortly.",
      });
      form.reset();

      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (err) {
      const error = err as Error;
      setErrorMessage(error.message);
      toast.error("Failed to send message", { description: error.message });
    }
  }

  // const containerVariants = {
  //   hidden: { opacity: 0 },
  //   visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  // };

  // const itemVariants = {
  //   hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
  //   visible: {
  //     opacity: 1,
  //     y: 0,
  //     filter: "blur(0px)",
  //     transition: { type: "spring", bounce: 0.3, duration: 0.8 },
  //   },
  // };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="bottom" className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-emerald-500/20 text-white p-6 rounded-t-xl max-h-[90vh] max-w-[48rem] mx-auto overflow-auto [&::-webkit-scrollbar]:hidden scrollbar-hide" >
        <div className="max-w-3xl mx-auto">
          {/* Social Links
          <div className="flex justify-center gap-4 mb-10 flex-wrap">
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.title}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-emerald-400 transition-colors group relative"
                  aria-label={`${link.title} Profile`}
                  title={link.title}
                >
                  <Icon className="w-6 h-6 transition-transform group-hover:scale-110" />
                  <span className="sr-only">{link.title}</span>
                </Link>
              );
            })}
          </div> */}

          {/* Contact Options */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 mt-5">
            <Link
              href={`mailto:${email}`}
              className="flex items-center justify-center gap-2 py-2 px-4 bg-emerald-900/30 hover:bg-emerald-900/50 border border-emerald-500/20 rounded-lg text-white transition-all hover:shadow-[0_0_15px_rgba(16,185,129,0.2)]"
            >
              <Mail className="h-4 w-4 text-emerald-400" />
              <span>{email}</span>
            </Link>
            <Link
              href="https://api.whatsapp.com/send?phone=250784343073"
              className="flex items-center justify-center gap-2 py-2 px-4 bg-emerald-900/30 hover:bg-emerald-900/50 border border-emerald-500/20 rounded-lg text-white transition-all hover:shadow-[0_0_15px_rgba(16,185,129,0.2)]"
            >
              <FaWhatsapp className="h-4 w-4 text-emerald-400" />
              <span>Whatsapp</span>
            </Link>
            <Link
              href="tel:+250784343073"
              className="flex items-center justify-center gap-2 py-2 px-4 bg-emerald-900/30 hover:bg-emerald-900/50 border border-emerald-500/20 rounded-lg text-white transition-all hover:shadow-[0_0_15px_rgba(16,185,129,0.2)]"
            >
              <PhoneIncoming className="h-5 w-5 text-emerald-400" />
              <span>Call me</span>
            </Link>
          </div>

          {/* Divider */}
          <div className="relative flex items-center py-2 mb-6">
            <div className="flex-grow border-t border-emerald-500/20"></div>
            <span className="flex-shrink mx-4 text-white font-semibold">
              Or Write a message to me
            </span>
            <div className="flex-grow border-t border-emerald-500/20"></div>
          </div>

          {/* Contact Form */}
          {isSubmitted ? (
            <div className="flex flex-col items-center justify-center py-8 text-center space-y-4 rounded-lg border border-purple-500/20 bg-purple-900/10">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-emerald-500/20">
                <CheckCircle className="w-8 h-8 text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold text-emerald-400">
                Message Sent!
              </h3>
              <p className="text-white/80">
                Thank you for reaching out. I&apos;ll get back to you soon.
              </p>
            </div>
          ) : (
             <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Full Name
                        </label>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="John Doe"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                          />
                        </FormControl>
                        <FormMessage className="text-xs text-red-400" />
                      </FormItem>
                    )}
                  />

                  {/* Email Address */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address
                        </label>
                        <FormControl>
                          <Input
                            {...field}
                            type="email"
                            placeholder="john@example.com"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                          />
                        </FormControl>
                        <FormMessage className="text-xs text-red-400" />
                      </FormItem>
                    )}
                  />

                  {/* Mobile Number */}
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Mobile Number
                        </label>
                        <FormControl>
                          <Input
                            {...field}
                            type="tel"
                            placeholder="+250 784 343 073"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                          />
                        </FormControl>
                        <FormMessage className="text-xs text-red-400" />
                      </FormItem>
                    )}
                  />

                  {/* Course Interested In */}
                  <FormField
                    control={form.control}
                    name="subject"
                    render={() => (
                      <FormItem className="space-y-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Course Interested In
                        </label>
                        <FormControl>
                          <Select>
      <SelectTrigger className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm">
        <SelectValue placeholder="Select a Service" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="Web Development">Web Development</SelectItem>
        <SelectItem value="Animation">Animation</SelectItem>
        <SelectItem value="UI/UX Design">UI/UX Design</SelectItem>
        <SelectItem value="Other">Other Service(s)</SelectItem>
      </SelectContent>
    </Select>
                        </FormControl>
                        <FormMessage className="text-xs text-red-400" />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Message */}
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Your Message
                      </label>
                      <FormControl>
                        <Textarea
                          {...field}
                          rows={4}
                          placeholder="Tell us about your interests and goals..."
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
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
                  disabled={isSubmitting}
                  className={cn(
                    "w-full bg-purple-200/20 hover:from-emerald-500 hover:to-emerald-400",
                    "text-white border-0 shadow-lg hover:shadow-[0_0_20px_rgba(16,185,129,0.3)]",
                    "transition-all duration-300",
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
        </div>
      </SheetContent>
    </Sheet>
  );
}
