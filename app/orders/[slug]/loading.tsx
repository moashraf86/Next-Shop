import OrderSkeleton from "@/components/order/OrderSkeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <section className="container max-w-screen-lg mx-auto">
      <div className="space-y-2 py-10">
        <h1 className="text-4xl font-light uppercase text-center tracking-tight">
          Order #<Skeleton className="inline-block w-[100px] h-6" />
        </h1>
        <p className="text-center">
          Check the status of your order, manage returns, and discover
        </p>
      </div>
      <OrderSkeleton mode="details" />
    </section>
  );
}
