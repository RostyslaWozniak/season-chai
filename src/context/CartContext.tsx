"use client";
import { api } from "@/trpc/react";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useSession } from "./SessionProvider";

interface CartContext {
  cartItems: CartItem[] | undefined;
  isLoadingCartItems: boolean;
  handleAddOneToCart: (id: string) => void;
  handleRemoveOneFromCart: (id: string) => void;
  handleRemoveCartItem: (id: string) => void;
}
type CartItem = {
  id: string;
  name: string;
  price: number;
  image_url: string;
  quantity: number;
};

type Product = {
  id: string;
  name: string;
  description: string | null;
  image_url: string;
  price: number;
  category: {
    name: string;
    id: string;
  };
};

const CartContext = createContext<CartContext | null>(null);

export default function CartProvider({ children }: React.PropsWithChildren) {
  const [cartItems, setCartItems] = useState<CartItem[] | undefined>([]);
  const [products, setProducts] = useState<Product[] | undefined>([]);

  const { user } = useSession();

  const { data: serverProducts } = api.public.products.getAll.useQuery(
    undefined,
    {
      enabled: !!user,
    },
  );

  const { data: serverCartItems, isLoading: isLoadingCartItems } =
    api.private.getCartItems.useQuery(undefined, {
      enabled: !!user,
    });

  const { mutate: deleteCartItem } = api.private.deleteCartItem.useMutation();

  const handleAddOneToCart = (productId: string) => {
    if (!cartItems?.find((item) => item.id === productId)) {
      const newProduct = products?.find((item) => item.id === productId);

      setCartItems((prev) => {
        return [
          {
            id: newProduct?.id,
            name: newProduct?.name,
            price: newProduct?.price,
            image_url: newProduct?.image_url,
            quantity: 1,
          },
          ...(prev ?? []),
        ] as CartItem[];
      });
    } else {
      setCartItems((prev) => {
        return prev?.map((item) =>
          item.id === productId
            ? { ...item, quantity: (item.quantity ?? 0) + 1 }
            : item,
        );
      });
    }
  };

  const handleRemoveOneFromCart = (id: string) => {
    const item = cartItems?.find((item) => item.id === id);
    // delete cart item when quantity is less than 1
    if ((item?.quantity ?? 0) - 1 < 1) {
      deleteCartItem({ id });
    }
    setCartItems((prev) => {
      const newItems = prev?.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
      );
      return newItems?.filter((item) => item.quantity);
    });
  };

  const handleRemoveCartItem = (id: string) => {
    setCartItems((prev) => {
      return prev?.filter((item) => item.id !== id);
    });
    deleteCartItem({ id });
  };

  useEffect(() => {
    setCartItems(serverCartItems);
  }, [serverCartItems]);
  useEffect(() => {
    setProducts(serverProducts);
  }, [serverProducts]);

  return (
    <CartContext.Provider
      value={{
        isLoadingCartItems,
        cartItems,
        handleRemoveOneFromCart,
        handleAddOneToCart,
        handleRemoveCartItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
