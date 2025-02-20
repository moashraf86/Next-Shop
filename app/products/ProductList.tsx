import { fetchProducts } from "../../lib/actions";
import ProductCard from "./ProductCard";

export default async function ProductList() {
  const { products } = await fetchProducts();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
