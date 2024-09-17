"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { formatPrice } from "@/helpers";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import { api } from "@/trpc/react";
import { AddToCartButton } from "@/components/products/AddToCartButton";
import { useSession } from "@/context/SessionProvider";

export function CartSheet() {
  const { user } = useSession();
  if (!user) return null;

  const { data: cartItems } = api.private.getCartItems.useQuery();

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
      <SheetContent side="right" className="flex min-w-[500px] flex-col p-0">
        <SheetHeader className="p-4">
          <SheetTitle>Your Cart</SheetTitle>
          <SheetDescription>
            You have {cartItems.length} items in your cart.
          </SheetDescription>
        </SheetHeader>
        <ScrollArea className="grid grow border-b px-4 pr-10">
          {cartItems.map((product) => (
            <div
              key={product.id}
              className="grid grid-cols-3 overflow-hidden border-b py-4"
            >
              <Image
                width={100}
                height={100}
                src={product.image_url}
                alt={product.name}
                className="mx-auto aspect-square object-cover"
              />

              <div className="col-span-2 flex flex-col items-start justify-center p-4">
                <div className="flex grow flex-col justify-center">
                  <p className="text-lg">{product.name}</p>
                  <p className="text-muted-foreground">
                    {formatPrice(product.price)}
                  </p>
                </div>
                <AddToCartButton productId={product.id} />
              </div>
            </div>
          ))}
        </ScrollArea>
        <div className="flex items-center justify-between px-4 py-8">
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
          <Button className="mt-4">Proceed to Checkout</Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
