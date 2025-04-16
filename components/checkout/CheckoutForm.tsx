"use client";

import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { Button } from "../ui/button";
import { useState } from "react";
import { Input } from "../ui/input";

export default function CheckoutForm({
  clientSecret,
}: {
  clientSecret: string;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

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
      },
    });

    if (result.error) {
      console.log("Payment error:", result.error);
      setLoading(false);
      return;
    } else {
      console.log("Payment result:", result);
      // handle clear cart
    }
    setLoading(false);
  };

  return (
    <form id="checkout" onSubmit={handleSubmit} className="space-y-6 p-6">
      {/* Contact */}
      <section className="space-y-3">
        <h2 className="text-xl  font-light uppercase tracking-tight">
          Contact
        </h2>
        <Input type="email" placeholder="Email" />
      </section>
      {/* Delivery */}
      <section className="space-y-3">
        <h2 className="text-xl  font-light uppercase tracking-tight">
          Delivery
        </h2>
        <Input type="text" placeholder="Full Name" />
        <Input type="text" placeholder="Address" />
        <div className="flex gap-2">
          <Input type="text" placeholder="City" />
          <Input type="text" placeholder="State" />
          <Input type="text" placeholder="Zip Code" />
        </div>
        <Input type="text" placeholder="Phone" />
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
