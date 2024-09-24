import { WhyUsSection } from "@/components/main/WhyUsSection";
import { ProductCard } from "@/components/products/ProductCard";
import { buttonVariants } from "@/components/ui/button";

import { slugifyString } from "@/helpers";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/server";
import { type Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Products",
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams?: { q: string };
}) {
  const categories = await api.public.categories.getAllCategories();

  const categoryName = searchParams?.q ?? "all";

  const currentCutegoryId = categories.find(
    (category) => category.name === categoryName.replaceAll("-", " "),
  )?.id;

  const products = await api.public.products.getProductsByCategoryId({
    id: currentCutegoryId ?? "",
  });

  return (
    <div className="container mx-auto mb-20 max-w-7xl">
      <div className="my-4 grid grid-cols-2 flex-wrap sm:grid-cols-4 lg:flex">
        {[...categories].map((category) => (
          <Link
            className={cn(
              buttonVariants({
                variant:
                  categoryName.replace("-", " ") === category.name.toLowerCase()
                    ? "default"
                    : "outline",
                size: "lg",
              }),
              "mb-2 mr-2 text-lg",
            )}
            key={category.id}
            href={
              category.name === "all"
                ? "/products"
                : `/products?q=${slugifyString(category.name)}`
            }
          >
            {category.name}
          </Link>
        ))}
      </div>

      <div className="grid min-h-[300px] grid-cols-1 place-items-center gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.length === 0 ? (
          <p className="col-span-3 text-center text-2xl">No products found</p>
        ) : (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>
      <WhyUsSection />
    </div>
  );
}
