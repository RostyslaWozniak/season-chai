"use server";

import { put, PutBlobResult } from "@vercel/blob";

export async function uploadImageAction(
  imageFile: File,
): Promise<
  { error: string; blob: null } | { error: null; blob: PutBlobResult }
> {
  try {
    const blob = await put(imageFile.name, imageFile, {
      access: "public",
      addRandomSuffix: true,
    });
    return { blob, error: null };
  } catch (err) {
    return { error: (err as Error).message, blob: null };
  }
}
