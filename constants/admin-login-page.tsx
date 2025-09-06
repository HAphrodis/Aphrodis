import {
  BarChart3,
  Users,
  MessageSquare,
  FileText,
  Image,
  Settings,
  Mail,
  Globe,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { JSX } from "react/jsx-runtime";

export interface AdminFeature {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export const portfolioAdminFeatures: AdminFeature[] = [
  {
    id: "dashboard",
    title: "Dashboard Analytics",
    description:
      "Track portfolio visitors, page views, and engagement metrics in real-time",
    icon: "BarChart3",
  },
  {
    id: "subscribers",
    title: "Subscriber Management",
    description: "Manage newsletter subscribers and send personalized updates",
    icon: "Users",
  },
  {
    id: "messages",
    title: "Contact Messages",
    description: "View and respond to messages from your contact form",
    icon: "MessageSquare",
  },
  {
    id: "projects",
    title: "Project Management",
    description:
      "Add, edit, and organize your portfolio projects and case studies",
    icon: "FileText",
  },
  {
    id: "media",
    title: "Media Library",
    description:
      "Upload and manage images, videos, and documents for your portfolio",
    icon: "Image",
  },
  {
    id: "settings",
    title: "Site Settings",
    description:
      "Customize your portfolio appearance, SEO, and performance settings",
    icon: "Settings",
  },
  {
    id: "newsletter",
    title: "Newsletter Campaigns",
    description:
      "Create and schedule newsletter campaigns to engage with your audience",
    icon: "Mail",
  },
  {
    id: "domains",
    title: "Domain Management",
    description: "Manage your custom domains and SSL certificates",
    icon: "Globe",
  },
];

export const getIconComponent = (iconName: string): JSX.Element => {
  const iconMap: Record<string, LucideIcon> = {
    BarChart3,
    Users,
    MessageSquare,
    FileText,
    Image,
    Settings,
    Mail,
    Globe,
  };

  const IconComponent = iconMap[iconName];
  return IconComponent ? <IconComponent className="h-5 w-5" /> : <></>;
};
