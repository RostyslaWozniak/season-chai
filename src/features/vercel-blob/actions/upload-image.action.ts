"use server";

import { put, PutBlobResult } from "@vercel/blob";
import sharp from "sharp";

export async function uploadImageAction(
  imageFile: File,
  storeDir?: string,
): Promise<
  { error: string; blob: null } | { error: null; blob: PutBlobResult }
> {
  try {
    const buffer = await imageFile.arrayBuffer();
    const optimizedImage = sharp(buffer)
      .resize(2000, 2000, { withoutEnlargement: true, fit: "inside" })
      .withMetadata()
      .webp({ quality: 80 });

    const fileName = imageFile.name.replace(/\.[^/.]+$/, ".webp");

    const blob = await put(`${storeDir}/${fileName}`, optimizedImage, {
      access: "public",
      addRandomSuffix: true,
    });
    return { blob, error: null };
  } catch (err) {
    return { error: (err as Error).message, blob: null };
  }
}
