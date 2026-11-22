export const SITE = {
  /* Leads with what clients search for: the platforms and who it is for. */
  title: "Meet Khunt | Shopify & Checkout Champ Developer for DTC Brands",
  description:
    "Meet Khunt builds Shopify stores, landing pages, advertorials and Checkout Champ and Funnelish funnels for DTC brands and agencies. Send a project inquiry.",
  /** Google Tag Manager container ID. Empty = off. */
  gtmId: "GTM-PG4RVBH5",
  /**
   * GA4 Measurement ID, tagged directly in code (page views). Do not also add
   * a GA4 tag inside the GTM container, or every visit is counted twice.
   */
  gaId: "G-8S6JCV5TDE",
  ogImage: "/projects/baby-gains-before-after.webp",
  headerName: "MEET KHUNT",
  footerName: "MEET KHUNT",
  year: "2026",
  tagline:
    "Ecommerce frontend specialist building high-converting Shopify storefronts and landing pages for DTC brands.",
};

export const HERO = {
  headline: "Storefronts & landing pages built to convert",
  sub: "Faster load times, clearer hierarchy and stronger product presentation - the frontend work that actually moves revenue for DTC brands.",
  cta: "Let’s talk",
  ctaSecondary: { label: "See my work", href: "/projects/" },
  /** Real client names, not an invented rating. Every one has a case study. */
  proof: "Shipping for Luma Nutrition, Hume Health, Aavilo, Baby Gains & more",
  /**
   * Decorative collage beside the headline — three columns that drift at
   * different speeds. Storefront work only: Shopify (Aavilo, Baby Gains,
   * Hanson) and WordPress (Kitchen Corner). No advertorial or landing-page
   * shots, so the hero shows the build work rather than the paid-traffic work.
   * Purely visual (rendered aria-hidden with empty alts); the work is
   * presented properly in the carousel below. Each column is duplicated at
   * render time for a seamless loop, so keep these lists short.
   */
  collage: [
    [
      "/projects/aavilo-pdp-green.webp",
      "/projects/hanson-2.webp",
      "/projects/kitchen-corner-2.webp",
      "/projects/baby-gains-2.webp",
    ],
    [
      "/projects/kitchen-corner-fullpage.webp",
      "/projects/baby-gains-3.webp",
      "/projects/aavilo-pdp-purple.webp",
      "/projects/hanson-1.webp",
    ],
    [
      "/projects/hanson-3.webp",
      "/projects/kitchen-corner-1.webp",
      "/projects/kitchen-corner-3.webp",
    ],
  ],
};

/**
 * /projects filter row. "All Projects" is the default tab and is never stored
 * on a project — it simply skips the filter.
 */
export const WORK_FILTERS = [
  "All Projects",
  "Shopify",
  "WordPress",
  "Landing Pages",
  "Checkout Champ",
] as const;

export type WorkFilter = Exclude<(typeof WORK_FILTERS)[number], "All Projects">;

/** Copy for the /projects index */
export const WORK_INDEX = {
  headline: "Ecommerce work built to sell, not just to look good.",
  filterLabel: "Filter Work:",
  title: "Work | Meet Khunt",
  description:
    "Ecommerce case studies by Meet Khunt: Shopify stores, landing pages, advertorials and WordPress sites built for DTC brands.",
};

/**
 * Each filter tab has its own page at /projects/<slug>/, so a tab can be
 * linked to directly (e.g. /projects/shopify/). Slugs share the /projects/
 * namespace with case studies; the build fails if one ever collides.
 */
export const WORK_CATEGORIES: Record<
  WorkFilter,
  { slug: string; headline: string; title: string; description: string }
> = {
  Shopify: {
    slug: "shopify",
    headline: "Shopify stores and pages built to sell.",
    title: "Shopify Development Projects | Meet Khunt",
    description:
      "Shopify case studies by Meet Khunt: store redesigns, collection and product pages, and landing pages built for DTC brands.",
  },
  WordPress: {
    slug: "wordpress",
    headline: "WordPress websites built to earn trust.",
    title: "WordPress Development Projects | Meet Khunt",
    description:
      "WordPress case studies by Meet Khunt: business websites designed and built with clear structure, responsive layouts and easy navigation.",
  },
  "Landing Pages": {
    slug: "landing-pages",
    headline: "Landing pages and advertorials built for paid traffic.",
    title: "Landing Page & Advertorial Projects | Meet Khunt",
    description:
      "Landing page and advertorial case studies by Meet Khunt: pages built for cold paid traffic on Shopify, Funnelish and more.",
  },
  "Checkout Champ": {
    slug: "checkout-champ",
    headline: "Checkout Champ funnels, from presell to thank-you page.",
    title: "Checkout Champ Funnel Projects | Meet Khunt",
    description:
      "Checkout Champ funnels built by Meet Khunt for DTC brands: advertorials, sales pages, checkouts and post-purchase upsells.",
  },
};

/**
 * Work shown on /projects as a card only, before its case study is written:
 * no page, no link, a "coming soon" label instead. Kept apart from PROJECTS
 * so nothing (routes, sitemap, links) can point at a page that doesn't exist.
 * When a case study is ready, move the project into PROJECTS.
 */
export type UpcomingProject = {
  key: string;
  brand: string;
  category: string;
  summary: string;
  image: string;
  filters: WorkFilter[];
};

export const UPCOMING_PROJECTS: UpcomingProject[] = [
  {
    key: "hume-band-checkout-champ",
    brand: "Hume Band",
    category: "CHECKOUT CHAMP · FUNNEL",
    summary:
      "A full funnel for the Hume Band wearable: advertorial, product page, checkout, upsell and thank-you page.",
    image: "/projects/cc-hume-band-cover.webp",
    filters: ["Checkout Champ"],
  },
  {
    key: "plateful-checkout-champ",
    brand: "Plateful",
    category: "CHECKOUT CHAMP · FUNNEL",
    summary:
      "A food warming mat funnel: sales page, checkout, multiple upsell paths and thank-you page.",
    image: "/projects/cc-plateful-cover.webp",
    filters: ["Checkout Champ"],
  },
  {
    key: "pelsbarn-checkout-champ",
    brand: "Pelsbarn",
    category: "CHECKOUT CHAMP · FUNNEL",
    summary:
      "A multi-step funnel: advertorial, listicle, sales page, checkout, two upsells and thank-you page.",
    image: "/projects/cc-pelsbarn-cover.webp",
    filters: ["Checkout Champ"],
  },
];

/** URL of a filter tab; "All Projects" is the /projects/ index itself. */
export function workFilterPath(filter: (typeof WORK_FILTERS)[number]) {
  return filter === "All Projects"
    ? "/projects/"
    : `/projects/${WORK_CATEGORIES[filter].slug}/`;
}

/** The filter whose page lives at /projects/<slug>/, if any. */
export function workFilterBySlug(slug: string): WorkFilter | undefined {
  return (Object.keys(WORK_CATEGORIES) as WorkFilter[]).find(
    (f) => WORK_CATEGORIES[f].slug === slug,
  );
}

export type GalleryImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Full-bleed row on the case-study grid; otherwise shares a row */
  full?: boolean;
  /** Force a new grid row instead of joining the previous one */
  newRow?: boolean;
  /** Small line under the image — useful when several shots look alike */
  caption?: string;
};

