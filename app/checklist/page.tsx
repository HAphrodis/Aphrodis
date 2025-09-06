"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Code2,
  Smartphone,
  Radio,
  Rocket,
  Brain,
  CheckCircle2,
  Timer,
  ArrowRight,
} from "lucide-react";
import { useState } from "react";
import type { JSX } from "react";
import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ParticlesBackground } from "@/components/shared/particles-background";
import PageHeader from "@/components/shared/page-header";

interface Goal {
  id: number;
  title: string;
  description: string;
  category: "learning" | "development" | "open-source";
  status: "planned" | "in-progress" | "completed";
  timeline: string;
  icon: JSX.Element;
  technologies?: string[];
}

const goals: Goal[] = [
  {
    id: 1,
    title: "Master Vue.js Ecosystem",
    description:
      "Deep dive into Vue 3, Vuex, Vue Router, and Nuxt.js. Build real-world applications to solidify knowledge.",
    category: "learning",
    status: "completed",
    timeline: "Q1 2025",
    icon: <Radio className="w-5 h-5" />,
    technologies: ["Vue.js", "Nuxt.js", "Vuex"],
  },
  {
    id: 2,
    title: "Explore Vite & Astro",
    description:
      "Learn and implement projects using Vite for fast development and Astro for content-focused websites.",
    category: "learning",
    status: "in-progress",
    timeline: "Q1-Q2 2025",
    icon: <Rocket className="w-5 h-5" />,
    technologies: ["Vite", "Astro"],
  },
  {
    id: 3,
    title: "Backend Evolution with NestJS & Hono",
    description:
      "Enhance backend development skills with NestJS framework and explore Hono for edge computing.",
    category: "learning",
    status: "planned",
    timeline: "Q2 2025",
    icon: <Brain className="w-5 h-5" />,
    technologies: ["NestJS", "HonoJS"],
  },
  {
    id: 4,
    title: "First Mobile App",
    description:
      "Develop and publish first cross-platform mobile application for Android & iOS using React Native.",
    category: "development",
    status: "planned",
    timeline: "Q2-Q3 2025",
    icon: <Smartphone className="w-5 h-5" />,
    technologies: ["React Native", "Expo"],
  },
  {
    id: 5,
    title: "DentRW V2",
    description:
      "Rebuild DentRW with enhanced features, better UI/UX, and modern tech stack. Open source the project.",
    category: "open-source",
    status: "planned",
    timeline: "Q3 2025",
    icon: <Code2 className="w-5 h-5" />,
    technologies: ["Next.js", "TailwindCSS", "TypeScript"],
  },
];

const categoryColors = {
  learning: {
    bg: "bg-blue-500",
    border: "border-blue-400",
    text: "text-blue-400",
    light: "bg-blue-500/10",
    accent: "#3B82F6",
  },
  development: {
    bg: "bg-purple-500",
    border: "border-purple-400",
    text: "text-purple-400",
    light: "bg-purple-500/10",
    accent: "#8B5CF6",
  },
  "open-source": {
    bg: "bg-emerald-500",
    border: "border-emerald-400",
    text: "text-emerald-400",
    light: "bg-emerald-500/10",
    accent: "#10B981",
  },
};

const statusIcons = {
  planned: <Timer className="w-5 h-5" />,
  "in-progress": <ArrowRight className="w-5 h-5" />,
  completed: <CheckCircle2 className="w-5 h-5" />,
};

const statusColors = {
  planned: "text-amber-400",
  "in-progress": "text-blue-400",
  completed: "text-emerald-400",
};

