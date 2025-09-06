"use client";

import { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { ArrowRight, Box } from "lucide-react";
import { TextEffect } from "@/components/motion-primitives/text-effect";
import { AnimatedGroup } from "@/components/motion-primitives/animated-group";
import Link from "next/link";

// Tech stack data
const frontendTech = [
  { label: "HTML5", icon: "devicon-html5-plain" },
  { label: "CSS3", icon: "devicon-css3-plain" },
  { label: "JavaScript", icon: "devicon-javascript-plain" },
  { label: "TypeScript", icon: "devicon-typescript-plain" },
  { label: "React.js", icon: "devicon-react-original" },
  { label: "Next.js", icon: "devicon-nextjs-plain" },
  { label: "Sass", icon: "devicon-sass-original" },
  { label: "TailwindCSS", icon: "devicon-tailwindcss-plain" },
  { label: "Bootstrap", icon: "devicon-bootstrap-plain" },
];

const backendTech = [
  { label: "Node.js", icon: "devicon-nodejs-plain" },
  { label: "Express", icon: "devicon-express-original" },
  { label: "MongoDB", icon: "devicon-mongodb-plain" },
  { label: "PostgreSQL", icon: "devicon-postgresql-plain" },
];

const toolsTech = [
  { label: "Git", icon: "devicon-git-plain" },
  { label: "GitHub", icon: "devicon-github-original" },
  { label: "Figma", icon: "devicon-figma-plain" },
  { label: "VS Code", icon: "devicon-visualstudio-plain" },
  { label: "Vercel", icon: "devicon-vercel-plain" },
  { label: "Postman", icon: "devicon-postman-plain" },
  { label: "Illustrator", icon: "devicon-illustrator-plain" },
];

const TechBadge = ({ label, icon }: { label: string; icon: string }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-950/40 rounded-full border border-emerald-800/30 hover:border-emerald-400/50 transition-colors"
  >
    <i className={cn(icon, "text-xl text-emerald-400")} />
    <span className="text-sm font-mono text-emerald-100/80">{label}</span>
  </motion.div>
);

const TechSection = ({
  title,
  techs,
  delay = 0,
}: {
  title: string;
  techs: { label: string; icon: string }[];
  delay?: number;
}) => (
  <AnimatedGroup
    variants={{
      container: {
        visible: {
          transition: {
            staggerChildren: 0.05,
            delayChildren: delay,
          },
        },
      },
      item: {
        hidden: { opacity: 0, y: 10, filter: "blur(8px)" },
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
    className="space-y-3"
  >
    <h4 className="text-sm font-medium text-emerald-400/80 uppercase tracking-wider">
      {title}
    </h4>
    <div className="flex flex-wrap gap-2">
      {techs.map((tech) => (
        <TechBadge key={tech.label} {...tech} />
      ))}
    </div>
  </AnimatedGroup>
);

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: false,
    amount: 0.2, // Trigger when just 20% of the element is in view
    margin: "-100px 0px", // Start animations 100px before the element comes into view
  });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
      id="about"
      ref={ref}
      className="relative min-h-screen bg-[#002922] text-white pb-20 overflow-hidden"
    >
      {/* Background Effects */}
      <div
        aria-hidden
        className="absolute inset-0 isolate opacity-65 contain-strict"
      >
        <div className="w-[35rem] h-[80rem] translate-y-[10rem] absolute right-0 top-0 rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(160,100%,85%,.05)_0,hsla(160,100%,55%,.01)_50%,hsla(160,100%,45%,0)_80%)]" />
        <div className="h-[80rem] absolute right-0 top-0 w-60 rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(160,100%,85%,.04)_0,hsla(160,100%,45%,.01)_80%,transparent_100%)] [translate:5%_-50%]" />
      </div>

      <div className="absolute inset-0 -z-10 size-full [background:radial-gradient(125%_125%_at_50%_10%,transparent_0%,#002922_75%)]"></div>

      <div className="container mx-auto px-4 pt-16 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="space-y-16"
        >
          <TextEffect
            preset="fade-in-blur"
            speedSegment={0.3}
            as="h2"
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-center bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-white"
          >
            {"About Me"}
          </TextEffect>

          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start"
          >
            <motion.div variants={itemVariants} className="space-y-6 pr-6">
              <TextEffect
                preset="fade-in-blur"
                speedSegment={0.3}
                as="h3"
                className="text-2xl font-bold text-emerald-400"
              >
                {"Crafting Digital Experiences with Passion and Precision"}
              </TextEffect>

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
                  item: itemVariants,
                }}
                className="space-y-4"
              >
                <p className="text-white/80 leading-relaxed">
                  As a Full Stack Developer based in Kigali, Rwanda, I bring a
                  unique blend of technical expertise and creative
                  problem-solving to every project. My journey in the world of
                  web development has been driven by a passion for creating
                  seamless, user-centric digital experiences that not only meet
                  but exceed expectations.
                </p>
                <p className="text-white/80 leading-relaxed">
                  With a keen eye for detail and a commitment to staying at the
                  forefront of technological advancements, I strive to deliver
                  solutions that are not just functional, but also innovative
                  and forward-thinking. My approach combines cutting-edge
                  technologies with a deep understanding of user needs,
                  resulting in digital products that truly make a difference.
                </p>
              </AnimatedGroup>

              <motion.div variants={itemVariants} className="pt-4">
                <div className="rounded-[calc(var(--radius)+0.125rem)]  p-0.5 inline-block">
                  <Link
                    href="/about"
                    className="inline-flex items-center px-6 py-3  rounded-full bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 transition-colors"
                  >
                    Continue Reading
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="relative space-y-8 px-6 py-6 rounded-xl bg-gradient-to-br from-emerald-950/50 to-emerald-900/20 border border-emerald-800/30 backdrop-blur-sm"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(4,120,87,0.15),transparent_70%)]" />
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-400/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-emerald-400/5 rounded-full blur-3xl" />

              <div className="relative space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center pt-2 gap-2">
                    <Box className="w-5 h-5 text-emerald-400" />
                    <h3 className="text-xl font-bold text-emerald-400">
                      Technologies I Build With
                    </h3>
                  </div>
                </div>

                <div className="space-y-6">
                  <TechSection
                    title="Frontend Development"
                    techs={frontendTech}
                    delay={0.1}
                  />
                  <TechSection
                    title="Backend Development"
                    techs={backendTech}
                    delay={0.3}
                  />
                  <TechSection
                    title="Tools & Platforms"
                    techs={toolsTech}
                    delay={0.5}
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
