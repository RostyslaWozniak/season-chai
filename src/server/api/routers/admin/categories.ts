import {
  createCategorySchema,
  updateCategorySchema,
} from "@/lib/validation/category";
import { adminProcedure, createTRPCRouter } from "../../trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const categoriesRouter = createTRPCRouter({
  // GET ALL CATEGORIES
  getAllCategories: adminProcedure.query(async ({ ctx }) => {
    const categories = await ctx.db.category.findMany();

    if (!categories) throw new TRPCError({ code: "NOT_FOUND" });
    return categories;
  }),

  // CREATE CATEGORY
  createCategory: adminProcedure
    .input(createCategorySchema)
    .mutation(async ({ ctx, input }) => {
      const category = await ctx.db.category.create({
        data: {
          name: input.category,
        },
      });

      if (!category) throw new TRPCError({ code: "NOT_FOUND" });

      return category;
    }),
  // UPDATE CATEGORY
  updateCategory: adminProcedure
    .input(updateCategorySchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const category = await ctx.db.category.update({
          where: { id: input.id },
          data: {
            name: input.category,
          },
        });

        if (!category) throw new TRPCError({ code: "NOT_FOUND" });

        return category;
      } catch (error) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: (error as Error).message,
        });
      }
    }),

  // DELETE CATEGORY
  deleteCategory: adminProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const category = await ctx.db.category.delete({
        where: { id: input.id },
      });

      if (!category) throw new TRPCError({ code: "NOT_FOUND" });
    }),
});