export default function RoadmapPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("all");
  const [expandedGoal, setExpandedGoal] = useState<number | null>(null);

  const filteredGoals = selectedCategory
    ? goals.filter((goal) => goal.category === selectedCategory)
    : goals;

  const calculateProgress = () => {
    const completed = goals.filter(
      (goal) => goal.status === "completed",
    ).length;
    return (completed / goals.length) * 100;
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    if (value === "all") {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(value);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#001a18] via-[#002922] to-[#001a18] text-white overflow-hidden">
      <PageHeader
        highlightedTitle="Vision"
        title="2025"
        subtitle="Tracking my journey through learning, development, and open-source contributions"
      />

      <ParticlesBackground />

      {/* Animated Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(4,120,87,0.15),transparent_70%)]" />
      <motion.div
        initial={{ backgroundPositionY: "0%" }}
        animate={{ backgroundPositionY: "100%" }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 25px 25px, rgba(4, 120, 87, 0.15) 2%, transparent 0%)",
          backgroundSize: "50px 50px",
        }}
      />

      {/* Floating Particles */}

      <div className="relative mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 relative"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="absolute -top-12 left-1/2 -translate-x-1/2 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl"
          />

          {/* Overall Progress */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-8 max-w-md mx-auto"
          >
            <div className="flex justify-between text-sm text-emerald-400 mb-2">
              <span>Overall Progress</span>
              <span>{Math.round(calculateProgress())}%</span>
            </div>
            <div className="relative h-4 rounded-full overflow-hidden bg-black/20 backdrop-blur-sm border border-emerald-500/20">
              <Progress value={calculateProgress()} className="h-full" />
              <motion.div
                className="absolute top-0 left-0 w-full h-full opacity-50"
                animate={{
                  background: [
                    "linear-gradient(90deg, rgba(16,185,129,0.1) 0%, rgba(16,185,129,0.3) 50%, rgba(16,185,129,0.1) 100%)",
                    "linear-gradient(90deg, rgba(16,185,129,0.3) 0%, rgba(16,185,129,0.1) 50%, rgba(16,185,129,0.3) 100%)",
                  ],
                }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <Tabs
            defaultValue="all"
            value={activeTab}
            onValueChange={handleTabChange}
            className="w-full"
          >
            <div className="flex justify-center">
              <TabsList className="grid grid-cols-4 w-full max-w-2xl bg-black/20 backdrop-blur-md border border-emerald-500/20">
                <TabsTrigger
                  value="all"
                  className="data-[state=active]:bg-emerald-500/20 data-[state=active]:text-emerald-400"
                >
                  All Goals
                </TabsTrigger>
                <TabsTrigger
                  value="learning"
                  className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400"
                >
                  Learning
                </TabsTrigger>
                <TabsTrigger
                  value="development"
                  className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400"
                >
                  Development
                </TabsTrigger>
                <TabsTrigger
                  value="open-source"
                  className="data-[state=active]:bg-emerald-500/20 data-[state=active]:text-emerald-400"
                >
                  Open Source
                </TabsTrigger>
              </TabsList>
            </div>
          </Tabs>
        </motion.div>

        {/* Checklist */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory || "all"}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-4 max-w-4xl mx-auto"
          >
            <div className="bg-black/20 backdrop-blur-md rounded-xl border border-emerald-500/20 overflow-hidden">
              <ul className="divide-y divide-white/10">
                {filteredGoals.map((goal, index) => (
                  <motion.li
                    key={goal.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={cn(
                      "relative",
                      goal.status === "completed"
                        ? "bg-emerald-950/30"
                        : "hover:bg-white/5",
                    )}
                  >
                    <div
                      className={cn(
                        "px-6 py-5 cursor-pointer transition-all",
                        expandedGoal === goal.id ? "pb-3" : "",
                      )}
                      onClick={() =>
                        setExpandedGoal(
                          expandedGoal === goal.id ? null : goal.id,
                        )
                      }
                    >
                      <div className="flex items-center gap-4">
                        {/* Status Indicator */}
                        <div
                          className={cn(
                            "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center",
                            goal.status === "completed"
                              ? "bg-emerald-500/20"
                              : goal.status === "in-progress"
                                ? "bg-blue-500/20"
                                : "bg-amber-500/20",
                          )}
                        >
                          <motion.div
                            animate={
                              goal.status === "completed"
                                ? {
                                    scale: [1, 1.2, 1],
                                  }
                                : {}
                            }
                            transition={{
                              duration: 2,
                              repeat: Number.POSITIVE_INFINITY,
                              repeatType: "reverse",
                            }}
                            className={cn(statusColors[goal.status])}
                          >
                            {statusIcons[goal.status]}
                          </motion.div>
                        </div>

                        {/* Category Indicator */}
                        <div
                          className={cn(
                            "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center",
                            categoryColors[goal.category].light,
                          )}
                        >
                          <span className={categoryColors[goal.category].text}>
                            {goal.icon}
                          </span>
                        </div>

                        {/* Title and Timeline */}
                        <div className="flex-grow min-w-0">
                          <div className="flex items-center justify-between">
                            <h3
                              className={cn(
                                "text-lg font-medium",
                                goal.status === "completed"
                                  ? "line-through decoration-wavy decoration-emerald-500/70"
                                  : "",
                              )}
                            >
                              {goal.title}

                              {/* Creative strikethrough animation for completed items */}
                              {goal.status === "completed" && (
                                <motion.div
                                  className="absolute left-0 opacity-40 top-1/2 h-0.5 bg-emerald-500/70"
                                  initial={{ width: 0 }}
                                  animate={{ width: "100%" }}
                                  transition={{
                                    duration: 0.5,
                                    ease: "easeInOut",
                                  }}
                                />
                              )}
                            </h3>
                            <div className="flex items-center gap-2">
                              <Badge
                                className={`${
                                  categoryColors[goal.category].bg
                                } text-white border-none px-2 py-0.5 text-xs uppercase tracking-wider`}
                              >
                                {goal.category}
                              </Badge>
                              <span className="text-sm font-mono text-white/60">
                                {goal.timeline}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Expanded Content */}
                      <AnimatePresence>
                        {expandedGoal === goal.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="mt-4 pl-20 pr-4 overflow-hidden"
                          >
                            <p className="text-white/80 mb-4">
                              {goal.description}
                            </p>

                            {goal.technologies && (
                              <div className="flex flex-wrap gap-2 mb-2">
                                {goal.technologies.map((tech) => (
                                  <motion.span
                                    key={tech}
                                    whileHover={{ scale: 1.05 }}
                                    className={cn(
                                      "px-2.5 py-1 text-xs rounded-full border transition-colors duration-300",
                                      categoryColors[goal.category].text,
                                      "bg-black/30 backdrop-blur-sm",
                                      "border-current/30",
                                    )}
                                  >
                                    {tech}
                                  </motion.span>
                                ))}
                              </div>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Left Border Accent */}
                    <div
                      className={cn(
                        "absolute left-0 top-0 w-1 h-full",
                        goal.status === "completed"
                          ? "bg-emerald-500"
                          : goal.status === "in-progress"
                            ? "bg-blue-500"
                            : "bg-amber-500",
                      )}
                    />
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
