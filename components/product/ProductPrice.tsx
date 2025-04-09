export default function ProductPrice({ price }: { price: number }) {
  return (
    <div>
      {new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(price)}
    </div>
  );
}
