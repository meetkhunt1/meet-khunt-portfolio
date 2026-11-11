/**
 * Content for the /checkout-champ-developer/ service page.
 *
 * Checkout Champ is one specialised service, not the site's positioning — so
 * this page owns its copy here and leaves SITE / HERO / SERVICES untouched.
 * Every string maps to one slot on the page, so copy can be edited without
 * touching markup.
 *
 * Ground rules for anything added here: no invented results, conversion
 * figures, testimonials, ratings or URLs. If a claim can't be backed by a
 * shipped project, it doesn't go on the page.
 */

import { PROJECTS } from "@/lib/data";

export const CC_PATH = "/checkout-champ-developer/";

export const CC_META = {
  title:
    "Checkout Champ Developer | Custom Funnels & Integrations – Meet Khunt",
  description:
    "Hire Meet Khunt for Checkout Champ funnel development, custom checkout pages, advertorials, upsells, Shopify integrations, and technical support.",
  /**
   * 1200x630 PNG served as a plain static file — same reasoning as the /d2c
   * OG image: the `opengraph-image` route convention emits an extensionless
   * file under `output: "export"`, which some crawlers fetch unreliably.
   */
  ogImage: "/og/checkout-champ-og.png",
  ogImageAlt:
    "Checkout Champ Developer — custom funnels, checkout pages and integrations by Meet Khunt",
};

/* ------------------------------------------------------------------ Hero */

export const CC_HERO = {
  eyebrow: "Checkout Champ Development",
  headline: "Checkout Champ Developer for High-Converting eCommerce Funnels",
  description:
    "I’m Meet Khunt, a developer specializing in custom Checkout Champ funnels, advertorials, listicles, checkout pages, upsells, and integrations. I help DTC brands and marketing agencies build, customize, and maintain conversion-focused eCommerce experiences.",
  ctaPrimary: "Hire Me",
  ctaSecondary: "Explore My Work",
  /** Breadcrumb trail shown above the eyebrow and mirrored in JSON-LD. */
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "Checkout Champ Developer", href: CC_PATH },
  ],
};

/**
 * Hero infographic: the storefront customers see (Shopify) is the tip; the
 * funnel and checkout infrastructure (Checkout Champ) is what sits below it.
 * Labels are rendered as real text, so they stay readable and crawlable.
 */
export const CC_ICEBERG = {
  headline: "Your Storefront Is Only the Tip of the Iceberg.",
  supporting:
    "Behind every smooth buying experience is a connected system of funnels, checkout flows, offers, and tracking.",
  above: {
    label: "Above the water",
    platform: "Shopify",
    items: ["Online Store", "Product Pages", "Collections", "Brand Experience"],
  },
  below: {
    label: "Below the water",
    platform: "Checkout Champ",
    items: [
      "Landing Pages & Sales Funnels",
      "Checkout & Order Processing",
      "Upsells & Downsells",
      "Subscription Offers",
      "Payment Configuration",
      "Tracking & Conversion Events",
    ],
  },
  connector: "One connected buying journey",
};

/**
 * A standalone, quotable summary of who Meet is and what this service covers.
 * Written to read correctly when lifted out of the page on its own (search
 * snippets, AI answers), so it names the person, the platform and the client
 * types explicitly rather than leaning on surrounding context.
 */
export const CC_INTRO = {
  label: "In short",
  text: "Meet Khunt is an ecommerce frontend developer who builds and customizes Checkout Champ funnels for DTC brands and marketing agencies. His Checkout Champ work covers advertorials, listicles, sales pages, checkout pages, one-click upsells and downsells, thank-you pages, custom HTML, CSS and JavaScript, and Shopify integration support. He also builds Shopify storefronts and landing pages, and works with clients worldwide.",
};

/* -------------------------------------------------------------- Services */

