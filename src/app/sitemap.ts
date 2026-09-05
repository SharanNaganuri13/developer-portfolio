import type { MetadataRoute } from "next";
import { getSiteUrlOrLocal } from "@/utils/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const host = getSiteUrlOrLocal().origin;
  return [
    {
      url: host,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
