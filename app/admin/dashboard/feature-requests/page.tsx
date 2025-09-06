// app\admin\dashboard\feature-requests\page.tsx
"use client";

import { useState, useEffect } from "react";
import { FeatureRequestForm } from "./_components/FeatureRequestForm";
import { FeatureRequestList } from "./_components/FeatureRequestList";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import PageContainer from "@/components/layouts/page-container";
import { toast } from "sonner";
import type {
  FeatureRequest,
  FeatureRequestFormValues,
} from "@/types/feature-request";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Lightbulb, PlusCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function RequestFeaturePage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [requests, setRequests] = useState<FeatureRequest[]>([]);
  const [filteredRequests, setFilteredRequests] = useState<FeatureRequest[]>(
    [],
  );
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchRequests();
  }, []);

  useEffect(() => {
    filterRequests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requests, statusFilter, searchQuery]);

  async function fetchRequests() {
    setIsLoading(true);
    try {
      const response = await fetch("/api/feature-request");
      if (!response.ok) throw new Error("Failed to fetch feature requests");
      const data = await response.json();
      setRequests(data.data.feature_requests);
    } catch (error) {
      console.error("Error fetching feature requests:", error);
      toast.error("Failed to load feature requests");
    } finally {
      setIsLoading(false);
    }
  }

  function filterRequests() {
    let filtered = requests;
    if (statusFilter !== "all") {
      filtered = filtered.filter((request) => request.status === statusFilter);
    }
    if (searchQuery) {
      filtered = filtered.filter(
        (request) =>
          request.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          request.description.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }
    setFilteredRequests(filtered);
  }

  async function onSubmit(values: FeatureRequestFormValues) {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/feature-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) throw new Error("Failed to submit feature request");

      toast.success(
        "Your feature request has been sent to the development team.",
      );
      setIsOpen(false);
      fetchRequests();
    } catch (error) {
      console.error("Error submitting feature request:", error);
      toast.error("Failed to submit feature request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleStatusChange(id: string, newStatus: string) {
    try {
      const response = await fetch(`/api/feature-request/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok)
        throw new Error("Failed to update feature request status");

      toast.success("Feature request status updated successfully");
      fetchRequests();
    } catch (error) {
      console.error("Error updating feature request status:", error);
      toast.error("Failed to update feature request status");
    }
  }

  async function handleEdit(
    id: string,
    updatedRequest: Partial<FeatureRequest>,
  ) {
    try {
      const response = await fetch(`/api/feature-request/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedRequest),
      });

      if (!response.ok) throw new Error("Failed to update feature request");

      toast.success("Feature request updated successfully");
      fetchRequests();
    } catch (error) {
      console.error("Error updating feature request:", error);
      toast.error("Failed to update feature request");
    }
  }

  async function handleDelete(id: string) {
    try {
      const response = await fetch(`/api/feature-request/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete feature request");

      toast.success("Feature request deleted successfully");
      fetchRequests();
    } catch (error) {
      console.error("Error deleting feature request:", error);
      toast.error("Failed to delete feature request");
    }
  }

  return (
    <PageContainer scrollable>
      <div className="container mx-auto py-6">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl font-bold">
              <Lightbulb className="h-6 w-6 text-yellow-500" />
              Feature Requests Dashboard
            </CardTitle>
            <CardDescription className="">
              Welcome to the Ishimwe Jean Baptiste Feature Request Center. Here,
              you can submit new ideas, report bugs, suggest improvements, or
              request new pages to enhance the user experience of www.hezain.org
              Your input is crucial in shaping the future of our platform.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex gap-4">
                <Input
                  placeholder="Search feature requests..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="max-w-sm"
                />
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button
                    effect={"gooeyLeft"}
                    onClick={() => setIsOpen(true)}
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    <PlusCircle className="mr-2 h-4 w-4" />
                    New Feature Request
                  </Button>
                </SheetTrigger>
                <SheetContent
                  onInteractOutside={(e) => {
                    e.preventDefault();
                  }}
                  className="w-full sm:max-w-lg"
                >
                  <SheetHeader>
                    <SheetTitle>Submit a New Feature Request</SheetTitle>
                    <SheetDescription>
                      Share your ideas to improve Ishimwe Jean Baptiste. We
                      value your input in making our platform better!
                    </SheetDescription>
                  </SheetHeader>
                  <ScrollArea className="mt-4 h-[calc(100vh-120px)]">
                    <FeatureRequestForm
                      onSubmit={onSubmit}
                      isSubmitting={isSubmitting}
                    />
                  </ScrollArea>
                </SheetContent>
              </Sheet>
            </div>
          </CardContent>
        </Card>

        <FeatureRequestList
          requests={filteredRequests}
          onStatusChange={handleStatusChange}
          onDelete={handleDelete}
          onEdit={handleEdit}
          isLoading={isLoading}
        />
      </div>
    </PageContainer>
  );
}
