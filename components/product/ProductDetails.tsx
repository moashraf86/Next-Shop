"use client";
import Image from "next/image";
import ProductTitle from "./ProductTitle";
import ProductDescription from "./ProductDescription";
import ProductPrice from "./ProductPrice";
import QuantitySelector from "../shared/QuantitySelector";
import ProductActions from "./ProductActions";
import ProductCard from "@/app/products/ProductCard";
import { Product } from "@/lib/definitions";
import { useState } from "react";

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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
      {/* Product Banner */}
      <div className="aspect-square relative overflow-hidden bg-gray-100">
        <Image
          src={product.image.url}
          alt={product.image.alternativeText || "Product Image"}
          fill
          className="object-cover object-center"
          quality={100}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      {/* Product details */}
      <div className="space-y-6">
        <ProductTitle title={product.title} />
        <ProductDescription description={product.description} />
        <ProductPrice price={product.price} />
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
