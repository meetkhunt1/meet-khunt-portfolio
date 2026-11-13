/**
 * Routes that exist outside the blog. When a new non-blog page is added,
 * add it here.
 *
 * SITE_ROUTES is every page that exists: the blog's build-time link checker
 * uses it, so an article can link to any real page (case studies included).
 * INDEXED_ROUTES is the subset that goes in the sitemap. Case studies
 * (/projects/<slug>/) are deliberately left out: they are `noindex`, and
 * /projects/ plus its filter pages are what search engines should list.
 */

import { CC_PATH } from "@/lib/checkout-champ";
import { PROJECTS, WORK_CATEGORIES } from "@/lib/data";

export const INDEXED_ROUTES: string[] = [
  "/",
  "/projects/",
  ...Object.values(WORK_CATEGORIES).map((c) => `/projects/${c.slug}/`),
  CC_PATH,
  "/d2c/",
];

export const SITE_ROUTES: string[] = [
  ...INDEXED_ROUTES,
  ...PROJECTS.map((p) => `/projects/${p.slug}/`),
];
