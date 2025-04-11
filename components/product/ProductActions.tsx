"use client";
import { useCart } from "@/app/context/CartContext";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Product } from "@/lib/definitions";
import { useUser } from "@clerk/nextjs";
export default function ProductActions({ product }: { product: Product }) {
  const { user } = useUser();
  const { addProductToCart, loading } = useCart();
  console.log(loading);

  const handleAddToCart = () => {
    // check if user is signed in
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to add items to your cart",
      });
      return;
    }
    // add product to cart
    addProductToCart(product);
  };

  const handleBuyNow = () => {
    // TODO: redirect or logic
    if (!user) {
      // show toast saying user must be signed in
      toast({
        title: "Sign in required",
        description: "Please sign in to buy items",
      });
      return;
    }
    // TODO: buy now logic
  };

  return (
    <div className="flex flex-col gap-4">
      <Button onClick={handleAddToCart} variant="success" size="lg">
        {loading ? "Adding..." : "Add to Cart"}
      </Button>
      <Button onClick={handleBuyNow} variant="emphasis" size="lg">
        Buy it Now
      </Button>
    </div>
  );
}
