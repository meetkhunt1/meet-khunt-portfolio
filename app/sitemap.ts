import type { MetadataRoute } from "next";
import { PROJECTS } from "@/lib/data";
import { CC_PATH } from "@/lib/checkout-champ";
import { absoluteUrl } from "@/lib/schema";

/* Required for `output: "export"`: emitted once at build time as sitemap.xml. */
export const dynamic = "force-static";

/**
 * Every indexable route. Paths carry the trailing slash the site serves
 * (`trailingSlash: true`) so the sitemap matches each page's canonical URL.
 * New routes (case studies are picked up automatically) belong here.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    "/projects/",
    ...PROJECTS.map((p) => `/projects/${p.slug}/`),
    CC_PATH,
    "/d2c/",
  ];
  return paths.map((path) => ({ url: absoluteUrl(path) }));
}
