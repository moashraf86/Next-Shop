import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-03-31.basil",
});

export async function POST(req: NextRequest) {
  const { amount } = await req.json();

  const paymentIntent = await stripe.paymentIntents.create({
    amount: Number(amount * 100), // convert to dollars
    currency: "usd",
  });

  return NextResponse.json({ clientSecret: paymentIntent.client_secret });
}
