/**
 * Blog configuration — the single source for categories, authors and the
 * service calls-to-action that articles can show.
 *
 * Client-safe: no filesystem access here, so components of any kind can
 * import it. Article loading and validation live in lib/blog/posts.ts.
 *
 * Adding a category: add an entry below. Its listing page, metadata, sitemap
 * entry and filter link are all generated from this list.
 */

import { CC_PATH } from "@/lib/checkout-champ";
import { ABOUT, CONTACT } from "@/lib/data";

export const BLOG_PATH = "/blog/";

/** Articles per listing page, after the featured article. */
export const PAGE_SIZE = 9;

/**
 * Article slugs that would collide with sibling routes under /blog/.
 * `category` and `page` are real route segments.
 */
export const RESERVED_SLUGS = ["category", "page"];

export const BLOG = {
  eyebrow: "Insights & Resources",
  heading: "Insights, Tutorials & Development Guides",
  description:
    "Practical guides, technical tutorials, and insights on eCommerce development, Checkout Champ, Shopify, conversion-focused funnels, and modern web development.",
  seoTitle: "Web Development & eCommerce Blog | Meet Khunt",
  seoDescription:
    "Explore practical tutorials and insights on Checkout Champ, Shopify, eCommerce funnels, and web development by Meet Khunt.",
  ogImage: "/og/blog-og.png",
  ogImageAlt: "Insights, tutorials and development guides by Meet Khunt",
  featuredLabel: "Featured",
  allLabel: "All articles",
  /**
   * The card that sits in the article grid, after the fifth article. Brands
   * are real clients, each with a case study on the site.
   */
  ctaCard: {
    heading: "Need this built for your brand?",
    text: "Storefronts, landing pages and Checkout Champ funnels for DTC brands.",
    brandsLabel: "Shipped for",
    brands: ["Hume Health", "Luma Nutrition", "Aavilo", "Baby Gains"],
    label: "Work with me",
  },
};

/* ---------------------------------------------------------- Service CTAs */

export type ServiceCta = {
  heading: string;
  text: string;
  label: string;
  href: string;
  /** Optional checklist shown on the article sidebar card. */
  points?: string[];
};

/**
 * Calls-to-action an article can end with. Every `href` must be a page that
 * exists today — lib/blog/posts.ts checks them against the route list at
 * build time. An article picks one with `cta:` in its frontmatter, or
 * inherits its category's default.
 */
export const SERVICE_CTAS = {
  "checkout-champ": {
    heading: "Need Help With Checkout Champ Development?",
    text: "Looking for custom funnels, checkout customization, or integration support? Explore my Checkout Champ development services.",
    label: "Hire a Checkout Champ Developer",
    href: CC_PATH,
    /* Service titles from the Checkout Champ page (CC_SERVICES). */
    points: [
      "End-to-end funnel builds",
      "Campaign, offer & step-path setup",
      "Subscriptions & recurring billing",
      "Tracking, pixels & A/B tests",
      "QA with live test orders",
    ],
  },
  shopify: {
    heading: "Need a Shopify Developer?",
    text: "I design, build and optimize Shopify storefronts, product pages and landing pages for DTC brands.",
    label: "See my Shopify services",
    href: "/#services",
  },
  "landing-pages": {
    heading: "Need Landing Pages or Advertorials?",
    text: "I build conversion-ready landing pages and advertorials for D2C brands running paid traffic.",
    label: "See how landing pages work",
    href: "/d2c/",
  },
  general: {
    heading: "Working on an eCommerce Project?",
    text: "I build storefronts, landing pages and sales funnels for DTC brands and agencies. Have a look at shipped work, or get in touch.",
    label: "See my case studies",
    href: "/projects/",
  },
} satisfies Record<string, ServiceCta>;

export type ServiceCtaKey = keyof typeof SERVICE_CTAS;

/* ------------------------------------------------------------ Categories */

export type Category = {
  slug: string;
  name: string;
  /** H1 on the category page */
  heading: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
  /** CTA an article in this category shows unless it chooses its own */
  defaultCta: ServiceCtaKey | null;
};

