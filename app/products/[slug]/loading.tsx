import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="container max-w-screen-xl">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 py-6">
        <Skeleton className="h-4 w-[100px]" />
        <Skeleton className="h-4 w-[50px]" />
        <Skeleton className="h-4 w-[50px]" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
        {/* Product Image */}
        <Skeleton className="aspect-square" />
        {/* Product Info */}
        <div className="space-y-6">
          {/* Title */}
          <Skeleton className="h-6 w-[60%]" />
          {/* Description */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-[90%]" />
            <Skeleton className="h-4 w-[85%]" />
            <Skeleton className="h-4 w-[80%]" />
            <Skeleton className="h-4 w-[70%]" />
          </div>
          {/* Price */}
          <Skeleton className="h-6 w-[100px]" />
          {/* Buttons */}
          <div className="space-y-4">
            <Skeleton className="h-10 w-full rounded-md" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
}
