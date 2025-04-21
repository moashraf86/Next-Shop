"use client";
import ProductPrice from "@/components/product/ProductPrice";
import { Button } from "@/components/ui/button";
import { fetchOrders } from "@/lib/data";
import { Order } from "@/lib/definitions";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Orders() {
  const { user } = useUser();
  const email = user?.emailAddresses[0]?.emailAddress;
  const [orders, setOrders] = useState<Order[]>([]);

  const fetchOrdersData = async () => {
    try {
      const { data } = await fetchOrders(email);
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  // Fetch orders data when the component mounts
  useEffect(() => {
    // Check if email is available
    if (email) {
      fetchOrdersData();
    } else {
      console.log("Email not found");
    }
  }, [email]);

  // Check if orders are still being fetched
  if (orders.length === 0) {
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
        {orders.map((order) => (
          <div key={order.id} className="mb-20">
            <div className="flex flex-col gap-4 sm:gap-0 sm:flex-row items-center justify-between bg-muted rounded p-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 grow w-full">
                <div className="flex justify-between sm:flex-col gap-1 col-span-1 border-b sm:border-b-0 border-border pb-4 sm:pb-0">
                  <span className="text-sm font-medium">Order number</span>
                  <span className="text-sm text-gray-500">
                    {order.order_number}
                  </span>
                </div>
                <div className="flex justify-between sm:flex-col gap-1 col-span-1 border-b sm:border-b-0 border-border pb-4 sm:pb-0">
                  <span className="text-sm font-medium">Date placed</span>
                  <span className="text-sm text-gray-500">
                    {order.createdAt.split("T")[0]}
                  </span>
                </div>
                <div className="flex justify-between sm:flex-col gap-1 col-span-1 border-b sm:border-b-0 border-border pb-4 sm:pb-0">
                  <span className="text-sm font-medium">Total amount</span>
                  <span className="text-sm font-medium">${order.amount}</span>
                </div>
              </div>
              <Button asChild variant="outline" className="w-full sm:w-auto">
                <Link href={`/orders/${order.documentId}`}>View Order</Link>
              </Button>
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
                {order.order_items.map((item) => (
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
                            <Link href={`/orders/${order.id}`}>
                              View product
                            </Link>
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
        ))}
      </div>
    </section>
  );
}
