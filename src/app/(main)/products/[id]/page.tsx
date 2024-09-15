import { CategoriesView } from "@/components/products/CategoriesView";
import { InfoCard } from "@/components/products/InfoCard";

import { RelatedProducts } from "@/components/products/RelatedProducts";
import { api } from "@/trpc/server";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const { id } = params;
  const product = await api.public.products.getOne({ id });

  return {
    title: `${product.name}`,
    description: product.description,
  };
}

export default async function ProductItemPage({
  params,
}: {
  params: { id: string };
}) {
  const product = await api.public.products.getOne({ id: params.id });
  if (!product) throw new Error("Product not found");

  const categories = await api.public.categories.getAllCategories();

  console.log(product);
  return (
    <div className="container mx-auto flex h-full min-h-screen max-w-6xl flex-col items-center space-y-8">
      <InfoCard product={product} />
      <div className="grid w-full grid-cols-5 gap-20">
        <div className="col-span-4">
          <RelatedProducts categoryId={product.category.id} id={product.id} />
        </div>
        <div className="col-span-1">
          <CategoriesView categories={categories} />
        </div>
      </div>
    </div>
  );
}