export const CC_SERVICES = {
  heading: "Checkout Champ Development Services",
  description:
    "From complete funnel builds to custom integrations and troubleshooting, I help businesses get more flexibility from Checkout Champ.",
  items: [
    {
      title: "Complete Funnel Development",
      text: "Advertorials, listicles, lead pages, product pages, checkout pages, upsells, downsells, and thank-you pages — built as one connected flow.",
    },
    {
      title: "Custom Page Development",
      text: "Custom HTML, CSS, and JavaScript implementation for Checkout Champ pages when the standard page builder can’t produce the design or behaviour you need.",
    },
    {
      title: "Checkout Customization",
      text: "Checkout layouts, product and quantity selections, order bumps, and purchase-flow customization that stays tied to your configured products.",
    },
    {
      title: "Upsells & Downsells",
      text: "Post-purchase offers, one-click upsells, and conditional funnel flows where Checkout Champ supports them.",
    },
    {
      title: "Shopify & API Integrations",
      text: "Checkout Champ and Shopify integration setup, troubleshooting, and API-related development.",
    },
    {
      title: "Bug Fixes & Maintenance",
      text: "Fixing broken layouts, JavaScript issues, mobile responsiveness, and funnel functionality on pages that are already live.",
    },
  ],
};

/* ------------------------------------------------------------- Expertise */

export const CC_EXPERTISE = {
  eyebrow: "My Checkout Champ Expertise",
  heading: "More Than Just a Funnel Builder",
  intro: [
    "A Checkout Champ funnel is a chain of pages that all depend on each other: the advertorial has to hand off to the right offer, the checkout has to submit the right products, and each upsell has to know what came before it. Most of the work is making that chain hold together.",
    "I work at the code level as well as in the builder — writing the markup, styles and scripts a page needs, then testing the full path a customer actually takes, on the devices they actually use.",
  ],
  items: [
    {
      title: "Custom frontend development",
      text: "Hand-written HTML, CSS and JavaScript for sections and pages the builder can’t produce, structured so your team can still edit the copy afterwards.",
    },
    {
      title: "Funnel architecture and user flow",
      text: "Mapping the path from presell content to checkout to post-purchase offers, so every step links to the right next page and offer.",
    },
    {
      title: "Responsive page implementation",
      text: "Layouts built mobile-first, since that is where most paid traffic lands, then checked across common phone, tablet and desktop widths.",
    },
    {
      title: "Checkout and product configuration",
      text: "Wiring page elements to the campaign’s configured products, packages and pricing so what the customer selects is what gets submitted.",
    },
    {
      title: "Custom JavaScript functionality",
      text: "Package selectors, quantity and bundle logic, countdowns, dynamic content and other interactive behaviour, written to fail gracefully.",
    },
    {
      title: "Third-party integration troubleshooting",
      text: "Tracing issues between Checkout Champ, Shopify and other connected tools — what was sent, what was received, and where it broke.",
    },
    {
      title: "Conversion-focused implementation",
      text: "Clear hierarchy, readable offers and fast-loading pages. I implement the strategy you or your agency set; I don’t promise conversion numbers.",
    },
    {
      title: "Testing and debugging",
      text: "Walking the full funnel — including test orders where your setup allows — and checking console errors, form behaviour and page-to-page hand-offs.",
    },
  ],
};

/* -------------------------------------------------------------- Projects */

/**
 * A Checkout Champ project card. Kept separate from `Project` in lib/data.ts
 * because these don't have case-study pages yet. When one does, add the
 * project to PROJECTS and set `caseStudySlug` here — the card's CTA only
 * becomes a link once that slug resolves to a real /projects/ page.
 */
export type FunnelProject = {
  /** Stable id, also used as the React key */
  id: string;
  title: string;
  /** Cover screenshot. Optional: without one the card shows the funnel map. */
  image?: { src: string; alt: string; width: number; height: number };
  description: string;
  /** The funnel's pages, in order. Rendered as a step map on the card. */
  funnelSteps?: string[];
  technologies: string[];
  contributions: string[];
  /** Slug of a case study in PROJECTS. Leave unset until the page exists. */
  caseStudySlug?: string;
};

