import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import type { FeatureRequest } from "@/types/feature-request";

interface FeatureRequestDialogProps {
  request: FeatureRequest | null;
  isOpen: boolean;
  onClose: () => void;
}

export function FeatureRequestDialog({
  request,
  isOpen,
  onClose,
}: FeatureRequestDialogProps) {
  if (!request) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{request.title}</DialogTitle>
          <DialogDescription>Feature Request Details</DialogDescription>
        </DialogHeader>
        <div className="mt-4 space-y-4">
          <div>
            <h4 className="font-semibold">Description</h4>
            <p>{request.description}</p>
          </div>
          <div className="flex items-center gap-2">
            <h4 className="font-semibold">Priority:</h4>
            <Badge
              variant={
                request.priority === "high"
                  ? "destructive"
                  : request.priority === "medium"
                    ? "default"
                    : "secondary"
              }
            >
              {request.priority}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <h4 className="font-semibold">Status:</h4>
            <Badge variant="outline">{request.status}</Badge>
          </div>
          <div>
            <h4 className="font-semibold">Requested By</h4>
            <p>{request.requestedBy}</p>
          </div>
          <div>
            <h4 className="font-semibold">Created At</h4>
            <p>{new Date(request.createdAt).toLocaleString()}</p>
          </div>
          <div>
            <h4 className="font-semibold">Last Updated</h4>
            <p>{new Date(request.updatedAt).toLocaleString()}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
