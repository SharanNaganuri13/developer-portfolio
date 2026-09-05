"use client";

import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

type Props = {
  id: string;
  index: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
  className?: string;
};

export function Section({ id, index, eyebrow, title, children, className }: Props) {
  return (
    <section
      id={id}
      className={cn(
        "relative px-5 py-24 sm:px-8 sm:py-32 lg:px-12",
        // Anchor links target the section box, whose top padding sits well above
        // the heading. Offset that padding so a nav click lands the heading just
        // below the navbar instead of parking it mid-viewport.
        "scroll-mt-[-0.25rem] sm:scroll-mt-[-2.25rem]",
        className,
      )}
    >
      <hr className="rule-gradient absolute inset-x-0 top-0" aria-hidden />
      <div className="mx-auto max-w-6xl">
        <header className="mb-14 flex flex-col gap-5 sm:mb-20 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="section-kicker mb-4 flex items-center gap-2.5">
              <span className="kicker-dot" aria-hidden />
              {index} — {eyebrow}
            </p>
            <h2 className="display max-w-2xl text-4xl sm:text-5xl lg:text-[3.5rem]">{title}</h2>
          </div>
        </header>
        {children}
      </div>
    </section>
  );
}
