"use client";

import type React from "react";

import { useState } from "react";
import type { Subscriber } from "@/types/subscriber";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { apiService } from "@/lib/axios";
import { Loader } from "lucide-react";

interface EditSubscriberDialogProps {
  subscriber: Subscriber;
  isOpen: boolean;
  onClose: () => void;
}

export function EditSubscriberDialog({
  subscriber,
  isOpen,
  onClose,
}: EditSubscriberDialogProps) {
  const [name, setName] = useState(subscriber.name || "");
  const [email, setEmail] = useState(subscriber.email);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Email is required");
      return;
    }

    try {
      setLoading(true);

      interface ApiResponse {
        success: boolean;
        data: Subscriber;
        message?: string;
        error?: {
          code: string;
          message: string;
        };
      }

      const result = await apiService.patch<ApiResponse>(
        `/subscribers/${subscriber.id}`,
        {
          name,
          email,
        },
      );

      if (!result.success) {
        throw new Error(result.error?.message || "Failed to update subscriber");
      }

      toast.success("Subscriber updated successfully");
      onClose();
      window.location.reload(); // Refresh the page to show updated data
    } catch (error) {
      console.error("Error updating subscriber:", error);
      toast.error("Failed to update subscriber");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Subscriber</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Subscriber name"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
