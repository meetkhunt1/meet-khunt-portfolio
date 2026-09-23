/**
 * Content for the /d2c offer page.
 *
 * The page layout is a 1:1 rebuild of a reference long-form offer page
 * (sections, spacing, type scale and component anatomy), with the palette
 * remapped to the portfolio's dark theme. Every string below maps to exactly
 * one slot in that layout, so copy can be swapped without touching markup.
 */

export const D2C_LINKEDIN = "https://www.linkedin.com/in/meetkhunt1/";
export const D2C_EMAIL = "khuntmeet9@gmail.com";

/** Every CTA on the page points here. */
export const D2C_CTA_HREF = D2C_LINKEDIN;

export const D2C_META = {
  title:
    "Landing Pages & Advertorials for D2C Brands in About an Hour | Meet Khunt",
  description:
    "I build conversion-ready landing pages and advertorials for D2C brands on Shopify. Send any reference page, get a live page in about an hour. Your first page is free.",
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
    "Landing pages and advertorials for D2C brands, delivered in about an hour — Meet Khunt",
};

/* ------------------------------------------------------------------ 1. Hero */

export const D2C_HERO = {
  /** Small outlined pill above the headline. */
  eyebrow: "Not For Beginners",
  /** Headline is split so the middle phrase carries the accent + underline. */
  headline: {
    before: "The Only Landing Page System You Need to",
    accent: "Ship Conversion-Ready Pages",
    after: "in About an Hour",
  },
  sub: "I build landing pages and advertorials for D2C brands scaling paid traffic — already shipping pages for brands and agencies that launch new angles every single week.",
  /** Label bar sitting on top of the video frame. */
  videoLabel: "Watch This Video For A Breakdown",
  /**
   * Paste an embed URL (Loom, Vimeo, YouTube). Empty string renders the
   * placeholder frame instead, so the layout is identical either way.
   */
  videoEmbedUrl: "",
  videoTitle: "How a page gets built in about an hour",
  videoPlaceholder: "Walkthrough coming soon",
  cta: "Get Your First Page Free",
};

/* ------------------------------------------------------- 2. Who is this for */

export const D2C_AUDIENCE = {
  title: "Who Is This System For?",
  forTitle: "🤩 This System is Built For:",
  forItems: [
    "Brands already spending on paid traffic and looking to test angles faster",
    "Founders and media buyers tired of waiting two weeks for a single page",
    "Agencies that need production capacity they can actually rely on",
    "Stores stuck at a conversion-rate ceiling and ready to fix the page, not the ad",
  ],
  notTitle: "☹️ This is NOT For:",
  notItems: [
    "Brands with no traffic yet and nothing to test against",
    "Anyone looking for the cheapest possible page on a marketplace",
    "Stores that want a full rebrand rather than pages that convert",
    "Businesses not ready to ship and iterate every week",
    "People looking for “just a template”",
  ],
};

/* ---------------------------------------------------------- 3. Proof / work */

export type D2CShot = {
  src: string;
  alt: string;
  /** Intrinsic size — the scroll frame needs it to reserve the layout box. */
  width: number;
  height: number;
};

/**
 * Full-page screenshots. They run 3,000–7,000px tall, so the page renders each
 * one inside a short frame that scrolls internally instead of laying it out at
 * full height.
 */
const LUMA_SHOTS: D2CShot[] = [
  {
    src: "/projects/luma-turmeric.webp",
    alt: "Luma Turmeric Curcumin advertorial for joint relief, full page",
    width: 1200,
    height: 4228,
  },
  {
    src: "/projects/luma-cholesterol.webp",
    alt: "Luma Nutrition berberine advertorial about cholesterol, full page",
    width: 1200,
    height: 4228,
  },
  {
    src: "/projects/luma-blood-sugar.webp",
    alt: "Luma Nutrition berberine advertorial about afternoon blood sugar crashes, full page",
    width: 1200,
    height: 4228,
  },
  {
    src: "/projects/luma-berberine.webp",
    alt: "Luma Nutrition berberine advertorial about weight loss, full page",
    width: 1200,
    height: 4407,
  },
  {
    src: "/projects/luma-magnesium.webp",
    alt: "Luma Nutrition magnesium glycinate advertorial about sleep, full page",
    width: 1200,
    height: 4407,
  },
];

