/**
 * Search-ranking service pages. Same template as the other service pages
 * (ServiceLanding), with extra long-form `sections` and `related` links for
 * depth. They are indexed and in the sitemap but not in the header menu:
 * reached from search, from the Shopify service page and from supporting
 * articles. Only claims the site can back: every project named has a case
 * study, and no prices, timelines, ratings or results are promised.
 */

import type { ServicePage } from "@/lib/services";

/* ------------------------------------------------------------------------ */
/* White label Shopify development                                           */
/* ------------------------------------------------------------------------ */

export const WHITE_LABEL_PAGE: ServicePage = {
  path: "/white-label-shopify-development/",
  meta: {
    title: "White Label Shopify Development for Agencies | Meet Khunt",
    description:
      "White label Shopify development for agencies: an outsourced Shopify developer for themes, redesigns, Figma to Shopify and landing pages under your brand.",
  },
  name: "White Label Shopify Development",
  hero: {
    eyebrow: "White Label Shopify Development",
    headline: "White Label Shopify Development for Agencies",
    description:
      "I'm Meet Khunt, a Shopify developer who works behind agencies. You win the client and own the relationship; I build the Shopify theme sections, store redesigns, Figma to Shopify builds and landing pages under your brand, to your process.",
    ctaSecondary: { label: "See Shopify work", href: "/projects/shopify/" },
  },
  fold: {
    lines: ["White label Shopify development.", "Built for agencies."],
    lead: [
      { text: "Your outsourced Shopify developer", bold: true },
      { text: " for theme builds, redesigns, Figma to Shopify and landing pages. You keep the client; " },
      { text: "I build under your brand", bold: true },
      { text: " and stay invisible." },
    ],
    mark: "shopify",
    cta: "Let's talk",
  },
  intro:
    "White label Shopify development means an agency hands Shopify build work to an outside developer, who delivers it under the agency's name. Meet Khunt is a Shopify developer who works this way for agencies: he builds custom theme sections in Liquid, HTML, CSS and JavaScript, complete store redesigns, Figma to Shopify builds, product and collection pages, and landing pages for paid traffic. His Shopify work includes store redesigns for Baby Gains, Hanson of Sonoma and Aavilo, a collection page for Athletic Annex, and landing pages for Riversol and Jadu Beauty.",
  services: {
    heading: "Shopify Work You Can Hand Off",
    description:
      "The Shopify development agencies most often outsource, delivered under your brand.",
    items: [
      {
        title: "Figma to Shopify",
        text: "Your designer's Figma file built as real Shopify theme sections, including the mobile layouts and states designs leave out.",
      },
      {
        title: "Custom Theme Development",
        text: "New sections, templates and theme customisation in Liquid, HTML, CSS and JavaScript, editable in the theme editor.",
      },
      {
        title: "Store Redesigns",
        text: "Full storefront redesigns for your clients, built on an unpublished theme and launched when the client signs off.",
      },
      {
        title: "Product & Collection Pages",
        text: "The pages that sell: product pages, collection pages, merchandising and filtering, built to your design.",
      },
      {
        title: "Landing Pages & Advertorials",
        text: "Pages for your clients' paid campaigns, in Shopify, page builders like Replo and GemPages, Funnelish or Checkout Champ.",
      },
      {
        title: "Overflow & Ongoing Support",
        text: "Extra build capacity when your team is full, plus ongoing store updates and fixes for clients you look after.",
      },
    ],
  },
  sections: [
    {
      heading: "How White Label Shopify Development Works",
      paragraphs: [
        "You sell and manage the project. I build it. Your client talks to you, sees your name on the work and never needs to know a partner was involved. I don't contact your clients, add credits or link back to myself.",
        "Work comes to me as a brief, a Figma file or a list of changes. I build on a development or unpublished theme in the client's store, so nothing changes on the live site until you and your client approve it. You review, send feedback, and publish when it's ready.",
        "The result is theme code your team can keep working with: sections that editors can change in the Shopify theme editor without touching code.",
      ],
    },
    {
      heading: "Who Outsources Shopify Development to Me",
      bullets: [
        {
          title: "Design agencies without in-house developers",
          text: "You design the store in Figma; I build it in Shopify so the live store matches the design file.",
        },
        {
          title: "Marketing and CRO agencies",
          text: "You plan the campaign and the test; I build the landing pages, product page changes and variants that run it.",
        },
        {
          title: "Shopify agencies at capacity",
          text: "When projects stack up, I take on builds so your team can keep delivery dates without hiring.",
        },
        {
          title: "Freelance designers and consultants",
          text: "You keep the client relationship and the design work, and hand off the Shopify build.",
        },
      ],
    },
    {
      heading: "Why Agencies Outsource Shopify Development",
      paragraphs: [
        "Hiring a full-time Shopify developer is a fixed cost that only pays off when there is always enough work. Outsourcing turns that into a cost per project: you bring in development when a client signs and you don't carry it when they don't.",
        "It also lets you say yes to work you couldn't staff, such as a full store redesign arriving in the same month as two landing page campaigns, while your team stays focused on strategy, design and the client.",
      ],
    },
  ],
  work: {
    heading: "Shopify Projects I've Built",
    description:
      "A selection of Shopify stores and pages from my portfolio: the kind of work agencies hand off.",
    slugs: ["baby-gains", "hanson-of-sonoma", "aavilo", "athletic-annex", "riversol", "jadu-beauty"],
    allHref: "/projects/shopify/",
    allLabel: "All Shopify projects",
  },
  process: {
    heading: "How We Work Together",
    steps: [
      {
        title: "Brief",
        text: "You send the brief, the Figma file or the change list, plus store access. I review it and ask the questions before quoting.",
      },
      {
        title: "Quote & Plan",
        text: "A fixed scope and price per project, agreed before any work starts, so you can quote your client with confidence.",
      },
      {
        title: "Build on a Dev Theme",
        text: "Built on a development or unpublished theme in the client's store, with progress you can share with your client.",
      },
      {
        title: "QA & Handoff",
        text: "Checked across devices and browsers, revised from your feedback, then handed back for you and your client to publish.",
      },
    ],
  },
  faq: {
    heading: "White Label Shopify Development FAQs",
    items: [
      {
        q: "What is white label Shopify development?",
        a: "It's Shopify development done by an outside developer and delivered under your agency's name. You sell and manage the project; the developer builds it and stays invisible to your client.",
      },
      {
        q: "Will my client know I outsourced the work?",
        a: "No. I don't contact your clients, sign the work or add links or credits. The work is delivered to you and presented by you.",
      },
      {
        q: "Who owns the code?",
        a: "Your client's store and theme belong to your client. Once a project is paid for, the code I write for it is yours and your client's to use and change.",
      },
      {
        q: "Can you build from my designer's Figma files?",
        a: "Yes. Figma to Shopify is one of the most common things agencies send me. I build the design as editable theme sections, including the mobile layouts and states a design file may not show.",
      },
      {
        q: "Do you work on the live store?",
        a: "No. I build on a development or unpublished theme, so the live store is untouched until you and your client approve the work and publish it.",
      },
      {
        q: "Can you work in our project tools?",
        a: "Yes. Briefs, feedback and updates can run through the tools your team already uses, so I fit into your process rather than adding a new one.",
      },
      {
        q: "Do you only do Shopify?",
        a: "Shopify is the core, but I also build landing pages and advertorials in Funnelish, Checkout Champ and page builders like Replo, and websites in WordPress, Wix and Squarespace, so I can cover most of what an agency's clients need.",
      },
      {
        q: "How is white label Shopify work priced?",
        a: "Per project, on a fixed scope agreed before work starts. Send the details through the inquiry form and I'll quote the agreed scope, so you can price it to your client.",
      },
    ],
  },
  related: {
    heading: "Related Services",
    links: [
      {
        label: "Shopify Store Redesign",
        href: "/shopify-store-redesign/",
        text: "Full redesigns for DTC brands, built on an unpublished theme and launched without downtime.",
      },
      {
        label: "Shopify Development",
        href: "/shopify-developer/",
        text: "Product pages, collection pages, landing pages and Figma to Shopify builds.",
      },
      {
        label: "Landing Page Development",
        href: "/landing-page-developer/",
        text: "Advertorials and landing pages for your clients' paid traffic.",
      },
    ],
  },
  cta: {
    heading: "Need a Shopify Developer Behind Your Agency?",
    description:
      "Send me the brief or the Figma file for your next client project, and I'll reply with questions or a quote.",
  },
  knowsAbout: [
    "White label Shopify development",
    "Outsourced Shopify development",
    "Shopify",
    "Shopify Liquid",
    "Shopify theme development",
    "Figma to Shopify",
    "Shopify store redesign",
    "Landing pages",
    "HTML",
    "CSS",
    "JavaScript",
  ],
};

