"use client";

import { useState } from "react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { ContactSheet } from "@/components/shared/contact-sheet";
import { ArrowRight, Mail } from "lucide-react";

interface ConnectButtonProps extends ButtonProps {
  email?: string;
  className?: string;
}

export function GetInTouchButton({
  email = "ijbapte@gmail.com",
  //   className,
  children = "Get in Touch",
  ...props
}: ConnectButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="bg-transparent rounded-[calc(var(--radius)+0.125rem)]  border-emerald-500/10 p-0.5">
        <Button
          size="lg"
          className="rounded-full  border-emerald-500/10  group flex items-center justify-center gap-2 w-full bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-medium py-3 px-8"
          onClick={() => setIsOpen(true)}
          {...props}
        >
          <Mail className="w-5 h-5" />
          {children}
          <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
        </Button>
      </div>
      <ContactSheet
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        email={email}
      />
    </>
  );
}
