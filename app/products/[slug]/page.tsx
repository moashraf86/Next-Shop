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
import { Button } from "@/components/ui/button";

export default async function ProductDetails({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;

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
              alt={product.image.alternativeText}
              fill
              className="object-cover object-center"
              quality={100}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          {/* Product details */}
          <div className="space-y-6">
            <h1 className="text-2xl font-bold">{product.title}</h1>
            {/* Product description */}
            {product.description.map(
              (
                block: { type: string; children: { text: string }[] },
                index: number
              ) => {
                if (block.type === "paragraph") {
                  return (
                    <p key={index}>
                      {block.children.map((child, i) => (
                        <span key={i}>{child.text}</span>
                      ))}
                    </p>
                  );
                }
                return null;
              }
            )}
            {/* Product Price */}
            <div>
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(product.price)}{" "}
              USD
            </div>
            {/* Call to action btns */}
            <div className="flex flex-col gap-4">
              <Button variant="success" size="lg">
                Add to Cart
              </Button>
              <Button variant="emphasis" size="lg">
                Buy it Now
              </Button>
            </div>
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
