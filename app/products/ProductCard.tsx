import { Product } from "../../lib/definitions";
import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ product }: { product: Product }) {
  const isBestselling = product.categories.some(
    (cat) => cat.name === "bestselling"
  );

  return (
    <Link
      href={`/products/${product.id}`}
      className="group grid gap-4 overflow-hidden"
    >
      <div className="aspect-[3/4] relative overflow-hidden bg-gray-100">
        <Image
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          src={product.image.url}
          alt={product.title}
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
        <h2 className="text-sm text-center font-light font-barlow">
          {product.title}
        </h2>
        <p className="text-sm text-center font-light">
          ${product.price.toFixed(2)}
        </p>
      </div>
    </Link>
  );
}