export type Project = {
  slug: string;
  title: string;
  category: string;
  image: string;
  /** Short client name — the card title on /projects, where `title` is too long */
  brand: string;
  /** One-line pitch under the card title on /projects */
  summary: string;
  /** Platforms shown on the case study. Leave out to infer from the services. */
  tools?: string[];
  /** Which /projects filter tabs this project belongs to (see WORK_FILTERS) */
  filters: WorkFilter[];
  /** Shown in the home-page "Selected work" grid; every project shows on /projects */
  featured?: boolean;
  /** Small tag above the case-study headline */
  tag: string;
  /** Case-study H1 */
  headline: string;
  description: string[];
  services: string[];
  industries: string[];
  liveUrl: string;
  /** Extra live pages worth linking individually (funnels, landing pages) */
  links?: { label: string; href: string }[];
  gallery: GalleryImage[];
  /**
   * A collection of separate live pages shown as one project (see
   * PageShowcase). When set, the project page uses the showcase layout
   * instead of the standard case study, and `gallery` is not used.
   */
  showcase?: ShowcasePage[];
};

/** One live page in a showcase: full-length desktop and mobile captures. */
export type ShowcasePage = {
  /** Page type label, e.g. "Comparison Page", "Advertorial" */
  type: string;
  /** The page's own headline */
  title: string;
  url: string;
  desktop: { src: string; width: number; height: number };
  mobile: { src: string; width: number; height: number };
};

