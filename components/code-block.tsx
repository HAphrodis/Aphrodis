"use client";

import React, { useState } from "react";
import { CheckIcon, CopyIcon, CodeIcon } from "lucide-react";
import { LanguageIcon } from "@/components/language-icon";
import { CodeActions } from "@/components/code-actions";

interface CodeBlockProps {
  children: React.ReactNode;
  className?: string;
  filename?: string;
  language?: string;
}

export function CodeBlock({
  children,
  className,
  filename,
  language,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  // Extract code content from children
  const codeString = React.Children.toArray(children)
    .filter(
      (child) =>
        typeof child === "string" ||
        (typeof child === "object" &&
          child !== null &&
          "props" in child &&
          typeof (child as { props: { children: unknown } }).props.children ===
            "string"),
    )
    .map((child) =>
      typeof child === "string"
        ? child
        : React.isValidElement(child) && "props" in child
          ? (child as React.ReactElement<{ children: string }>).props.children
          : "",
    )
    .join("");

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(codeString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Extract language from className (e.g., "language-tsx" -> "tsx")
  const codeLanguage =
    language ||
    (className?.includes("language-") ? className.split("language-")[1] : "");

  return (
    <div className="group relative my-6 overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900">
      {/* Header with filename and language badge */}
      <div className="flex items-center justify-between border-b border-zinc-200 bg-zinc-100 px-4 py-2 dark:border-zinc-800 dark:bg-zinc-800/50">
        <div className="flex items-center gap-2">
          <CodeIcon className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
          {filename && (
            <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              {filename}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {codeLanguage && (
            <span className="flex items-center gap-1 rounded-full bg-zinc-200 px-2 py-0.5 text-xs font-medium text-zinc-700 dark:bg-zinc-700 dark:text-zinc-300">
              <LanguageIcon language={codeLanguage} />
              {codeLanguage}
            </span>
          )}
          <button
            onClick={copyToClipboard}
            className="flex h-7 w-7 items-center justify-center rounded-md text-zinc-500 transition-colors hover:bg-zinc-200 hover:text-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-700 dark:hover:text-zinc-200"
            aria-label="Copy code to clipboard"
          >
            {copied ? (
              <CheckIcon className="h-4 w-4 text-green-500" />
            ) : (
              <CopyIcon className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      {/* Code content with enhanced styling */}
      <div className="code-highlight relative overflow-x-auto p-4 text-sm">
        <CodeActions
          code={codeString}
          filename={filename}
          language={codeLanguage}
        />
        {children}
      </div>

      {/* Decorative elements */}
      <div className="absolute -left-2 -top-2 h-16 w-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 opacity-10 blur-xl" />
      <div className="absolute -bottom-2 -right-2 h-16 w-16 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 opacity-10 blur-xl" />

      {/* Glow effect on hover */}
      <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-purple-500/10 via-transparent to-blue-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </div>
  );
}
