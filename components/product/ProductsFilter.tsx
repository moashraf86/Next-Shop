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
import { Color, Size } from "@/lib/definitions";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

export default function ProductsFilter({
  sizes,
  colors,
  availableColors,
}: {
  sizes: Size[];
  colors: Color[];
  availableColors: { id: string; name: string | undefined }[];
}) {
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
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

  // handle color change
  const handleColorChange = (color: string) => {
    setIsLoading(true);
    const currentColors = new Set(selectedColors);
    if (currentColors.has(color)) {
      currentColors.delete(color);
    } else {
      currentColors.add(color);
    }

    // Convert Set back to Array
    const newSelectedColors = Array.from(currentColors);
    setSelectedColors(newSelectedColors);

    setTimeout(() => {
      startTransition(() => {
        // create a new URLSearchParams object from the current search params
        const params = new URLSearchParams(searchParams.toString());
        // Clear old filters
        params.delete("color");
        // Add all selected sizes
        newSelectedColors.forEach((color) => params.append("color", color));
        // Update URL
        URL.push(`?${params.toString()}`, { scroll: false });
      });
      setIsLoading(false);
    }, 350);
  };

  // Set initial selected sizes from URL
  useEffect(() => {
    const sizeValues = searchParams.getAll("size");
    const colorValues = searchParams.getAll("color");
    setSelectedSizes(sizeValues);
    setSelectedColors(colorValues);

    // check valid colors
    const validColors = colorValues.filter((color) =>
      availableColors.some((c) => c.name === color)
    );

    const params = new URLSearchParams(searchParams.toString());

    params.delete("color");
    validColors.forEach((c) => params.append("color", c));
    URL.replace(`?${params.toString()}`, { scroll: false });

    const count = sizeValues.length + colorValues.length;
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
                  <div className="grid grid-cols-[repeat(auto-fit,40px)] gap-3 p-1">
                    {colors.map((color) => {
                      const isAvailable = availableColors.some(
                        (c) => c.name === color.name
                      );
                      const isChecked =
                        selectedColors.includes(color.name) && isAvailable;
                      return (
                        <Button
                          title={color.name}
                          key={color.name}
                          variant="outline"
                          className={cn(
                            "relative text-sm font-barlow font-normal lowercase w-9 h-9 shadow-none border-0 p-[1px] after:absolute after:content-[''] after:inset-[-3px] after:bg-transparent after:border-2 after:border-primary after:z-[-1] after:transition-transform after:duration-200 after:ease",
                            {
                              "after:scale-100 after:opacity-100":
                                isChecked && isAvailable,
                              "after:scale-90 after:opacity-0":
                                !isChecked || !isAvailable,
                              "!opacity-90": !isAvailable,
                            }
                          )}
                          onClick={() => handleColorChange(color.name)}
                          disabled={!isAvailable}
                        >
                          <Image
                            src={color.pattern.url}
                            alt={color.pattern.alternativeText}
                            width={20}
                            height={20}
                            className="object-cover object-center w-full h-full"
                          />
                          <span
                            className="absolute top-0 right-0 w-[calc((100%*1.4142)-2px)] h-0.5 bg-white transform origin-right -rotate-45"
                            hidden={isAvailable}
                          ></span>
                        </Button>
                      );
                    })}
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
