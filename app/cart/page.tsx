"use client";
import { useCart } from "../context/CartContext";
import CartItem from "@/components/cart/CartItem";
import CartTable from "@/components/cart/CartTable";
import { Button } from "@/components/ui/button";
import { CartItem as CartItemType } from "@/lib/definitions";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";

export default function CartPage() {
  //  fetch cart items
  const { cartItems, removeCartItem, loading } = useCart();
  const [itemToRemove, setItemToRemove] = useState<string | null>(null);

  // Remove cart item
  const handleRemoveCartItem = (id: string) => {
    setItemToRemove(id);
    // Simulate a delay to show the animation
    setTimeout(() => {
      removeCartItem(id);
    }, 300); // Adjust the duration to match your animation
  };

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
            {cartItems.map((item, index) => (
              <CartItem
                key={item.documentId}
                item={item}
                removeCartItem={() => handleRemoveCartItem(item.documentId)}
                style={{
                  animationDuration: `${300 + index * 100}ms`,
                }}
                className={cn(
                  "animate-in slide-in-from-top-4 fade-in duration-300 transition-transform ease-in-out will-change-transform",
                  itemToRemove === item.documentId &&
                    "animate-out slide-out-to-left fade-out"
                )}
              />
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
