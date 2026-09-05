"use client";

/**
 * Slow-drifting colored blobs behind the whole page.
 * Pure CSS animation — no JS loop, and the global reduced-motion
 * rule in globals.css freezes it for users who ask for that.
 */

type Blob = {
  hue: string;
  size: string;
  top: string;
  left: string;
  animation: string;
  duration: string;
  delay: string;
};

const BLOBS: Blob[] = [
  { hue: "var(--c1)", size: "46vw", top: "-8vh", left: "-6vw", animation: "drift-a", duration: "34s", delay: "0s" },
  { hue: "var(--c5)", size: "38vw", top: "18vh", left: "62vw", animation: "drift-b", duration: "42s", delay: "-6s" },
  { hue: "var(--c3)", size: "42vw", top: "58vh", left: "-4vw", animation: "drift-c", duration: "38s", delay: "-12s" },
  { hue: "var(--c4)", size: "30vw", top: "72vh", left: "58vw", animation: "drift-a", duration: "46s", delay: "-20s" },
  { hue: "var(--c6)", size: "34vw", top: "38vh", left: "28vw", animation: "drift-b", duration: "50s", delay: "-28s" },
];

export function AmbientBackground() {
  return (
    <div className="aurora" aria-hidden>
      {BLOBS.map((blob, index) => (
        <span
          key={index}
          className="aurora__blob"
          style={{
            width: blob.size,
            height: blob.size,
            top: blob.top,
            left: blob.left,
            background: `radial-gradient(circle at 50% 50%, ${blob.hue}, transparent 68%)`,
            animationName: blob.animation,
            animationDuration: blob.duration,
            animationDelay: blob.delay,
            animationTimingFunction: "ease-in-out",
            animationIterationCount: "infinite",
          }}
        />
      ))}
    </div>
  );
}
