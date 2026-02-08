"use server";

import { del } from "@vercel/blob";

export async function deleteImageAction(url: string) {
  try {
    await del(url);
  } catch (err) {
    return err;
  }
}
