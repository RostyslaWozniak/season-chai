"use client";

import CartBtn from "./CartBtn";
import { Card, CardTitle } from "../ui/card";
import Image from "next/image";
import { useState } from "react";
import { type RouterOutputs } from "@/trpc/react";
import Link from "next/link";
import { DialogWrapper } from "../DialogWrapper";
import { InfoCard } from "./InfoCard";
import { PriceView } from "./PriceView";
import { Button } from "../ui/button";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { TooltipWrapper } from "../TooltipWrapper";
import { Info } from "lucide-react";

type SmallProductCardProps = {
  product: RouterOutputs["public"]["products"]["getProductsByCategorySlug"][number];
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
        className="relative mx-auto flex h-full w-full max-w-[450px] overflow-hidden duration-300 hover:shadow-md"
        key={product.id}
      >
        <div className="relative h-32 min-h-32 w-32 min-w-32">
          <Link key={product.id} href={`/products/${product.id}`}>
            <Image
              width={150}
              height={150}
              src={product.imageUrl}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </Link>
        </div>
        <div className="group flex flex-col justify-center gap-3 p-2 sm:p-4">
          <Link key={product.id} href={`/products/${product.id}`}>
            <div className="flex grow flex-col justify-center">
              <CardTitle className="pr-4 text-xl md:group-hover:underline">
                {product.name}
              </CardTitle>
              <PriceView
                price={product.price}
                salePrice={product.salePrice}
                horizontal
                className="text-base"
              />
            </div>
          </Link>
          <div className="">
            <CartBtn productId={product.id} />
          </div>
        </div>
        <TooltipWrapper
          label={`Info About Product`}
          icon={Info}
          className="hidden md:flex"
        >
          <Button
            size="icon"
            variant="ghost"
            className="absolute right-1 top-1 grid h-8 w-8 place-items-center"
            onClick={() => setIsInfoOpen(true)}
          >
            <DotsVerticalIcon className="h-5 w-5" />
          </Button>
        </TooltipWrapper>
      </Card>
    </>
  );
};
