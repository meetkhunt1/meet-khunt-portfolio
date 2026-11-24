import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/layout/Footer";
import FadeIn from "@/components/anim/FadeIn";
import RevealText from "@/components/anim/RevealText";
import ServiceHero from "@/components/sections/ServiceHero";
import Accordion from "@/components/ui/Accordion";
import { CONTACT, PROJECTS } from "@/lib/data";
import type { ServicePage } from "@/lib/services";
import {
  PERSON_ID,
  WEBSITE_ID,
  absoluteUrl,
  breadcrumbSchema,
  jsonLd,
  personSchema,
  websiteSchema,
} from "@/lib/schema";

/** Page metadata for a service page (title, description, canonical, OG). */
export function serviceMetadata(page: ServicePage): Metadata {
  const { title, description } = page.meta;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: page.path },
    robots: { index: true, follow: true },
    openGraph: { type: "website", url: page.path, siteName: "Meet Khunt", title, description },
    twitter: { card: "summary_large_image", title, description },
  };
}

function SectionHeading({ heading, description }: { heading: string; description?: string }) {
  return (
    <div className="flex flex-col items-start gap-5">
      <RevealText as="h2" className="heading-md max-w-[22ch]" split="lines">
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

/**
 * A service landing page: hero, quotable summary, services, real projects,
 * process, FAQ and a final call to action, plus Service / FAQPage /
 * BreadcrumbList structured data. All content comes from lib/services.ts.
 */
export default function ServiceLanding({ page }: { page: ServicePage }) {
  const url = absoluteUrl(page.path);
  const trail = [
    { label: "Home", href: "/" },
    { label: page.hero.eyebrow, href: page.path },
  ];
  const projects = page.work.slugs.map((slug) => {
    const p = PROJECTS.find((x) => x.slug === slug);
    if (!p) throw new Error(`${page.path} lists project "${slug}", which doesn't exist.`);
    return p;
  });

  const structuredData = jsonLd([
    personSchema(page.knowsAbout),
    websiteSchema(),
    {
      "@type": "WebPage",
      "@id": `${url}#webpage`,
      url,
      name: page.meta.title,
      description: page.meta.description,
      isPartOf: { "@id": WEBSITE_ID },
      about: { "@id": `${url}#service` },
      breadcrumb: { "@id": `${url}#breadcrumb` },
      inLanguage: "en",
    },
    {
      "@type": "Service",
      "@id": `${url}#service`,
      name: page.name,
      description: page.hero.description,
      url,
      provider: { "@id": PERSON_ID },
      areaServed: "Worldwide",
      audience: { "@type": "BusinessAudience", audienceType: "DTC eCommerce brands and agencies" },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: page.services.heading,
        itemListElement: page.services.items.map((item) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: item.title, description: item.text },
        })),
      },
    },
    {
      "@type": "FAQPage",
      "@id": `${url}#faq`,
      mainEntity: page.faq.items.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
    { ...breadcrumbSchema(trail), "@id": `${url}#breadcrumb` },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: structuredData }} />

      <main className="flex w-full flex-col items-center overflow-hidden pt-20">
        {/* Hero */}
        <ServiceHero content={page.fold} />

        {/* Quotable summary */}
        <section className="section-row pt-[70px] lg:pt-[110px]">
          <FadeIn className="rounded-[14px] border border-line bg-surface p-7 lg:p-10">
            <p className="category">In short</p>
            <p className="mt-4 max-w-[80ch] font-ui text-[16px] leading-[1.7] text-fg/85 lg:text-[18px]">
              {page.intro}
            </p>
          </FadeIn>
        </section>

        {/* Services */}
        <section className="section-row pt-[100px] lg:pt-[160px]">
          <SectionHeading heading={page.services.heading} description={page.services.description} />
          <ul className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-8">
            {page.services.items.map((item, i) => (
              <li key={item.title}>
                <FadeIn delay={(i % 3) * 0.08} className="h-full">
                  <div className="h-full rounded-[14px] border border-line bg-bg p-6 lg:p-7">
                    <p className="font-ui text-[13px] font-semibold text-muted">
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-4 font-sans text-[21px] font-semibold leading-[1.2] tracking-[-0.015em] text-fg">
                      {item.title}
                    </h3>
                    <p className="mt-3 font-ui text-[15px] leading-[1.6] text-fg/70">{item.text}</p>
                  </div>
                </FadeIn>
              </li>
            ))}
          </ul>
        </section>

        {/* Long-form sections (ranking pages) */}
        {page.sections?.map((s) => (
          <section key={s.heading} className="section-row pt-[100px] lg:pt-[160px]">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
              <RevealText as="h2" className="heading-md max-w-[18ch]" split="lines">
                {s.heading}
              </RevealText>
              <FadeIn className="flex flex-col gap-5">
                {s.paragraphs?.map((p) => (
                  <p key={p.slice(0, 32)} className="max-w-[68ch] font-ui text-[16px] leading-[1.75] text-fg/80 lg:text-[17px]">
                    {p}
                  </p>
                ))}
                {s.bullets && (
                  <ul className="mt-2 grid grid-cols-1 border-t border-line">
                    {s.bullets.map((b) => (
                      <li key={b.title} className="border-b border-line py-5">
                        <h3 className="font-sans text-[19px] font-semibold tracking-[-0.01em] text-fg">{b.title}</h3>
                        <p className="mt-2 max-w-[66ch] font-ui text-[15px] leading-[1.65] text-fg/70">{b.text}</p>
                      </li>
                    ))}
                  </ul>
                )}
              </FadeIn>
            </div>
          </section>
        ))}

        {/* Work */}
        <section className="section-row pt-[100px] lg:pt-[160px]">
          <SectionHeading heading={page.work.heading} description={page.work.description} />
          <ul className="mt-12 grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:mt-16 lg:grid-cols-3">
            {projects.map((p, i) => (
              <li key={p.slug}>
                <FadeIn delay={(i % 3) * 0.08}>
                  <Link href={`/projects/${p.slug}/`} data-cursor="view" className="group flex flex-col">
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[14px] border border-fg/20 bg-surface">
                      <Image
                        src={p.image}
                        alt={p.title}
                        fill
                        sizes="(min-width: 1200px) 30vw, (min-width: 810px) 45vw, 100vw"
                        className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[1.04]"
                      />
                    </div>
                    <p className="category mt-5">{p.category}</p>
                    <h3 className="mt-2 font-sans text-[24px] font-medium leading-[1.1] tracking-[-0.02em] text-fg transition-colors group-hover:text-muted">
                      {p.brand}
                    </h3>
                    <p className="mt-2 font-ui text-[15px] leading-[1.6] text-fg/70">{p.summary}</p>
                  </Link>
                </FadeIn>
              </li>
            ))}
          </ul>
          <Link href={page.work.allHref} data-cursor="grow" className="pill pill-ghost mt-12 rounded-full px-6 py-3">
            {page.work.allLabel}
          </Link>
        </section>

        {/* Process */}
        <section className="section-row pt-[100px] lg:pt-[160px]">
          <SectionHeading heading={page.process.heading} />
          <ol className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:mt-16 lg:grid-cols-4">
            {page.process.steps.map((step, i) => (
              <li key={step.title} className="border-t-2 border-fg pt-6">
                <p className="font-ui text-[13px] font-semibold text-muted">Step {i + 1}</p>
                <h3 className="mt-3 font-sans text-[21px] font-semibold tracking-[-0.015em] text-fg">
                  {step.title}
                </h3>
                <p className="mt-3 font-ui text-[15px] leading-[1.6] text-fg/70">{step.text}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* FAQ */}
        <section className="section-row pt-[100px] lg:pt-[160px]">
          <SectionHeading heading={page.faq.heading} />
          <div className="mt-12 max-w-[900px] lg:mt-16">
            <Accordion items={page.faq.items} />
          </div>
        </section>

        {/* Related pages (internal links) */}
        {page.related && (
          <section className="section-row pt-[100px] lg:pt-[140px]">
            <SectionHeading heading={page.related.heading} />
            <ul className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {page.related.links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    data-cursor="view"
                    className="group flex h-full flex-col rounded-[14px] border border-line p-6 transition-colors hover:border-fg/40"
                  >
                    <span className="flex items-baseline justify-between gap-4 font-sans text-[19px] font-semibold tracking-[-0.01em] text-fg">
                      {l.label}
                      <span aria-hidden className="text-muted transition-transform group-hover:translate-x-1">→</span>
                    </span>
                    <span className="mt-2 font-ui text-[15px] leading-[1.6] text-fg/70">{l.text}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Final CTA */}
        <section className="section-row relative flex flex-col items-center py-[120px] text-center lg:py-[180px]">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[url('/world-dots.svg')] bg-contain bg-center bg-no-repeat opacity-[0.13]"
          />
          <div className="relative z-[1] flex flex-col items-center gap-5">
            <RevealText as="h2" className="heading-md max-w-[20ch]" split="lines">
              {page.cta.heading}
            </RevealText>
            <p className="max-w-[56ch] font-ui text-[16px] leading-[1.6] text-fg/70 lg:text-[18px]">
              {page.cta.description}
            </p>
            <Link
              href={CONTACT.href}
              data-cursor="grow"
              className="pill mt-5 rounded-[10px] px-7 py-4 text-[14px] tracking-[-0.01em]"
            >
              Send a project inquiry
            </Link>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
