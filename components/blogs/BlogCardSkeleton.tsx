export default function BlogCardSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-lg bg-white shadow-md">
      <div className="relative h-48 bg-gray-200"></div>
      <div className="p-6">
        <div className="mb-4 h-6 w-3/4 rounded bg-gray-200"></div>
        <div className="mb-2 h-4 w-full rounded bg-gray-200"></div>
        <div className="mb-4 h-4 w-5/6 rounded bg-gray-200"></div>
        <div className="flex items-center justify-between">
          <div className="h-3 w-1/4 rounded bg-gray-200"></div>
          <div className="h-3 w-1/4 rounded bg-gray-200"></div>
        </div>
      </div>
    </div>
  );
}
