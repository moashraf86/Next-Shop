"use client";
import { useCart } from "@/app/context/CartContext";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { addProductToCart } from "@/lib/actions";
import { useUser } from "@clerk/nextjs";
export default function ProductActions({ productId }: { productId: number }) {
  const { user } = useUser();
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to add items to your cart",
      });
      return;
    }
    // TODO: add to cart logic
    addProductToCart(user.emailAddresses[0].emailAddress, productId)
      .then((response) => {
        console.log("Cart Entry ID:", response.data.id); // Logs the cart entry ID
        console.log("Product ID:", productId); // Logs the product ID

        toast({
          title: "Added to cart",
          description: "Item has been added to your cart",
        });
      })
      .catch((error) => {
        toast({
          title: "Error adding to cart",
          description: error.message,
        });
      });

    // store cart in context
    addToCart(productId);
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
        Add to Cart
      </Button>
      <Button onClick={handleBuyNow} variant="emphasis" size="lg">
        Buy it Now
      </Button>
    </div>
  );
}
