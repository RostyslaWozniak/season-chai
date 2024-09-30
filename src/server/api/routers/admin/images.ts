import { adminProcedure, createTRPCRouter } from "../../trpc";

export const imagesRouter = createTRPCRouter({
  // GET ALL IMAGES
  getAllImages: adminProcedure.query(async ({ ctx }) => {
    const images = await ctx.db.product.findMany({
      select: {
        imageUrl: true,
      },
    });
    return images;
  }),
});
