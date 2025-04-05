import { fetchProductsByCategory } from "@/lib/data";
import ProductList from "../../products/ProductList";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function CategoryPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;

  // Fetch products by category
  const { products } = await fetchProductsByCategory(slug);

  return (
    <>
      <div className="flex justify-center items-center gap-4">
        <Link href="/categories/men">
          <Button>Men</Button>
        </Link>
        <Link href="/categories/women">
          <Button>Women</Button>
        </Link>
      </div>
      <ProductList products={products} />
    </>
  );
}
