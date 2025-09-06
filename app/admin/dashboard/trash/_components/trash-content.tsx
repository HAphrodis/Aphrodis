/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { fakeTrash, TrashItem } from "@/constants/mock-api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LoaderIcon, Search, Trash2, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

export function TrashContent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["trashItems", page, limit, searchTerm],
    queryFn: () => fakeTrash.getTrashItems({ page, limit, search: searchTerm }),
  });

  const restoreMutation = useMutation({
    mutationFn: fakeTrash.restoreItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trashItems"] });
      toast.success("Item restored successfully");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: fakeTrash.deleteItemPermanently,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trashItems"] });
      toast.success("Item permanently deleted");
    },
  });

  if (error) return <div>An error occurred: {(error as Error).message}</div>;

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="text-muted-foreground absolute top-2.5 left-2 h-4 w-4" />
          <Input
            placeholder="Search trash items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <Select
          value={limit.toString()}
          onValueChange={(value) => setLimit(Number(value))}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select limit" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5">5 per page</SelectItem>
            <SelectItem value="10">10 per page</SelectItem>
            <SelectItem value="20">20 per page</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Deleted At</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                  <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
                  Loading...
                </TableCell>
              </TableRow>
            ) : (
              <AnimatePresence>
                {data?.items.map((item: TrashItem) => (
                  <motion.tr
                    key={item.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.type}</TableCell>
                    <TableCell>
                      {new Date(item.deletedAt).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        {/* <Button
                          variant="outline"
                          size="sm"
                          onClick={() => restoreMutation.mutate(item.id)}
                          disabled={restoreMutation.isLoading}
                        >
                          <RefreshCw className="mr-2 h-4 w-4" />
                          Restore
                        </Button> */}
                        {/* <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => deleteMutation.mutate(item.id)}
                          disabled={deleteMutation.isLoading}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </Button> */}
                      </div>
                    </TableCell>
                  </motion.tr>
                ))}
              </AnimatePresence>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        {/* <p className="text-sm text-muted-foreground">
          Showing {data?.offset + 1} to{' '}
          {Math.min(data?.offset + limit, data?.total_items || 0)} of{' '}
          {data?.total_items} entries
        </p> */}
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((old) => Math.max(old - 1, 1))}
            disabled={page === 1}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((old) => old + 1)}
            disabled={!data || data.offset + limit >= data.total_items}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
