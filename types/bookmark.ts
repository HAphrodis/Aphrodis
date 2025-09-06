import { type LucideIcon } from "lucide-react";
import { IconType } from "react-icons";

export interface Bookmark {
  title: string;
  url: string;
  description: string;
  category: string;
  icon: LucideIcon | IconType;
}

export interface BookmarkGridProps {
  bookmarks: Bookmark[];
  searchQuery: string;
}

export interface BookmarkCardProps {
  bookmark: Bookmark;
  index: number;
}
