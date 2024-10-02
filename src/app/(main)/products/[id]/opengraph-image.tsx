import { getAllProducts } from "@/server/actions/products";
import { db } from "@/server/db";
import { ImageResponse } from "next/og";

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((product) => ({
    id: product.id,
  }));
}

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
        <img
          tw="object-cover object-center h-full"
          src={product?.imageUrl}
          alt={product?.name}
        />
      </div>
    ),
  );
}