export const PROJECTS: Project[] = [
  {
    slug: "replo",
    title: "Replo Page Designs: Comparison pages and advertorials",
    category: "REPLO · PAGE DESIGNS",
    image: "/projects/replo-card.webp",
    brand: "Replo Page Designs",
    summary:
      "Comparison pages and advertorials designed and built in Replo for paid traffic.",
    filters: ["Landing Pages"],
    tag: "Replo Page Designs",
    headline: "Comparison pages and advertorials built in Replo",
    description: [
      "A collection of pre-sell pages designed and built in Replo for DTC brands running paid traffic: product comparison pages that rank options side by side, and long-form advertorials that tell the story before the click to the store.",
      "Each page is live. Scroll inside any desktop or mobile frame below to see the full page, or open it on its own site.",
    ],
    services: [
      "Replo Page Design",
      "Comparison Pages",
      "Advertorials",
      "Responsive Development",
    ],
    industries: ["Wellness", "Kitchen & Cookware"],
    liveUrl: "https://www.apexiqo.com/pages/try-japanese-titanium",
    gallery: [],
    showcase: [
      {
        type: "Comparison Page",
        title: "Best Weighted Comfort Plush of 2025",
        url: "https://mindfulhabitsguide.com/pages/best-weighted-comfort-plush-1",
        desktop: { src: "/projects/replo-comparison-plush-desktop.webp", width: 1200, height: 8644 },
        mobile: { src: "/projects/replo-comparison-plush-mobile.webp", width: 500, height: 15637 },
      },
      {
        type: "Advertorial",
        title: "We Compared the 5 Most Common Frying Pan Materials. One Performed Best Across Every Test",
        url: "https://www.apexiqo.com/pages/best-frying-pan-material",
        desktop: { src: "/projects/replo-frying-pan-desktop.webp", width: 1200, height: 4424 },
        mobile: { src: "/projects/replo-frying-pan-mobile.webp", width: 500, height: 6986 },
      },
      {
        type: "Advertorial",
        title: "I Finally Tossed My Wooden Cutting Board. Here's The Gross Reason Why.",
        url: "https://www.apexiqo.com/pages/hidden-problem-with-wooden-cutting-boards",
        desktop: { src: "/projects/replo-cutting-boards-desktop.webp", width: 1200, height: 5923 },
        mobile: { src: "/projects/replo-cutting-boards-mobile.webp", width: 500, height: 8432 },
      },
      {
        type: "Advertorial",
        title: "Ditch Teflon: Try Japanese Titanium",
        url: "https://www.apexiqo.com/pages/try-japanese-titanium",
        desktop: { src: "/projects/replo-japanese-titanium-desktop.webp", width: 1200, height: 6516 },
        mobile: { src: "/projects/replo-japanese-titanium-mobile.webp", width: 500, height: 10226 },
      },
    ],
  },
  {
    slug: "johnson-spinal-care",
    title: "Johnson Spinal Care: A $45 new patient offer page",
    category: "GOHIGHLEVEL · LANDING PAGE",
    image: "/projects/johnson-card.webp",
    brand: "Johnson Spinal Care",
    summary:
      "A GoHighLevel landing page that turns a $45 new patient special into booked appointments.",
    filters: ["Landing Pages"],
    /* GoHighLevel has no tile in TOOLS_SECTION; empty keeps the platform
       list from being guessed from the services */
    tools: [],
    tag: "Chiropractic Clinic (GoHighLevel Landing Page)",
    headline: "New Patient Offer Landing Page in GoHighLevel",
    description: [
      "Johnson Spinal Care is a chiropractic clinic in Minnesota. Their $45 New Patient Special needed a page of its own: somewhere ad traffic could land, understand the offer in seconds and book a first visit without hunting through a full website.",
      "I built the page in GoHighLevel around that one action. A welcome video and the offer open the page, followed by why patients choose the clinic, what the first visit includes, an appointment form, video patient stories and a closing offer, with a Claim Your Offer button repeated down the page.",
    ],
    services: [
      "GoHighLevel Landing Page",
      "Offer Page Design",
      "Appointment Form",
      "Video Testimonials",
      "Responsive Development",
    ],
    industries: ["Chiropractic", "Healthcare"],
    liveUrl: "https://offer.johnsonspinalcare.com/",
    gallery: [
      {
        src: "/projects/johnson-mobile-hero.webp",
        alt: "Johnson Spinal Care offer page on mobile: $45 new patient special and welcome video",
        width: 604,
        height: 1208,
      },
      {
        src: "/projects/johnson-mobile-why.webp",
        alt: "Johnson Spinal Care on mobile: why patients choose the clinic",
        width: 604,
        height: 1208,
      },
      {
        src: "/projects/johnson-mobile-receive.webp",
        alt: "Johnson Spinal Care on mobile: what the first visit includes",
        width: 604,
        height: 1208,
      },
      {
        src: "/projects/johnson-mobile-schedule.webp",
        alt: "Johnson Spinal Care on mobile: schedule your appointment section",
        width: 604,
        height: 1208,
      },
      {
        src: "/projects/johnson-hero.webp",
        alt: "Johnson Spinal Care offer page hero with the $45 new patient special and welcome video",
        width: 1920,
        height: 1983,
        full: true,
      },
      {
        src: "/projects/johnson-why.webp",
        alt: "Why Choose Johnson Spinal Care section with an image carousel",
        width: 1920,
        height: 1062,
        full: true,
      },
      {
        src: "/projects/johnson-offer.webp",
        alt: "What You'll Receive cards and the appointment booking form",
        width: 1920,
        height: 1781,
        full: true,
      },
      {
        src: "/projects/johnson-stories.webp",
        alt: "Patient story videos, closing offer and clinic footer",
        width: 1920,
        height: 1511,
        full: true,
      },
    ],
  },
  {
    slug: "airbond",
    title: "Airbond: An industrial machinery store on Shopify",
    category: "SHOPIFY · STORE DEVELOPMENT",
    image: "/projects/airbond-card.webp",
    brand: "Airbond",
    summary:
      "End-to-end Shopify development for an Indian maker of pumps, gauges and workshop machinery.",
    filters: ["Shopify"],
    tools: ["Shopify"],
    tag: "Agriculture & Industrial Machinery (Shopify Store Development)",
    headline: "End-to-End Shopify Store Development",
    description: [
      "Airbond manufactures tyre air pressure gauges, vulcanizing machines, agriculture sprayer pumps and commercial flange pumps in India, for workshops, farms and industrial buyers across the country. They needed their range online as a working store they could sell from directly.",
      "I handled the Shopify build end to end: developing the store, setting up the full product catalogue with categories and specification tables, configuring shipping and payments for the Indian market, and connecting the integrations the store runs on, so it launched ready to take orders.",
    ],
    services: [
      "Shopify Store Development",
      "Product Catalogue Setup",
      "Shipping Configuration",
      "Payment Gateway Setup",
      "App & Third-Party Integrations",
      "Responsive Development",
    ],
    industries: ["Agriculture Machinery", "Industrial Tools & Equipment"],
    liveUrl: "https://airbond.in/",
    gallery: [
      {
        src: "/projects/airbond-mobile-home.webp",
        alt: "Airbond Shopify store homepage on mobile",
        width: 604,
        height: 1208,
      },
      {
        src: "/projects/airbond-mobile-catalog.webp",
        alt: "Airbond product catalogue on mobile with filter and sort",
        width: 604,
        height: 1208,
      },
      {
        src: "/projects/airbond-mobile-product.webp",
        alt: "Airbond ABV 4 vulcanizing machine product page on mobile",
        width: 604,
        height: 1208,
      },
      {
        src: "/projects/airbond-mobile-specs.webp",
        alt: "Airbond product specification table on mobile",
        width: 604,
        height: 1208,
      },
      {
        src: "/projects/airbond-home.webp",
        alt: "Airbond homepage with hero, shop by category and new products",
        width: 1920,
        height: 2384,
        full: true,
      },
      {
        src: "/projects/airbond-brand.webp",
        alt: "Airbond Built for Accuracy and Our Mission sections",
        width: 1920,
        height: 1385,
        full: true,
      },
      {
        src: "/projects/airbond-catalog.webp",
        alt: "Airbond product catalogue with availability and price filters",
        width: 1920,
        height: 1840,
        full: true,
      },
      {
        src: "/projects/airbond-product.webp",
        alt: "Airbond product page with specification table, add to cart and buy now",
        width: 1920,
        height: 1900,
        full: true,
      },
    ],
  },
  {
    slug: "mumma-mall",
    title: "Mumma Mall: A kids' store redesigned on Shopify",
    category: "SHOPIFY · STORE REDESIGN",
    image: "/projects/mumma-mall-card.webp",
    brand: "Mumma Mall",
    summary:
      "A Shopify redesign for an Indian kids' store selling educational toys, busy books and baby essentials.",
    filters: ["Shopify"],
    tools: ["Shopify"],
    tag: "Kids' Toys & Baby Products (Shopify Store Redesign)",
    headline: "Shopify Store Redesign",
    description: [
      "Mumma Mall sells educational toys, busy books, activity books, ride-on vehicles and baby essentials to parents across India, alongside its own retail stores. The range is large and changes often, so the storefront has to make it easy to find the right product for a child's age and stage.",
      "I redesigned the store directly in Shopify: a bolder homepage with a rotating hero and best sellers, shoppable video reels, a featured product block with cash on delivery up front, parenting articles, reviews and an FAQ, plus cleaner collection pages and product pages built to sell.",
    ],
    services: [
      "Shopify Store Redesign",
      "Homepage Sections",
      "Collection & Product Pages",
      "Shoppable Video Reels",
      "Responsive Development",
    ],
    industries: ["Kids' Toys", "Baby Products", "Education"],
    liveUrl: "https://mummamall.com/",
    gallery: [
      {
        src: "/projects/mumma-mall-mobile-home.webp",
        alt: "Mumma Mall homepage on mobile with hero banner and best sellers",
        width: 604,
        height: 1208,
      },
      {
        src: "/projects/mumma-mall-mobile-catalog.webp",
        alt: "Mumma Mall educational toys collection on mobile",
        width: 604,
        height: 1208,
      },
      {
        src: "/projects/mumma-mall-home.webp",
        alt: "Mumma Mall homepage hero, category strip and best sellers",
        width: 1920,
        height: 2090,
        full: true,
      },
      {
        src: "/projects/mumma-mall-reels.webp",
        alt: "Mumma Mall shoppable video reels and featured product block",
        width: 1920,
        height: 1870,
        full: true,
      },
      {
        src: "/projects/mumma-mall-community.webp",
        alt: "Mumma Mall parenting articles and Trusted by Over 2 Million Customers banner",
        width: 1920,
        height: 1020,
        full: true,
      },
      {
        src: "/projects/mumma-mall-catalog.webp",
        alt: "Mumma Mall educational toys collection page with filters",
        width: 1920,
        height: 2300,
        full: true,
      },
      {
        src: "/projects/mumma-mall-product.webp",
        alt: "Mumma Mall product page with cash on delivery and delivery timeline",
        width: 1920,
        height: 1080,
        full: true,
      },
    ],
  },
  {
    slug: "athletic-annex",
    title: "Athletic Annex: Find the shoe that fits",
    category: "SHOPIFY · COLLECTION PAGE",
    image: "/projects/annex-card.webp",
    brand: "Athletic Annex",
    summary:
      "A Shopify collection page rebuilt around how runners actually shop: by activity, not by SKU.",
    filters: ["Shopify"],
    featured: true,
    tag: "Athletic Footwear Retailer (Shopify Development)",
    headline: "Shopify Collection Page Design & Development",
    description: [
      "Athletic Annex is an athletic footwear retailer offering a wide range of running, training, walking, trail, racing, and performance footwear. The project focused on redesigning the Shopify collection page to improve product discovery and browsing.",
      "The goal was to create a more organized and engaging collection experience, make it easier for customers to explore products by category, and present product recommendations in a way that supports faster purchasing decisions.",
    ],
    services: [
      "Shopify Development",
      "Collection Page Design",
      "UI/UX Design",
      "Merchandising & Filtering",
      "Responsive Development",
    ],
    industries: ["Athletic Footwear", "Running", "Retail"],
    liveUrl: "https://athleticannex.com",
    gallery: [
      {
        src: "/projects/annex-1.webp",
        alt: "Athletic Annex collection hero and shop-by-category grid",
        width: 1200,
        height: 2133,
        caption: "Collection hero - Every Sport. Every Surface.",
      },
      {
        src: "/projects/annex-2.webp",
        alt: "Athletic Annex shop-by-activity tiles and best sellers carousel",
        width: 1200,
        height: 2133,
        caption: "Shop by activity, best sellers and shop by brand",
      },
      {
        src: "/projects/annex-3.webp",
        alt: "Athletic Annex expert fitting, community and local race guides",
        width: 1200,
        height: 2133,
        newRow: true,
        caption: "More than a running store - fittings, community, race guides",
      },
      {
        src: "/projects/annex-4.webp",
        alt: "Athletic Annex filtered product grid with sidebar facets",
        width: 1200,
        height: 2133,
        caption: "Filtered product grid",
      },
      {
        src: "/projects/annex-5.webp",
        alt: "Athletic Annex product grid, Instagram wall and fitting call to action",
        width: 1200,
        height: 2133,
        caption: "Social proof and the fitting call to action",
      },
    ],
  },
  {
    slug: "riversol",
    title: "Riversol: Dermatologist-developed skincare",
    category: "SHOPIFY · LANDING PAGE",
    image: "/projects/riversol-card.webp",
    brand: "Riversol",
    summary:
      "A long-form Shopify landing page that teaches the routine before it asks for the sale.",
    filters: ["Shopify", "Landing Pages"],
    featured: true,
    tag: "DTC Skincare Brand (Shopify Development)",
    headline: "Shopify Landing Page Design & Development",
    description: [
      "Riversol is a dermatologist-developed skincare brand focused on targeted skincare solutions for concerns including dryness, redness, sensitivity, and visible signs of aging. The project focused on designing and developing a dedicated landing page experience in Shopify.",
      "The goal was to create a structured, educational shopping experience that communicates the product benefits clearly, builds trust through supporting content and results, and guides visitors toward discovering the right skincare solution.",
    ],
    services: [
      "Shopify Development",
      "Landing Page Design",
      "Conversion Rate Optimization",
      "UI/UX Design",
      "Responsive Development",
    ],
    industries: ["Skincare", "Health & Wellness", "DTC E-Commerce"],
    liveUrl: "https://riversol.com",
    gallery: [
      {
        src: "/projects/riversol-1.webp",
        alt: "Riversol landing page hero offer and clinical results",
        width: 1200,
        height: 2133,
        caption: "Hero offer, clinical results and press",
      },
      {
        src: "/projects/riversol-2.webp",
        alt: "Riversol anti-aging trio bundle selector and benefit diagram",
        width: 1200,
        height: 2133,
        caption: "Bundle selector and what the routine targets",
      },
      {
        src: "/projects/riversol-3.webp",
        alt: "Riversol three-step routine and before and after results",
        width: 1200,
        height: 2133,
        newRow: true,
        caption: "Three steps, five minutes - and real results",
      },
      {
        src: "/projects/riversol-4.webp",
        alt: "Riversol customer reviews and user-generated photo wall",
        width: 1200,
        height: 2133,
        caption: "115,000+ customers, reviews and UGC",
      },
      {
        src: "/projects/riversol-5.webp",
        alt: "Riversol founder story, ingredients and brand comparison table",
        width: 1200,
        height: 2133,
        caption: "Founder story, ingredients and comparison",
      },
    ],
  },
  {
    slug: "jadu-beauty",
    title: "Jadu Beauty: Haircare with a clean label",
    category: "SHOPIFY · LANDING PAGE",
    image: "/projects/jadu-card.webp",
    brand: "Jadu Beauty",
    summary:
      "A founder-led haircare page that argues the formula before it sells the bundle.",
    filters: ["Shopify", "Landing Pages"],
    featured: true,
    tag: "DTC Haircare Brand (Shopify Development)",
    headline: "Shopify Landing Page Design & Development",
    description: [
      "Jadu Beauty is a direct-to-consumer haircare brand built on a sulfate-free shampoo and a silicone-free conditioner, formulated with food-grade botanicals and positioned around a clean, fully disclosed label.",
      "The page answers the objection before it makes the offer: a buy box at the top, then a side-by-side comparison against conventional haircare, the founder's story behind the formula, an ingredient breakdown, and what a customer should notice after wash day.",
      "Review content and the routine cross-sell sit lower down, where a reader who has already accepted the argument is ready to add the second product.",
    ],
    services: [
      "Shopify Development",
      "Landing Page Design",
      "Conversion Rate Optimization",
      "UI/UX Design",
      "Responsive Development",
    ],
    industries: ["Haircare", "Beauty", "DTC E-Commerce"],
    liveUrl: "https://jadubeauty.com",
    gallery: [
      {
        src: "/projects/jadu-1.webp",
        alt: "Jadu Beauty product hero with buy box and dietitian endorsement",
        width: 1200,
        height: 1680,
        caption: "Buy box, claims and press",
      },
      {
        src: "/projects/jadu-2.webp",
        alt: "Jadu Beauty comparison table and founder story",
        width: 1200,
        height: 1680,
        caption: "Why Jadu is better - comparison and founder story",
      },
      {
        src: "/projects/jadu-3.webp",
        alt: "Jadu Beauty ingredient breakdown and clean label section",
        width: 1200,
        height: 2133,
        newRow: true,
        caption: "Ingredients with a purpose, and what is left out",
      },
      {
        src: "/projects/jadu-4.webp",
        alt: "Jadu Beauty results after wash day and customer reviews",
        width: 1200,
        height: 2133,
        caption: "What to notice after wash day, plus reviews",
      },
      {
        src: "/projects/jadu-5.webp",
        alt: "Jadu Beauty routine cross-sell, FAQ and footer offer",
        width: 1200,
        height: 2133,
        caption: "Complete the routine, FAQ and closing offer",
      },
    ],
  },
  {
    slug: "luma-nutrition",
    title: "Luma Nutrition: Advertorials built to convert",
    category: "FUNNELISH · ADVERTORIALS",
    image: "/projects/luma-cover.webp",
    brand: "Luma Nutrition",
    summary:
      "Five editorial advertorials built to carry cold paid traffic for a DTC supplement brand.",
    filters: ["Landing Pages"],
    tools: ["Funnelish"],
    featured: true,
    tag: "DTC Supplement Brand (Funnelish Advertorials)",
    headline: "Five Editorial Advertorials for Cold Paid Traffic",
    description: [
      "Luma Nutrition is a direct-to-consumer supplement brand - magnesium glycinate, berberine 1,200 mg and turmeric curcumin with BioPerine. The work was a set of five long-form advertorials built in Funnelish, each a standalone page outside the main store so a different product and a different problem could be tested against its own traffic.",
      "Every page is dressed as editorial rather than as an ad: a publication masthead and disclaimer bar, an author byline with a last-updated stamp, and a numbered argument that walks the reader from the problem to the dose that actually solves it. Comparison tables, supplement-facts callouts, verified-review pull quotes and product blocks are placed at the points where the reader is most likely to act.",
      "The commerce layer is threaded through the scroll instead of parked at the end - sticky product bars that follow the reader, inline CTAs after each section, and offer buttons that hand off to the Luma Nutrition store. Each page is built mobile-first and kept light so it holds up under paid traffic.",
    ],
    services: [
      "Funnelish Advertorial Build",
      "Landing Page Development",
      "Conversion Rate Optimization",
      "Mobile-First Responsive Development",
    ],
    industries: ["Health & Wellness", "Supplements", "DTC E-Commerce"],
    liveUrl: "https://lumanutrition.com",
    gallery: [
      {
        src: "/projects/luma-turmeric.webp",
        alt: "Luma Turmeric Curcumin advertorial for joint relief",
        width: 1200,
        height: 4228,
        caption: "Advertorial - Turmeric Curcumin for Joint Relief",
      },
      {
        src: "/projects/luma-cholesterol.webp",
        alt: "Luma Nutrition berberine advertorial about cholesterol",
        width: 1200,
        height: 4228,
        caption: "Advertorial - Why Your Berberine Isn’t Doing Anything for Your Cholesterol",
      },
      {
        src: "/projects/luma-blood-sugar.webp",
        alt: "Luma Nutrition berberine advertorial about afternoon blood sugar crashes",
        width: 1200,
        height: 4228,
        caption: "Advertorial - 5 Reasons Your Blood Sugar Crashes Every Afternoon",
      },
      {
        src: "/projects/luma-berberine.webp",
        alt: "Luma Nutrition berberine advertorial about weight loss",
        width: 1200,
        height: 4407,
        newRow: true,
        caption: "Advertorial - 7 Things To Know Before You Buy Berberine",
      },
      {
        src: "/projects/luma-magnesium.webp",
        alt: "Luma Nutrition magnesium glycinate advertorial about sleep",
        width: 1200,
        height: 4407,
        caption: "Advertorial - How to Choose a Magnesium for Sleep",
      },
    ],
  },
  {
    slug: "hume-health",
    title: "Hume Health: Advertorials that scale",
    category: "FUNNELISH · ADVERTORIALS",
    image: "/projects/hume-cover.webp",
    brand: "Hume Health",
    summary:
      "A high-volume Funnelish program of advertorials and interactive calculator funnels.",
    filters: ["Landing Pages"],
    featured: true,
    tag: "Smart Health Wearables Brand (Funnelish Development)",
    headline: "Advertorials & Interactive Calculator Funnels for Paid Traffic",
    description: [
      "Hume Health builds smart health hardware - the Hume Band 2.0 wearable and the Hume Body Pod body-composition scanner. The work was a high-volume landing page program on Funnelish: long-form advertorials and interactive health calculators built as dedicated entry points for cold paid traffic on Meta and native.",
      "Each advertorial is engineered as a scroll - a curiosity hook, a problem the reader recognises in themselves, then the product introduced as the mechanism that solves it, backed by spec blocks, testimonials, comparison tables, FAQs and repeated CTAs placed at the exact points where intent peaks.",
      "The calculator pages lead with a working tool instead of a pitch. Readers enter their own numbers - blood pressure, height and weight, waist and hip - and get an instant result scored against real clinical ranges, which earns the attention the offer then converts. Every page is built mobile-first, loads fast on ad traffic, and ships in tracked variants so headlines, hooks and offer blocks can be tested without touching the main store.",
    ],
    services: [
      "Funnelish Development",
      "Advertorial Design & Build",
      "Landing Page Design",
      "Interactive Calculator Development",
      "Conversion Rate Optimization",
      "Mobile-First Responsive Development",
      "A/B Test Variants",
    ],
    industries: ["Health Tech & Wearables", "Health & Wellness", "DTC E-Commerce"],
    liveUrl: "https://humehealth.com",
    links: [
      {
        label: "Advertorial - Why You're Always Tired (It's Not Sleep)",
        href: "https://insights.smartscalesreviews.com/why-you-are-always-tired-its-not-sleep",
      },
      {
        label: "Advertorial - Still Tired After 8 Hours of Sleep",
        href: "https://insights.smartscalesreviews.com/still-tired-after-8-hours-of-sleep",
      },
      {
        label: "Calculator - Blood Pressure & MAP",
        href: "https://insights.smartscalesreviews.com/blood-pressure-calculator-vstd-273",
      },
      {
        label: "Calculator - BMI & Weight Loss",
        href: "https://buy.humehealth.com/bmi-calculator-and-weight-loss",
      },
      {
        label: "Calculator - Waist-to-Hip Ratio",
        href: "https://buy.humehealth.com/waist-to-hip-ratio-calculator-vstd-380",
      },
    ],
    gallery: [
      {
        src: "/projects/hume-banner.webp",
        alt: "Hume Health brand identity logo banner",
        width: 1920,
        height: 408,
        full: true,
      },
      {
        src: "/projects/hume-advertorial-tired.webp",
        alt: "Hume Band 2.0 advertorial, full page: why you're always tired",
        width: 933,
        height: 4921,
        caption: "Advertorial - Why You’re Always Tired (It’s Not Sleep)",
      },
      {
        src: "/projects/hume-advertorial-sleep.webp",
        alt: "Hume Band 2.0 advertorial, full page: still tired after eight hours of sleep",
        width: 933,
        height: 6846,
        caption: "Advertorial - Still Tired After 8 Hours of Sleep",
      },
      {
        src: "/projects/hume-calculator-bp.webp",
        alt: "Hume Health blood pressure and mean arterial pressure calculator page",
        width: 933,
        height: 4616,
        newRow: true,
        caption: "Calculator - Blood Pressure & MAP",
      },
      {
        src: "/projects/hume-calculator-bmi.webp",
        alt: "Hume Body Pod BMI and weight loss calculator page",
        width: 933,
        height: 2478,
        caption: "Calculator - BMI & Weight Loss",
      },
    ],
  },
  {
    slug: "aavilo",
    title: "Aavilo: Pet wellness that converts",
    category: "PRODUCT PAGE DESIGN · STORE REDESIGN",
    image: "/projects/aavilo-card.webp",
    brand: "Aavilo",
    summary:
      "A Shopify redesign plus landing pages that make a pet wellness range easy to buy.",
    filters: ["Shopify", "Landing Pages"],
    featured: true,
    tag: "DTC Pet Wellness Brand (Shopify Development)",
    headline: "Shopify Store Redesign & High-Converting Landing Pages",
    description: [
      "Aavilo is a direct-to-consumer pet wellness brand focused on natural supplements for dogs. The project involved redesigning the Shopify store and creating dedicated landing pages that clearly communicate product benefits, improve customer trust, and increase conversions.",
      "The goal was to build a faster, cleaner, and conversion-focused shopping experience with improved product presentation, better information hierarchy, optimized mobile responsiveness, and landing pages designed specifically for paid traffic.",
    ],
    services: [
      "Shopify Development",
      "Shopify Store Redesign",
      "Landing Page Design",
      "UI/UX Design",
      "Responsive Development",
    ],
    industries: ["Pet Health & Wellness", "DTC E-Commerce"],
    liveUrl: "https://aavilo.com",
    gallery: [
      {
        src: "/projects/aavilo-logo.webp",
        alt: "Aavilo brand identity logo banner",
        width: 1920,
        height: 2016,
        full: true,
      },
      {
        src: "/projects/aavilo-banner.webp",
        alt: "Aavilo product pouch packaging mockup",
        width: 1920,
        height: 408,
        full: true,
      },
      {
        src: "/projects/aavilo-pdp-green.webp",
        alt: "Aavilo storefront desktop product page design",
        width: 927,
        height: 2967,
      },
      {
        src: "/projects/aavilo-pdp-purple.webp",
        alt: "Aavilo mobile ordering experience",
        width: 927,
        height: 2967,
      },
    ],
  },
  {
    slug: "baby-gains",
    title: "Baby Gains: Strong bodies, bright minds",
    category: "SHOPIFY REDESIGN",
    image: "/projects/baby-gains-card.webp",
    brand: "Baby Gains",
    summary:
      "A full Shopify redesign for a children’s fitness brand, from collection page to PDP.",
    filters: ["Shopify"],
    featured: true,
    tag: "Children's Fitness Equipment Brand (Shopify Development)",
    headline: "Complete Shopify Store Redesign",
    description: [
      "Baby Gains is a fitness equipment brand focused on helping children develop strength, coordination, and confidence through age-appropriate products. The project included a complete Shopify redesign to create a modern shopping experience that better represents the brand and simplifies product discovery.",
      "The new experience focused on improved navigation, clearer collection organization, stronger visual hierarchy, and a responsive storefront that delivers a seamless shopping journey across desktop and mobile devices.",
    ],
    services: [
      "Shopify Development",
      "Complete Store Redesign",
      "UI/UX Design",
      "Collection Page Design",
      "Product Page Design",
      "Responsive Development",
    ],
    industries: ["Children's Fitness", "Sporting Goods", "E-Commerce"],
    liveUrl: "http://babygains.store",
    gallery: [
      {
        src: "/projects/baby-gains-banner.webp",
        alt: "Baby Gains brand identity logo banner",
        width: 1920,
        height: 408,
        full: true,
      },
      {
        src: "/projects/baby-gains-before-after.webp",
        alt: "Baby Gains storefront redesign, before and after",
        width: 1920,
        height: 1197,
        full: true,
      },
      {
        src: "/projects/baby-gains-mobile.webp",
        alt: "Baby Gains mobile ordering experience",
        width: 1920,
        height: 750,
        full: true,
      },
      {
        src: "/projects/baby-gains-1.webp",
        alt: "Baby Gains brand experience landing page design",
        width: 604,
        height: 882,
      },
      {
        src: "/projects/baby-gains-2.webp",
        alt: "Baby Gains custom Shopify product details page",
        width: 604,
        height: 882,
      },
      {
        src: "/projects/baby-gains-3.webp",
        alt: "Baby Gains checkout and customer bundles journey",
        width: 604,
        height: 882,
      },
    ],
  },
  {
    slug: "hanson-of-sonoma",
    title: "Hanson of Sonoma: Premium spirits online",
    category: "SHOPIFY REDESIGN",
    image: "/projects/hanson-card.webp",
    brand: "Hanson of Sonoma",
    summary:
      "A premium Shopify rebuild that finally matches the shopping experience to the brand.",
    filters: ["Shopify"],
    featured: true,
    tag: "Premium Wine & Lifestyle Brand (Shopify Development)",
    headline: "Premium Shopify Store Redesign",
    description: [
      "Hanson of Sonoma is a premium lifestyle and spirits brand that required a refined online shopping experience reflecting its premium identity. The project involved a complete Shopify redesign focused on improving usability, storytelling, and the overall purchasing experience.",
      "The redesigned storefront features cleaner layouts, improved navigation, stronger product presentation, and a premium visual experience that helps customers explore the brand and purchase with confidence.",
    ],
    services: [
      "Shopify Development",
      "Shopify Store Redesign",
      "UI/UX Design",
      "Product Page Design",
      "Responsive Development",
    ],
    industries: ["Food & Beverage", "Premium Consumer Goods", "E-Commerce"],
    liveUrl: "https://hansonofsonoma.com",
    gallery: [
      {
        src: "/projects/hanson-banner.webp",
        alt: "Hanson of Sonoma brand identity logo banner",
        width: 1920,
        height: 408,
        full: true,
      },
      {
        src: "/projects/hanson-before-after.webp",
        alt: "Hanson of Sonoma storefront redesign, before and after",
        width: 1920,
        height: 1197,
        full: true,
      },
      {
        src: "/projects/hanson-1.webp",
        alt: "Hanson of Sonoma craft distillery heritage section",
        width: 604,
        height: 882,
      },
      {
        src: "/projects/hanson-2.webp",
        alt: "Hanson of Sonoma product presentation design",
        width: 604,
        height: 882,
      },
      {
        src: "/projects/hanson-3.webp",
        alt: "Hanson of Sonoma product recipes and blog section",
        width: 604,
        height: 882,
      },
    ],
  },
  {
    slug: "wacky-jackys",
    title: "Wacky Jacky's: Batik fabrics and textile retreats",
    category: "SHOPIFY · STORE MANAGEMENT",
    image: "/projects/wacky-jackys-card.webp",
    brand: "Wacky Jacky's",
    summary:
      "Ongoing Shopify store management and design improvements for a batik fabric and textile retreat brand.",
    filters: ["Shopify"],
    tools: ["Shopify"],
    tag: "Batik Fabrics & Textile Retreats (Shopify Store Management)",
    headline: "Shopify Store Management & Design Improvements",
    description: [
      "Wacky Jacky's ships hand-made batik fabrics from Bali and runs textile retreats in Bali and Java for quilters and makers. The store sells fabric collections, a monthly mystery box and retreat places, so it changes often as new seasons and collections arrive.",
      "I worked on the Shopify side of the business: managing the store day to day and improving the design of its pages, so new collections, retreats and offers are easy to find and the storefront keeps a consistent, polished look.",
    ],
    services: [
      "Shopify Store Management",
      "Shopify Design Improvements",
      "Collection & Product Updates",
      "Homepage Sections",
      "Responsive Development",
    ],
    industries: ["Batik Fabrics", "Quilting & Textiles", "Retreats & Travel"],
    liveUrl: "https://wackyjackys.com/",
    gallery: [
      {
        src: "/projects/wacky-jackys-hero.webp",
        alt: "Wacky Jacky's Shopify homepage with the Mystery Monthly Box banner",
        width: 1920,
        height: 1100,
        full: true,
      },
      {
        src: "/projects/wacky-jackys-retreats.webp",
        alt: "Wacky Jacky's upcoming textile retreats section",
        width: 1920,
        height: 1050,
        full: true,
      },
      {
        src: "/projects/wacky-jackys-collection.webp",
        alt: "Wacky Jacky's batik fabric collection with category tabs",
        width: 1920,
        height: 1050,
        full: true,
      },
      {
        src: "/projects/wacky-jackys-testimonials.webp",
        alt: "Wacky Jacky's retreat testimonials and brand highlights",
        width: 1920,
        height: 1980,
        full: true,
      },
      {
        src: "/projects/wacky-jackys-community.webp",
        alt: "Wacky Jacky's retreat photo gallery section",
        width: 1920,
        height: 1560,
        full: true,
      },
    ],
  },
  {
    slug: "kitchen-corner",
    title: "Kitchen Corner: Craftsmanship online",
    category: "HEADLESS WORDPRESS",
    image: "/projects/kitchen-corner-card.webp",
    brand: "Kitchen Corner",
    summary:
      "A headless WordPress site that turns a twenty-year company story into credibility.",
    filters: ["WordPress"],
    featured: true,
    tag: "Kitchen Solutions Brand (Headless WordPress Development)",
    headline: "Headless WordPress Website Design & Development",
    description: [
      "Kitchen Corner wanted a professional website to showcase the company's journey, expertise, completed projects, and product offerings. The objective was to establish credibility while creating an informative platform that highlights the brand's experience and craftsmanship.",
      "The website was built as a headless WordPress site: WordPress manages the content, delivered to a separate custom front end with a clean, modern design, intuitive navigation, responsive layouts, and structured content that effectively communicates the company's history, services, and portfolio.",
    ],
    services: [
      "Headless WordPress Development",
      "Website Design",
      "UI/UX Design",
      "Responsive Development",
      "Content Layout",
    ],
    industries: ["Interior Design", "Modular Kitchens", "Home Improvement"],
    liveUrl: "https://mykitchencorner.in",
    gallery: [
      {
        src: "/projects/kitchen-corner-banner.webp",
        alt: "Kitchen Corner brand identity logo banner",
        width: 1920,
        height: 408,
        full: true,
      },
      {
        src: "/projects/kitchen-corner-before-after.webp",
        alt: "Kitchen Corner website redesign, before and after",
        width: 1920,
        height: 1197,
        full: true,
      },
      {
        src: "/projects/kitchen-corner-fullpage.webp",
        alt: "Kitchen Corner full homepage design",
        width: 933,
        height: 3492,
      },
      {
        src: "/projects/kitchen-corner-1.webp",
        alt: "Kitchen Corner product styling mockup",
        width: 933,
        height: 1128,
      },
      {
        src: "/projects/kitchen-corner-2.webp",
        alt: "Kitchen Corner projects and process section",
        width: 933,
        height: 1128,
      },
      {
        src: "/projects/kitchen-corner-3.webp",
        alt: "Kitchen Corner brand story and customer testimonials",
        width: 933,
        height: 1128,
      },
    ],
  },
];