export const CC_PROJECTS = {
  heading: "Checkout Champ Projects I’ve Worked On",
  description:
    "Funnels I’ve built in Checkout Champ, from presell content through checkout and post-purchase offers.",
  /** Shown in place of the CTA while a project has no case-study page. */
  pendingLabel: "Full case study coming soon",
  ctaLabel: "View Case Study",
  items: [
    {
      id: "pelsbarn-sofa-bed",
      title: "Pelsbarn Premium Cozy Sofa Bed",
      description:
        "A multi-step Checkout Champ funnel involving an advertorial, a listicle, a sales page, checkout, two upsells, and a thank-you page.",
      funnelSteps: [
        "Advertorial",
        "Listicle",
        "Sales page",
        "Checkout",
        "Upsell 1",
        "Upsell 2",
        "Thank-you",
      ],
      technologies: ["Checkout Champ", "HTML", "CSS", "JavaScript"],
      contributions: [
        "Built the advertorial and listicle presell pages",
        "Developed the sales page and checkout",
        "Implemented two post-purchase upsell pages",
        "Built the thank-you page and tested the full flow",
      ],
    },
    {
      id: "pelsbarn-calming-chews",
      title: "Pelsbarn Calming Chews",
      description:
        "A Checkout Champ funnel involving multiple stages of the customer purchase journey.",
      technologies: ["Checkout Champ", "HTML", "CSS", "JavaScript"],
      contributions: [
        "Developed funnel pages across the purchase journey",
        "Responsive implementation and cross-device testing",
      ],
    },
  ] satisfies FunnelProject[],
};

/** Resolve a project's case-study URL, or null if that page doesn't exist. */
export function caseStudyHref(project: FunnelProject): string | null {
  if (!project.caseStudySlug) return null;
  const exists = PROJECTS.some((p) => p.slug === project.caseStudySlug);
  return exists ? `/projects/${project.caseStudySlug}/` : null;
}

/** Internal links to existing work that's closest to Checkout Champ funnels. */
export const CC_RELATED = {
  label: "Related funnel work",
  links: [
    {
      label: "Hume Health advertorials built in Funnelish",
      href: "/projects/hume-health/",
    },
    {
      label: "Luma Nutrition advertorials and landing pages",
      href: "/projects/luma-nutrition/",
    },
    { label: "Landing pages and advertorials for D2C brands", href: "/d2c/" },
    { label: "All ecommerce case studies", href: "/projects/" },
  ],
};

/* ------------------------------------------------------------------- Why */

/**
 * Blog articles this page links back to ("Checkout Champ Guides"). List
 * published article slugs; the build fails on a slug that isn't one. While
 * the list is empty the section isn't rendered at all.
 */
export const CC_GUIDES = {
  heading: "Checkout Champ Guides",
  description:
    "Practical write-ups on building, customizing and troubleshooting Checkout Champ funnels.",
  allLabel: "All Checkout Champ articles",
  slugs: [] as string[],
};

export const CC_WHY = {
  heading: "Why Hire Me as Your Checkout Champ Developer?",
  items: [
    {
      title: "Hands-on multi-step funnel experience",
      text: "I’ve built Checkout Champ funnels end to end — advertorial, listicle, sales page, checkout, upsells and thank-you page — not just single pages.",
    },
    {
      title: "Custom code beyond the page builder",
      text: "When a layout or interaction isn’t possible with standard builder elements, I write the HTML, CSS and JavaScript to make it work.",
    },
    {
      title: "eCommerce and DTC background",
      text: "My wider work is Shopify storefronts, product pages and landing pages for DTC brands, so I understand how the funnel fits the rest of the store.",
    },
    {
      title: "Advertorial-to-checkout thinking",
      text: "I build presell content and checkout as one journey, keeping the message, offer and product selection consistent from the first click to the order.",
    },
    {
      title: "Technical investigation",
      text: "For bugs and integration problems I trace the actual cause — scripts, page settings, product configuration or the integration itself — before changing anything.",
    },
    {
      title: "Direct communication",
      text: "You talk to the developer doing the work. No account managers, no hand-offs, and questions get answered by the person who wrote the code.",
    },
  ],
};

/* --------------------------------------------------------------- Process */

