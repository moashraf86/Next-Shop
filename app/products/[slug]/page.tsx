import { fetchProductById } from "@/lib/data";
import ProductCard from "../ProductCard";

export default async function ProductDetails({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;

  // Fetch product by ID
  const { product } = await fetchProductById(slug);

  return (
    <div>
      <ProductCard product={product} />
    </div>
  );
}
