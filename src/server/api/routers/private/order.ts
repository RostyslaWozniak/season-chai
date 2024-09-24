import { TRPCError } from "@trpc/server";
import { createTRPCRouter, privateProcedure } from "../../trpc";
import { z } from "zod";
import { api } from "@/trpc/server";

export const orderRouter = createTRPCRouter({
  //   createOrder: privateProcedure.query(async ({ ctx }) => {
  //     const cart = await ctx.db.cart.findFirstOrThrow({
  //       where: { user_id: ctx.userId },
  //     });
  //     const cartItems = await ctx.db.cartItem.findMany({
  //       where: { cart_id: cart.id, quantity: { gt: 0 } },
  //     });
  //     const order = await ctx.db.order.create({
  //     })
  //   }),
});
