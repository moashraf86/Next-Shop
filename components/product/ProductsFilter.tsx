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
import { useEffect, useRef, useState } from "react";
import { Color, Size } from "@/lib/definitions";
import ColorSelector from "./ColorSelector";
import { useWindowScroll } from "@uidotdev/usehooks";
import { cn } from "@/lib/utils";
import { Slider } from "../ui/slider";

type ProductsFilterProps = {
  sizes: Size[];
  colors: Color[];
  availableColors: { id: string; name: string | undefined }[];
};

const MIN_PRICE = 100;
const MAX_PRICE = 1000;
const STEP = 10;
const DEFAULT_RANGE: [number, number] = [MIN_PRICE, MAX_PRICE];
export default function ProductsFilter({
  sizes,
  colors,
  availableColors,
}: ProductsFilterProps) {
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [paramsCount, setParamsCount] = useState(0);
  const [range, setRange] = useState<[number, number]>(DEFAULT_RANGE);
  const [tempMin, setTempMin] = useState(range[0]);
  const [tempMax, setTempMax] = useState(range[1]);
  const searchParams = useSearchParams();
  const router = useRouter();

  const ref = useRef<HTMLButtonElement>(null);
  const [{ y: pageScrollY }, scrollTo] = useWindowScroll();

  const scrollToProducts = () => {
    scrollTo({
      top: ref.current
        ? ref.current.getBoundingClientRect().top + (pageScrollY ?? 0) - 100
        : pageScrollY,
      behavior: "smooth",
    });
  };

  const updateQueryParam = (key: string, values: string[]) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete(key);
    values.forEach((value) => params.append(key, value));
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const handleSizeChange = (size: string) => {
    scrollToProducts();
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
    scrollToProducts();
    const newSelected = Array.isArray(colors) ? colors : [colors];
    setSelectedColors(newSelected);
    updateQueryParam("color", newSelected);
  };

  const commitRangeChange = (newRange: [number, number]) => {
    setRange(newRange as [number, number]);
    const params = new URLSearchParams(searchParams.toString());
    params.set("price_min", newRange[0].toString());
    params.set("price_max", newRange[1].toString());
    router.replace(`?${params.toString()}`, { scroll: false });
    scrollToProducts();
  };

  // Handle key events
  const handleBlurMin = () => {
    const minPrice = Math.min(tempMin, range[1]);

    if (isNaN(minPrice)) {
      setTempMin(MIN_PRICE);
      return;
    } else if (minPrice < MIN_PRICE) {
      setTempMin(MIN_PRICE);
    }

    const newMin = Math.min(minPrice, range[1] - 1);
    commitRangeChange([newMin, range[1]]);
  };

  const handleBlurMax = () => {
    const maxPrice = Math.max(tempMax, range[0]);

    if (isNaN(maxPrice)) {
      setTempMax(MAX_PRICE);
      return;
    } else if (maxPrice > MAX_PRICE) {
      setTempMax(MAX_PRICE);
    }

    const newMax = Math.max(maxPrice, range[0] + 1);
    commitRangeChange([range[0], newMax]);
  };

  useEffect(() => {
    const sizeValues = searchParams.getAll("size");
    const colorValues = searchParams.getAll("color");
    const priceMin = parseInt(
      searchParams.get("price_min") ?? MIN_PRICE.toString()
    );
    const priceMax = parseInt(
      searchParams.get("price_max") ?? MAX_PRICE.toString()
    );
    setSelectedSizes(sizeValues);
    setSelectedColors(colorValues);
    setRange([priceMin, priceMax]);
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

  // Sync input values when range changes externally
  useEffect(() => {
    setTempMin(range[0]);
    setTempMax(range[1]);
  }, [range]);

  return (
    <>
      <Sheet>
        <SheetTrigger
          className="flex items-center gap-2 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-ring"
          ref={ref}
        >
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
                    {sizes.map((size) => {
                      const sizeColors = size.colors?.map(
                        (color) => color.name
                      );
                      const isAvailable = sizeColors?.some(
                        (color) =>
                          selectedColors.includes(color) ||
                          selectedColors.length === 0
                      );
                      return (
                        <div
                          key={size.id}
                          className={cn("flex items-center gap-2", {
                            "opacity-50 [&>label]:cursor-not-allowed":
                              !isAvailable,
                          })}
                        >
                          <Checkbox
                            className="disabled:cursor-not-allowed disabled:bg-gray-400"
                            id={size.value}
                            onCheckedChange={() => handleSizeChange(size.value)}
                            checked={selectedSizes.includes(size.value)}
                            disabled={!isAvailable}
                          />
                          <label
                            htmlFor={size.value}
                            className="font-barlow text-sm cursor-pointer"
                          >
                            {size.value} ({size.count})
                          </label>
                        </div>
                      );
                    })}
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
              <AccordionItem value="price">
                <AccordionTrigger className="text-sm font-barlow font-semibold tracking-[1px] hover:no-underline py-5">
                  <div className="flex items-center justify-between w-full">
                    Price
                    <span className="text-xs font-barlow font-light text-primary mr-1">
                      {range && range.map((price) => `$${price}`).join(" - ")}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <Slider
                      min={MIN_PRICE}
                      max={MAX_PRICE}
                      step={STEP}
                      value={range}
                      defaultValue={DEFAULT_RANGE}
                      onValueChange={commitRangeChange}
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center border border-border col-span-1 px-2.5 py-2">
                        <span className="font-barlow text-xs">$</span>
                        <input
                          type="number"
                          name="min"
                          id="min"
                          inputMode="numeric"
                          max={range[1] - STEP}
                          value={tempMin}
                          onChange={(e) => setTempMin(parseInt(e.target.value))}
                          onBlur={handleBlurMin}
                          onKeyDown={(e) => {
                            if (e.key === "ArrowUp" || e.key === "ArrowDown") {
                              e.preventDefault(); // ✅ Prevent arrow key changes
                            }
                            if (e.key === "Enter") {
                              handleBlurMin();
                            }
                          }}
                          className="text-sm text-right font-barlow appearance-none border-0 focus:outline-none focus:ring-0 focus-visible:ring-0 min-w-0"
                          placeholder="Min"
                        />
                      </div>
                      <div className="flex items-center justify-between border border-border col-span-1 px-2.5 py-2">
                        <span className="font-barlow text-xs">$</span>
                        <input
                          type="number"
                          name="max"
                          id="max"
                          inputMode="numeric"
                          max={MAX_PRICE}
                          value={tempMax}
                          onChange={(e) => setTempMax(parseInt(e.target.value))}
                          onBlur={handleBlurMax}
                          onKeyDown={(e) => {
                            if (e.key === "ArrowUp" || e.key === "ArrowDown") {
                              e.preventDefault(); // ✅ Prevent arrow key changes
                            }
                            if (e.key === "Enter") {
                              handleBlurMax();
                            }
                          }}
                          className="text-sm text-right font-barlow appearance-none border-0 focus:outline-none focus:ring-0 focus-visible:ring-0 min-w-0"
                          placeholder="Max"
                        />
                      </div>
                    </div>
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
