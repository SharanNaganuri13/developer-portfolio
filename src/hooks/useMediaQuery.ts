"use client";

import { useEffect, useState } from "react";

export function useMediaQuery(query: string, initial = false): boolean {
  const [matches, setMatches] = useState(initial);

  useEffect(() => {
    const media = window.matchMedia(query);
    const onChange = () => setMatches(media.matches);
    onChange();
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}

export function usePrefersReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)", false);
}

export function useIsCoarsePointer(): boolean {
  return useMediaQuery("(pointer: coarse)", true);
}
