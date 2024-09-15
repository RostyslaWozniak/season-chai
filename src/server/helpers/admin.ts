import { type Product } from "@prisma/client";

export type ProductWithCategory = Product & {
  category: { name: string; id: string };
};

export const filterProductsForAdmin = (products: ProductWithCategory[]) => {
  return products.map((product) => {
    return {
      id: product.id,
      name: product.name,
      description: product.description,
      image_url: product.image_url,
      price: Number(product.price),
      category: { name: product.category.name, id: product.category.id },
      stock: product.stock,
      updatedAt: product.updated_at,
      createdAt: product.created_at,
    };
  });
};

export const filterOneProductForAdmin = (product: ProductWithCategory) => {
  return {
    id: product.id,
    name: product.name,
    description: product.description,
    image_url: product.image_url,
    price: Number(product.price),
    category: { name: product.category.name, id: product.category.id },
    stock: product.stock,
    updatedAt: product.updated_at,
    createdAt: product.created_at,
  };
};

export type AdminProductWithCategory = ReturnType<
  typeof filterOneProductForAdmin
>;
