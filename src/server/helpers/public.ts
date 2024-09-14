import { type Product } from "@prisma/client";

export const filterProductsForPublic = (products: Product[]) => {
  return products.map((product) => {
    return {
      id: product.id,
      name: product.name,
      description: product.description,
      imageUrl: product.image_url,
      price: Number(product.price),
      category: product.category,
    };
  });
};

export const filterOneProductForPublic = (product: Product) => {
  return {
    id: product.id,
    name: product.name,
    description: product.description,
    imageUrl: product.image_url,
    price: Number(product.price),
    category: product.category,
  };
};
