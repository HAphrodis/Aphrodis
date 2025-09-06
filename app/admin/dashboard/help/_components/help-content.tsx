"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Search,
  BookOpen,
  Lock,
  Shield,
  Layout,
  BarChart,
  MessageSquare,
  Users,
  FileText,
  Image,
  Settings,
  HelpCircle,
  ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Categories for organizing help topics
const categories = [
  { id: "all", name: "All Topics" },
  { id: "getting-started", name: "Getting Started" },
  { id: "navigation", name: "Navigation" },
  { id: "features", name: "Features" },
  { id: "security", name: "Security" },
];

// Help topics with added category and icon information
const helpTopics = [
  {
    id: 1,
    title: "Overview",
    content: "Learn about the admin panel features and functionalities.",
    category: "getting-started",
    icon: BookOpen,
    color: "bg-blue-100 dark:bg-blue-900",
    textColor: "text-blue-700 dark:text-blue-300",
  },
  {
    id: 2,
    title: "Login",
    content: "Understand the login process and security features.",
    category: "getting-started",
    icon: Lock,
    color: "bg-purple-100 dark:bg-purple-900",
    textColor: "text-purple-700 dark:text-purple-300",
  },
  {
    id: 3,
    title: "Security Best Practices",
    content: "Discover how to maintain account security.",
    category: "security",
    icon: Shield,
    color: "bg-red-100 dark:bg-red-900",
    textColor: "text-red-700 dark:text-red-300",
  },
  {
    id: 4,
    title: "Sidebar Navigation",
    content: "Explore the sidebar navigation items and their functions.",
    category: "navigation",
    icon: Layout,
    color: "bg-green-100 dark:bg-green-900",
    textColor: "text-green-700 dark:text-green-300",
  },
  {
    id: 5,
    title: "Dashboard",
    content: "Learn about the dashboard statistics and charts.",
    category: "features",
    icon: BarChart,
    color: "bg-amber-100 dark:bg-amber-900",
    textColor: "text-amber-700 dark:text-amber-300",
  },
  {
    id: 6,
    title: "Messages",
    content: "Understand how to manage messages received from the website.",
    category: "features",
    icon: MessageSquare,
    color: "bg-indigo-100 dark:bg-indigo-900",
    textColor: "text-indigo-700 dark:text-indigo-300",
  },
  {
    id: 7,
    title: "Subscribers",
    content: "Learn how to manage newsletter subscribers.",
    category: "features",
    icon: Users,
    color: "bg-pink-100 dark:bg-pink-900",
    textColor: "text-pink-700 dark:text-pink-300",
  },
  {
    id: 8,
    title: "Blogs",
    content: "Discover how to manage blogs fetched from Hygraph.",
    category: "features",
    icon: FileText,
    color: "bg-cyan-100 dark:bg-cyan-900",
    textColor: "text-cyan-700 dark:text-cyan-300",
  },
  {
    id: 9,
    title: "Gallery",
    content: "Learn about managing event gallery images.",
    category: "features",
    icon: Image,
    color: "bg-orange-100 dark:bg-orange-900",
    textColor: "text-orange-700 dark:text-orange-300",
  },
  {
    id: 10,
    title: "Settings",
    content: "Explore various settings for your admin account.",
    category: "features",
    icon: Settings,
    color: "bg-slate-100 dark:bg-slate-800",
    textColor: "text-slate-700 dark:text-slate-300",
  },
];

