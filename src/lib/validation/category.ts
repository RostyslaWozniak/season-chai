import { z } from "zod";

// category
export const createCategorySchema = z.object({
  category: z.string().min(2, {
    message: "Category must be at least 2 characters.",
  }),
});
export type CreateCategorySchema = z.infer<typeof createCategorySchema>;

export const updateCategorySchema = createCategorySchema.extend({
  id: z.string(),
});

export type UpdateCategorySchema = z.infer<typeof updateCategorySchema>;
