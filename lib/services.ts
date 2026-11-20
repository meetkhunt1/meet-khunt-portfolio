/**
 * Content for the service landing pages (/shopify-developer/, ...), rendered
 * by components/sections/ServiceLanding.tsx. Each page targets one thing a
 * client searches for. Only claims the site can back: every project named
 * here has a case study, and nothing states prices, ratings or results.
 *
 * Adding a page: add an entry below, then a one-line route under app/.
 */

import type { ServiceHeroContent } from "@/components/sections/ServiceHero";

export type ServicePage = {
  path: string;
  meta: { title: string; description: string };
  /** Service name used in structured data and the header menu */
  name: string;
  hero: {
    eyebrow: string;
    headline: string;
    description: string;
    ctaSecondary: { label: string; href: string };
  };
  /** Above-the-fold hero (ServiceHero). `hero` above still feeds metadata. */
  fold: ServiceHeroContent;
  /** Standalone, quotable summary (reads correctly lifted out of the page) */
  intro: string;
  services: { heading: string; description: string; items: { title: string; text: string }[] };
  work: { heading: string; description: string; slugs: string[]; allHref: string; allLabel: string };
  process: { heading: string; steps: { title: string; text: string }[] };
  faq: { heading: string; items: { q: string; a: string }[] };
  cta: { heading: string; description: string };
  knowsAbout: string[];
};

export const SHOPIFY_PAGE: ServicePage = {
  path: "/shopify-developer/",
  meta: {
    title: "Shopify Developer for DTC Brands | Redesigns, Product & Landing Pages - Meet Khunt",
    description:
      "Hire Meet Khunt, a Shopify developer for DTC brands and agencies: store redesigns, product and collection pages, landing pages and Figma to Shopify builds.",
  },
  name: "Shopify Development",
  hero: {
    eyebrow: "Shopify Development",
    headline: "Shopify Developer for DTC Brands and Agencies",
    description:
      "I'm Meet Khunt. I design and build Shopify storefronts for DTC brands: complete store redesigns, product and collection pages, and landing pages built for paid traffic. Every section is hand-built in Liquid, HTML, CSS and JavaScript, responsive on every screen and easy for your team to edit afterwards.",
    ctaSecondary: { label: "See Shopify work", href: "/projects/shopify/" },
  },
  fold: {
    lines: ["Shopify developer.", "Stores built to sell."],
    lead: [
      { text: "Store redesigns, product pages and landing pages", bold: true },
      { text: " hand-built in Liquid for DTC brands and agencies. From Figma file to live storefront, " },
      { text: "every page is built to convert", bold: true },
      { text: " and easy for your team to edit." },
    ],
    mark: "shopify",
    cta: "Let's talk",
  },
  intro:
    "Meet Khunt is an ecommerce front-end developer who designs and builds Shopify stores for DTC brands and agencies. His Shopify work includes complete store redesigns for Baby Gains, Hanson of Sonoma and Aavilo, a collection page for Athletic Annex, and long-form landing pages for Riversol and Jadu Beauty. He builds custom theme sections in Liquid, HTML, CSS and JavaScript, turns Figma designs into working storefronts, and works directly with brands or white-label for agencies.",
  services: {
    heading: "Shopify Development Services",
    description:
      "Design and development in one place, focused on the pages that do the selling.",
    items: [
      {
        title: "Store Redesign & Migration",
        text: "Complete storefront rebuilds, or a move onto Shopify that keeps what already works and fixes what doesn't.",
      },
      {
        title: "Product Pages",
        text: "The page that has to do the selling: clearer hierarchy, stronger product presentation, and fast on a phone.",
      },
      {
        title: "Collection Pages",
        text: "Collections organised around how customers actually shop, with merchandising and filtering that help them find the right product.",
      },
      {
        title: "Landing Pages for Paid Traffic",
        text: "Long-form Shopify landing pages that explain the product before they ask for the sale, built to take traffic from Meta and Google.",
      },
      {
        title: "Figma to Shopify",
        text: "Your design file built as a real storefront: sections, states and breakpoints, not an approximation of the comp.",
      },
      {
        title: "White-Label for Agencies",
        text: "Production capacity for agencies. I build under your brand, to your process, and stay invisible to your client.",
      },
    ],
  },
  work: {
    heading: "Shopify Projects",
    description: "A selection of Shopify stores and pages I've designed and built.",
    slugs: ["baby-gains", "hanson-of-sonoma", "aavilo", "athletic-annex", "riversol", "jadu-beauty"],
    allHref: "/projects/shopify/",
    allLabel: "All Shopify projects",
  },
  process: {
    heading: "How I Work",
    steps: [
      {
        title: "Brief & Review",
        text: "Your goals, the current store or Figma file, and the pages that matter most, reviewed before anything is quoted.",
      },
      {
        title: "Design",
        text: "Layouts for desktop and mobile, or your existing design checked for missing states and breakpoints.",
      },
      {
        title: "Build",
        text: "Custom theme sections in Liquid, HTML, CSS and JavaScript that your team can edit in the Shopify theme editor.",
      },
      {
        title: "Test & Launch",
        text: "Checked across devices and browsers, then launched, with fixes handled at the root cause.",
      },
    ],
  },
  faq: {
    heading: "Shopify Development FAQs",
    items: [
      {
        q: "What does a Shopify developer do?",
        a: "A Shopify developer builds and customises the storefront: theme sections, product, collection and landing pages, and the Liquid, HTML, CSS and JavaScript behind them. My focus is the front end, the pages customers see and buy from.",
      },
      {
        q: "Can you turn my Figma design into a Shopify store?",
        a: "Yes. Send the Figma file and I build it as real Shopify theme sections, including the mobile layout, hover and empty states that designs often leave out.",
      },
      {
        q: "Do you redesign existing Shopify stores?",
        a: "Yes. Store redesigns for Baby Gains, Hanson of Sonoma and Aavilo are among my Shopify projects. A redesign can be the whole store or the pages that matter most, such as product and collection pages.",
      },
      {
        q: "Will my team be able to edit the pages afterwards?",
        a: "Yes. I build pages as Shopify theme sections, so text, images and products can be changed in the theme editor without touching code.",
      },
      {
        q: "Can you build landing pages for paid traffic on Shopify?",
        a: "Yes. Long-form landing pages for Riversol and Jadu Beauty were built on Shopify for paid traffic. I also build advertorials and funnels outside Shopify, in Checkout Champ and Funnelish.",
      },
      {
        q: "Do you work with agencies?",
        a: "Yes. I take on white-label Shopify development for agencies, working to your process and staying invisible to your client.",
      },
      {
        q: "How much does a Shopify project cost?",
        a: "It depends on scope: one landing page is a much smaller job than a full store redesign. Send the details through the inquiry form and I'll quote the agreed scope before any work starts.",
      },
    ],
  },
  cta: {
    heading: "Planning a Shopify Build or Redesign?",
    description:
      "Send me the brief, the store or the Figma file, and I'll reply with questions or a next step.",
  },
  knowsAbout: [
    "Shopify",
    "Shopify Liquid",
    "Shopify theme development",
    "Shopify store redesign",
    "Product page design",
    "Collection page design",
    "Landing pages",
    "Figma to Shopify",
    "Conversion rate optimization",
    "HTML",
    "CSS",
    "JavaScript",
  ],
};
