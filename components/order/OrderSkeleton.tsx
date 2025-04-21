import { Skeleton } from "../ui/skeleton";

type mode = "history" | "details";

const OrderSkeletonItem = () => (
  <tr className="border-b border-border">
    <td className="p-6 ps-0 text-start text-sm font-medium">
      <div className="flex items-center sm:items-start gap-4">
        <Skeleton className="w-[100px] h-[125px] sm:w-[100px] sm:h-[100px] rounded" />
        <div className="space-y-1 pt-2">
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-4 w-20 sm:hidden" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-24 sm:hidden" />
        </div>
      </div>
    </td>
    <td className="hidden sm:table-cell p-6 ps-0 text-center text-sm">
      <Skeleton className="h-4 w-16 mx-auto" />
    </td>
    <td className="hidden sm:table-cell p-6 ps-0 text-center text-sm">
      <Skeleton className="h-4 w-16 mx-auto" />
    </td>
    <td className="py-6 text-end">
      <Skeleton className="h-4 w-24 hidden sm:inline-flex" />
    </td>
  </tr>
);

export default function OrderSkeleton({ mode }: { mode: mode }) {
  return (
    <div className="mb-20">
      {/* Order summary section */}
      {mode === "history" ? (
        <div className="flex flex-col gap-4 sm:gap-0 sm:flex-row items-center justify-between bg-muted rounded p-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 grow w-full">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="flex justify-between sm:flex-col gap-1 col-span-1 border-b sm:border-b-0 border-border pb-4 sm:pb-0"
              >
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-20" />
              </div>
            ))}
          </div>
          <Skeleton className="w-full sm:w-32 h-8 mt-4 sm:mt-0" />
        </div>
      ) : (
        <div className="flex flex-col gap-4 sm:gap-0 sm:flex-row items-center justify-between bg-muted rounded p-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 grow w-full">
            {/* Shipping Address Section */}
            <div className="flex sm:flex-col justify-between sm:justify-start gap-1 col-span-1 border-b sm:border-b-0 border-border pb-4 sm:pb-0">
              <Skeleton className="h-4 w-28" />
              <div className="text-sm space-y-1">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-56" />
              </div>
            </div>

            {/* Payment Info Section */}
            <div className="flex sm:flex-col justify-between sm:justify-start gap-1 col-span-1 border-b sm:border-b-0 border-border pb-4 sm:pb-0">
              <Skeleton className="h-4 w-24" />
              <div className="space-y-1">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-28" />
              </div>
            </div>

            {/* Date Placed Section */}
            <div className="flex sm:flex-col justify-between sm:justify-start gap-1 col-span-1 border-b sm:border-b-0 border-border pb-4 sm:pb-0">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-28" />
            </div>

            {/* Total Amount Section */}
            <div className="flex justify-between gap-1 sm:col-span-3 sm:border-t border-border sm:pt-4">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-5 w-24" />
            </div>
          </div>
        </div>
      )}

      {/* Products table */}
      <table className="min-w-full sm:divide-y divide-gray-200 mt-6">
        <thead className="hidden sm:table-header-group">
          <tr>
            <th
              scope="col"
              className="py-3 pe-6 text-xs font-medium uppercase tracking-wider"
            >
              <Skeleton className="h-4 w-16" />
            </th>
            <th
              scope="col"
              className="py-3 pe-6 text-center text-xs font-medium uppercase tracking-wider"
            >
              <Skeleton className="h-4 w-16 mx-auto" />
            </th>
            <th
              scope="col"
              className="py-3 pe-6 text-center text-xs font-medium uppercase tracking-wider"
            >
              <Skeleton className="h-4 w-16 mx-auto" />
            </th>
            <th
              scope="col"
              className="py-3 text-xs font-medium uppercase tracking-wider"
            >
              <Skeleton className="h-4 w-16 ms-auto" />
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {Array.from({ length: 3 }).map((_, index) => (
            <OrderSkeletonItem key={index} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
