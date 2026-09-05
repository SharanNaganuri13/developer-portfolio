const LOCAL_FALLBACK = "http://localhost:3000";

function rawSiteUrl(): string | undefined {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return explicit;

  // Set automatically on Vercel; harmless elsewhere.
  const platformHost = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (platformHost) return `https://${platformHost}`;

  return undefined;
}

/**
 * The canonical site URL, or `undefined` when the site has no domain yet.
 * Use this when a wrong absolute URL is worse than none (canonical, JSON-LD).
 */
export function getSiteUrl(): URL | undefined {
  const raw = rawSiteUrl();
  if (!raw) return undefined;
  try {
    return new URL(raw);
  } catch {
    return undefined;
  }
}

/**
 * A usable base URL, falling back to localhost.
 * Use this where Next.js requires an absolute base (metadataBase, sitemap).
 */
export function getSiteUrlOrLocal(): URL {
  return getSiteUrl() ?? new URL(LOCAL_FALLBACK);
}
