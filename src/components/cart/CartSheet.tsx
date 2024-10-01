"use client";

import { buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
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
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Cross2Icon } from "@radix-ui/react-icons";
import { CartSheetTrigger } from "./CartSheetTrigger";

export function CartSheet() {
  const { cartItems, totalItems, totalPrice } = useCart();

  const { user } = useSession();
  const router = useRouter();

  const searchParams = useSearchParams();
  const isOpen = searchParams.get("cart-open") === "true";
  const q = searchParams.get("q");
  const href = isOpen
    ? q
      ? `?q=${q}&cart-open=false`
      : "?cart-open=false"
    : q
      ? `?q=${q}&cart-open=true`
      : `?cart-open=true`;

  if (!user)
    return (
      <Link
        href="/login"
        className="relative flex flex-col items-center rounded-full p-2 text-gray-600 transition-colors duration-200"
      >
        <motion.div className="flex flex-col items-center">
          <span className="inline-block transform rounded-full border-primary/20 bg-gray-100 p-2 text-gray-800 transition-all duration-200 ease-in-out md:border-[0.5px] md:bg-gray-50">
            <ShoppingCart />
          </span>
          <span className="mt-1 text-center text-xs font-medium md:hidden">
            Cart
          </span>
        </motion.div>
      </Link>
    );

  return (
    <Sheet open={isOpen}>
      <CartSheetTrigger />

      <SheetContent
        side="right"
        className="z-50 flex w-[min(100%,500px)] flex-col gap-0 p-0 pb-20 sm:min-w-[500px] md:pb-0"
      >
        <SheetHeader className="relative my-0 border-b-2 px-0 py-2 sm:p-4">
          <SheetTitle>Your Cart</SheetTitle>
          <SheetDescription>
            You have {cartItems.length} items in your cart.
          </SheetDescription>
          <Link
            href={href}
            className={cn(
              buttonVariants({ variant: "outline", size: "icon" }),
              "absolute right-4 top-4 rounded-sm border opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary",
            )}
          >
            <Cross2Icon className="h-7 w-7 md:h-6 md:w-6" />
            <span className="sr-only">Close</span>
          </Link>
        </SheetHeader>
        {cartItems.length === 0 && <EmptyCart />}

        <ScrollArea className="grid grow px-2 sm:px-4 sm:pr-10">
          {cartItems.map((product) => (
            <motion.div
              layout
              key={product.id}
              className="flex items-center justify-between overflow-hidden border-b py-4"
            >
              <a href={`/products/${product.id}`}>
                <Image
                  width={100}
                  height={100}
                  src={product.imageUrl}
                  alt={product.name}
                  className="mx-auto aspect-square object-cover"
                />
              </a>

              <div className="flex grow flex-col gap-2 p-2 sm:p-4">
                <div>
                  <p>{product.name}</p>
                </div>
                <div>
                  <div className="flex flex-wrap justify-between gap-y-2">
                    <PriceView
                      price={product.price}
                      salePrice={product.salePrice}
                      className="min-w-20 self-end text-xl"
                    />
                    <div className="flex items-center gap-2">
                      <AddToCartButton productId={product.id} />
                      <RemoveCartItem productId={product.id} />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </ScrollArea>
        <div className="relative flex flex-col justify-between p-4 shadow-[0_-14px_10px_-2px_rgba(0,0,0,0.1)] sm:flex-row sm:items-center md:py-8">
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
                onTouchStart={() => router.push("/checkout")}
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
