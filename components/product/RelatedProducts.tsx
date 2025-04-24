import ProductCard from "@/app/products/ProductCard";
import { fetchProductsByCategory } from "@/lib/data";
import { Product } from "@/lib/definitions";

export default async function RelatedProducts({
  product,
}: {
  product: Product;
}) {
  // Guard clause: product must have at least one category
  if (!product.categories || product.categories.length === 0) return null;

  let relatedProducts;

  try {
    relatedProducts = await fetchProductsByCategory(product.categories[0].name);
  } catch (error) {
    console.error("Failed to fetch related products:", error);
    return null;
  }

  // Filter out the current product
  const filteredProducts = relatedProducts.products.filter(
    (p) => p.id !== product.id
  );

  // If no other related products found
  if (filteredProducts.length === 0) return null;

  return (
    <div className="col-span-full mb-20">
      <div className="space-y-10">
        <h2
          className="text-3xl md:text-4xl lg:text-5xl text-center font-light uppercase leading-tight tracking-tight"
          aria-label={`More products like ${product.title}`}
        >
          Available styles
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
          {filteredProducts.map((relatedProduct) => (
            <ProductCard key={relatedProduct.id} product={relatedProduct} />
          ))}
        </div>
      </div>
    </div>
  );
}
