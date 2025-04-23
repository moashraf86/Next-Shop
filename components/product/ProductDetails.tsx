"use client";
import ProductTitle from "./ProductTitle";
import ProductDescription from "./ProductDescription";
import ProductPrice from "./ProductPrice";
import QuantitySelector from "../shared/QuantitySelector";
import ProductActions from "./ProductActions";
import ProductCard from "@/app/products/ProductCard";
import { Product } from "@/lib/definitions";
import { useState } from "react";
import ProductCarousel from "./ProductCarousel";

export default function ProductDetails({
  product,
  relatedProducts,
  initialQuantity = 1,
}: {
  product: Product;
  relatedProducts: {
    products: Product[];
  };
  initialQuantity?: number;
}) {
  const [quantity, setQuantity] = useState<number>(initialQuantity);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
      {/* Product Carousel */}
      <ProductCarousel images={product.images} className="lg:col-span-7" />
      {/* Product details */}
      <div className="space-y-6 lg:col-span-5">
        <ProductTitle title={product.title} />
        <p className="flex items-center gap-1 text-lg lg:text-2xl  font-normal font-barlow">
          <ProductPrice
            price={product.price}
            className="text-lg lg:text-2xl font-barlow font-normal"
          />
          USD
        </p>
        <ProductDescription description={product.description} />
        <QuantitySelector
          quantity={quantity}
          setQuantity={setQuantity}
          mode="product"
        />
        <ProductActions product={product} quantity={quantity} />
      </div>
      {/* Related products */}
      <div className="col-span-full mt-8">
        <h2 className="text-2xl font-bold">Related Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {relatedProducts.products
            // Filter out the current product
            .filter((relatedProduct) => relatedProduct.id !== product.id)
            .map((filteredProduct) => (
              <ProductCard key={filteredProduct.id} product={filteredProduct} />
            ))}
        </div>
      </div>
    </div>
  );
}
