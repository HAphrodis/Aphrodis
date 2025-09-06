/* eslint-disable @next/next/no-img-element */
"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface FullPreviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  content: string;
}

export function FullPreviewDialog({
  open,
  onOpenChange,
  content,
}: FullPreviewDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl h-[80vh]">
        <DialogHeader>
          <DialogTitle>Newsletter Preview</DialogTitle>
          <DialogDescription>
            This is how your newsletter will appear to subscribers.
          </DialogDescription>
        </DialogHeader>

        <div className="overflow-auto h-full border rounded-md p-6 bg-white">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-6">
              <img
                src="/org/logo-landscape.jpg"
                alt="Ishimwe Jean Baptiste Logo"
                className="h-12 mx-auto mb-4"
              />
            </div>

            {content ? (
              <div dangerouslySetInnerHTML={{ __html: content }} />
            ) : (
              <div className="text-center text-gray-500 py-20">
                <p>No content to preview</p>
              </div>
            )}

            <div className="mt-8 pt-8 border-t text-center text-sm text-gray-500">
              <p>Ishimwe Jean Baptiste | Rulindo, Rwanda</p>
              <p>
                <a href="#" className="text-[#11922f]">
                  Unsubscribe
                </a>{" "}
                |
                <a href="#" className="text-[#11922f]">
                  {" "}
                  View in browser
                </a>
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
