"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { profile, skillCategories } from "@/data/profile";
import { Section } from "@/components/ui/Section";
import { TechIcon } from "@/components/ui/TechIcon";
import { cn } from "@/utils/cn";
import type { Skill, SkillCategory } from "@/types/profile";

const CATEGORY_HUE: Record<SkillCategory, string> = {
  Languages: "var(--c1)",
  Frontend: "var(--c2)",
  Backend: "var(--c3)",
  Database: "var(--c4)",
  "Cloud / DevOps": "var(--c6)",
  "AI / Automation": "var(--c5)",
};

export function Skills() {
  const [active, setActive] = useState<Skill | null>(null);

  const grouped = useMemo(
    () =>
      skillCategories.map((category) => ({
        category,
        hue: CATEGORY_HUE[category],
        items: profile.skills.filter((skill) => skill.category === category),
      })),
    [],
  );

  const related = active
    ? profile.projects.filter((project) => active.relatedProjectIds.includes(project.id))
    : [];
  const activeHue = active ? CATEGORY_HUE[active.category] : "var(--c1)";

  return (
    <Section id="skills" index="03" eyebrow="Skills" title="A working set, not a scoreboard.">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.75fr)]">
        <div className="space-y-8">
          {grouped.map((group) => (
            <div key={group.category}>
              <p className="section-kicker mb-3 flex items-center gap-2">
                <span
                  aria-hidden
                  className="inline-block h-2 w-2 rounded-full"
                  style={{ background: group.hue }}
                />
                {group.category}
              </p>
              <div className="flex flex-wrap gap-2">
                {group.items.map((skill, i) => {
                  const selected = active?.id === skill.id;
                  return (
                    <motion.button
                      key={skill.id}
                      type="button"
                      onClick={() => setActive(selected ? null : skill)}
                      aria-pressed={selected}
                      initial={{ opacity: 0, y: 10, scale: 0.96 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      viewport={{ once: true, amount: 0.6 }}
                      transition={{ delay: i * 0.03, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className={cn(
                        "group flex items-center gap-2.5 rounded-full border py-2 pl-2.5 pr-4 text-sm transition-all duration-300 hover:-translate-y-0.5",
                        selected && "font-medium",
                      )}
                      style={
                        selected
                          ? {
                              borderColor: group.hue,
                              background: `color-mix(in oklab, ${group.hue} 18%, var(--bg-elevated))`,
                              color: group.hue,
                              boxShadow: `0 6px 22px -10px ${group.hue}`,
                            }
                          : {
                              borderColor: `color-mix(in oklab, ${group.hue} 28%, transparent)`,
                              background: `color-mix(in oklab, ${group.hue} 5%, transparent)`,
                            }
                      }
                    >
                      <span
                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110"
                        style={{
                          // Neutral plate so brand colors read true; the category
                          // hue still comes through the chip border and background.
                          background: `color-mix(in oklab, var(--fg) ${selected ? "14%" : "8%"}, transparent)`,
                          color: group.hue,
                        }}
                      >
                        <TechIcon skillId={skill.id} size={15} />
                      </span>
                      {skill.name}
                    </motion.button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <aside
          className="glow-card min-h-[220px] rounded-[24px] border p-6 transition-colors duration-500"
          style={{
            borderColor: `color-mix(in oklab, ${activeHue} 30%, var(--line))`,
            background: `color-mix(in oklab, ${activeHue} var(--tint), var(--bg-elevated))`,
          }}
        >
          <AnimatePresence mode="wait">
            {active ? (
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
              >
                <motion.span
                  className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl"
                  style={{
                    background: "color-mix(in oklab, var(--fg) 10%, transparent)",
                    color: activeHue,
                  }}
                  initial={{ scale: 0.7, rotate: -12 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 320, damping: 20 }}
                >
                  <TechIcon skillId={active.id} size={24} />
                </motion.span>
                <p className="section-kicker" style={{ color: activeHue }}>
                  {active.category}
                </p>
                <h3 className="display mt-2 text-3xl">{active.name}</h3>
                <p className="mt-4 text-sm leading-relaxed text-[var(--fg-muted)]">{active.usage}</p>
                <p className="section-kicker mt-6 mb-3">Related projects</p>
                <ul className="space-y-2 text-sm">
                  {related.length === 0 ? (
                    <li className="text-[var(--fg-muted)]">No linked projects yet.</li>
                  ) : (
                    related.map((project) => (
                      <li key={project.id}>
                        <a href="#projects" className="transition-colors hover:opacity-70" style={{ color: activeHue }}>
                          {project.name}
                        </a>
                      </li>
                    ))
                  )}
                </ul>
              </motion.div>
            ) : (
              <motion.p
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="serif text-xl text-[var(--fg-muted)]"
              >
                Pick a technology. I will tell you where it earned its place — no percentage bars,
                no scores out of ten.
              </motion.p>
            )}
          </AnimatePresence>
        </aside>
      </div>
    </Section>
  );
}
