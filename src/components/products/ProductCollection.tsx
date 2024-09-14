import { api } from "@/trpc/server";
import { type $Enums } from "@prisma/client";
import { ProductCard } from "./ProductCard";
import Link from "next/link";
import IconMenu from "../IconMenu";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";

export const ProductCollection = async ({
  category,
}: {
  category: $Enums.Category;
}) => {
  const products = await api.product.getProductsByCategory({
    category,
    take: 3,
  });
  return (
    <div className="container mx-auto max-w-7xl px-4 pb-10">
      <div className="mb-14 text-center">
        <h2 className="mb-4 text-4xl font-bold capitalize text-primary">
          Our {category.replace("_", " ").toLowerCase()} Collection
        </h2>
        <p className="text-xl text-muted-foreground">
          Discover our carefully curated selection of premium teas from around
          the world.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <Link
        href="/products"
        className={cn(
          buttonVariants({ size: "lg", variant: "link" }),
          "float-right mt-4",
        )}
      >
        <IconMenu
          className="flex-row-reverse text-xl"
          text="Check more products"
          icon={ArrowUpRight}
          iconSize={30}
        />
      </Link>
    </div>
  );
};
