"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { formatPrice } from "@/helpers";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import { AddToCartButton } from "@/components/products/AddToCartButton";
import { useSession } from "@/context/SessionProvider";
import { useCart } from "@/context/CartContext";
import { motion } from "framer-motion";
import { EmptyCart } from "./EmptyCart";
import { cn } from "@/lib/utils";
import { RemoveCartItem } from "./RemoveCartItem";
import { PriceView } from "../products/PriceView";

export function CartSheet() {
  const { cartItems, totalItems, totalPrice } = useCart();

  const { user } = useSession();
  if (!user) return null;

  if (!cartItems) return null;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative rounded-full">
          <motion.div
            key={
              cartItems.reduce((sum, item) => sum + item.quantity, 0) + 1 * 10
            }
            initial={cartItems.length > 0}
            animate={{ rotate: [0, -5, 5, -5, 5, 0] }}
          >
            <ShoppingCart />
          </motion.div>
          {totalItems > 0 && (
            <motion.span
              key={cartItems.length + 1}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute -bottom-2 -right-2 aspect-square h-5 rounded-full bg-primary text-primary-foreground"
            >
              {cartItems.length}
            </motion.span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="flex w-[min(100%,500px)] flex-col gap-0 p-0 sm:min-w-[500px]"
      >
        <SheetHeader className="my-0 border-b-2 px-0 py-2 sm:p-4">
          <SheetTitle>Your Cart</SheetTitle>
          <SheetDescription>
            You have {cartItems.length} items in your cart.
          </SheetDescription>
        </SheetHeader>
        {cartItems.length === 0 && <EmptyCart />}

        <ScrollArea className="grid grow border-b sm:px-4 sm:pr-10">
          {cartItems.map((product) => (
            <motion.div
              layout
              key={product.id}
              className="flex items-center justify-between overflow-hidden border-b py-4"
            >
              <Image
                width={100}
                height={100}
                src={product.imageUrl}
                alt={product.name}
                className="mx-auto aspect-square object-cover"
              />

              <div className="flex grow gap-2 p-2 sm:p-4">
                <div className="flex w-full flex-col items-start justify-between">
                  <div className="">{product.name}</div>
                  <AddToCartButton productId={product.id} />
                </div>
                <div className="flex w-full grow flex-wrap items-center justify-between">
                  <PriceView
                    price={product.price}
                    salePrice={product.salePrice}
                    className="min-w-20 self-end text-xl"
                  />
                  <div className="self-end">
                    <RemoveCartItem productId={product.id} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </ScrollArea>
        <div className="flex flex-col justify-between p-4 sm:flex-row sm:items-center md:py-8">
          <div>
            <p className="text-xl">
              {"Total Price: "}

              <span className="font-bold text-primary">
                {formatPrice(totalPrice)}
              </span>
            </p>
            <p className="text-lg">
              Total Items: <span className="font-semibold">{totalItems}</span>
            </p>
          </div>
          {cartItems.length > 0 && (
            <SheetClose asChild>
              <a
                href="/checkout"
                className={cn(
                  buttonVariants({ variant: "default", size: "lg" }),
                  "mt-4",
                )}
              >
                Proceed to Checkout
              </a>
            </SheetClose>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
