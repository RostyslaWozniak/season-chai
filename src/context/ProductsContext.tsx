"use client";
import { api, type RouterOutputs } from "@/trpc/react";

import { createContext, useContext, useEffect, useState } from "react";
import { type Category } from "@prisma/client";

type Product = RouterOutputs["public"]["products"]["getAllProducts"][number];

type ProductsContext = {
  products: Product[];
  categories: Category[];
  productsPending: boolean;
  categoriesPending: boolean;
};

const ProductsContext = createContext<ProductsContext | null>(null);

export default function ProductsProvider({
  children,
}: React.PropsWithChildren) {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const { data: serverProducts, isPending: productsPending } =
    api.public.products.getAllProducts.useQuery();
  const { data: serverCategories, isPending: categoriesPending } =
    api.public.categories.getAllCategories.useQuery();

  useEffect(() => {
    setProducts(serverProducts ?? []);
  }, [serverProducts]);
  useEffect(() => {
    setCategories(serverCategories ?? []);
  }, [serverCategories]);

  return (
    <ProductsContext.Provider
      value={{
        products,
        categories,
        productsPending,
        categoriesPending,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductsProvider");
  }
  return context;
}
