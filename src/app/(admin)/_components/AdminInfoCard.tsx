"use client";
import { Calendar, Clock, Package } from "lucide-react";

import {
  formatPrettyDate,
  formatPrettyTime,
  formatPrice,
  slugifyString,
} from "@/helpers";
import IconMenu from "@/components/IconMenu";
import { cn } from "@/lib/utils";
import {
  PRODUCT_STOCK_MIN_THRESHOLD,
  PRODUCT_STOCK_THRESHOLD,
} from "@/helpers/constant";

import Image from "next/image";
import { TagLink } from "@/components/TagLink";
import { type AdminProductWithCategory } from "@/server/helpers/admin";

export const AdminInfoCard = ({
  product,
}: {
  product: AdminProductWithCategory;
}) => {
  return (
    <div className="grid grid-cols-3 gap-8">
      <Image
        width={400}
        height={400}
        className="rounded-lg object-cover shadow-md"
        src={product.image_url}
        alt={`Cover image of ${product.name}`}
      />

      <div className="col-span-2 space-y-4">
        <h1 className="mt-1 block text-2xl font-medium leading-tight">
          {product.name}
        </h1>

        <TagLink
          path={`/products?q=${slugifyString(product.category.name)}`}
          label={product.category.name}
        />

        <p className="mt-2 text-lg text-muted-foreground">
          {product.description}
        </p>
        <div className="text-2xl font-bold text-primary">
          {formatPrice(product.price)}
        </div>

        <IconMenu
          icon={Package}
          text={`Stok: ${product.stock}`}
          className={cn("cursor-default text-muted-foreground", {
            "text-destructive": product.stock < PRODUCT_STOCK_MIN_THRESHOLD,
            "text-amber-500":
              product.stock < PRODUCT_STOCK_THRESHOLD &&
              product.stock >= PRODUCT_STOCK_MIN_THRESHOLD,
          })}
        />
        <IconMenu
          icon={Calendar}
          text={`Created: ${formatPrettyDate(product.createdAt)} - ${formatPrettyTime(product.createdAt)}`}
          className="cursor-default text-muted-foreground"
        />
        <IconMenu
          icon={Clock}
          text={`Updated: ${formatPrettyDate(product.updatedAt)} - ${formatPrettyTime(product.updatedAt)}`}
          className="cursor-default text-muted-foreground"
        />
      </div>
    </div>
  );
};
