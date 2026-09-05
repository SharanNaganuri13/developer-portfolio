import Link from "next/link";
import type { Metadata } from "next";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: `Resume — ${profile.name}`,
  description: `Printable resume for ${profile.name}.`,
};

export default function ResumePage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16 text-[var(--fg)]">
      <p className="section-kicker mb-3">Resume</p>
      <h1 className="display text-5xl">{profile.name}</h1>
      <p className="mt-2 text-[var(--fg-muted)]">
        {profile.role} · {profile.location}
      </p>
      <p className="mt-6 leading-relaxed">{profile.shortBio}</p>
      <p className="mt-4 text-sm">
        <a href={`mailto:${profile.email}`}>{profile.email}</a>
        {" · "}
        <a href={profile.linkedIn}>LinkedIn</a>
      </p>

      <p className="mt-8">
        <a
          href={profile.resumeHref}
          download
          className="inline-flex items-center gap-2 rounded-full bg-[var(--fg)] px-5 py-2.5 text-sm font-medium text-[var(--bg)]"
        >
          Download PDF
        </a>
      </p>

      <section className="mt-12">
        <h2 className="display text-2xl">Experience</h2>
        <ul className="mt-6 space-y-8">
          {profile.experience.map((role) => (
            <li key={role.id}>
              <h3 className="text-lg font-medium">
                {role.role} — {role.company}
              </h3>
              <p className="text-sm text-[var(--fg-muted)]">
                {role.duration} · {role.location}
              </p>
              <p className="mt-2 text-sm">{role.description}</p>
              <ul className="mt-2 list-disc pl-5 text-sm text-[var(--fg-muted)]">
                {role.responsibilities.map((item, i) => (
                  <li key={`${role.id}-rr-${i}`}>{item}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="display text-2xl">Education</h2>
        <ul className="mt-6 space-y-4">
          {profile.education.map((entry) => (
            <li key={entry.id}>
              <h3 className="text-lg font-medium">{entry.degree}</h3>
              <p className="text-sm text-[var(--fg-muted)]">
                {entry.institution} · {entry.duration} · {entry.detail}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="display text-2xl">Certifications</h2>
        <ul className="mt-6 space-y-2 text-sm text-[var(--fg-muted)]">
          {profile.achievements.map((item) => (
            <li key={item.id}>
              {item.title} — {item.issuer}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="display text-2xl">Skills</h2>
        <p className="mt-4 text-sm text-[var(--fg-muted)]">
          {profile.skills.map((skill) => skill.name).join(" · ")}
        </p>
      </section>

      <p className="mt-16">
        <Link href="/" className="text-sm underline">
          ← Back to portfolio
        </Link>
      </p>
    </main>
  );
}
