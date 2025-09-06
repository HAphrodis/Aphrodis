import { cn } from "@/lib/utils";
import { AlertCircle, AlertTriangle, Info, CheckCircle } from "lucide-react";

interface CalloutProps {
  icon?: "info" | "warning" | "error" | "success";
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const icons = {
  info: Info,
  warning: AlertTriangle,
  error: AlertCircle,
  success: CheckCircle,
};

const styles = {
  info: "bg-blue-950/30 border-blue-500/50 text-blue-300",
  warning: "bg-amber-950/30 border-amber-500/50 text-amber-300",
  error: "bg-red-950/30 border-red-500/50 text-red-300",
  success: "bg-emerald-950/30 border-emerald-500/50 text-emerald-300",
};

export function Callout({
  children,
  icon = "info",
  title,
  className,
  ...props
}: CalloutProps) {
  const IconComponent = icons[icon];

  return (
    <div
      className={cn(
        "my-6 flex gap-2 rounded-lg border p-4",
        styles[icon],
        className,
      )}
      {...props}
    >
      <IconComponent className="h-5 w-5 mt-1 flex-shrink-0" />
      <div className="w-full">
        {title && <p className="font-medium mb-1">{title}</p>}
        <div>{children}</div>
      </div>
    </div>
  );
}
