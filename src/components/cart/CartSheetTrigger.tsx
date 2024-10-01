"use client";

import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { buttonVariants } from "../ui/button";

export const CartSheetTrigger = () => {
  const { cartItems, totalItems } = useCart();

  const searchParams = useSearchParams();
  const isOpen = searchParams.get("cart-open") === "true";
  const q = searchParams.get("q");
  const href = isOpen
    ? q
      ? `?q=${q}&cart-open=false`
      : "?cart-open=false"
    : q
      ? `?q=${q}&cart-open=true`
      : `?cart-open=true`;
  return (
    <motion.div
      className={cn("flex flex-col items-center", {
        "text-primary": isOpen,
      })}
      key={cartItems.reduce((sum, item) => sum + item.quantity, 0) + 1 * 10}
      initial={cartItems.length > 0}
      animate={{ rotate: [0, -5, 5, -5, 5, 0] }}
    >
      <Link
        href={href}
        className={cn(
          buttonVariants({ variant: "outline", size: "icon" }),
          "pointer-events-auto relative flex flex-col items-center rounded-full p-2 text-gray-600 transition-colors duration-200",
        )}
      >
        <span
          className={cn(
            "rounded-full border-primary/20 bg-gray-50 p-2 text-gray-800 transition-all duration-200 ease-in-out md:border-[0.5px] md:bg-gray-50",
            {
              "text-primary": isOpen,
            },
          )}
        >
          <ShoppingCart />
        </span>

        {totalItems > 0 && (
          <motion.span
            key={cartItems.length + 1}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="absolute -bottom-2 -right-2 grid aspect-square h-5 place-items-center rounded-full bg-primary text-primary-foreground md:-bottom-2"
          >
            {cartItems.length}
          </motion.span>
        )}
      </Link>
      <span className="mt-1 text-center text-xs font-medium md:hidden">
        Cart
      </span>
    </motion.div>
  );
};
