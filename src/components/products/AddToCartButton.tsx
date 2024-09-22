"use client";

import { useEffect } from "react";
import { api } from "@/trpc/react";
import { useDebounce } from "@/hooks/use-debounce";
import { useCart } from "@/context/CartContext";
import { Button } from "../ui/button";
import { Minus, Plus, ShoppingCart } from "lucide-react";

export const AddToCartButton = ({ productId }: { productId: string }) => {
  const { mutate: setCartItemQuantity } =
    api.private.setCartItemQuantity.useMutation();

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
    setCartItemQuantity({ id: productId, quantity: debouncedQuantity });
  }, [debouncedQuantity, setCartItemQuantity, productId]);

  return (
    <>
      {!isLoadingCartItems ? (
        clientQuantity ? (
          <div className="flex items-center gap-3 text-2xl font-bold">
            <Button
              onClick={() => handleRemoveOneFromCart(productId)}
              variant="outline"
              className="p-2 active:scale-105"
              size="lg"
            >
              <Minus className="aspect-square w-6" />
            </Button>
            <p className="min-w-8 text-center">{clientQuantity}</p>
            <Button
              onClick={() => handleAddOneToCart(productId)}
              variant="outline"
              className="p-2 active:scale-105"
              size="lg"
            >
              <Plus className="aspect-square w-6" />
            </Button>
          </div>
        ) : (
          <Button
            variant="outline"
            onClick={() => handleAddOneToCart(productId)}
            size="lg"
            className="active:scale-105"
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
        )
      ) : null}
    </>
  );
};