export const CATEGORIES: Category[] = [
  {
    slug: "checkout-champ",
    name: "Checkout Champ",
    heading: "Checkout Champ Guides & Tutorials",
    description:
      "Technical guides, development tutorials, integration troubleshooting, and practical resources for Checkout Champ funnels and eCommerce workflows.",
    seoTitle: "Checkout Champ Guides & Tutorials | Meet Khunt",
    seoDescription:
      "Checkout Champ development guides: building funnels, customizing checkout pages, upsells, Shopify integration and troubleshooting, by Meet Khunt.",
    defaultCta: "checkout-champ",
  },
  {
    slug: "shopify",
    name: "Shopify",
    heading: "Shopify Development Guides",
    description:
      "Practical Shopify guides covering theme development, product and landing pages, store performance and storefront customization.",
    seoTitle: "Shopify Development Guides & Tutorials | Meet Khunt",
    seoDescription:
      "Shopify development tutorials and guides on themes, product pages, landing pages and storefront performance, by Meet Khunt.",
    defaultCta: "shopify",
  },
  {
    slug: "ecommerce-development",
    name: "eCommerce Development",
    heading: "eCommerce Development Insights",
    description:
      "Insights on building eCommerce experiences that sell: sales funnels, product presentation, checkout flows and conversion-focused implementation.",
    seoTitle: "eCommerce Development Articles & Insights | Meet Khunt",
    seoDescription:
      "Articles on eCommerce development, sales funnels, product pages and conversion-focused implementation for DTC brands, by Meet Khunt.",
    defaultCta: "general",
  },
  {
    slug: "web-development",
    name: "Web Development",
    heading: "Web Development Articles",
    description:
      "Frontend and web development articles on HTML, CSS, JavaScript, performance, accessibility and the tools behind modern websites.",
    seoTitle: "Web Development Articles & Tutorials | Meet Khunt",
    seoDescription:
      "Frontend and web development articles covering HTML, CSS, JavaScript, performance and accessibility, by Meet Khunt.",
    defaultCta: "general",
  },
  {
    slug: "tutorials-guides",
    name: "Tutorials & Guides",
    heading: "Tutorials & Step-by-Step Guides",
    description:
      "Step-by-step tutorials and how-to guides for developers, marketers and store owners working on eCommerce sites and funnels.",
    seoTitle: "Development Tutorials & How-To Guides | Meet Khunt",
    seoDescription:
      "Step-by-step development tutorials and how-to guides for eCommerce sites, funnels and storefronts, by Meet Khunt.",
    defaultCta: null,
  },
];

export const categoryBySlug = (slug: string) =>
  CATEGORIES.find((c) => c.slug === slug);

export const categoryPath = (slug: string) => `${BLOG_PATH}category/${slug}/`;
export const postPath = (slug: string) => `${BLOG_PATH}${slug}/`;

/** URL of page `n` of a listing (all articles, or one category). */
export function listingPath(category: string | null, page: number) {
  const base = category ? categoryPath(category) : BLOG_PATH;
  return page <= 1 ? base : `${base}page/${page}/`;
}

/* --------------------------------------------------------------- Authors */

export type Author = {
  key: string;
  name: string;
  /** One line under the name on article cards */
  role: string;
  bio: string;
  /** Where the author name links: the About section on the home page */
  href: string;
  image: string;
  profiles: { label: string; href: string }[];
};

export const AUTHORS: Author[] = [
  {
    key: "meet-khunt",
    name: ABOUT.portraitName,
    role: "Ecommerce Frontend Developer",
    /* Blog-only headshot. The home page keeps its own portrait (ABOUT). */
    image: "/images/blog/authors/meet-khunt.webp",
    bio: "Web Developer specializing in eCommerce development, custom sales funnels, Checkout Champ, Shopify, and frontend development.",
    href: "/#about",
    profiles: [{ label: "LinkedIn", href: CONTACT.href }],
  },
];

/** Frontmatter `author` may be the key ("meet-khunt") or the name. */
export const authorByRef = (ref: string) =>
  AUTHORS.find((a) => a.key === ref || a.name === ref);
