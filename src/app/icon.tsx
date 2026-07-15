import { ImageResponse } from "next/og";

export const size = { width: 512, height: 512 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#dc2626",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 80,
        }}
      >
        <span
          style={{
            color: "white",
            fontSize: 320,
            fontWeight: 900,
            lineHeight: 1,
          }}
        >
          P
        </span>
      </div>
    ),
    { ...size }
  );
}
