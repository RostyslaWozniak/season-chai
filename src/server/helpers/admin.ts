import { type Product } from "@prisma/client";

export const filterProductsForAdmin = (products: Product[]) => {
  return products.map((product) => {
    return {
      id: product.id,
      name: product.name,
      description: product.description,
      imageUrl: product.image_url,
      price: Number(product.price),
      category: product.category,
      stock: product.stock,
      updatedAt: product.updated_at,
      createdAt: product.created_at,
    };
  });
};

export const filterOneProductForAdmin = (product: Product) => {
  return {
    id: product.id,
    name: product.name,
    description: product.description,
    imageUrl: product.image_url,
    price: Number(product.price),
    category: product.category,
    stock: product.stock,
    updatedAt: product.updated_at,
    createdAt: product.created_at,
  };
};
