export const SITE = {
  title: "Meet Khunt — Ecommerce Frontend Specialist",
  description:
    "Meet Khunt — ecommerce frontend specialist designing, developing, and optimizing high-performing Shopify storefronts and landing pages for DTC brands across the globe.",
  ogImage: "/projects/baby-gains-before-after.webp",
  headerName: "MEET KHUNT",
  footerName: "MEET KHUNT",
  year: "2026",
  tagline:
    "Ecommerce frontend specialist building high-converting Shopify storefronts and landing pages for DTC brands.",
};

export const HERO = {
  /* Giant wordmark rendered as live text; split across the mini slideshow below 1200px */
  wordmark: "MEET KHUNT",
  wordmarkTop: "MEET",
  wordmarkBottom: "KHUNT",
  slides: [
    "/projects/baby-gains-before-after.webp",
    "/projects/hanson-before-after.webp",
    "/projects/kitchen-corner-before-after.webp",
    "/projects/aavilo-logo.webp",
    "/projects/baby-gains-mobile.webp",
  ],
  /* Pool for the desktop mouse-trail effect; mixed aspect ratios on purpose */
  trail: [
    "/projects/aavilo-card.webp",
    "/projects/baby-gains-1.webp",
    "/projects/hanson-card.webp",
    "/projects/kitchen-corner-3.webp",
    "/projects/aavilo-pdp-green.webp",
    "/projects/hanson-1.webp",
    "/projects/baby-gains-mobile.webp",
    "/projects/baby-gains-2.webp",
    "/projects/aavilo-logo.webp",
    "/projects/hanson-3.webp",
    "/projects/kitchen-corner-2.webp",
    "/projects/baby-gains-3.webp",
  ],
};

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
};