/**
 * The offer, in the words used to sell it. Single source for both the header's
 * Services dropdown and the About block, so the two can't drift apart. Every
 * entry scrolls to the services section and nowhere else — deliberately, so
 * the dropdown is navigation within the page rather than a set of exits.
 */
export const SERVICES = [
  {
    label: "White-Label Development",
    href: "/#services",
    hash: "#services",
    blurb:
      "Production capacity for agencies. I build under your brand, to your process, and stay invisible to your client.",
  },
  {
    label: "Figma to Shopify",
    href: "/#services",
    hash: "#services",
    blurb:
      "Your design file built as a real storefront - sections, states and breakpoints, not an approximation of the comp.",
  },
  {
    label: "Landing Pages",
    href: "/landing-page-developer/",
    hash: undefined,
    blurb:
      "Standalone pages and advertorials built to take paid traffic. Send a reference link, get a live page in about an hour.",
  },
  {
    label: "Product Pages",
    href: "/#services",
    hash: "#services",
    blurb:
      "The page that has to do the selling: clearer hierarchy, stronger product presentation, and fast on a phone.",
  },
  {
    label: "Store Redesign & Migration",
    href: "/#services",
    hash: "#services",
    blurb:
      "Complete storefront rebuilds, or a move onto Shopify that keeps what already works and fixes what doesn’t.",
  },
  {
    label: "Conversion Optimization",
    href: "/conversion-optimization/",
    hash: undefined,
    blurb:
      "Find what the current page is costing you, fix it, and measure the difference instead of guessing at it.",
  },
];

