import { uploadImageAction } from "@/features/vercel-blob/actions/upload-image.action";
import { NextResponse } from "next/server";

const IMAGES_DIR = "products";

export async function POST(request: Request): Promise<NextResponse> {
  const formData = await request.formData();
  const files = formData.getAll("files") as File[];

  try {
    const uploads = await Promise.all(
      files.map(async (file) => {
        return uploadImageAction(file, IMAGES_DIR);
      }),
    );

    return NextResponse.json({
      success: true,
      files: uploads,
    });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 },
    );
  }
}
