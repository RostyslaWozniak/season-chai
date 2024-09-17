"use client";
import { formatPrice, slugifyString } from "@/helpers";
import Image from "next/image";
import { TagLink } from "../TagLink";
import { type PublicProductWithCategory } from "@/server/helpers/public";
import { AddToCartButton } from "./AddToCartButton";

export const InfoCard = ({
  product,
}: {
  product: PublicProductWithCategory;
}) => {
  return (
    <div className="grid grid-cols-5 gap-8 py-4">
      <div className="col-span-2 flex aspect-square w-full items-center justify-center">
        <Image
          width={500}
          height={500}
          className="rounded-lg object-cover"
          src={product.image_url ?? ""}
          alt={`Cover image of ${product.name}`}
        />
      </div>

      <div className="col-span-3 space-y-4 self-center">
        <h1 className="mt-1 block text-3xl font-medium leading-tight">
          {product.name}
        </h1>

        <TagLink
          path={`/products?q=${slugifyString(product.category.name)}`}
          label={product.category.name}
        />

        <p className="mt-2 text-xl text-muted-foreground">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <p className="text-2xl font-bold text-primary">
            {formatPrice(product.price)}
          </p>
          <AddToCartButton productId={product.id} />
        </div>
      </div>
    </div>
  );
};
