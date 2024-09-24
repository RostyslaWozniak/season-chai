"use server";
import { unstable_cache } from "next/cache";
import { db } from "@/server/db";
import { validateRequest } from "@/lib/auth";

export const getAllProducts = unstable_cache(
  async () => {
    return await db.product.findMany();
  },
  ["product"],
  { revalidate: 3600, tags: ["product"] },
);

export const getCartItems = async () => {
  const { user } = await validateRequest();

  const cartItems = await db.cartItem.findMany({
    where: { carts: { user_id: user?.id }, quantity: { gt: 0 } },
    include: {
      products: {
        select: {
          id: true,
          name: true,
          price: true,
          image_url: true,
        },
      },
    },
  });

  return cartItems;
};
