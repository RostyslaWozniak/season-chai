import { TRPCError } from "@trpc/server";
import { createTRPCRouter, privateProcedure } from "../../trpc";
import { z } from "zod";

export const cartRouter = createTRPCRouter({
  // GET CART ITEMS
  getCartItems: privateProcedure.query(async ({ ctx }) => {
    if (!ctx.userId) return [];
    const data = await ctx.db.cartItem.findMany({
      where: { carts: { userId: ctx.userId }, quantity: { gt: 0 } },
      include: {
        products: {
          select: {
            id: true,
            name: true,
            price: true,
            imageUrl: true,
            salePrice: true,
          },
        },
      },
    });

    if (!data) return [];
    const cartItems = data.map(({ products, quantity }) => {
      return {
        id: products.id,
        productsId: products.id,
        name: products.name,
        price: Number(products.price),
        salePrice: products.salePrice ? Number(products.salePrice) : null,
        imageUrl: products.imageUrl,
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
          carts: { userId: ctx.userId },
          productId: input.id,
          quantity: { gt: 0 },
        },
      });

      if (!cartItem) return 0;

      return cartItem.quantity;
    }),

  // set cart item quantity
  setCartItemQuantity: privateProcedure
    .input(z.object({ id: z.string(), quantity: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const cart = await ctx.db.cart.findFirstOrThrow({
        where: { userId: ctx.userId },
      });

      const cartItem = await ctx.db.cartItem.findFirst({
        where: { cartId: cart.id, productId: input.id },
      });

      if (cartItem) {
        await ctx.db.cartItem.update({
          where: { id: cartItem.id },
          data: { quantity: input.quantity },
        });
      } else {
        await ctx.db.cartItem.create({
          data: {
            cartId: cart.id,
            productId: input.id,
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
        where: { userId: ctx.userId },
      });

      const cartItem = await ctx.db.cartItem.findFirst({
        where: { cartId: cart.id, productId: input.id },
      });
      if (!cartItem) throw new TRPCError({ code: "NOT_FOUND" });

      await ctx.db.cartItem.delete({
        where: { id: cartItem.id },
      });
    }),
});
