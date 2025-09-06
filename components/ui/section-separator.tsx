import { cn } from "@/lib/utils";

interface SectionSeparatorProps {
  className?: string;
  variant?: "default" | "glow";
}

export function SectionSeparator({
  className = "",
  variant = "default",
}: SectionSeparatorProps) {
  return (
    <div className="relative ">
      {/* Main separator container */}
      <div
        className={cn(
          "relative flex items-center w-full mx-auto bg-[#002922]",
          className,
        )}
      >
        {/* Left gradient line */}
        <div className="h-px flex-1 bg-linear-to-r from-transparent via-emerald-500/30 to-emerald-500/40" />

        {/* Center pill with enhanced effects */}
        <div className="relative mx-4 group">
          {/* Base pill with stronger visibility */}
          <div className="w-10 h-[0.7rem] rounded-full bg-emerald-500/40 backdrop-blur-xs border border-emerald-500/20" />

          {/* Animated gradient overlay */}
          <div className="absolute inset-0 w-10 h-[0.7rem] rounded-full bg-linear-to-r from-emerald-400/60 to-emerald-600/60 blur-[2px] animate-pulse" />

          {/* Interactive hover glow */}
          <div className="absolute inset-0 w-10 h-[0.7rem] rounded-full bg-linear-to-r from-emerald-400/0 to-emerald-600/0 blur-md transition-all duration-300 group-hover:from-emerald-400/80 group-hover:to-emerald-600/80" />

          {/* Permanent subtle glow */}
          <div className="absolute -inset-1 bg-emerald-500/20 blur-xs rounded-full" />

          {/* Bottom directional light effect */}
          {variant === "glow" && (
            <>
              {/* Main bottom glow */}
              <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-32 h-24 bg-linear-to-b from-emerald-500/30 to-transparent blur-2xl" />

              {/* Additional light rays */}
              <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
                <div className="w-px h-12 bg-linear-to-b from-emerald-500/40 to-transparent transform -rotate-45 translate-x-6" />
                <div className="w-px h-12 bg-linear-to-b from-emerald-500/40 to-transparent" />
                <div className="w-px h-12 bg-linear-to-b from-emerald-500/40 to-transparent transform rotate-45 -translate-x-6" />
              </div>
            </>
          )}
        </div>

        {/* Right gradient line */}
        <div className="h-px flex-1 bg-linear-to-r from-emerald-500/40 via-emerald-500/30 to-transparent" />

        {/* Subtle ambient glow for the entire separator */}
        {variant === "glow" && (
          <div className="absolute inset-0 bg-linear-to-b from-transparent via-emerald-500/5 to-emerald-500/10 blur-3xl" />
        )}
      </div>
    </div>
  );
}
