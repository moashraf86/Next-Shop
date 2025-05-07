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
import { useEffect, useState } from "react";
import { Color, Size } from "@/lib/definitions";
import ColorSelector from "./ColorSelector";

type ProductsFilterProps = {
  sizes: Size[];
  colors: Color[];
  availableColors: { id: string; name: string | undefined }[];
};

export default function ProductsFilter({
  sizes,
  colors,
  availableColors,
}: ProductsFilterProps) {
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [paramsCount, setParamsCount] = useState(0);

  const searchParams = useSearchParams();
  const router = useRouter();

  const updateQueryParam = (key: string, values: string[]) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete(key);
    values.forEach((value) => params.append(key, value));
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const handleSizeChange = (size: string) => {
    const current = new Set(selectedSizes);
    if (current.has(size)) {
      current.delete(size);
    } else {
      current.add(size);
    }
    const newSelected = Array.from(current);
    setSelectedSizes(newSelected);
    updateQueryParam("size", newSelected);
  };

  const handleColorChange = (colors: string | string[]) => {
    const newSelected = Array.isArray(colors) ? colors : [colors];
    setSelectedColors(newSelected);
    updateQueryParam("color", newSelected);
  };

  useEffect(() => {
    const sizeValues = searchParams.getAll("size");
    const colorValues = searchParams.getAll("color");

    setSelectedSizes(sizeValues);
    setSelectedColors(colorValues);

    // Sanitize invalid values
    const validColors = colorValues.filter((color) =>
      availableColors.some((c) => c.name === color)
    );

    const params = new URLSearchParams(searchParams.toString());
    params.delete("color");
    validColors.forEach((c) => params.append("color", c));
    router.replace(`?${params.toString()}`, { scroll: false });

    setParamsCount(sizeValues.length + validColors.length);
  }, [searchParams]);

  return (
    <>
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
              <AccordionItem value="size">
                <AccordionTrigger className="text-sm font-barlow font-semibold tracking-[1px] hover:no-underline py-5">
                  Watch Size
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    {sizes.map((size) => (
                      <div key={size.id} className="flex items-center gap-2">
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
              <AccordionItem value="color">
                <AccordionTrigger className="text-sm font-barlow font-semibold tracking-[1px] hover:no-underline py-5">
                  Strap Color
                </AccordionTrigger>
                <AccordionContent>
                  <ColorSelector
                    colors={colors}
                    availableColors={availableColors}
                    selectedColors={selectedColors}
                    onColorChange={handleColorChange}
                    mode="multiple"
                  />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
