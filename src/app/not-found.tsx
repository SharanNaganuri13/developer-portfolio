import Link from "next/link";
import { profile } from "@/data/profile";

export default function NotFound() {
  return (
    <main className="relative flex min-h-svh flex-col items-center justify-center px-6 py-24 text-center">
      <div className="pointer-events-none absolute inset-0 grid-bg" aria-hidden />

      <p className="section-kicker flex items-center gap-2.5">
        <span className="kicker-dot" aria-hidden />
        Error 404
      </p>

      <p className="display text-gradient mt-6 text-[5rem] leading-none sm:text-[8rem]">404</p>

      <h1 className="display mt-4 text-3xl sm:text-5xl">Wrong lobby.</h1>

      <p className="serif mt-6 max-w-md text-lg leading-relaxed text-[var(--fg-muted)]">
        This route does not exist — no page, no handler, no respawn point. Let us get you back to
        something that actually ships.
      </p>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="btn-gradient inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium shadow-[0_8px_30px_-8px_var(--c1)]"
        >
          Back to home
        </Link>
        <Link
          href="/#projects"
          className="glow-card inline-flex items-center gap-2 rounded-full border border-[var(--line-strong)] px-5 py-2.5 text-sm transition-colors hover:text-[var(--c1)]"
        >
          See the work
        </Link>
      </div>

      <p className="mt-12 text-xs uppercase tracking-[0.16em] text-[var(--fg-subtle)]">
        {profile.name} · {profile.role}
      </p>
    </main>
  );
}
