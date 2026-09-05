"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import {
  Bot,
  Cloud,
  Gamepad2,
  Lightbulb,
  Network,
  Route,
  Sparkles,
  Users,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { profile } from "@/data/profile";
import { Section } from "@/components/ui/Section";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";
import type { AboutCardIcon } from "@/types/profile";

const HUES = ["var(--c1)", "var(--c2)", "var(--c3)", "var(--c4)", "var(--c5)", "var(--c6)"] as const;

const EXPLORING_ICONS: Record<string, LucideIcon> = {
  genai: Sparkles,
  agentic: Bot,
  distributed: Network,
  systems: Workflow,
  cloud: Cloud,
};

const CARD_ICONS: Record<AboutCardIcon, LucideIcon> = {
  roots: Route,
  adapt: Users,
  play: Gamepad2,
  ideas: Lightbulb,
};

export function About() {
  const figureRef = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: figureRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [-14, 14]);

  return (
    <Section id="about" index="01" eyebrow="About" title="A practice of making useful software.">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:gap-16">
        <motion.figure
          ref={figureRef}
          className="lg:sticky lg:top-28 lg:self-start"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            className="rounded-[28px] p-[1.5px]"
            style={{
              backgroundImage: "linear-gradient(140deg, var(--c1), var(--c5) 45%, var(--c3))",
            }}
          >
            <div className="overflow-hidden rounded-[26px] bg-[var(--bg-elevated)]">
              <motion.div style={{ y: reduced ? 0 : imageY }}>
                <Image
                  src={profile.photo.src}
                  alt={profile.photo.alt}
                  width={profile.photo.width}
                  height={profile.photo.height}
                  sizes="(max-width: 1024px) 88vw, 34vw"
                  priority={false}
                  className="h-auto w-full scale-[1.05]"
                />
              </motion.div>
            </div>
          </div>
          <figcaption className="mt-4 flex items-center justify-between gap-3 text-xs uppercase tracking-[0.16em] text-[var(--fg-subtle)]">
            <span className="flex items-center gap-2">
              <span className="kicker-dot" aria-hidden />
              {profile.name}
            </span>
            <span>{profile.location}</span>
          </figcaption>
        </motion.figure>

        <div>
          <p className="serif text-2xl leading-snug text-[var(--fg)] sm:text-[2rem]">
            {profile.about.introduction}
          </p>
          <div className="mt-10 space-y-6 leading-relaxed text-[var(--fg-muted)]">
            <p>{profile.about.enjoyBuilding}</p>
            <p>{profile.about.approach}</p>
          </div>

          <div className="mt-12 grid gap-3 sm:grid-cols-2">
            {profile.about.cards.map((card, index) => {
              const hue = HUES[index % HUES.length] ?? HUES[0];
              const Icon = CARD_ICONS[card.icon];
              return (
                <motion.article
                  key={card.id}
                  className="glow-card group rounded-3xl border p-5 transition-transform duration-300 hover:-translate-y-1"
                  style={{
                    borderColor: `color-mix(in oklab, ${hue} 26%, var(--line))`,
                    background: `color-mix(in oklab, ${hue} var(--tint), var(--bg-elevated))`,
                  }}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ delay: index * 0.06 }}
                >
                  <span
                    className="mb-4 flex h-9 w-9 items-center justify-center rounded-xl transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110"
                    style={{
                      background: `color-mix(in oklab, ${hue} 16%, transparent)`,
                      color: hue,
                    }}
                  >
                    <Icon size={17} strokeWidth={1.75} aria-hidden />
                  </span>
                  <p className="section-kicker" style={{ color: hue }}>
                    {card.label}
                  </p>
                  <h3 className="display mt-2 text-xl">{card.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--fg-muted)]">{card.body}</p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-16 rounded-[28px] border border-[var(--line)] p-6 sm:p-8">
        <p className="section-kicker mb-4 flex items-center gap-2.5">
          <span className="kicker-dot" aria-hidden />
          Currently exploring
        </p>
        <p className="mb-8 max-w-3xl leading-relaxed text-[var(--fg-muted)]">
          {profile.about.interests}
        </p>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {profile.exploring.map((item, index) => {
            const hue = HUES[index % HUES.length] ?? HUES[0];
            const Icon = EXPLORING_ICONS[item.id];
            return (
              <motion.li
                key={item.id}
                className="glow-card rounded-2xl border p-4 transition-transform duration-300 hover:-translate-y-1"
                style={{
                  borderColor: `color-mix(in oklab, ${hue} 26%, transparent)`,
                  background: `color-mix(in oklab, ${hue} var(--tint), var(--bg-elevated))`,
                }}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ delay: index * 0.05 }}
              >
                {Icon ? (
                  <span
                    className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl"
                    style={{
                      background: `color-mix(in oklab, ${hue} 16%, transparent)`,
                      color: hue,
                    }}
                  >
                    <Icon size={17} strokeWidth={1.75} aria-hidden />
                  </span>
                ) : null}
                <p className="display text-lg" style={{ color: hue }}>
                  {item.label}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--fg-muted)]">{item.note}</p>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}
