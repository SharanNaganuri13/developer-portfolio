"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, Check, Copy, Download } from "lucide-react";
import { profile } from "@/data/profile";
import { Section } from "@/components/ui/Section";
import { Magnetic } from "@/components/ui/Magnetic";
import { LinkedInIcon } from "@/components/ui/LinkedInIcon";
import { GmailIcon, GoogleMapsIcon } from "@/components/ui/BrandIcons";

const MAILTO = `mailto:${profile.email}?subject=${encodeURIComponent(
  "Hello Sharan — Java / Full Stack role",
)}`;

const CHANNELS = [
  {
    id: "email",
    hue: "var(--c1)",
    label: "Email",
    value: profile.email,
    href: MAILTO,
    hint: "Best for roles and detailed notes",
    Icon: GmailIcon,
  },
  {
    id: "linkedin",
    hue: "var(--c6)",
    label: "LinkedIn",
    value: "Message on LinkedIn",
    href: profile.linkedIn,
    hint: "Quick intros and recruiter notes",
    Icon: LinkedInGlyph,
  },
  {
    id: "location",
    hue: "var(--c4)",
    label: "Based in",
    value: profile.location,
    href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(profile.location)}`,
    hint: "Open to roles in Bengaluru",
    Icon: GoogleMapsIcon,
  },
] as const;

function LinkedInGlyph({ size = 18 }: { size?: number }) {
  return <LinkedInIcon size={size} />;
}

export function Contact() {
  return (
    <Section
      id="contact"
      index="06"
      eyebrow="Contact"
      title="Have an idea? Let's build something great."
      className="pb-44 sm:pb-64"
    >
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-end">
        <div>
          <p
            className="inline-flex rounded-full border px-3.5 py-1.5 text-sm"
            style={{
              borderColor: "color-mix(in oklab, var(--c3) 32%, transparent)",
              background: "color-mix(in oklab, var(--c3) 10%, transparent)",
              color: "var(--c3)",
            }}
          >
            {profile.availability}
          </p>
          <p className="serif mt-6 max-w-xl text-xl leading-relaxed text-[var(--fg-muted)] sm:text-2xl">
            No contact form, no ticket queue — email lands in an inbox I actually read. Expect a
            reply within a couple of days, sooner if the build is green.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Magnetic>
              <a
                href={MAILTO}
                className="btn-gradient inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium shadow-[0_8px_30px_-8px_var(--c1)]"
              >
                Email me
                <ArrowUpRight size={16} />
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href={profile.linkedIn}
                className="glow-card inline-flex items-center gap-2 rounded-full border border-[var(--line-strong)] px-5 py-2.5 text-sm transition-colors hover:text-[var(--c6)]"
              >
                <LinkedInIcon size={15} />
                LinkedIn
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href={profile.resumeHref}
                download
                className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] px-5 py-2.5 text-sm transition-colors hover:text-[var(--c2)]"
              >
                <Download size={15} />
                Resume
              </a>
            </Magnetic>
          </div>
        </div>

        <CopyEmail />
      </div>

      <ul className="mt-12 grid gap-4 sm:grid-cols-2">
        {CHANNELS.map((channel, index) => {
          const Icon = channel.Icon;
          const inner = (
            <>
              <span
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl"
                style={{
                  background: `color-mix(in oklab, ${channel.hue} 16%, transparent)`,
                  color: channel.hue,
                }}
              >
                <Icon size={18} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="section-kicker" style={{ color: channel.hue }}>
                  {channel.label}
                </span>
                <span className="mt-1 block truncate text-lg">{channel.value}</span>
                <span className="mt-1 block text-sm text-[var(--fg-muted)]">{channel.hint}</span>
              </span>
              {channel.href ? (
                <ArrowUpRight size={16} className="mt-1 shrink-0 text-[var(--fg-subtle)]" aria-hidden />
              ) : null}
            </>
          );

          return (
            <motion.li
              key={channel.id}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: index * 0.05 }}
            >
              {channel.href ? (
                <a
                  href={channel.href}
                  className="glow-card flex h-full items-start gap-4 rounded-[24px] border p-5 transition-transform duration-300 hover:-translate-y-1"
                  style={{
                    borderColor: `color-mix(in oklab, ${channel.hue} 26%, var(--line))`,
                    background: `color-mix(in oklab, ${channel.hue} var(--tint), var(--bg-elevated))`,
                  }}
                >
                  {inner}
                </a>
              ) : (
                <div
                  className="flex h-full items-start gap-4 rounded-[24px] border p-5"
                  style={{
                    borderColor: `color-mix(in oklab, ${channel.hue} 26%, var(--line))`,
                    background: `color-mix(in oklab, ${channel.hue} var(--tint), var(--bg-elevated))`,
                  }}
                >
                  {inner}
                </div>
              )}
            </motion.li>
          );
        })}
      </ul>
    </Section>
  );
}

function CopyEmail() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = MAILTO;
    }
  };

  return (
    <div
      className="glow-card rounded-[28px] border p-6 sm:p-8"
      style={{
        borderColor: "color-mix(in oklab, var(--c1) 28%, var(--line))",
        background: "color-mix(in oklab, var(--c1) var(--tint), var(--bg-elevated))",
      }}
    >
      <p className="section-kicker" style={{ color: "var(--c1)" }}>
        Direct line
      </p>
      <p className="display mt-3 break-all text-2xl sm:text-3xl">{profile.email}</p>
      <p className="mt-3 text-sm text-[var(--fg-muted)]">
        Prefer not to open a mail client? Copy the address and paste it wherever you write.
      </p>
      <button
        type="button"
        onClick={copy}
        className="mt-6 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors hover:border-[var(--c1)]"
        style={{
          borderColor: "color-mix(in oklab, var(--c1) 30%, transparent)",
          color: "var(--c1)",
        }}
      >
        {copied ? <Check size={15} /> : <Copy size={15} />}
        {copied ? "Copied" : "Copy email"}
      </button>
      <p className="sr-only" role="status" aria-live="polite">
        {copied ? "Email address copied to clipboard." : ""}
      </p>
    </div>
  );
}
