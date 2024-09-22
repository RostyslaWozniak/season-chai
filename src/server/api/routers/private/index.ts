import { TRPCError } from "@trpc/server";
import { createTRPCRouter, privateProcedure } from "../../trpc";
import { z } from "zod";

export const privateRouter = createTRPCRouter({
  // GET CART ITEMS
  getCartItems: privateProcedure.query(async ({ ctx }) => {
    if (!ctx.userId) return [];
    const data = await ctx.db.cartItem.findMany({
      where: { carts: { user_id: ctx.userId }, quantity: { gt: 0 } },
      include: {
        products: {
          select: {
            id: true,
            name: true,
            price: true,
            image_url: true,
          },
        },
      },
    });

    if (!data) return [];
    const cartItems = data.map(({ products, quantity }) => {
      return {
        id: products.id,
        name: products.name,
        price: Number(products.price),
        image_url: products.image_url,
        quantity,
      };
    });
    return cartItems;
  }),

  // GET QUANTITY OF CART ITEM
  getQuantityOfCartItem: privateProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const cartItem = await ctx.db.cartItem.findFirst({
        where: {
          carts: { user_id: ctx.userId },
          product_id: input.id,
          quantity: { gt: 0 },
        },
      });

      if (!cartItem) return 0;

      return cartItem.quantity;
    }),

  setCartItemQuantity: privateProcedure
    .input(z.object({ id: z.string(), quantity: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const cart = await ctx.db.cart.findFirstOrThrow({
        where: { user_id: ctx.userId },
      });

      const cartItem = await ctx.db.cartItem.findFirst({
        where: { cart_id: cart.id, product_id: input.id },
      });

      if (cartItem) {
        await ctx.db.cartItem.update({
          where: { id: cartItem.id },
          data: { quantity: input.quantity },
        });
      } else {
        await ctx.db.cartItem.create({
          data: {
            cart_id: cart.id,
            product_id: input.id,
            quantity: input.quantity,
          },
        });
      }
    }),

  // DELETE CART ITEM
  deleteCartItem: privateProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const cart = await ctx.db.cart.findFirstOrThrow({
        where: { user_id: ctx.userId },
      });

      const cartItem = await ctx.db.cartItem.findFirst({
        where: { cart_id: cart.id, product_id: input.id },
      });
      if (!cartItem) throw new TRPCError({ code: "NOT_FOUND" });

      await ctx.db.cartItem.delete({
        where: { id: cartItem.id },
      });
    }),
});
