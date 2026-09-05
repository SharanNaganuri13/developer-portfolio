"use client";

import { TechIcon } from "@/components/ui/TechIcon";
import { skillIdForTech } from "@/utils/skillLookup";

type Props = {
  label: string;
  accent?: string;
  className?: string;
  size?: number;
};

export function TechChip({ label, accent = "var(--c1)", className, size = 13 }: Props) {
  const skillId = skillIdForTech(label);

  return (
    <span
      className={className}
      style={{
        borderColor: `color-mix(in oklab, ${accent} 30%, transparent)`,
        background: `color-mix(in oklab, ${accent} 8%, transparent)`,
      }}
    >
      {skillId ? <TechIcon skillId={skillId} size={size} /> : null}
      {label}
    </span>
  );
}
