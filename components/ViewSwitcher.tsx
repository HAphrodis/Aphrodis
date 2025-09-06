"use client";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import { Code, Paintbrush } from "lucide-react";

export function ViewSwitcher() {
  const { viewMode, setViewMode } = useTheme();

  return (
    <div className="flex space-x-2">
      <Button
        variant={viewMode === "developer" ? "default" : "outline"}
        size="sm"
        onClick={() => setViewMode("developer")}
      >
        <Code className="mr-2 h-4 w-4" />
        Developer
      </Button>
      <Button
        variant={viewMode === "designer" ? "default" : "outline"}
        size="sm"
        onClick={() => setViewMode("designer")}
      >
        <Paintbrush className="mr-2 h-4 w-4" />
        Designer
      </Button>
    </div>
  );
}
