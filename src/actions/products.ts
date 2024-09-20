"use server";
import { unstable_cache } from "next/cache";
import { db } from "@/server/db";

export const getAllProducts = unstable_cache(
  async () => {
    return await db.product.findMany();
  },
  ["product"],
  { revalidate: 3600, tags: ["product"] },
);
