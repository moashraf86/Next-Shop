import { fetchProductById } from "@/lib/data";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import ProductDetails from "@/components/product/ProductDetails";
import RelatedProducts from "@/components/product/RelatedProducts";

export default async function Product({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  // Fetch product by ID
  const { product } = await fetchProductById(slug);

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
        <ProductDetails product={product} />
        <RelatedProducts product={product} />
      </div>
    </section>
  );
}
