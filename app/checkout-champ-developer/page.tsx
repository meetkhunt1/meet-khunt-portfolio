import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/layout/Footer";
import FadeIn from "@/components/anim/FadeIn";
import RevealText from "@/components/anim/RevealText";
import PostCard from "@/components/blog/PostCard";
import FunnelProjectCard from "@/components/sections/FunnelProjectCard";
import IcebergInfographic from "@/components/sections/IcebergInfographic";
import Accordion from "@/components/ui/Accordion";
import FixedBadge from "@/components/ui/FixedBadge";
import ScrollLink from "@/components/ui/ScrollLink";
import { categoryPath } from "@/lib/blog/config";
import { getPost } from "@/lib/blog/posts";
import { CONTACT } from "@/lib/data";
import {
  CC_CTA,
  CC_EXPERTISE,
  CC_FAQ,
  CC_GUIDES,
  CC_HERO,
  CC_INTRO,
  CC_META,
  CC_PATH,
  CC_PROCESS,
  CC_PROJECTS,
  CC_RELATED,
  CC_SERVICES,
  CC_WHY,
} from "@/lib/checkout-champ";
import {
  PERSON_ID,
  WEBSITE_ID,
  absoluteUrl,
  breadcrumbSchema,
  jsonLd,
  personSchema,
  websiteSchema,
} from "@/lib/schema";

/* Page metadata replaces (does not merge into) the layout's openGraph and
   twitter objects, so both are written out in full here. */
export const metadata: Metadata = {
  title: { absolute: CC_META.title },
  description: CC_META.description,
  alternates: { canonical: CC_PATH },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: CC_PATH,
    siteName: "Meet Khunt",
    locale: "en_US",
    title: CC_META.title,
    description: CC_META.description,
    images: [
      {
        url: CC_META.ogImage,
        width: 1200,
        height: 630,
        type: "image/png",
        alt: CC_META.ogImageAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: CC_META.title,
    description: CC_META.description,
    images: [CC_META.ogImage],
  },
};

const PAGE_URL = absoluteUrl(CC_PATH);

/** Topics Meet is described as knowing about, scoped to this page's content. */
const KNOWS_ABOUT = [
  "Checkout Champ",
  "Konnektive CRM",
  "Sales funnel development",
  "Advertorials",
  "Checkout page customization",
  "One-click upsells",
  "VSL pages",
  "Subscription billing",
  "Conversion tracking",
  "A/B testing",
  "Funnelish",
  "PageFly",
  "Shopify",
  "Shopify Liquid",
  "HTML",
  "CSS",
  "JavaScript",
];

const structuredData = jsonLd([
  personSchema(KNOWS_ABOUT),
  websiteSchema(),
  {
    "@type": "WebPage",
    "@id": `${PAGE_URL}#webpage`,
    url: PAGE_URL,
    name: CC_META.title,
    description: CC_META.description,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": `${PAGE_URL}#service` },
    breadcrumb: { "@id": `${PAGE_URL}#breadcrumb` },
    inLanguage: "en",
  },
  {
    "@type": "Service",
    "@id": `${PAGE_URL}#service`,
    name: "Checkout Champ Development",
    serviceType: "Checkout Champ funnel development",
    description: CC_HERO.description,
    url: PAGE_URL,
    provider: { "@id": PERSON_ID },
    areaServed: "Worldwide",
    audience: {
      "@type": "BusinessAudience",
      audienceType: "DTC eCommerce brands and marketing agencies",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: CC_SERVICES.heading,
      itemListElement: CC_SERVICES.items.map((item) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: item.title,
          description: item.text,
        },
      })),
    },
  },
  {
    ...breadcrumbSchema(CC_HERO.breadcrumb),
    "@id": `${PAGE_URL}#breadcrumb`,
  },
]);

/** Shared section header: optional eyebrow, H2, optional lead paragraph. */
function SectionHeading({
  eyebrow,
  heading,
  description,
  center = false,
}: {
  eyebrow?: string;
  heading: string;
  description?: string;
  center?: boolean;
}) {
  return (
    <div
      className={`flex flex-col gap-5 ${center ? "items-center text-center" : "items-start"}`}
    >
      {eyebrow && <p className="category">{eyebrow}</p>}
      <RevealText
        as="h2"
        className="heading-md max-w-[22ch]"
        split="lines"
      >
        {heading}
      </RevealText>
      {description && (
        <FadeIn delay={0.1}>
          <p className="max-w-[60ch] font-ui text-[16px] leading-[1.6] text-fg/70 lg:text-[18px]">
            {description}
          </p>
        </FadeIn>
      )}
    </div>
  );
}

