"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

interface DataTableSearchProps {
  searchKey: string;
  searchQuery: string;
  setSearchQuery: (value: string | null) => void;
  setPage: (page: number | null) => void;
  placeholder?: string;
}

export function DataTableSearch({
  searchQuery,
  setSearchQuery,
  setPage,
  placeholder = "Search...",
}: DataTableSearchProps) {
  const [value, setValue] = useState(searchQuery || "");

  // Update local state when searchQuery prop changes
  useEffect(() => {
    setValue(searchQuery || "");
  }, [searchQuery]);

  const handleSearch = (term: string) => {
    setValue(term);

    // Use a small delay to avoid too many requests while typing
    const timeoutId = setTimeout(() => {
      setSearchQuery(term || null);
      setPage(1);
    }, 300);

    return () => clearTimeout(timeoutId);
  };

  return (
    <div className="relative w-full max-w-sm">
      <Search className="text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4" />
      <Input
        type="search"
        placeholder={placeholder}
        className="w-full pl-8 text-sm"
        value={value}
        onChange={(e) => handleSearch(e.target.value)}
      />
    </div>
  );
}
