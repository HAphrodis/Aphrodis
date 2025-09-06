"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Rss } from "lucide-react";

interface FeedItem {
  title: string;
  link: string;
  pubDate: string;
}

export default function RSSFeed() {
  const [feedItems, setFeedItems] = useState<FeedItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // This is a mock function. In a real application, you'd fetch the RSS feed from your backend
    const fetchRSSFeed = async () => {
      // Simulating an API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setFeedItems([
        { title: "New Project Launch", link: "#", pubDate: "2023-06-01" },
        { title: "Web Development Tips", link: "#", pubDate: "2023-05-28" },
        { title: "UI/UX Design Trends", link: "#", pubDate: "2023-05-25" },
      ]);
    };

    fetchRSSFeed();
  }, []);

  return (
    <motion.div
      initial={{ width: "60px", height: "60px" }}
      animate={{
        width: isOpen ? "300px" : "60px",
        height: isOpen ? "auto" : "60px",
      }}
      transition={{ duration: 0.3 }}
      className="fixed right-8 top-1/2 transform -translate-y-1/2 bg-emerald-800 rounded-lg shadow-xl overflow-hidden z-40"
    >
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full h-[60px] flex justify-center items-center bg-emerald-700 text-white ${isOpen ? "rounded-t-lg" : "rounded-lg"}`}
      >
        <Rss className="h-6 w-6" />
        {isOpen && <span className="ml-2">Latest Updates</span>}
      </Button>
      {isOpen && (
        <div className="p-4 space-y-4">
          {feedItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <a
                href={item.link}
                className="block p-2 bg-emerald-700 rounded-lg hover:bg-emerald-600 transition-colors"
              >
                <h3 className="font-bold text-emerald-200">{item.title}</h3>
                <p className="text-sm text-emerald-300">{item.pubDate}</p>
              </a>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