/* ------------------------------------------------------------------------ */
/* Shopify store redesign                                                    */
/* ------------------------------------------------------------------------ */

export const STORE_REDESIGN_PAGE: ServicePage = {
  path: "/shopify-store-redesign/",
  meta: {
    title: "Shopify Store Redesign Services for DTC Brands | Meet Khunt",
    description:
      "Shopify store redesign services for DTC brands: homepage, product and collection pages redesigned on an unpublished theme and launched without downtime.",
  },
  name: "Shopify Store Redesign",
  hero: {
    eyebrow: "Shopify Store Redesign",
    headline: "Shopify Store Redesign Services for DTC Brands",
    description:
      "I'm Meet Khunt. I redesign Shopify stores for DTC brands: the homepage, product pages, collection pages and the path to checkout, rebuilt so the store matches the brand and makes buying easy, especially on a phone.",
    ctaSecondary: { label: "See redesign work", href: "/projects/shopify/" },
  },
  fold: {
    lines: ["Shopify store redesign.", "For DTC brands."],
    lead: [
      { text: "Your Shopify store redesigned", bold: true },
      { text: " around how your customers shop: a stronger homepage, product and collection pages, " },
      { text: "built on an unpublished theme", bold: true },
      { text: " and launched without downtime." },
    ],
    mark: "shopify",
    cta: "Let's talk",
  },
  intro:
    "A Shopify store redesign rebuilds how a store looks and works, usually the homepage, product pages, collection pages, navigation and mobile experience, while keeping the products, customers, orders and SEO the store already has. Meet Khunt redesigns Shopify stores for DTC brands: his redesigns include Baby Gains, a children's fitness brand, Hanson of Sonoma, a premium spirits brand, Aavilo, a pet wellness brand, and Mumma Mall, an Indian kids' store. He builds every page as editable Shopify theme sections and works on an unpublished theme so the live store keeps selling until launch.",
  services: {
    heading: "What a Shopify Redesign Covers",
    description: "The whole store, or the pages that matter most for your sales.",
    items: [
      {
        title: "Full Store Redesign",
        text: "Every key page redesigned and rebuilt together, so the store finally matches the brand from homepage to cart.",
      },
      {
        title: "Homepage",
        text: "A homepage that explains the brand fast and moves visitors into the range, with hero, best sellers and proof.",
      },
      {
        title: "Product Pages",
        text: "Clearer product presentation, benefits, reviews and offers, laid out to answer objections before the add to cart.",
      },
      {
        title: "Collection Pages",
        text: "Collections organised around how customers actually shop, with filtering and merchandising that help them choose.",
      },
      {
        title: "Mobile Experience",
        text: "Most DTC traffic is on a phone, so every page is designed and tested for mobile first, not squeezed down from desktop.",
      },
      {
        title: "Editable Theme Sections",
        text: "Built as Shopify theme sections your team can change in the theme editor without a developer.",
      },
    ],
  },
  sections: [
    {
      heading: "When a Shopify Redesign Is Worth It",
      bullets: [
        {
          title: "The store no longer matches the brand",
          text: "The brand, products or price point have moved on, but the store still looks like the launch version.",
        },
        {
          title: "Mobile shoppers drop off",
          text: "Pages built for desktop first make mobile visitors scroll past the things that should sell the product.",
        },
        {
          title: "Your team can't edit it",
          text: "Every banner or product change needs a developer because the theme was patched rather than built in sections.",
        },
        {
          title: "Paid traffic lands on weak pages",
          text: "Ads send visitors to product and collection pages that don't explain the product or make the next step obvious.",
        },
        {
          title: "The theme is outdated or heavily patched",
          text: "Years of apps and edits have left a theme that is slow to load and hard to change safely.",
        },
      ],
    },
    {
      heading: "What Makes a DTC Shopify Redesign Different",
      paragraphs: [
        "A DTC brand sells one brand's products directly, usually with paid social and search driving the traffic. That changes what the store has to do: it has to explain the product to someone who has never heard of it, prove it works, and make buying on a phone easy.",
        "So a DTC Shopify redesign focuses on the pages that carry that traffic: product pages that tell the story and answer objections, collection pages that help people choose, and a homepage that builds trust fast. Visual polish matters, but every section has a job in moving a visitor towards the cart.",
      ],
    },
    {
      heading: "Redesigning Without Losing Sales or SEO",
      bullets: [
        {
          title: "Built on an unpublished theme",
          text: "The new store is built and reviewed in a theme that isn't live, so customers keep buying from the current store until launch.",
        },
        {
          title: "Products, customers and orders stay put",
          text: "A redesign on Shopify changes the theme, not the store data: products, customers, orders and apps carry over.",
        },
        {
          title: "URLs and content are protected",
          text: "Product and collection URLs stay the same, and page titles, descriptions and content are carried across so search rankings aren't reset.",
        },
        {
          title: "Tested before launch",
          text: "Pages, cart and checkout flow are checked across devices and browsers before the new theme is published.",
        },
      ],
    },
  ],
  work: {
    heading: "Shopify Store Redesigns",
    description:
      "Shopify redesigns from full stores to the pages that sell, with the full case study for each.",
    slugs: ["baby-gains", "hanson-of-sonoma", "aavilo", "mumma-mall", "athletic-annex"],
    allHref: "/projects/shopify/",
    allLabel: "All Shopify projects",
  },
  process: {
    heading: "How a Redesign Runs",
    steps: [
      {
        title: "Review",
        text: "The current store, your goals and the pages that matter most for sales, reviewed before anything is quoted.",
      },
      {
        title: "Design",
        text: "New layouts for desktop and mobile, starting with the homepage, product and collection pages.",
      },
      {
        title: "Build",
        text: "Built as editable theme sections on an unpublished theme, so the live store keeps selling.",
      },
      {
        title: "Test & Launch",
        text: "Checked across devices, browsers, cart and checkout, then published when you approve it.",
      },
    ],
  },
  faq: {
    heading: "Shopify Store Redesign FAQs",
    items: [
      {
        q: "How much does a Shopify store redesign cost?",
        a: "It depends on how many pages are redesigned and how custom they are: a product page redesign is a much smaller job than a full store. Send the store and what you want changed through the inquiry form and I'll quote the agreed scope before any work starts.",
      },
      {
        q: "How long does a Shopify redesign take?",
        a: "It depends on the scope and on how quickly feedback comes back. A single page is much quicker than a full store. I'll give you a timeline with the quote, once the scope is agreed.",
      },
      {
        q: "Will a redesign hurt my SEO?",
        a: "It shouldn't. On Shopify, product and collection URLs stay the same through a theme change, and I carry page titles, descriptions and content across, so the redesign changes the design without resetting what search engines already know about your store.",
      },
      {
        q: "Will my store go offline during the redesign?",
        a: "No. I build on an unpublished theme, so your live store keeps taking orders until the new design is approved and published.",
      },
      {
        q: "Can you redesign only my product or collection pages?",
        a: "Yes. A redesign can be the whole store or just the pages that matter most for sales, such as product pages or collection pages.",
      },
      {
        q: "Do I need a new Shopify theme?",
        a: "Not always. Sometimes the best route is a new theme built properly in sections; sometimes the current theme can be redesigned page by page. I'll recommend one after reviewing your store.",
      },
      {
        q: "Will my team be able to edit the redesigned store?",
        a: "Yes. Every page is built as Shopify theme sections, so your team can change text, images and products in the theme editor without code.",
      },
      {
        q: "Do you redesign stores for agencies too?",
        a: "Yes. I also redesign Shopify stores white label for agencies, delivered under the agency's brand.",
      },
    ],
  },
  related: {
    heading: "Related Services",
    links: [
      {
        label: "White Label Shopify Development",
        href: "/white-label-shopify-development/",
        text: "For agencies: Shopify redesigns and builds delivered under your brand.",
      },
      {
        label: "Shopify Development",
        href: "/shopify-developer/",
        text: "Product pages, collection pages, landing pages and Figma to Shopify builds.",
      },
      {
        label: "Conversion Optimization",
        href: "/conversion-optimization/",
        text: "Improving the pages a redesign creates, based on how visitors actually use them.",
      },
    ],
  },
  cta: {
    heading: "Ready to Redesign Your Shopify Store?",
    description:
      "Send me your store link and what you want to change, and I'll reply with questions or a next step.",
  },
  knowsAbout: [
    "Shopify store redesign",
    "DTC Shopify redesign",
    "Shopify website redesign",
    "Shopify",
    "Shopify Liquid",
    "Shopify theme development",
    "Product page design",
    "Collection page design",
    "Mobile-first design",
    "Conversion rate optimization",
  ],
};
