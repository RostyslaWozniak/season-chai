import { HeroSection } from "@/components/main/Hero";
import { ProductCollection } from "@/components/products/ProductCollection";
import { Separator } from "@/components/ui/separator";
import { CATEGORIES } from "@/lib/validation/product";

export default async function Home() {
  return (
    <div className="-mt-20 mb-20 space-y-10">
      <HeroSection />
      <ProductCollection category={CATEGORIES[0]} />
      <Separator />
      <ProductCollection category={CATEGORIES[3]} />
      <Separator />
      <ProductCollection category={CATEGORIES[4]} />
    </div>
  );
}
