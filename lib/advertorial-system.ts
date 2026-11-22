/**
 * Content for /advertorial-system/: a landing page for the Claude-based
 * system that builds advertorials and listicles from three inputs.
 *
 * Indexed (it is in INDEXED_ROUTES), but deliberately not linked from the
 * header or footer: it is reached from blog articles. No timings, volumes
 * or results are claimed here; only what the system does.
 */

export const AS_PATH = "/advertorial-system/";

export const AS_META = {
  title: "AI Advertorial & Listicle Builder for D2C Brands - Claude-Based System",
  description:
    "A Claude-based system that turns a reference advertorial, your product page and a marketing angle into a ready-to-edit advertorial or listicle in Shopify, Funnelish, GemPages, Replo or any page builder, so D2C brands and agencies can test more angles faster.",
};

export const AS_HERO = {
  eyebrow: "Claude-based advertorial system",
  headline: "Test a new angle without rebuilding a page from scratch.",
  description:
    "Give the system three things: a reference page, your product page and a marketing angle. Claude recreates the layout, rewrites the content for your product and generates the images, so a new advertorial or listicle is ready to review instead of ready to start.",
  ctaPrimary: "Get the system",
  ctaSecondary: { label: "How it works", href: "#how-it-works" },
};

/** The three inputs. */
export const AS_INPUTS = {
  heading: "You bring three things.",
  sub: "That is the whole brief. No wireframes, no copy doc, no image shoot.",
  items: [
    {
      icon: "reference",
      title: "Reference page",
      text: "An advertorial or listicle whose structure you want to follow: the flow, the sections, the persuasion order.",
    },
    {
      icon: "product",
      title: "Product page",
      text: "Your own product page, so the system knows the product, the offer, the benefits and the proof it can use.",
    },
    {
      icon: "angle",
      title: "Marketing angle",
      text: "The hook you want to test: the problem, the audience or the promise this version of the page is built around.",
    },
  ] as { icon: "reference" | "product" | "angle"; title: string; text: string }[],
};

/** What Claude does with them. */
export const AS_OUTPUTS = {
  heading: "Claude handles the rest.",
  items: [
    {
      title: "Recreates the reference",
      text: "The page structure is rebuilt section by section: headline, story, proof, offer and call to action, in the same order.",
    },
    {
      title: "Adapts it to your product",
      text: "Every section is rewritten around your product and your angle, using what is on your product page.",
    },
    {
      title: "Generates the images",
      text: "Relevant images are generated for each section, so the draft is complete instead of full of placeholders.",
    },
    {
      title: "Stays easy to edit",
      text: "Changing a headline, a section or the whole angle is a quick edit and a rerun, not a rebuild by hand.",
    },
  ],
};

/** Page builders the output can be built in. */
export const AS_BUILDERS = {
  heading: "Works in the page builder you already use.",
  sub: "The page is built where your funnel lives, so there is nothing new for your team to learn.",
  tools: [
    { label: "Shopify", src: "/tools/shopify-bag.webp", bg: "#ffffff", size: "54%" },
    { label: "Funnelish", src: "/tools/funnelish-mark.webp", bg: "#24242c", size: "62%" },
    { label: "GemPages", src: "/tools/gempages-mark.webp", bg: "#24242c", size: "46%" },
    { label: "Replo", src: "/tools/replo-mark.webp", bg: "#24242c", size: "44%" },
    { label: "PageFly", src: "/tools/pagefly-mark.webp", bg: "#24242c", size: "48%" },
    { label: "Checkout Champ", src: "/tools/checkout-champ-mark.webp", bg: "#f36319", size: "64%", knockout: true },
  ] as { label: string; src?: string; bg: string; size: string; knockout?: boolean }[],
  more: "and other page builders",
};

/** Who it is for. */
export const AS_AUDIENCE = {
  heading: "Built for teams that test a lot of angles.",
  items: [
    {
      title: "D2C brands",
      text: "You run multiple ads and keep testing new angles. Every new angle needs its own landing page, and building each one by hand slows the testing down.",
      points: [
        "A matching page for every ad angle",
        "More angles tested with the same team",
        "Winners iterated quickly",
      ],
    },
    {
      title: "Agencies",
      text: "You produce advertorials and listicles for several clients at once. The system turns each client brief into a first draft, so your team edits instead of starting from a blank page.",
      points: [
        "More client pages from the same team",
        "Consistent structure across clients",
        "Faster rounds of revisions",
      ],
    },
  ],
};

/** The comparison block. */
export const AS_COMPARE = {
  heading: "Manual build vs the system",
  left: {
    title: "Building by hand",
    points: [
      "Every new angle starts from a blank page",
      "Copy, design and images handled separately",
      "Fewer angles tested, because each one is slow",
      "Small changes still mean manual edits everywhere",
      "Hard to keep pages consistent across tests",
    ],
  },
  right: {
    title: "With the system",
    points: [
      "Three inputs, and a full draft comes back",
      "Layout, copy and images produced together",
      "More pages in less time, so more angles get tested",
      "Change the angle and rerun, instead of rewriting",
      "Every page follows a proven reference structure",
    ],
  },
};

/** How it works, start to finish. */
export const AS_STEPS = {
  heading: "How it works",
  steps: [
    {
      title: "Send the three inputs",
      text: "The reference page, your product page and the angle you want to test.",
    },
    {
      title: "Claude builds the draft",
      text: "The reference is recreated, the content adapted to your product and the images generated.",
    },
    {
      title: "Review and edit",
      text: "Adjust anything quickly, from a single headline to the whole angle.",
    },
    {
      title: "Launch, then test the next angle",
      text: "Put it live, and spin up the next variation from the same inputs.",
    },
  ],
};

export const AS_FAQ = {
  heading: "Questions about the system",
  items: [
    {
      q: "What is the advertorial system?",
      a: "It is a Claude-based system for building advertorials and listicles. You provide a reference page, your product page and a marketing angle, and it recreates the reference structure, adapts the content to your product and generates the images.",
    },
    {
      q: "Who is it for?",
      a: "D2C brands that run multiple ads and test many angles, and agencies that produce advertorials and listicles for several clients. Anyone who needs a lot of landing pages, and needs them changed often, gets the most from it.",
    },
    {
      q: "Does it copy the reference page?",
      a: "It follows the reference page's structure: the order of sections and the way the page persuades. The content and images are created for your product and your angle, not taken from the reference.",
    },
    {
      q: "Which page builders does it work with?",
      a: "Any of them. Pages can be built in Shopify, Funnelish, GemPages, Replo, PageFly, Checkout Champ and other page builders, so the result lives in the tool your team already uses.",
    },
    {
      q: "Can I edit the pages after they are generated?",
      a: "Yes. Pages are built to be edited. You can change a headline, a section or the whole angle, and rerun instead of rebuilding by hand.",
    },
    {
      q: "Do I still need a developer or designer?",
      a: "The system produces the first full draft. Most teams still review it, and you can work with me to set it up, adapt it to your brand and put the pages live on your platform.",
    },
    {
      q: "How do I get started?",
      a: "Send a project inquiry with what you sell and how many angles you want to test, and I will reply by email with the next step.",
    },
  ],
};

export const AS_CTA = {
  heading: "Ready to test more angles?",
  text: "Tell me what you sell and how you test today, and I will show you how the system fits.",
  button: "Get the system",
};
