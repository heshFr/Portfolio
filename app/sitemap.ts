import type { MetadataRoute } from "next";
import { PROJECTS } from "@/content/projects";

const SITE = "https://hetesh.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/work", "/about"];
  const studies = PROJECTS.filter((p) => p.caseStudy).map((p) => `/work/${p.slug}`);
  return [...pages, ...studies].map((path) => ({
    url: `${SITE}${path}`,
    lastModified: new Date("2026-08-27"),
  }));
}
