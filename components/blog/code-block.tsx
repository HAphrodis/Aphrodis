"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface CodeBlockProps {
  code: string;
  language: string;
  className?: string;
  showLineNumbers?: boolean;
}

export function CodeBlock({
  code,
  language,
  className,
  showLineNumbers = true,
}: CodeBlockProps) {
  const [highlightedCode, setHighlightedCode] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function highlightCode() {
      try {
        const shiki = await import("shiki");
        const highlighter = await shiki.createHighlighter({
          themes: ["github-dark"],
          langs: [
            language || "typescript",
            "javascript",
            "jsx",
            "tsx",
            "css",
            "html",
            "json",
            "markdown",
            "bash",
            "shell",
          ],
        });

        const html = highlighter.codeToHtml(code, {
          lang: language || "typescript",
          theme: "github-dark",
        });

        setHighlightedCode(html);
        setIsLoading(false);
      } catch (error) {
        console.error("Error highlighting code:", error);
        setIsLoading(false);
      }
    }

    highlightCode();
  }, [code, language]);

  if (isLoading) {
    return (
      <pre
        className={cn(
          "p-4 overflow-x-auto text-sm font-mono bg-emerald-950/50",
          className,
        )}
      >
        <code>{code}</code>
      </pre>
    );
  }

  return (
    <div className="relative">
      <div
        className={cn(
          "shiki-wrapper p-4 overflow-x-auto text-sm font-mono rounded-lg",
          showLineNumbers && "line-numbers",
          className,
        )}
        dangerouslySetInnerHTML={{ __html: highlightedCode }}
      />
    </div>
  );
}
