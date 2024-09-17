import { HeroSection } from "@/components/main/Hero";
import { ProductCollection } from "@/components/products/ProductCollection";
import { api } from "@/trpc/server";

export default async function Home() {
  const categories = await api.public.categories.getAllCategories();

  return (
    <div className="-mt-20 mb-20 space-y-10">
      <HeroSection />
      {categories.map((category) => (
        <ProductCollection category={category} key={category.id} />
      ))}
    </div>
  );
}
