// components\layout\header.tsx
import React from "react";
import { SidebarTrigger } from "../ui/sidebar";
import { Separator } from "../ui/separator";
// import { Breadcrumbs } from '../breadcrumbs';
import SearchInput from "../admin/search-input";
import { ModeToggle } from "../shared/mode-toggle";
import LiveClock from "./Clock";
import { NotificationPopover } from "@/components/admin/notification-popover";

export default function Header() {
  return (
    <header className="dark:bg-d_background-dark-1000 z-[9999999]! flex h-16 shrink-0 items-center justify-between gap-2 border-b bg-white transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        {/* <Breadcrumbs /> */}
        <LiveClock />
      </div>

      <div className="flex items-center gap-2 px-4">
        <div className="hidden md:flex">
          <SearchInput />
        </div>
        <ModeToggle />
        <NotificationPopover />
      </div>
    </header>
  );
}
