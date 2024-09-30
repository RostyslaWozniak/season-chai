import { adminProcedure, createTRPCRouter } from "../../trpc";

export const ordersRouter = createTRPCRouter({
  getAllCarts: adminProcedure.query(async ({ ctx }) => {
    const carts = await ctx.db.cart.findMany({
      select: {
        id: true,
        users: true,
        createdAt: true,
        _count: {
          select: { cart_items: true },
        },
        cart_items: {
          select: {
            quantity: true,
            products: { select: { price: true, salePrice: true } },
          },
        },
      },
    });

    return carts;
  }),

  getAllOrders: adminProcedure.query(async ({ ctx }) => {
    const orders = await ctx.db.order.findMany({
      select: {
        id: true,
        user: { select: { username: true, email: true } },
        createdAt: true,
        _count: {
          select: { orderItems: true },
        },
        orderItems: {
          select: { quantity: true, product: true },
        },
        totalPrice: true,
        status: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return orders;
  }),
});
