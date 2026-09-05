"use client";

import { motion } from "motion/react";
import { Award, BookOpen, ShieldCheck } from "lucide-react";
import { profile } from "@/data/profile";
import { Section } from "@/components/ui/Section";
import type { AchievementKind } from "@/types/profile";

const KIND_STYLE: Record<AchievementKind, { hue: string; Icon: typeof Award }> = {
  Certification: { hue: "var(--c3)", Icon: ShieldCheck },
  Course: { hue: "var(--c1)", Icon: BookOpen },
  Award: { hue: "var(--c4)", Icon: Award },
};

export function Achievements() {
  return (
    <Section id="achievements" index="05" eyebrow="Recognition" title="Credentials, kept honest.">
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {profile.achievements.map((item, index) => {
          const { hue, Icon } = KIND_STYLE[item.kind];
          return (
            <motion.li
              key={item.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ delay: index * 0.06 }}
            >
              <article
                className="glow-card h-full rounded-[24px] border p-6 transition-transform duration-300 hover:-translate-y-1"
                style={{
                  borderColor: `color-mix(in oklab, ${hue} 26%, var(--line))`,
                  background: `color-mix(in oklab, ${hue} var(--tint), var(--bg-elevated))`,
                }}
              >
                <div className="flex items-center gap-2" style={{ color: hue }}>
                  <Icon size={15} />
                  <p className="section-kicker" style={{ color: hue }}>
                    {item.kind}
                  </p>
                </div>
                <h3 className="display mt-4 text-2xl">{item.title}</h3>
                <p className="mt-2 text-sm" style={{ color: hue }}>
                  {item.year ? `${item.issuer} · ${item.year}` : item.issuer}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-[var(--fg-muted)]">{item.summary}</p>
              </article>
            </motion.li>
          );
        })}
      </ul>
    </Section>
  );
}
