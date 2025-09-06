"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { services } from "@/constants/my-services";
import { AnimatedGroup } from "@/components/motion-primitives/animated-group";
import { ServiceCard } from "@/components/services/service-card";
import { ServiceDetails } from "@/components/services/service-details";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle, PackageCheck } from "lucide-react";
import Link from "next/link";
import PageHeader from "@/components/shared/page-header";

export default function ServicesPage() {
  const [hoveredService, setHoveredService] = useState<number | null>(null);
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const servicesRef = useRef<HTMLDivElement>(null);
  // const processRef = useRef<HTMLDivElement>(null);
  // const testimonialsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const isServicesInView = useInView(servicesRef, { once: false, amount: 0.2 });
  // const isCtaInView = useInView(ctaRef, { once: true, amount: 0.2 })

  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -200]);

  const openServiceDetails = (index: number) => {
    setSelectedService(index);
    setIsDetailsOpen(true);
  };

  const closeServiceDetails = () => {
    setIsDetailsOpen(false);
  };

  return (
    
    <div className="flex flex-col min-h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 ">
  
      {/* Hero Section */}
      <PageHeader
        title="My"
        highlightedTitle="Services"
        subtitle="Elevate your digital presence with professional solutions tailored to your needs."
      />

      {/* Services Section */}
      <main className="flex-grow relative ">
        <div
          className={`w-screen`}
        >
          <motion.div
            className="absolute inset-0 z-0 opacity-20"
            style={{
              backgroundImage:
                "radial-gradient(circle at 25% 25%, rgba(16, 185, 129, 0.1) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(16, 185, 129, 0.1) 0%, transparent 50%)",
              y: backgroundY,
            }}
          />

          <section ref={servicesRef} className="relative w-full py-16 md:py-24">
            <div className="container mx-auto px-4 md:px-6 ">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isServicesInView
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.5 }}
                className="text-3xl font-bold text-white text-center mb-4"
              >
                Professional Services
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isServicesInView
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-white/70 text-center max-w-3xl mx-auto mb-8"
              >
                Comprehensive solutions to help you build, grow, and maintain
                your digital presence with cutting-edge technologies and best
                practices.
              </motion.p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                {services.map((service, index) => (
                  <ServiceCard
                    key={index}
                    service={service}
                    index={index}
                    isHovered={hoveredService === index}
                    onHover={setHoveredService}
                    onClick={() => openServiceDetails(index)}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section
            ref={ctaRef}
            className="relative w-full py-16 md:py-24"
          >
            <div className="absolute inset-0"></div>

            <div className="container mx-auto px-4 md:px-6 relative">
              <AnimatedGroup
                variants={{
                  container: {
                    visible: {
                      transition: {
                        staggerChildren: 0.1,
                        delayChildren: 0.2,
                      },
                    },
                  },
                  item: {
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
                  },
                }}
                className="max-w-4xl mx-auto text-center backdrop-blur-sm p-8 md:p-12 rounded-2xl border border-purple-500/10 shadow-[0_0_25px_rgba(16,185,129,0.05)]"
              >
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Ready to Start Your Project?
                </h2>
                <p className="text-white/70 mb-8 max-w-2xl mx-auto">
                  Let&apos;s discuss how I can help you achieve your goals and
                  bring your vision to life with tailored solutions that meet
                  your specific needs.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  {/* <Button
                    asChild
                    size="lg"
                    className="relative border z-10 font-bold group-hover:text-green-400 text-gray-200 dark:text-black px-6 py-2 rounded-md overflow-hidden group"
                  >
                    
                    <Link href="/contact" className="flex items-center gap-2 ">
                      <MessageCircle className="h-5 w-5" />
                      Get in Touch
                    </Link>
                  </Button> */}
                  <Link href="/contact">
             <button className="relative border text-gray-200 dark:text-black px-6 py-2 rounded-full overflow-hidden group">
                    <span className="absolute inset-0 bg-gradient-to-r from-blue-100 to-purple-100 transform -translate-x-full group-hover:translate-x-0 transition duration-300"
          ></span>
          <span className="relative z-10 group-hover:text-green-400 flex items-center gap-2"><MessageCircle className="h-5 w-5" />Get in Touch</span>
                </button>
          </Link>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="border-purple-500/20 hover:text-purple-100 text-emerald-400 hover:bg-purple-500/10 hover:border-purple-500/40 rounded-full"
                  >
                    <Link href="/work" className="flex items-center gap-2">
                      View My Work
                      <ArrowRight className="h-5 w-5" />
                    </Link>
                  </Button>
                </div>

                <div className="mt-8 flex flex-wrap justify-center gap-6">
                  <div className="flex items-center gap-2 text-white/70">
                    <PackageCheck className="h-5 w-5 text-emerald-400" />
                    <span>Free Consultation</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/70">
                    <PackageCheck  className="h-5 w-5 text-emerald-400" />
                    <span>Custom Quotes</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/70">
                    <PackageCheck  className="h-5 w-5 text-emerald-400" />
                    <span>Quick Response</span>
                  </div>
                </div>
              </AnimatedGroup>
            </div>
          </section>
        </div>
      </main>

      {/* Service Details Modal */}
      {selectedService !== null && (
        <ServiceDetails
          service={services[selectedService]}
          isOpen={isDetailsOpen}
          onClose={closeServiceDetails}
        />
      )}
    </div>
  );
}
