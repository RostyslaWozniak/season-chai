import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { CATEGORIES } from "@/lib/validation/product";
import {
  filterOneProductForPublic,
  filterProductsForPublic,
} from "@/server/helpers/public";

export const productRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const data = await ctx.db.product.findMany({
      orderBy: { name: "asc" },
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
      });
      if (!data) throw new TRPCError({ code: "NOT_FOUND" });

      const product = filterOneProductForPublic(data);

      return product;
    }),

  getRelatedProducts: publicProcedure
    .input(
      z.object({
        category: z.enum(CATEGORIES),
        take: z.number(),
        id: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const data = await ctx.db.product.findMany({
        where: { category: input.category, id: { not: input.id } },
        take: input.take,
      });

      if (!data) return [];
      const products = filterProductsForPublic(data);

      return products;
    }),

  getProductsByCategory: publicProcedure
    .input(z.object({ category: z.enum(CATEGORIES), take: z.number() }))
    .query(async ({ ctx, input }) => {
      const data = await ctx.db.product.findMany({
        where: { category: input.category },
        take: input.take,
      });
      if (!data) throw new TRPCError({ code: "NOT_FOUND" });
      const products = filterProductsForPublic(data);
      return products;
    }),
});
