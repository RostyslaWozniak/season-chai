import {
  adminProductSchema,
  adminCreateProductSchema,
} from "@/lib/validation/product";
import { adminProcedure, createTRPCRouter } from "@/server/api/trpc";
import {
  filterOneProductForAdmin,
  filterProductsForAdmin,
} from "@/server/helpers/admin";
import { TRPCError } from "@trpc/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const adminRouter = createTRPCRouter({
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
      totalStock: totalStock._sum.stock,
    };
  }),

  // CREATE PRODUCT
  createProduct: adminProcedure
    .input(adminCreateProductSchema)
    .mutation(async ({ ctx, input }) => {
      const product = await ctx.db.product.create({
        data: {
          name: input.name,
          description: input.description,
          price: input.price,
          stock: input.stock,
          image_url: input.imageUrl,
          category: input.category,
        },
      });
      revalidatePath("/admin/products");
      return product;
    }),

  // UPDATE PRODUCT
  updateProduct: adminProcedure
    .input(adminProductSchema)
    .mutation(async ({ ctx, input }) => {
      const product = await ctx.db.product.update({
        where: { id: input.id },
        data: {
          name: input.name,
          description: input.description,
          price: input.price,
          stock: input.stock,
          image_url: input.imageUrl,
          category: input.category,
        },
      });

      return product;
    }),

  // DELETE PRODUCT
  deleteProduct: adminProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const product = await ctx.db.product.delete({
        where: { id: input.id },
      });

      if (!product) throw new TRPCError({ code: "NOT_FOUND" });
      revalidatePath("/admin/products");
      return product;
    }),

  // GET ALL PRODUCTS
  getAllProducts: adminProcedure.query(async ({ ctx }) => {
    const data = await ctx.db.product.findMany({
      orderBy: { name: "asc" },
    });

    if (!data) throw new TRPCError({ code: "NOT_FOUND" });

    const products = filterProductsForAdmin(data);

    return products;
  }),

  // GET ONE PRODUCT
  getOneProduct: adminProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const data = await ctx.db.product.findUnique({
        where: { id: input.id },
      });
      if (!data) throw new TRPCError({ code: "NOT_FOUND" });

      const product = filterOneProductForAdmin(data);
      return product;
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

  // GET ALL USERS
  getAllUsers: adminProcedure.query(async ({ ctx }) => {
    const users = await ctx.db.user.findMany({
      select: {
        id: true,
        email: true,
        displayName: true,
        avatarUrl: true,
        createdAt: true,
      },
      where: { role: "USER" },
    });
    return users;
  }),

  // GET ALL IMAGES
  getAllImages: adminProcedure.query(async ({ ctx }) => {
    const images = await ctx.db.product.findMany({
      select: {
        image_url: true,
      },
    });
    return images;
  }),
});
