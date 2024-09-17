import { createTRPCRouter, privateProcedure } from "../../trpc";
import { z } from "zod";

export const privateRouter = createTRPCRouter({
  // GET CART ITEMS
  getCartItems: privateProcedure.query(async ({ ctx }) => {
    const data = await ctx.db.cartItem.findMany({
      where: { carts: { user_id: ctx.userId } },
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
        },
      });

      if (!cartItem) return 0;

      return cartItem.quantity;
    }),

  // ADD ONE TO CART
  addToCart: privateProcedure
    .input(z.object({ productId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const cart = await ctx.db.cart.findFirstOrThrow({
        where: { user_id: ctx.userId },
      });

      const cartItem = await ctx.db.cartItem.findFirst({
        where: { cart_id: cart.id, product_id: input.productId },
      });

      if (cartItem) {
        await ctx.db.cartItem.update({
          where: { id: cartItem.id },
          data: { quantity: { increment: 1 } },
        });
      } else {
        await ctx.db.cartItem.create({
          data: { cart_id: cart.id, product_id: input.productId, quantity: 1 },
        });
      }
    }),
  // REMOVE ONE FORM CART
  removeOneFromCart: privateProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const cartItem = await ctx.db.cartItem.findFirst({
        where: {
          carts: { user_id: ctx.userId },
          product_id: input.id,
        },
      });

      if (!cartItem) return null;

      if (cartItem.quantity > 1) {
        await ctx.db.cartItem.update({
          where: { id: cartItem.id },
          data: { quantity: { decrement: 1 } },
        });
      } else {
        await ctx.db.cartItem.delete({ where: { id: cartItem.id } });
      }
    }),
});
