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

  const categorySlug = searchParams?.q;

  const products = categorySlug
    ? await api.public.products.getProductsByCategorySlug({
        slug: categorySlug,
        take: 9,
        skip: 0,
      })
    : await api.public.products.getAllProductsWithPagination({
        take: 9,
        skip: 0,
      });

  return (
    <div className="container mx-auto mb-20 max-w-7xl">
      <div className="my-4 grid grid-cols-2 flex-wrap sm:grid-cols-4 lg:flex">
        <Link
          href="/products"
          className={cn(
            buttonVariants({
              variant: !categorySlug ? "default" : "outline",
              size: "lg",
            }),
            "mb-2 mr-2 text-lg",
          )}
        >
          All
        </Link>

        {[...categories].map((category) => (
          <Link
            className={cn(
              buttonVariants({
                variant: categorySlug === category.slug ? "default" : "outline",
                size: "lg",
              }),
              "mb-2 mr-2 text-lg",
            )}
            key={category.id}
            href={`/products?q=${slugifyString(category.name)}`}
          >
            {category.name}
          </Link>
        ))}
      </div>

      <div className="grid min-h-[300px] grid-cols-1 place-items-center gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
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
