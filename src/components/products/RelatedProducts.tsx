import { api } from "@/trpc/server";
import { SmallProductCard } from "./SmallProductCard";

export const RelatedProducts = async ({
  categoryId,
  id,
}: {
  categoryId: string;
  id: string;
}) => {
  const products = await api.public.products.getRelatedProducts({
    categoryId,
    take: 2,
    id,
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
