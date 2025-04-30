import { Product } from "../../lib/definitions";
import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ product }: { product: Product }) {
  const isBestselling = product.categories.some(
    (cat) => cat.name === "bestselling"
  );

  const size = product.sizes?.[0]?.value ?? null;
  const color = product.sizes?.[0]?.colors?.[0]?.name ?? null;

  return (
    <Link
      href={`/products/${product.slug}?size=${size}&color=${color}`}
      className="grid gap-4 overflow-hidden"
    >
      <div className="group aspect-[3/4] relative overflow-hidden bg-gray-100">
        <Image
          className="group-hover:opacity-0 object-cover transition-opacity duration-300"
          src={product.images[0].formats?.large.url || product.images[0].url}
          alt={product.images[0].alternativeText}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        <Image
          className="opacity-0 group-hover:opacity-100 object-cover transition-opacity duration-300"
          src={product.images[1].url}
          alt={product.images[1].alternativeText}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        {isBestselling && (
          <span className="absolute top-2 inline-block left-2 py-px px-[5px] bg-orange-500 text-primary-foreground text-[10px] uppercase font-barlow font-semibold">
            Bestselling
          </span>
        )}
      </div>
      <div className="px-2 space-y-2">
        <h2 className="text-sm text-center font-barlow">{product.name}</h2>
        <p className="text-sm text-center">${product.price.toFixed(2)} USD</p>
      </div>
    </Link>
  );
}
