"use client";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useCart } from "@/hooks/useCart";
import { Product } from "@/lib/definitions";
import { useUser } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
export default function ProductActions({
  product,
  quantity,
}: {
  product: Product;
  quantity: number;
}) {
  const { user } = useUser();
  const { addProductToCart, isAdding } = useCart();

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
    addProductToCart(product, quantity);
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
      <Button
        onClick={handleAddToCart}
        variant="success"
        size="lg"
        disabled={isAdding}
      >
        {isAdding ? (
          <span>
            <Loader2 className="animate-spin" />
          </span>
        ) : (
          "Add to Cart"
        )}
      </Button>
      <Button onClick={handleBuyNow} variant="emphasis" size="lg">
        Buy it Now
      </Button>
    </div>
  );
}