const helpDetails = {
  1: {
    title: "Overview",
    content: `
      <p>The admin panel provides tools and functionalities for managing the Ishimwe Jean Baptiste website and its content. Key features include:</p>
      <ul>
        <li><strong>Dark/Light Theme:</strong> Toggle between dark and light modes for the interface.</li>
        <li><strong>Notifications:</strong> Alerts for important updates.</li>
        <li><strong>Clock and Connection Status:</strong> Displayed on the user avatar at the bottom of the sidebar.</li>
        <li><strong>Search:</strong> Accessible via Ctrl/CMD + K for quick navigation.</li>
        <li><strong>Collapsible Sidebar:</strong> The sidebar can be collapsed and toggled with Ctrl/CMD + B.</li>
      </ul>
    `,
  },
  2: {
    title: "Login",
    content: `
      <p>To access the admin panel:</p>
      <ol>
        <li>Navigate to https://www.hezain.org/login</li>
        <li>Log in with your provided credentials</li>
        <li>Change your password immediately after first login</li>
      </ol>
      <p><strong>Login Fields:</strong></p>
      <ul>
        <li>Email Address</li>
        <li>Password</li>
        <li>Code (if 2FA is enabled)</li>
      </ul>
      <p><strong>Login Security Features:</strong></p>
      <ul>
        <li>Maximum of 5 login attempts within 5 minutes</li>
        <li>Session duration: 24 hours in your browser</li>
      </ul>
      <p><strong>Password Requirements:</strong></p>
      <ul>
        <li>At least 8 characters long</li>
        <li>Must include uppercase and lowercase letters, numbers, and special characters</li>
      </ul>
    `,
  },
  3: {
    title: "Security Best Practices",
    content: `
      <p>To maintain account security:</p>
      <ul>
        <li>Never share your password with anyone</li>
        <li>Use a unique password for your Ishimwe Jean Baptiste admin account</li>
        <li>Enable Multi-Factor Authentication (2FA)</li>
        <li>Log out after use, especially on shared devices</li>
        <li>Update your password regularly (recommended every 3 months)</li>
      </ul>
    `,
  },
  4: {
    title: "Sidebar Navigation",
    content: `
      <p>The sidebar contains the following items:</p>
      <ol>
        <li><strong>Dashboard</strong> (shortcut: d d): Displays statistics and a bar chart of messages and subscribers over the last 5 months.</li>
        <li><strong>Messages</strong> (m m): Manage messages received from the website.</li>
        <li><strong>Subscribers</strong> (u u): Manage newsletter subscribers.</li>
        <li><strong>Blogs</strong> (b b): Manage blogs fetched from Hygraph.</li>
        <li><strong>Gallery</strong> (g g): Manage event gallery images.</li>
        <li><strong>Help</strong> (h h): Access guides and resources for admins.</li>
        <li><strong>Settings</strong> (s s): Manage admin user settings and preferences.</li>
      </ol>
      <p>Note: Shortcuts are activated by pressing the designated key twice in quick succession.</p>
    `,
  },
  5: {
    title: "Dashboard",
    content: `
      <p><strong>URL:</strong> /admin/dashboard</p>
      <p>The dashboard displays statistics and a bar chart of messages and subscribers over the last 5 months.</p>
    `,
  },
  6: {
    title: "Messages",
    content: `
      <p><strong>URL:</strong> /admin/dashboard/message</p>
      <p>Displays messages received from the website in a table with the following columns:</p>
      <ul>
        <li>Date</li>
        <li>Sender</li>
        <li>Email</li>
        <li>Status</li>
        <li>Content</li>
        <li>Actions</li>
      </ul>
      <p><strong>Features:</strong></p>
      <ul>
        <li>Filters and sorting options</li>
        <li>Quick actions: Export to Excel, mark as read/unread, archive, and delete</li>
      </ul>
    `,
  },
  7: {
    title: "Subscribers",
    content: `
      <p><strong>URL:</strong> /admin/dashboard/subscribers</p>
      <p>Displays subscribers who have signed up for the newsletter.</p>
      <p><strong>Columns:</strong></p>
      <ul>
        <li>Name</li>
        <li>Email</li>
        <li>Date of Subscription</li>
      </ul>
      <p><strong>Features:</strong></p>
      <ul>
        <li>Automatic email updates for new blog posts</li>
        <li>Quick actions: Edit and delete subscribers</li>
      </ul>
    `,
  },
  8: {
    title: "Blogs",
    content: `
      <p><strong>URL:</strong> /admin/dashboard/blogs</p>
      <p>Displays all blogs fetched from Hygraph.</p>
      <p><strong>Features:</strong></p>
      <ul>
        <li>Link to view blogs on the user-accessible page</li>
        <li>Button to add new blogs</li>
        <li>Blog management (add, edit, publish) requires access to the Hygraph model</li>
      </ul>
    `,
  },
  9: {
    title: "Gallery",
    content: `
      <p><strong>URL:</strong> /admin/dashboard/gallery</p>
      <p>Displays gallery images of events.</p>
      <p><strong>Features:</strong></p>
      <ul>
        <li>Images are uploaded and managed via Hygraph</li>
        <li>Recommendation: Upload high-quality images</li>
      </ul>
    `,
  },
  10: {
    title: "Settings",
    content: `
      <p><strong>URL:</strong> /admin/dashboard/settings</p>
      <p><strong>Tabs:</strong></p>
      <ul>
        <li><strong>Profile:</strong> Update admin user information (e.g., names)</li>
        <li><strong>Appearance:</strong> Change the theme</li>
        <li><strong>Notifications:</strong> Update notification settings</li>
        <li><strong>Security:</strong> Update password and toggle 2FA</li>
        <li><strong>Audit Logs:</strong> View logs related to admin panel activities</li>
      </ul>
    `,
  },
};

