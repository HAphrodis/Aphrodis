// app\admin\dashboard\subscribers\_components\subscriber-tables\cell-action.tsx
"use client";

import { useState } from "react";
import { MoreHorizontal, Loader } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Subscriber } from "@/types/subscriber";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
// import { SubscriberForm } from '../subscriber-form';

interface CellActionProps {
  data: Subscriber;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState("");

  const onConfirmDelete = async () => {
    if (deleteConfirmation !== "DELETE") {
      toast.error("Please type DELETE to confirm");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`/api/subscriber/${data.id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete subscriber");
      }
      toast.success("Subscriber deleted successfully");
      router.refresh();
    } catch (error) {
      console.error("error", error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
      setOpen(false);
      setDeleteConfirmation("");
    }
  };

  // const onEdit = async (formData: { names: string; email: string }) => {
  //   try {
  //     setLoading(true);
  //     const response = await fetch(`/api/subscriber/${data.id}`, {
  //       method: 'PATCH',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify(formData)
  //     });
  //     if (!response.ok) {
  //       throw new Error('Failed to update subscriber');
  //     }
  //     toast.success('Subscriber updated successfully');
  //     router.refresh();
  //     setEditOpen(false);
  //   } catch (error) {
  //     console.error('error', error);
  //     toast.error('Something went wrong');
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Subscriber</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this subscriber? This action
              cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input
              placeholder="Type DELETE to confirm"
              value={deleteConfirmation}
              onChange={(e) => setDeleteConfirmation(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={onConfirmDelete}
              disabled={loading || deleteConfirmation !== "DELETE"}
              variant={"destructive"}
            >
              {loading ? (
                <>
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Subscriber</DialogTitle>
            <DialogDescription>
              Make changes to the subscriber&apos;s information.
            </DialogDescription>
          </DialogHeader>
          {/* <SubscriberForm initialData={data} onSubmit={onEdit} /> */}
        </DialogContent>
      </Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="dark:border-d_background-dark-200 dark:bg-d_background-dark-100"
        >
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => setEditOpen(true)}>
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
