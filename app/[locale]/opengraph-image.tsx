import { ImageResponse } from "next/og";

// Branded Open Graph card. It lives inside the [locale] segment (not app root)
// so its URL is locale-prefixed — the i18n proxy would otherwise try to
// locale-redirect a bare /opengraph-image and 404 it. The card is identical
// across locales and stays in the Latin range on purpose: ImageResponse's
// built-in font carries no Cyrillic or ș/ț, so this keeps every locale legible
// rather than rendering tofu. Emerald & cream, matching the site.
export const alt = "kaolin, ai implementation studio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// The four locales are known at build time; generate the (identical) card for each.
export function generateStaticParams() {
  return ["en", "nl", "ro", "ru"].map((locale) => ({ locale }));
}

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f9f6f0",
          color: "#191b17",
          padding: 84,
        }}
      >
        <div style={{ fontSize: 44, fontWeight: 600, letterSpacing: "-0.04em", color: "#134e43" }}>
          kaolin
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 80,
              lineHeight: 1.0,
              maxWidth: 1000,
              letterSpacing: "-0.035em",
              fontWeight: 500,
            }}
          >
            we build websites and add ai to them.
          </div>
          <div style={{ fontSize: 30, color: "#63665a", marginTop: 30 }}>
            ai implementation studio · amsterdam x chisinau
          </div>
        </div>
        <div style={{ display: "flex", height: 10, width: 168, background: "#134e43", borderRadius: 999 }} />
      </div>
    ),
    { ...size },
  );
}
