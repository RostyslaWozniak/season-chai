"use client";
import { ShoppingCart } from "lucide-react";
import { buttonVariants } from "../ui/button";
import { SheetClose } from "../ui/sheet";
import Link from "next/link";
import { motion } from "framer-motion";

export const EmptyCart = () => {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center p-4 text-center">
      <motion.div
        className="mb-4"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <ShoppingCart className="h-24 w-24 text-gray-300" />
      </motion.div>
      <motion.h2
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mb-2 text-2xl font-semibold"
      >
        Your cart is empty
      </motion.h2>
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mb-4 text-gray-500"
      >
        {"Looks like you haven't added anything to your cart yet."}
      </motion.p>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <SheetClose asChild>
          <Link href="/products" className={buttonVariants({ size: "lg" })}>
            Start Shopping
          </Link>
        </SheetClose>
      </motion.div>
    </div>
  );
};
