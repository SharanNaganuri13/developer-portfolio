"use client";

import { ArrowUpRight, Download } from "lucide-react";
import { motion } from "motion/react";
import { profile } from "@/data/profile";
import { Magnetic } from "@/components/ui/Magnetic";
import { HeroField } from "@/components/HeroField";
import { LinkedInIcon } from "@/components/ui/LinkedInIcon";
import { GmailIcon } from "@/components/ui/BrandIcons";

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden px-5 pt-32 pb-20 sm:px-8 sm:pt-40 sm:pb-28 lg:px-12">
      <div className="pointer-events-none absolute inset-0 grid-bg" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        <div>
          <motion.p
            className="mb-6 flex items-center gap-2.5 text-sm font-medium uppercase tracking-[0.2em] text-[var(--fg-muted)] sm:text-base"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="kicker-dot" aria-hidden />
            {profile.eyebrow}
          </motion.p>
          <motion.h1
            className="display text-gradient text-[2.6rem] leading-[0.94] sm:text-6xl lg:text-[4.6rem]"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
          >
            {profile.headline}
          </motion.h1>
          <motion.p
            className="serif mt-8 max-w-xl text-lg leading-relaxed text-[var(--fg-muted)] sm:text-xl"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.12 }}
          >
            {profile.shortBio}
          </motion.p>
          <motion.p
            className="mt-5 max-w-xl rounded-full border px-3.5 py-1.5 text-sm leading-relaxed"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.16 }}
            style={{
              borderColor: "color-mix(in oklab, var(--c3) 32%, transparent)",
              background: "color-mix(in oklab, var(--c3) 10%, transparent)",
              color: "var(--c3)",
            }}
          >
            {profile.availability}
          </motion.p>
          <motion.div
            className="mt-10 flex flex-wrap items-center gap-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.18 }}
          >
            <Magnetic>
              <a
                href="#projects"
                className="btn-gradient inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium shadow-[0_8px_30px_-8px_var(--c1)]"
              >
                View My Work
                <ArrowUpRight size={16} />
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="#contact"
                className="glow-card inline-flex items-center gap-2 rounded-full border border-[var(--line-strong)] px-5 py-2.5 text-sm transition-colors hover:text-[var(--c1)]"
              >
                Let&apos;s Connect
              </a>
            </Magnetic>
          </motion.div>
          <motion.div
            className="mt-8 flex flex-wrap items-center gap-5 text-sm text-[var(--fg-muted)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.28 }}
          >
            <a
              href={profile.resumeHref}
              download
              className="inline-flex items-center gap-2 hover:text-[var(--fg)]"
            >
              <Download size={15} />
              Resume
            </a>
            <a href={profile.linkedIn} className="inline-flex items-center gap-2 hover:text-[var(--fg)]">
              <LinkedInIcon size={15} />
              LinkedIn
            </a>
            <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-2 hover:text-[var(--fg)]">
              <GmailIcon size={15} />
              Email
            </a>
          </motion.div>
          <p className="mt-6 text-xs tracking-[0.16em] uppercase text-[var(--fg-subtle)]">
            {profile.role} · {profile.location}
          </p>
        </div>
        <HeroField />
      </div>
    </section>
  );
}
