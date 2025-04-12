export default function ProductPrice({ price }: { price: number }) {
  return (
    <div className="text-sm font-normal text-foreground">
      {new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(price)}
    </div>
  );
}
