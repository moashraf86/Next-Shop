import { fetchProductBySlug } from "@/lib/data";
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
import ProductBanner from "@/components/product/ProductBanner";

export default async function Product({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  // Fetch product by Slug
  const { product } = await fetchProductBySlug(slug);

  return (
    <main>
      <Breadcrumb className="container max-w-screen-xl">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>/</BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage>{product.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <ProductDetails product={product} />
      <ProductBanner product={product} />
      <RelatedProducts product={product} />
    </main>
  );
}
