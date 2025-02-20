import { Product } from "../../lib/definitions";
import Image from "next/image";
export default function ProductCard({ product }: { product: Product }) {
  return (
    <div
      key={product.id}
      className="grid gap-4 border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
    >
      <Image
        className="rounded-md lg:block"
        src={product.image.url}
        alt={product.title}
        width={product.image.width}
        height={product.image.height}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />
      <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
      <p className="text-lg font-medium text-blue-600">
        ${product.price.toFixed(2)}
      </p>
    </div>
  );
}
