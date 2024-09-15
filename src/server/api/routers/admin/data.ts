import { adminProcedure, createTRPCRouter } from "../../trpc";

export const dataRouter = createTRPCRouter({
  // GET OVERVIEW FOR ADMIN DASHBOARD
  getOverview: adminProcedure.query(async ({ ctx }) => {
    const totalCustomers = await ctx.db.user.count({
      where: { role: "USER" },
    });
    const totalProducts = await ctx.db.product.count();

    const totalOrders = 0;

    const totalRevenue = 0;

    const minStock = await ctx.db.product.findMany({
      orderBy: { stock: "asc" },
      select: { stock: true, name: true },
      take: 1,
    });
    const maxStock = await ctx.db.product.findMany({
      orderBy: { stock: "desc" },
      select: { stock: true, name: true },
      take: 1,
    });

    const totalStock = await ctx.db.product.aggregate({
      _sum: {
        stock: true,
      },
    });

    return {
      totalCustomers,
      totalProducts,
      totalOrders,
      totalRevenue,
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
