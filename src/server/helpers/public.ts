import { type ProductWithCategory } from "./admin";

export const filterProductsForPublic = (products: ProductWithCategory[]) => {
  return products.map((product) => {
    return {
      id: product.id,
      name: product.name,
      description: product.description,
      imageUrl: product.imageUrl,
      price: Number(product.price),
      salePrice: product.salePrice ? Number(product.salePrice) : null,
      category: { name: product.category.name, slug: product.category.slug },
    };
  });
};

export const filterOneProductForPublic = (product: ProductWithCategory) => {
  return {
    id: product.id,
    name: product.name,
    description: product.description,
    imageUrl: product.imageUrl,
    price: Number(product.price),
    salePrice: product.salePrice ? Number(product.salePrice) : null,
    category: { name: product.category.name, slug: product.category.slug },
  };
};

export type PublicProductWithCategory = ReturnType<
  typeof filterOneProductForPublic
>;
