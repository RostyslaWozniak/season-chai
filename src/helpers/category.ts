import { type Category } from "@prisma/client";

export const categoryToClient = (category: string) => {
  return category.replace("_", " ").toLowerCase();
};

// export const categoryToDb = (category: string) => {};

export const categoryToSlug = (category: string) => {
  return category.toLowerCase().replace("_", "-");
};

export const slugToCategory = (slug: string) => {
  return slug.toUpperCase().replace("-", "_") as Category;
};