/**
 * A service with its own page rather than a home-page anchor. Kept out of
 * SERVICES so that list stays "scrolls to #services"; the header dropdown and
 * the home Services list each append it, and the list links out to the page.
 */
export const CHECKOUT_CHAMP_SERVICE = {
  label: "Checkout Champ Development",
  href: "/checkout-champ-developer/",
  hash: undefined,
  blurb:
    "Funnels built end to end on Checkout Champ - advertorials, VSL pages, checkouts, upsells and subscriptions - with offers and tracking configured and tested before traffic hits.",
};

/** Shopify service page (/shopify-developer/). */
export const SHOPIFY_SERVICE = {
  label: "Shopify Development",
  href: "/shopify-developer/",
  hash: undefined,
  blurb:
    "Store redesigns, product and collection pages, landing pages and Figma to Shopify builds for DTC brands and agencies.",
};

/**
 * The four services shown in the UI lists (header dropdown, About). Shopify
 * and Checkout Champ are the main offers; Landing Pages and Conversion
 * Optimization sit beside them. The other SERVICES entries are
 * kinds of work, not separate offers, so they stay out of the UI and only
 * feed structured data (and their own pages later).
 */
const byLabel = (label: string) => SERVICES.find((s) => s.label === label)!;
export const MAIN_SERVICES = [
  SHOPIFY_SERVICE,
  CHECKOUT_CHAMP_SERVICE,
  byLabel("Landing Pages"),
  byLabel("Conversion Optimization"),
];

