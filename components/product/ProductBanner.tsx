import { Product } from "@/lib/definitions";
import MenBanner from "./MenBanner";
import WomenBanner from "./WomenBanner";
import { JSX } from "react";

// This component dynamically renders a banner based on the product's category
const banners: Record<string, (product: Product) => JSX.Element> = {
  men: (product) => <MenBanner product={product} />,
  women: (product) => <WomenBanner product={product} />,
  // Add more categories and their corresponding components here
  // e.g. "kids": (product) => <KidsBanner product={product} />,
};

export default function ProductBanner({ product }: { product: Product }) {
  const category = product.categories[0].slug;

  const bannerComponent = banners[category];
  // Guard clause: product must have at least one category
  if (!bannerComponent) return null;

  return bannerComponent(product);
}
