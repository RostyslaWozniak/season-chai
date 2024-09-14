/* eslint-disable @next/next/no-img-element */
import { ProductCard } from "@/components/products/ProductCard";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { categoryToSlug, slugToCategory } from "@/helpers/category";
import { cn } from "@/lib/utils";
import { CATEGORIES } from "@/lib/validation/product";
import { api } from "@/trpc/server";
import { HeartIcon, LeafIcon, CupSodaIcon } from "lucide-react";
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
  let products = [];

  if (!searchParams?.q) {
    products = await api.product.getAll();
  } else if (CATEGORIES.includes(slugToCategory(searchParams?.q))) {
    products = await api.product.getProductsByCategory({
      category: slugToCategory(searchParams?.q),
      take: 10,
    });
  } else {
    products = await api.product.getAll();
  }

  return (
    <div className="container mx-auto mb-20 max-w-7xl">
      <div className="my-4">
        {["all", ...CATEGORIES].map((category) => (
          <Link
            className={cn(
              buttonVariants({
                variant:
                  slugToCategory(searchParams?.q ?? "") === category
                    ? "outline"
                    : !CATEGORIES.includes(
                          slugToCategory(searchParams?.q ?? ""),
                        ) && category === "all"
                      ? "outline"
                      : "ghost",
                size: "lg",
              }),
              "mb-2 mr-2 text-lg",
            )}
            key={category}
            href={
              category === "all"
                ? "/products"
                : `/products?q=${categoryToSlug(category)}`
            }
          >
            {category.toLowerCase().replace("_", " ")}
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <section className="my-12">
        <h2 className="mb-4 text-2xl font-semibold">Why Choose Our Tea?</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <LeafIcon className="mb-2 h-8 w-8 text-primary" />
              <CardTitle>Premium Quality</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Hand-picked leaves from the finest tea gardens around the world.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CupSodaIcon className="mb-2 h-8 w-8 text-primary" />
              <CardTitle>Rich Flavor</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Carefully processed to preserve the natural aroma and taste.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <HeartIcon className="mb-2 h-8 w-8 text-primary" />
              <CardTitle>Health Benefits</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Packed with antioxidants and nutrients for your well-being.</p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
