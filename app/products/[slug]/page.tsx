import { fetchProductById, fetchProductsByCategory } from "@/lib/data";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import ProductDetails from "@/components/product/ProductDetails";

export default async function Product({
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
        <ProductDetails product={product} relatedProducts={relatedProducts} />
      </div>
    </section>
  );
}