const HUME_SHOTS: D2CShot[] = [
  {
    src: "/projects/hume-advertorial-tired.webp",
    alt: "Hume Band 2.0 advertorial, full page: why you're always tired",
    width: 933,
    height: 4921,
  },
  {
    src: "/projects/hume-advertorial-sleep.webp",
    alt: "Hume Band 2.0 advertorial, full page: still tired after eight hours of sleep",
    width: 933,
    height: 6846,
  },
  {
    src: "/projects/hume-calculator-bp.webp",
    alt: "Hume Health blood pressure and mean arterial pressure calculator page, full page",
    width: 933,
    height: 4616,
  },
  {
    src: "/projects/hume-calculator-bmi.webp",
    alt: "Hume Body Pod BMI and weight loss calculator page, full page",
    width: 933,
    height: 2478,
  },
];

export const D2C_RESULTS = {
  title: "Real Pages. Real Results.",
  sub: "Scroll any screenshot to read the whole page. These are live right now, carrying paid traffic for D2C brands and the agencies running them.",
  /** One bordered box per client program; `id` is the header's deep link. */
  boxes: [
    { id: "case-luma", shots: LUMA_SHOTS },
    { id: "case-hume", shots: HUME_SHOTS },
  ],
};

/* ------------------------------------------------------------- 4. Problem */

export const D2C_PROBLEM = {
  title: "Why Most Brands Feel Stuck?",
  sub: "If you’re honest, this probably feels familiar:",
  items: [
    {
      title: "You’ve hit a conversion ceiling",
      text: "Traffic is fine. Spend is fine. But the same page has been carrying every angle for months and the numbers won’t move.",
    },
    {
      title: "Every new page takes weeks",
      text: "Briefs, revisions, dev queues, QA. By the time the page ships, the angle you wanted to test is already cold.",
    },
    {
      title: "Agency quotes don’t scale",
      text: "$1,500 to $3,000 per page means you test two ideas a quarter instead of two a week. Learning stops.",
    },
    {
      title: "Mobile is an afterthought",
      text: "Most of your traffic is on a phone, but the page was designed on a desktop and it shows in the drop-off.",
    },
    {
      title: "You can’t plan the next test",
      text: "Scaling spend, launching a new angle, opening a new market — all of it waits on a page that doesn’t exist yet.",
    },
  ],
  closing:
    "You know there’s a better way. You’ve seen brands ship a new page every week. You just haven’t installed the system that makes it possible yet.",
  cta: "Get Your First Page Free",
};

/* ------------------------------------------------------------ 5. The system */

export const D2C_SYSTEM = {
  title: "A Complete Landing Page System",
  sub: "I build and run the production engine that turns any reference you send into a live, conversion-ready page for your product.",
  items: [
    {
      title: "Pixel-Perfect Reference Duplication",
      text: "We start from a page that already works and rebuild it exactly — layout, sections, spacing, interactions. The reference is the spec, so there is no design round.",
    },
    {
      title: "Product Research, Not Guesswork",
      text: "Your product page and existing content get read end to end, so the copy argues from what the product actually does.",
    },
    {
      title: "Copy Written to the Structure",
      text: "Your angle, mapped onto the reference's proven block order. Every section earns its place because the reference already proved it converts.",
    },
    {
      title: "Images Generated to Fit the Copy",
      text: "Section-by-section visuals generated to match the finished content, so nothing is a placeholder and nothing is off-message.",
    },
    {
      title: "A Live Page in About an Hour",
      text: "Not a mockup, not a Figma file. A real page with a preview URL, ready to take traffic today.",
    },
  ],
  closing: "You get the entire production line. You show up to launch the test.",
  cta: "Get Your First Page Free",
};

/* --------------------------------------------------------- 6. How it works */

