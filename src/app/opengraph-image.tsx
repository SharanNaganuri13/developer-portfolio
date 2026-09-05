import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#08090b",
          color: "#f3efe8",
          padding: 72,
        }}
      >
        <div style={{ display: "flex", fontSize: 22, letterSpacing: 8, textTransform: "uppercase", opacity: 0.55 }}>
          {profile.initials}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 58, letterSpacing: -2, lineHeight: 1.05, fontWeight: 600 }}>
            {profile.headline}
          </div>
          <div style={{ display: "flex", marginTop: 18, fontSize: 24, opacity: 0.7 }}>
            {`${profile.name} · ${profile.role}`}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
