import { validateRequest } from "@/lib/auth";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const fileRouter = {
  productImage: f({ image: { maxFileSize: "512KB" } })
    .middleware(async () => {
      const { user } = await validateRequest();

      if (user?.role !== "ADMIN") throw new Error("Unauthorized");

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { id: user.id };
    })
    .onUploadComplete(async ({ file }) => {
      const newImageUrl = file.url.replace(
        "/f/",
        `/a/${process.env.NEXT_PUBLIC_UPLOADTHING_APP_ID}/`,
      );

      return { imageUrl: newImageUrl };
    }),
} satisfies FileRouter;

export type AppFileRouter = typeof fileRouter;
