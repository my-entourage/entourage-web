import { ImageResponse } from "next/og";

export const alt = "Entourage - AI Task Extraction";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 64,
          background: "#000000",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "#ffffff",
          padding: "80px",
          position: "relative",
        }}
      >
        {/* Plus corners */}
        <div
          style={{
            position: "absolute",
            top: 40,
            left: 40,
            fontSize: 32,
            color: "#52525B",
          }}
        >
          +
        </div>
        <div
          style={{
            position: "absolute",
            top: 40,
            right: 40,
            fontSize: 32,
            color: "#52525B",
          }}
        >
          +
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 40,
            left: 40,
            fontSize: 32,
            color: "#52525B",
          }}
        >
          +
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 40,
            right: 40,
            fontSize: 32,
            color: "#52525B",
          }}
        >
          +
        </div>

        {/* Logo text */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 600,
            marginBottom: 24,
            letterSpacing: "-0.02em",
          }}
        >
          Entourage
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 32,
            color: "#A1A1AA",
            textAlign: "center",
            maxWidth: 800,
          }}
        >
          Know what needs to be done.
        </div>
        <div
          style={{
            fontSize: 32,
            color: "#A1A1AA",
            textAlign: "center",
            maxWidth: 800,
          }}
        >
          Without touching your task list.
        </div>

        {/* Accent bar */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 4,
            background: "#10B981",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
