import { Gift, LeafyGreen, ShoppingBag } from "lucide-react";
import { buttonVariants } from "../ui/button";
import { formatPrice } from "@/helpers";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Image from "next/image";

const features = [
  {
    icon: LeafyGreen,
    title: "100% Organic",
    description: "All our teas are certified organic and ethically sourced.",
  },
  {
    icon: ShoppingBag,
    title: "Free Shipping",
    description: `Enjoy free shipping on orders over ${formatPrice(49.99)}.`,
  },
  {
    icon: Gift,
    title: "Gift Wrapping",
    description: "Beautiful gift wrapping available for all purchases.",
  },
];
export const HeroSection = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-primary/10 to-primary/20">
      <div className="relative mx-auto max-w-7xl px-4 pb-24 pt-32 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
          <div className="text-center md:text-left">
            <h1 className="mb-6 text-5xl font-extrabold tracking-tight text-primary md:text-6xl">
              Discover the World of Season Chai
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-xl text-muted-foreground md:mx-0">
              Embark on a journey of flavors with our curated collection of
              premium teas from around the globe. From soothing herbal blends to
              invigorating black teas, find your perfect cup.
            </p>
            <div className="flex flex-wrap justify-center gap-4 sm:flex-row md:justify-start">
              <Link
                href="/products"
                className={cn(
                  buttonVariants({ variant: "default", size: "lg" }),
                  "flex-1 px-8 text-lg sm:flex-none",
                )}
              >
                Shop Now
                <ShoppingBag className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/products?q=gift-sets"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "flex-1 px-8 text-lg sm:flex-none",
                )}
              >
                Gift Sets
                <Gift className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
          <div className="relative hidden md:block">
            <div className="absolute -right-10 top-1/2 w-72 -translate-y-1/2 transform rounded-full bg-primary/10 sm:h-[450px] sm:w-[450px]"></div>
            <Image
              width={450}
              height={450}
              src="/images/hero.svg"
              alt="Elegant tea set"
              className="relative z-10 h-auto w-auto rounded-lg object-cover"
              priority
            />
          </div>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-primary/10 p-3">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
