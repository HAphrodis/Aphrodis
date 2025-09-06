// app\admin\dashboard\message\_components\message-tables\use-message-table-filters.tsx
"use client";

import { searchParams } from "@/lib/searchparams";
import { useQueryState } from "nuqs";
import { useCallback, useMemo } from "react";

export const STAR_OPTIONS = [
  { value: "true", label: "Starred" },
  { value: "false", label: "Unstarred" },
];

export const ARCHIVE_OPTIONS = [
  { value: "false", label: "Unarchived" },
  { value: "true", label: "Archived" },
];

export const READ_OPTIONS = [
  { value: "read", label: "Read" },
  { value: "unread", label: "Unread" },
  { value: "all", label: "All" },
];

export function useMessageTableFilters() {
  const [searchQuery, setSearchQuery] = useQueryState(
    "q",
    searchParams.q
      .withOptions({ shallow: false, throttleMs: 1000 })
      .withDefault(""),
  );

  const [categoriesFilter, setCategoriesFilter] = useQueryState(
    "categories",
    searchParams.categories.withOptions({ shallow: false }).withDefault(""),
  );

  const [archivedFilter, setArchivedFilter] = useQueryState(
    "archived",
    searchParams.archived.withOptions({ shallow: false }).withDefault("false"),
  );

  const [readFilter, setReadFilter] = useQueryState(
    "read",
    searchParams.read.withOptions({ shallow: false }).withDefault("all"),
  );

  const [page, setPage] = useQueryState(
    "page",
    searchParams.page.withDefault(1),
  );

  const resetFilters = useCallback(() => {
    setSearchQuery(null);
    setCategoriesFilter(null);
    setArchivedFilter("false");
    setReadFilter("all");
    setPage(1);
  }, [
    setSearchQuery,
    setCategoriesFilter,
    setArchivedFilter,
    setReadFilter,
    setPage,
  ]);

  const isAnyFilterActive = useMemo(() => {
    return (
      !!searchQuery ||
      !!categoriesFilter ||
      archivedFilter !== "false" ||
      readFilter !== "all"
    );
  }, [searchQuery, categoriesFilter, archivedFilter, readFilter]);

  return {
    searchQuery,
    setSearchQuery,
    page,
    setPage,
    resetFilters,
    isAnyFilterActive,
    categoriesFilter,
    setCategoriesFilter,
    archivedFilter,
    setArchivedFilter,
    readFilter,
    setReadFilter,
  };
}
