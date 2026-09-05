"use client";

import { useEffect, useRef, useState } from "react";
import { useIsCoarsePointer, usePrefersReducedMotion } from "@/hooks/useMediaQuery";

type CursorMode = "default" | "link" | "view" | "explore";

export function CustomCursor() {
  const coarse = useIsCoarsePointer();
  const reduced = usePrefersReducedMotion();
  const enabled = !coarse && !reduced;
  const [mode, setMode] = useState<CursorMode>("default");
  const pos = useRef({ x: 0, y: 0 });
  const dot = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled) {
      document.documentElement.classList.remove("has-custom-cursor");
      return;
    }
    document.documentElement.classList.add("has-custom-cursor");

    let frame = 0;
    const onMove = (event: PointerEvent) => {
      pos.current = { x: event.clientX, y: event.clientY };
      if (!frame) {
        frame = window.requestAnimationFrame(() => {
          if (dot.current) {
            dot.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
          }
          frame = 0;
        });
      }
    };

    const onOver = (event: PointerEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      if (target.closest("[data-cursor='view']")) {
        setMode("view");
        return;
      }
      if (target.closest("[data-cursor='explore']")) {
        setMode("explore");
        return;
      }
      if (target.closest("a, button, [role='button'], input, textarea, select, summary")) {
        setMode("link");
        return;
      }
      setMode("default");
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      document.documentElement.classList.remove("has-custom-cursor");
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [enabled]);

  if (!enabled) return null;

  const label = mode === "view" ? "VIEW" : mode === "explore" ? "EXPLORE" : null;

  return (
    <div
      ref={dot}
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[85] mix-blend-difference"
      style={{ transform: "translate3d(-100px,-100px,0)" }}
    >
      <div
        className="flex items-center justify-center rounded-full border border-white/80 text-[9px] font-medium tracking-[0.22em] text-white transition-[width,height,background] duration-200"
        style={{
          width: label ? 64 : mode === "link" ? 36 : 12,
          height: label ? 64 : mode === "link" ? 36 : 12,
          marginLeft: label ? -32 : mode === "link" ? -18 : -6,
          marginTop: label ? -32 : mode === "link" ? -18 : -6,
          background: label ? "rgb(255 255 255 / 0.08)" : "transparent",
        }}
      >
        {label}
      </div>
    </div>
  );
}
