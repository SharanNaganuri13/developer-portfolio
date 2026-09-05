/**
 * Generates src/data/techLogos.ts from the simple-icons package.
 * Run with: node scripts/generate-tech-logos.cjs
 *
 * Paths are vendored into the repo so the 3,400-icon package stays a
 * devDependency and never reaches the client bundle.
 */
const fs = require("node:fs");
const path = require("node:path");

const root = path.join(process.cwd(), "node_modules", "simple-icons");
const pkg = JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf8"));
const meta = JSON.parse(fs.readFileSync(path.join(root, "data", "simple-icons.json"), "utf8"));
const list = Array.isArray(meta) ? meta : meta.icons;

const bySlug = new Map(list.map((icon) => [icon.slug, icon]));

/**
 * Logo key -> simple-icons slug.
 *
 * Most keys are skill ids from profile.ts. The trailing group covers
 * technologies that only appear on project tech tags, not in the skills list.
 */
const MAP = {
  java: "openjdk",
  typescript: "typescript",
  javascript: "javascript",
  angular: "angular",
  html: "html5",
  css: "css",
  "angular-material": "materialdesign",
  bootstrap: "bootstrap",
  spring: "springboot",
  "spring-security": "springsecurity",
  jpa: "hibernate",
  jwt: "jsonwebtokens",
  kafka: "apachekafka",
  redis: "redis",
  mysql: "mysql",
  gcp: "googlecloud",
  docker: "docker",
  git: "git",
  maven: "apachemaven",
  postman: "postman",
  bitbucket: "bitbucket",
  gemini: "googlegemini",
  mcp: "modelcontextprotocol",

  // Project-tag only (this portfolio's own stack).
  nextjs: "nextdotjs",
  react: "react",
  tailwind: "tailwindcss",
};

const channels = (hex) => {
  const n = parseInt(hex, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};

const toHex = (rgb) =>
  rgb.map((v) => Math.round(Math.max(0, Math.min(255, v))).toString(16).padStart(2, "0")).join("");

const luminance = (hex) => {
  const [r, g, b] = channels(hex).map((v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

const mix = (hex, target, amount) => {
  const a = channels(hex);
  const b = channels(target);
  return toHex(a.map((v, i) => v + (b[i] - v) * amount));
};

const SITE_FG = "F3EFE8";

const extractPath = (slug) => {
  const svg = fs.readFileSync(path.join(root, "icons", `${slug}.svg`), "utf8");
  const matches = [...svg.matchAll(/<path[^>]*\sd="([^"]+)"/g)].map((m) => m[1]);
  if (matches.length === 0) throw new Error(`no path found in ${slug}.svg`);
  return matches.join(" ");
};

const entries = [];
const missing = [];

for (const [skillId, slug] of Object.entries(MAP)) {
  const icon = bySlug.get(slug);
  if (!icon) {
    missing.push(`${skillId} -> ${slug}`);
    continue;
  }

  const hex = icon.hex;
  const lum = luminance(hex);

  // Black-ish marks invert to the site foreground on dark backgrounds.
  const onDark = lum < 0.18 ? SITE_FG : hex;
  // Very light marks (JavaScript yellow) need darkening on the cream background.
  const onLight = lum > 0.65 ? mix(hex, "000000", 0.4) : hex;

  entries.push({
    skillId,
    slug,
    title: icon.title,
    onDark: `#${onDark}`,
    onLight: `#${onLight}`,
    path: extractPath(slug),
  });
}

if (missing.length) {
  console.warn("missing slugs:", missing.join(", "));
}

const body = entries
  .map(
    (e) =>
      `  "${e.skillId}": {\n` +
      `    title: ${JSON.stringify(e.title)},\n` +
      `    onLight: "${e.onLight}",\n` +
      `    onDark: "${e.onDark}",\n` +
      `    path: ${JSON.stringify(e.path)},\n` +
      `  },`,
  )
  .join("\n");

const out = `/**
 * Brand logo paths, generated — do not edit by hand.
 * Regenerate with: node scripts/generate-tech-logos.cjs
 *
 * Source: simple-icons v${pkg.version} (CC0-1.0, public domain).
 * Each mark remains the trademark of its respective owner and is used here
 * only to identify the technology.
 *
 * onLight / onDark carry contrast-corrected colors: black marks invert to the
 * site foreground on dark backgrounds, and very light marks are darkened for
 * the cream background.
 */

export type TechLogo = {
  title: string;
  onLight: string;
  onDark: string;
  /** Single 24x24 viewBox path. */
  path: string;
};

export const techLogos: Record<string, TechLogo> = {
${body}
};
`;

const target = path.join(process.cwd(), "src", "data", "techLogos.ts");
fs.writeFileSync(target, out, "utf8");
console.log(`wrote ${entries.length} logos to src/data/techLogos.ts`);
