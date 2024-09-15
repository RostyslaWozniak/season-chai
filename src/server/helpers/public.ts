import { type Product } from "@prisma/client";
import { ProductWithCategory } from "./admin";

export const filterProductsForPublic = (products: ProductWithCategory[]) => {
  return products.map((product) => {
    return {
      id: product.id,
      name: product.name,
      description: product.description,
      image_url: product.image_url,
      price: Number(product.price),
      category: { name: product.category.name, id: product.category.id },
    };
  });
};

export const filterOneProductForPublic = (product: ProductWithCategory) => {
  return {
    id: product.id,
    name: product.name,
    description: product.description,
    image_url: product.image_url,
    price: Number(product.price),
    category: { name: product.category.name, id: product.category.id },
  };
};

export type PublicProductWithCategory = ReturnType<
  typeof filterOneProductForPublic
>;
