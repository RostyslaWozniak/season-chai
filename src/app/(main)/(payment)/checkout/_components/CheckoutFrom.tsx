/** @format */

"use client";

import React, { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
  Elements,
} from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatPrice } from "@/helpers";
import { LeafLoader } from "@/components/Loaders";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

type CheckoutFormProps = { totalPrice: number; clientSecret: string };

export function CheckoutForm({ totalPrice, clientSecret }: CheckoutFormProps) {
  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <Form totalPrice={totalPrice} clientSecret={clientSecret} />
    </Elements>
  );
}

function Form({ totalPrice, clientSecret }: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState<string>();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (!stripe || !elements) {
      return;
    }

    const { error: submitError } = await elements.submit();
    if (submitError) {
      setErrorMessage(submitError.message);
      setLoading(false);
      return;
    }

    const { error: confirmError } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `${window.location.origin}/payment-success?amount=${totalPrice}`,
      },
    });

    if (
      confirmError.type === "card_error" ||
      confirmError.type === "validation_error"
    ) {
      setErrorMessage(confirmError.message);
    } else {
      setErrorMessage("An unexpected error occurred.");
    }

    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex w-[min(100%,500px)] flex-col"
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Payment Information</CardTitle>
          <CardDescription>
            Enter your payment and billing details
          </CardDescription>
          {errorMessage && (
            <CardDescription className="text-center text-sm font-medium text-red-500">
              {errorMessage}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent className="min-h-[250px]">
          {clientSecret ? (
            <PaymentElement options={{ layout: "tabs" }} />
          ) : (
            <div className="grid h-[210px] place-items-center">
              <LeafLoader size={30} />
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button className="w-full" disabled={loading || !stripe || !elements}>
            {loading ? (
              <Loader2 className="animate-spin" />
            ) : (
              `Pay ${formatPrice(totalPrice)}`
            )}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
