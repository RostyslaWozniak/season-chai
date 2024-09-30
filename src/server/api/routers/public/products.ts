import { TRPCError } from "@trpc/server";
import { createTRPCRouter, publicProcedure } from "../../trpc";
import {
  filterOneProductForPublic,
  filterProductsForPublic,
} from "@/server/helpers/public";
import { z } from "zod";

export const productsRouter = createTRPCRouter({
  getAllProducts: publicProcedure.query(async ({ ctx }) => {
    const data = await ctx.db.product.findMany({
      where: { stock: { gt: 0 } },
      orderBy: { name: "asc" },
      include: { category: { select: { name: true, slug: true } } },
    });
    if (!data) throw new TRPCError({ code: "NOT_FOUND" });

    const products = filterProductsForPublic(data);

    return products;
  }),

  getAllProductsWithPagination: publicProcedure
    .input(
      z.object({ take: z.number().default(9), skip: z.number().default(0) }),
    )
    .query(async ({ ctx, input }) => {
      const data = await ctx.db.product.findMany({
        where: { stock: { gt: 0 } },
        orderBy: { name: "asc" },
        include: { category: { select: { name: true, slug: true } } },
        take: input.take,
        skip: input.skip,
      });
      if (!data) throw new TRPCError({ code: "NOT_FOUND" });

      const products = filterProductsForPublic(data);

      return products;
    }),

  getOneProduct: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const data = await ctx.db.product.findUnique({
        where: { id: input.id, stock: { gt: 0 } },
        include: { category: { select: { name: true, slug: true } } },
      });
      if (!data) throw new TRPCError({ code: "NOT_FOUND" });

      const product = filterOneProductForPublic(data);

      return product;
    }),

  // GET PRODUCTS BY CATEGORY SLUG
  getProductsByCategorySlug: publicProcedure
    .input(
      z.object({
        slug: z.string(),
        take: z.number().default(9),
        skip: z.number().default(0),
      }),
    )
    .query(async ({ ctx, input }) => {
      const data = await ctx.db.product.findMany({
        where: { category: { slug: input.slug }, stock: { gt: 0 } },
        include: { category: { select: { name: true, slug: true } } },
        take: input.take,
        skip: input.skip,
      });
      if (!data) throw new TRPCError({ code: "NOT_FOUND" });
      const products = filterProductsForPublic(data);
      return products;
    }),

  // GET MOST POPULAR PRODUCTS
  getPopularProducts: publicProcedure
    .input(
      z.object({ take: z.number().default(3), skip: z.number().default(0) }),
    )
    .query(async ({ ctx, input }) => {
      const data = await ctx.db.product.findMany({
        where: { stock: { gt: 0 } },
        orderBy: { order_items: { _count: "desc" } },
        include: { category: { select: { name: true, slug: true } } },
        take: input.take,
        skip: input.skip,
      });
      if (!data) throw new TRPCError({ code: "NOT_FOUND" });
      const products = filterProductsForPublic(data);
      return products;
    }),

  // GET NEWEST PRODUCTS
  getNewestProducts: publicProcedure
    .input(z.object({ take: z.number().default(3) }))
    .query(async ({ ctx, input }) => {
      const data = await ctx.db.product.findMany({
        where: { stock: { gt: 0 } },
        orderBy: { createdAt: "desc" },
        include: { category: { select: { name: true, slug: true } } },
        take: input.take,
      });
      if (!data) throw new TRPCError({ code: "NOT_FOUND" });
      const products = filterProductsForPublic(data);
      return products;
    }),
});
