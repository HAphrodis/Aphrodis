"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Calendar,
  Clock,
  Edit,
  Eye,
  FileText,
  MoreHorizontal,
  RefreshCw,
  Send,
  Trash2,
  Users,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import {
  deleteNewsletter,
  resendNewsletter,
  sendNewsletter,
} from "../_actions/newsletter-actions";
// import { useRouter } from "next/navigation"
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
import { AlertCircle } from "lucide-react";

interface Newsletter {
  id: string;
  title: string;
  subject: string;
  status: "draft" | "scheduled" | "sent";
  scheduledFor: string | null;
  sentAt: string | null;
  createdAt: string;
  sentToCount: number;
}

export function NewsletterList() {
  const [newsletters, setNewsletters] = useState<Newsletter[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [isSending, setIsSending] = useState<string | null>(null);
  const [isResending, setIsResending] = useState<string | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [newsletterToDelete, setNewsletterToDelete] =
    useState<Newsletter | null>(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState("");
  const [showResendDialog, setShowResendDialog] = useState(false);
  const [newsletterToResend, setNewsletterToResend] =
    useState<Newsletter | null>(null);
  const { toast } = useToast();
  // const router = useRouter()

  const fetchNewsletters = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/admin/newsletters`);

      if (!response.ok) {
        throw new Error("Failed to fetch newsletters");
      }

      const data = await response.json();
      setNewsletters(data.data.newsletters || []);
    } catch (error) {
      console.error("Error fetching newsletters:", error);
      toast({
        title: "Error",
        description: "Failed to load newsletters. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNewsletters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDeleteClick = (newsletter: Newsletter) => {
    setNewsletterToDelete(newsletter);
    setDeleteConfirmation("");
    setShowDeleteDialog(true);
  };

  const handleResendClick = (newsletter: Newsletter) => {
    setNewsletterToResend(newsletter);
    setShowResendDialog(true);
  };

  const handleDelete = async () => {
    if (!newsletterToDelete) return;

    if (deleteConfirmation.toLowerCase() !== "delete") {
      toast({
        title: "Error",
        description: "Please type 'delete' to confirm.",
        variant: "destructive",
      });
      return;
    }

    setIsDeleting(newsletterToDelete.id);
    try {
      const result = await deleteNewsletter(newsletterToDelete.id);

      if (result.success) {
        toast({
          title: "Success",
          description: "Newsletter deleted successfully",
        });
        fetchNewsletters(); // Refresh the list
        setShowDeleteDialog(false);
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
      setIsDeleting(null);
    }
  };

  const handleSendNow = async (id: string) => {
    if (confirm("Are you sure you want to send this newsletter now?")) {
      setIsSending(id);
      try {
        const result = await sendNewsletter({ id });

        if (result.success) {
          toast({
            title: "Success",
            description: "Newsletter sent successfully",
          });
          fetchNewsletters(); // Refresh the list
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
        setIsSending(null);
      }
    }
  };

  const handleResend = async () => {
    if (!newsletterToResend) return;

    setIsResending(newsletterToResend.id);
    try {
      const result = await resendNewsletter(newsletterToResend.id);

      if (result.success) {
        toast({
          title: "Success",
          description: "Newsletter resent successfully",
        });
        fetchNewsletters(); // Refresh the list
        setShowResendDialog(false);
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
      setIsResending(null);
    }
  };

  const filteredNewsletters = newsletters.filter((newsletter) => {
    if (activeTab === "all") return true;
    return newsletter.status === activeTab;
  });

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

  return (
    <div className="space-y-6">
      <Tabs defaultValue="all" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="draft">Drafts</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
          <TabsTrigger value="sent">Sent</TabsTrigger>
        </TabsList>
      </Tabs>

      {isLoading ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="overflow-hidden">
              <CardHeader className="pb-2">
                <Skeleton className="mb-2 h-4 w-1/2" />
                <Skeleton className="h-3 w-3/4" />
              </CardHeader>
              <CardContent>
                <Skeleton className="mb-2 h-3 w-full" />
                <Skeleton className="h-3 w-2/3" />
              </CardContent>
              <CardFooter>
                <Skeleton className="h-8 w-full" />
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <>
          {filteredNewsletters.length === 0 ? (
            <div className="py-12 text-center">
              <FileText className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-4 text-lg font-semibold text-gray-900">
                No newsletters found
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                {activeTab === "all"
                  ? "You haven't created any newsletters yet."
                  : `You don't have any ${activeTab} newsletters.`}
              </p>
              <Link
                href="/admin/dashboard/newsletters/create"
                className="mt-6 inline-flex items-center rounded-md bg-[#11922f] px-4 py-2 text-sm font-medium text-white hover:bg-[#00753c]"
              >
                Create your first newsletter
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredNewsletters.map((newsletter) => (
                <Card key={newsletter.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg">
                        {newsletter.title}
                      </CardTitle>
                      <Badge className={getStatusColor(newsletter.status)}>
                        {newsletter.status.charAt(0).toUpperCase() +
                          newsletter.status.slice(1)}
                      </Badge>
                    </div>
                    <CardDescription>{newsletter.subject}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      {newsletter.status === "sent" && newsletter.sentAt && (
                        <div className="flex items-center text-gray-500">
                          <Send className="mr-2 h-4 w-4" />
                          <span>
                            Sent on {formatDate(newsletter.sentAt)} at{" "}
                            {formatTime(newsletter.sentAt)}
                          </span>
                        </div>
                      )}
                      {newsletter.status === "scheduled" &&
                        newsletter.scheduledFor && (
                          <div className="flex items-center text-gray-500">
                            <Calendar className="mr-2 h-4 w-4" />
                            <span>
                              Scheduled for{" "}
                              {formatDate(newsletter.scheduledFor)}
                            </span>
                          </div>
                        )}
                      <div className="flex items-center text-gray-500">
                        <Clock className="mr-2 h-4 w-4" />
                        <span>
                          Created on {formatDate(newsletter.createdAt)}
                        </span>
                      </div>
                      {newsletter.status === "sent" && (
                        <div className="flex items-center text-gray-500">
                          <Users className="mr-2 h-4 w-4" />
                          <span>
                            Sent to {newsletter.sentToCount || 0} subscribers
                          </span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm" asChild>
                      <Link
                        href={`/admin/dashboard/newsletters/${newsletter.id}`}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        View
                      </Link>
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {newsletter.status === "draft" && (
                          <DropdownMenuItem asChild>
                            <Link
                              href={`/admin/dashboard/newsletters/${newsletter.id}/edit`}
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </Link>
                          </DropdownMenuItem>
                        )}
                        {newsletter.status === "draft" && (
                          <DropdownMenuItem
                            onClick={() => handleSendNow(newsletter.id)}
                            disabled={isSending === newsletter.id}
                          >
                            <Send className="mr-2 h-4 w-4" />
                            {isSending === newsletter.id
                              ? "Sending..."
                              : "Send Now"}
                          </DropdownMenuItem>
                        )}
                        {newsletter.status === "sent" && (
                          <DropdownMenuItem
                            onClick={() => handleResendClick(newsletter)}
                            disabled={isResending === newsletter.id}
                          >
                            <RefreshCw className="mr-2 h-4 w-4" />
                            Resend
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem
                          onClick={() => handleDeleteClick(newsletter)}
                          disabled={isDeleting === newsletter.id}
                          className="text-red-600"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Newsletter</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete the
              newsletter
              {newsletterToDelete?.status === "sent" &&
                " and remove it from your history"}
              .
            </DialogDescription>
          </DialogHeader>

          {newsletterToDelete?.status === "sent" && (
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
                {newsletterToDelete?.title}
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
                isDeleting === newsletterToDelete?.id ||
                deleteConfirmation.toLowerCase() !== "delete"
              }
            >
              {isDeleting === newsletterToDelete?.id
                ? "Deleting..."
                : "Delete Newsletter"}
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
                {newsletterToResend?.title}
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
              disabled={isResending === newsletterToResend?.id}
              className="bg-[#11922f] hover:bg-[#0a7a24]"
            >
              {isResending === newsletterToResend?.id
                ? "Resending..."
                : "Confirm Resend"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
