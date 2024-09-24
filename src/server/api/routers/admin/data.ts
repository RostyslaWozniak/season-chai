import { adminProcedure, createTRPCRouter } from "../../trpc";

export const dataRouter = createTRPCRouter({
  // GET OVERVIEW FOR ADMIN DASHBOARD
  getOverview: adminProcedure.query(async ({ ctx }) => {
    const [
      totalCustomers,
      totalProducts,
      totalOrders,
      minStock,
      maxStock,
      totalStock,
    ] = await Promise.all([
      ctx.db.user.count({
        where: { role: "USER" },
      }),
      ctx.db.product.count(),
      ctx.db.cart.findMany({
        select: {
          cart_items: {
            where: { quantity: { gt: 0 } },
          },
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
      totalOrders: totalOrders.length,
      totalRevenue: 0,
      minStock,
      maxStock,
      totalStock: totalStock._sum.stock ?? 0,
    };
  }),

  // GET SALES DATA
  getSalesData: adminProcedure.query(async () => {
    // moc data ...
    const data = [
      { name: "Sep", sales: 300 },
      { name: "Oct", sales: 500 },
      { name: "Nov", sales: 450 },
      { name: "Dec", sales: 600 },
      { name: "Jan", sales: 550 },
      { name: "Feb", sales: 400 },
      { name: "Mar", sales: 300 },
      { name: "Apr", sales: 450 },
      { name: "May", sales: 600 },
      { name: "Jun", sales: 550 },
      { name: "Jul", sales: 400 },
      { name: "Aug", sales: 400 },
    ];
    return data;
  }),
});
