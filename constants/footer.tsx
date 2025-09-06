/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaXTwitter,
  FaInstagram,
  FaPhone,
} from "react-icons/fa6";

export const pageGroups = [
  {
    title: "Navigation",
    links: [
      { href: "/", label: "Home" },
      { href: "/about", label: "About" },
      { href: "/projects", label: "Projects" },
      { href: "/blog", label: "Blog" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "/resources", label: "Developer Tools" },
      { href: "/snippets", label: "Code Snippets" },
      { href: "/bookmarks", label: "Bookmarks" },
      { href: "/uses", label: "Uses" },
    ],
  },
  // {
  //   title: "Legal",
  //   links: [
  //     { href: "/terms", label: "Terms of Service" },
  //     { href: "/privacy", label: "Privacy Policy" },
  //     { href: "/cookies", label: "Cookie Policy" },
  //   ],
  // },
];

export const socialLinks = [
  { icon: FaGithub, url: "https://github.com/hbapte", title: "GitHub" },
  // { icon: FaXTwitter, url: "https://twitter.com/HBaptee", title: "Twitter" },
  {
    icon: FaLinkedin,
    url: "https://linkedin.com/in/hbapte",
    title: "LinkedIn",
  },
  {
    icon: FaInstagram,
    url: "https://instagram.com/hbapte",
    title: "Instagram",
  },
  { icon: FaEnvelope, url: "mailto:ijbapte@gmail.com", title: "Email" },
  // { icon: FaPhone, url: "tel:+250785577189", title: "Phone" },
];
