"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ComposeTab } from "./newsletter-tabs/compose-tab";
import { PreviewTab } from "./newsletter-tabs/preview-tab";
import { SettingsTab } from "./newsletter-tabs/settings-tab";
import { TemplatesDialog } from "./newsletter-dialogs/templates-dialog";
import { SendDialog } from "./newsletter-dialogs/send-dialog";
import { ScheduleDialog } from "./newsletter-dialogs/schedule-dialog";
import { SaveSuccessDialog } from "./newsletter-dialogs/save-success-dialog";
import { FullPreviewDialog } from "./newsletter-dialogs/full-preview-dialog";
import {
  createNewsletter,
  scheduleNewsletter,
  sendNewsletter,
} from "../_actions/newsletter-actions";
import { format } from "date-fns";

interface NewsletterFormProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialData?: any;
  mode?: "create" | "edit";
}

export function NewsletterForm({
  initialData = null,
  mode = "create",
}: NewsletterFormProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("compose");
  const [title, setTitle] = useState(initialData?.title || "");
  const [subject, setSubject] = useState(initialData?.subject || "");
  const [previewText, setPreviewText] = useState(
    initialData?.previewText || "",
  );
  const [content, setContent] = useState(initialData?.content || "");
  const [isLoading, setIsLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [showSendDialog, setShowSendDialog] = useState(false);
  const [showScheduleDialog, setShowScheduleDialog] = useState(false);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const [date, setDate] = useState(
    initialData?.scheduledFor ? new Date(initialData.scheduledFor) : undefined,
  );
  const [time, setTime] = useState(
    initialData?.scheduledFor
      ? format(new Date(initialData.scheduledFor), "HH:mm")
      : "12:00",
  );
  const [selectedSegment, setSelectedSegment] = useState(
    initialData?.segment === "recent" ? "recent" : "all",
  );
  const [senderName, setSenderName] = useState(
    initialData?.senderName || "Ishimwe Jean Baptiste",
  );
  const [senderEmail, setSenderEmail] = useState(
    initialData?.senderEmail ||
      process.env.CONTACT_EMAIL ||
      "contact@hezain.org",
  );

  const templates = [
    { id: "template1", name: "Monthly Update" },
    { id: "template2", name: "Event Announcement" },
    { id: "template3", name: "Impact Story" },
  ];

  const handleSaveDraft = async () => {
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const result = await createNewsletter({
        id: initialData?.id,
        title,
        subject,
        previewText,
        content,
        status: "draft",
        senderName,
        senderEmail,
        segment: selectedSegment,
      });

      if (result.error) {
        throw new Error(result.error);
      }

      toast.success("Newsletter draft saved successfully");
      setShowSaveDialog(true);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to save newsletter draft",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendNow = async () => {
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const result = await sendNewsletter({
        id: initialData?.id,
        title,
        subject,
        previewText,
        content,
        senderName,
        senderEmail,
        segment: selectedSegment,
      });

      if (result.error) {
        throw new Error(result.error);
      }

      toast.success("Newsletter sent successfully");
      setShowSendDialog(false);
      router.push("/admin/dashboard/newsletters");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to send newsletter",
      );
      setShowSendDialog(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSchedule = async () => {
    if (!validateForm() || !date) return;

    setIsLoading(true);

    try {
      const scheduledDate = new Date(date);
      const [hours, minutes] = time.split(":").map(Number);
      scheduledDate.setHours(hours, minutes);

      const result = await scheduleNewsletter({
        id: initialData?.id,
        title,
        subject,
        previewText,
        content,
        scheduledFor: scheduledDate.toISOString(),
        senderName,
        senderEmail,
        segment: selectedSegment,
      });

      if (result.error) {
        throw new Error(result.error);
      }

      toast.success(
        `Newsletter scheduled for ${format(scheduledDate, "PPP")} at ${format(scheduledDate, "p")}`,
      );
      setShowScheduleDialog(false);
      router.push("/admin/dashboard/newsletters");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to schedule newsletter",
      );
      setShowScheduleDialog(false);
    } finally {
      setIsLoading(false);
    }
  };

  const validateForm = () => {
    if (!title) {
      toast.error("Please enter a newsletter title");
      setActiveTab("compose");
      return false;
    }

    if (!subject) {
      toast.error("Please enter an email subject");
      setActiveTab("compose");
      return false;
    }

    if (!previewText) {
      toast.error("Please enter preview text");
      setActiveTab("compose");
      return false;
    }

    if (!content) {
      toast.error("Please enter newsletter content");
      setActiveTab("compose");
      return false;
    }

    return true;
  };

  const applyTemplate = (templateId: string) => {
    // Template content implementation
    const templateContent = {
      template1: {
        subject: "Ishimwe Jean Baptiste: Monthly Update",
        previewText: "Check out our latest updates and stories from the field",
        content: `
          <h1 style="color: #11922f;">Ishimwe Jean Baptiste Monthly Update</h1>
          <p>Dear Supporter,</p>
          <p>We're excited to share our latest updates with you. This month, we've made significant progress in our community projects.</p>
          <h2>Project Highlights</h2>
          <ul>
            <li>Completed construction of a new community center</li>
            <li>Provided clean water access to 500 more families</li>
            <li>Launched a new educational program for children</li>
          </ul>
          <p>Thank you for your continued support!</p>
        `,
      },
      template2: {
        subject: "Join Us: Upcoming Ishimwe Jean Baptiste Event",
        previewText: "You're invited to our upcoming community event",
        content: `
          <h1 style="color: #11922f;">You're Invited!</h1>
          <p>Dear Supporter,</p>
          <p>We're thrilled to invite you to our upcoming event:</p>
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #11922f; margin-top: 0;">Community Celebration Day</h2>
            <p><strong>Date:</strong> June 15, 2023</p>
            <p><strong>Time:</strong> 2:00 PM - 6:00 PM</p>
            <p><strong>Location:</strong> HEZA Community Center, Rulindo</p>
          </div>
          <p>Join us for an afternoon of celebration, learning, and community building.</p>
          <p>We hope to see you there!</p>
        `,
      },
      template3: {
        subject: "Impact Story: Meet Claudine",
        previewText: "Read how your support is changing lives in Rwanda",
        content: `
          <h1 style="color: #11922f;">Impact Story: Meet Claudine</h1>
          <p>Dear Supporter,</p>
          <p>Today, we want to share the inspiring story of Claudine, a member of our community whose life has been transformed through our programs.</p>
          <blockquote style="border-left: 4px solid #11922f; padding-left: 20px; margin: 20px 0;">
            <p>"Before joining the Ishimwe Jean Baptiste program, I struggled to provide for my family. Now, I have the skills and resources to build a better future for my children."</p>
            <p style="font-style: italic;">— Claudine, Program Participant</p>
          </blockquote>
          <p>Your support makes stories like Claudine's possible. Thank you for being part of our community!</p>
        `,
      },
    };

    if (templateId in templateContent) {
      const template =
        templateContent[templateId as keyof typeof templateContent];
      setSubject(template.subject);
      setPreviewText(template.previewText);
      setContent(template.content);
      setShowTemplates(false);
      toast.success("Template applied successfully");
    }
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={() => router.push("/admin/dashboard/newsletters")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Newsletters
        </Button>

        <div className="flex items-center gap-2">
          {mode === "edit" ? (
            <Badge
              variant="outline"
              className="bg-amber-50 text-amber-700 border-amber-200"
            >
              Editing Draft
            </Badge>
          ) : (
            <Badge
              variant="outline"
              className="bg-blue-50 text-blue-700 border-blue-200"
            >
              Creating New Newsletter
            </Badge>
          )}
        </div>
      </div>

      <TooltipProvider>
        <Tabs
          defaultValue="compose"
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <div className="flex items-center justify-between">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="compose">Compose</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={() => setShowTemplates(true)}
            >
              <Sparkles className="h-4 w-4" />
              <span className="hidden sm:inline">Templates</span>
            </Button>
          </div>

          <TabsContent value="compose">
            <ComposeTab
              title={title}
              setTitle={setTitle}
              subject={subject}
              setSubject={setSubject}
              previewText={previewText}
              setPreviewText={setPreviewText}
              content={content}
              setContent={setContent}
              isLoading={isLoading}
              handleSaveDraft={handleSaveDraft}
              setShowSendDialog={setShowSendDialog}
              setShowScheduleDialog={setShowScheduleDialog}
              router={router}
            />
          </TabsContent>

          <TabsContent value="preview">
            <PreviewTab
              subject={subject}
              previewText={previewText}
              content={content}
              setActiveTab={setActiveTab}
              setShowPreview={setShowPreview}
            />
          </TabsContent>

          <TabsContent value="settings">
            <SettingsTab
              selectedSegment={selectedSegment}
              setSelectedSegment={setSelectedSegment}
              senderName={senderName}
              setSenderName={setSenderName}
              senderEmail={senderEmail}
              setSenderEmail={setSenderEmail}
              isLoading={isLoading}
              handleSaveDraft={handleSaveDraft}
              setActiveTab={setActiveTab}
            />
          </TabsContent>
        </Tabs>
      </TooltipProvider>

      {/* Dialogs */}
      <TemplatesDialog
        open={showTemplates}
        onOpenChange={setShowTemplates}
        templates={templates}
        applyTemplate={applyTemplate}
      />

      <SendDialog
        open={showSendDialog}
        onOpenChange={setShowSendDialog}
        isLoading={isLoading}
        handleSendNow={handleSendNow}
        selectedSegment={selectedSegment}
      />

      <ScheduleDialog
        open={showScheduleDialog}
        onOpenChange={setShowScheduleDialog}
        isLoading={isLoading}
        handleSchedule={handleSchedule}
        date={date}
        setDate={setDate}
        time={time}
        setTime={setTime}
        selectedSegment={selectedSegment}
      />

      <SaveSuccessDialog
        open={showSaveDialog}
        onOpenChange={setShowSaveDialog}
        router={router}
      />

      <FullPreviewDialog
        open={showPreview}
        onOpenChange={setShowPreview}
        content={content}
      />
    </div>
  );
}
