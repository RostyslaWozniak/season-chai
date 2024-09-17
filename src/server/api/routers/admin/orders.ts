import { adminProcedure, createTRPCRouter } from "../../trpc";

export const ordersRouter = createTRPCRouter({
  // GET ALL IMAGES
  getAllCarts: adminProcedure.query(async ({ ctx }) => {
    const carts = await ctx.db.cart.findMany({
      select: {
        id: true,
        users: true,
        created_at: true,
        _count: {
          select: { cart_items: true },
        },
        cart_items: {
          select: { quantity: true, products: { select: { price: true } } },
        },
      },
    });

    return carts;
  }),
});
