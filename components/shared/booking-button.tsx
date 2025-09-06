// components\shared\booking-button.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import Link from "next/link";

interface BookingButtonProps {
  className?: string;
  variant?: "default" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  text?: string;
}

export default function BookingButton({
  className = "",
  variant = "outline",
  // size = "default",
  text = "Schedule a call",
}: BookingButtonProps) {
  return (
    <Button
      variant={variant}
      size="lg"
      className={`hover:text-emerald-400 group flex items-center justify-center gap-2 w-full bg-transparent hover:bg-emerald-500/10 text-emerald-400 font-medium  py-5 px-8 rounded-full border border-emerald-500/30 hover:border-emerald-500/60 transition-all duration-300 ${className}`}
      asChild
    >
      <Link href="/booking">
        <Calendar className="mr-2 h-4 w-4" />
        {text}
      </Link>
    </Button>
  );
}
