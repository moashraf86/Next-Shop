import ProductPrice from "@/components/product/ProductPrice";
import { Button } from "@/components/ui/button";
import { fetchOrderById } from "@/lib/data";
import { OrderItem } from "@/lib/definitions";
import Image from "next/image";
import Link from "next/link";

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
          Order #{}
          <span className="font-semibold">{order.order_number}</span>
        </h1>
        <p className="text-center">
          Check the status of your order, manage returns, and discover
        </p>
      </div>
      {/* Order details */}
      <div key={order.id} className="mb-20">
        <div className="flex flex-col gap-4 sm:gap-0 sm:flex-row items-center justify-between bg-muted rounded p-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 grow w-full">
            <div className="flex sm:flex-col justify-between sm:justify-start gap-1 col-span-1 border-b sm:border-b-0 border-border pb-4 sm:pb-0">
              <span className="text-sm font-medium">Shipping Address</span>
              <div className="text-sm space-y-1 text-end sm:text-start text-gray-500">
                <p>{order.shipping_address.line1}</p>
                <p>{order.shipping_address.line2}</p>
                <p>
                  {order.shipping_address.city}, {order.shipping_address.state},{" "}
                  {order.shipping_address.postal_code},{" "}
                  {order.shipping_address.country}
                </p>
              </div>
            </div>
            <div className="flex sm:flex-col justify-between sm:justify-start gap-1 col-span-1 border-b sm:border-b-0 border-border pb-4 sm:pb-0">
              <span className="text-sm font-medium">Payment info</span>
              <div className="text-sm space-y-1 text-end sm:text-start text-gray-500">
                <p>Ending with {order.payment_method?.card?.last4}</p>
                <p>
                  Expires {order.payment_method?.card?.exp_month}/
                  {order.payment_method?.card?.exp_year.toString().slice(-2)}
                </p>
              </div>
            </div>
            <div className="flex sm:flex-col justify-between sm:justify-start gap-1 col-span-1 border-b sm:border-b-0 border-border pb-4 sm:pb-0">
              <span className="text-sm font-medium">Date placed</span>
              <span className="text-sm text-gray-500">
                {order.createdAt.split("T")[0]}
              </span>
            </div>
            <div className="flex justify-between gap-1 sm:col-span-3 sm:border-t border-border sm:pt-4">
              <span className="text-sm sm:text-lg font-medium">
                Total amount
              </span>
              <span className="text-sm sm:text-lg font-medium">
                ${order.amount}
              </span>
            </div>
          </div>
        </div>
        {/* Products table */}
        <table className="min-w-full sm:divide-y divide-gray-200 mt-6">
          <thead className="hidden sm:table-header-group">
            <tr>
              <th
                scope="col"
                className="py-3 pe-6 text-start text-xs font-medium uppercase tracking-wider"
              >
                Product
              </th>
              <th
                scope="col"
                className="py-3 pe-6 text-center text-xs font-medium uppercase tracking-wider"
              >
                Price
              </th>
              <th
                scope="col"
                className="py-3 pe-6 text-center text-xs font-medium uppercase tracking-wider"
              >
                Status
              </th>
              <th
                scope="col"
                className="py-3 text-end text-xs font-medium uppercase tracking-wider"
              >
                info
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {order.order_items.map((item: OrderItem) => (
              <tr key={item.id} className="border-b border-border">
                <td className="p-6 ps-0 text-start text-sm font-medium">
                  <div className="flex items-center sm:items-start gap-4">
                    <Image
                      src={item.product.image.url}
                      alt={item.product.title}
                      width={100}
                      height={100}
                      className="sm:aspect-square object-cover object-center rounded"
                      loading="lazy"
                    />
                    <div className="space-y-1 pt-2">
                      <h2 className="leading-tight font-light text-base">
                        {item.product.title}
                      </h2>
                      <ProductPrice
                        price={item.product.price}
                        className="sm:hidden"
                      />
                      <p className="font-light">Qty: {item.quantity}</p>
                      <Button
                        asChild
                        variant="link"
                        size="sm"
                        className="sm:hidden text-sky-700 p-0"
                      >
                        <Link href={`/orders/${order.id}`}>View product</Link>
                      </Button>
                    </div>
                  </div>
                </td>
                <td className="hidden sm:table-cell p-6 ps-0 text-center text-sm text-gray-500">
                  <ProductPrice price={item.product.price} />
                </td>
                <td className="hidden sm:table-cell p-6 ps-0 text-center text-sm text-gray-500">
                  Delivered
                </td>
                <td className="py-6 text-end">
                  <Button
                    asChild
                    variant="link"
                    size="sm"
                    className="text-sky-700 px-0 hidden sm:inline-flex"
                  >
                    <Link href={`/products/${item.product.documentId}`}>
                      View product
                    </Link>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
