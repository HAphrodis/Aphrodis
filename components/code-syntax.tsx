/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { CheckIcon, CopyIcon, FileIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const LIMIT_LINES = 30;

type LanguageType =
  | "ts"
  | "js"
  | "html"
  | "css"
  | "bash"
  | "tsx"
  | "jsx"
  | "json"
  | "text"
  | "md"
  | "mdx";

interface CodeSyntaxProps {
  code: string;
  language: LanguageType;
  filename?: string;
  className?: string;
  showLineNumbers?: boolean;
  noCopy?: boolean;
  limitLines?: boolean;
}

export function CodeSyntax({
  code,
  language,
  filename,
  className,
  showLineNumbers = false,
  noCopy = false,
  limitLines = true,
}: CodeSyntaxProps) {
  const [highlighted, setHighlighted] = React.useState("");
  const [showMore, setShowMore] = React.useState(false);

  const codeRef = React.useRef<any>(null);

  const lines = code.split("\n").length;

  React.useEffect(() => {
    const selectedTheme = "github-dark";

    async function highlightCode() {
      try {
        const { codeToHtml } = await import("shiki");
        const before = await codeToHtml(code, {
          lang: language,
          theme: selectedTheme,
        });
        setHighlighted(before);
      } catch (error) {
        console.error("Error highlighting code:", error);
        setHighlighted(`<pre>${code}</pre>`);
      }
    }
    highlightCode();
  }, [code, language]);

  return (
    <div
      className={cn(
        "relative flex max-h-96 w-full max-w-full flex-col overflow-hidden rounded-xl border border-emerald-500/20 bg-emerald-950/50",
        showLineNumbers && "shiki-line-numbers",
        className,
      )}
    >
      {filename && (
        <div
          className={cn(
            "flex items-center gap-1 border-b border-emerald-500/20 bg-emerald-900/30 p-2 text-sm text-emerald-200",
            !noCopy && "pl-4",
          )}
        >
          <FileIcon className="h-4 w-4 text-emerald-400" />
          {filename}
          {!noCopy && <CopyButton code={code} />}
        </div>
      )}
      {!noCopy && !filename && (
        <CopyButton code={code} className="absolute top-2 right-2" />
      )}

      {highlighted ? (
        <div
          ref={codeRef}
          data-code-syntax
          className={cn(
            "flex h-full overflow-hidden font-mono text-xs leading-relaxed",
            "[&_pre]:w-full [&_pre]:overflow-auto [&_pre]:p-4 [&_pre]:!bg-transparent",
            "[&_code]:inline-block [&_code]:min-w-full [&_code]:leading-relaxed",
            !showMore &&
              lines > LIMIT_LINES &&
              limitLines &&
              "[&_pre]:overflow-hidden",
            showMore && lines > LIMIT_LINES && limitLines && "[&_pre]:pb-8",
          )}
          dangerouslySetInnerHTML={{ __html: highlighted }}
        />
      ) : (
        <pre
          ref={codeRef}
          data-code-syntax
          className={cn(
            "h-full overflow-auto p-4 font-mono text-xs leading-relaxed text-emerald-100",
            !showMore && lines > LIMIT_LINES && "overflow-hidden",
            showMore && lines > LIMIT_LINES && "pb-8",
          )}
        >
          {code}
        </pre>
      )}

      {limitLines && lines > LIMIT_LINES && (
        <div
          className={cn(
            "absolute right-0 bottom-0 left-0 isolate flex h-24 items-center justify-center transition-all duration-200",
            showMore && "h-12",
          )}
        >
          <div
            className={cn(
              "absolute right-0 bottom-0 left-0 -z-10 h-22 transition-[height] duration-200 [--color:var(--emerald-950)] *:absolute *:inset-0",
              showMore && "h-4",
            )}
          >
            <div className="bg-emerald-950/20 backdrop-blur-[0.5px] [mask-image:linear-gradient(180deg,rgba(0,0,0,0.00)_0%,#000_10%)]" />
            <div className="bg-emerald-950/20 backdrop-blur-[2px] [mask-image:linear-gradient(180deg,rgba(0,0,0,0.00)_10%,#000_20%)]" />
            <div className="bg-emerald-950/20 backdrop-blur-[4.5px] [mask-image:linear-gradient(180deg,rgba(0,0,0,0.00)_20%,#000_30%)]" />
            <div className="bg-emerald-950/20 backdrop-blur-[8px] [mask-image:linear-gradient(180deg,rgba(0,0,0,0.00)_30%,#000_40%)]" />
            <div className="bg-emerald-950/20 backdrop-blur-[12.5px] [mask-image:linear-gradient(180deg,rgba(0,0,0,0.00)_40%,#000_50%)]" />
            <div className="bg-emerald-950/20 backdrop-blur-[18px] [mask-image:linear-gradient(180deg,rgba(0,0,0,0.00)_50%,#000_60%)]" />
            <div className="bg-emerald-950/20 backdrop-blur-[24.5px] [mask-image:linear-gradient(180deg,rgba(0,0,0,0.00)_60%,#000_70%)]" />
            <div className="bg-emerald-950/20 backdrop-blur-[32px] [mask-image:linear-gradient(180deg,rgba(0,0,0,0.00)_70%,#000_80%)]" />
            <div className="bg-emerald-950/20 backdrop-blur-[40.5px] [mask-image:linear-gradient(180deg,rgba(0,0,0,0.00)_80%,#000_90%)]" />
            <div className="bg-emerald-950/20 backdrop-blur-[50px] [mask-image:linear-gradient(180deg,rgba(0,0,0,0.00)_90%,#000_100%)]" />
            <div className="[background:linear-gradient(180deg,rgba(9,9,11,0.00)_0%,var(--emerald-950,#064e3b)_100%)]" />
          </div>
          <Button
            variant="outline"
            size="sm"
            className="bg-emerald-900/50 text-emerald-200 border-emerald-500/20 hover:bg-emerald-800/50 hover:text-emerald-100"
            onClick={() => {
              setShowMore(!showMore);
              if (showMore) {
                codeRef.current.scrollTo({
                  top: 0,
                });
              }
            }}
          >
            {showMore ? "Show Less" : "Show More"}
          </Button>
        </div>
      )}
    </div>
  );
}

interface CopyButtonProps {
  className?: string;
  code: string;
}

const CopyButton = React.memo(({ className, code }: CopyButtonProps) => {
  const [isCopied, setIsCopied] = React.useState(false);

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Copy code"
      className={cn(
        "ml-auto size-8 text-emerald-300 hover:text-emerald-200 hover:bg-emerald-800/50",
        className,
      )}
      onClick={() => {
        if (isCopied) return;

        setIsCopied(true);
        navigator.clipboard.writeText(code);
        setTimeout(() => {
          setIsCopied(false);
        }, 2000);
      }}
    >
      <CopyIcon
        size={16}
        className={cn(
          "delay-50 duration-300",
          isCopied && "absolute scale-0 opacity-0 delay-0",
        )}
      />
      <CheckIcon
        size={16}
        className={cn(
          "delay-50 duration-300",
          !isCopied && "absolute scale-0 opacity-0 delay-0",
        )}
      />
    </Button>
  );
});
CopyButton.displayName = "CopyButton";
