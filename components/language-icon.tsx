import {
  FileCode2Icon,
  FileTypeIcon,
  FileJsonIcon,
  FileTextIcon,
  TerminalIcon,
  FileIcon as FileHtmlIcon,
  FileX2Icon as FileJsx2Icon,
} from "lucide-react";

interface LanguageIconProps {
  language: string;
  className?: string;
}

export function LanguageIcon({ language, className }: LanguageIconProps) {
  const iconClassName = `h-4 w-4 ${className || ""}`;

  switch (language.toLowerCase()) {
    case "js":
    case "javascript":
      return <FileCode2Icon className={`text-yellow-400 ${iconClassName}`} />;
    case "ts":
    case "typescript":
      return <FileTypeIcon className={`text-blue-400 ${iconClassName}`} />;
    case "jsx":
      return <FileJsx2Icon className={`text-cyan-400 ${iconClassName}`} />;
    case "tsx":
      return <FileJsx2Icon className={`text-blue-400 ${iconClassName}`} />;
    case "json":
      return <FileJsonIcon className={`text-green-400 ${iconClassName}`} />;
    case "html":
      return <FileHtmlIcon className={`text-orange-400 ${iconClassName}`} />;
    case "css":
      return <FileCode2Icon className={`text-purple-400 ${iconClassName}`} />;
    case "bash":
    case "sh":
    case "shell":
    case "zsh":
      return <TerminalIcon className={`text-green-400 ${iconClassName}`} />;
    case "md":
    case "mdx":
      return <FileTextIcon className={`text-gray-400 ${iconClassName}`} />;
    default:
      return <FileCode2Icon className={iconClassName} />;
  }
}
