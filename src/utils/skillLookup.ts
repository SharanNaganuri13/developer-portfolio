import { profile } from "@/data/profile";

/** Project tech labels that do not match a skill name exactly. */
const ALIASES: Record<string, string> = {
  gcp: "gcp",
  "gcp cloud run": "gcp",
  jwt: "jwt",
  oauth2: "jwt",
  "jwt / oauth2": "jwt",
  gemini: "gemini",
  "gemini 1.5 flash api": "gemini",
  "openai api": "gemini",
  hibernate: "jpa",
  "jpa / hibernate": "jpa",

  // This portfolio's own stack — logo keys, not skills.
  "next.js": "nextjs",
  nextjs: "nextjs",
  react: "react",
  "tailwind css": "tailwind",
  tailwindcss: "tailwind",
};

export function skillIdForTech(label: string): string | undefined {
  const key = label.trim().toLowerCase();
  const aliased = ALIASES[key];
  if (aliased) return aliased;

  const exact = profile.skills.find((skill) => skill.name.toLowerCase() === key);
  if (exact) return exact.id;

  return undefined;
}
