import { CartItem as CartItemType } from "@/lib/definitions";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
export default function CheckoutBox({
  cartItems,
}: {
  cartItems: CartItemType[];
}) {
  const { user } = useUser();
  const email = user?.emailAddresses[0]?.emailAddress;
  const name = user?.fullName;

  // Helper function to calculate the total price
  const calculateTotalPrice = (cartItems: CartItemType[]) => {
    return cartItems.reduce((total, item) => {
      const price = item.product?.price || 0; // Ensure price is defined
      const quantity = item.quantity || 0; // Ensure quantity is defined
      return total + price * quantity;
    }, 0);
  };

  return (
    <div className="space-y-4 border p-6 col-span-3 lg:col-span-1 max-h-fit">
      <div className="flex justify-between items-center w-full">
        <p className="text-xl uppercase tracking-widest font-semibold">Total</p>
        <span className="text-xl font-semibold">
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(calculateTotalPrice(cartItems))}
        </span>
      </div>
      <p className="text-sm">Taxes and shipping calculated at checkout.</p>
      {/* Order notes */}
      <Textarea placeholder="Order notes" />
      <Button asChild variant="emphasis" className="w-full" size="lg">
        <Link
          prefetch={false}
          href={`checkout?amount=${calculateTotalPrice(
            cartItems
          )}&email=${email}&name=${name}`}
        >
          Checkout
        </Link>
      </Button>
    </div>
  );
}
