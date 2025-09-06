"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Brain, Code2, Rocket, Star, Trophy, Award } from "lucide-react";
import type { JSX } from "react/jsx-runtime";

interface Skill {
  id: number;
  name: string;
  level: number;
  category: string;
  description: string;
  subskills: string[];
  inProgress?: boolean;
  icon: JSX.Element;
}

interface Achievement {
  id: number;
  title: string;
  date: string;
  description: string;
  type: "certification" | "award" | "milestone";
  icon: JSX.Element;
}

const skills: Skill[] = [
  {
    id: 1,
    name: "Frontend Development",
    level: 90,
    category: "Development",
    description: "Building responsive and interactive user interfaces",
    subskills: ["React", "Next.js", "TypeScript", "TailwindCSS"],
    icon: <Code2 className="w-5 h-5" />,
  },
  {
    id: 2,
    name: "Backend Development",
    level: 85,
    category: "Development",
    description: "Creating robust and scalable server-side applications",
    subskills: ["Node.js", "Express", "MongoDB", "PostgreSQL"],
    icon: <Rocket className="w-5 h-5" />,
  },
  {
    id: 3,
    name: "UI/UX Design",
    level: 75,
    category: "Design",
    description: "Designing intuitive and engaging user experiences",
    subskills: ["Figma", "Adobe XD", "Prototyping", "User Research"],
    inProgress: true,
    icon: <Brain className="w-5 h-5" />,
  },
];

const achievements: Achievement[] = [
  {
    id: 1,
    title: "AWS Certified Developer",
    date: "2024",
    description: "Associate level certification for AWS cloud development",
    type: "certification",
    icon: <Award className="w-5 h-5" />,
  },
  {
    id: 2,
    title: "Google Cloud Professional",
    date: "2024",
    description: "Professional certification for Google Cloud Platform",
    type: "certification",
    icon: <Trophy className="w-5 h-5" />,
  },
  {
    id: 3,
    title: "Open Source Contributor",
    date: "2023",
    description: "Active contributor to major open source projects",
    type: "milestone",
    icon: <Star className="w-5 h-5" />,
  },
];

const learningGoals = [
  {
    title: "Cloud Architecture",
    timeline: "Q2 2024",
    progress: 60,
    topics: ["AWS", "Azure", "GCP", "Kubernetes"],
  },
  {
    title: "Mobile Development",
    timeline: "Q3 2024",
    progress: 30,
    topics: ["React Native", "Flutter", "Mobile UI/UX"],
  },
  {
    title: "AI/ML Integration",
    timeline: "Q4 2024",
    progress: 20,
    topics: ["TensorFlow.js", "OpenAI API", "ML Models"],
  },
];

export default function SkillsPage() {
  const [selectedSkill, setSelectedSkill] = useState<number | null>(null);

  return (
    <div className="relative min-h-screen bg-[#002922] text-white">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(4,120,87,0.1),transparent_70%)]" />
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

      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold bg-gradient-to-r from-emerald-400 via-emerald-300 to-emerald-400 bg-clip-text text-transparent sm:text-6xl"
          >
            Skills Garden
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-lg text-emerald-300/60"
          >
            Growing and nurturing technical expertise through continuous
            learning
          </motion.p>
        </div>

        {/* Skills Tree */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-16">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onHoverStart={() => setSelectedSkill(skill.id)}
              onHoverEnd={() => setSelectedSkill(null)}
              className="relative"
            >
              <Card className="group relative overflow-hidden border-emerald-500/10 bg-emerald-950/40 backdrop-blur-sm hover:border-emerald-500/30 transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400">
                      {skill.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-xl text-emerald-400">
                          {skill.name}
                        </CardTitle>
                        {skill.inProgress && (
                          <Badge className="bg-blue-500">In Progress</Badge>
                        )}
                      </div>
                      <CardDescription className="text-emerald-300/60 mt-1">
                        {skill.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-emerald-400">Proficiency</span>
                      <span className="text-emerald-400">{skill.level}%</span>
                    </div>
                    <Progress value={skill.level} className="h-2" />
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {skill.subskills.map((subskill) => (
                      <Badge
                        key={subskill}
                        variant="outline"
                        className="border-emerald-500/20 text-emerald-400 hover:border-emerald-500/40"
                      >
                        {subskill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>

                {/* Growth Animation */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  animate={{
                    background:
                      selectedSkill === skill.id
                        ? "radial-gradient(circle at center, rgba(16,185,129,0.1) 0%, transparent 70%)"
                        : "none",
                  }}
                  transition={{ duration: 0.3 }}
                />
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Learning Goals */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center text-emerald-400 mb-8">
            Learning Goals
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {learningGoals.map((goal, index) => (
              <motion.div
                key={goal.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="p-6 rounded-xl border border-emerald-500/10 bg-emerald-950/40 backdrop-blur-sm"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-emerald-400">
                    {goal.title}
                  </h3>
                  <Badge className="bg-emerald-500/10 text-emerald-400">
                    {goal.timeline}
                  </Badge>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-emerald-300/60">Progress</span>
                      <span className="text-emerald-400">{goal.progress}%</span>
                    </div>
                    <Progress value={goal.progress} className="h-2" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {goal.topics.map((topic) => (
                      <Badge
                        key={topic}
                        variant="outline"
                        className="border-emerald-500/20 text-emerald-400"
                      >
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-center text-emerald-400 mb-8">
            Achievements
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="p-6 rounded-xl border border-emerald-500/10 bg-emerald-950/40 backdrop-blur-sm hover:border-emerald-500/30 transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                    {achievement.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-emerald-400">
                      {achievement.title}
                    </h3>
                    <p className="text-sm text-emerald-300/60">
                      {achievement.date}
                    </p>
                  </div>
                </div>
                <p className="text-emerald-100/80 text-sm">
                  {achievement.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
