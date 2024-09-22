"use client";

import { formatPrice } from "@/helpers";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { InfoIcon } from "lucide-react";
import { DropdownWrapper } from "../DropdownWrapper";
import IconMenu from "../IconMenu";
import CartBtn from "./CartBtn";
import { Card, CardTitle } from "../ui/card";
import Image from "next/image";
import { useState } from "react";
import { type RouterOutputs } from "@/trpc/react";
import Link from "next/link";
import { DialogWrapper } from "../DialogWrapper";
import { InfoCard } from "./InfoCard";

type SmallProductCardProps = {
  product: RouterOutputs["public"]["products"]["getRelatedProducts"][number];
};

export const SmallProductCard = ({ product }: SmallProductCardProps) => {
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

      <Card
        className="relative mx-auto grid h-full w-full max-w-[400px] grid-cols-2 overflow-hidden duration-300 hover:shadow-md lg:grid-cols-3"
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
        <div className="absolute right-0 top-1">
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
      </Card>
    </>
  );
};
