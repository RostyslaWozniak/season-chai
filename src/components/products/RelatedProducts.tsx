import { api } from "@/trpc/server";
import { Card, CardTitle } from "../ui/card";
import Image from "next/image";
import { formatPrice } from "@/helpers";
import Link from "next/link";
import CartBtn from "./CartBtn";

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
          <Card
            className="mx-auto grid h-full w-full max-w-[400px] grid-cols-2 overflow-hidden duration-300 hover:shadow-md lg:grid-cols-3"
            key={product.id}
          >
            <Link key={product.id} href={`/products/${product.id}`}>
              <Image
                width={150}
                height={200}
                src={product.image_url}
                alt={product.name}
                className="aspect-square object-cover"
              />
            </Link>
            <div className="group flex flex-col items-start justify-center gap-3 p-2 sm:p-4 lg:col-span-2">
              <Link key={product.id} href={`/products/${product.id}`}>
                <div className="flex grow flex-col justify-center">
                  <CardTitle className="text-xl group-hover:underline">
                    {product.name}
                  </CardTitle>
                  <p className="text-muted-foreground">
                    {formatPrice(product.price)}
                  </p>
                </div>
              </Link>
              <CartBtn productId={product.id} />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
