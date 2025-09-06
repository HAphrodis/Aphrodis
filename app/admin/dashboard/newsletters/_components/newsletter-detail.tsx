/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  AlertCircle,
  ArrowLeft,
  Calendar,
  Clock,
  Edit,
  RefreshCw,
  Send,
  Trash2,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  deleteNewsletter,
  resendNewsletter,
  sendNewsletter,
} from "../_actions/newsletter-actions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface NewsletterDetailProps {
  newsletter: any;
}

export function NewsletterDetail({ newsletter }: NewsletterDetailProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState("");
  const [showResendDialog, setShowResendDialog] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "draft":
        return "bg-gray-200 text-gray-800";
      case "scheduled":
        return "bg-blue-100 text-blue-800";
      case "sent":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  const handleDelete = async () => {
    if (deleteConfirmation.toLowerCase() !== "delete") {
      toast({
        title: "Error",
        description: "Please type 'delete' to confirm.",
        variant: "destructive",
      });
      return;
    }

    setIsDeleting(true);
    try {
      const result = await deleteNewsletter(newsletter.id);

      if (result.success) {
        toast({
          title: "Success",
          description: "Newsletter deleted successfully",
        });
        router.push("/admin/dashboard/newsletters");
      } else {
        throw new Error(result.error || "Failed to delete newsletter");
      }
    } catch (error) {
      console.error("Error deleting newsletter:", error);
      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "Failed to delete newsletter",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
      setShowDeleteDialog(false);
    }
  };

  const handleSendNow = async () => {
    if (confirm("Are you sure you want to send this newsletter now?")) {
      setIsSending(true);
      try {
        const result = await sendNewsletter({ id: newsletter.id });

        if (result.success) {
          toast({
            title: "Success",
            description: "Newsletter sent successfully",
          });
          router.refresh();
        } else {
          throw new Error(result.error || "Failed to send newsletter");
        }
      } catch (error) {
        console.error("Error sending newsletter:", error);
        toast({
          title: "Error",
          description:
            error instanceof Error
              ? error.message
              : "Failed to send newsletter",
          variant: "destructive",
        });
      } finally {
        setIsSending(false);
      }
    }
  };

  const handleResend = async () => {
    setIsResending(true);
    try {
      const result = await resendNewsletter(newsletter.id);

      if (result.success) {
        toast({
          title: "Success",
          description: "Newsletter resent successfully",
        });
        router.refresh();
      } else {
        throw new Error(result.error || "Failed to resend newsletter");
      }
    } catch (error) {
      console.error("Error resending newsletter:", error);
      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "Failed to resend newsletter",
        variant: "destructive",
      });
    } finally {
      setIsResending(false);
      setShowResendDialog(false);
    }
  };

  return (
    <div className="container mx-auto space-y-6 py-6">
      <div className="flex items-center gap-4 flex-wrap">
        <Button variant="outline" size="sm" asChild>
          <Link href="/admin/dashboard/newsletters">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Newsletters
          </Link>
        </Button>

        {newsletter.status === "draft" && (
          <>
            <Button variant="outline" size="sm" asChild>
              <Link href={`/admin/dashboard/newsletters/${newsletter.id}/edit`}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Link>
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={handleSendNow}
              disabled={isSending}
            >
              <Send className="mr-2 h-4 w-4" />
              {isSending ? "Sending..." : "Send Now"}
            </Button>
          </>
        )}

        {newsletter.status === "sent" && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowResendDialog(true)}
            disabled={isResending}
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            {isResending ? "Resending..." : "Resend"}
          </Button>
        )}

        <Button
          variant="destructive"
          size="sm"
          onClick={() => setShowDeleteDialog(true)}
          disabled={isDeleting}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          {isDeleting ? "Deleting..." : "Delete"}
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl">{newsletter.title}</CardTitle>
                <Badge className={getStatusColor(newsletter.status)}>
                  {newsletter.status.charAt(0).toUpperCase() +
                    newsletter.status.slice(1)}
                </Badge>
              </div>
              <CardDescription className="text-lg">
                {newsletter.subject}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none">
                <div dangerouslySetInnerHTML={{ __html: newsletter.content }} />
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Newsletter Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium">Preview Text</h3>
                <p className="text-sm text-gray-500">
                  {newsletter.previewText}
                </p>
              </div>

              <div>
                <h3 className="font-medium">Status</h3>
                <Badge className={getStatusColor(newsletter.status)}>
                  {newsletter.status.charAt(0).toUpperCase() +
                    newsletter.status.slice(1)}
                </Badge>
              </div>

              <div>
                <h3 className="font-medium">Created</h3>
                <p className="flex items-center text-sm text-gray-500">
                  <Clock className="mr-2 h-4 w-4" />
                  {formatDate(newsletter.createdAt)} at{" "}
                  {formatTime(newsletter.createdAt)}
                </p>
              </div>

              {newsletter.status === "scheduled" && newsletter.scheduledFor && (
                <div>
                  <h3 className="font-medium">Scheduled For</h3>
                  <p className="flex items-center text-sm text-gray-500">
                    <Calendar className="mr-2 h-4 w-4" />
                    {formatDate(newsletter.scheduledFor)} at{" "}
                    {formatTime(newsletter.scheduledFor)}
                  </p>
                </div>
              )}

              {newsletter.status === "sent" && newsletter.sentAt && (
                <>
                  <div>
                    <h3 className="font-medium">Sent</h3>
                    <p className="flex items-center text-sm text-gray-500">
                      <Send className="mr-2 h-4 w-4" />
                      {formatDate(newsletter.sentAt)} at{" "}
                      {formatTime(newsletter.sentAt)}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-medium">Recipients</h3>
                    <div className="space-y-2 text-sm text-gray-500">
                      <p className="flex items-center">
                        <Users className="mr-2 h-4 w-4" />
                        Sent to {newsletter.sentToCount || 0} subscribers
                      </p>
                      {newsletter.failedCount > 0 && (
                        <p className="text-amber-600">
                          Failed to send to {newsletter.failedCount} subscribers
                        </p>
                      )}
                    </div>
                  </div>

                  {newsletter.resentCount > 0 && (
                    <div>
                      <h3 className="font-medium">Resent</h3>
                      <p className="flex items-center text-sm text-gray-500">
                        <RefreshCw className="mr-2 h-4 w-4" />
                        {newsletter.resentCount}{" "}
                        {newsletter.resentCount === 1 ? "time" : "times"}
                        {newsletter.lastResent &&
                          `, last on ${formatDate(newsletter.lastResent)}`}
                      </p>
                    </div>
                  )}
                </>
              )}

              {newsletter.tags && newsletter.tags.length > 0 && (
                <div>
                  <h3 className="font-medium">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {newsletter.tags.map((tag: string) => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h3 className="font-medium">View in Browser</h3>
                <div className="mt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="w-full"
                  >
                    <Link
                      href={`/newsletters/view/${newsletter.id}`}
                      target="_blank"
                    >
                      Open Public View
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Newsletter</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete the
              newsletter
              {newsletter.status === "sent" &&
                " and remove it from your history"}
              .
            </DialogDescription>
          </DialogHeader>

          {newsletter.status === "sent" && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Warning</AlertTitle>
              <AlertDescription>
                This newsletter has already been sent to subscribers. Deleting
                it will not recall the emails that were sent.
              </AlertDescription>
            </Alert>
          )}

          <div className="space-y-4">
            <div>
              <Label
                htmlFor="newsletter-title"
                className="text-muted-foreground"
              >
                Newsletter
              </Label>
              <div id="newsletter-title" className="font-medium">
                {newsletter.title}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm" className="text-sm font-medium">
                Type <span className="font-bold">delete</span> to confirm
              </Label>
              <Input
                id="confirm"
                value={deleteConfirmation}
                onChange={(e) => setDeleteConfirmation(e.target.value)}
                placeholder="delete"
                className="w-full"
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDeleteDialog(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={
                isDeleting || deleteConfirmation.toLowerCase() !== "delete"
              }
            >
              {isDeleting ? "Deleting..." : "Delete Newsletter"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Resend Confirmation Dialog */}
      <Dialog open={showResendDialog} onOpenChange={setShowResendDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Resend Newsletter</DialogTitle>
            <DialogDescription>
              This will send the newsletter again to all active subscribers.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label
                htmlFor="newsletter-title-resend"
                className="text-muted-foreground"
              >
                Newsletter
              </Label>
              <div id="newsletter-title-resend" className="font-medium">
                {newsletter.title}
              </div>
            </div>

            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Please note</AlertTitle>
              <AlertDescription>
                Subscribers will receive this newsletter again. Make sure this
                is intentional to avoid overwhelming your audience.
              </AlertDescription>
            </Alert>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowResendDialog(false)}
            >
              Cancel
            </Button>
            <Button
              variant="default"
              onClick={handleResend}
              disabled={isResending}
              className="bg-[#11922f] hover:bg-[#0a7a24]"
            >
              {isResending ? "Resending..." : "Confirm Resend"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
