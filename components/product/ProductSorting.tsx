"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";
import { useState, useTransition } from "react";
import TopProgressBar from "../shared/TopProgressBar";

export default function ProductSorting() {
  // get search params from URL
  const searchParams = useSearchParams();
  const sortByParam = searchParams.get("sort_by");
  const URL = useRouter();
  const currentSort = searchParams.get("sort_by") || "createdAt:desc";

  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(false);

  // Define sorting options
  const sortingOptions = [
    { label: "Latest", value: "createdAt:desc" },
    { label: "Oldest", value: "createdAt:asc" },
    { label: "Price: Low to High", value: "price:asc" },
    { label: "Price: High to Low", value: "price:desc" },
    { label: "Alphabetically, A-Z", value: "name:asc" },
    { label: "Alphabetically, Z-A", value: "name:desc" },
  ];

  // Handle sorting change
  const handleSortingChange = (value: string) => {
    setIsLoading(true);
    // simulate a delay to show loading state
    setTimeout(() => {
      startTransition(() => {
        URL.push(`?sort_by=${value}`, { scroll: false });
      });
      setIsLoading(false);
    }, 350);
  };

  return (
    <>
      <TopProgressBar trigger={isLoading || isPending} />
      <div className="flex items-center gap-1">
        <span className="text-sm whitespace-nowrap text-gray-500">Sort by</span>
        <Select defaultValue={currentSort} onValueChange={handleSortingChange}>
          <SelectTrigger className="border-none gap-1">
            <span className="text-sm font-barlow">
              {sortingOptions.find((option) => option.value === sortByParam)
                ?.label || "Latest"}
            </span>
          </SelectTrigger>
          <SelectContent>
            {sortingOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                <span className="text-sm font-barlow">{option.label}</span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </>
  );
}
