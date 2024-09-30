import Stripe from "stripe";

import { api } from "@/trpc/server";
import { convertToSubcurrency, getTotalPriceWithTax } from "@/helpers";
import { CURRENCY } from "@/helpers/constant";
import { OrderSummary } from "./_components/OrderSummary";
import { AddressAndPaymentForm } from "./_components/AddressAndPaymentForm";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export default async function CheckoutPage() {
  const cartItems = await api.private.cart.getCartItems();

  const { taxRate } = await api.private.data.getTax();

  const totalPrice = cartItems.reduce(
    (total, item) => total + (item.salePrice ?? item.price) * item.quantity,
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

  const { tax, totalPriceWithTax } = getTotalPriceWithTax(totalPrice, taxRate);

  const userDetails = await api.private.data.getUserDetails();

  return (
    <div className="container mx-auto my-10 p-2 lg:mb-32">
      <h1 className="mb-8 text-center text-3xl font-bold sm:text-start">
        Checkout
      </h1>
      {/* <div className="flex flex-col items-center justify-between gap-8 lg:flex-row lg:items-end"> */}
      <div className="grid gap-10 xl:grid-cols-5 2xl:gap-20 2xl:px-10">
        <div className="lg:col-span-3">
          <OrderSummary
            items={cartItems}
            totalPrice={totalPrice}
            totalPriceWithTax={totalPriceWithTax}
            tax={tax}
          />
        </div>
        <div className="lg:col-span-2 lg:self-end">
          <AddressAndPaymentForm
            items={cartItems}
            userDetails={userDetails}
            totalPriceWithTax={totalPriceWithTax}
            clientSecret={paymantIntent.client_secret}
          />
        </div>
      </div>
    </div>
  );
}
