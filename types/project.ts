export interface Tool {
  name: string;
}

export interface Project {
  title: string;
  startDate?: string;
  releaseDate?: string;
  url: string;
  githubUrl?: string;
  screenshot?: string;
  description: string;
  tech: Tool[];
  isPrivate?: boolean;
  isFeatured?: boolean;
  longDescription?: string;
  features?: string[];
  challenges?: string[];
  outcomes?: string[];
}