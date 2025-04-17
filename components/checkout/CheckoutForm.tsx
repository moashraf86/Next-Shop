"use client";

import {
  AddressElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { Button } from "../ui/button";
import { useState } from "react";
import { createOrder } from "@/lib/actions";
import { useUser } from "@clerk/nextjs";
import { useCart } from "@/app/context/CartContext";
import { useRouter } from "next/navigation";
import { Address } from "@/lib/definitions";

export default function CheckoutForm({
  clientSecret,
}: {
  clientSecret: string;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const { clearCart } = useCart();
  const { user } = useUser();
  const email = user?.emailAddresses[0]?.emailAddress;
  const name = user?.fullName;
  const router = useRouter();

  // handle submit
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);

    // Ensure form is validated before proceeding
    const { error: submitError } = await elements.submit();

    if (submitError) {
      console.log("Form validation error:", submitError);
      setLoading(false);
      return;
    }

    // Confirm the payment
    const result = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment-confirm`,
        payment_method_data: {
          billing_details: {
            // billing details goes here
          },
        },
      },
      redirect: "if_required",
    });

    if (result.error) {
      console.log("Payment error:", result.error);
      setLoading(false);
      return;
    } else {
      console.log("Payment result:", result.paymentIntent);
      const paymentId = result.paymentIntent.id;
      const paymentAmount = result.paymentIntent.amount;
      const shippingAddress = result.paymentIntent.shipping?.address;
      // Create order
      handleCreateOrder(paymentAmount, paymentId, shippingAddress);
      clearCart();
      // Redirect to success page
      router.push("/payment-confirm");
      router.refresh();
    }
    setLoading(false);
  };

  // handle create order
  const handleCreateOrder = (
    amount: number,
    paymentId: string,
    shippingAddress: Address | undefined
  ) => {
    createOrder({
      name: name || "guest",
      email: email,
      amount: amount / 100,
      payment_id: paymentId,
      shipping_address: shippingAddress,
    });
  };

  return (
    <form id="checkout" onSubmit={handleSubmit} className="space-y-6 p-6">
      {/* Shipping */}
      <section className="space-y-3">
        <h2 className="text-xl  font-light uppercase tracking-tight">
          Shipping
        </h2>
        <p className="text-sm">Delivery time: 3-5 business days</p>
        <AddressElement
          options={{
            mode: "shipping",
            fields: {
              phone: "always",
            },
          }}
        />
      </section>
      {/* Payment */}
      <section className="space-y-3">
        <h2 className="text-xl  font-light uppercase tracking-tight">
          Payment
        </h2>
        <p className="text-sm">We accept all major credit cards.</p>
        <PaymentElement
          options={{
            layout: "accordion",
          }}
        />
      </section>

      <Button variant="emphasis" type="submit" disabled={!stripe || loading}>
        Pay
      </Button>
    </form>
  );
}
