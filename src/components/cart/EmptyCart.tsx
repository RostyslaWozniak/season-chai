"use client";
import { ShoppingCart } from "lucide-react";
import { buttonVariants } from "../ui/button";
import { SheetClose } from "../ui/sheet";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";

export const EmptyCart = () => {
  const [isHovering, setIsHovering] = useState(false);
  return (
    <motion.div
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex min-h-[400px] flex-col items-center justify-center p-4 text-center"
    >
      <motion.div
        className="mb-4"
        animate={isHovering ? { rotate: [0, -5, 5, -5, 5, 0] } : {}}
        transition={{ duration: 0.5 }}
        onHoverStart={() => setIsHovering(true)}
        onHoverEnd={() => setIsHovering(false)}
      >
        <ShoppingCart className="h-24 w-24 text-gray-300" />
      </motion.div>
      <h2 className="mb-2 text-2xl font-semibold">Your cart is empty</h2>
      <p className="mb-4 text-gray-500">
        {"Looks like you haven't added anything to your cart yet."}
      </p>
      <SheetClose asChild>
        <Link href="/products" className={buttonVariants({ size: "lg" })}>
          Start Shopping
        </Link>
      </SheetClose>
    </motion.div>
  );
};
