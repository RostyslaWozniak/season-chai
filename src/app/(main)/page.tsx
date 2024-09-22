import { HeroSection } from "@/components/main/Hero";
import { WhyUsSection } from "@/components/main/WhyUsSection";
import { ProductCollection } from "@/components/products/ProductCollection";
import { api } from "@/trpc/server";

export default async function Home() {
  const categories = await api.public.categories.getAllCategories();

  return (
    <div className="-mt-20 mb-20 space-y-10">
      <HeroSection />
      <div className="container mx-auto max-w-7xl px-4 py-4">
        <WhyUsSection />
      </div>
      {categories.map((category) => (
        <ProductCollection category={category} key={category.id} />
      ))}
    </div>
  );
}
