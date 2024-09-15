import { adminProcedure, createTRPCRouter } from "../../trpc";
import {
  adminProductSchema,
  adminCreateProductSchema,
} from "@/lib/validation/product";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import {
  filterOneProductForAdmin,
  filterProductsForAdmin,
} from "@/server/helpers/admin";
export const productsRouter = createTRPCRouter({
  // GET ALL PRODUCTS
  getAllProducts: adminProcedure.query(async ({ ctx }) => {
    const data = await ctx.db.product.findMany({
      orderBy: { name: "asc" },
      include: { category: true },
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
        include: { category: true },
      });
      if (!data) throw new TRPCError({ code: "NOT_FOUND" });

      const product = filterOneProductForAdmin(data);
      return product;
    }),
  // CREATE PRODUCT
  createProduct: adminProcedure
    .input(adminCreateProductSchema)
    .mutation(async ({ ctx, input }) => {
      const category = await ctx.db.category.findUnique({
        where: { name: input.category },
        select: { id: true },
      });

      if (!category)
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Category not found",
        });

      const product = await ctx.db.product.create({
        data: {
          name: input.name,
          description: input.description,
          price: input.price,
          stock: input.stock,
          image_url: input.image_url,
          category_id: category.id,
        },
      });

      return product;
    }),
  // UPDATE PRODUCT
  updateProduct: adminProcedure
    .input(adminProductSchema)
    .mutation(async ({ ctx, input }) => {
      const category = await ctx.db.category.findUnique({
        where: { name: input.category },
        select: { id: true },
      });

      if (!category)
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Category not found",
        });

      const product = await ctx.db.product.update({
        where: { id: input.id },
        data: {
          name: input.name,
          description: input.description,
          price: input.price,
          stock: input.stock,
          image_url: input.image_url,
          category_id: category.id,
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
      return product;
    }),

  // GET PRODUCTS BY CATEGORY ID
  getProductsByCategoryId: adminProcedure
    .input(z.object({ id: z.string(), take: z.number().default(3) }))
    .query(async ({ ctx, input }) => {
      const products = await ctx.db.product.findMany({
        where: { category_id: input.id },
        take: input.take,
      });
      if (!products) throw new TRPCError({ code: "NOT_FOUND" });
      return products;
    }),
});
