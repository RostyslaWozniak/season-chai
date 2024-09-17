"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { formatPrice, slugifyString } from "@/helpers";
import { DropdownWrapper } from "@/components/DropdownWrapper";
import IconMenu from "@/components/IconMenu";
import { InfoIcon } from "lucide-react";
import { DialogWrapper } from "../DialogWrapper";
import { InfoCard } from "./InfoCard";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { TagLink } from "../TagLink";
import { type PublicProductWithCategory } from "@/server/helpers/public";
import { AddToCartButton } from "./AddToCartButton";

type ProductCardProps = {
  product: PublicProductWithCategory;
};

export const ProductCard = ({ product }: ProductCardProps) => {
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  return (
    <>
      <DialogWrapper
        title="Info About Product"
        description="Here you can find more information about the product."
        isOpen={isInfoOpen}
        setIsOpen={setIsInfoOpen}
        className="flex w-[800px] flex-col gap-3"
      >
        <InfoCard product={product} />
      </DialogWrapper>

      <Card className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg">
        <CardHeader className="relative p-0">
          <Image
            width={400}
            height={400}
            src={product.image_url}
            alt={product.name}
            className="aspect-square w-full object-cover"
          />
          <TagLink
            path={`/products?q=${slugifyString(product.category.name)}`}
            label={product.category.name}
            className="absolute left-2 top-2"
          />
          <div className="absolute right-2 top-2">
            <DropdownWrapper vertical className="w-min">
              <DropdownMenuItem onClick={() => setIsInfoOpen(true)}>
                <IconMenu
                  icon={InfoIcon}
                  text="More Information"
                  className="text-nowrap text-muted-foreground"
                />
              </DropdownMenuItem>
            </DropdownWrapper>
          </div>
        </CardHeader>
        <Link key={product.id} href={`/products/${product.id}`}>
          <CardContent className="grow border-b border-t p-4">
            <h2 className="text-xl font-semibold capitalize">{product.name}</h2>

            <p className="line-clamp-2 overflow-hidden text-ellipsis text-muted-foreground">
              {product.description}
            </p>
          </CardContent>
        </Link>
        <CardFooter className="flex h-14 items-center justify-between px-4 py-0">
          <span className="text-lg font-bold">
            {formatPrice(product.price)}
          </span>

          <AddToCartButton productId={product.id} />
        </CardFooter>
      </Card>
    </>
  );
};
