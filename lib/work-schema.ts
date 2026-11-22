/**
 * Structured data for /projects/ and its filter pages (/projects/shopify/,
 * ...): a CollectionPage whose ItemList names each project on that page, so
 * search and answer engines can read the portfolio as data. Built from the
 * same PROJECTS / UPCOMING_PROJECTS lists the grid renders, so it never
 * drifts from what's on the page. Upcoming work has no page, so it is listed
 * by name only, without a URL.
 */

import {
  PROJECTS,
  UPCOMING_PROJECTS,
  WORK_CATEGORIES,
  WORK_INDEX,
  type WorkFilter,
} from "@/lib/data";
import {
  PERSON_ID,
  WEBSITE_ID,
  absoluteUrl,
  breadcrumbSchema,
  jsonLd,
  personSchema,
  websiteSchema,
} from "@/lib/schema";

export function workSchema(filter?: WorkFilter) {
  const path = filter ? `/projects/${WORK_CATEGORIES[filter].slug}/` : "/projects/";
  const name = filter ? WORK_CATEGORIES[filter].title : WORK_INDEX.title;
  const description = filter ? WORK_CATEGORIES[filter].description : WORK_INDEX.description;
  const inFilter = <T extends { filters: readonly string[] }>(p: T) =>
    !filter || p.filters.includes(filter);

  const items = [
    ...PROJECTS.filter(inFilter).map((p) => ({
      "@type": "CreativeWork",
      name: p.brand,
      headline: p.headline,
      description: p.summary,
      url: absoluteUrl(`/projects/${p.slug}/`),
      creator: { "@id": PERSON_ID },
    })),
    ...UPCOMING_PROJECTS.filter(inFilter).map((p) => ({
      "@type": "CreativeWork",
      name: p.brand,
      description: p.summary,
      creator: { "@id": PERSON_ID },
    })),
  ];

  const trail = [
    { label: "Home", href: "/" },
    { label: "Work", href: "/projects/" },
    ...(filter ? [{ label: filter, href: path }] : []),
  ];

  return jsonLd([
    personSchema(),
    websiteSchema(),
    {
      "@type": "CollectionPage",
      "@id": `${absoluteUrl(path)}#webpage`,
      url: absoluteUrl(path),
      name,
      description,
      isPartOf: { "@id": WEBSITE_ID },
      about: { "@id": PERSON_ID },
      mainEntity: {
        "@type": "ItemList",
        numberOfItems: items.length,
        itemListElement: items.map((item, i) => ({ "@type": "ListItem", position: i + 1, item })),
      },
    },
    breadcrumbSchema(trail),
  ]);
}
