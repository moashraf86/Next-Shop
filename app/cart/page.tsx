"use client";
import { useCart } from "../context/CartContext";
import CartItem from "@/components/cart/CartItem";
import CartSkeleton from "@/components/cart/CartSkeleton";
import CartTable from "@/components/cart/CartTable";
import CheckoutBox from "@/components/cart/CheckoutBox";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ShoppingBag } from "lucide-react";
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
    }, 250); // Adjust the duration to match your animation
  };

  // if cart is empty
  if (cartItems.length === 0 && !loading) {
    return (
      <section className="container max-w-screen-xl h-[calc(100vh-10rem)] flex items-center justify-center">
        <div className="space-y-6 max-w-md mx-auto text-center">
          <div className="inline-block relative">
            <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold text-xs">
              0
            </span>
            <ShoppingBag className="size-12" />
          </div>
          <p className="text-4xl font-light">Your cart is empty</p>
          <Button asChild variant="emphasis" className="w-full" size="lg">
            <Link href="/">Continue Shopping</Link>
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="container max-w-screen-xl">
      <h1 className="text-4xl font-light uppercase text-center tracking-tight py-10">
        Cart
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {loading && <CartSkeleton />}
        {/* Cart items */}
        {!loading && cartItems.length > 0 && (
          <>
            <div className="space-y-6 col-span-3 lg:col-span-2">
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
              {/* Cart items count */}
              {!loading && cartItems.length > 0 && (
                <p className="text-sm text-gray-500">
                  {(() => {
                    const totalItems = cartItems.reduce(
                      (total, item) => total + item.quantity,
                      0
                    );
                    return `You have ${totalItems} item${
                      totalItems > 1 ? "s" : ""
                    } in your cart.`;
                  })()}
                </p>
              )}
            </div>
            <CheckoutBox cartItems={cartItems} />
          </>
        )}
      </div>
    </section>
  );
}
