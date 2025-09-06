"use client";

import { useState } from "react";
import type { Subscriber } from "@/types/subscriber";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { apiService } from "@/lib/axios";
import { Loader } from "lucide-react";

interface DeleteSubscriberDialogProps {
  subscriber: Subscriber;
  isOpen: boolean;
  onClose: () => void;
}

export function DeleteSubscriberDialog({
  subscriber,
  isOpen,
  onClose,
}: DeleteSubscriberDialogProps) {
  const [confirmation, setConfirmation] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (confirmation !== "DELETE") {
      toast.error("Please type DELETE to confirm");
      return;
    }

    try {
      setLoading(true);

      interface ApiResponse {
        success: boolean;
        data: { id: string };
        message?: string;
        error?: {
          code: string;
          message: string;
        };
      }

      const result = await apiService.delete<ApiResponse>(
        `/subscribers/${subscriber.id}`,
      );

      if (!result.success) {
        throw new Error(result.error?.message || "Failed to delete subscriber");
      }

      toast.success("Subscriber deleted successfully");
      onClose();
      window.location.reload(); // Refresh the page to show updated data
    } catch (error) {
      console.error("Error deleting subscriber:", error);
      toast.error("Failed to delete subscriber");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Subscriber</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this subscriber? This action cannot
            be undone.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid gap-2">
            <p className="text-sm text-muted-foreground">
              Type <span className="font-bold">DELETE</span> to confirm
            </p>
            <Input
              value={confirmation}
              onChange={(e) => setConfirmation(e.target.value)}
              placeholder="Type DELETE to confirm"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={handleDelete}
              disabled={loading || confirmation !== "DELETE"}
            >
              {loading ? (
                <>
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete Subscriber"
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
