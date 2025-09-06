"use client";

import { Button } from "@/components/ui/button";
import { DataTableFilterBox } from "@/components/ui/table/data-table-filter-box";
import { DataTableResetFilter } from "@/components/ui/table/data-table-reset-filter";
import { DataTableSearch } from "@/components/ui/table/data-table-search";
import { RefreshCw } from "lucide-react";
import { motion } from "framer-motion";
import {
  STATUS_OPTIONS,
  useSubscriberTableFilters,
} from "./use-subscriber-table-filters";
import { EnhancedExportButtons } from "../export-buttons";
import type { Subscriber } from "@/types/subscriber";

interface SubscriberTableActionProps {
  data: Subscriber[];
}

export default function SubscriberTableAction({
  data,
}: SubscriberTableActionProps) {
  const {
    statusFilter,
    setStatusFilter,
    isAnyFilterActive,
    resetFilters,
    searchQuery,
    setPage,
    setSearchQuery,
  } = useSubscriberTableFilters();

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <motion.div
      className="mb-4 flex items-center justify-between gap-x-2"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center gap-x-2">
        <DataTableSearch
          searchKey="name"
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setPage={setPage}
          placeholder="Search subscriber..."
        />
        <DataTableResetFilter
          isFilterActive={isAnyFilterActive}
          onReset={resetFilters}
        />
        <DataTableFilterBox
          filterKey="status"
          title="STATUS"
          options={STATUS_OPTIONS}
          setFilterValue={setStatusFilter}
          filterValue={statusFilter}
          multiSelect={false} // Status should be a single value
        />
      </div>
      <div className="flex gap-x-2">
        <Button
          variant="outline"
          size="icon"
          onClick={handleRefresh}
          title="Refresh"
        >
          <RefreshCw className="h-4 w-4" />
        </Button>
        <EnhancedExportButtons data={data} />
      </div>
    </motion.div>
  );
}
