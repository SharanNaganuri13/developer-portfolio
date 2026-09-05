import Link from "next/link";
import { profile } from "@/data/profile";

export function Footer() {
  return (
    <footer className="border-t border-[var(--line)] px-5 py-14 sm:px-8 sm:py-16 lg:px-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="display text-lg">{profile.initials}</p>
          <p className="mt-1 text-xs text-[var(--fg-subtle)]">
            Designed and built in Bengaluru. No templates involved.
          </p>
        </div>

        <nav aria-label="Footer" className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-[var(--fg-muted)]">
          <Link href="/resume" className="hover:text-[var(--fg)]">
            Resume
          </Link>
          <a href={profile.linkedIn} className="hover:text-[var(--fg)]">
            LinkedIn
          </a>
          <a href={`mailto:${profile.email}`} className="hover:text-[var(--fg)]">
            Email
          </a>
        </nav>

        <p className="text-sm text-[var(--fg-muted)]">
          © {new Date().getFullYear()} {profile.name}
        </p>
      </div>
    </footer>
  );
}
