/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  Link,
  Image,
  Code,
  Heading1,
  Heading2,
  Heading3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ToolbarProps {
  editor: any;
}

export function Toolbar({ editor }: ToolbarProps) {
  if (!editor) {
    return null;
  }

  const toolbarItems = [
    {
      group: "text",
      items: [
        {
          icon: <Bold className="h-4 w-4" />,
          title: "Bold",
          action: () => editor.execCommand("Bold"),
          isActive: editor.queryCommandState("Bold"),
        },
        {
          icon: <Italic className="h-4 w-4" />,
          title: "Italic",
          action: () => editor.execCommand("Italic"),
          isActive: editor.queryCommandState("Italic"),
        },
        {
          icon: <Underline className="h-4 w-4" />,
          title: "Underline",
          action: () => editor.execCommand("Underline"),
          isActive: editor.queryCommandState("Underline"),
        },
      ],
    },
    {
      group: "align",
      items: [
        {
          icon: <AlignLeft className="h-4 w-4" />,
          title: "Align Left",
          action: () => editor.execCommand("JustifyLeft"),
          isActive: editor.queryCommandState("JustifyLeft"),
        },
        {
          icon: <AlignCenter className="h-4 w-4" />,
          title: "Align Center",
          action: () => editor.execCommand("JustifyCenter"),
          isActive: editor.queryCommandState("JustifyCenter"),
        },
        {
          icon: <AlignRight className="h-4 w-4" />,
          title: "Align Right",
          action: () => editor.execCommand("JustifyRight"),
          isActive: editor.queryCommandState("JustifyRight"),
        },
      ],
    },
    {
      group: "lists",
      items: [
        {
          icon: <List className="h-4 w-4" />,
          title: "Bullet List",
          action: () => editor.execCommand("InsertUnorderedList"),
          isActive: editor.queryCommandState("InsertUnorderedList"),
        },
        {
          icon: <ListOrdered className="h-4 w-4" />,
          title: "Numbered List",
          action: () => editor.execCommand("InsertOrderedList"),
          isActive: editor.queryCommandState("InsertOrderedList"),
        },
      ],
    },
    {
      group: "headings",
      items: [
        {
          icon: <Heading1 className="h-4 w-4" />,
          title: "Heading 1",
          action: () => editor.execCommand("FormatBlock", false, "h1"),
          isActive: false,
        },
        {
          icon: <Heading2 className="h-4 w-4" />,
          title: "Heading 2",
          action: () => editor.execCommand("FormatBlock", false, "h2"),
          isActive: false,
        },
        {
          icon: <Heading3 className="h-4 w-4" />,
          title: "Heading 3",
          action: () => editor.execCommand("FormatBlock", false, "h3"),
          isActive: false,
        },
      ],
    },
    {
      group: "media",
      items: [
        {
          icon: <Link className="h-4 w-4" />,
          title: "Insert Link",
          action: () => {
            const url = prompt("Enter URL");
            if (url) {
              editor.execCommand("mceInsertLink", false, url);
            }
          },
          isActive: false,
        },
        {
          // eslint-disable-next-line jsx-a11y/alt-text
          icon: <Image className="h-4 w-4" />,
          title: "Insert Image",
          action: () => {
            const url = prompt("Enter image URL");
            if (url) {
              editor.execCommand(
                "mceInsertContent",
                false,
                `<img src="${url}" alt="Image" style="max-width: 100%; height: auto;" />`,
              );
            }
          },
          isActive: false,
        },
        {
          icon: <Code className="h-4 w-4" />,
          title: "Insert Code",
          action: () => editor.execCommand("mceCodeEditor"),
          isActive: false,
        },
      ],
    },
  ];

  return (
    <TooltipProvider>
      <div className="border border-b-0 rounded-t-md bg-muted/50 p-1 flex flex-wrap gap-1">
        {toolbarItems.map((group, groupIndex) => (
          <div key={group.group} className="flex items-center">
            <div className="flex items-center gap-1">
              {group.items.map((item) => (
                <Tooltip key={item.title}>
                  <TooltipTrigger asChild>
                    <Button
                      variant={item.isActive ? "secondary" : "ghost"}
                      size="sm"
                      onClick={item.action}
                      className="h-8 w-8 p-0"
                    >
                      {item.icon}
                      <span className="sr-only">{item.title}</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>{item.title}</TooltipContent>
                </Tooltip>
              ))}
            </div>
            {groupIndex < toolbarItems.length - 1 && (
              <Separator orientation="vertical" className="mx-1 h-6" />
            )}
          </div>
        ))}
      </div>
    </TooltipProvider>
  );
}
