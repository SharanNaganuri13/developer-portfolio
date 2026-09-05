"use client";

import { useRef, type MouseEvent } from "react";
import { cn } from "@/utils/cn";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

type Motif = "approvals" | "query" | "canvas";

type Props = {
  motif: Motif;
  accent: string;
  className?: string;
  label: string;
};

export function ProjectVisual({ motif, accent, className, label }: Props) {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (event: MouseEvent<HTMLDivElement>) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 8;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 8;
    ref.current.style.transform = `perspective(900px) rotateX(${-y}deg) rotateY(${x}deg)`;
  };

  const onLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = "perspective(900px) rotateX(0) rotateY(0)";
  };

  return (
    <div
      ref={ref}
      data-cursor="explore"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={cn(
        "relative overflow-hidden rounded-[22px] border border-[var(--line)] transition-transform duration-300 ease-out",
        className,
      )}
      style={{
        background: `radial-gradient(120% 80% at 20% 10%, color-mix(in oklab, ${accent} 28%, transparent), transparent 50%), var(--bg-elevated)`,
      }}
      aria-hidden
    >
      <div className="absolute inset-0 grid-bg opacity-80" />
      {motif === "approvals" ? <ApprovalsMotif accent={accent} /> : null}
      {motif === "query" ? <QueryMotif accent={accent} /> : null}
      {motif === "canvas" ? <CanvasMotif accent={accent} /> : null}
      <span className="sr-only">{label}</span>
    </div>
  );
}

/**
 * Vendor onboarding shape: a multi-stage approval track above the
 * records moving through it, each with its own verification status.
 */
function ApprovalsMotif({ accent }: { accent: string }) {
  const stages = [64, 154, 244, 334];
  const records = [
    { y: 118, name: 90, status: 0.55 },
    { y: 152, name: 76, status: 0.32 },
    { y: 186, name: 104, status: 0.18 },
  ];

  return (
    <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 240" fill="none">
      {/* Approval track — cleared stages, then the one in progress */}
      <path d="M64 72h180" stroke={accent} strokeOpacity="0.6" strokeWidth="1.5" />
      <path d="M244 72h90" stroke={accent} strokeOpacity="0.22" strokeWidth="1.5" />

      {stages.map((cx, index) => {
        if (index < 2) {
          return (
            <g key={cx}>
              <circle cx={cx} cy="72" r="11" fill={accent} fillOpacity="0.9" />
              <path
                d={`M${cx - 4.5} 72l3.5 3.5 6-7`}
                stroke="var(--bg-elevated)"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </g>
          );
        }
        if (index === 2) {
          return (
            <g key={cx}>
              <circle cx={cx} cy="72" r="11" stroke={accent} strokeOpacity="0.9" />
              <circle cx={cx} cy="72" r="4" fill={accent} />
            </g>
          );
        }
        return <circle key={cx} cx={cx} cy="72" r="11" stroke={accent} strokeOpacity="0.3" />;
      })}

      {/* Vendor records with verification status */}
      {records.map((record) => (
        <g key={record.y}>
          <rect
            x="52"
            y={record.y}
            width="296"
            height="26"
            rx="6"
            stroke={accent}
            strokeOpacity="0.28"
          />
          <rect
            x="66"
            y={record.y + 11}
            width={record.name}
            height="4"
            rx="2"
            fill={accent}
            opacity="0.45"
          />
          <rect
            x="280"
            y={record.y + 7}
            width="54"
            height="12"
            rx="6"
            fill={accent}
            opacity={record.status}
          />
        </g>
      ))}
    </svg>
  );
}

/**
 * Text-to-SQL shape: a natural-language prompt, the SQL it generates,
 * and the result table that comes back.
 */
