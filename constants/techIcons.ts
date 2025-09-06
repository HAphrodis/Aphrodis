import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiTailwindcss,
  SiFigma,
  SiGithub,
  SiVercel,
  SiGraphql,
  SiBootstrap,
  SiGoogleanalytics,
  SiSass,
  SiCloudinary,
  SiRender,
} from "react-icons/si";
import { FaServer } from "react-icons/fa";
import type { IconType } from "react-icons";
import { FaNodeJs } from "react-icons/fa6";

export const getTechIcon = (techName: string): IconType | null => {
  const iconMap: { [key: string]: IconType } = {
    HTML: SiHtml5,
    CSS: SiCss3,
    JavaScript: SiJavascript,
    TypeScript: SiTypescript,
    React: SiReact,
    "Next.js": SiNextdotjs,
    "Node.js": FaNodeJs,
    Express: SiExpress,
    MongoDB: SiMongodb,
    PostgreSQL: SiPostgresql,
    TailwindCSS: SiTailwindcss,
    Figma: SiFigma,
    GitHub: SiGithub,
    Vercel: SiVercel,
    GraphQL: SiGraphql,
    Bootstrap: SiBootstrap,
    "Google Analytics": SiGoogleanalytics,
    Sass: SiSass,
    Cloudinary: SiCloudinary,
    Render: SiRender,
    // Add more mappings as needed
  };

  // Default icon for unknown technologies
  return iconMap[techName] || FaServer;
};