export const PROJECTS: Project[] = [
  {
    slug: "luma-nutrition",
    title: "Luma Nutrition: Advertorials built to convert",
    category: "ADVERTORIALS · LANDING PAGES",
    image: "/projects/luma-cover.webp",
    featured: true,
    tag: "DTC Supplement Brand (Advertorial Development)",
    headline: "Five Editorial Advertorials for Cold Paid Traffic",
    description: [
      "Luma Nutrition is a direct-to-consumer supplement brand — magnesium glycinate, berberine 1,200 mg and turmeric curcumin with BioPerine. The work was a set of five long-form advertorials, each built as a standalone page outside the main store so a different product and a different problem could be tested against its own traffic.",
      "Every page is dressed as editorial rather than as an ad: a publication masthead and disclaimer bar, an author byline with a last-updated stamp, and a numbered argument that walks the reader from the problem to the dose that actually solves it. Comparison tables, supplement-facts callouts, verified-review pull quotes and product blocks are placed at the points where the reader is most likely to act.",
      "The commerce layer is threaded through the scroll instead of parked at the end — sticky product bars that follow the reader, inline CTAs after each section, and offer buttons that hand off to the Luma Nutrition store. Each page is built mobile-first and kept light so it holds up under paid traffic.",
    ],
    services: [
      "Advertorial Design & Build",
      "Landing Page Design",
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
        caption: "Advertorial — Turmeric Curcumin for Joint Relief",
      },
      {
        src: "/projects/luma-cholesterol.webp",
        alt: "Luma Nutrition berberine advertorial about cholesterol",
        width: 1200,
        height: 4228,
        caption: "Advertorial — Why Your Berberine Isn’t Doing Anything for Your Cholesterol",
      },
      {
        src: "/projects/luma-blood-sugar.webp",
        alt: "Luma Nutrition berberine advertorial about afternoon blood sugar crashes",
        width: 1200,
        height: 4228,
        caption: "Advertorial — 5 Reasons Your Blood Sugar Crashes Every Afternoon",
      },
      {
        src: "/projects/luma-berberine.webp",
        alt: "Luma Nutrition berberine advertorial about weight loss",
        width: 1200,
        height: 4407,
        newRow: true,
        caption: "Advertorial — 7 Things To Know Before You Buy Berberine",
      },
      {
        src: "/projects/luma-magnesium.webp",
        alt: "Luma Nutrition magnesium glycinate advertorial about sleep",
        width: 1200,
        height: 4407,
        caption: "Advertorial — How to Choose a Magnesium for Sleep",
      },
    ],
  },
  {
    slug: "hume-health",
    title: "Hume Health: Advertorials that scale",
    category: "FUNNELISH · ADVERTORIALS",
    image: "/projects/hume-cover.webp",
    featured: true,
    tag: "Smart Health Wearables Brand (Funnelish Development)",
    headline: "Advertorials & Interactive Calculator Funnels for Paid Traffic",
    description: [
      "Hume Health builds smart health hardware — the Hume Band 2.0 wearable and the Hume Body Pod body-composition scanner. The work was a high-volume landing page program on Funnelish: long-form advertorials and interactive health calculators built as dedicated entry points for cold paid traffic on Meta and native.",
      "Each advertorial is engineered as a scroll — a curiosity hook, a problem the reader recognises in themselves, then the product introduced as the mechanism that solves it, backed by spec blocks, testimonials, comparison tables, FAQs and repeated CTAs placed at the exact points where intent peaks.",
      "The calculator pages lead with a working tool instead of a pitch. Readers enter their own numbers — blood pressure, height and weight, waist and hip — and get an instant result scored against real clinical ranges, which earns the attention the offer then converts. Every page is built mobile-first, loads fast on ad traffic, and ships in tracked variants so headlines, hooks and offer blocks can be tested without touching the main store.",
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
        label: "Advertorial — Why You're Always Tired (It's Not Sleep)",
        href: "https://insights.smartscalesreviews.com/why-you-are-always-tired-its-not-sleep",
      },
      {
        label: "Advertorial — Still Tired After 8 Hours of Sleep",
        href: "https://insights.smartscalesreviews.com/still-tired-after-8-hours-of-sleep",
      },
      {
        label: "Calculator — Blood Pressure & MAP",
        href: "https://insights.smartscalesreviews.com/blood-pressure-calculator-vstd-273",
      },
      {
        label: "Calculator — BMI & Weight Loss",
        href: "https://buy.humehealth.com/bmi-calculator-and-weight-loss",
      },
      {
        label: "Calculator — Waist-to-Hip Ratio",
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
        caption: "Advertorial — Why You’re Always Tired (It’s Not Sleep)",
      },
      {
        src: "/projects/hume-advertorial-sleep.webp",
        alt: "Hume Band 2.0 advertorial, full page: still tired after eight hours of sleep",
        width: 933,
        height: 6846,
        caption: "Advertorial — Still Tired After 8 Hours of Sleep",
      },
      {
        src: "/projects/hume-calculator-bp.webp",
        alt: "Hume Health blood pressure and mean arterial pressure calculator page",
        width: 933,
        height: 4616,
        newRow: true,
        caption: "Calculator — Blood Pressure & MAP",
      },
      {
        src: "/projects/hume-calculator-bmi.webp",
        alt: "Hume Body Pod BMI and weight loss calculator page",
        width: 933,
        height: 2478,
        caption: "Calculator — BMI & Weight Loss",
      },
    ],
  },
  {
    slug: "aavilo",
    title: "Aavilo: Pet wellness that converts",
    category: "PRODUCT PAGE DESIGN · STORE REDESIGN",
    image: "/projects/aavilo-card.webp",
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
    slug: "kitchen-corner",
    title: "Kitchen Corner: Craftsmanship online",
    category: "WORDPRESS",
    image: "/projects/kitchen-corner-card.webp",
    featured: true,
    tag: "Kitchen Solutions Brand (WordPress Development)",
    headline: "Corporate Website Design & Development",
    description: [
      "Kitchen Corner wanted a professional website to showcase the company's journey, expertise, completed projects, and product offerings. The objective was to establish credibility while creating an informative platform that highlights the brand's experience and craftsmanship.",
      "The website was built on WordPress with a clean, modern design, intuitive navigation, responsive layouts, and structured content that effectively communicates the company's history, services, and portfolio.",
    ],
    services: [
      "WordPress Development",
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

/** Home page shows a curated subset; /projects shows every project. */
export const FEATURED_PROJECTS = PROJECTS.filter((p) => p.featured);

/** Copy for the home-page work carousel */
export const WORKS = {
  eyebrow: "Case Studies",
  heading: "Selected work",
  subheading:
    "I don’t just talk about what I can build — here’s what I’ve already shipped.",
};

export const ABOUT = {
  headingLines: ["Hello there", "I’m Meet Khunt"],
  paragraph:
    "I’m an ecommerce frontend specialist who designs, develops, and optimizes high-performing storefronts for DTC brands across the globe. From complete Shopify redesigns to landing pages built for paid traffic, my work focuses on what actually moves the needle — faster load times, clearer information hierarchy, stronger product presentation, and shopping experiences that turn visitors into customers on any device.",
  services: [
    "Shopify Development",
    "Store Redesign",
    "Landing Page Design",
    "UI/UX Design",
    "Conversion Optimization",
    "WordPress Development",
    "Responsive Development",
    "Performance Optimization",
  ],
  clients: [
    "Aavilo",
    "Baby Gains",
    "Hanson of Sonoma",
    "Kitchen Corner",
  ],
  portrait: "/portrait.webp",
};

export const CONTACT = {
  href: "https://www.linkedin.com/in/meetkhunt1/",
  label: "Let’s talk",
};

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
};
