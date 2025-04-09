"use client";

import Image from "next/image";
import { useCart } from "../context/CartContext";
import ProductPrice from "@/components/product/ProductPrice";

export default function CartPage() {
  //  fetch cart items
  const { cartItems } = useCart();

  if (cartItems?.length === 0 || !cartItems) {
    return (
      <section className="container max-w-screen-xl">
        <h1 className="text-2xl font-bold">Cart</h1>
        <p className="text-gray-500">Your cart is empty.</p>
      </section>
    );
  }

  return (
    <section className="container max-w-screen-mxl">
      <h1 className="text-2xl font-bold py-6">Cart</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="space-y-6 col-span-2">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-start gap-4">
              <Image
                src={item.product.image.url}
                alt={item.product.image.alternativeText || "Product Image"}
                width={100}
                height={100}
                className="object-cover object-center"
              />
              <div className="space-y-2">
                <h2 className="text-lg font-semibold">{item.product.title}</h2>
                <p className="text-gray-500">Qunttity: {item.quantity}</p>
                <ProductPrice price={item.product.price} />
                <button className="text-red-500 hover:text-red-700">
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
        {/* // TODO: add total price and checkout button */}
        <div className="flex flex-col justify-between items-center mt-4">
          <p className="text-lg font-semibold">
            Total:{" "}
            {cartItems.reduce((total, item) => total + item.product.price, 0)} €
          </p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            Checkout
          </button>
        </div>
      </div>
    </section>
  );
}