/**
 * The five platforms the work is built on, shown as app tiles with a row of
 * things a client can ask for underneath.
 *
 * `bg` is the tile colour; `size` is the logo width inside the tile;
 * `knockout` turns the logo white (for logos placed on their brand colour).
 * Figma has no file: its mark is drawn inline by the section.
 */
export const TOOLS_SECTION = {
  heading: "From Figma to checkout",
  sub: "I build on the platforms DTC brands already sell with, from the first design file to the last upsell.",
  tools: [
    { label: "Shopify", src: "/tools/shopify-bag.webp", bg: "#ffffff", size: "54%" },
    { label: "Checkout Champ", src: "/tools/checkout-champ-mark.webp", bg: "#f36319", size: "64%", knockout: true },
    { label: "Funnelish", src: "/tools/funnelish-mark.webp", bg: "#24242c", size: "62%" },
    { label: "Figma", bg: "#1e1e1e", size: "34%" },
    { label: "WordPress", src: "/tools/wordpress.svg", bg: "#21759b", size: "58%", knockout: true },
  ] as { label: string; src?: string; bg: string; size: string; knockout?: boolean }[],
  chips: [
    "Redesign a Shopify store",
    "Launch a sales funnel",
    "Set up subscriptions",
    "Add upsells & downsells",
    "Turn Figma into code",
    "Build a WordPress site",
  ],
};

