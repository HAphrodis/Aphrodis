"use client";

import { Message } from "@/types/message";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

interface MessageViewProps {
  message: Message;
}

export function MessageView({ message }: MessageViewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{message.name}</CardTitle>
              <CardDescription>{message.email}</CardDescription>
            </div>
            <Badge
              variant={message.status === "read" ? "secondary" : "default"}
            >
              {message.status === "read" ? "Read" : "Unread"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <motion.div
            className="space-y-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-muted-foreground text-sm font-medium">
              Timestamp
            </h3>
            <p className="text-sm">
              {new Date(message.timestamp).toLocaleString()}
            </p>
          </motion.div>
          <motion.div
            className="space-y-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-muted-foreground text-sm font-medium">
              Message Content
            </h3>
            <p className="text-sm whitespace-pre-wrap">{message.message}</p>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
