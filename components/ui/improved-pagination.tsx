"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

interface ImprovedPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  loading?: boolean;
}

export function ImprovedPagination({
  currentPage,
  totalPages,
  onPageChange,
  loading = false,
}: ImprovedPaginationProps) {
  // Generate page numbers to display
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      // Show all pages if total is less than max to show
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Always include first page
      pageNumbers.push(1);

      // Calculate start and end of middle pages
      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);

      // Adjust if we're near the beginning
      if (currentPage <= 3) {
        endPage = Math.min(totalPages - 1, 4);
      }

      // Adjust if we're near the end
      if (currentPage >= totalPages - 2) {
        startPage = Math.max(2, totalPages - 3);
      }

      // Add ellipsis after first page if needed
      if (startPage > 2) {
        pageNumbers.push("...");
      }

      // Add middle pages
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      // Add ellipsis before last page if needed
      if (endPage < totalPages - 1) {
        pageNumbers.push("...");
      }

      // Always include last page
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Page numbers display */}
      <Pagination className="w-auto">
        <PaginationContent className="flex-wrap gap-2">
          {/* Previous button */}
          <PaginationItem>
            <motion.div whileHover={{ x: -2 }} whileTap={{ scale: 0.95 }}>
              <Button
                className="h-9 w-9 rounded-full border-[#cafff7] text-primary hover:bg-[#cafff7]/20 hover:text-primary"
                disabled={currentPage === 1 || loading}
                onClick={() => onPageChange(currentPage - 1)}
                size="icon"
                variant="outline">
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Previous page</span>
              </Button>
            </motion.div>
          </PaginationItem>

          {/* Page numbers */}
          {pageNumbers.map((page, index) => (
            <PaginationItem key={index}>
              {page === "..." ? (
                <span className="flex h-9 w-9 items-center justify-center text-sm text-gray-400">
                  ...
                </span>
              ) : (
                <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }}>
                  <PaginationLink
                    className={cn(
                      "h-9 w-9 rounded-full border border-[#cafff7] p-0 text-sm",
                      currentPage === page
                        ? "bg-primary text-white hover:bg-[#00753c] hover:text-white"
                        : "text-primary hover:bg-[#cafff7]/20 hover:text-primary",
                    )}
                    isActive={currentPage === page}
                    onClick={() => onPageChange(page as number)}>
                    {page}
                  </PaginationLink>
                </motion.div>
              )}
            </PaginationItem>
          ))}

          {/* Next button */}
          <PaginationItem>
            <motion.div whileHover={{ x: 2 }} whileTap={{ scale: 0.95 }}>
              <Button
                className="h-9 w-9 rounded-full border-[#cafff7] text-primary hover:bg-[#cafff7]/20 hover:text-primary"
                disabled={currentPage === totalPages || loading}
                onClick={() => onPageChange(currentPage + 1)}
                size="icon"
                variant="outline">
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">Next page</span>
              </Button>
            </motion.div>
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      {/* Loading indicator */}
      {loading && (
        <div className="flex items-center justify-center text-sm text-primary">
          <Loader className="mr-2 h-4 w-4 animate-spin" />
          Loading articles...
        </div>
      )}
    </div>
  );
}
