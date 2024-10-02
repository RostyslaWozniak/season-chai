/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };

export const contentType = "image/png";

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
          alt="Season Chai Open Graph Image"
        />
      </div>
    ),
  );
}
