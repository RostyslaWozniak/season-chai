"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { formatPrice } from "@/helpers";
import { DropdownWrapper } from "@/components/DropdownWrapper";
import IconMenu from "@/components/IconMenu";
import { InfoIcon, ShoppingCart } from "lucide-react";
import { type PublicProduct } from "@/types";
import { DialogWrapper } from "../DialogWrapper";
import { InfoCard } from "./InfoCard";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { categoryToClient, categoryToSlug } from "@/helpers/category";
import { TagLink } from "../TagLink";

type ProductCardProps = {
  product: PublicProduct;
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
            src={product.imageUrl}
            alt={product.name}
            className="aspect-square w-full object-cover"
          />
          <TagLink
            path={`/products?q=${categoryToSlug(product.category)}`}
            label={categoryToClient(product.category)}
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
        <CardFooter className="flex items-center justify-between p-4">
          <span className="text-lg font-bold">
            {formatPrice(product.price)}
          </span>

          <Button variant="outline" size="sm">
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};
