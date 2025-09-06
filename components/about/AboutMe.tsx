// components\about\AboutMe.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { MouseLight } from "@/components/shared/mouse-light";
import { AnimatedTimeline } from "@/components/about/animated-timeline";
import { SidebarNav } from "@/components/about/sidebar-nav";
import {
  workExperiences,
  studiesData,
  skillCategories,
  personalInfo,
} from "@/constants/profile-data";
import { TextEffect } from "@/components/motion-primitives/text-effect";
import { AnimatedGroup } from "@/components/motion-primitives/animated-group";
import { motion, useInView } from "framer-motion";
import { SkillsShowcase } from "@/components/about/skills-showcase";
import { ParticlesBackground } from "@/components/shared/particles-background";
import { ProfileSection } from "./profile-section";

export default function AboutPageComponent() {
  const [activeSection, setActiveSection] = useState("introduction");

  const introRef = useRef<HTMLElement>(null);
  const workRef = useRef<HTMLElement>(null);
  const studiesRef = useRef<HTMLElement>(null);
  const skillsRef = useRef<HTMLElement>(null);

  const isIntroInView = useInView(introRef, { once: true, amount: 0.3 });
  const isWorkInView = useInView(workRef, { once: true, amount: 0.3 });
  const isStudiesInView = useInView(studiesRef, { once: true, amount: 0.3 });
  const isSkillsInView = useInView(skillsRef, { once: true, amount: 0.3 });

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;

      const sections = [
        { id: "introduction", ref: introRef },
        { id: "work", ref: workRef },
        { id: "studies", ref: studiesRef },
        { id: "skills", ref: skillsRef },
      ];

      for (const section of sections) {
        if (section.ref.current) {
          const { offsetTop, offsetHeight } = section.ref.current;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["introduction", "work", "studies", "skills"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#002922]">
      <MouseLight />
      <ParticlesBackground />

      <div className="container mx-auto px-4 pt-20 pb-32 lg:grid lg:grid-cols-[240px_1fr] lg:gap-8">
        {/* Sidebar Navigation */}
        <SidebarNav activeSection={activeSection} />

        {/* Main Content */}
        <main className="space-y-12">
          <ProfileSection
            name={personalInfo.name}
            title={personalInfo.title}
            imageSrc="/profile-pic.png"
          />

          {/* Introduction Section */}
          <section id="introduction" ref={introRef} className="relative">
            <motion.div
              initial={{ opacity: 0 }}
              animate={isIntroInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute -left-20 -top-20 w-40 h-40 bg-emerald-400/5 rounded-full blur-3xl"
            />

            <TextEffect
              preset="fade-in-blur"
              speedSegment={0.3}
              trigger={isIntroInView}
              as="h2"
              className="text-3xl font-bold text-white mb-8"
            >
              Summary
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
              className="space-y-6 text-white/80 leading-relaxed"
            >
              <p>
                Developer with comprehensive experience in both frontend and
                backend development. Proficient in modern libraries and
                frameworks, I am dedicated to crafting exceptional user
                experiences through intuitive interfaces and robust backend
                solutions.
              </p>
              <p>
                I specialize in building responsive, accessible, and performant
                web applications using modern technologies like React, Next.js,
                and TypeScript. On the backend, I work with Node.js, Express,
                MongoDB, and PostgreSQL to create scalable and secure APIs.
              </p>
              <p>
                Based in Kigali, Rwanda, I&apos;m passionate about creating
                digital solutions that solve real-world problems and deliver
                exceptional user experiences.
              </p>
            </AnimatedGroup>
          </section>

          {/* Work Experience Section */}
          <section id="work" ref={workRef} className="space-y-12  relative">
            <motion.div
              initial={{ opacity: 0 }}
              animate={isWorkInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute -right-20 -top-20 w-40 h-40 bg-emerald-400/5 rounded-full blur-3xl"
            />

            <TextEffect
              preset="fade-in-blur"
              speedSegment={0.3}
              trigger={isWorkInView}
              as="h2"
              className="text-3xl font-bold text-white"
            >
              Work Experience
            </TextEffect>

            <div className="space-y-12">
              {workExperiences.map((job, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group relative overflow-hidden rounded-2xl border border-emerald-500/10 bg-emerald-950/30 backdrop-blur-sm p-6 transition-all hover:bg-emerald-950/50 hover:border-emerald-500/30 hover:shadow-[0_0_25px_rgba(16,185,129,0.1)]"
                >
                  {job.isPresent && (
                    <div className="absolute -right-2 -top-1">
                      <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-sm font-medium text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                        Present
                      </span>
                    </div>
                  )}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-semibold text-white group-hover:text-emerald-400 transition-colors">
                        {job.title}
                      </h3>
                      <p className="text-emerald-400/80">{job.company}</p>
                    </div>
                    <span className="text-sm text-white/90 bg-emerald-950/50 px-3 py-1 rounded-full border border-emerald-500/30">
                      {job.period}
                    </span>
                  </div>
                  <p className="mt-4 text-white/80">{job.description}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {job.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="rounded-full bg-emerald-950/50 border border-emerald-500/10 px-3 py-1 text-sm text-emerald-400 transition-all hover:bg-emerald-500/10 hover:border-emerald-500/30"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Hover glow effect */}
                  <div className="absolute inset-0 -z-10 bg-gradient-to-r from-emerald-500/0 via-emerald-500/5 to-emerald-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Studies Section */}
          <section
            id="studies"
            ref={studiesRef}
            className="space-y-12 relative"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={isStudiesInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute -left-20 -top-20 w-40 h-40 bg-emerald-400/5 rounded-full blur-3xl"
            />

            <TextEffect
              preset="fade-in-blur"
              speedSegment={0.3}
              trigger={isStudiesInView}
              as="h2"
              className="text-3xl font-bold text-white"
            >
              Education
            </TextEffect>

            <AnimatedTimeline data={studiesData} />
          </section>

          {/* Technical Skills Section */}
          <section id="skills" ref={skillsRef} className="space-y-12 relative">
            <motion.div
              initial={{ opacity: 0 }}
              animate={isSkillsInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute -right-20 -top-20 w-40 h-40 bg-emerald-400/5 rounded-full blur-3xl"
            />

            <TextEffect
              preset="fade-in-blur"
              speedSegment={0.3}
              trigger={isSkillsInView}
              as="h2"
              className="text-3xl font-bold text-white"
            >
              Technical Skills
            </TextEffect>

            <SkillsShowcase categories={skillCategories} />
          </section>
        </main>
      </div>
    </div>
  );
}