function QueryMotif({ accent }: { accent: string }) {
  const columns = [80, 168, 256];
  const headWidths = [52, 44, 36];
  const rows = [
    { y: 158, widths: [60, 32, 24] },
    { y: 179, widths: [48, 40, 30] },
    { y: 200, widths: [56, 28, 20] },
  ];

  return (
    <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 240" fill="none">
      {/* Prompt field */}
      <rect
        x="52"
        y="30"
        width="296"
        height="34"
        rx="10"
        stroke={accent}
        strokeOpacity="0.55"
        fill={accent}
        fillOpacity="0.07"
      />
      <path d="M68 41l6 6-6 6" stroke={accent} strokeOpacity="0.8" strokeWidth="1.5" />
      <rect x="84" y="45" width="132" height="5" rx="2.5" fill={accent} opacity="0.5" />
      <rect x="224" y="45" width="48" height="5" rx="2.5" fill={accent} opacity="0.26" />

      {/* Generated SQL */}
      <path d="M200 70v14" stroke={accent} strokeOpacity="0.45" />
      <path d="M194 79l6 6 6-6" stroke={accent} strokeOpacity="0.7" strokeWidth="1.5" />
      {[
        { x: 100, w: 40, o: 0.7 },
        { x: 146, w: 68, o: 0.34 },
        { x: 220, w: 34, o: 0.7 },
        { x: 260, w: 40, o: 0.34 },
      ].map((block) => (
        <rect
          key={block.x}
          x={block.x}
          y="96"
          width={block.w}
          height="6"
          rx="3"
          fill={accent}
          opacity={block.o}
        />
      ))}

      {/* Result table */}
      <rect x="68" y="122" width="264" height="92" rx="8" stroke={accent} strokeOpacity="0.5" />
      <path d="M68 148h264" stroke={accent} strokeOpacity="0.5" />
      <path d="M68 171h264M68 192h264" stroke={accent} strokeOpacity="0.2" />
      <path d="M156 122v92M244 122v92" stroke={accent} strokeOpacity="0.2" />

      {columns.map((x, i) => (
        <rect
          key={`head-${x}`}
          x={x}
          y="132"
          width={headWidths[i]}
          height="5"
          rx="2.5"
          fill={accent}
          opacity="0.75"
        />
      ))}

      {rows.map((row) =>
        columns.map((x, i) => (
          <rect
            key={`${row.y}-${x}`}
            x={x}
            y={row.y}
            width={row.widths[i]}
            height="4"
            rx="2"
            fill={accent}
            opacity="0.4"
          />
        )),
      )}
    </svg>
  );
}

/** The six-hue palette variables this site is actually built on. */
const PALETTE = ["var(--c1)", "var(--c2)", "var(--c3)", "var(--c4)", "var(--c5)", "var(--c6)"];

/**
 * This site's own shape: the floating nav, an editorial headline,
 * a pair of calls to action, and the token palette underneath it all.
 */
function CanvasMotif({ accent }: { accent: string }) {
  return (
    <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 240" fill="none">
      {/* Page frame */}
      <rect x="46" y="26" width="308" height="188" rx="14" stroke={accent} strokeOpacity="0.4" />

      {/* Floating nav pill */}
      <rect
        x="112"
        y="42"
        width="176"
        height="17"
        rx="8.5"
        stroke={accent}
        strokeOpacity="0.5"
        fill={accent}
        fillOpacity="0.09"
      />
      <rect x="126" y="49" width="22" height="4" rx="2" fill={accent} opacity="0.55" />
      <rect x="156" y="49" width="30" height="4" rx="2" fill={accent} opacity="0.3" />
      <rect x="194" y="49" width="24" height="4" rx="2" fill={accent} opacity="0.3" />
      <rect x="226" y="49" width="34" height="4" rx="2" fill={accent} opacity="0.3" />

      {/* Editorial headline */}
      <rect x="72" y="80" width="184" height="11" rx="5.5" fill={accent} opacity="0.7" />
      <rect x="72" y="97" width="132" height="11" rx="5.5" fill={accent} opacity="0.45" />

      {/* Body copy */}
      <rect x="72" y="120" width="206" height="4" rx="2" fill={accent} opacity="0.26" />
      <rect x="72" y="130" width="164" height="4" rx="2" fill={accent} opacity="0.26" />

      {/* Calls to action */}
      <rect x="72" y="146" width="60" height="17" rx="8.5" fill={accent} opacity="0.55" />
      <rect x="140" y="146" width="60" height="17" rx="8.5" stroke={accent} strokeOpacity="0.4" />

      {/* Design tokens */}
      {PALETTE.map((hue, index) => (
        <circle key={hue} cx={79 + index * 25} cy="188" r="7" fill={hue} opacity="0.85" />
      ))}
    </svg>
  );
}
