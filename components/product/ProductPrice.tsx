import { cn } from "@/lib/utils";

export default function ProductPrice({
  price,
  className,
}: {
  price: number;
  className?: string;
}) {
  return (
    <span className={cn("text-sm font-light text-foreground", className)}>
      {new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(price)}
    </span>
  );
}
