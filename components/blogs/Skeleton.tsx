// components/skeletons/BlogSkeleton.tsx
import React from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function BlogSkeleton() {
  return (
    <div className="group">
      <Card className="relative overflow-hidden border border-[#b7d5f5] bg-[#e7f0f9]">
        <CardHeader className="p-0">
          <Skeleton className="h-48 w-full" />
        </CardHeader>
        <CardContent className="p-4">
          <Skeleton className="mb-2 h-6 w-3/4" />
          <Skeleton className="mb-4 h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </CardContent>
        <CardFooter className="flex items-center justify-between p-4 pt-0">
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-4 w-6" />
        </CardFooter>
      </Card>
    </div>
  );
}
