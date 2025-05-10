import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Color, Size } from "./definitions";
import { ReadonlyURLSearchParams } from "next/navigation";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * This function builds the active filters for the product list page.
 * @param sizes - The available sizes for the products.
 * @param colors - The available colors for the products.
 * @param searchParams - The current URL search parameters.
 * @param sizeValues - The selected size values from the URL.
 * @param colorValues - The selected color values from the URL.
 * @param priceRange - The selected price range from the URL.
 * @returns filters - An array of active filters with their names, values, and remove URLs.
 */
export function buildActiveFilters({
  sizes,
  colors,
  searchParams,
  sizeValues,
  colorValues,
  priceRange,
}: {
  sizes: Size[];
  colors: Color[];
  searchParams: ReadonlyURLSearchParams;
  sizeValues: string[];
  colorValues: string[];
  priceRange: (string | null)[];
}) {
  const sizeFilter = sizeValues.map((size) => {
    const sizeObj = sizes.find((s) => s.value === size);
    const params = new URLSearchParams(searchParams.toString());
    const sizeParams = params.getAll("size");
    if (sizeParams.includes(size)) {
      params.delete("size", size);
    }
    return {
      name: "size",
      value: sizeObj?.value,
      removeUrl: `?${params.toString()}`,
    };
  });
  const colorFilter = colorValues.map((color) => {
    const colorObj = colors.find((c) => c.name === color);
    const params = new URLSearchParams(searchParams.toString());
    const colorParams = params.getAll("color");
    if (colorParams.includes(color)) {
      params.delete("color", color);
    }
    return {
      name: "color",
      value: colorObj?.name,
      removeUrl: `?${params.toString()}`,
    };
  });
  const priceFilter = priceRange.map((price) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("price_min");
    params.delete("price_max");
    return {
      name: "price",
      value: price,
      removeUrl: `?${params.toString()}`,
    };
  });
  // remove null values from the array
  const filters = [...sizeFilter, ...colorFilter, ...priceFilter].filter(
    (filter) => filter.value !== null
  );
  return filters;
}
