"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useAnimation, useInView, Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
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
import { CheckCircle, Loader, Send, AlertCircle } from "lucide-react";
import Image from "next/image";
import PageHeader from "@/components/shared/page-header";

export default function ContactSection() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const sectionRef = useRef(null);
  const formRef = useRef<HTMLFormElement>(null);
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants:Variants = {
    hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { type: "spring", bounce: 0.3, duration: 0.8 },
    },
  };

  return (
<>
 <PageHeader
        title="Get in Touch"
        highlightedTitle=""
        subtitle="A showcase of latest projects, highlighting web apps, design systems, and digital experiences that reflect my enthusiasm for crafting innovative solutions."
      />
    <section
      ref={sectionRef}
      id="contact"
      className="relative max-w-7xl mx-auto px-4 py-16 overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/rural.jpg"
          alt="Background Image"
          width={1920}
          height={1080}
          className="object-cover w-full h-full"
          priority
        />
        <div className="absolute inset-0 bg-black/70"></div>
      </div>

      {/* Header Section */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Enquire About My Services
        </h1>
        <div className="w-20 h-1 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 mx-auto mb-6"></div>
        <p className="text-xl text-purple-100 max-w-3xl mx-auto">
          Specialising in web development, software solutions, and digital
          creativity. Fill out the form below, and I’ll guide you on how to
          start your tech journey or collaborate on projects.
        </p>
      </motion.div>

      {/* Form Container */}
      <motion.div
        className="bg-white rounded-xl shadow-2xl overflow-hidden md:flex"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
         {/* Left Side */}
        <motion.div
          className="md:w-1/3 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white flex flex-col justify-between"
          variants={itemVariants}
        >
        
                <div className="bg-gray-800 p-8 rounded-3xl shadow-xl w-full">
                    <h2 className="text-2xl font-bold mb-8">Contact Information</h2>
                    
                    <div className="space-y-5">
                        <div className="flex items-center gap-4 group">
                            <div className="bg-blue-900 p-4 rounded-xl transform transition-transform duration-300 group-hover:translate-y-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-gray-400">Email</p>
                                <p>possowiba01@gmail.com</p>
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-4 group">
                            <div className="bg-green-900 p-4 rounded-xl transform transition-transform duration-300 group-hover:translate-y-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-gray-400">Phone</p>
                                <p>+250 784 343 073</p>
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-4 group">
                            <div className="bg-red-900 p-4 rounded-xl transform transition-transform duration-300 group-hover:translate-y-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-gray-400">Location</p>
                                <p>Kigali Rwanda</p>
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-4 group">
                            <div className="bg-purple-900 p-4 rounded-xl transform transition-transform duration-300 group-hover:translate-y-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-gray-400">Calendly</p>
                                <a href="/contact" className="text-blue-400 hover:underline">Schedule a meeting with Me</a>
                            </div>
                        </div>
                    </div>
                </div>
        </motion.div>

        {/* Right Side - Form */}
        <motion.div className="md:w-2/3 p-10" variants={itemVariants}>
          {isSubmitted ? (
            <motion.div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
              <CheckCircle className="h-16 w-16 text-red-600" />
              <h3 className="text-2xl font-bold text-red-600">Message Sent!</h3>
              <p className="text-gray-700">
                Thank you for reaching out. We&apos;ll get back to you shortly.
              </p>
            </motion.div>
          ) : (
            <Form {...form}>
              <form
                ref={formRef}
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
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Select Service
                        </label>
                        <FormControl>
                          <select
                            {...field}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 bg-white"
                          >
                            <option value="">Select a Service</option>
                            <option value="Graphic Design">
                              Graphic Design
                            </option>
                            <option value="Web Development">
                              Web Development
                            </option>
                            <option value="Animation">Animation</option>
                            <option value="UI/UX Design">UI/UX Design</option>
                            <option value="Other">Other Service(s)</option>
                          </select>
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

                {/* Error message */}
                {errorMessage && (
                  <div className="flex items-center gap-2 text-sm text-red-400 bg-red-100/20 p-3 rounded-md border border-red-500/20">
                    <AlertCircle className="h-4 w-4 flex-shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Submit */}
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full py-3 px-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white font-medium rounded-lg shadow-sm hover:bg-red-700 transition duration-300"
                >
                  {isSubmitting ? (
                    <>
                      <Loader className="mr-2 h-4 w-4 animate-spin" /> Sending...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" /> Submit Enquiry
                    </>
                  )}
                </Button>
              </form>
            </Form>
          )}
        </motion.div>
      </motion.div>
    </section>
    </>
  );
}
