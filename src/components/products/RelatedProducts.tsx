import { api } from "@/trpc/server";
import { SmallProductCard } from "./SmallProductCard";

export const RelatedProducts = async ({
  categorySlug,
}: {
  categorySlug: string;
}) => {
  const products = await api.public.products.getProductsByCategorySlug({
    slug: categorySlug,
    take: 2,
    skip: Math.random() * (3 - 0) + 0,
  });

  if (!products || products.length === 0) return null;

  return (
    <div className="grow px-4">
      <h2 className="mb-4 border-b text-xl">Others Products</h2>

      <div className="grid gap-4 md:grid-cols-2">
        {products.map((product) => (
          <SmallProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
