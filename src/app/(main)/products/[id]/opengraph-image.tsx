/* eslint-disable @next/next/no-img-element */
import { api } from "@/trpc/server";
import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = { width: 1200, height: 630 };

export const contentType = "image/png";

export default async function Image({ params }: { params: { id: string } }) {
  const product = await api.public.products.getOneProduct({ id: params.id });
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
