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
    "Hire Meet Khunt, a Checkout Champ developer who builds DTC funnels end to end: advertorials, VSL pages, checkouts, upsells, subscriptions, tracking and A/B tests.",
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
    "I’m Meet Khunt. I take a Figma design and approved copy and turn it into a live Checkout Champ funnel — advertorials, VSL pages, quizzes, order forms, checkouts, upsells and subscription offers — with the campaign, offers, step paths and tracking configured, and the whole customer journey tested with real orders before paid traffic hits it.",
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
    /* White-on-transparent file shared with the Tools wall; inked in CSS. */
    logo: { src: "/tools/shopify.webp", width: 500, height: 181 },
    items: ["Online Store", "Product Pages", "Collections", "Brand Experience"],
  },
  below: {
    label: "Below the water",
    platform: "Checkout Champ",
    logo: { src: "/tools/checkout-champ.png", width: 327, height: 65 },
    items: [
      "Advertorials, VSLs & Quizzes",
      "Order Forms & Checkout",
      "Upsells, Downsells & Post-Purchase",
      "Subscription Billing",
      "Campaigns, Offers & Step Paths",
      "Pixels, UTMs & A/B Tests",
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
  text: "Meet Khunt is an ecommerce front-end developer who builds Checkout Champ funnels end to end for DTC brands and agencies. He turns Figma designs and approved copy into HTML, CSS and JavaScript pages — advertorials, landing and VSL pages, quizzes, order forms, checkouts, upsells, downsells and post-purchase offers — and configures the campaigns, offers, step paths and subscription billing inside Checkout Champ. He implements tracking pixels, UTMs and A/B tests, QAs every funnel with live test transactions, and also works in Funnelish, PageFly and Shopify Liquid. He takes on freelance projects, retainers and full-time remote roles.",
};

/* -------------------------------------------------------------- Services */

export const CC_SERVICES = {
  heading: "Checkout Champ Development Services",
  description:
    "Front-end and platform work in one place: I build the pages, configure Checkout Champ behind them, and prove the whole funnel works before it goes live.",
  items: [
    {
      title: "End-to-End Funnel Builds",
      text: "Advertorials, landing pages, VSL pages, quizzes, product pages, order forms, checkouts, upsells, downsells and post-purchase flows — built from your brief as one connected funnel.",
    },
    {
      title: "Figma to Checkout Champ",
      text: "Your Figma design and approved copy built by hand in HTML, CSS and JavaScript: faithful to the design, responsive on every screen, and easy for your team to edit afterwards.",
    },
    {
      title: "Campaign, Offer & Step-Path Setup",
      text: "Campaigns, products, offers and step paths configured inside Checkout Champ, so every page submits the right product and every customer lands on the right next step.",
    },
    {
      title: "Subscriptions & Recurring Billing",
      text: "Subscription offers, billing intervals and subscription pricing set up — then checked with test orders so customers are billed the way the offer says they will be.",
    },
    {
      title: "Tracking, Pixels & A/B Tests",
      text: "Conversion pixels, UTMs and events implemented and verified, and split tests launched with correctly configured variants and tracking on each one.",
    },
    {
      title: "QA, Troubleshooting & Fixes",
      text: "Full-journey QA with live test transactions, root-cause debugging of broken funnels, and clear, reproducible bug reports when platform support needs to be involved.",
    },
  ],
};

/* ------------------------------------------------------------- Expertise */

export const CC_EXPERTISE = {
  eyebrow: "My Checkout Champ Expertise",
  heading: "More Than Just a Funnel Builder",
  intro: [
    "A funnel on paid traffic is a chain where every link matters: the advertorial hands off to the right offer, the order form submits the right product, each upsell knows what came before it, the subscription bills on the right interval, and the pixel fires once per purchase. Most of the work is making that chain hold — and proving it does.",
    "So the job isn’t done when the page looks right. I build the front end, configure the platform behind it, and walk the full customer journey with real test orders before anyone else has to.",
  ],
  items: [
    {
      title: "Building from a brief",
      text: "A Figma design and approved copy are all I need to start. I build original pages for your brand and offer, not copies of someone else’s funnel.",
    },
    {
      title: "HTML, CSS & JavaScript",
      text: "Hand-written markup, styles and scripts for package selectors, quantity and bundle logic, quiz flows, countdowns and anything the builder can’t do on its own.",
    },
    {
      title: "Checkout Champ configuration",
      text: "Campaigns, products, offers and step paths set up so checkout, upsells, downsells and thank-you pages route correctly for every path a customer can take.",
    },
    {
      title: "Subscription billing",
      text: "Subscription offers, billing intervals and pricing configured and verified with test transactions, so rebills match what the customer agreed to.",
    },
    {
      title: "Tracking & attribution",
      text: "Pixels, UTMs and conversion events implemented and checked, and discrepancies traced to the cause instead of patched over.",
    },
    {
      title: "A/B testing",
      text: "Variants for pages, offers, pricing and checkouts configured correctly, with tracking confirmed on each variant and the setup documented.",
    },
    {
      title: "Funnelish, PageFly & Shopify Liquid",
      text: "Comfortable beyond Checkout Champ: funnels in Funnelish, pages in PageFly, and safe edits to Shopify theme files, sections and snippets in Liquid.",
    },
    {
      title: "Full-journey QA",
      text: "Live test transactions that check products and pricing, subscriptions, upsells and downsells, tracking and the resulting order data — before launch, not after.",
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
      title: "Built from your brief, not cloned",
      text: "I build funnels end to end from a Figma design and approved copy. Duplicating and adapting an existing funnel for a new offer is a separate, faster job I also handle.",
    },
    {
      title: "Front end and platform in one person",
      text: "The same person writes the HTML, CSS and JavaScript and configures the campaign, offers, step paths and subscriptions — so nothing gets lost in a hand-off.",
    },
    {
      title: "DTC and health & wellness experience",
      text: "I’ve built advertorials and landing pages for paid traffic, including for health brands such as Hume Health and Luma Nutrition.",
    },
    {
      title: "QA before it reaches QA",
      text: "I test my own work across the full customer journey with live test transactions, not just a visual check of the page.",
    },
    {
      title: "Root causes, not patches",
      text: "When something breaks I find out why — scripts, configuration, tracking or the platform itself — and write clear, reproducible bug reports when support needs to be involved.",
    },
    {
      title: "Freelance or full-time",
      text: "Available for funnel projects, ongoing retainers and full-time remote roles. Either way, you work directly with the developer doing the work.",
    },
  ],
};

/* --------------------------------------------------------------- Process */

export const CC_PROCESS = {
  heading: "How I Work",
  steps: [
    {
      title: "Brief & Funnel Map",
      text: "Figma design, approved copy, products, offers, step paths, subscription terms and tracking requirements — mapped before anything is built.",
    },
    {
      title: "Build & Configure",
      text: "Pages built in HTML, CSS and JavaScript; campaign, offers, upsell paths and subscriptions configured in Checkout Champ; pixels and events implemented.",
    },
    {
      title: "QA the Full Journey",
      text: "Live test transactions covering products and pricing, subscriptions, upsells and downsells, checkout, tracking and the resulting order data.",
    },
    {
      title: "Launch, Test & Iterate",
      text: "Go live on traffic, set up A/B tests with verified tracking, and fix any issue at its root cause.",
    },
  ],
};

/* ------------------------------------------------------------------- FAQ */

export const CC_FAQ = {
  heading: "Checkout Champ Development FAQs",
  items: [
    {
      q: "What does a Checkout Champ developer do?",
      a: "A Checkout Champ developer builds the pages of a funnel and configures the platform behind them. Checkout Champ is the funnel, checkout and CRM platform from the team behind Konnektive CRM. The work covers presell pages such as advertorials and VSL pages, order forms and checkouts, upsells and downsells, and the campaigns, offers, step paths, subscriptions and tracking that connect them.",
    },
    {
      q: "Can you build a complete Checkout Champ funnel from a Figma design?",
      a: "Yes. Give me the Figma design and approved copy and I build every page in HTML, CSS and JavaScript — advertorial, landing or VSL page, quiz, order form, checkout, upsells, downsells and thank-you page — then configure the campaign, offers and step paths so the funnel runs end to end.",
    },
    {
      q: "Do you clone funnels or build them from scratch?",
      a: "Most of my Checkout Champ work is built from a brief: a Figma design and approved copy turned into original pages for your brand and offer. Duplicating and adapting an existing funnel inside Checkout Champ — to launch a new offer, angle or test quickly — is a separate task I also handle. I’m always clear about which of the two a project is.",
    },
    {
      q: "Can you configure campaigns, offers and upsell paths inside Checkout Champ?",
      a: "Yes. I set up campaigns, products, offers and the step paths between checkout, upsells, downsells and the thank-you page, so every page submits the right product and every customer is routed to the right next step.",
    },
    {
      q: "Can you set up subscriptions and recurring billing?",
      a: "Yes. I configure subscription offers, billing intervals and subscription pricing, then confirm with test transactions that customers are billed the way the offer describes.",
    },
    {
      q: "Do you set up tracking, pixels and A/B tests?",
      a: "Yes. I implement conversion pixels, UTMs and events and check that they fire correctly — including on test purchases. For A/B tests I configure the variants, confirm tracking on each one, and document how the test is set up.",
    },
    {
      q: "How do you QA a funnel before launch?",
      a: "I walk the full customer journey with live test transactions: products and pricing, subscriptions, upsells and downsells, the checkout itself, tracking and attribution, and the order and customer data that ends up in the platform. Visual checks across devices are part of it, but they’re not the whole of it.",
    },
    {
      q: "Can Checkout Champ integrate with Shopify?",
      a: "Yes. Checkout Champ offers a Shopify integration that brands commonly use to connect their store’s products and orders with their funnels. Exactly what it syncs depends on your account and the integration’s current options, so I check your setup before promising anything. I also work directly in Shopify — including theme edits in Liquid — when the storefront side needs changes too.",
    },
    {
      q: "Can you fix existing Checkout Champ funnel issues?",
      a: "Yes: broken layouts, JavaScript errors, mobile problems, wrong step paths, tracking that doesn’t fire and integration issues. I reproduce the problem, find the root cause, fix it and retest the affected part of the journey.",
    },
    {
      q: "Are you available for full-time roles as well as projects?",
      a: "Yes. I take on freelance funnel projects and ongoing retainers for DTC brands and agencies, and I’m open to full-time remote roles. Message me with the brief or the role.",
    },
    {
      q: "Can you work with teams in US Eastern Time?",
      a: "Yes. I work with clients and teams in different time zones, including the US. Working hours and overlap with US Eastern Time are agreed up front, whether it’s a project or a full-time role.",
    },
    {
      q: "How much does it cost to hire a Checkout Champ developer?",
      a: "For projects, it depends on scope: a single fix is a much smaller job than a multi-step funnel with subscriptions and A/B tests. Send me the details and I’ll quote the agreed scope before any work starts. For full-time roles, we discuss terms directly.",
    },
  ],
};

/* ------------------------------------------------------------- Final CTA */

export const CC_CTA = {
  heading: "Need a Checkout Champ Developer for Your Funnels?",
  description:
    "Building a new funnel, fixing an existing one, or hiring for a full-time funnel role? Send me the brief and let’s talk.",
  cta: "Let’s Discuss Your Project",
};
