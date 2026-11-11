/**
 * Structured data (JSON-LD) shared across pages.
 *
 * The Person node has a stable `@id`, so any page can reference Meet with
 * `{ "@id": PERSON_ID }` instead of repeating the whole entity. Only facts the
 * site itself states are included — no ratings, reviews, awards or
 * certifications.
 */

import { ABOUT, FOOTER } from "@/lib/data";

export const SITE_URL = "https://meetkhunt.com";
export const PERSON_ID = `${SITE_URL}/#person`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

/** Absolute URL for a site path ("/foo/" -> "https://meetkhunt.com/foo/"). */
export const absoluteUrl = (path: string) => new URL(path, SITE_URL).toString();

/** Verified professional profiles. Only links already published on the site. */
const SAME_AS = FOOTER.socials
  .map((s) => s.href)
  .filter((href) => href.includes("linkedin.com"));

export function personSchema(knowsAbout: string[] = []) {
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: ABOUT.portraitName,
    jobTitle: ABOUT.portraitRole,
    /* The About section lives on the home page; there is no separate page. */
    url: absoluteUrl("/#about"),
    image: absoluteUrl(ABOUT.portrait),
    sameAs: SAME_AS,
    ...(knowsAbout.length ? { knowsAbout } : {}),
  };
}

export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: `${SITE_URL}/`,
    name: "Meet Khunt",
    publisher: { "@id": PERSON_ID },
  };
}

export function breadcrumbSchema(trail: { label: string; href: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      item: absoluteUrl(item.href),
    })),
  };
}

/** Serialise for a <script type="application/ld+json">, escaping `<`. */
export function jsonLd(graph: object[]) {
  return JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(
    /</g,
    "\\u003c",
  );
}
