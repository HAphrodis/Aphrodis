"use client";

import { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { Box } from "lucide-react";
import { AnimatedGroup } from "@/components/motion-primitives/animated-group";
import PageHeader from "@/components/shared/page-header";

// Tech stack data
const frontendTech = [
  { label: "HTML5", icon: "devicon-html5-plain", color: "#E44D26" },
  { label: "CSS3", icon: "devicon-css3-plain", color: "#1572B6" },
  { label: "JavaScript", icon: "devicon-javascript-plain", color: "#F7DF1E" },
  { label: "TypeScript", icon: "devicon-typescript-plain", color: "#3178C6" },
  { label: "React.js", icon: "devicon-react-original", color: "#61DAFB" },
  { label: "Next.js", icon: "devicon-nextjs-plain", color: "#000000" },
  { label: "TailwindCSS", icon: "devicon-tailwindcss-plain", color: "#06B6D4" },
  { label: "Bootstrap", icon: "devicon-bootstrap-plain", color: "#7952B3" },
];

const backendTech = [
  { label: "Node.js", icon: "devicon-nodejs-plain", color: "#339933" },
  { label: "MongoDB", icon: "devicon-mongodb-plain", color: "#47A248" },
  { label: "PostgreSQL", icon: "devicon-postgresql-plain", color: "#336791" },
];

// ...existing code...
const toolsTech = [
  { label: "Git", icon: "devicon-git-plain", color: "#F05032" },
  { label: "GitHub", icon: "devicon-github-original", color: "#181717" },
  { label: "Figma", icon: "devicon-figma-plain", color: "#F24E1E" },
  { label: "VS Code", icon: "devicon-visualstudio-plain", color: "#007ACC" },
  { label: "Vercel", icon: "devicon-vercel-plain", color: "#000000" },
  { label: "Postman", icon: "devicon-postman-plain", color: "#FF6C37" },
  { label: "Illustrator", icon: "devicon-illustrator-plain", color: "#FF9A00" },
  { label: "Photoshop", icon: "devicon-photoshop-plain", color: "#31A8FF" },
  {
    label: "InDesign",
    customIcon: (
      <svg viewBox="0 0 32 32" width="1em" height="1em">
        <rect width="32" height="32" rx="6" fill="#FF3366"/>
        <text x="7" y="23" fontFamily="Arial, Helvetica, sans-serif" fontWeight="bold" fontSize="16" fill="#fff">Id</text>
      </svg>
    ),
    color: "#FF3366",
  },
  { label: "Premiere Pro", icon: "devicon-premierepro-plain", color: "#9999FF" },
  { label: "After Effects", icon: "devicon-aftereffects-plain", color: "#9999FF" },
  // New additions:
  // { label: "Python", icon: "devicon-python-plain", color: "#3776AB" },
  {
    label: "SPSS",
    customIcon: (
      <svg viewBox="0 0 32 32" width="1em" height="1em">
        <rect width="32" height="32" rx="6" fill="#4D6FAC"/>
        <text x="4" y="23" fontFamily="Arial, Helvetica, sans-serif" fontWeight="bold" fontSize="16" fill="#fff">SPSS</text>
      </svg>
    ),
    color: "#4D6FAC",
  },
  {
    label: "CSPro",
    customIcon: (
      <svg viewBox="0 0 32 32" width="1em" height="1em">
        <rect width="32" height="32" rx="6" fill="#008080"/>
        <text x="4" y="23" fontFamily="Arial, Helvetica, sans-serif" fontWeight="bold" fontSize="16" fill="#fff">CS</text>
      </svg>
    ),
    color: "#008080",
  },
  {
    label: "ArcGIS",
    customIcon: (
      <svg viewBox="0 0 32 32" width="1em" height="1em">
        <circle cx="16" cy="16" r="16" fill="#1EAF4B"/>
        <text x="7" y="23" fontFamily="Arial, Helvetica, sans-serif" fontWeight="bold" fontSize="14" fill="#fff">Arc</text>
      </svg>
    ),
    color: "#1EAF4B",
  },
];
// ...existing code...

const TechBadge = ({
  label,
  icon,
  customIcon,
  color,
}: {
  label: string;
  icon?: string;
  customIcon?: React.ReactNode;
  color?: string;
}) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100/40 rounded-2xl border border-emerald-800/30 hover:border-emerald-400/50 transition-colors"
  >
    {customIcon ? (
      <span className="text-xl">{customIcon}</span>
    ) : (
      <i className={cn(icon, "text-xl")} style={{ color: color ?? "#10B981" }} />
    )}
    <span className="text-sm font-mono text-emerald-100/80">{label}</span>
  </motion.div>
);

