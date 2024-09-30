"use client";

import { motion } from "framer-motion";
import { ProductCard } from "./ProductCard";
import { type RouterOutputs } from "@/trpc/react";

export const ProductsView = ({
  products,
}: {
  products: RouterOutputs["public"]["products"]["getAllProducts"];
}) => {
  return (
    <div className="grid min-h-[400px] grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
      {products.length === 0 ? (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="col-span-3 text-center text-3xl"
        >
          No products found
        </motion.p>
      ) : (
        products.map((product, i) => (
          <motion.div
            // add i for framer animation
            key={product.id + i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 * i }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))
      )}
    </div>
  );
};
