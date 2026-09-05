import type { MetadataRoute } from "next";
import { getSiteUrlOrLocal } from "@/utils/site";

export default function robots(): MetadataRoute.Robots {
  const host = getSiteUrlOrLocal().origin;
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${host}/sitemap.xml`,
    host,
  };
}
