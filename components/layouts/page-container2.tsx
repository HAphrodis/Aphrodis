import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function PageContainer({
  children,
  scrollable = true,
}: {
  children: React.ReactNode;
  scrollable?: boolean;
}) {
  return (
    <>
      {scrollable ? (
        <ScrollArea className="bg-d_background-light dark:bg-d_background-dark h-[calc(97dvh-52px)]">
          <div className="h-full p-4 md:px-6">{children}</div>
        </ScrollArea>
      ) : (
        <div className="bg-d_background-light dark:bg-d_background-dark h-full p-4 md:px-6">
          {children}
        </div>
      )}
    </>
  );
}
