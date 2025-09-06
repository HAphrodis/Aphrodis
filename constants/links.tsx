//constants\links.tsx

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
    category: "Social",
    group: "Social",
  },
  {
    title: "LinkedIn",
    url: "https://www.linkedin.com/in/hbapte",
    icon: FaLinkedin,
    color: "hover:bg-[#0077B5] hover:text-white",
    description: "Connect with me professionally",
    category: "Social",
    group: "Social",
  },
  {
    title: "Bluesky",
    url: "https://bsky.app/profile/hbapte.bsky.social",
    icon: SiBluesky,
    color: "hover:bg-[#0085ff] hover:text-white",
    description: "Follow me on Bluesky",
    category: "Social",
    group: "Social",
  },
  {
    title: "Twitter / X",
    url: "https://x.com/HBaptee",
    icon: FaXTwitter,
    color: "hover:bg-black hover:text-white",
    description: "Follow me for tech updates",
    category: "Social",
    group: "Social",
  },
  {
    title: "Instagram",
    url: "https://www.instagram.com/hbapte",
    icon: FaInstagram,
    color: "hover:bg-[#E4405F] hover:text-white",
    description: "Behind the scenes moments",
    category: "Social",
    group: "Social",
  },
  {
    title: "WhatsApp",
    url: "https://api.whatsapp.com/send?phone=250784343073",
    icon: FaWhatsapp,
    color: "hover:bg-[#25D366] hover:text-white",
    description: "Direct messaging",
    category: "Social",
    group: "Social",
  },
  {
    title: "Telegram",
    url: "https://t.me/hbapte",
    icon: FaTelegramPlane,
    color: "hover:bg-[#0088cc] hover:text-white",
    description: "Quick chat and updates",
    category: "Social",
    group: "Social",
  },
  {
    title: "Linktree",
    url: "https://linktr.ee/hbapte",
    icon: SiLinktree,
    color: "hover:bg-[#43E660] hover:text-white",
    description: "All my links in one place",
    category: "Social",
    group: "Social",
  },
];

export const cmdBarLinks = [
  
];
