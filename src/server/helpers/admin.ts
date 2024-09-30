import { type Product } from "@prisma/client";

export type ProductWithCategory = Product & {
  category: { name: string; slug: string };
};

export const filterProductsForAdmin = (products: ProductWithCategory[]) => {
  return products.map((product) => {
    return {
      id: product.id,
      name: product.name,
      description: product.description,
      imageUrl: product.imageUrl,
      price: Number(product.price),
      salePrice: product.salePrice ? Number(product.salePrice) : null,
      category: { name: product.category.name, slug: product.category.slug },
      stock: product.stock,
      updatedAt: product.updatedAt,
      createdAt: product.createdAt,
    };
  });
};

export const filterOneProductForAdmin = (product: ProductWithCategory) => {
  return {
    id: product.id,
    name: product.name,
    description: product.description,
    imageUrl: product.imageUrl,
    price: Number(product.price),
    salePrice: product.salePrice ? Number(product.salePrice) : null,
    category: { name: product.category.name, slug: product.category.slug },
    stock: product.stock,
    updatedAt: product.updatedAt,
    createdAt: product.createdAt,
  };
};

export type AdminProductWithCategory = ReturnType<
  typeof filterOneProductForAdmin
>;
