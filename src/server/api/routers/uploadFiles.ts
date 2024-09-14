import { utapi } from "@/app/api/uploadthing/utapi";
import { BASE_UPLOADED_IMAGES_URL } from "@/helpers/constant";

import { adminProcedure, createTRPCRouter } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";

export const uploadFilesRouter = createTRPCRouter({
  getAllImages: adminProcedure.query(async () => {
    const { files } = await utapi.listFiles();
    if (!files) throw new TRPCError({ code: "NOT_FOUND" });
    const images = files.map((file) => {
      return {
        id: file.key,
        name: file.name,
        url: `${BASE_UPLOADED_IMAGES_URL}${file.key}`,
      };
    });
    return images;
  }),
});
