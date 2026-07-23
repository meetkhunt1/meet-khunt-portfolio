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
};

export type Project = {
  slug: string;
  title: string;
  category: string;
  image: string;
  /** Grid column span on the 6-col works grid */
  span: 2 | 4;
  /** Small tag above the case-study headline */
  tag: string;
  /** Case-study H1 */
  headline: string;
  description: string[];
  services: string[];
  industries: string[];
  liveUrl: string;
  gallery: GalleryImage[];
};

export const PROJECTS: Project[] = [
  {
    slug: "aavilo",
    title: "Aavilo: Pet wellness that converts",
    category: "SHOPIFY · LANDING PAGES",
    image: "/projects/aavilo-card.webp",
    span: 4,
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
    span: 2,
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
    span: 2,
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
    span: 4,
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
