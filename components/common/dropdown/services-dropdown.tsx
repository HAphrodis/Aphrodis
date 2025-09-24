"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function ServicesDropdown() {
  const pathname = usePathname();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-2 gap-4 p-6 w-[540px] bg-gradient-to-br from-purple-100/10 to-purple-100/5 backdrop-blur-xl rounded-xl border border-emerald-300/20 shadow-2xl"
    >
      <motion.div variants={itemVariants} className="col-span-2 mb-2">
        <h2 className="text-xl font-bold text-emerald-100 mb-1">My Services</h2>
        <p className="text-sm text-emerald-300/70">
          Professional services I offer to help bring your ideas to life
        </p>
      </motion.div>

      <motion.div variants={itemVariants}>
        <ServiceCard
          title="UI/UX Design"
          description="Create intuitive and engaging user experiences"
          image="/UI.jpeg"
          href="/services"
          isActive={pathname === "/services"}
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <ServiceCard
          title="Web Development"
          description="Build responsive and modern websites"
          image="/website.jpg"
          href="/services"
          isActive={pathname === "/services"}
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <ServiceCard
          title="Graphic Design"
          description="Craft visually appealing graphics and branding"
          image="/graphics.jpg"
          href="/services"
          isActive={pathname === "/services"}
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <ServiceCard
          title="Consulting"
          description="Strategic guidance for your digital projects"
          image="/placeholder.svg?height=135&width=240"
          href="/services"
          isActive={pathname === "/services"}
        />
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="col-span-2 mt-4 pt-4 border-t border-emerald-500/20"
      >
        <Link
          href="/services"
          className="inline-flex items-center gap-2 text-emerald-300 hover:text-emerald-100 transition-colors duration-300 font-medium group cursor-pointer"
        >
          View all services
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </motion.div>
    </motion.div>
  );
}

interface ServiceCardProps {
  title: string;
  description: string;
  image: string;
  href: string;
  isActive?: boolean;
}

function ServiceCard({
  title,
  description,
  image,
  href,
  isActive = false,
}: ServiceCardProps) {
  return (
    <Link href={href} className="group block cursor-pointer">
      <motion.div
        className={cn(
          "relative overflow-hidden rounded-xl border transition-all duration-300",
          isActive
            ? "border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.3)]"
            : "border-emerald-500/20 hover:border-emerald-500/40",
        )}
        whileHover={{ scale: 1.02, y: -4 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={image || "/placeholder.svg?height=135&width=240"}
            alt={title}
            width={240}
            height={135}
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-emerald-950/40 to-transparent" />

          {/* Hover overlay */}
          <div
            className={cn(
              "absolute inset-0 transition-opacity duration-300",
              isActive
                ? "bg-emerald-500/15 opacity-100"
                : "bg-emerald-500/10 opacity-0 group-hover:opacity-100",
            )}
          />

          {/* Active indicator */}
          {isActive && (
            <motion.div
              layoutId="servicesDropdownActive"
              className="absolute inset-0 bg-emerald-500/10"
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3
            className={cn(
              "text-base font-semibold mb-1 transition-colors duration-300",
              isActive
                ? "text-emerald-50"
                : "text-emerald-100 group-hover:text-emerald-50",
            )}
          >
            {title}
          </h3>
          <p
            className={cn(
              "text-sm transition-colors duration-300 leading-relaxed",
              isActive
                ? "text-emerald-100/90"
                : "text-emerald-200/80 group-hover:text-emerald-100/90",
            )}
          >
            {description}
          </p>
        </div>

        {/* Hover indicator */}
        <div
          className={cn(
            "absolute top-3 right-3 transition-all duration-300",
            isActive
              ? "opacity-100 translate-x-0"
              : "opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0",
          )}
        >
          <div className="p-1.5 bg-emerald-500/20 backdrop-blur-sm rounded-full border border-emerald-400/30">
            <ArrowUpRight className="h-3 w-3 text-emerald-300" />
          </div>
        </div>

        {/* Active dot indicator */}
        {isActive && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-2 left-2 h-2 w-2 bg-emerald-400 rounded-full shadow-[0_0_6px_rgba(16,185,129,0.6)]"
          />
        )}
      </motion.div>
    </Link>
  );
}
