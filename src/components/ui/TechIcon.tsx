"use client";

import {
  Blocks,
  Bot,
  Boxes,
  BrainCircuit,
  Database,
  MessageSquareCode,
  Server,
  Sparkles,
  Webhook,
  type LucideIcon,
} from "lucide-react";
import { techLogos } from "@/data/techLogos";
import { useTheme } from "@/hooks/useTheme";

/**
 * Lucide fallbacks for skills that have no brand mark — either because the
 * concept has no logo (REST, microservices, prompt engineering) or because
 * Simple Icons dropped the mark over trademark claims (Java, Oracle).
 */
const FALLBACK_ICONS: Record<string, LucideIcon> = {
  sql: Database,
  rest: Webhook,
  microservices: Boxes,
  oracle: Server,
  genai: Sparkles,
  prompt: MessageSquareCode,
  agentic: Bot,
  llm: BrainCircuit,
};

const FALLBACK: LucideIcon = Blocks;

type Props = {
  skillId: string;
  size?: number;
  className?: string;
  /** Render in the surrounding text color instead of the brand color. */
  monochrome?: boolean;
};

export function TechIcon({ skillId, size = 18, className, monochrome = false }: Props) {
  const { theme } = useTheme();
  const logo = techLogos[skillId];

  if (logo) {
    return (
      <svg
        role="img"
        aria-label={`${logo.title} logo`}
        viewBox="0 0 24 24"
        width={size}
        height={size}
        className={className}
        fill={monochrome ? "currentColor" : theme === "dark" ? logo.onDark : logo.onLight}
      >
        <path d={logo.path} />
      </svg>
    );
  }

  const Icon = FALLBACK_ICONS[skillId] ?? FALLBACK;
  return <Icon size={size} strokeWidth={1.75} className={className} aria-hidden />;
}
