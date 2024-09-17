import { createTRPCRouter } from "@/server/api/trpc";

import { productsRouter } from "./products";
import { categoriesRouter } from "./categories";
import { usersRouter } from "./users";
import { dataRouter } from "./data";
import { imagesRouter } from "./images";
import { ordersRouter } from "./orders";

export const adminRouter = createTRPCRouter({
  categories: categoriesRouter,
  data: dataRouter,
  images: imagesRouter,
  orders: ordersRouter,
  products: productsRouter,
  users: usersRouter,
});
