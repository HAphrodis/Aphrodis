import {
  FaInstagram,
  FaLinkedin,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";

export const navItems = [
  { name: "Home", href: "/" },
  {
    name: "About Us",
    href: "/about",
    dropdown: [
      { name: "Who We Are", href: "/about#whoweare" },
      { name: "Our Story", href: "/about#ourstory" },
      { name: "Testimonials", href: "/about#testimonials" },
    ],
  },
  { name: "Our Programs", href: "/programs" },
  { name: "Impact", href: "/impact" },
  { name: "Team", href: "/team" },
  { name: "Blog", href: "/blogs" },
  { name: "Gallery", href: "/gallery" },
];

export const socialLinks = [
  {
    icon: <FaXTwitter className="h-4 w-4" />,
    href: "https://twitter.com/hezainitiatives",
    label: "X/Twitter",
    color: "#1DA1F2",
  },
  {
    icon: <FaLinkedin className="h-4 w-4" />,
    href: "https://www.linkedin.com/company/heza-initiative",
    label: "LinkedIn",
    color: "#0077B5",
  },
  {
    icon: <FaInstagram className="h-4 w-4" />,
    href: "https://instagram.com/hezainitiative",
    label: "Instagram",
    color: "#E1306C",
  },
  {
    icon: <FaYoutube className="h-4 w-4" />,
    href: "https://youtube.com/@hezainitiative",
    label: "YouTube",
    color: "#FF0000",
  },
];
