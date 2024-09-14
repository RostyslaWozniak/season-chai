import { api } from "@/trpc/server";
import { type Category } from "@prisma/client";
import { Card, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { ShoppingCartIcon } from "lucide-react";
import Image from "next/image";
import { formatPrice } from "@/helpers";
import Link from "next/link";

export const RelatedProducts = async ({
  category,
  id,
}: {
  category: Category;
  id: string;
}) => {
  const products = await api.product.getRelatedProducts({
    category,
    take: 2,
    id,
  });

  if (!products || products.length === 0) return null;

  return (
    <div className="grow">
      <h2 className="mb-4 border-b text-xl">Others Products</h2>

      <div className="grid grid-cols-2 gap-4">
        {products
          .filter((product) => product.category === category)
          .map((product) => (
            <Link key={product.id} href={`/products/${product.id}`}>
              <Card
                key={product.category}
                className="grid h-full grid-cols-3 overflow-hidden duration-300 hover:shadow-md"
              >
                <Image
                  width={150}
                  height={200}
                  src={product.imageUrl}
                  alt={product.name}
                  className="h-full object-cover"
                />

                <div className="col-span-2 flex flex-col items-start justify-center p-4">
                  <div className="flex grow flex-col justify-center">
                    <CardTitle className="text-lg">{product.name}</CardTitle>
                    <p className="text-muted-foreground">
                      {formatPrice(product.price)}
                    </p>
                  </div>
                  <Button className="w-full" variant="outline">
                    Add to Cart
                    <ShoppingCartIcon className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </Card>
            </Link>
          ))}
      </div>
    </div>
  );
};
