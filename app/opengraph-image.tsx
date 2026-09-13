import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Pedro Braga — Arquiteto e Urbanista";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#FFFFFF",
          fontFamily: "Helvetica, Arial, sans-serif",
        }}
      >
        <div style={{ fontSize: 64, color: "#000000", letterSpacing: "-0.03em" }}>
          Pedro Braga
        </div>
        <div style={{ fontSize: 32, color: "#636363", marginTop: 24 }}>
          Arquiteto e Urbanista — São Paulo, SP
        </div>
      </div>
    ),
    { ...size }
  );
}
