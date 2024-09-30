import { HeroSection } from "@/components/main/Hero";
import { WhyUsSection } from "@/components/main/WhyUsSection";
import { ProductCollection } from "@/components/products/ProductCollection";
import { api } from "@/trpc/server";

export default async function Home() {
  const mostPopularProducts = await api.public.products.getPopularProducts({
    take: 3,
  });
  const newestProducts = await api.public.products.getNewestProducts({
    take: 3,
  });

  return (
    <div className="-mt-20 mb-20 space-y-10">
      <HeroSection />

      <ProductCollection
        products={mostPopularProducts}
        title="Our Most Popular Products"
      />

      <ProductCollection
        products={newestProducts}
        title="Our Newest Products"
      />
      <div className="container mx-auto max-w-7xl px-4 py-4">
        <WhyUsSection />
      </div>
    </div>
  );
}
