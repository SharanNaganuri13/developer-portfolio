"use client";

import { useEffect } from "react";

/**
 * Lands deep links like `/#projects` on the right section.
 *
 * The browser's native anchor jump often fires before fonts load and layout
 * settles, so the target ends up in the wrong place. This re-runs the scroll
 * once the document is ready — after fonts, on the next frame — honoring the
 * element's `scroll-margin-top` so it clears the fixed navbar.
 */
export function HashScroll() {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash.length <= 1) return;

    let id: string;
    try {
      id = decodeURIComponent(hash.slice(1));
    } catch {
      id = hash.slice(1);
    }

    const target = document.getElementById(id);
    if (!target) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;

    const scroll = () => {
      frame = window.requestAnimationFrame(() => {
        target.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth", block: "start" });
      });
    };

    if (document.fonts?.ready) {
      document.fonts.ready.then(scroll);
    } else {
      scroll();
    }

    return () => window.cancelAnimationFrame(frame);
  }, []);

  return null;
}
