"use client";

import { ShoppingCart } from "lucide-react";
import React from "react";
import { Button, buttonVariants } from "../ui/button";
import { api } from "@/trpc/react";
import { useSession } from "@/context/SessionProvider";
import Link from "next/link";
import { cn } from "@/lib/utils";

export const AddToCartButton = ({ productId }: { productId: string }) => {
  const { user } = useSession();
  if (!user) {
    return (
      <Link
        href={`/login?redirect=/products/${productId}`}
        className={cn(buttonVariants({ variant: "outline" }))}
      >
        <ShoppingCart className="mr-2 h-4 w-4" />
        Add to Cart
      </Link>
    );
  }
  const {
    data: productQuantity,
    isLoading,
    refetch,
  } = api.private.getQuantityOfCartItem.useQuery({
    id: productId,
  });

  const utils = api.useUtils();

  // ADD TO CART
  const { mutate: addToCart } = api.private.addToCart.useMutation({
    onSuccess: () => {
      void utils.private.getCartItems.invalidate();
      void utils.admin.orders.invalidate();
      void refetch();
    },
  });
  const handleAddToCart = () => {
    addToCart({ productId });
  };

  // REMOVE FROM CART
  const { mutate: removeFromCart } = api.private.removeOneFromCart.useMutation({
    onSuccess: () => {
      void utils.private.getCartItems.invalidate();
      void utils.admin.orders.invalidate();
      void refetch();
    },
  });

  const handleRemoveFromCart = () => {
    removeFromCart({ id: productId });
  };
  return (
    <>
      {!isLoading &&
        (productQuantity ? (
          <div className="flex items-center gap-3 text-xl font-bold">
            <Button onClick={handleRemoveFromCart} variant="outline" size="sm">
              -
            </Button>
            <p>{productQuantity}</p>
            <Button onClick={handleAddToCart} variant="outline" size="sm">
              +
            </Button>
          </div>
        ) : (
          <Button variant="outline" onClick={handleAddToCart}>
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
        ))}
    </>
  );
};
