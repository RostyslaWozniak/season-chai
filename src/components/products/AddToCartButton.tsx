"use client";

import { ShoppingCart } from "lucide-react";

import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import { useCart } from "@/context/CartContext";
import { useDebounce } from "@/hooks/use-debounce";
import { useEffect } from "react";
import { api } from "@/trpc/react";

export const AddToCartButton = ({ productId }: { productId: string }) => {
  const { mutate } = api.private.setCartItemQuantity.useMutation();

  const {
    isLoadingCartItems,
    handleRemoveOneFromCart,
    handleAddOneToCart,
    cartItems,
  } = useCart();

  const clientQuantity = cartItems?.find(
    (item) => item.id === productId,
  )?.quantity;

  const debouncedQuantity = useDebounce(clientQuantity, 500);

  useEffect(() => {
    if (debouncedQuantity === undefined) return;
    mutate({ id: productId ?? "", quantity: debouncedQuantity ?? 0 });
  }, [debouncedQuantity, mutate, productId]);

  return (
    <div>
      {!isLoadingCartItems ? (
        clientQuantity ? (
          <div className="flex items-center gap-3 text-2xl font-bold">
            <Button
              onClick={() => handleRemoveOneFromCart(productId)}
              variant="outline"
              size="sm"
            >
              -
            </Button>
            <p className="min-w-8 text-center">{clientQuantity}</p>
            <Button
              onClick={() => handleAddOneToCart(productId)}
              variant="outline"
              size="sm"
            >
              +
            </Button>
          </div>
        ) : (
          <Button
            variant="outline"
            onClick={() => handleAddOneToCart(productId)}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
        )
      ) : (
        <Skeleton className="h-8 w-32" />
      )}
    </div>
  );
};
