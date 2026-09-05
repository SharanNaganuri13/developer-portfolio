"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, GraduationCap, Sparkles } from "lucide-react";
import { profile } from "@/data/profile";
import { Section } from "@/components/ui/Section";
import { CompanyLogo } from "@/components/ui/CompanyLogo";
import { cn } from "@/utils/cn";

const HUES = ["var(--c1)", "var(--c3)", "var(--c5)", "var(--c4)"] as const;

export function Experience() {
  const [openId, setOpenId] = useState<string | null>(null);
  const isOngoing = profile.experience.some((role) => /present|current/i.test(role.duration));

  return (
    <Section id="experience" index="02" eyebrow="Experience" title="Roles, scope, and the work itself.">
      <ol className="relative space-y-4 pl-14 sm:pl-28">
        <span
          aria-hidden
          className="absolute inset-y-0 left-11 w-px sm:left-20"
          style={{
            backgroundImage:
              "linear-gradient(180deg, transparent, var(--c1), var(--c5), var(--c3), transparent)",
          }}
        />
        {profile.experience.map((role, index) => {
          const open = openId === role.id;
          const hue = HUES[index % HUES.length] ?? HUES[0];
          return (
            <motion.li
              key={role.id}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ delay: index * 0.05 }}
              className="relative"
            >
              <motion.span
                aria-hidden
                className="absolute -left-14 top-5 w-9 text-right font-medium sm:-left-24 sm:w-14"
                style={{ color: hue }}
                initial={{ opacity: 0, x: -6 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ delay: index * 0.05 + 0.1 }}
              >
                <span className="display text-base sm:text-xl">{role.startYear}</span>
              </motion.span>
              <span
                className="absolute -left-[1.0625rem] top-6 h-2.5 w-2.5 rounded-full sm:-left-[2.3125rem]"
                style={{ background: hue, boxShadow: `0 0 0 4px color-mix(in oklab, ${hue} 18%, transparent)` }}
              />
              <article
                className="glow-card rounded-[24px] border transition-colors duration-300"
                style={{
                  borderColor: open
                    ? `color-mix(in oklab, ${hue} 35%, var(--line))`
                    : "var(--line)",
                  background: `color-mix(in oklab, ${hue} ${open ? "var(--tint)" : "4%"}, var(--bg-elevated))`,
                }}
              >
                <button
                  type="button"
                  className="group flex w-full items-start justify-between gap-4 p-5 text-left sm:p-6"
                  aria-expanded={open}
                  onClick={() => setOpenId(open ? null : role.id)}
                >
                  <div className="flex items-start gap-4">
                    <CompanyLogo monogram={role.monogram} hue={hue} logo={role.logo} />
                    <div>
                      <p className="text-sm text-[var(--fg-muted)]">
                        {role.duration} · {role.location}
                      </p>
                      <h3 className="display mt-1 text-2xl">{role.role}</h3>
                      <p className="mt-1 font-medium" style={{ color: hue }}>
                        {role.company}
                      </p>
                    </div>
                  </div>
                  <ChevronDown
                    className={cn("mt-1 shrink-0 transition-transform duration-300", open && "rotate-180")}
                    size={18}
                    style={{ color: hue }}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {open ? (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="space-y-6 border-t border-[var(--line)] px-5 pb-6 pt-5 sm:px-6">
                        <p className="leading-relaxed text-[var(--fg-muted)]">{role.description}</p>
                        <div>
                          <p className="section-kicker mb-3">Responsibilities</p>
                          <ul className="space-y-2 text-sm text-[var(--fg-muted)]">
                            {role.responsibilities.map((item, i) => (
                              <li key={`${role.id}-r-${i}`} className="flex gap-2">
                                <span
                                  className="mt-2 h-1 w-1 shrink-0 rounded-full"
                                  style={{ background: hue }}
                                />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="section-kicker mb-3">Achievements</p>
                          <ul className="space-y-2 text-sm">
                            {role.achievements.map((item, i) => (
                              <motion.li
                                key={`${role.id}-a-${i}`}
                                className="flex gap-2 rounded-xl border px-3 py-2 text-[var(--fg-muted)]"
                                style={{
                                  borderColor: `color-mix(in oklab, ${hue} 22%, transparent)`,
                                  background: `color-mix(in oklab, ${hue} 7%, transparent)`,
                                }}
                                initial={{ opacity: 0, x: -8 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.08 + i * 0.06 }}
                              >
                                <Sparkles size={13} className="mt-0.5 shrink-0" style={{ color: hue }} />
                                {item}
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {role.technologies.map((tech, i) => (
                            <motion.span
                              key={tech}
                              initial={{ opacity: 0, y: 6 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: i * 0.04 }}
                              className="rounded-full border px-3 py-1 text-xs transition-transform duration-300 hover:-translate-y-0.5"
                              style={{
                                borderColor: `color-mix(in oklab, ${hue} 28%, transparent)`,
                                background: `color-mix(in oklab, ${hue} 8%, transparent)`,
                              }}
                            >
                              {tech}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </article>
            </motion.li>
          );
        })}
        {isOngoing ? (
          <li className="relative h-6" aria-hidden>
            <span className="absolute -left-14 top-0 w-9 text-right text-xs uppercase tracking-[0.16em] text-[var(--fg-subtle)] sm:-left-24 sm:w-14">
              Now
            </span>
            <span className="kicker-dot absolute -left-[0.9375rem] top-1 sm:-left-[2.1875rem]" />
          </li>
        ) : null}
      </ol>

      <EducationBlock />
    </Section>
  );
}

function EducationBlock() {
  return (
    <div className="mt-16">
      <p className="section-kicker mb-6 flex items-center gap-2.5">
        <span className="kicker-dot" aria-hidden />
        Education
      </p>
      <ul className="grid gap-4">
        {profile.education.map((entry, index) => (
          <motion.li
            key={entry.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: index * 0.06 }}
          >
            <article
              className="glow-card flex flex-col gap-4 rounded-[24px] border p-5 sm:flex-row sm:items-start sm:justify-between sm:p-6"
              style={{
                borderColor: "color-mix(in oklab, var(--c6) 26%, var(--line))",
                background: "color-mix(in oklab, var(--c6) var(--tint), var(--bg-elevated))",
              }}
            >
              <div className="flex gap-4">
                <span
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl"
                  style={{
                    background: "color-mix(in oklab, var(--c6) 18%, transparent)",
                    color: "var(--c6)",
                  }}
                >
                  <GraduationCap size={20} strokeWidth={1.75} aria-hidden />
                </span>
                <div>
                  <p className="section-kicker" style={{ color: "var(--c6)" }}>
                    {entry.duration}
                  </p>
                  <h3 className="display mt-2 text-xl sm:text-2xl">{entry.degree}</h3>
                  <p className="mt-2 max-w-xl leading-relaxed text-[var(--fg-muted)]">
                    {entry.institution}
                  </p>
                </div>
              </div>
              <p
                className="shrink-0 self-start rounded-full border px-3 py-1.5 text-sm font-medium"
                style={{
                  borderColor: "color-mix(in oklab, var(--c6) 30%, transparent)",
                  color: "var(--c6)",
                }}
              >
                {entry.detail}
              </p>
            </article>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
