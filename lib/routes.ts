/**
 * Routes that exist outside the blog. Used by the sitemap and by the blog's
 * build-time link checker, so an article can't link to a page that isn't
 * there. When a new non-blog page is added, add it here.
 */

import { CC_PATH } from "@/lib/checkout-champ";
import { PROJECTS, WORK_CATEGORIES } from "@/lib/data";

export const SITE_ROUTES: string[] = [
  "/",
  "/projects/",
  ...Object.values(WORK_CATEGORIES).map((c) => `/projects/${c.slug}/`),
  ...PROJECTS.map((p) => `/projects/${p.slug}/`),
  CC_PATH,
  "/d2c/",
];
