"use client";
import { LeafLoader } from "@/components/Loaders";
import { WhyUsSection } from "@/components/main/WhyUsSection";
import { ProductCard } from "@/components/products/ProductCard";
import { buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useProducts } from "@/context/ProductsContext";

import { slugifyString } from "@/helpers";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function ProductsPage() {
  const { categories, products, productsPending, categoriesPending } =
    useProducts();

  const searchParams = useSearchParams();

  const categorySlug = searchParams.get("q");

  const filteredProducts = categorySlug
    ? products.filter((product) => product.category.slug === categorySlug)
    : products;

  return (
    <div className="container mx-auto mb-20 max-w-7xl">
      {!categoriesPending ? (
        <>
          <div className="my-4 grid grid-cols-2 flex-wrap gap-2 sm:grid-cols-4 lg:flex">
            <Link
              href="/products"
              className={cn(
                buttonVariants({
                  variant: !categorySlug ? "default" : "outline",
                  size: "lg",
                }),
                "text-lg",
              )}
            >
              All
            </Link>

            {[...categories].map((category) => (
              <Link
                className={cn(
                  buttonVariants({
                    variant:
                      categorySlug === category.slug ? "default" : "outline",
                    size: "lg",
                  }),
                  "text-lg",
                )}
                key={category.id}
                href={`/products?q=${slugifyString(category.name)}`}
              >
                {category.name}
              </Link>
            ))}
          </div>
        </>
      ) : (
        <div className="my-4 grid grid-cols-2 flex-wrap gap-2 sm:grid-cols-4 lg:flex">
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-40" />
          <Skeleton className="h-10 w-36" />
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-40" />
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-36" />
          <Skeleton className="h-10 w-40" />
        </div>
      )}
      {!productsPending ? (
        <div className="grid min-h-[400px] grid-cols-1 place-items-center gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.length === 0 ? (
            <p className="col-span-3 text-center text-2xl">No products found</p>
          ) : (
            filteredProducts.map((product, i) => (
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
      ) : (
        <div className="grid min-h-[400px] place-items-center">
          <LeafLoader size={40} />
        </div>
      )}

      <WhyUsSection />
    </div>
  );
}
