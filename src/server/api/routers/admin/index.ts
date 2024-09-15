import { createTRPCRouter } from "@/server/api/trpc";

import { productsRouter } from "./products";
import { categoriesRouter } from "./categories";
import { usersRouter } from "./users";
import { dataRouter } from "./data";
import { imagesRouter } from "./images";

export const adminRouter = createTRPCRouter({
  categories: categoriesRouter,
  data: dataRouter,
  images: imagesRouter,
  products: productsRouter,
  users: usersRouter,
});
