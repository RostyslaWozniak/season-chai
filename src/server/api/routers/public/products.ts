import { TRPCError } from "@trpc/server";
import { createTRPCRouter, publicProcedure } from "../../trpc";
import {
  filterOneProductForPublic,
  filterProductsForPublic,
} from "@/server/helpers/public";
import { z } from "zod";

export const productsRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const data = await ctx.db.product.findMany({
      orderBy: { name: "asc" },
      include: { category: { select: { name: true, id: true } } },
    });
    if (!data) throw new TRPCError({ code: "NOT_FOUND" });

    const products = filterProductsForPublic(data);

    return products;
  }),
  getOne: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const data = await ctx.db.product.findUnique({
        where: { id: input.id },
        include: { category: { select: { name: true, id: true } } },
      });
      if (!data) throw new TRPCError({ code: "NOT_FOUND" });

      const product = filterOneProductForPublic(data);

      return product;
    }),

  getRelatedProducts: publicProcedure
    .input(
      z.object({
        categoryId: z.string(),
        take: z.number(),
        id: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const data = await ctx.db.product.findMany({
        where: { category_id: input.categoryId, id: { not: input.id } },
        include: { category: { select: { name: true, id: true } } },
        take: input.take,
      });

      if (!data) return [];
      const products = filterProductsForPublic(data);

      return products;
    }),

  getProductsByCategoryId: publicProcedure
    .input(z.object({ id: z.string(), take: z.number().default(3) }))
    .query(async ({ ctx, input }) => {
      try {
        const data = await ctx.db.product.findMany({
          where: { category_id: input.id },
          include: { category: { select: { name: true, id: true } } },
          take: input.take,
        });
        if (!data) throw new TRPCError({ code: "NOT_FOUND" });

        const products = filterProductsForPublic(data);
        return products;
      } catch (err) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: (err as Error).message,
        });
      }
    }),
  getProductsByCategoryName: publicProcedure
    .input(z.object({ name: z.string(), take: z.number().default(9) }))
    .query(async ({ ctx, input }) => {
      let products = [];
      try {
        products = await ctx.db.product.findMany({
          where: { category: { name: input.name } },
          include: { category: { select: { name: true, id: true } } },
          take: input.take,
        });

        if (!products) throw new TRPCError({ code: "NOT_FOUND" });

        if (input.name === "all")
          products = await ctx.db.product.findMany({
            include: { category: { select: { name: true, id: true } } },
            take: input.take,
          });

        products = filterProductsForPublic(products);

        return products;
      } catch (err) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: (err as Error).message,
        });
      }
    }),
});
