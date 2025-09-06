/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { CheckCircle2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface SaveSuccessDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  router: any;
}

export function SaveSuccessDialog({
  open,
  onOpenChange,
  router,
}: SaveSuccessDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Newsletter Draft Saved</AlertDialogTitle>
          <AlertDialogDescription>
            Your newsletter draft has been saved successfully. You can continue
            editing or return to the newsletters list.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => onOpenChange(false)}>
            Continue Editing
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => router.push("/admin/dashboard/newsletters")}
            className="bg-[#11922f] hover:bg-[#0a7a24]"
          >
            <CheckCircle2 className="h-4 w-4 mr-2" />
            Go to Newsletters
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
