import { FeatureRequestForm } from "./FeatureRequestForm";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import type {
  FeatureRequest,
  FeatureRequestFormValues,
} from "@/types/feature-request";
import { ScrollArea } from "@/components/ui/scroll-area";

interface EditFeatureRequestDialogProps {
  request: FeatureRequest | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit: (updatedRequest: Partial<FeatureRequest>) => void;
}

export function EditFeatureRequestDialog({
  request,
  isOpen,
  onClose,
  onEdit,
}: EditFeatureRequestDialogProps) {
  if (!request) return null;

  const handleSubmit = async (
    values: FeatureRequestFormValues,
  ): Promise<void> => {
    onEdit(values);
    onClose();
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
        className="w-full"
      >
        <SheetHeader>
          <SheetTitle>Edit Feature Request</SheetTitle>
        </SheetHeader>
        <ScrollArea className="bg-d_background-light dark:bg-d_background-dark h-[calc(98dvh-52px)]">
          <FeatureRequestForm
            initialValues={request}
            onSubmit={handleSubmit}
            isSubmitting={false}
            submitButtonText="Update Request"
          />
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
