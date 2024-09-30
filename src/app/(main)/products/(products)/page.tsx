"use client";
import { LeafLoader } from "@/components/Loaders";
import { WhyUsSection } from "@/components/main/WhyUsSection";
import { Skeleton } from "@/components/ui/skeleton";
import { useProducts } from "@/context/ProductsContext";
import { useSearchParams } from "next/navigation";
import { ProductsNav } from "./_components/ProductsNav";
import { ProductsView } from "@/components/products/ProductsView";

export default function ProductsPage() {
  const { products, productsPending, categoriesPending } = useProducts();

  const searchParams = useSearchParams();

  const categorySlug = searchParams.get("q");

  const filteredProducts = categorySlug
    ? products.filter((product) => product.category.slug === categorySlug)
    : products;

  return (
    <div className="container mx-auto mb-20 max-w-7xl">
      {!categoriesPending ? (
        <ProductsNav categorySlug={categorySlug} />
      ) : (
        <div className="my-4 grid grid-cols-2 flex-wrap gap-2 sm:grid-cols-4 lg:flex">
          <Skeleton className="h-10 lg:w-24" />
          <Skeleton className="h-10 lg:w-40" />
          <Skeleton className="h-10 lg:w-36" />
          <Skeleton className="h-10 lg:w-32" />
          <Skeleton className="h-10 lg:w-40" />
          <Skeleton className="h-10 lg:w-32" />
          <Skeleton className="h-10 lg:w-36" />
          <Skeleton className="h-10 lg:w-40" />
        </div>
      )}
      {!productsPending ? (
        <ProductsView products={filteredProducts} />
      ) : (
        <div className="grid min-h-[400px] place-items-center">
          <LeafLoader size={40} />
        </div>
      )}
      <WhyUsSection />
    </div>
  );
}
