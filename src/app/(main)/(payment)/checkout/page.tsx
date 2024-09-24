import Stripe from "stripe";

import { api } from "@/trpc/server";
import { convertToSubcurrency } from "@/helpers";
import { CURRENCY } from "@/helpers/constant";
import { CheckoutForm } from "./_components/CheckoutFrom";
import { OrderSummary } from "./_components/OrderSummary";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export default async function CheckoutPage() {
  const cartItems = await api.private.getCartItems();

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const paymantIntent = await stripe.paymentIntents.create({
    amount: convertToSubcurrency(totalPrice),
    currency: CURRENCY.toLowerCase(),
    automatic_payment_methods: {
      enabled: true,
    },
  });
  if (paymantIntent.client_secret == null) {
    throw new Error("Stripe failed to create payment intent.");
  }

  return (
    <div className="container mx-auto mb-32 mt-10 p-4">
      <h1 className="mb-8 text-3xl font-bold">Checkout</h1>
      <div className="flex flex-wrap gap-8">
        <OrderSummary items={cartItems} totalPrice={totalPrice} />

        <CheckoutForm
          totalPrice={totalPrice}
          clientSecret={paymantIntent.client_secret}
        />
      </div>
    </div>
  );
}
