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

export function CartSheet() {
  const { cartItems } = useCart();

  const { user } = useSession();
  if (!user) return null;

  if (!cartItems) return null;

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative rounded-full">
          <ShoppingCart />
          {totalItems > 0 && (
            <span className="absolute -bottom-2 -right-2 aspect-square h-5 rounded-full bg-primary text-primary-foreground">
              {cartItems.length}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="flex w-full flex-col gap-0 p-0 sm:min-w-[500px]"
      >
        <SheetHeader className="my-0 border-b-2 px-0 py-2 sm:p-4">
          <SheetTitle>Your Cart</SheetTitle>
          <SheetDescription>
            You have {cartItems.length} items in your cart.
          </SheetDescription>
        </SheetHeader>
        {cartItems.length === 0 && <EmptyCart />}

        <ScrollArea className="grid grow border-b px-4 pr-10">
          {cartItems.map((product) => (
            <motion.div
              layout
              key={product.id}
              className="flex items-center justify-between overflow-hidden border-b py-4"
            >
              <Image
                width={100}
                height={100}
                src={product.image_url}
                alt={product.name}
                className="mx-auto aspect-square object-cover"
              />

              <div className="flex grow items-end justify-center p-4">
                <div className="flex w-full flex-col items-start justify-between">
                  {product.name}
                  <AddToCartButton productId={product.id} />
                </div>
                <div className="w-full grow text-center text-xl text-muted-foreground">
                  {formatPrice(product.price)}
                </div>

                <RemoveCartItem productId={product.id} />
              </div>
            </motion.div>
          ))}
        </ScrollArea>
        <div className="flex items-center justify-between p-4 md:py-8">
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
