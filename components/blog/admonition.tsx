import React from "react";
import { cn } from "@/lib/utils";
import {
  AlertCircle,
  AlertTriangle,
  Info,
  Lightbulb,
  HelpCircle,
} from "lucide-react";

type AdmonitionType =
  | "tip"
  | "info"
  | "warning"
  | "danger"
  | "note"
  | "question";

interface AdmonitionProps {
  type: AdmonitionType;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const icons: Record<AdmonitionType, React.ElementType> = {
  tip: Lightbulb,
  info: Info,
  warning: AlertTriangle,
  danger: AlertCircle,
  note: Info,
  question: HelpCircle,
};

const styles: Record<AdmonitionType, string> = {
  tip: "bg-emerald-950/30 border-emerald-500/50 text-emerald-300",
  info: "bg-blue-950/30 border-blue-500/50 text-blue-300",
  warning: "bg-amber-950/30 border-amber-500/50 text-amber-300",
  danger: "bg-red-950/30 border-red-500/50 text-red-300",
  note: "bg-purple-950/30 border-purple-500/50 text-purple-300",
  question: "bg-cyan-950/30 border-cyan-500/50 text-cyan-300",
};

const titles: Record<AdmonitionType, string> = {
  tip: "Tip",
  info: "Info",
  warning: "Warning",
  danger: "Danger",
  note: "Note",
  question: "Question",
};

export function Admonition({
  type,
  title,
  children,
  className,
}: AdmonitionProps) {
  const IconComponent = icons[type];
  const defaultTitle = titles[type];

  return (
    <div
      className={cn("my-6 rounded-lg border-l-4 p-4", styles[type], className)}
    >
      <div className="flex gap-3">
        <div className="flex-shrink-0 mt-1">
          <IconComponent className="h-5 w-5" />
        </div>
        <div className="w-full">
          {(title || defaultTitle) && (
            <p className="font-medium mb-1">{title || defaultTitle}</p>
          )}
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
}
