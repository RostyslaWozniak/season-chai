"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import IconMenu from "@/components/IconMenu";
import { DialogWrapper } from "../DialogWrapper";
import { InfoCard } from "./InfoCard";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { TagLink } from "../TagLink";
import CartBtn from "./CartBtn";
import { PriceView } from "./PriceView";
import { type RouterOutputs } from "@/trpc/react";
import { DotsVerticalIcon } from "@radix-ui/react-icons";

type ProductCardProps = {
  product: RouterOutputs["public"]["products"]["getOneProduct"];
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
        <InfoCard product={product} hideImageOnMobile />
      </DialogWrapper>

      <Card className="relative flex h-full flex-col overflow-hidden transition-all duration-300 hover:shadow-lg">
        <TagLink
          path={`/products?q=${product.category.slug}`}
          label={product.category.name}
          className="absolute left-2 top-2"
        />
        <CardHeader className="p-0">
          <Link
            key={product.id}
            href={`/products/${product.id}`}
            className="flex h-full"
          >
            <Image
              width={400}
              height={400}
              src={product.imageUrl}
              alt={product.name}
              className="aspect-square h-full w-full object-cover"
            />
          </Link>
        </CardHeader>
        <CardContent className="relative grow border-t py-2">
          <Link
            key={product.id}
            href={`/products/${product.id}`}
            className="group flex h-full flex-col"
          >
            <h2 className="text-xl font-semibold capitalize group-hover:underline">
              {product.name}
            </h2>

            <p className="line-clamp-2 overflow-hidden text-ellipsis text-muted-foreground">
              {product.description}
            </p>
          </Link>
          <div
            className="absolute right-0 top-3"
            onClick={() => setIsInfoOpen(true)}
          >
            <IconMenu
              icon={DotsVerticalIcon}
              className="scale-[1.3] text-nowrap"
              iconSize={80}
            />
            {/* <DropdownWrapper vertical className="w-min">
              <DropdownMenuItem onClick={() => setIsInfoOpen(true)}>
                <IconMenu
                  icon={InfoIcon}
                  text="More Information"
                  className="text-nowrap text-muted-foreground"
                />
              </DropdownMenuItem>
            </DropdownWrapper> */}
          </div>
        </CardContent>

        <CardFooter className="flex min-h-14 items-center justify-between border-t px-4 py-1">
          <div className="">
            <PriceView
              price={product.price}
              salePrice={product.salePrice}
              horizontal
            />
          </div>

          <CartBtn productId={product.id} />
        </CardFooter>
      </Card>
    </>
  );
};
