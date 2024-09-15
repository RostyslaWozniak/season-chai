import { createTRPCRouter } from "@/server/api/trpc";
import { productsRouter } from "./products";
import { categoriesRouter } from "./categories";

export const publicRouter = createTRPCRouter({
  categories: categoriesRouter,
  products: productsRouter,
});
