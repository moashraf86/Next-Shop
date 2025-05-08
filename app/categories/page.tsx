"use server";
import { fetchAllProducts, fetchCategories } from "@/lib/data";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import ProductList from "../products/ProductList";
import ProductSorting from "@/components/product/ProductSorting";
import ProductsFilter from "@/components/product/ProductsFilter";
import { Color, Size } from "@/lib/definitions";

const ALL_SIZES = ["32mm", "36mm", "39mm"];

export default async function Categories({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { sort_by, size, color } = await searchParams;

  const [{ categories }, { products }, { products: allProducts }] =
    await Promise.all([
      fetchCategories(),
      fetchAllProducts({ sort: sort_by, size, color }),
      fetchAllProducts({ sort: sort_by }),
    ]);

  // Flattened arrays of sizes and colors from all products
  const allSizesData = allProducts.flatMap((product) => product.sizes);
  const allColorsData = allSizesData.flatMap((size) => size.colors);

  // Get available sizes
  const availableSizes: Size[] = ALL_SIZES.map((size) => {
    const matchingSizes = allSizesData.filter((s) => s.value === size);

    // Deduplicate colors by name
    const uniqueColorsMap = new Map();
    matchingSizes.forEach((s) => {
      s.colors?.forEach((color) => {
        if (!uniqueColorsMap.has(color.name)) {
          uniqueColorsMap.set(color.name, color);
        }
      });
    });

    return {
      id: crypto.randomUUID().slice(0, 3),
      value: size,
      count: matchingSizes.length,
      colors: Array.from(uniqueColorsMap.values()),
    };
  });

  // Deduplicate colors by name
  function deduplicateColors(colors: Color[]) {
    const uniqueMap = new Map();
    colors.forEach((color) => {
      if (!uniqueMap.has(color.name)) {
        uniqueMap.set(color.name, {
          id: crypto.randomUUID().slice(0, 3),
          name: color.name,
          pattern: color.pattern,
          images: color.images,
        });
      }
    });
    return Array.from(uniqueMap.values());
  }

  // Get all available colors
  const allColors = deduplicateColors(
    allColorsData.filter((color): color is Color => color !== undefined)
  );

  const filteredSizes = products.flatMap((p) => p.sizes);
  const availableColors = size
    ? filteredSizes
        .filter((s) => size.includes(s.value))
        .flatMap((s) => s.colors)
    : filteredSizes.flatMap((s) => s.colors);

  const uniqueAvailableColors = Array.from(
    new Set(availableColors.map((color) => color?.name))
  ).map((name) => {
    return {
      id: crypto.randomUUID().slice(0, 4),
      name,
    };
  });

  return (
    <main>
      {/* Banner image */}
      <section className="relative w-full h-[400px]">
        <div className="flex items-center justify-center absolute top-0 left-0 right-0 h-[400px] after:absolute after:-inset-0 after:bg-black/20 after:content-[''] after:z-0">
          <Image
            src="/categories/all.webp"
            alt="Categories"
            className="w-full absolute top-0 left-0 h-full object-cover object-center z-0"
            loading="lazy"
            width={1440}
            height={600}
          />
          <h1 className="text-4xl md:text-5xl lg:text-6xl text-white text-center font-light uppercase leading-tight tracking-tight relative z-[1]">
            All Products
          </h1>
        </div>
      </section>
      {/* Categories Bar */}
      <div className="border-b border-border">
        <div className="container">
          <div className="flex items-center justify-center gap-10">
            <span className="sticky left-0 text-sm text-gray-500 uppercase font-semibold tracking-[1px]">
              Shop
            </span>
            <nav className="max-w-full overflow-x-auto overflow-y-hidden scrollbar-hide snap-x snap-proximity">
              <ul className="grid grid-flow-col gap-10 min-w-max font-barlow pe-10">
                <li className="py-5">
                  <Link
                    href="/categories"
                    className={cn(
                      "relative inline-block after:absolute after:w-full after:left-0 after:h-px after:bottom-0 after:content-[''] after:bg-black after:transition-transform after:duration-200 after:ease-in-out after:scale-x-0 hover:after:scale-x-100 after:origin-right hover:after:origin-left",
                      {
                        "after:scale-x-100 after:origin-left": true,
                      }
                    )}
                  >
                    All
                  </Link>
                </li>
                {categories.map((category) => (
                  <li key={category.documentId} className="py-5">
                    <Link
                      href={`/categories/${category.slug}`}
                      className="relative inline-block after:absolute after:w-full after:left-0 after:h-px after:bottom-0 after:content-[''] after:bg-black after:transition-transform after:duration-200 after:ease-in-out after:scale-x-0 hover:after:scale-x-100 after:origin-right hover:after:origin-left"
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
      <section className="container max-w-screen-xl py-10">
        {/* Filters - Products Number - Sorting /*/}
        <div className="grid grid-cols-2 mb-5 gap-4">
          <div className="flex items-center gap-10 col-span-1">
            <ProductsFilter
              sizes={availableSizes}
              colors={allColors}
              availableColors={uniqueAvailableColors}
            />
            <span className="hidden md:inline-block text-sm ">
              {products.length} Products
            </span>
          </div>
          <div className="col-span-1 flex justify-end md:order-1">
            <ProductSorting />
          </div>
          <span className="md:hidden text-sm text-center col-span-2">
            {products.length} Products
          </span>
        </div>
        <ProductList
          products={products}
          selectedSize={size}
          selectedColor={color}
        />
      </section>
    </main>
  );
}
