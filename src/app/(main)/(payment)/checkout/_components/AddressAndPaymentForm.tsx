"use client";

import { type RouterOutputs } from "@/trpc/react";
import DeliveryAddressForm from "./AddressForm";
import { CheckoutForm } from "./CheckoutFrom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { motion } from "framer-motion";
import { useState } from "react";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

type AddressAndPaymentFormProps = {
  userDetails: RouterOutputs["private"]["data"]["getUserDetails"];
  totalPriceWithTax: number;
  clientSecret: string;
  items: RouterOutputs["private"]["cart"]["getCartItems"];
};

export const AddressAndPaymentForm = ({
  userDetails,
  totalPriceWithTax,
  clientSecret,
  items,
}: AddressAndPaymentFormProps) => {
  const [isCheckoutFormVisible, setIsCheckoutFormVisible] = useState(false);
  return (
    <>
      {!isCheckoutFormVisible && (
        <DeliveryAddressForm
          userDetails={userDetails}
          setIsCheckoutFormVisible={setIsCheckoutFormVisible}
        />
      )}
      {isCheckoutFormVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <CheckoutForm
              totalPrice={totalPriceWithTax}
              clientSecret={clientSecret}
              items={items}
            />
          </Elements>
        </motion.div>
      )}
    </>
  );
};
