import { Music2, Mail, PhoneCall } from "lucide-react";

export const quickActions = [
  {
    title: "Email Me",
    description: "Get in touch via email",
    icon: Mail,
    href: "mailto:hakuzweaphossy@gmail.com",
    url: "mailto:hakuzweaphossy@gmail.com",
    external: true,
    action: "contact",
    category: "Get in Touch",
    group: "Get in Touch",
  },
  
  {
    title: "Call Me",
    description: "Schedule a meeting",
    icon: PhoneCall,
    href: "tel:+250784343073",
    url: "tel:+250784343073",
    external: true,
    category: "Get in Touch",
    group: "Get in Touch",
  },

  {
    title: "Music Player",
    description: "Control background music",
    icon: Music2,
    action: "music",
    category: "Tools",
    group: "Tools",
  },
];
