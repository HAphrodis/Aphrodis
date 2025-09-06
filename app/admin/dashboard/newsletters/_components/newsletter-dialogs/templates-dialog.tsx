"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Template {
  id: string;
  name: string;
}

interface TemplatesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  templates: Template[];
  applyTemplate: (templateId: string) => void;
}

export function TemplatesDialog({
  open,
  onOpenChange,
  templates,
  applyTemplate,
}: TemplatesDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Newsletter Templates</DialogTitle>
          <DialogDescription>
            Choose a template to quickly create your newsletter
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
          {templates.map((template) => (
            <div
              key={template.id}
              className="border rounded-md overflow-hidden cursor-pointer hover:border-[#11922f] transition-colors"
              onClick={() => applyTemplate(template.id)}
            >
              <div className="aspect-[4/3] bg-gray-100 flex items-center justify-center">
                <span className="text-sm text-gray-500">{template.name}</span>
              </div>
              <div className="p-2 text-center text-sm font-medium">
                {template.name}
              </div>
            </div>
          ))}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
