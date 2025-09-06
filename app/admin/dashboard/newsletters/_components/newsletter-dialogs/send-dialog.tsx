"use client";

import { AlertCircle, Loader, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { SubscriberCount } from "../subscriber-count";

interface SendDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isLoading: boolean;
  handleSendNow: () => Promise<void>;
  selectedSegment: string;
}

export function SendDialog({
  open,
  onOpenChange,
  isLoading,
  handleSendNow,
  selectedSegment,
}: SendDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Send Newsletter Now</DialogTitle>
          <DialogDescription>
            This will send the newsletter to all active subscribers immediately.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="flex items-center space-x-2 bg-blue-50 p-3 rounded-md">
            <SubscriberCount
              segment={selectedSegment}
              showBadge={false}
              className="text-blue-700"
            />
          </div>

          <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0" />
              <p className="text-sm text-amber-700">
                This action cannot be undone. Please review your newsletter
                before sending.
              </p>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSendNow}
            disabled={isLoading}
            className="bg-[#11922f] hover:bg-[#0a7a24]"
          >
            {isLoading ? (
              <>
                <Loader className="h-4 w-4 animate-spin mr-2" />
                Sending...
              </>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Confirm Send
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
