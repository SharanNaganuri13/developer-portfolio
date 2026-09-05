"use client";

import { useEffect, useState } from "react";
import { Download, Menu, Moon, Sun, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { profile } from "@/data/profile";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/utils/cn";

const SECTION_IDS = profile.nav.map((item) => item.id);

export function Navbar() {
  const active = useActiveSection(SECTION_IDS);
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5">
      <nav
        aria-label="Primary"
        className={cn(
          "pointer-events-auto mx-auto flex max-w-6xl items-center justify-between rounded-full border px-3 py-2 transition-[background,border,box-shadow] duration-300 sm:px-4",
          scrolled
            ? "border-[var(--line)] bg-[var(--bg-glass)] shadow-[var(--shadow)] backdrop-blur-xl"
            : "border-transparent bg-transparent",
        )}
      >
        <a href="#home" className="display text-gradient px-2 text-lg tracking-tight">
          {profile.initials}
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {profile.nav.map((item) => (
            <li key={item.id}>
              <a
                href={item.href}
                aria-current={active === item.id ? "true" : undefined}
                className={cn(
                  "relative rounded-full px-2.5 py-1.5 text-sm transition-colors xl:px-3",
                  active === item.id ? "text-[var(--fg)]" : "text-[var(--fg-muted)] hover:text-[var(--fg)]",
                )}
              >
                {active === item.id ? (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full border"
                    style={{
                      borderColor: "color-mix(in oklab, var(--c1) 35%, transparent)",
                      background: "color-mix(in oklab, var(--c1) 14%, var(--bg-elevated))",
                    }}
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                ) : null}
                <span className="relative z-10">{item.label}</span>
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1">
          <a
            href={profile.resumeHref}
            download
            className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-sm text-[var(--fg-muted)] transition-colors hover:text-[var(--fg)]"
          >
            <Download size={14} aria-hidden />
            Resume
          </a>
          <button
            type="button"
            onClick={toggleTheme}
            className="rounded-full p-2 text-[var(--fg-muted)] transition-colors hover:text-[var(--c4)]"
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            <motion.span
              key={theme}
              className="block"
              initial={{ rotate: -90, opacity: 0, scale: 0.7 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </motion.span>
          </button>
          <button
            type="button"
            className="rounded-full p-2 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-nav"
            className="pointer-events-auto mt-2 overflow-hidden rounded-3xl border border-[var(--line)] bg-[var(--bg-glass)] backdrop-blur-xl lg:hidden"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
          >
            <ul className="flex flex-col p-3">
              {profile.nav.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    aria-current={active === item.id ? "true" : undefined}
                    className="block rounded-2xl px-4 py-3 text-lg"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
