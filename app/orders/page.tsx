"use client";
import OrderItem from "@/components/order/OrderItem";
import OrderSkeleton from "@/components/order/OrderSkeleton";
import OrderSummary from "@/components/order/OrderSummary";
import OrderTable from "@/components/order/OrderTable";
import { Button } from "@/components/ui/button";
import { useOrders } from "@/hooks/useOrders";
import { Order } from "@/lib/definitions";
import Link from "next/link";

export default function Orders() {
  const { orders, isLoading, isEmpty } = useOrders();

  // Sort orders by createdAt date
  const sortedOrders = orders?.sort((a: Order, b: Order) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  // Check if orders are still being fetched
  if (isEmpty && !isLoading) {
    return (
      <div className="container max-w-screen-xl h-[calc(100vh-10rem)] flex items-center justify-center">
        <div className="space-y-6 py-10">
          <h1 className="text-4xl font-light uppercase text-center tracking-tight">
            Orders
          </h1>
          <p className="text-center">You have not placed any orders yet.</p>
          <Button asChild variant="emphasis" className="w-full" size="lg">
            <Link href="/">Start Shopping</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <section>
      <div className="container max-w-screen-lg mx-auto">
        <div className="space-y-2 py-10">
          <h1 className="text-4xl font-light uppercase text-center tracking-tight">
            Orders
          </h1>
          <p className="text-center">
            Check the status of recent orders, manage returns, and discover
            similar products.
          </p>
        </div>
        {isLoading ? (
          <OrderSkeleton mode="history" />
        ) : (
          sortedOrders.map((order: Order) => (
            <div key={order.id} className="mb-20">
              <OrderSummary order={order} />
              <OrderTable>
                {order.order_items.map((item) => (
                  <OrderItem key={item.id} item={item} />
                ))}
              </OrderTable>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
