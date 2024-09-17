import { api } from "@/trpc/server";
import { Card, CardTitle } from "../ui/card";
import Image from "next/image";
import { formatPrice } from "@/helpers";
import Link from "next/link";
import { AddToCartButton } from "./AddToCartButton";

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
    <div className="grow">
      <h2 className="mb-4 border-b text-xl">Others Products</h2>

      <div className="grid grid-cols-2 gap-4">
        {products.map((product) => (
          <Card
            className="grid h-full grid-cols-3 overflow-hidden duration-300 hover:shadow-md"
            key={product.id}
          >
            <Link key={product.id} href={`/products/${product.id}`}>
              <Image
                width={150}
                height={200}
                src={product.image_url}
                alt={product.name}
                className="h-full object-cover"
              />
            </Link>
            <div className="group col-span-2 flex flex-col items-start justify-center p-4">
              <Link key={product.id} href={`/products/${product.id}`}>
                <div className="flex grow flex-col justify-center">
                  <CardTitle className="text-lg group-hover:underline">
                    {product.name}
                  </CardTitle>
                  <p className="text-muted-foreground">
                    {formatPrice(product.price)}
                  </p>
                </div>
              </Link>
              <AddToCartButton productId={product.id} />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
