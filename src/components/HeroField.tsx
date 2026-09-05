"use client";

import { motion } from "motion/react";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

const NODES = [
  { x: 18, y: 22, r: 3, hue: "var(--c1)" },
  { x: 42, y: 14, r: 2, hue: "var(--c5)" },
  { x: 68, y: 28, r: 3.5, hue: "var(--c3)" },
  { x: 84, y: 58, r: 2.4, hue: "var(--c4)" },
  { x: 62, y: 72, r: 3, hue: "var(--c2)" },
  { x: 30, y: 64, r: 2.2, hue: "var(--c6)" },
  { x: 12, y: 48, r: 2.6, hue: "var(--c3)" },
  { x: 48, y: 44, r: 4, hue: "var(--c1)" },
];

const LINES: Array<[number, number]> = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [4, 5],
  [5, 0],
  [7, 0],
  [7, 2],
  [7, 4],
  [6, 7],
];

const FRAGMENTS = [
  { text: "const system = reliable", x: "8%", y: "78%", hue: "var(--c3)" },
  { text: "interface Experience", x: "55%", y: "10%", hue: "var(--c1)" },
  { text: "deploy()", x: "70%", y: "84%", hue: "var(--c2)" },
];

export function HeroField() {
  const reduced = usePrefersReducedMotion();

  return (
    <div className="relative mx-auto aspect-square w-full max-w-md lg:max-w-none">
      <div className="absolute inset-[8%] rounded-full border border-[var(--line)]" />
      <div className="absolute inset-[22%] rounded-full border border-[var(--line)] opacity-70" />
      <motion.div
        className="absolute inset-[36%] rounded-full"
        style={{ border: "1px solid color-mix(in oklab, var(--c1) 45%, transparent)" }}
        animate={reduced ? undefined : { rotate: 360 }}
        transition={{ duration: 48, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute inset-[16%] rounded-full"
        style={{ border: "1px dashed color-mix(in oklab, var(--c5) 30%, transparent)" }}
        animate={reduced ? undefined : { rotate: -360 }}
        transition={{ duration: 72, repeat: Infinity, ease: "linear" }}
      />
      <svg viewBox="0 0 100 100" className="relative h-full w-full">
        <defs>
          <linearGradient id="hero-link" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--c1)" stopOpacity="0.55" />
            <stop offset="50%" stopColor="var(--c5)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="var(--c3)" stopOpacity="0.55" />
          </linearGradient>
        </defs>
        {LINES.map(([a, b], i) => {
          const from = NODES[a];
          const to = NODES[b];
          if (!from || !to) return null;
          return (
            <line
              key={i}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke="url(#hero-link)"
              strokeWidth="0.4"
            />
          );
        })}
        {NODES.map((node, i) => (
          <motion.circle
            key={i}
            cx={node.x}
            cy={node.y}
            r={node.r}
            fill={node.hue}
            animate={reduced ? undefined : { cy: [node.y, node.y - 1.6, node.y] }}
            transition={{ duration: 4 + i * 0.35, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </svg>
      {FRAGMENTS.map((fragment) => (
        <span
          key={fragment.text}
          className="pointer-events-none absolute hidden rounded-full border px-3 py-1 font-mono text-[10px] backdrop-blur sm:block"
          style={{
            left: fragment.x,
            top: fragment.y,
            color: fragment.hue,
            borderColor: `color-mix(in oklab, ${fragment.hue} 35%, transparent)`,
            background: `color-mix(in oklab, ${fragment.hue} 10%, var(--bg-glass))`,
          }}
        >
          {fragment.text}
        </span>
      ))}
    </div>
  );
}
