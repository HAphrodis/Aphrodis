// app\admin\dashboard\message\_components\message-tables\message-table-action.tsx
"use client";

import type React from "react";
import { Button } from "@/components/ui/button";
import { ExportButtons } from "../export-buttons";
import type { Message } from "@/types/message";
import { motion } from "framer-motion";
import { RefreshCw } from "lucide-react";
import { DataTableSearch } from "@/components/ui/table/data-table-search";
import {
  STAR_OPTIONS,
  ARCHIVE_OPTIONS,
  READ_OPTIONS,
  useMessageTableFilters,
} from "./use-message-table-filters";
import { DataTableFilterBox } from "@/components/ui/table/data-table-filter-box";
import { DataTableResetFilter } from "@/components/ui/table/data-table-reset-filter";

interface MessageTableActionProps {
  data: Message[];
  tableRef: React.RefObject<HTMLTableElement | null>;
  onRefresh: () => void;
}

export default function MessageTableAction({
  data,
  tableRef,
  onRefresh,
}: MessageTableActionProps) {
  const {
    categoriesFilter,
    setCategoriesFilter,
    archivedFilter,
    setArchivedFilter,
    readFilter,
    setReadFilter,
    isAnyFilterActive,
    resetFilters,
    searchQuery,
    setPage,
    setSearchQuery,
  } = useMessageTableFilters();

  return (
    <motion.div
      className="mb-4 flex items-center justify-between gap-x-2"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center gap-x-2 flex-wrap">
        <DataTableSearch
          searchKey="name"
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setPage={setPage}
        />
        <DataTableResetFilter
          isFilterActive={isAnyFilterActive}
          onReset={resetFilters}
        />
        <DataTableFilterBox
          filterKey="categories"
          title="STAR"
          options={STAR_OPTIONS}
          setFilterValue={setCategoriesFilter}
          filterValue={categoriesFilter}
        />

        <DataTableFilterBox
          filterKey="read"
          title="STATUS"
          options={READ_OPTIONS}
          setFilterValue={setReadFilter}
          filterValue={readFilter}
        />
        <DataTableFilterBox
          filterKey="archived"
          title="ARCHIVE"
          options={ARCHIVE_OPTIONS}
          setFilterValue={setArchivedFilter}
          filterValue={archivedFilter}
        />
      </div>
      <div className="flex gap-x-2">
        <Button
          variant="outline"
          size="icon"
          onClick={onRefresh}
          title="Refresh"
        >
          <RefreshCw className="h-4 w-4" />
        </Button>
        <ExportButtons tableRef={tableRef} data={data} />
      </div>
    </motion.div>
  );
}
