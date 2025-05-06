import { Skeleton } from "../ui/skeleton";

export default function CartSkeletonItem() {
  return (
    <tr>
      <td className="px-6 py-4">
        <div className="flex items-center gap-4">
          <Skeleton className="w-[100px] h-[125px] sm:w-16 sm:h-16" />
          <div className="space-y-3 sm:space-y-2">
            <div className="space-y-1">
              <Skeleton className="h-1.5 sm:h-3 w-40" />
              <Skeleton className="h-1.5 w-24 sm:hidden" />
            </div>
            <Skeleton className="h-2 w-8 sm:hidden" />
            <Skeleton className="h-2 sm:h-3 w-12" />
            <div>
              <Skeleton className="h-3 w-16 sm:hidden" />
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 hidden sm:table-cell">
        <Skeleton className="h-3 w-8 m-auto" />
      </td>
      <td className="px-6 py-4 hidden sm:table-cell">
        <Skeleton className="h-3 w-12 m-auto" />
      </td>
      <td className="px-6 py-4 hidden sm:table-cell">
        <Skeleton className="h-6 w-6 ms-auto" />
      </td>
    </tr>
  );
}