/**
 * Home-page services as cards: a macOS-style window (working close,
 * minimise and zoom buttons), a glowing line illustration (drawn in code, see
 * ServiceGraphic) and the copy. `details` shows in the zoomed window. First
 * person: this is a portfolio.
 */
export const SERVICES_SECTION = {
  heading: "Services",
  sub: "Two platforms I specialise in, and the work that makes them sell.",
  cards: [
    {
      tag: "Shopify",
      title: "Shopify Development",
      text: "Store redesigns, product and collection pages, and Figma to Shopify builds your team can edit.",
      href: "/shopify-developer/",
      linkLabel: "Explore Shopify development",
      details: [
        "Store redesigns and migrations",
        "Product and collection pages",
        "Figma to Shopify, section by section",
        "Custom theme sections in Liquid",
      ],
      graphic: "shopify",
    },
    {
      tag: "Checkout Champ",
      title: "Checkout Champ Funnels",
      text: "Advertorials, checkouts, upsells and subscriptions, tested with real orders before traffic hits.",
      href: "/checkout-champ-developer/",
      linkLabel: "Explore Checkout Champ development",
      details: [
        "Advertorial, VSL and quiz pages",
        "Checkout, upsell and downsell flows",
        "Subscriptions and recurring billing",
        "Pixels, UTMs and A/B tests set up and verified",
      ],
      graphic: "funnel",
    },
    {
      tag: "Landing Pages",
      title: "Landing Pages",
      text: "Long-form landing pages and advertorials built to take paid traffic from Meta and Google.",
      href: "/landing-page-developer/",
      linkLabel: "Explore landing page development",
      details: [
        "Long-form landing pages",
        "Editorial advertorials",
        "Built for Meta and Google traffic",
        "Fast and responsive on every phone",
      ],
      graphic: "landing",
    },
    {
      tag: "CRO",
      title: "Conversion Optimization",
      text: "Find what the current page is costing you, fix it, and measure the difference.",
      href: "/conversion-optimization/",
      linkLabel: "Explore conversion optimization",
      details: [
        "A review of what the page is costing you",
        "Clear fixes, in priority order",
        "A/B tests set up properly",
        "The difference measured before and after",
      ],
      graphic: "cro",
    },
  ] as {
    tag: string;
    title: string;
    text: string;
    href: string;
    linkLabel: string;
    details: string[];
    graphic: "shopify" | "funnel" | "landing" | "cro";
  }[],
};

/** Home-page work grid: four projects that cover the range of the work. */
export const SELECTED_WORK = {
  heading: "Selected work",
  sub: "A few recent builds across Shopify stores, funnels and landing pages.",
  slugs: ["baby-gains", "hume-health", "hanson-of-sonoma", "aavilo"],
  allHref: "/projects/",
  allLabel: "See all case studies",
};

/**
 * Home-page "How I work": four stages on a horizontal timeline. Each stage
 * has an intro line, three steps and the outcome it leaves you with.
 */
export const PROCESS = {
  heading: "How I work",
  sub: "Four stages from first message to a live page, so you always know what happens next.",
  stages: [
    {
      icon: "brief",
      title: "Brief & Scope",
      intro: "Every project starts with the goal, not the page.",
      steps: [
        "You send the goal, the store or Figma file, and the pages that matter",
        "I review what is live now and ask the questions that change the build",
        "A clear scope and a fixed quote before any work starts",
      ],
      outcome: "You know exactly what you get and what it costs",
    },
    {
      icon: "design",
      title: "Design",
      intro: "Layouts planned for the phone first, where most traffic lands.",
      steps: [
        "Desktop and mobile layouts, or your Figma file checked",
        "Missing states and breakpoints filled in before the build",
        "Hierarchy built around the offer and the call to action",
      ],
      outcome: "A design that is ready to build, not just to look at",
    },
    {
      icon: "build",
      title: "Build",
      intro: "Hand-built, and easy for your team to edit afterwards.",
      steps: [
        "Shopify theme sections in Liquid, HTML, CSS and JavaScript",
        "Funnels configured in Checkout Champ and Funnelish",
        "Offers, step paths and tracking set up as part of the build",
      ],
      outcome: "Pages your team can edit without touching code",
    },
    {
      icon: "launch",
      title: "Test & Launch",
      intro: "Proved working before paid traffic hits it.",
      steps: [
        "Checked on real devices and browsers",
        "Every funnel run end to end with real test orders",
        "Pixels and events verified, then launched with you",
      ],
      outcome: "A launch with no surprises after it goes live",
    },
  ] as {
    icon: "brief" | "design" | "build" | "launch";
    title: string;
    intro: string;
    steps: string[];
    outcome: string;
  }[],
};