export function HelpContent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedTopic, setSelectedTopic] = useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [recentlyViewed, setRecentlyViewed] = useState<number[]>([]);

  // Filter topics based on search term and selected category
  const filteredTopics = helpTopics.filter((topic) => {
    const matchesSearch = topic.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || topic.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Handle topic selection
  const handleTopicSelect = (topicId: number) => {
    setSelectedTopic(topicId);
    setIsDialogOpen(true);

    // Update recently viewed
    setRecentlyViewed((prev) => {
      const newRecent = prev.filter((id) => id !== topicId);
      return [topicId, ...newRecent].slice(0, 3);
    });
  };

  // Get recently viewed topics
  const recentTopics = recentlyViewed
    .map((id) => helpTopics.find((topic) => topic.id === id))
    .filter(Boolean) as typeof helpTopics;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };

  return (
    <div className="space-y-6">
      {/* Hero section */}
      <div className="from-primary/20 to-primary/5 relative mb-8 rounded-lg bg-gradient-to-r p-6">
        <div className="max-w-3xl">
          <h1 className="mb-2 text-2xl font-bold">
            Admin Dashboard Help Center
          </h1>
          <p className="text-muted-foreground mb-4">
            Find guides and resources to help you navigate and use the admin
            dashboard effectively.
          </p>
          <div className="relative max-w-md">
            <Search className="text-muted-foreground absolute top-3 left-3 h-4 w-4" />
            <Input
              placeholder="Search help topics..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-background/80 h-12 pl-10 backdrop-blur-sm"
            />
          </div>
        </div>
        <div className="absolute right-6 bottom-6 hidden opacity-20 md:block">
          <HelpCircle size={120} />
        </div>
      </div>

      {/* Recently viewed section */}
      {recentTopics.length > 0 && (
        <div className="mb-6">
          <h2 className="mb-3 text-lg font-medium">Recently Viewed</h2>
          <div className="flex flex-wrap gap-2">
            {recentTopics.map((topic) => (
              <Button
                key={topic.id}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
                onClick={() => handleTopicSelect(topic.id)}
              >
                <topic.icon className="h-4 w-4" />
                {topic.title}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Category tabs */}
      <Tabs
        defaultValue="all"
        value={selectedCategory}
        onValueChange={setSelectedCategory}
      >
        <TabsList className="mb-4">
          {categories.map((category) => (
            <TabsTrigger key={category.id} value={category.id}>
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((category) => (
          <TabsContent key={category.id} value={category.id} className="mt-0">
            <motion.div
              className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
              variants={containerVariants}
              initial="hidden"
              animate="show"
            >
              <AnimatePresence>
                {filteredTopics.map((topic) => (
                  <motion.div
                    key={topic.id}
                    variants={itemVariants}
                    layout
                    transition={{ duration: 0.3 }}
                  >
                    <Card
                      className="group h-full cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-md"
                      onClick={() => handleTopicSelect(topic.id)}
                    >
                      <CardContent className="p-0">
                        <div
                          className={`${topic.color} flex items-center justify-between p-4 transition-transform duration-300 group-hover:scale-105`}
                        >
                          <topic.icon
                            className={`h-6 w-6 ${topic.textColor}`}
                          />
                          <Badge
                            variant="outline"
                            className="bg-background/80 backdrop-blur-sm"
                          >
                            {
                              categories.find((c) => c.id === topic.category)
                                ?.name
                            }
                          </Badge>
                        </div>
                        <div className="p-4">
                          <h3 className="mb-2 flex items-center justify-between font-medium">
                            {topic.title}
                            <ChevronRight className="text-muted-foreground h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
                          </h3>
                          <p className="text-muted-foreground text-sm">
                            {topic.content}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </TabsContent>
        ))}
      </Tabs>

      {/* Dialog for displaying topic details */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-h-[80vh] overflow-y-auto sm:max-w-2xl">
          {selectedTopic && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-2">
                  {(() => {
                    const topic = helpTopics.find(
                      (t) => t.id === selectedTopic,
                    );
                    const Icon = topic?.icon || HelpCircle;
                    return (
                      <Icon className={`h-5 w-5 ${topic?.textColor || ""}`} />
                    );
                  })()}
                  <DialogTitle>
                    {
                      helpDetails[selectedTopic as keyof typeof helpDetails]
                        .title
                    }
                  </DialogTitle>
                </div>
                <DialogDescription>
                  {helpTopics.find((t) => t.id === selectedTopic)?.content}
                </DialogDescription>
              </DialogHeader>
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <div
                  dangerouslySetInnerHTML={{
                    __html:
                      helpDetails[selectedTopic as keyof typeof helpDetails]
                        .content,
                  }}
                />
              </div>
              <DialogFooter>
                <Button onClick={() => setIsDialogOpen(false)}>Close</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
