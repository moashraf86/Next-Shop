import { fetchProductsByCategory } from "@/lib/data";
import ProductList from "../ProductList";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const { products } = await fetchProductsByCategory(params.category);

  return (
    <>
      <div className="flex justify-center items-center gap-4">
        <Link href="/products/men">
          <Button>Men</Button>
        </Link>
        <Link href="/products/women">
          <Button>Women</Button>
        </Link>
      </div>
      <ProductList products={products} />
    </>
  );
}
