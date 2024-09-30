import { formatPrettyDate, formatPrettyTime, slugifyString } from "@/helpers";
import Image from "next/image";
import { TagLink } from "../TagLink";
import { cn } from "@/lib/utils";
import IconMenu from "../IconMenu";
import { Calendar, Clock, Package } from "lucide-react";
import CartBtn from "./CartBtn";
import { PriceView } from "./PriceView";
import { type RouterOutputs } from "@/trpc/react";

export const InfoCard = ({
  product,
  hideImageOnMobile = false,
  warningStockLevel,
  lowStockAlertLevel,
}: {
  product: RouterOutputs["public"]["products"]["getOneProduct"] & {
    stock?: number;
    updatedAt?: Date | null;
    createdAt?: Date;
  };
  hideImageOnMobile?: boolean;
  warningStockLevel?: number;
  lowStockAlertLevel?: number;
}) => {
  return (
    <div className="flex grid-cols-5 flex-col gap-8 p-4 py-4 md:grid">
      <div
        className={cn("col-span-2 w-full items-center justify-center md:flex", {
          "hidden md:grid": hideImageOnMobile,
        })}
      >
        <div className="aspect-square">
          <Image
            width={500}
            height={500}
            className="mx-auto rounded-lg object-cover"
            src={product.imageUrl}
            alt={`Cover image of ${product.name}`}
            priority
          />
        </div>
      </div>

      <div className="col-span-3 space-y-4 md:self-center">
        <h1 className="mt-1 block text-2xl font-medium leading-tight sm:text-3xl">
          {product.name}
        </h1>

        <TagLink
          path={`/products?q=${slugifyString(product.category.name)}`}
          label={product.category.name}
        />

        <p className="mt-2 text-base text-muted-foreground sm:text-xl">
          {product.description}
        </p>
        <div className="space-y-4">
          {product.stock && (
            <IconMenu
              icon={Package}
              text={`Stok: ${product.stock}`}
              className={cn("", {
                "font-bold text-destructive":
                  product.stock < (lowStockAlertLevel ?? 0),
                "font-bold text-amber-500":
                  product.stock < (warningStockLevel ?? 0) &&
                  product.stock >= (lowStockAlertLevel ?? 0),
              })}
            />
          )}
          {product.createdAt && (
            <IconMenu
              icon={Calendar}
              text={`Created: ${formatPrettyDate(product.createdAt)} - ${formatPrettyTime(product.createdAt)}`}
              className="cursor-default text-muted-foreground"
            />
          )}
          {product.updatedAt && (
            <IconMenu
              icon={Clock}
              text={`Updated: ${formatPrettyDate(product.updatedAt)} - ${formatPrettyTime(product.updatedAt)}`}
              className="cursor-default text-muted-foreground"
            />
          )}
        </div>
        <div className="flex items-center justify-between">
          <PriceView
            price={product.price}
            salePrice={product.salePrice}
            horizontal
            className="flex-row-reverse"
          />
          {!product.stock && <CartBtn productId={product.id} />}
        </div>
      </div>
    </div>
  );
};
