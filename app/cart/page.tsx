"use client";
import { useCart } from "../context/CartContext";
import CartItem from "@/components/cart/CartItem";
import CartTable from "@/components/cart/CartTable";
import { Button } from "@/components/ui/button";
import { CartItem as CartItemType } from "@/lib/definitions";
import Link from "next/link";

export default function CartPage() {
  //  fetch cart items
  const { cartItems, removeCartItem, loading } = useCart();

  // Helper function to calculate the total price
  const calculateTotalPrice = (cartItems: CartItemType[]) => {
    return cartItems.reduce((total, item) => {
      const price = item.product?.price || 0; // Ensure price is defined
      const quantity = item.quantity || 0; // Ensure quantity is defined
      return total + price * quantity;
    }, 0);
  };

  // loading skelton
  if (loading) {
    return (
      <section className="container max-w-screen-xl">
        <h1 className="text-4xl font-light uppercase text-center tracking-tight py-10">
          Cart
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="space-y-6 col-span-2">
            <p className="text-gray-500">Loading...</p>
          </div>
        </div>
      </section>
    );
  }

  // if cart is empty
  if (cartItems.length === 0) {
    return (
      <section className="container max-w-screen-xl">
        <h1 className="text-4xl font-light uppercase text-center tracking-tight py-10">
          Cart
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="space-y-6 col-span-2">
            <p className="text-gray-500">Your cart is empty.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="container max-w-screen-xl">
      <h1 className="text-4xl font-light uppercase text-center tracking-tight py-10">
        Cart
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="space-y-6 col-span-2">
          {/* Cart items */}
          <CartTable>
            {cartItems.map((item, id) => (
              <CartItem key={id} item={item} removeCartItem={removeCartItem} />
            ))}
          </CartTable>
        </div>
        <div className="space-y-4 border p-6 max-h-fit">
          <div className="flex justify-between items-center w-full">
            <p className="text-xl uppercase tracking-widest font-semibold">
              Total
            </p>
            <span className="text-xl font-semibold">
              ${calculateTotalPrice(cartItems).toFixed(2)}
            </span>
          </div>
          <p className="text-sm">Taxes and shipping calculated at checkout.</p>
          <Button asChild variant="emphasis" className="w-full">
            <Link href="/checkout">Checkout</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
