import { TRPCError } from "@trpc/server";
import { adminProcedure, createTRPCRouter } from "../../trpc";
import { mainSettingsSchema } from "@/lib/validation/adminSettings";

export const dataRouter = createTRPCRouter({
  // GET OVERVIEW FOR ADMIN DASHBOARD
  getOverview: adminProcedure.query(async ({ ctx }) => {
    const [
      totalCustomers,
      totalProducts,
      totalOrders,
      totalRevenue,
      minStock,
      maxStock,
      totalStock,
    ] = await Promise.all([
      ctx.db.user.count(),
      ctx.db.product.count(),
      ctx.db.order.count(),
      ctx.db.order.aggregate({
        where: {
          createdAt: {
            gte: new Date(new Date().setDate(new Date().getDate() - 30)),
          },
        },
        _sum: {
          totalPrice: true,
        },
      }),
      ctx.db.product.findMany({
        orderBy: { stock: "asc" },
        select: { stock: true, name: true },
        take: 1,
      }),
      ctx.db.product.findMany({
        orderBy: { stock: "desc" },
        select: { stock: true, name: true },
        take: 1,
      }),
      ctx.db.product.aggregate({
        _sum: {
          stock: true,
        },
      }),
    ]);

    return {
      totalCustomers,
      totalProducts,
      totalOrders,
      totalRevenue: Number(totalRevenue._sum.totalPrice) ?? 0,
      minStock,
      maxStock,
      totalStock: totalStock._sum.stock ?? 0,
    };
  }),

  // GET SALES DATA
  getSalesData: adminProcedure.query(async ({ ctx }) => {
    const data = await ctx.db.order.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        createdAt: true,
        totalPrice: true,
      },
    });

    return data.map(({ createdAt, totalPrice }) => {
      return {
        date: new Date(createdAt).toString().split(" ")[1],
        price: Number(totalPrice ?? 0).toFixed(2),
      };
    });
  }),

  getAdminSettings: adminProcedure.query(async ({ ctx }) => {
    const data = await ctx.db.adminSettings.findMany();

    if (!data) throw new TRPCError({ code: "NOT_FOUND" });
    return {
      lowStockAlertLevel: data[0]?.lowStockAlertLevel,
      warningStockLevel: data[0]?.warningStockLevel,
      taxRate: Number(data[0]?.taxRate),
    };
  }),

  updateAdminSettings: adminProcedure
    .input(mainSettingsSchema)
    .mutation(async ({ ctx, input }) => {
      const data = await ctx.db.adminSettings.findMany();
      if (!data) throw new TRPCError({ code: "NOT_FOUND" });
      return ctx.db.adminSettings.update({
        where: { id: data[0]?.id },
        data: input,
      });
    }),
});
