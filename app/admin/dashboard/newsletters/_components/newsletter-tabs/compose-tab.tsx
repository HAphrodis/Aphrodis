/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Calendar, Loader, Save, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import dynamic from "next/dynamic";

// Dynamically import the rich text editor to avoid SSR issues
const RichTextEditor = dynamic(() => import("../rich-text-editor"), {
  ssr: false,
  loading: () => (
    <div className="min-h-[300px] border rounded-md p-4 flex items-center justify-center">
      <Loader className="h-6 w-6 animate-spin text-muted-foreground" />
    </div>
  ),
});

interface ComposeTabProps {
  title: string;
  setTitle: (title: string) => void;
  subject: string;
  setSubject: (subject: string) => void;
  previewText: string;
  setPreviewText: (previewText: string) => void;
  content: string;
  setContent: (content: string) => void;
  isLoading: boolean;
  handleSaveDraft: () => Promise<void>;
  setShowSendDialog: (show: boolean) => void;
  setShowScheduleDialog: (show: boolean) => void;
  router: any;
}

export function ComposeTab({
  title,
  setTitle,
  subject,
  setSubject,
  previewText,
  setPreviewText,
  content,
  setContent,
  isLoading,
  handleSaveDraft,
  setShowSendDialog,
  setShowScheduleDialog,
  router,
}: ComposeTabProps) {
  return (
    <div className="space-y-6">
      <Card className="overflow-hidden border-t-4 border-t-[#11922f]">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="title" className="text-base font-medium">
                Newsletter Title (Internal)
              </Label>
              <Input
                id="title"
                placeholder="e.g., July 2023 Newsletter"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1.5"
              />
              <p className="text-sm text-muted-foreground mt-1.5">
                This is for your reference only and won&apos;t be visible to
                subscribers
              </p>
            </div>

            <div>
              <Label htmlFor="subject" className="text-base font-medium">
                Email Subject
              </Label>
              <Input
                id="subject"
                placeholder="e.g., Ishimwe Jean Baptiste: July Updates and Stories"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="mt-1.5"
              />
            </div>

            <div>
              <Label htmlFor="preview" className="text-base font-medium">
                Preview Text
              </Label>
              <Input
                id="preview"
                placeholder="Brief preview text that appears in email clients"
                value={previewText}
                onChange={(e) => setPreviewText(e.target.value)}
                className="mt-1.5"
              />
              <p className="text-sm text-muted-foreground mt-1.5">
                This text appears in the inbox preview of most email clients
                (max 150 characters)
              </p>
            </div>

            <div>
              <Label htmlFor="content" className="text-base font-medium">
                Newsletter Content
              </Label>
              <div className="mt-1.5">
                <RichTextEditor value={content} onChange={setContent} />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => router.push("/admin/dashboard/newsletters")}
        >
          Cancel
        </Button>

        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={handleSaveDraft}
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader className="h-4 w-4 animate-spin mr-2" />
            ) : (
              <Save className="h-4 w-4 mr-2" />
            )}
            Save Draft
          </Button>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                disabled={isLoading}
                className="bg-[#11922f] hover:bg-[#0a7a24]"
              >
                {isLoading ? (
                  <Loader className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  <Send className="h-4 w-4 mr-2" />
                )}
                Send
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <div className="grid gap-4 p-4">
                <div className="grid gap-2">
                  <div className="flex items-center gap-2">
                    <Send className="h-4 w-4" />
                    <p className="font-medium">Send Options</p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Choose when to send this newsletter
                  </p>
                </div>
                <div className="grid gap-2">
                  <Button
                    variant="outline"
                    className="justify-start"
                    onClick={() => setShowSendDialog(true)}
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Send Now
                  </Button>
                  <Button
                    variant="outline"
                    className="justify-start"
                    onClick={() => setShowScheduleDialog(true)}
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule for Later
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
}
