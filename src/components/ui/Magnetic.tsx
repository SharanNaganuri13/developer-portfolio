"use client";

import { useRef, type ReactNode, type MouseEvent } from "react";
import { cn } from "@/utils/cn";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

type Props = {
  children: ReactNode;
  className?: string;
  strength?: number;
};

export function Magnetic({ children, className, strength = 18 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  const onMove = (event: MouseEvent<HTMLDivElement>) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    ref.current.style.transform = `translate(${x / strength}px, ${y / strength}px)`;
  };

  const onLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = "translate(0, 0)";
  };

  return (
    <div
      ref={ref}
      className={cn("transition-transform duration-200 ease-out will-change-transform", className)}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </div>
  );
}
