import { cn } from "@/lib/utils";

export default function ProductPrice({
  price,
  className,
}: {
  price: number;
  className?: string;
}) {
  return (
    <div className={cn("text-sm font-light text-gray-500", className)}>
      {new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(price)}
    </div>
  );
}
