"use client";
import Image from "next/image";
import { useCart } from "../context/CartContext";
import ProductPrice from "@/components/product/ProductPrice";
import { CartItem } from "@/lib/definitions";

export default function CartPage() {
  //  fetch cart items
  const { cartItems, removeCartItem, loading } = useCart();

  // Helper function to calculate the total price
  const calculateTotalPrice = (cartItems: CartItem[]) => {
    return cartItems.reduce((total, item) => {
      const price = item.product?.price || 0; // Ensure price is defined
      const quantity = item.quantity || 0; // Ensure quantity is defined
      return total + price * quantity;
    }, 0);
  };

  return (
    <section className="container max-w-screen-xl">
      <h1 className="text-2xl font-bold py-6">Cart</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="space-y-6 col-span-2">
          {loading && <p>Loading...</p>}
          {!loading && cartItems.length === 0 && (
            <p className="text-gray-500">Your cart is empty.</p>
          )}
          {/* Cart items */}
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-start gap-4">
              <Image
                src={item.product?.image?.url}
                alt={item.product?.image?.alternativeText || "Product Image"}
                width={100}
                height={100}
                className="object-cover object-center"
              />
              <div className="space-y-2">
                <h2 className="text-lg font-semibold">{item.product?.title}</h2>
                <p className="text-gray-500">Qunttity: {item.quantity}</p>
                <ProductPrice price={item.product?.price} />
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => removeCartItem(item.documentId)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
        {/* // TODO: add total price and checkout button */}
        <div className="flex flex-col justify-between items-center mt-4">
          <p className="text-lg font-semibold">
            Total: ${calculateTotalPrice(cartItems).toFixed(2)}
          </p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            Checkout
          </button>
        </div>
      </div>
    </section>
  );
}
