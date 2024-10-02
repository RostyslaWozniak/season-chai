import { ImageResponse } from "next/og";

export const runtime = "edge";

export default async function Image() {
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
          src="/opengraph-image.png"
          height="100"
          alt="Season Chai OpenGraph Image"
        />
      </div>
    ),
  );
}