export const CC_PROCESS = {
  heading: "How I Work",
  steps: [
    {
      title: "Requirements & Funnel Review",
      text: "Understand the products, existing funnel, integrations, and desired functionality.",
    },
    {
      title: "Development",
      text: "Build or customize the pages and required functionality.",
    },
    {
      title: "Testing & Optimization",
      text: "Test responsiveness, purchase flow, JavaScript behavior, and relevant integrations.",
    },
    {
      title: "Delivery & Support",
      text: "Deliver the implementation and address agreed post-launch issues.",
    },
  ],
};

/* ------------------------------------------------------------------- FAQ */

export const CC_FAQ = {
  heading: "Checkout Champ Development FAQs",
  items: [
    {
      q: "What does a Checkout Champ developer do?",
      a: "A Checkout Champ developer builds and customizes the pages and flows that run on Checkout Champ, the funnel and checkout platform from the team behind Konnektive CRM. That includes presell pages such as advertorials and listicles, sales and checkout pages, upsells and downsells, and the custom code, product configuration and integrations that connect them.",
    },
    {
      q: "Can you build a complete Checkout Champ sales funnel?",
      a: "Yes. I can build the full flow — advertorial or listicle, sales page, checkout, upsells, downsells and thank-you page — and test it end to end. If your offers and products are already configured, I build on that setup; if not, we agree up front what needs configuring and who handles it.",
    },
    {
      q: "Can you create custom advertorials and listicles in Checkout Champ?",
      a: "Yes. I build advertorials and listicles from your copy and design, or from a reference page you want to match, using custom HTML and CSS where the builder’s standard elements aren’t enough. They’re built responsive and linked into the rest of the funnel.",
    },
    {
      q: "Can Checkout Champ integrate with Shopify?",
      a: "Yes. Checkout Champ offers a Shopify integration that brands commonly use to connect their store’s products and orders with their funnels. Exactly what it syncs, and how, depends on your account and the integration’s current options, so I check your setup before promising anything. Where a requirement falls outside the native integration, a custom solution through the available APIs may be possible — I confirm feasibility first rather than assuming it.",
    },
    {
      q: "Can you customize Checkout Champ checkout pages?",
      a: "Yes. I customize checkout layouts, product and package selections, order bumps, form presentation and mobile behaviour. Changes stay connected to your configured products and payment settings, and anything that depends on platform-level behaviour is confirmed before it’s built.",
    },
    {
      q: "Can you fix existing Checkout Champ funnel issues?",
      a: "Yes. Typical fixes include broken layouts, JavaScript errors, pages that misbehave on mobile, incorrect links between funnel steps, and integration problems. I start by reproducing the issue and finding the cause, then fix it and retest the affected part of the flow.",
    },
    {
      q: "Do you work with DTC brands and marketing agencies?",
      a: "Yes, both. I work directly with DTC brands, and with marketing agencies that need development capacity — including white-label work delivered under the agency’s name and process.",
    },
    {
      q: "How much does it cost to hire a Checkout Champ developer?",
      a: "It depends on the scope and complexity. A single bug fix is a much smaller job than a complete multi-step funnel with custom functionality and integrations. Send me the details and I’ll review them and give you a quote for the agreed scope before any work starts.",
    },
    {
      q: "Can you work with clients in US Eastern Time?",
      a: "Yes. I work with clients in different time zones, including the US. We agree on communication channels, update cadence and any overlap for calls at the start of the project.",
    },
    {
      q: "How do I hire you for a Checkout Champ project?",
      a: "Message me on LinkedIn with a short description of the project — what you need built or fixed, a link to your current funnel if there is one, and your timeline. I’ll reply with questions or a proposed scope.",
    },
  ],
};

/* ------------------------------------------------------------- Final CTA */

export const CC_CTA = {
  heading: "Need a Checkout Champ Developer for Your Next Project?",
  description:
    "Whether you’re building a new funnel, customizing an existing checkout, or troubleshooting a technical issue, let’s discuss your project.",
  cta: "Let’s Discuss Your Project",
};
