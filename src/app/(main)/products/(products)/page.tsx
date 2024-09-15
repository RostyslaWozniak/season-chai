import { ProductCard } from "@/components/products/ProductCard";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { slugifyString } from "@/helpers";
import { cn } from "@/lib/utils";
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
  const categories = (await api.public.categories.getAllCategories()).map(
    (category) => category.name,
  );

  const categoryName = searchParams?.q ?? "all";

  console.log("categoryName", categoryName);

  const products = await api.public.products.getProductsByCategoryName({
    name: categoryName.replace("-", " "),
  });

  return (
    <div className="container mx-auto mb-20 max-w-7xl">
      <div className="my-4">
        {["all", ...categories].map((category) => (
          <Link
            className={cn(
              buttonVariants({
                variant:
                  categoryName.replace("-", " ") === category.toLowerCase()
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
                : `/products?q=${slugifyString(category)}`
            }
          >
            {category}
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
