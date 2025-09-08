"use client";

import { useState } from "react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { ContactSheet } from "@/components/shared/contact-sheet";

interface ConnectButtonProps extends ButtonProps {
  email?: string;
  className?: string;
}

export function ConnectButton({
  email = "Email me",
  //   className,
  children = "Let's Start your Project",
  ...props
}: ConnectButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="bg-purple-100 rounded-[calc(var(--radius)+0.125rem)] border border-emerald-500/10 p-0.5">
        <Button
          size="sm"
          className="bg-white text-green-400 w-fit border-emerald-500/10 hover:bg-purple-100"
          onClick={() => setIsOpen(true)}
          {...props}
        >
          {children}
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
