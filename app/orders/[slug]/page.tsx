import OrderDetailsSummary from "@/components/order/OrderDetailsSummary";
import OrderItem from "@/components/order/OrderItem";
import OrderTable from "@/components/order/OrderTable";
import { fetchOrderById } from "@/lib/data";
import { OrderItem as orderItemType } from "@/lib/definitions";

export default async function OrderDetails({
  params,
}: {
  params: { slug: string };
}) {
  const { slug: orderId } = await params;

  // Fetch order details by ID
  const { data: order } = await fetchOrderById(orderId);

  return (
    <section className="container max-w-screen-lg mx-auto">
      <div className="space-y-2 py-10">
        <h1 className="text-4xl font-light uppercase text-center tracking-tight">
          Order #<span className="font-semibold">{order.order_number}</span>
        </h1>
        <p className="text-center">
          Check the status of your order, manage returns, and discover
        </p>
      </div>
      {/* Order details */}
      <div key={order.id} className="mb-20">
        <OrderDetailsSummary order={order} />
        <OrderTable>
          {order.order_items.map((item: orderItemType) => (
            <OrderItem key={item.id} item={item} />
          ))}
        </OrderTable>
      </div>
    </section>
  );
}
