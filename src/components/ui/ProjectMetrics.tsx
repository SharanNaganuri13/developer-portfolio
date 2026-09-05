import { Check } from "lucide-react";
import type { ProjectMetric } from "@/types/profile";

type Props = {
  metrics: ProjectMetric[];
  accent: string;
};

export function ProjectMetrics({ metrics, accent }: Props) {
  if (metrics.length === 0) return null;

  return (
    <dl className="flex flex-wrap gap-x-7 gap-y-3">
      {metrics.map((metric) => (
        // Value reads first visually; the DOM keeps label-then-value for <dl> semantics.
        <div key={metric.id} className="flex flex-col-reverse">
          <dt className="text-[11px] leading-tight text-[var(--fg-muted)]">{metric.label}</dt>
          <dd className="display text-xl leading-none sm:text-2xl" style={{ color: accent }}>
            {metric.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

type HighlightProps = {
  highlights: string[];
  accent: string;
};

/**
 * Qualitative counterpart to ProjectMetrics — used when a project has real
 * differentiators but no honestly measured numbers to show.
 */
export function ProjectHighlights({ highlights, accent }: HighlightProps) {
  if (highlights.length === 0) return null;

  return (
    <ul className="flex flex-wrap gap-2">
      {highlights.map((item) => (
        <li
          key={item}
          className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px]"
          style={{
            borderColor: `color-mix(in oklab, ${accent} 30%, transparent)`,
            background: `color-mix(in oklab, ${accent} 8%, transparent)`,
            color: `color-mix(in oklab, ${accent} 72%, var(--fg))`,
          }}
        >
          <Check size={12} className="shrink-0" aria-hidden />
          {item}
        </li>
      ))}
    </ul>
  );
}