export default async function CheckoutChampDeveloperPage() {
  const guides = await Promise.all(
    CC_GUIDES.slugs.map(async (slug) => {
      const post = await getPost(slug);
      if (!post || post.draft) {
        throw new Error(`CC_GUIDES lists "${slug}", which isn't a published article.`);
      }
      return post;
    }),
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: structuredData }}
      />

      <main className="flex w-full flex-col items-center overflow-hidden pt-20">
        {/* 1. Hero ------------------------------------------------------- */}
        <section
          className="section-row grid grid-cols-1 items-center gap-12 pt-[50px] lg:grid-cols-[minmax(0,6fr)_minmax(0,6fr)] lg:gap-x-16 lg:gap-y-20 lg:pt-[90px]"
        >
          <div className="flex flex-col items-start">
            <nav aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center gap-2 font-ui text-[13px] text-muted">
                {CC_HERO.breadcrumb.map((crumb, i) => {
                  const last = i === CC_HERO.breadcrumb.length - 1;
                  return (
                    <li key={crumb.href} className="flex items-center gap-2">
                      {last ? (
                        <span aria-current="page" className="text-fg">
                          {crumb.label}
                        </span>
                      ) : (
                        <>
                          <Link
                            href={crumb.href}
                            data-cursor="grow"
                            className="transition-colors duration-200 hover:text-fg"
                          >
                            {crumb.label}
                          </Link>
                          <span aria-hidden>/</span>
                        </>
                      )}
                    </li>
                  );
                })}
              </ol>
            </nav>

            <p className="category mt-10 lg:mt-14">{CC_HERO.eyebrow}</p>
            <RevealText
              as="h1"
              className="heading-lg mt-5 max-w-[20ch]"
              split="lines"
            >
              {CC_HERO.headline}
            </RevealText>

            <FadeIn delay={0.15} className="w-full">
              <p className="mt-7 max-w-[58ch] font-ui text-[16px] leading-[1.6] text-fg/70 lg:text-[18px]">
                {CC_HERO.description}
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-4">
                <a
                  href={CONTACT.href}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="grow"
                  className="pill h-12 rounded-full px-7 text-[15px] tracking-[-0.01em]"
                >
                  {CC_HERO.ctaPrimary}
                </a>
                <ScrollLink
                  href="#projects"
                  className="pill pill-ghost h-12 rounded-full px-7 text-[15px] tracking-[-0.01em]"
                >
                  {CC_HERO.ctaSecondary}
                </ScrollLink>
              </div>
            </FadeIn>
          </div>

          {/* Infographic: Shopify is the tip, Checkout Champ the infrastructure */}
          <FadeIn delay={0.25} className="w-full lg:max-w-[640px] lg:justify-self-end">
            <IcebergInfographic />
          </FadeIn>

          {/* Standalone summary — written to be quoted on its own. */}
          <FadeIn className="lg:col-span-2">
            <aside
              aria-label="About Meet Khunt"
              className="grid grid-cols-1 gap-6 border-t border-line pt-8 lg:grid-cols-[minmax(0,3fr)_minmax(0,9fr)] lg:gap-16"
            >
              <p className="label">{CC_INTRO.label}</p>
              <div>
                <p className="max-w-[80ch] font-ui text-[15px] leading-[1.65] text-fg/80 lg:text-[16px]">
                  {CC_INTRO.text}
                </p>
                <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 md:grid-cols-4">
                  <div>
                    <dt className="category">Platform</dt>
                    <dd className="mt-1.5 font-ui text-[14px] text-fg">
                      Checkout Champ (Konnektive CRM)
                    </dd>
                  </div>
                  <div>
                    <dt className="category">Clients</dt>
                    <dd className="mt-1.5 font-ui text-[14px] text-fg">
                      DTC brands &amp; agencies
                    </dd>
                  </div>
                  <div>
                    <dt className="category">Location</dt>
                    <dd className="mt-1.5 font-ui text-[14px] text-fg">
                      Working worldwide
                    </dd>
                  </div>
                  <div>
                    <dt className="category">Contact</dt>
                    <dd className="mt-1.5 font-ui text-[14px] text-fg">
                      <a
                        href={CONTACT.href}
                        target="_blank"
                        rel="noreferrer"
                        data-cursor="grow"
                        className="underline decoration-fg/30 underline-offset-4 transition-colors hover:text-muted"
                      >
                        LinkedIn
                      </a>
                    </dd>
                  </div>
                </dl>
              </div>
            </aside>
          </FadeIn>
        </section>

        {/* 2. Services --------------------------------------------------- */}
        <section
          className="section-row pt-[100px] lg:pt-[160px]"
        >
          <SectionHeading
            heading={CC_SERVICES.heading}
            description={CC_SERVICES.description}
          />

          <ul className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-5">
            {CC_SERVICES.items.map((item, i) => (
              <li key={item.title}>
                <FadeIn
                  delay={(i % 3) * 0.08}
                  className="flex h-full flex-col rounded-[12px] border border-line bg-surface p-6 lg:p-8"
                >
                  <span className="category">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-8 font-sans text-[22px] font-medium leading-[1.15] tracking-[-0.02em] text-fg lg:mt-12 lg:text-[26px]">
                    {item.title}
                  </h3>
                  <p className="mt-3 font-ui text-[15px] leading-[1.6] text-fg/70">
                    {item.text}
                  </p>
                </FadeIn>
              </li>
            ))}
          </ul>
        </section>

        {/* 3. Expertise -------------------------------------------------- */}
        <section
          className="section-row pt-[100px] lg:pt-[160px]"
        >
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
            <div className="flex flex-col items-start lg:sticky lg:top-[calc(var(--header-h)+40px)] lg:self-start">
              <SectionHeading
                eyebrow={CC_EXPERTISE.eyebrow}
                heading={CC_EXPERTISE.heading}
              />
              <FadeIn delay={0.1}>
                {CC_EXPERTISE.intro.map((p) => (
                  <p
                    key={p.slice(0, 24)}
                    className="mt-6 max-w-[52ch] font-ui text-[16px] leading-[1.6] text-fg/70"
                  >
                    {p}
                  </p>
                ))}
              </FadeIn>
            </div>

            <FadeIn delay={0.1}>
              <ul className="border-t border-line">
                {CC_EXPERTISE.items.map((item) => (
                  <li
                    key={item.title}
                    className="grid grid-cols-1 gap-2 border-b border-line py-6 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:gap-8"
                  >
                    <h3 className="font-sans text-[19px] font-medium leading-tight tracking-[-0.01em] text-fg lg:text-[21px]">
                      {item.title}
                    </h3>
                    <p className="font-ui text-[15px] leading-[1.6] text-fg/70">
                      {item.text}
                    </p>
                  </li>
                ))}
              </ul>
            </FadeIn>
          </div>
        </section>

        {/* 4. Projects --------------------------------------------------- */}
        <section
          id="projects"
          className="section-row scroll-mt-[var(--header-h)] pt-[100px] lg:pt-[160px]"
        >
          <SectionHeading
            heading={CC_PROJECTS.heading}
            description={CC_PROJECTS.description}
          />

          <ul className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:mt-16 lg:gap-8">
            {CC_PROJECTS.items.map((project, i) => (
              <li key={project.id}>
                <FadeIn delay={i * 0.1} className="h-full">
                  <FunnelProjectCard
                    project={project}
                    ctaLabel={CC_PROJECTS.ctaLabel}
                    pendingLabel={CC_PROJECTS.pendingLabel}
                  />
                </FadeIn>
              </li>
            ))}
          </ul>

          <FadeIn className="mt-12 border-t border-line pt-8 lg:mt-16">
            <p className="label">{CC_RELATED.label}</p>
            <ul className="mt-4 flex flex-col gap-x-10 gap-y-3 md:flex-row md:flex-wrap">
              {CC_RELATED.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    data-cursor="grow"
                    className="group font-ui text-[15px] text-fg transition-colors hover:text-muted"
                  >
                    <span className="underline decoration-fg/25 underline-offset-4">
                      {link.label}
                    </span>
                    <span
                      aria-hidden
                      className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </FadeIn>
        </section>

        {/* 5. Why -------------------------------------------------------- */}
        <section
          className="section-row pt-[100px] lg:pt-[160px]"
        >
          <SectionHeading heading={CC_WHY.heading} />

          <ul className="mt-12 grid grid-cols-1 gap-x-10 gap-y-10 md:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-x-14 lg:gap-y-14">
            {CC_WHY.items.map((item, i) => (
              <li key={item.title}>
                <FadeIn delay={(i % 3) * 0.08} className="border-t border-fg pt-6">
                  <h3 className="font-sans text-[20px] font-medium leading-tight tracking-[-0.01em] text-fg lg:text-[22px]">
                    {item.title}
                  </h3>
                  <p className="mt-3 font-ui text-[15px] leading-[1.6] text-fg/70">
                    {item.text}
                  </p>
                </FadeIn>
              </li>
            ))}
          </ul>
        </section>

        {/* 6. Process ---------------------------------------------------- */}
        <section
          className="section-row pt-[100px] lg:pt-[160px]"
        >
          <SectionHeading heading={CC_PROCESS.heading} />

          <ol className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-5">
            {CC_PROCESS.steps.map((step, i) => (
              <li key={step.title}>
                <FadeIn
                  delay={i * 0.08}
                  className="flex h-full flex-col rounded-[12px] border border-line p-6 lg:p-8"
                >
                  <span
                    aria-hidden
                    className="font-sans text-[44px] font-medium leading-none tracking-[-0.03em] text-fg/25 lg:text-[56px]"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-8 font-sans text-[20px] font-medium leading-tight tracking-[-0.01em] text-fg lg:mt-12 lg:text-[22px]">
                    <span className="sr-only">Step {i + 1}: </span>
                    {step.title}
                  </h3>
                  <p className="mt-3 font-ui text-[15px] leading-[1.6] text-fg/70">
                    {step.text}
                  </p>
                </FadeIn>
              </li>
            ))}
          </ol>
        </section>

        {/* Guides — renders only once CC_GUIDES lists published articles. */}
        {guides.length > 0 && (
          <section className="section-row pt-[100px] lg:pt-[160px]">
            <SectionHeading heading={CC_GUIDES.heading} description={CC_GUIDES.description} />
            <ul className="mt-12 grid grid-cols-1 gap-x-10 gap-y-14 md:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-x-14">
              {guides.map((post) => (
                <li key={post.slug}>
                  <PostCard post={post} headingLevel="h3" />
                </li>
              ))}
            </ul>
            <Link
              href={categoryPath("checkout-champ")}
              data-cursor="grow"
              className="pill pill-ghost mt-12 rounded-full"
            >
              {CC_GUIDES.allLabel}
            </Link>
          </section>
        )}

        {/* 7. FAQ -------------------------------------------------------- */}
        <section
          className="section-row pt-[100px] lg:pt-[160px]"
        >
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
            <SectionHeading heading={CC_FAQ.heading} />
            <FadeIn delay={0.1}>
              <Accordion items={CC_FAQ.items} />
            </FadeIn>
          </div>
        </section>

        {/* 8. Final CTA — `#contact` is where the footer button and the
            fixed badge point, same as on the home page. */}
        <section
          id="contact"
          className="section-row relative flex flex-col items-center py-[120px] text-center lg:py-[200px]"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[url('/world-dots.svg')] bg-contain bg-center bg-no-repeat opacity-[0.13]"
          />
          <div className="relative z-[1] flex flex-col items-center">
            <SectionHeading
              heading={CC_CTA.heading}
              description={CC_CTA.description}
              center
            />
            <FadeIn delay={0.2}>
              <a
                href={CONTACT.href}
                target="_blank"
                rel="noreferrer"
                data-cursor="grow"
                className="pill mt-10 rounded-[10px] px-7 py-4 text-[14px] tracking-[-0.01em]"
              >
                {CC_CTA.cta}
              </a>
            </FadeIn>
          </div>
        </section>

        <Footer />
      </main>
      <FixedBadge />
    </>
  );
}
