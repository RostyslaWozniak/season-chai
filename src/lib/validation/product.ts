import { z } from "zod";

export const CATEGORIES = [
  "BLACK_TEA",
  "GREEN_TEA",
  "WHITE_TEA",
  "ACCESSORIES",
  "MERCH",
] as const;

export type Category = (typeof CATEGORIES)[number];

export const publicProductSchema = z.object({
  name: z.string().min(1, "Name is required!"),
  description: z.string().max(500, "Maximum 500 characters!"),
  price: z.coerce
    .number({ message: "Price must be a number! Example: 9.99" })
    .min(1, "Price is required!"),
  imageUrl: z.string().min(1, "Image is required!"),
  category: z.enum(CATEGORIES, { errorMap: () => ({ message: "Required!" }) }),
});

export type PublicProductSchema = z.infer<typeof publicProductSchema>;

export const adminCreateProductSchema = publicProductSchema.extend({
  stock: z.coerce
    .number({ message: "Price must be a number!" })
    .min(1, "Required!"),
});

export type AdminCreateProductSchema = z.infer<typeof adminCreateProductSchema>;

export const adminProductSchema = adminCreateProductSchema.extend({
  id: z.string(),
});

export type AdminProductSchema = z.infer<typeof adminProductSchema>;
