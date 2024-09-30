import { createTRPCRouter, privateProcedure } from "../../trpc";
import { z } from "zod";

const schema = z.object({
  totalPrice: z.number(),
  cartItems: z.array(
    z.object({
      productsId: z.string(),
      name: z.string(),
      price: z.number(),
      salePrice: z.number().nullable(),
      imageUrl: z.string(),
      quantity: z.number(),
    }),
  ),
});

export const orderRouter = createTRPCRouter({
  createOrder: privateProcedure
    .input(schema)
    .mutation(async ({ ctx, input }) => {
      const cart = await ctx.db.cart.findFirstOrThrow({
        where: { userId: ctx.userId },
      });
      const address = await ctx.db.deliveryAddress.findFirstOrThrow({
        where: { userId: ctx.userId },
      });

      const order = await ctx.db.order.create({
        data: {
          userId: ctx.userId,
          totalPrice: input.totalPrice,
          addressId: address.id,
        },
      });

      await Promise.all(
        input.cartItems.map((item) =>
          ctx.db.product.update({
            where: { id: item.productsId },
            data: { stock: { decrement: item.quantity } },
          }),
        ),
      );

      const orderItems = input.cartItems.map((item) => {
        return {
          orderId: order.id,
          productId: item.productsId,
          quantity: item.quantity,
          unitPrice: item.salePrice ?? item.price,
        };
      });

      await ctx.db.cartItem.deleteMany({
        where: { cartId: cart.id },
      });

      await ctx.db.orderItem.createMany({
        data: orderItems,
      });
    }),

  getCurrrentUserOrders: privateProcedure.query(async ({ ctx }) => {
    const orders = await ctx.db.order.findMany({
      where: { userId: ctx.userId },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        status: true,
        createdAt: true,
        totalPrice: true,
        _count: {
          select: { orderItems: true },
        },
        orderItems: {
          select: { quantity: true, product: { select: { name: true } } },
        },
      },
    });

    return orders;
  }),
});
