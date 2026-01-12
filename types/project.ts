// types\project.ts
export interface Tool {
  name: string;
  version?: string;
  url?: string;
}

export interface TeamMember {
  name: string;
  role: string;
  profileUrl?: string;
  email?: string;
  avatarUrl?: string;
  githubUrl?: string;
  linkedInUrl?: string;
}

export type ProjectStatus =
  | "planned"
  | "in-progress"
  | "completed"
  | "archived";

export type ProjectCategory =
  | "e-commerce"
  | "healthcare"
  | "ngo-nonprofit"
  | "corporate"
  | "education"
  | "portfolio"
  | "saas"
  | "marketplace"
  | "blog";

export type ProjectComplexity = "simple" | "medium" | "complex" | "enterprise";

export interface ProjectMetrics {
  users?: string;
  transactions?: string;
  performance?: string;
  uptime?: string;
  conversionRate?: string;
  loadTime?: string;
  customMetric?: {
    label: string;
    value: string;
  };
}

export interface RoomForImprovement {
  [key: string]: string;
}

export interface Project {
  title: string;
  startDate?: string;
  releaseDate?: string;
  endDate?: string;
  url: string;
  githubUrl: string;
  screenshot?: string;
  description: string;
  longDescription?: string;
  tools: Tool[];
  tags?: string[];
  team?: TeamMember[];
  status?: ProjectStatus;
  isPrivate?: boolean;
  isFeatured?: boolean;
  features?: string[];
  challenges?: string[];
  outcomes?: string[];
  inProgress?: string[];
  roomForImprovement?: RoomForImprovement;
  awards?: string[];
  client?: string;
  responsibilities?: string[];
  demoVideoUrl?: string;
  documentationUrl?: string;
  category: ProjectCategory;
  complexity: ProjectComplexity;
  metrics?: ProjectMetrics;
  keyTechnologies?: string[];
  projectDuration?: string;
  teamSize?: number;
  impact?: string[];
  testimonial?: {
    text: string;
    author: string;
    role: string;
    company?: string;
  };
}
