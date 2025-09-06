"use client";

import { useState } from "react";
import type { FeatureRequest } from "@/types/feature-request";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FeatureRequestDialog } from "./FeatureRequestDialog";
import { Edit, Trash2, EyeIcon } from "lucide-react";
import { formatDateShort } from "@/utils/formatTime";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { EditFeatureRequestDialog } from "./EditFeatureRequestDialog";

interface FeatureRequestListProps {
  requests: FeatureRequest[];
  onStatusChange: (id: string, newStatus: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, updatedRequest: Partial<FeatureRequest>) => void;
  isLoading: boolean;
}

export function FeatureRequestList({
  requests,
  onStatusChange,
  onDelete,
  onEdit,
  isLoading,
}: FeatureRequestListProps) {
  const [selectedRequest, setSelectedRequest] = useState<FeatureRequest | null>(
    null,
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState("");

  const openDialog = (request: FeatureRequest) => {
    setSelectedRequest(request);
    setIsDialogOpen(true);
  };

  const openEditDialog = (request: FeatureRequest) => {
    setSelectedRequest(request);
    setIsEditDialogOpen(true);
  };

  const handleEdit = (updatedRequest: Partial<FeatureRequest>) => {
    if (selectedRequest) {
      onEdit(selectedRequest.id, updatedRequest);
      setIsEditDialogOpen(false);
    }
  };

  const handleDelete = (id: string) => {
    if (deleteConfirmation.toLowerCase() === "delete") {
      onDelete(id);
      setDeleteConfirmation("");
    }
  };

  if (isLoading) {
    return <FeatureRequestListSkeleton />;
  }

  if (requests.length === 0) {
    return <EmptyState />;
  }

  return (
    <>
      <Table className="bg-background rounded-lg border p-2">
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Requested on</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requests.map((request, index) => (
            <TableRow key={request.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{request.title}</TableCell>
              <TableCell>{request.description.substring(0, 40)}...</TableCell>
              <TableCell>
                <Badge
                  variant={
                    request.priority === "high"
                      ? "destructive"
                      : request.priority === "low"
                        ? "secondary"
                        : "default"
                  }
                >
                  {request.priority}
                </Badge>
              </TableCell>
              <TableCell>
                <Select
                  value={request.status}
                  onValueChange={(value) => onStatusChange(request.id, value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell>
                {formatDateShort(new Date(request.createdAt))}
              </TableCell>
              <TableCell className="flex gap-2">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="ghost"
                      className="p-2 hover:bg-gray-200 hover:dark:bg-gray-800"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete the feature request. Type &quot;delete&quot; to
                        confirm.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <Input
                      value={deleteConfirmation}
                      onChange={(e) => setDeleteConfirmation(e.target.value)}
                      placeholder="Type 'delete' to confirm"
                    />
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDelete(request.id)}
                        className="bg-red-500 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-700 text-white"
                        disabled={deleteConfirmation.toLowerCase() !== "delete"}
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

                <Button
                  variant="ghost"
                  className="p-2 hover:bg-gray-200 hover:dark:bg-gray-800"
                  onClick={() => openDialog(request)}
                >
                  <EyeIcon className="h-4 w-4" />
                </Button>

                <Button
                  variant="ghost"
                  className="p-2 hover:bg-gray-200 hover:dark:bg-gray-800"
                  onClick={() => openEditDialog(request)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <FeatureRequestDialog
        request={selectedRequest}
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
      <EditFeatureRequestDialog
        request={selectedRequest}
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        onEdit={handleEdit}
      />
    </>
  );
}

function EmptyState() {
  return (
    <div className="p-4">
      <p>
        No feature requests found, add new request or try to adjust search or
        filters.
      </p>
    </div>
  );
}

function FeatureRequestListSkeleton() {
  return (
    <Table className="bg-background rounded-lg border p-2">
      <TableHeader>
        <TableRow>
          <TableHead>#</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Priority</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Requested on</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {[...Array(5)].map((_, i) => (
          <TableRow key={i}>
            <TableCell>
              <div className="h-4 w-4 animate-pulse rounded bg-gray-200" />
            </TableCell>
            <TableCell>
              <div className="h-4 w-32 animate-pulse rounded bg-gray-200" />
            </TableCell>
            <TableCell>
              <div className="h-4 w-48 animate-pulse rounded bg-gray-200" />
            </TableCell>
            <TableCell>
              <div className="h-6 w-16 animate-pulse rounded bg-gray-200" />
            </TableCell>
            <TableCell>
              <div className="h-8 w-24 animate-pulse rounded bg-gray-200" />
            </TableCell>
            <TableCell>
              <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
            </TableCell>
            <TableCell>
              <div className="h-8 w-8 animate-pulse rounded-full bg-gray-200" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
