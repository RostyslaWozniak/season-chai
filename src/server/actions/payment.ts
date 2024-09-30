"use server";

import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const getPaymentIntent = async (totalPrice: number) => {
  const paymantIntent = await stripe.paymentIntents.create({
    amount: Math.round(totalPrice * 100),
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
  });
  if (paymantIntent.client_secret == null) {
    throw new Error("Stripe failed to create payment intent.");
  }
  console.log(paymantIntent);
  return { clientSecret: paymantIntent.client_secret };
};
