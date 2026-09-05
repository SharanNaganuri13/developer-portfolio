"use client";

import Image from "next/image";
import type { CompanyLogo as CompanyLogoAsset } from "@/types/profile";

type Props = {
  monogram: string;
  hue: string;
  logo?: CompanyLogoAsset;
};

/**
 * Renders a company's logo when the asset exists, otherwise a monogram tile.
 * Logos sit on a white plate so brand colors stay accurate in both themes, and
 * are served unoptimized so an SVG asset can be dropped into /public without
 * enabling `dangerouslyAllowSVG` on the image optimizer.
 */
export function CompanyLogo({ monogram, hue, logo }: Props) {
  if (logo) {
    return (
      <span
        className="flex h-12 shrink-0 items-center justify-center rounded-2xl border bg-white px-3 shadow-sm"
        style={{ borderColor: `color-mix(in oklab, ${hue} 26%, var(--line))` }}
      >
        <Image
          src={logo.src}
          alt={logo.alt}
          width={logo.width}
          height={logo.height}
          unoptimized
          className="h-7 w-auto object-contain"
        />
      </span>
    );
  }

  return (
    <span
      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border"
      style={{
        borderColor: `color-mix(in oklab, ${hue} 30%, var(--line))`,
        background: `color-mix(in oklab, ${hue} 18%, var(--bg-elevated))`,
      }}
    >
      <span className="display text-sm tracking-tight" style={{ color: hue }} aria-hidden>
        {monogram}
      </span>
    </span>
  );
}
