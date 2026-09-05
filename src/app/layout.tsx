const basePath =
  process.env.NODE_ENV === "production"
    ? "/developer-portfolio"
    : "";

import type { Metadata, Viewport } from "next";
import { DM_Sans, Newsreader, Syne } from "next/font/google";
import { profile } from "@/data/profile";
import { Providers } from "@/components/Providers";
import { getSiteUrl, getSiteUrlOrLocal } from "@/utils/site";
import { THEME_COLOR } from "@/utils/theme";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

const dm = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: getSiteUrlOrLocal(),
  title: profile.seo.title,
  description: profile.seo.description,
  applicationName: profile.name,
  authors: [{ name: profile.name }],
  creator: profile.name,
  keywords: [profile.role, "software engineer", "portfolio", "TypeScript", "Java", "React"],
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    title: profile.seo.title,
    description: profile.seo.description,
    ...(getSiteUrl() ? { url: getSiteUrl()?.href } : {}),
    siteName: profile.name,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: profile.seo.title,
    description: profile.seo.description,
    creator: profile.seo.twitterHandle,
  },
 icons: { icon: `${basePath}/favicon.svg`},
};

export const viewport: Viewport = {
  themeColor: THEME_COLOR.dark,
  width: "device-width",
  initialScale: 1,
};

const themeScript = `
(function() {
  try {
    var t = localStorage.getItem('theme');
    var dark = t !== 'light';
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', dark ? '${THEME_COLOR.dark}' : '${THEME_COLOR.light}');
  } catch (e) {
    document.documentElement.dataset.theme = 'dark';
  }
})();
`;

function personJsonLd(): Record<string, unknown> {
  // Absolute URLs are only emitted once the site actually has a domain.
  const site = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.role,
    email: `mailto:${profile.email}`,
    ...(site ? { url: site.href } : {}),
    sameAs: [profile.linkedIn],
    ...(site ? { image: new URL(profile.photo.src, site).href } : {}),
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bengaluru",
      addressRegion: "Karnataka",
      addressCountry: "IN",
    },
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <body className={`${syne.variable} ${dm.variable} ${newsreader.variable} antialiased`}>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd()) }}
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
