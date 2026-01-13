// constants\navItem.tsx
"use client";

import { usePathname } from "next/navigation";
import {
  Home,
  User,
  Briefcase,
  Newspaper,
  Wrench,
  Book,
  Link,
  Grid,
  BookOpen,
  ImageIcon,
  User2,
  ChevronDown,
  CodeXml,
  Bookmark,
  LinkIcon,
  ListTodo,
  Award,
} from "lucide-react";
import {
  Dropdown,
  Tab,
  Tabs,
  Trigger,
  TriggerWrapper,
} from "@/components/common/dropdown";
import { MoreDropdown } from "@/components/common/dropdown/more-dropdown";
import { de } from "@faker-js/faker";
import { description } from "@/app/admin/dashboard/overview/_components/bar-graph";
// import { ServicesDropdown } from "@/components/common/dropdown/services-dropdown";

const navItemsData = [
  {
    title: "Home",
    url: "/",
    icon: Home,
    description: "Welcome to my forever work-in-progress!",
    group: "Navigation",
  },
  {
    title: "About",
    url: "/about",
    icon: User,
    description: "Learn more about me!",
    group: "Navigation",
  },
  {
    title: "Projects",
    url: "/work",
    icon: Briefcase,
    description: "Showcase of my projects",
    group: "Navigation",
  },
  {
    title: "Blog",
    url: "/blog",
    icon: Newspaper,
    description: "Thoughts, mental models, and tutorials",
    group: "Navigation",
  },
  {
    title: "Services",
    url: "/services",
    icon: Wrench,
    description: "What I can help you with",
    group: "Navigation",
  },
  {
    title: "Guestbook",
    url: "/guestbook",
    icon: Book,
    description: "Leave a message for me",
    group: "Navigation",
  },
  {
    title: "Links",
    url: "/links",
    icon: Link,
    description: "All my links are here",
    group: "Navigation",
  },
  {
    title: "Attributions",
    url: "/attributions",
    icon: Book,
    description: "Credits and acknowledgments",
    group: "Navigation",
  },
  {
    title: "Checklist",
    url: "/checklist",
    icon: Book,
    description: "Things to do in 2025",
    group: "Navigation",
  },
  {
    title: "Lab",
    url: "/lab",
    icon: Book,
    description: "Code snippets, features and tools",
    group: "Navigation",
  },
  {
    title: "Bookmarks",
    url: "/bookmarks",
    icon: Book,
    description: "Often used web and services",
    group: "Navigation",
  },
];

export function useNavItems() {
  const pathname = usePathname();
  return navItemsData.map((item) => ({
    ...item,
    isCurrent: pathname === item.url,
  }));
}

interface NavItem {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  dropdown?: React.ReactNode;
}

export const navItems: NavItem[] = [
  {
    title: "Home",
    icon: Home,
    href: "/",
  },
  {
    title: "About",
    icon: User2,
    href: "/about",
  },
  {
    title: "Work",
    icon: Grid,
    href: "/work",
  },
  // {
  //   title: "Services",
  //   icon: ImageIcon,
  //   href: "/services",
  //   // dropdown: (
  //   //   <Dropdown>
  //   //     <TriggerWrapper>
  //   //       <Trigger>Services</Trigger>
  //   //     </TriggerWrapper>
  //   //     <Tabs>
  //   //       <Tab>
  //   //         <ServicesDropdown />
  //   //       </Tab>
  //   //     </Tabs>
  //   //   </Dropdown>
  //   // ),
  // },
  {
    title: "Services",
    icon: BookOpen,
    href: "/services",
  },
  {
    title: "More",
    icon: ChevronDown,
    href: "#",
    dropdown: (
      <Dropdown>
        <TriggerWrapper>
          <Trigger>More</Trigger>
        </TriggerWrapper>
        <Tabs>
          <Tab>
            <MoreDropdown />
          </Tab>
        </Tabs>
      </Dropdown>
    ),
  },
];

// All navigation pages
export const navigationPages = [
  {
    title: "Home",
    description: "Welcome to my forever work-in-progress!",
    icon: Home,
    href: "/",
    category: "Navigation",
    action: "home",
  },
  {
    title: "About",
    description: "Learn more about me!",
    icon: User,
    href: "/about",
    category: "Navigation",
  },
    {
      title: "Experience",
      description: "My career journey",
      icon: Award,
      href: "/experience",
      category: "Navigation",
    },
    {
      title: "Work",
      description: "Showcase of my projects",
      icon: Briefcase,
      href: "/work",
      category: "Navigation",
    },
  {
    title: "Blogs",
    description: "Showcase of my projects",
    icon: Newspaper,
    href: "/blogs",
    category: "Navigation",
  },
  {
    title: "Services",
    description: "What I can help you with",
    icon: Wrench,
    href: "/services",
    category: "Navigation",
  },
];
