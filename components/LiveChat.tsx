"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import io, { type Socket } from "socket.io-client";
import { generateIPHash } from "@/lib/utils";

interface Message {
  text: string;
  isUser: boolean;
  avatar: string;
}

export default function LiveChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const socketRef = useRef<Socket | null>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initSocket = async () => {
      await fetch("/api/socket");
      socketRef.current = io({
        path: "/api/socket",
      });

      socketRef.current.on("chat message", (msg: Message) => {
        setMessages((prevMessages) => [...prevMessages, msg]);
      });

      // Fetch previous messages from Redis
      const response = await fetch("/api/chat-messages");
      const previousMessages = await response.json();
      setMessages(previousMessages);

      // Generate user avatar based on IP
      const ipResponse = await fetch("https://api.ipify.org?format=json");
      const { ip } = await ipResponse.json();
      const avatarHash = await generateIPHash(ip);
      setUserAvatar(
        `https://avatars.dicebear.com/api/identicon/${avatarHash}.svg`,
      );
    };

    initSocket();

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, []);

  const sendMessage = async () => {
    if (input.trim() && socketRef.current) {
      const newMessage = { text: input, isUser: true, avatar: userAvatar };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      socketRef.current.emit("chat message", newMessage);

      // Store message in Redis
      await fetch("/api/chat-messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMessage),
      });

      setInput("");
    }
  };

  return (
    <>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="fixed bottom-8 right-8 z-50"
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="w-16 h-16 rounded-full bg-emerald-500 hover:bg-emerald-400 shadow-lg"
        >
          <MessageSquare className="h-6 w-6 text-[#002922]" />
        </Button>
      </motion.div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-28 right-8 w-80 bg-[#002922] rounded-lg shadow-xl overflow-hidden z-50"
          >
            <div className="bg-emerald-600 p-4 flex justify-between items-center">
              <h3 className="text-white font-bold">Live Chat</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-5 w-5 text-white" />
              </Button>
            </div>
            <ScrollArea className="h-80 p-4" ref={scrollAreaRef}>
              <div className="space-y-4">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex items-start ${msg.isUser ? "justify-end" : "justify-start"}`}
                  >
                    {!msg.isUser && (
                      <Avatar className="w-8 h-8 mr-2">
                        <AvatarImage src={msg.avatar} alt="User avatar" />
                        <AvatarFallback>U</AvatarFallback>
                      </Avatar>
                    )}
                    <div
                      className={`max-w-[70%] p-2 rounded-lg ${msg.isUser ? "bg-emerald-500 text-[#002922]" : "bg-emerald-700 text-white"}`}
                    >
                      {msg.text}
                    </div>
                    {msg.isUser && (
                      <Avatar className="w-8 h-8 ml-2">
                        <AvatarImage src={msg.avatar} alt="User avatar" />
                        <AvatarFallback>U</AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
            <div className="p-4 bg-emerald-800">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                  placeholder="Type a message..."
                  className="flex-grow p-2 rounded-l-lg bg-emerald-700 text-white placeholder-emerald-300 focus:outline-none"
                />
                <Button
                  onClick={sendMessage}
                  className="bg-emerald-500 hover:bg-emerald-400"
                >
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