const TechSection = ({
  title,
  techs,
  delay = 0,
}: {
  title: string;
  techs: { label: string; icon?: string; customIcon?: React.ReactNode }[];
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
    <h4 className="text-sm font-medium text-white/90 uppercase tracking-wider">
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
      ref={ref}
      className="relative min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900  text-white pb-20 overflow-hidden"
    >
       <PageHeader
              title="About Me"
              highlightedTitle=""
              subtitle="A showcase of latest projects, highlighting web apps, design systems, and digital experiences that reflect my enthusiasm for crafting innovative solutions."
            />
      {/* Background Effects */}
      <div
        aria-hidden
        className="absolute inset-0 isolate opacity-65 contain-strict"
      >
        <div className="w-[35rem] h-[80rem] translate-y-[10rem] absolute right-0 top-0 rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(160,100%,85%,.05)_0,hsla(160,100%,55%,.01)_50%,hsla(160,100%,45%,0)_80%)]" />
        <div className="h-[80rem] absolute right-0 top-0 w-60 rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(160,100%,85%,.04)_0,hsla(160,100%,45%,.01)_80%,transparent_100%)] [translate:5%_-50%]" />
      </div>

      <div className="absolute inset-0 -z-10 size-full [background:radial-gradient(125%_125%_at_50%_10%,transparent_0%,#002922_75%)]"></div>

      <div className="container mx-auto px-4 pt-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="space-y-16"
        >
          {/* <TextEffect
            preset="fade-in-blur"
            speedSegment={0.3}
            as="h2"
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-center bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-white"
          >
            {"About Me"}
          </TextEffect> */}

          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start"
          >
            <motion.div variants={itemVariants} className="space-y-6 pr-6">
           
                <div className="p-8 bg-gradient-to-br from-purple-100/10 to-purple-100/5 bg-opacity-90 rounded-xl shadow-lg backdrop-blur-lg hover:scale-105 transform transition duration-300 ease-in-out">
                  <p className="text-gray-200 mb-6 text-lg">
                I am Aphrodis Hakuzweyezu, an Environmental Health Practitioner and full-stack 
                developer in Kigali, Rwanda, combining science, technology, and design to create innovative, 
                impactful solutions for positive change through communication and technical expertise.
            </p>
            <div className="space-y-6">
              <div className="flex items-center space-x-4 p-4 bg-gradient-to-tr from-purple-200 via-blue-200 to-green-200 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                <div className="p-3 bg-white rounded-full shadow-lg hover:scale-110 transform transition duration-300">
                  <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17 20v-2a4 4 0 00-4-4H9a4 4 0 00-4 4v2H17z" />
                    <circle cx="12" cy="8" r="4" /> 
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-700">Dedicated Team</h3>
                  <p className="text-gray-500 text-sm">
                    Experienced in leading teams and collaborating with health professionals, designers, and developers to achieve project goals.
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-4 bg-gradient-to-tr from-purple-200 via-blue-200 to-green-200 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                <div className="p-3 bg-white rounded-full shadow-lg hover:scale-110 transform transition duration-300">
                  <svg className="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 21h6v-1H9v1zm3-18a4 4 0 00-4 4c0 1.38.56 2.63 1.46 3.54A5.978 5.978 0 009 12h6a5.978 5.978 0 00-1.46-3.46A4 4 0 0015 7a4 4 0 00-4-4z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-700">Innovative Approach</h3>
                  <p className="text-gray-500 text-sm">
                    Skilled in using modern tools like Adobe Creative Suite, Microsoft Office, and web technologies to create engaging, effective solutions.
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-4 bg-gradient-to-tr from-purple-200 via-blue-200 to-green-200 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                <div className="p-3 bg-white rounded-full shadow-lg hover:scale-110 transform transition duration-300">
                  <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M16 14c-1.33 0-2.53.53-3.41 1.39A4.993 4.993 0 0012 20c1.33 0 2.53-.53 3.41-1.39A4.993 4.993 0 0016 14zM8 14c-1.33 0-2.53.53-3.41 1.39A4.993 4.993 0 004 20c1.33 0 2.53-.53 3.41-1.39A4.993 4.993 0 008 14zM12 4c-2.21 0-4 1.79-4 4 0 1.66 1.34 3 3 3h2c1.66 0 3-1.34 3-3 0-2.21-1.79-4-4-4z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-700">Customer Centric</h3>
                  <p className="text-gray-500 text-sm">
                    Focused on understanding client and community needs, ensuring solutions are practical, user-friendly, and impactful.
                  </p>
                </div>
              </div>
            </div>  
    </div>
  
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="relative space-y-8 px-6 py-6 rounded-xl bg-gradient-to-br from-purple-100/10 to-purple-100/5 border border-Purple-100/30 backdrop-blur-sm"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(4,120,87,0.15),transparent_70%)]" />
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-emerald-400/5 rounded-full blur-3xl" />

              <div className="relative space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center pt-2 gap-2">
                    <Box className="w-5 h-5 text-white" />
                    <h3 className="text-xl font-bold text-White">
                     Technical Skills
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
