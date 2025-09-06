"use client";

import React from "react";

/* eslint-disable @next/next/no-img-element */
import { cn } from "@/lib/utils";
import * as runtime from "react/jsx-runtime";
import Image from "next/image";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Copy,
  Check,
  ExternalLink,
  Play,
  Download,
  Clipboard,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Callout } from "@/components/blog/callout";
import { CodeBlock } from "@/components/blog/code-block";
import { toast } from "sonner";
import { Admonition } from "@/components/blog/admonition";

const useMDXComponent = (code: string) => {
  const fn = new Function(code);
  return fn({ ...runtime }).default;
};

interface CopyButtonProps {
  text: string;
}

function CopyButton({ text }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);

      toast.success("Copied to clipboard");

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        setCopied(false);
        timeoutRef.current = null;
      }, 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleCopy}
      className="h-8 w-8 absolute top-3 right-3 text-emerald-400 hover:text-emerald-300 hover:bg-emerald-950/50 rounded-md transition-all"
    >
      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      <span className="sr-only">{copied ? "Copied" : "Copy code"}</span>
    </Button>
  );
}

interface CodeProps {
  className?: string;
  children: string;
  filename?: string;
  showLineNumbers?: boolean;
}

function Code({
  className,
  children,
  filename,
  showLineNumbers = true,
}: CodeProps) {
  const language = className ? className.replace(/language-/, "") : "";

  if (!className) {
    return (
      <code className="bg-emerald-950/50 px-1.5 py-0.5 rounded text-emerald-300 font-mono text-sm">
        {children}
      </code>
    );
  }

  return (
    <div className="relative group my-6 code-block-wrapper">
      {filename && (
        <div className="bg-emerald-950/80 border-b border-emerald-500/20 text-emerald-300 px-4 py-2 text-xs font-mono rounded-t-lg flex justify-between items-center">
          <span>{filename}</span>
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 text-emerald-400 hover:text-emerald-300 hover:bg-emerald-950/50 rounded-md"
              onClick={() => {
                const blob = new Blob([children.trim()], {
                  type: "text/plain",
                });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = filename;
                a.click();
                URL.revokeObjectURL(url);

                toast.success("File downloaded");
              }}
            >
              <Download className="h-3.5 w-3.5" />
              <span className="sr-only">Download</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 text-emerald-400 hover:text-emerald-300 hover:bg-emerald-950/50 rounded-md"
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(children.trim());
                  toast.success("Copied to clipboard");
                } catch (err) {
                  console.error("Failed to copy text: ", err);
                }
              }}
            >
              <Clipboard className="h-3.5 w-3.5" />
              <span className="sr-only">Copy</span>
            </Button>
          </div>
        </div>
      )}
      <div
        className={cn("relative", filename ? "rounded-t-none" : "rounded-t-lg")}
      >
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1 z-10">
          <CopyButton text={children.trim()} />
          {language === "jsx" ||
          language === "tsx" ||
          language === "javascript" ||
          language === "typescript" ? (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-emerald-400 hover:text-emerald-300 hover:bg-emerald-950/50 rounded-md"
              onClick={() => {
                // Create a sandbox URL for this code
                const params = new URLSearchParams();
                params.set("code", children.trim());
                params.set("language", language);

                // Open in a new tab
                window.open(
                  `https://codesandbox.io/s/new?file=/src/App.${language === "tsx" || language === "typescript" ? "tsx" : "jsx"}&${params.toString()}`,
                  "_blank",
                );

                toast.success("Opening in CodeSandbox");
              }}
            >
              <Play className="h-4 w-4" />
              <span className="sr-only">Run in CodeSandbox</span>
            </Button>
          ) : null}
        </div>
        <CodeBlock
          code={children.trim()}
          language={language}
          showLineNumbers={showLineNumbers}
          className={cn(
            "rounded-b-lg",
            filename ? "rounded-t-none" : "rounded-t-lg",
          )}
        />
      </div>
    </div>
  );
}

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
}

