import { TRPCError } from "@trpc/server";
import { createTRPCRouter, publicProcedure } from "../../trpc";

export const categoriesRouter = createTRPCRouter({
  // GET ALL CATEGORIES
  getAllCategories: publicProcedure.query(async ({ ctx }) => {
    const categories = await ctx.db.category.findMany();

    if (!categories) throw new TRPCError({ code: "NOT_FOUND" });

    return categories;
  }),
});