/** Home-page FAQ. Also emitted as FAQPage structured data on the home page. */
export const HOME_FAQ = {
  heading: "Questions, answered",
  sub: "The things people usually ask before we start. Anything else, just ask.",
  items: [
    {
      q: "How much does a project cost?",
      a: "It depends on scope: one landing page is a much smaller job than a store redesign or a full funnel. Send the details through the inquiry form and I'll quote the agreed scope before any work starts.",
    },
    {
      q: "How long does a project take?",
      a: "That also depends on scope. You get a timeline together with the quote, so you know when to expect each page before anything starts.",
    },
    {
      q: "Which platforms do you build on?",
      a: "Shopify for stores, Checkout Champ and Funnelish for funnels, and WordPress for content sites. Designs usually start in Figma, and I can design them too.",
    },
    {
      q: "Do you work with agencies?",
      a: "Yes. I take on white-label development for agencies, working to your process and staying invisible to your client.",
    },
    {
      q: "Can my team edit the pages after launch?",
      a: "Yes. Shopify pages are built as theme sections you edit in the theme editor, and funnel pages stay editable in the platform's page builder.",
    },
    {
      q: "How do we get started?",
      a: "Send a project inquiry with your goal and any links or Figma files. I read every message myself and reply by email with questions or a next step.",
    },
  ],
};

/**
 * Top bar. An entry with `items` renders as a caret dropdown; one without is a
 * plain link. `hash` marks a target that lives on the home page, so the header
 * can smooth-scroll to it when it is already there and fall back to a normal
 * /#hash navigation when it is not.
 */
export const NAV = {
  cta: "Work with me",
  items: [
    {
      label: "Services",
      href: "/#about",
      hash: "#about",
      /* The four main services only (see MAIN_SERVICES). */
      items: MAIN_SERVICES,
    },
    { label: "Work", href: "/projects/" },
  ],
};

export const ABOUT = {
  /** Two-line pull quote; rendered in the editorial serif. */
  quote: ["Design wins the click.", "Clarity wins the sale."],
  /* Trimmed to roughly five lines: the column has to finish level with the
     portrait beside it. */
  paragraph:
    "I’m an ecommerce frontend specialist who designs, develops and optimizes high-performing storefronts for DTC brands worldwide - from complete Shopify redesigns to landing pages built for paid traffic. My focus is what actually moves the needle: faster load times, clearer hierarchy, stronger product presentation.",
  ctaPrimary: "Let’s talk",
  ctaSecondary: "See the work",
  services: MAIN_SERVICES.map((s) => s.label),
  clients: [
    "Aavilo",
    "Baby Gains",
    "Hanson of Sonoma",
    "Kitchen Corner",
  ],
  portrait: "/portrait.webp",
  portraitName: "Meet Khunt",
  portraitRole: "Ecommerce Frontend Specialist",
};

export const CONTACT = {
  /* Every "Let’s talk" / "Work with me" button opens the inquiry form. */
  href: "/contact/",
  label: "Let’s talk",
  /* Closing section on the home page */
  closingText: "Have a store, funnel or landing page in mind? Tell me what you are building and I will reply by email.",
  closingCta: "Send a project inquiry",
};

/**
 * Project inquiry form (/contact/). Submissions are relayed by FormSubmit to
 * the inbox below. The first submission triggers a one-time activation
 * email from FormSubmit; after activating, FormSubmit offers a random alias
 * that can replace the address in `endpoint` to keep it out of page source.
 */
export const INQUIRY = {
  path: "/contact/",
  endpoint: "https://formsubmit.co/ajax/khuntmeet9@gmail.com",
  eyebrow: "Contact",
  heading: "Let's build your next Shopify store or funnel",
  intro:
    "Share what you are building and I will reply by email with questions or a next step.",
  /** Social proof above the heading: real clients only, no ratings. */
  proof: {
    title: "Trusted by DTC brands",
    text: "Baby Gains, Hanson of Sonoma, Hume Health & more",
    avatars: [
      "/images/contact/client-1.webp",
      "/images/contact/client-2.webp",
      "/images/contact/client-3.webp",
      "/images/contact/client-4.webp",
    ],
  },
  /** Photo reel under the form: stacked, one shown per second, grain on top. */
  reel: {
    images: [1, 2, 3, 4, 5, 6].map((n) => `/images/contact/reel/reel-${n}.webp`),
    grain: "/images/grain.png",
  },
  /** Recent work shown under the form. */
  showcase: [
    { slug: "baby-gains", name: "Baby Gains", type: "Shopify store redesign", src: "/projects/baby-gains-card.webp" },
    { slug: "hanson-of-sonoma", name: "Hanson of Sonoma", type: "Shopify store redesign", src: "/projects/hanson-card.webp" },
    { slug: "aavilo", name: "Aavilo", type: "Shopify store redesign", src: "/projects/aavilo-card.webp" },
  ],
  services: [
    "Shopify development",
    "Checkout Champ funnel",
    "Funnelish funnel",
    "Landing page or advertorial",
    "Figma to Shopify",
    "Store redesign or migration",
    "Conversion optimization",
    "White-label work for an agency",
    "Something else",
  ],
  budgets: ["Under $1,000", "$1,000 - $3,000", "$3,000 - $10,000", "$10,000+"],
  submit: "Send inquiry",
  successTitle: "Thanks, your inquiry is in.",
  successText: "I read every message myself and will reply by email shortly.",
  errorText: "Something went wrong sending your inquiry. Please try again in a moment.",
  steps: [
    { title: "I reply by email", text: "I read your brief myself and reply with questions or a next step." },
    { title: "Scope and quote", text: "You get a clear scope and a fixed quote before any work starts." },
    { title: "Build and launch", text: "I build it, test the full journey and hand over a live page." },
  ],
};

/**
 * Professional profiles kept out of the page UI on purpose. They appear only
 * in structured data (Person sameAs) and llms.txt, for crawlers.
 */
export const HIDDEN_PROFILES = [
  { label: "Upwork", href: "https://www.upwork.com/freelancers/~0110c208fdf0361786" },
  { label: "Contra", href: "https://contra.com/meetkhunt" },
];

export const FOOTER = {
  socials: [
    { label: "LINKEDIN", href: "https://www.linkedin.com/in/meetkhunt1/" },
    { label: "SKET FUTURE", href: "https://sketfuture.com" },
  ],
  address: [
    "Ecommerce Frontend Specialist",
    "Shopify · WordPress · DTC",
    "Working worldwide",
  ],
  teaser: ["Do you like", "What you see?"],
  contactHref: "#contact",
  /** Black footer: scrolling wordmark, three columns, availability line. */
  wordmark: "Meet Khunt",
  columns: [
    {
      title: "Meet Khunt",
      links: [
        { label: "Home", href: "/" },
        { label: "Work", href: "/projects/" },
        { label: "Blog", href: "/blog/" },
        { label: "Let's talk", href: "/contact/" },
      ],
    },
    {
      title: "Services",
      links: [
        { label: "Shopify Development", href: "/shopify-developer/" },
        { label: "Checkout Champ Funnels", href: "/checkout-champ-developer/" },
        { label: "Landing Pages", href: "/landing-page-developer/" },
        { label: "Conversion Optimization", href: "/conversion-optimization/" },
      ],
    },
    {
      title: "Contact",
      links: [
        { label: "Send a project inquiry", href: "/contact/" },
        { label: "LinkedIn", href: "https://www.linkedin.com/in/meetkhunt1/" },
        { label: "Sket Future", href: "https://sketfuture.com" },
      ],
    },
  ],
  status: "Available for projects",
};