function CustomLink({ href, children, ...props }: LinkProps) {
  const isExternal = href.startsWith("http");

  if (isExternal) {
    return (
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 transition-colors relative animated-link"
        {...props}
      >
        {children}
        <ExternalLink className="h-3 w-3" />
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className="text-emerald-400 hover:text-emerald-300 transition-colors relative animated-link"
      {...props}
    >
      {children}
    </Link>
  );
}

interface TabsProps {
  items: string[];
  children: React.ReactNode;
}

function CustomTabs({ items, children }: TabsProps) {
  return (
    <Tabs defaultValue={items[0]} className="my-6">
      <TabsList className="bg-emerald-950/50 border border-emerald-500/20">
        {items.map((item) => (
          <TabsTrigger
            key={item}
            value={item}
            className="data-[state=active]:bg-emerald-900/50 data-[state=active]:text-emerald-300"
          >
            {item}
          </TabsTrigger>
        ))}
      </TabsList>
      {React.Children.map(children, (child, index) => (
        <TabsContent value={items[index]} className="mt-2">
          {child}
        </TabsContent>
      ))}
    </Tabs>
  );
}

interface HighlightProps {
  children: React.ReactNode;
  color?: "green" | "blue" | "yellow" | "purple" | "pink";
}

function Highlight({ children, color = "green" }: HighlightProps) {
  const colorClasses = {
    green: "bg-emerald-500/20 text-emerald-300 border-b border-emerald-500/30",
    blue: "bg-blue-500/20 text-blue-300 border-b border-blue-500/30",
    yellow: "bg-amber-500/20 text-amber-300 border-b border-amber-500/30",
    purple: "bg-purple-500/20 text-purple-300 border-b border-purple-500/30",
    pink: "bg-pink-500/20 text-pink-300 border-b border-pink-500/30",
  };

  return (
    <span className={cn("px-1 py-0.5 rounded", colorClasses[color])}>
      {children}
    </span>
  );
}

interface DemoProps {
  children: React.ReactNode;
  title?: string;
}

function Demo({ children, title }: DemoProps) {
  return (
    <div className="my-8 overflow-hidden rounded-lg border border-emerald-500/20 bg-emerald-950/30">
      {title && (
        <div className="border-b border-emerald-500/20 bg-emerald-950/50 px-4 py-2 text-sm font-medium text-emerald-300">
          {title}
        </div>
      )}
      <div className="p-4">{children}</div>
    </div>
  );
}

const components = {
  h1: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className={cn(
        "mt-10 scroll-m-20 text-4xl font-bold tracking-tight gradient-text",
        className,
      )}
      {...props}
    />
  ),
  h2: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className={cn(
        "mt-10 scroll-m-20 border-b border-emerald-500/20 pb-2 text-3xl font-semibold tracking-tight first:mt-0 gradient-text-subtle",
        className,
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className={cn(
        "mt-8 scroll-m-20 text-2xl font-semibold tracking-tight",
        className,
      )}
      {...props}
    />
  ),
  h4: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4
      className={cn(
        "mt-8 scroll-m-20 text-xl font-semibold tracking-tight",
        className,
      )}
      {...props}
    />
  ),
  p: ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}
      {...props}
    />
  ),
  ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul
      className={cn("my-6 ml-6 list-disc marker:text-emerald-500", className)}
      {...props}
    />
  ),
  ol: ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol
      className={cn(
        "my-6 ml-6 list-decimal marker:text-emerald-500",
        className,
      )}
      {...props}
    />
  ),
  li: ({ className, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
    <li className={cn("mt-2", className)} {...props} />
  ),
  blockquote: ({
    className,
    ...props
  }: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className={cn(
        "mt-6 border-l-4 border-emerald-500 pl-6 italic text-emerald-100 relative quote-block",
        className,
      )}
      {...props}
    />
  ),
  img: ({
    className,
    alt,
    ...props
  }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <div className="">
      <img
        className={cn("w-full transition-all duration-300 ", className)}
        alt={alt}
        {...props}
      />
      {alt && (
        <div className="px-4  text-sm text-emerald-300/80 text-center">
          {alt}
        </div>
      )}
    </div>
  ),
  hr: ({ ...props }) => (
    <hr className="my-8 border-emerald-500/20" {...props} />
  ),
  table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="">
      <table
        className={cn(
          "w-full  overflow-y-auto rounded-lg border h-fit border-emerald-500/20! border-collapse text-sm",
          className,
        )}
        {...props}
      />
    </div>
  ),
  tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr
      className={cn(
        "border-b border-emerald-500/20 transition-colors hover:bg-emerald-900/20",
        className,
      )}
      {...props}
    />
  ),
  th: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th
      className={cn(
        "px-4 py-3 text-left font-medium text-emerald-300 [&[align=center]]:text-center [&[align=right]]:text-right",
        className,
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td
      className={cn(
        "px-4 py-3 text-left [&[align=center]]:text-center [&[align=right]]:text-right",
        className,
      )}
      {...props}
    />
  ),
  pre: ({ className, ...props }: React.HTMLAttributes<HTMLPreElement>) => (
    <pre
      className={cn(
        " overflow-x-auto rounded-lg border border-emerald-500/20 bg-emerald-950/30",
        className,
      )}
      {...props}
    />
  ),
  code: Code,
  Image,
  a: CustomLink,
  Callout,
  Tabs: CustomTabs,
  Highlight,
  Demo,
  Admonition,
};

interface MdxProps {
  code: string;
}

export function Mdx({ code }: MdxProps) {
  const Component = useMDXComponent(code);

  return (
    <div className="mdx-content">
      <Component components={components} />
    </div>
  );
}
