import { createTRPCRouter } from "../../trpc";
import { orderRouter } from "./order";
import { cartRouter } from "./cart";
import { dataRouter } from "./data";

export const privateRouter = createTRPCRouter({
  cart: cartRouter,
  data: dataRouter,
  order: orderRouter,
});