export const D2C_HOW = {
  title: "How this System Works?",
  phases: [
    {
      title: "Step 1: Reference In, Pixel-Perfect Duplicate Out",
      intro:
        "The system runs on Claude Code. An agent handles the build end to end — you send one link and it starts there.",
      bullets: [
        "You drop the reference page link. That is the entire brief",
        "The agent duplicates that page pixel for pixel — layout, sections, spacing, interactions",
        "You get a preview URL to check the duplicate before anything is branded",
        "No design round and no revision loop, because the reference is the spec",
      ],
      outro: "This step locks a structure that has already proven it converts.",
    },
    {
      title: "Step 2: Rebrand It Around Your Product",
      intro: "Next you hand over three things and the agent takes it from there.",
      bullets: [
        "Your content angle — the hook the page has to carry",
        "Your product page URL, so the agent can research the product itself",
        "Any custom instructions: offer, claims, tone, must-have blocks",
        "The agent reads your product and existing content, then writes the whole page onto the reference's structure",
      ],
      outro:
        "The output is your page for your product, not a page that looks like someone else's.",
    },
    {
      title: "Step 3: Generate the Visuals and Ship",
      intro: "With the copy locked, the imagery is generated to fit it.",
      bullets: [
        "Images generated section by section to match the new content",
        "Produced through OpenAI or whichever image API suits the brand",
        "Page assembled, checked on real mobile widths, and handed over",
        "One reference link in, a finished page out",
      ],
      outro: "Start to finish, a page takes about an hour — not weeks.",
    },
  ],
  roles: [
    {
      title: "Your Role:",
      text: "Send the reference link, your angle, and your product URL. Then review the preview and put traffic behind it.",
    },
    {
      title: "My Role:",
      text: "Run the agent end to end — duplication, product research, copy, generated imagery, QA and handoff.",
    },
  ],
};

/* -------------------------------------------------------------- 7. Founder */

export const D2C_FOUNDER = {
  greeting: "Hey, I am",
  name: "Meet Khunt",
  bio: "I build landing pages and advertorials for D2C brands so they can test new angles without waiting on a dev queue. After building pages for brands and a US ecommerce agency, I kept seeing the same problem: strong offers, real traffic, and a page pipeline far too slow to keep up.",
  listTitle: "What This System Is Built On",
  listItems: [
    "An agent-driven build pipeline, not a design-by-committee process",
    "Pages that match the reference to the pixel, on every screen size",
    "Copy and imagery generated from your actual product, not a template",
    "Built for brands that want to ship weekly, not quarterly",
  ],
  closing:
    "If you’re serious about scaling with pages you can ship in an hour instead of guessing which angle to wait on, this is built for you.",
  portrait: "/portrait.webp",
  portraitAlt: "Meet Khunt",
};

/* ------------------------------------------------------------------ 8. FAQ */

export const D2C_FAQ = {
  title: "Frequently Asked Questions!",
  items: [
    {
      q: "Is the first page really free?",
      a: "Yes. You pick the reference, I build the page, and you judge the quality before any money changes hands.",
    },
    {
      q: "How fast is it, really?",
      a: "About an hour from the reference link to a finished page. Bigger flows — quizzes, multi-step checkouts — take a little longer.",
    },
    {
      q: "It’s AI-built. Won’t it look generic?",
      a: "The opposite. The page is a pixel-perfect duplicate of a reference that already converts, and the copy is written from your own product page — so it looks like the proven page and reads like your brand.",
    },
    {
      q: "Which page builders do you work in?",
      a: "Shopify natively, plus Replo, GemPages, PageFly, CheckoutChamp and Funnelish. If you already have a stack, I build inside it.",
    },
    {
      q: "Do I need to supply the copy?",
      a: "No. Send the angle and your product URL and the agent writes the page from your product's own content. If you have a writer, I build to their draft instead.",
    },
    {
      q: "What if I don’t like the page?",
      a: "You review the preview URL before anything goes live, and you only ever pay for pages you approve. If the first build misses, you owe nothing.",
    },
    {
      q: "Do you handle ads or creative too?",
      a: "No. Pages are the whole focus. You keep the media buying; I make sure the click lands somewhere that converts.",
    },
    {
      q: "How do we work together after the first page?",
      a: "Per-page builds, or a monthly production retainer for brands testing aggressively. Whichever matches how often you ship.",
    },
  ],
  cta: "Get Your First Page Free",
};

/* --------------------------------------------------------------- 9. Footer */

export const D2C_FOOTER = {
  links: [
    { label: "Portfolio", href: "https://meetkhunt.com" },
    { label: "LinkedIn", href: D2C_LINKEDIN },
    { label: "Contact", href: `mailto:${D2C_EMAIL}` },
  ],
  disclaimer:
    "This site is not a part of the Meta™ website or Meta™ Inc. Additionally, this site is NOT endorsed by Meta™ in any way. META™ is a trademark of META™, Inc. As stipulated by law, we cannot and do not make any guarantees about your ability to get results or earn any money with our ideas, information, tools, or strategies. We are here to help you by giving great content, direction and strategies that move you forward.",
  copyright: "Copyright © 2026. Meet Khunt.",
};

/* ---------------------------------------------------------- 10. Sticky bar */

export const D2C_STICKY = {
  text: "Your First Page Is Free",
  cta: "BOOK NOW",
};
