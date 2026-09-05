"use client";

import { ThemeProvider } from "@/hooks/useTheme";
import { Loader } from "@/components/Loader";
import { CustomCursor } from "@/components/CustomCursor";
import { EasterEgg } from "@/components/EasterEgg";
import { ScrollProgress } from "@/components/ScrollProgress";
import { AmbientBackground } from "@/components/AmbientBackground";
import type { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <Loader>
        <a
          href="#home"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[90] focus:rounded-full focus:bg-[var(--bg-elevated)] focus:px-4 focus:py-2"
        >
          Skip to content
        </a>
        <AmbientBackground />
        <div className="noise" aria-hidden />
        <ScrollProgress />
        <CustomCursor />
        <EasterEgg />
        {children}
      </Loader>
    </ThemeProvider>
  );
}
