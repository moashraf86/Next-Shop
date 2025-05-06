"use client";
import { ListFilter } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Checkbox } from "../ui/checkbox";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import TopProgressBar from "../shared/TopProgressBar";

type Size = {
  id: number;
  value: string;
  count: number;
};

export default function ProductsFilter({ sizes }: { sizes: Size[] }) {
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [paramsCount, setParamsCount] = useState(0);
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(false);

  const searchParams = useSearchParams();
  const URL = useRouter();

  // handle size change
  const handleSizeChange = (size: string) => {
    setIsLoading(true);
    const currentSizes = new Set(selectedSizes);
    if (currentSizes.has(size)) {
      currentSizes.delete(size);
    } else {
      currentSizes.add(size);
    }

    // Convert Set back to Array
    const newSelectedSizes = Array.from(currentSizes);
    setSelectedSizes(newSelectedSizes);

    setTimeout(() => {
      startTransition(() => {
        // create a new URLSearchParams object from the current search params
        const params = new URLSearchParams(searchParams.toString());
        // Clear old filters
        params.delete("size");
        // Add all selected sizes
        newSelectedSizes.forEach((size) => params.append("size", size));
        // Update URL
        URL.push(`?${params.toString()}`, { scroll: false });
      });
      setIsLoading(false);
    }, 350);
  };

  // Set initial selected sizes from URL
  useEffect(() => {
    const values = searchParams.getAll("size");
    if (values.length > 0) {
      setSelectedSizes(values);
    }
    // Count the number of selected sizes
    const count = values.length;
    setParamsCount(count);
  }, [searchParams]);

  return (
    <>
      <TopProgressBar trigger={isLoading || isPending} />
      <Sheet>
        <SheetTrigger className="flex items-center gap-2">
          <ListFilter className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-barlow">Show Filters</span>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>
              <p className="relative flex items-center gap-2">
                Filters{" "}
                {paramsCount > 0 && (
                  <span className="flex items-center justify-center min-w-5 w-5 h-5 ps-1 pe-1 text-[9px] font-medium text-white bg-primary rounded-full">
                    {paramsCount}
                  </span>
                )}
              </p>
            </SheetTitle>
          </SheetHeader>
          <div className="px-6">
            <Accordion type="multiple">
              <AccordionItem value="description">
                <AccordionTrigger className="text-sm font-barlow font-semibold tracking-[1px] hover:no-underline py-5">
                  Watch Size
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    {sizes.map((size) => (
                      <div key={size.value} className="flex items-center gap-2">
                        <Checkbox
                          id={size.value}
                          onCheckedChange={() => handleSizeChange(size.value)}
                          checked={selectedSizes.includes(size.value)}
                        />
                        <label
                          htmlFor={size.value}
                          className="font-barlow text-sm cursor-pointer"
                        >
                          {size.value} ({size.count})
                        </label>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
