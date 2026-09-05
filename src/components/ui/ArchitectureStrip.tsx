import { ChevronRight } from "lucide-react";
import type { ArchitectureNode } from "@/types/profile";

type Props = {
  nodes: ArchitectureNode[];
  accent: string;
  /** Slightly larger treatment for the case study header. */
  size?: "sm" | "md";
  /** Cap the stages shown; the remainder collapses into a `+N` chip. */
  max?: number;
};

/**
 * At-a-glance shape of a system: Frontend › API › Backend › Database.
 * Labels only — the detail lives in the full architecture list.
 */
export function ArchitectureStrip({ nodes, accent, size = "sm", max }: Props) {
  if (nodes.length === 0) return null;

  const text = size === "sm" ? "text-[10px]" : "text-xs";
  const pad = size === "sm" ? "px-2 py-0.5" : "px-2.5 py-1";
  const chip = `rounded-md border uppercase tracking-[0.12em] ${text} ${pad}`;
  const chipStyle = {
    borderColor: `color-mix(in oklab, ${accent} 30%, transparent)`,
    background: `color-mix(in oklab, ${accent} 8%, transparent)`,
    color: `color-mix(in oklab, ${accent} 72%, var(--fg))`,
  };

  const shown = max ? nodes.slice(0, max) : nodes;
  const hidden = nodes.length - shown.length;

  return (
    <ol className="flex flex-wrap items-center gap-x-1 gap-y-1.5">
      {shown.map((node, index) => (
        <li key={node.id} className="flex items-center gap-1">
          <span className={chip} style={chipStyle}>
            {node.label}
          </span>
          {index < shown.length - 1 || hidden > 0 ? (
            <ChevronRight
              size={size === "sm" ? 11 : 13}
              className="shrink-0 text-[var(--fg-subtle)]"
              aria-hidden
            />
          ) : null}
        </li>
      ))}
      {hidden > 0 ? (
        <li>
          <span className={chip} style={chipStyle}>
            +{hidden}
          </span>
        </li>
      ) : null}
    </ol>
  );
}
