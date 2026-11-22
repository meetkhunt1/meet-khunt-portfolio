/**
 * Content for the Landing Pages and Conversion Optimization service pages,
 * rendered by components/sections/ServiceLanding.tsx like SHOPIFY_PAGE.
 * Every project named here has a case study that lists the matching service.
 */

import type { ServicePage } from "@/lib/services";

export const LANDING_PAGE: ServicePage = {
  path: "/landing-page-developer/",
  meta: {
    title: "Landing Page & Advertorial Developer for DTC Brands - Meet Khunt",
    description:
      "Hire Meet Khunt to design and build landing pages, advertorials and listicles for DTC brands running paid traffic, in Shopify, Funnelish, Checkout Champ and page builders.",
  },
  name: "Landing Page Development",
  hero: {
    eyebrow: "Landing Pages",
    headline: "Landing Page & Advertorial Developer for DTC Brands",
    description:
      "I'm Meet Khunt. I design and build landing pages, advertorials and listicles for DTC brands running paid traffic from Meta and Google: long-form pages that explain the product before they ask for the sale.",
    ctaSecondary: { label: "See landing page work", href: "/projects/landing-pages/" },
  },
  fold: {
    lines: ["Landing pages.", "Built for paid traffic."],
    lead: [
      { text: "Advertorials, listicles and long-form landing pages", bold: true },
      { text: " for DTC brands running Meta and Google ads. Every page is built to explain the product, " },
      { text: "carry cold traffic to the offer", bold: true },
      { text: " and stay fast on a phone." },
    ],
    mark: "landing",
    cta: "Let's talk",
  },
  intro:
    "Meet Khunt is an ecommerce front-end developer who designs and builds landing pages, advertorials and listicles for DTC brands running paid traffic. His landing page work includes editorial advertorials for Luma Nutrition, Funnelish advertorials and calculator funnels for Hume Health, and long-form Shopify landing pages for Riversol and Jadu Beauty. He builds in Shopify, Funnelish, Checkout Champ and page builders, mobile first, for brands and white-label for agencies.",
  services: {
    heading: "Landing Page Services",
    description: "Pages built for one job: turning a paid click into a sale.",
    items: [
      {
        title: "Advertorials",
        text: "Editorial-style pages that tell the product's story before the offer, built to warm up cold traffic.",
      },
      {
        title: "Listicles",
        text: "Reasons-why and comparison pages that make the case for the product point by point.",
      },
      {
        title: "Long-Form Landing Pages",
        text: "Product landing pages with the problem, the proof and the offer in one scroll.",
      },
      {
        title: "Angle Variations",
        text: "New versions of a page for each ad angle, so every campaign lands on a page that matches it.",
      },
      {
        title: "Any Platform",
        text: "Built in Shopify, Funnelish, Checkout Champ or page builders like GemPages, Replo and PageFly.",
      },
      {
        title: "Mobile First",
        text: "Most paid traffic lands on a phone, so pages are designed and tested for mobile before desktop.",
      },
    ],
  },
  work: {
    heading: "Landing Page Projects",
    description: "Advertorials and landing pages I've designed and built for paid traffic.",
    slugs: ["luma-nutrition", "hume-health", "riversol", "jadu-beauty"],
    allHref: "/projects/landing-pages/",
    allLabel: "All landing page projects",
  },
  process: {
    heading: "How I Work",
    steps: [
      {
        title: "Angle & Brief",
        text: "The ad angle, the offer and any reference pages you like, reviewed before anything is quoted.",
      },
      {
        title: "Structure & Design",
        text: "The page's persuasion order planned section by section, then designed for mobile first.",
      },
      {
        title: "Build",
        text: "Built in your platform, fast and responsive, and easy for your team to edit.",
      },
      {
        title: "Test & Launch",
        text: "Checked on real devices with links, forms and tracking tested before traffic hits.",
      },
    ],
  },
  faq: {
    heading: "Landing Page FAQs",
    items: [
      {
        q: "What is the difference between an advertorial and a landing page?",
        a: "An advertorial reads like an article: it tells a story and builds the case for the product before showing the offer. A landing page usually leads with the product and the offer. Both are built for paid traffic.",
      },
      {
        q: "Which platforms do you build landing pages on?",
        a: "Shopify, Funnelish and Checkout Champ, and page builders such as GemPages, Replo and PageFly. The page is built where your store or funnel already lives.",
      },
      {
        q: "Can you build a page from a reference I like?",
        a: "Yes. Send the reference and I'll follow its structure and flow, with the content, design and images made for your product and your angle.",
      },
      {
        q: "Can you make versions of a page for different ad angles?",
        a: "Yes. Each angle can get its own version of the page, so the message on the page matches the ad that sent the visitor.",
      },
      {
        q: "Do you work with agencies?",
        a: "Yes. I build landing pages and advertorials white-label for agencies, working to your process and staying invisible to your client.",
      },
      {
        q: "How much does a landing page cost?",
        a: "It depends on the length of the page and the platform. Send the details through the inquiry form and I'll quote the agreed scope before any work starts.",
      },
    ],
  },
  cta: {
    heading: "Need a Page for Your Next Campaign?",
    description:
      "Send me the angle, the offer and any reference pages, and I'll reply with questions or a next step.",
  },
  knowsAbout: [
    "Landing pages",
    "Advertorials",
    "Listicles",
    "Direct response landing pages",
    "Funnelish",
    "Checkout Champ",
    "Shopify",
    "GemPages",
    "Replo",
    "PageFly",
    "Conversion rate optimization",
  ],
};

