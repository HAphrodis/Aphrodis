import { NavItem } from "@/types";

export const navItems: NavItem[] = [
  {
    title: "Dashboard",
    url: "/admin/dashboard",
    icon: "dashboard",
    isActive: false,
    shortcut: ["a", "a"],
    items: [],
  },

  {
    title: "Messages",
    url: "/admin/dashboard/message",
    icon: "messagesquaretext",
    isActive: false,
    shortcut: ["m", "m"],
    items: [],
  },

  {
    title: "Subscribers",
    url: "/admin/dashboard/subscribers",
    icon: "listcheck",
    isActive: false,
    shortcut: ["u", "u"],
    items: [
      // {
      //   title: 'Subscribers',
      //   url: '/admin/dashboard/subscribers',
      //   icon: 'users',
      //   shortcut: ['a', 'a']
      // },
      // {
      //   title: 'Newsletter',
      //   url: '/admin/dashboard/newsletters',
      //   icon: 'view',
      //   shortcut: ['s', 's']
      // }
    ],
  },
  {
    title: "Projects",
    url: "#",
    icon: "help",
    isActive: false,
    shortcut: ["p", ""],
    items: [],
  },

  {
    title: "Admin Hub",
    url: "#",
    icon: "user",
    isActive: false,
    shortcut: ["d", "d"],
    items: [
      {
        title: "Changelog",
        url: "/admin/dashboard/changelog",
        icon: "webhooks",
        shortcut: ["w", "w"],
      },
      {
        title: "Documentation",
        url: "/admin/dashboard/documentation",
        icon: "settings",
        shortcut: ["o", "o"],
      },

      {
        title: "Integrations",
        url: "/admin/dashboard/integrations",
        icon: "settings",
        shortcut: ["i", "i"],
      },
      {
        title: "Request Feature",
        url: "/admin/dashboard/feature-requests",
        icon: "settings",
        shortcut: ["r", "r"],
      },
    ],
  },

  {
    title: "Settings",
    url: "/admin/dashboard/settings",
    icon: "settings",
    isActive: false,
    shortcut: ["s", "s"],
    items: [],
  },
  // {
  //   title: 'Members',
  //   url: '/admin/dashboard/member',
  //   icon: 'usersround',
  //   isActive: false,
  //   shortcut: ['m', 'm'],
  //   items: [
  //     {
  //       title: 'Active',
  //       url: '/admin/dashboard/member',
  //       icon: 'users',
  //       shortcut: ['a', 'a']
  //     },
  //     {
  //       title: 'Requests',
  //       url: '/admin/dashboard/member/request',
  //       icon: 'view',
  //       shortcut: ['v', 'v']
  //     },
  //     {
  //       title: 'Rejected',
  //       url: '/admin/dashboard/member/rejected',
  //       icon: 'view',
  //       shortcut: ['s', 's']
  //     }
  //   ]
  // },

  // {
  //   title: 'Committee',
  //   url: '/admin/dashboard/committee',
  //   icon: 'user',
  //   shortcut: ['e', 'e'],
  //   isActive: false,
  //   items: [] // No child items
  // },

  // {
  //   title: 'Trash',
  //   url: '/admin/dashboard/trash',
  //   icon: 'trash',
  //   isActive: false,
  //   shortcut: ['t', 't'],
  //   items: [] // No child items
  // },
];
