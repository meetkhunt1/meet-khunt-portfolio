import type { MetadataRoute } from "next";
import { getBlogSitemapEntries } from "@/lib/blog/posts";
import { INDEXED_ROUTES } from "@/lib/routes";
import { absoluteUrl } from "@/lib/schema";

/* Required for `output: "export"`: emitted once at build time as sitemap.xml. */
export const dynamic = "force-static";

/**
 * Every indexable route. Paths carry the trailing slash the site serves
 * (`trailingSlash: true`) so the sitemap matches each page's canonical URL.
 *
 * Blog entries are generated from the articles themselves: published articles
 * (with their real publish/update date), plus /blog/ and each category once
 * it has at least one article. Drafts, empty listings and paginated pages are
 * left out. Non-blog pages come from INDEXED_ROUTES in lib/routes.ts
 * (case studies are noindex and not listed).
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blog = await getBlogSitemapEntries();
  const seen = new Set<string>();
  return [...INDEXED_ROUTES.map((path) => ({ path, lastModified: undefined })), ...blog]
    .filter(({ path }) => !seen.has(path) && seen.add(path))
    .map(({ path, lastModified }) => ({
      url: absoluteUrl(path),
      ...(lastModified ? { lastModified } : {}),
    }));
}