export const CRO_PAGE: ServicePage = {
  path: "/conversion-optimization/",
  meta: {
    title: "Conversion Rate Optimization for Shopify & DTC Brands - Meet Khunt",
    description:
      "Conversion rate optimization for DTC brands from Meet Khunt: page reviews, fixes in priority order, and A/B tests set up properly on Shopify stores, funnels and landing pages.",
  },
  name: "Conversion Optimization",
  hero: {
    eyebrow: "Conversion Optimization",
    headline: "Conversion Rate Optimization for Shopify & DTC Brands",
    description:
      "I'm Meet Khunt. I find what your store, funnel or landing page is costing you, fix it in priority order, and set up tests to measure the difference, so changes are based on evidence instead of guesses.",
    ctaSecondary: { label: "See the work", href: "/projects/" },
  },
  fold: {
    lines: ["Conversion optimization.", "Fixes you can measure."],
    lead: [
      { text: "Product pages, landing pages and funnels reviewed", bold: true },
      { text: " for what is stopping people from buying, then fixed in order of impact and " },
      { text: "tested instead of guessed", bold: true },
      { text: "." },
    ],
    mark: "cro",
    cta: "Let's talk",
  },
  intro:
    "Meet Khunt is an ecommerce front-end developer who improves conversion on Shopify stores, funnels and landing pages for DTC brands. He reviews where a page loses customers, fixes hierarchy, clarity, speed and mobile issues in priority order, and sets up A/B tests so each change is measured. His conversion work includes landing pages for Riversol and Jadu Beauty, advertorials for Luma Nutrition, and A/B test variants for Hume Health's Funnelish funnels.",
  services: {
    heading: "Conversion Optimization Services",
    description: "Find what the page is costing you, fix it, and measure the difference.",
    items: [
      {
        title: "Page Review",
        text: "A walk through the page as a customer: where attention drops, what is unclear, and what gets in the way of buying.",
      },
      {
        title: "Prioritised Fixes",
        text: "Clear changes ranked by likely impact and effort, so the biggest problems are fixed first.",
      },
      {
        title: "Product Page Improvements",
        text: "Clearer hierarchy, stronger product presentation, and the key questions answered above the fold.",
      },
      {
        title: "A/B Testing",
        text: "Variants built and tests set up properly, with tracking checked on each one before it runs.",
      },
      {
        title: "Mobile & Speed",
        text: "The phone experience and load times fixed, where most paid traffic actually lands.",
      },
      {
        title: "Funnel Optimization",
        text: "Advertorial, checkout and upsell steps reviewed and improved in Checkout Champ and Funnelish.",
      },
    ],
  },
  work: {
    heading: "Conversion-Focused Projects",
    description: "Pages built and improved with conversion as the goal.",
    slugs: ["riversol", "jadu-beauty", "luma-nutrition", "hume-health"],
    allHref: "/projects/",
    allLabel: "All projects",
  },
  process: {
    heading: "How I Work",
    steps: [
      {
        title: "Review",
        text: "The page, the traffic it gets and the data you have, reviewed to find where customers drop off.",
      },
      {
        title: "Prioritise",
        text: "A short list of changes ranked by likely impact, agreed with you before any work starts.",
      },
      {
        title: "Build & Test",
        text: "Changes built, and tested as A/B variants where the traffic allows it.",
      },
      {
        title: "Measure",
        text: "Results checked against the original, and the winners kept.",
      },
    ],
  },
  faq: {
    heading: "Conversion Optimization FAQs",
    items: [
      {
        q: "What is conversion rate optimization?",
        a: "Conversion rate optimization (CRO) is improving a store, funnel or landing page so more of the visitors you already have go on to buy. It covers clarity, hierarchy, speed, mobile experience and testing.",
      },
      {
        q: "Where do you start?",
        a: "With a review of the page as a customer sees it, plus any data you have, to find where people drop off. The fixes are then ranked so the biggest problems are handled first.",
      },
      {
        q: "Do you run A/B tests?",
        a: "Yes. I build the variants and set the tests up properly, with tracking checked on each version, so the result can be trusted.",
      },
      {
        q: "Which platforms do you work on?",
        a: "Shopify stores, Checkout Champ and Funnelish funnels, and landing pages built in page builders such as GemPages, Replo and PageFly.",
      },
      {
        q: "Do I need a lot of traffic?",
        a: "Testing needs enough traffic to reach a clear result. With less traffic, fixing the clear problems a review finds is usually the better first step.",
      },
      {
        q: "How do we get started?",
        a: "Send a project inquiry with the page you want to improve and what you know about how it performs, and I'll reply with questions or a next step.",
      },
    ],
  },
  cta: {
    heading: "Want to Know What Your Page Is Costing You?",
    description:
      "Send me the page and what you know about how it performs, and I'll reply with questions or a next step.",
  },
  knowsAbout: [
    "Conversion rate optimization",
    "A/B testing",
    "Landing page optimization",
    "Product page optimization",
    "Shopify",
    "Checkout Champ",
    "Funnelish",
    "Mobile UX",
    "Page speed",
  ],
};
