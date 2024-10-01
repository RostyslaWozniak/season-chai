"use client";

import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";

type CartSheetTriggerProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const CartSheetTrigger = ({
  isOpen,
  setIsOpen,
}: CartSheetTriggerProps) => {
  const { cartItems, totalItems } = useCart();

  return (
    <motion.div
      className={cn("flex flex-col items-center", {
        "text-primary": isOpen,
      })}
      key={cartItems.reduce((sum, item) => sum + item.quantity, 0) + 1 * 10}
      initial={cartItems.length > 0}
      animate={{ rotate: [0, -5, 5, -5, 5, 0] }}
    >
      <Button
        variant="outline"
        size="icon"
        className="pointer-events-auto relative flex flex-col items-center rounded-full p-2 text-gray-600 transition-colors duration-200"
        onClick={() => setIsOpen(!isOpen)}
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
            className="absolute -bottom-2 -right-2 aspect-square h-5 rounded-full bg-primary text-primary-foreground md:-bottom-2"
          >
            {cartItems.length}
          </motion.span>
        )}
      </Button>
      <span className="mt-1 text-center text-xs font-medium md:hidden">
        Cart
      </span>
    </motion.div>
  );
};
