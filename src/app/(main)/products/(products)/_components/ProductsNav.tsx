import { buttonVariants } from "@/components/ui/button";
import { useProducts } from "@/context/ProductsContext";
import { cn } from "@/lib/utils";
import Link from "next/link";

export const ProductsNav = ({
  categorySlug,
}: {
  categorySlug: string | null;
}) => {
  const { categories } = useProducts();
  return (
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
              variant: categorySlug === category.slug ? "default" : "outline",
              size: "lg",
            }),
            "text-lg",
          )}
          key={category.id}
          href={`/products?q=${category.slug}`}
        >
          {category.name}
        </Link>
      ))}
    </div>
  );
};
