// constants\profile-data.tsx
import type { ReactNode } from "react";
import { Mail, FileText } from "lucide-react";
import {
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaWhatsapp,
  FaXTwitter,
} from "react-icons/fa6";
import { SiLinktree, SiBluesky } from "react-icons/si";
import { FaTelegramPlane } from "react-icons/fa";

export interface WorkExperience {
  title: string;
  company: string;
  period: string;
  description: string;
  skills: string[];
  isPresent?: boolean;
}

export interface Study {
  title: string;
  subtitle: string;
  date: string;
  content: ReactNode;
}

export interface SkillCategory {
  title: string;
  skills: string[];
}

export const workExperiences: WorkExperience[] = [
  {
    title: "Fullstack Developer",
    company: "Freelancing",
    period: "June 2023 - Present",
    description:
      "Delivered high-quality full-stack websites for diverse clients, both solo and in collaborative teams. Specialized in modern technologies, including Next.js, React, TailwindCSS, Express.js, MongoDB, PostgreSQL, Redis and others. Tailored solutions to meet client needs, ensuring scalability and user satisfaction.",
    skills: [
      "React",
      "Next.js",
      "TailwindCSS",
      "Express.js",
      "MongoDB",
      "PostgreSQL",
      "Redis",
    ],
    isPresent: true,
  },
  {
    title: "Fullstack Developer - Internship",
    company: "Andela Rwanda",
    period: "September - November 2024",
    description:
      "Collaborated with a team to develop DevPulse, an internal platform for managing ratings in Ed-tech industries, with Andela as its first customer. Contributed to developing scalable and secure GraphQL APIs using Apollo Server and MongoDB, with robust authentication and authorization mechanisms. Assisted in building modern, responsive user interfaces with React, TypeScript, and TailwindCSS, ensuring an intuitive user experience.",
    skills: [
      "React",
      "TypeScript",
      "TailwindCSS",
      "GraphQL",
      "Apollo Server",
      "MongoDB",
    ],
  },
];

export const studiesData: Study[] = [
  // {
  //   title: "Computer Science",
  //   subtitle: "University of People",
  //   date: "November 2023 - Present",
  //   content: (
  //     <p>
  //       Currently pursuing a degree in Computer Science, focusing on advanced programming concepts, algorithms, and
  //       software engineering principles.
  //     </p>
  //   ),
  // },
  {
    title: "Fullstack Javascript Development",
    subtitle: "Andela Rwanda",
    date: "February - November 2024",
    content: (
      <p>
        Intensive training program focused on modern JavaScript development,
        including frontend frameworks like React, backend technologies like
        Node.js and Express, and database systems like MongoDB and PostgreSQL.
      </p>
    ),
  },
  {
    title: "Software Engineering",
    subtitle: "ALX Africa",
    date: "May 2022 - June 2023",
    content: (
      <p>
        Comprehensive software engineering program covering fundamental
        programming concepts, data structures, algorithms, and practical
        software development skills.
      </p>
    ),
  },
];

export const skillCategories: SkillCategory[] = [
  {
    title: "Frontend Development",
    skills: [
      "HTML/CSS",
      "Sass",
      "TailwindCSS",
      "Bootstrap",
      "JavaScript/TypeScript",
      "React.js",
      "Next.js",
    ],
  },
  {
    title: "Backend Development",
    skills: [
      "Node.js",
      "Express",
      "MongoDB",
      "PostgreSQL",
      "GraphQL",
      "Redis",
      "RESTful APIs",
    ],
  },
  {
    title: "Tools & Technologies",
    skills: [
      "Git",
      "GitHub",
      "Trello",
      "Notion",
      "Vercel",
      "PivotalTrack",
      "Figma",
    ],
  },
];

export const personalInfo = {
  name: "Ishimwe Jean Baptiste",
  title: "Full Stack Developer",
  bio: "Developer with comprehensive experience in both frontend and backend development. Proficient in modern libraries and frameworks, I am dedicated to crafting exceptional user experiences through intuitive interfaces and robust backend solutions.",
  social: {
    github: "https://github.com/hbapte",
    linkedin: "https://linkedin.com/in/hbapte",
    email: "ijbapte@gmail.com",
  },
  location: "Kigali, Rwanda",
  phone: "+250785577189",
};

export const primaryLinks = [
  {
    title: "Email",
    url: "mailto:ijbapte@gmail.com",
    icon: Mail,
    color: "bg-gradient-to-r from-emerald-600 to-emerald-400",
    description: "Get in touch via email",
  },
  {
    title: "Resume",
    url: "https://rxresu.me/ijbapte/hbapte-copy",
    icon: FileText,
    color: "bg-gradient-to-r from-emerald-500 to-emerald-300",
    description: "View my professional experience",
  },
];

export const socialLinks = [
  {
    title: "GitHub",
    url: "https://github.com/hbapte",
    icon: FaGithub,
    color: "hover:bg-zinc-900 hover:text-white",
    description: "Check out my code repositories",
  },
  {
    title: "LinkedIn",
    url: "https://www.linkedin.com/in/hbapte",
    icon: FaLinkedin,
    color: "hover:bg-[#0077B5] hover:text-white",
    description: "Connect with me professionally",
  },
  {
    title: "Bluesky",
    url: "https://bsky.app/profile/hbapte.bsky.social",
    icon: SiBluesky,
    color: "hover:bg-[#0085ff] hover:text-white",
    description: "Follow me on Bluesky",
  },
  {
    title: "Twitter / X",
    url: "https://x.com/HBaptee",
    icon: FaXTwitter,
    color: "hover:bg-black hover:text-white",
    description: "Follow me for tech updates",
  },
  {
    title: "Instagram",
    url: "https://www.instagram.com/hbapte",
    icon: FaInstagram,
    color: "hover:bg-[#E4405F] hover:text-white",
    description: "Behind the scenes moments",
  },
  {
    title: "WhatsApp",
    url: "https://api.whatsapp.com/send?phone=250785577189",
    icon: FaWhatsapp,
    color: "hover:bg-[#25D366] hover:text-white",
    description: "Direct messaging",
  },
  {
    title: "Telegram",
    url: "https://t.me/hbapte",
    icon: FaTelegramPlane,
    color: "hover:bg-[#0088cc] hover:text-white",
    description: "Quick chat and updates",
  },
  {
    title: "Linktree",
    url: "https://linktr.ee/hbapte",
    icon: SiLinktree,
    color: "hover:bg-[#43E660] hover:text-white",
    description: "All my links in one place",
  },
];
