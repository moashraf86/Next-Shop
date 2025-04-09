import { fetchProductById, fetchProductsByCategory } from "@/lib/data";
import Image from "next/image";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import ProductCard from "../ProductCard";
import ProductActions from "@/components/product/ProductActions";
import ProductPrice from "@/components/product/ProductPrice";
import ProductDescription from "@/components/product/ProductDescription";
import ProductTitle from "@/components/product/ProductTitle";

export default async function ProductDetails({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  // Fetch product by ID
  const { product } = await fetchProductById(slug);

  // fetch product by categories
  const relatedProducts = await fetchProductsByCategory(
    product.categories[0].name
  );

  return (
    <section>
      <div className="container max-w-screen-xl">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>/</BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage>{product.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        {/* Product */}
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
            <ProductActions productId={product.id} />
          </div>
          {/* Related products */}
          <div className="col-span-full mt-8">
            <h2 className="text-2xl font-bold">Related Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              {relatedProducts.products
                // Filter out the current product
                .filter((relatedProduct) => relatedProduct.id !== product.id)
                .map((filteredProduct) => (
                  <ProductCard
                    key={filteredProduct.id}
                    product={filteredProduct}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
