/**
 * Content for the /d2c offer page. Single source of truth so copy and asset
 * paths can be edited without touching markup.
 */

export const D2C_LINKEDIN = "https://www.linkedin.com/in/meetkhunt1/";

export const D2C_META = {
  title: "Landing Pages & Advertorials for D2C Brands in 24 Hours | Meet Khunt",
  description:
    "I build conversion-ready landing pages and advertorials for D2C brands on Shopify. Send any reference page, get a live page in 24 hours. Your first page is free.",
  url: "https://meetkhunt.com/d2c/",
  siteName: "Meet Khunt",
  /**
   * 1200x630 PNG served as a plain static file. Deliberately not Next's
   * `opengraph-image` route convention: with `output: "export"` that emits an
   * extensionless file, and `trailingSlash: true` plus Apache MIME sniffing on
   * static hosting makes LinkedIn's crawler unreliable at fetching it.
   */
  ogImage: "/og/d2c-og.png",
  ogImageAlt:
    "Landing pages and advertorials for D2C brands, delivered in 24 hours — Meet Khunt",
};

export const D2C_HERO = {
  eyebrow: "Meet Khunt — Shopify frontend developer",
  /** Split so the closing phrase can carry the accent highlight. */
  headline: ["Landing pages & advertorials for D2C brands.", "Delivered in"],
  headlineAccent: "24 hours.",
  sub: "Send any reference page. Get a conversion-ready Shopify page. First one free.",
  cta: "Get your free page",
  trust:
    "Built with Shopify, Replo, GemPages, PageFly, CheckoutChamp, Funnelish",
};

export const D2C_PROBLEM = {
  label: "The problem",
  headline:
    "Most brands don't have a traffic problem. They have a page problem.",
  text: "Every new ad angle needs a new page. But pages take 1 to 2 weeks and cost $1,500 to $3,000 each. Slow pages mean slow testing, and slow testing wastes ad spend.",
};

export const D2C_STEPS = [
  {
    n: "01",
    title: "Send a reference",
    text: "A competitor's winning page, a page you love, even a sketch.",
  },
  {
    n: "02",
    title: "I build it",
    text: "My AI-assisted page system produces a pixel-clean, mobile-optimized build.",
  },
  {
    n: "03",
    title: "Live in 24 hours",
    text: "A real page on your Shopify store, not a mockup.",
  },
];

/**
 * Paste the Loom share link's embed URL here (https://www.loom.com/embed/<id>)
 * and the placeholder is replaced by the real player automatically.
 */
export const D2C_LOOM = {
  embedUrl: "",
  title: "How a page gets built in 24 hours",
  placeholder: "Walkthrough coming soon",
};

export type D2CShot = {
  caption: string;
  /** Optional live URL — the "View live" link only renders when set. */
  liveUrl?: string;
  /** Drop real screenshots in /public and set these to replace the wireframe. */
  desktop?: string;
  mobile?: string;
  alt?: string;
};

export const D2C_WORK: D2CShot[] = [
  { caption: "Advertorial, wellness brand, 1 day" },
  { caption: "Listicle, skincare brand, 1 day" },
  { caption: "Landing page, food & beverage, 1 day" },
  { caption: "Quiz funnel, supplement brand, 2 days" },
  { caption: "Product page, tech accessories, 1 day" },
  { caption: "Custom checkout flow, beauty brand, 2 days" },
];

export const D2C_WORK_NOTE =
  "Some work built for a US ecommerce agency's clients. Names withheld under agreement.";

export const D2C_BUILDS = [
  { title: "Advertorials", text: "Editorial-style pages that sell before the click." },
  { title: "Listicles", text: "Ranked, scannable pages built for cold traffic." },
  { title: "Landing pages", text: "One offer, one action, no leaks." },
  { title: "Product pages", text: "Rebuilt PDPs that carry the ad's promise." },
  { title: "Quizzes and surveys", text: "Guided flows that sort buyers by intent." },
  {
    title: "Custom checkout flows",
    text: "Upsells and post-purchase offers that lift AOV.",
  },
];

export const D2C_OFFER = {
  label: "The offer",
  headline: "Your first page is free.",
  text: "You pick the reference. I build the page in 24 hours. You judge the quality. You only ever pay for pages you approve. After that: per-page builds or a monthly production retainer for brands that test aggressively.",
  cta: "DM me PAGE on LinkedIn",
};

export const D2C_FOOTER = {
  name: "Meet Khunt",
  role: "Shopify frontend developer",
  portfolioLabel: "meetkhunt.com",
  portfolioHref: "https://meetkhunt.com",
};

export const D2C_STICKY = "First page free → DM me";
