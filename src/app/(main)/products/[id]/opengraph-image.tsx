import { db } from "@/server/db";
import { ImageResponse } from "next/og";

export default async function Image({ params }: { params: { id: string } }) {
  const product = await db.product.findUnique({
    where: { id: params.id },
    select: { imageUrl: true, name: true },
  });
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img src={product?.imageUrl} height="100" alt={product?.name} />
      </div>
    ),
  );
}
