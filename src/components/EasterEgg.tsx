"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { profile } from "@/data/profile";
import { X } from "lucide-react";

const BUFFER_LIMIT = 8;

export function EasterEgg() {
  const [open, setOpen] = useState(false);
  const buffer = useRef("");

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.metaKey && event.key.toLowerCase() === "k" && event.shiftKey) {
        event.preventDefault();
        setOpen(true);
        return;
      }
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
        return;
      }
      if (event.key.length === 1) {
        buffer.current = (buffer.current + event.key.toLowerCase()).slice(-BUFFER_LIMIT);
        if (buffer.current.endsWith("sudo")) {
          setOpen(true);
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[88] flex items-end justify-center p-4 sm:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/50"
            aria-label="Close terminal"
            onClick={() => setOpen(false)}
          />
          <motion.div
            role="dialog"
            aria-labelledby="egg-title"
            className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-[var(--line)] bg-[#0c0d0f] font-mono text-sm text-[#d7e0d2] shadow-[var(--shadow)]"
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 16, opacity: 0 }}
          >
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-2 text-[11px] tracking-[0.18em] uppercase text-white/50">
              <span id="egg-title">local tty — {profile.initials}</span>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close" className="p-1 text-white/70">
                <X size={14} />
              </button>
            </div>
            <div className="space-y-2 p-4 leading-relaxed">
              <p>$ sudo whoami</p>
              <p className="text-[var(--accent)]">{profile.name}</p>
              <p>$ cat ./role</p>
              <p>{profile.role}</p>
              <p>$ cat ./off-hours</p>
              <p>ranked ladders, cricket, and one more refactor</p>
              <p>$ ./deploy --to production --skip-review</p>
              <p className="text-[#f0805f]">permission denied: ship it through review like everyone else</p>
              <p>$ echo &quot;ship carefully&quot;</p>
              <p className="text-white/55">Hint: type sudo anywhere, or Shift+⌘+K / Shift+Ctrl+K.</p>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
