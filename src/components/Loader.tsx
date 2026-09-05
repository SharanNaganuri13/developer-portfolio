"use client";

import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { profile } from "@/data/profile";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

export function Loader({ children }: { children: ReactNode }) {
  const reduced = usePrefersReducedMotion();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (reduced) return;
    const timer = window.setTimeout(() => setVisible(false), 1100);
    return () => window.clearTimeout(timer);
  }, [reduced]);

  const show = visible && !reduced;

  return (
    <>
      <AnimatePresence>
        {show ? (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center bg-[var(--bg)]"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            aria-hidden={!show}
          >
            <div className="flex flex-col items-center gap-6">
              <motion.p
                className="display text-5xl sm:text-6xl"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
              >
                {profile.initials}
              </motion.p>
              <div className="h-px w-24 overflow-hidden bg-[var(--line)]">
                <motion.span
                  className="block h-full bg-[var(--accent)]"
                  initial={{ x: "-100%" }}
                  animate={{ x: "0%" }}
                  transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
      {children}
    </>
  );
}
