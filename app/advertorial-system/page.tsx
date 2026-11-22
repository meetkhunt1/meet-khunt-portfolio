import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/layout/Footer";
import RevealText from "@/components/anim/RevealText";
import FadeIn from "@/components/anim/FadeIn";
import Accordion from "@/components/ui/Accordion";
import { ToolTile } from "@/components/sections/Tools";
import { CONTACT } from "@/lib/data";
import {
  AS_AUDIENCE,
  AS_BUILDERS,
  AS_COMPARE,
  AS_CTA,
  AS_FAQ,
  AS_HERO,
  AS_INPUTS,
  AS_META,
  AS_OUTPUTS,
  AS_PATH,
  AS_STEPS,
} from "@/lib/advertorial-system";
import {
  PERSON_ID,
  absoluteUrl,
  breadcrumbSchema,
  jsonLd,
  personSchema,
  websiteSchema,
} from "@/lib/schema";

export const metadata: Metadata = {
  title: { absolute: AS_META.title },
  description: AS_META.description,
  alternates: { canonical: AS_PATH },
  openGraph: { title: AS_META.title, description: AS_META.description, url: AS_PATH },
};

const trail = [
  { label: "Home", href: "/" },
  { label: "Advertorial System", href: AS_PATH },
];

const url = absoluteUrl(AS_PATH);
const structuredData = jsonLd([
  personSchema(),
  websiteSchema(),
  {
    "@type": "Service",
    "@id": `${url}#service`,
    name: "Claude-based advertorial and listicle system",
    serviceType: "Advertorial and listicle page production",
    description: AS_META.description,
    provider: { "@id": PERSON_ID },
    areaServed: "Worldwide",
    url,
  },
  {
    "@type": "FAQPage",
    "@id": `${url}#faq`,
    mainEntity: AS_FAQ.items.map((i) => ({
      "@type": "Question",
      name: i.q,
      acceptedAnswer: { "@type": "Answer", text: i.a },
    })),
  },
  breadcrumbSchema(trail),
]);

/**
 * Landing page for the Claude-based advertorial system. Indexed, linked from
 * blog articles only (not from the header or footer).
 */
export default function AdvertorialSystemPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: structuredData }} />
      <main className="flex w-full flex-col items-center overflow-hidden pt-20">
        {/* Hero */}
        <section className="section-row flex flex-col items-center pt-[56px] text-center lg:pt-[88px]">
          <p className="inline-flex items-center gap-2 rounded-full border border-line-strong py-1.5 pl-2 pr-4 font-ui text-[13px] font-medium text-fg">
            <Image src="/images/claude-mark.webp" alt="" width={18} height={18} />
            {AS_HERO.eyebrow}
          </p>
          <RevealText as="h1" className="heading-xl mt-6 max-w-[16ch]" split="lines">
            {AS_HERO.headline}
          </RevealText>
          <FadeIn delay={0.15}>
            <p className="mx-auto mt-6 max-w-[62ch] font-ui text-[16px] leading-[1.65] text-muted lg:text-[18px]">
              {AS_HERO.description}
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Link href={CONTACT.href} data-cursor="grow" className="pill h-12 rounded-full px-8 text-[15px]">
                {AS_HERO.ctaPrimary}
              </Link>
              <a
                href={AS_HERO.ctaSecondary.href}
                data-cursor="grow"
                className="pill pill-ghost h-12 rounded-full px-8 text-[15px]"
              >
                {AS_HERO.ctaSecondary.label}
              </a>
            </div>
          </FadeIn>
          <FadeIn delay={0.25} className="mt-14 w-full lg:mt-20">
            <FlowDiagram />
          </FadeIn>
        </section>

        {/* Inputs */}
        <section id="how-it-works" className="section-row pt-[110px] lg:pt-[160px]">
          <SectionHead heading={AS_INPUTS.heading} sub={AS_INPUTS.sub} />
          <ol className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3 lg:mt-14 lg:gap-5">
            {AS_INPUTS.items.map((item, i) => (
              <li key={item.title}>
                <FadeIn delay={0.06 * i} className="h-full">
                  <div className="flex h-full flex-col rounded-[22px] border border-line bg-surface p-7">
                    <span className="grid size-12 place-items-center rounded-[12px] border border-accent/30 bg-accent/10 text-accent">
                      <InputIcon icon={item.icon} />
                    </span>
                    <span className="mt-6 font-ui text-[13px] font-medium text-muted">Input {i + 1}</span>
                    <h3 className="mt-1 text-[26px] leading-[1.1] tracking-[-0.02em] text-fg">{item.title}</h3>
                    <p className="mt-3 font-ui text-[15px] leading-[1.6] text-muted">{item.text}</p>
                  </div>
                </FadeIn>
              </li>
            ))}
          </ol>
        </section>

        {/* Outputs */}
        <section className="section-row pt-[110px] lg:pt-[160px]">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
            <div>
              <Image src="/images/claude-mark.webp" alt="" width={56} height={56} />
              <RevealText as="h2" className="heading-lg mt-6 max-w-[12ch]" split="lines">
                {AS_OUTPUTS.heading}
              </RevealText>
            </div>
            <ul className="grid grid-cols-1 border-t border-line md:grid-cols-2">
              {AS_OUTPUTS.items.map((item) => (
                <li key={item.title} className="border-b border-line py-7 md:odd:pr-8 md:even:pl-8">
                  <span aria-hidden className="text-[14px] text-accent">✦</span>
                  <h3 className="mt-3 text-[24px] leading-[1.15] tracking-[-0.02em] text-fg">{item.title}</h3>
                  <p className="mt-2 font-ui text-[15px] leading-[1.6] text-muted">{item.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Page builders */}
        <section className="section-row flex flex-col items-center pt-[110px] text-center lg:pt-[160px]">
          <SectionHead heading={AS_BUILDERS.heading} sub={AS_BUILDERS.sub} center />
          <FadeIn delay={0.1}>
            <ul className="mt-10 flex flex-wrap justify-center gap-6 lg:mt-14 lg:gap-8">
              {AS_BUILDERS.tools.map((t) => (
                <li key={t.label} className="flex w-[88px] flex-col items-center gap-3 md:w-[104px]">
                  <ToolTile tool={t} />
                  <span className="font-ui text-[13px] font-semibold text-fg">{t.label}</span>
                </li>
              ))}
            </ul>
            <p className="mt-8 font-ui text-[15px] text-muted">+ {AS_BUILDERS.more}</p>
          </FadeIn>
        </section>

        {/* Who it is for */}
        <section className="section-row pt-[110px] lg:pt-[160px]">
          <SectionHead heading={AS_AUDIENCE.heading} />
          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:mt-14 lg:gap-5">
            {AS_AUDIENCE.items.map((a, i) => (
              <FadeIn key={a.title} delay={0.06 * i}>
                <div className="h-full rounded-[22px] border border-line bg-surface p-7 lg:p-9">
                  <h3 className="text-[32px] leading-[1.05] tracking-[-0.02em] text-fg lg:text-[40px]">{a.title}</h3>
                  <p className="mt-4 max-w-[52ch] font-ui text-[16px] leading-[1.65] text-muted">{a.text}</p>
                  <ul className="mt-6 flex flex-col gap-3">
                    {a.points.map((p) => (
                      <li key={p} className="flex items-center gap-3 font-ui text-[15px] text-fg">
                        <Check good />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* Comparison */}
        <section className="section-row pt-[110px] lg:pt-[160px]">
          <SectionHead heading={AS_COMPARE.heading} center />
          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:mt-14 lg:gap-8">
            <FadeIn>
              <CompareCard side="left" />
            </FadeIn>
            <FadeIn delay={0.08}>
              <CompareCard side="right" />
            </FadeIn>
          </div>
        </section>

        {/* Steps */}
        <section className="section-row pt-[110px] lg:pt-[160px]">
          <SectionHead heading={AS_STEPS.heading} />
          <ol className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:mt-14 lg:grid-cols-4 lg:gap-6">
            {AS_STEPS.steps.map((s, i) => (
              <li key={s.title} className="relative border-t border-line pt-7">
                <span aria-hidden className="absolute -top-[5px] left-0 size-[9px] rounded-full bg-accent" />
                <span className="font-sans text-[56px] leading-none tracking-[-0.04em] text-fg/15">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-[24px] leading-[1.15] tracking-[-0.02em] text-fg">{s.title}</h3>
                <p className="mt-2 font-ui text-[15px] leading-[1.6] text-muted">{s.text}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* FAQ */}
        <section className="section-row pt-[110px] lg:pt-[160px]">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
            <RevealText as="h2" className="heading-lg max-w-[12ch]" split="lines">
              {AS_FAQ.heading}
            </RevealText>
            <Accordion items={AS_FAQ.items} />
          </div>
        </section>

        {/* CTA */}
        <section className="section-row pt-[110px] lg:pt-[160px]">
          <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#111116] px-6 py-16 text-center lg:py-24">
            <div
              aria-hidden
              className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_120%,rgba(238,33,36,0.4),transparent_65%)]"
            />
            <div className="relative">
              <h2 className="heading-lg mx-auto max-w-[16ch]">{AS_CTA.heading}</h2>
              <p className="mx-auto mt-5 max-w-[48ch] font-ui text-[16px] leading-[1.6] text-muted lg:text-[18px]">
                {AS_CTA.text}
              </p>
              <Link href={CONTACT.href} data-cursor="grow" className="pill mt-8 h-12 rounded-full px-8 text-[15px]">
                {AS_CTA.button}
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}

function SectionHead({ heading, sub, center = false }: { heading: string; sub?: string; center?: boolean }) {
  return (
    <div className={center ? "text-center" : ""}>
      <RevealText as="h2" className={`heading-lg ${center ? "mx-auto" : ""} max-w-[20ch]`} split="lines">
        {heading}
      </RevealText>
      {sub && (
        <p className={`mt-4 max-w-[52ch] font-ui text-[16px] leading-[1.6] text-muted lg:text-[18px] ${center ? "mx-auto" : ""}`}>
          {sub}
        </p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Visuals                                                             */
/* ------------------------------------------------------------------ */

/** Three inputs flow into the Claude mark, which fans out into pages. */
function FlowDiagram() {
  return (
    <div className="relative mx-auto max-w-[1180px] overflow-hidden rounded-[28px] border border-white/10 bg-[#111116] p-6 lg:p-10">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(238,33,36,0.22),transparent_60%)]"
      />
      <div className="relative grid grid-cols-1 items-center gap-8 md:grid-cols-[minmax(0,4fr)_auto_minmax(0,5fr)]">
        {/* Inputs */}
        <ul className="flex flex-col gap-3">
          {AS_INPUTS.items.map((item) => (
            <li
              key={item.title}
              className="flex items-center gap-3 rounded-[14px] border border-white/10 bg-white/[0.04] px-4 py-3.5 text-left"
            >
              <span className="grid size-9 shrink-0 place-items-center rounded-[10px] bg-accent/15 text-accent">
                <InputIcon icon={item.icon} />
              </span>
              <span className="font-ui text-[15px] font-semibold text-fg">{item.title}</span>
              <span aria-hidden className="ml-auto font-ui text-[13px] text-muted">→</span>
            </li>
          ))}
        </ul>

        {/* Engine */}
        <div className="flex flex-col items-center gap-3">
          <span className="grid size-[96px] place-items-center rounded-[26px] border border-white/15 bg-[#1a1a20] shadow-[0_0_60px_rgba(238,33,36,0.35)]">
            <Image src="/images/claude-mark.webp" alt="Claude" width={52} height={52} />
          </span>
          <span className="font-ui text-[12px] font-semibold uppercase tracking-[0.12em] text-muted">Claude</span>
        </div>

        {/* Outputs */}
        <div className="relative mx-auto h-[240px] w-full max-w-[380px]">
          {["Angle C", "Angle B", "Angle A"].map((label, i) => (
            <div
              key={label}
              className="absolute w-[70%]"
              style={{ left: `${i * 15}%`, top: `${(2 - i) * 22}px`, zIndex: i }}
            >
              <PageMock label={label} highlight={i === 2} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/** A miniature advertorial page. */
function PageMock({ label, highlight = false, muted = false }: { label: string; highlight?: boolean; muted?: boolean }) {
  return (
    <div
      className={`overflow-hidden rounded-[12px] border bg-[#f4f3ef] text-left shadow-[0_20px_40px_-16px_rgba(0,0,0,0.8)] ${
        highlight ? "border-accent/70" : "border-white/10"
      } ${muted ? "opacity-60 grayscale" : ""}`}
    >
      <div className="flex items-center gap-1 border-b border-black/10 bg-white px-2.5 py-1.5">
        {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
          <span key={c} className="size-[6px] rounded-full" style={{ background: c }} />
        ))}
        <span className="ml-auto font-ui text-[9px] font-semibold text-black/60">{label}</span>
      </div>
      <div className="space-y-1.5 p-3">
        <div className="h-2 w-[85%] rounded bg-black/80" />
        <div className="h-2 w-[60%] rounded bg-black/80" />
        <div className="mt-2 h-14 rounded-[6px] bg-gradient-to-br from-[#e9b38a] to-[#c8643b]" />
        {[90, 75, 82].map((w) => (
          <div key={w} className="h-1.5 rounded bg-black/20" style={{ width: `${w}%` }} />
        ))}
        <div className="mt-2 h-4 w-[55%] rounded-full bg-[#ee2124]" />
      </div>
    </div>
  );
}

function CompareCard({ side }: { side: "left" | "right" }) {
  const good = side === "right";
  const data = good ? AS_COMPARE.right : AS_COMPARE.left;
  return (
    <div
      className={`flex h-full flex-col rounded-[26px] border p-6 lg:p-8 ${
        good ? "border-white/15 bg-[#18181e]" : "border-white/10 bg-transparent"
      }`}
    >
      <h3 className="text-center text-[30px] leading-tight tracking-[-0.02em] text-fg lg:text-[34px]">
        {data.title}
      </h3>

      {/* Visual */}
      <div className="relative mt-6 h-[210px] overflow-hidden rounded-[18px] border border-white/[0.07] bg-[#0e0e12]">
        {good ? (
          <>
            {["Angle A", "Angle B", "Angle C"].map((l, i) => (
              <div key={l} className="absolute top-6 w-[34%]" style={{ left: `${6 + i * 30}%` }}>
                <PageMock label={l} highlight={i === 0} />
              </div>
            ))}
            <Tag good className="bottom-4 right-4">More angles, live</Tag>
          </>
        ) : (
          <>
            <div className="absolute left-[10%] top-6 w-[34%]">
              <PageMock label="Angle A" />
            </div>
            <div className="absolute left-[52%] top-6 grid h-[150px] w-[34%] place-items-center rounded-[12px] border border-dashed border-white/20">
              <span className="font-ui text-[11px] text-muted">Blank page</span>
            </div>
            <Tag className="bottom-4 right-4">One angle at a time</Tag>
          </>
        )}
      </div>

      <ul className="mt-7 flex flex-col gap-3.5">
        {data.points.map((p) => (
          <li key={p} className="flex items-start gap-3 font-ui text-[16px] leading-[1.45] text-fg">
            <Check good={good} />
            {p}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Tag({ children, good = false, className = "" }: { children: React.ReactNode; good?: boolean; className?: string }) {
  return (
    <span
      className={`absolute -rotate-[6deg] rounded-full border-2 border-white/80 px-4 py-1.5 font-ui text-[13px] font-bold text-white shadow-[0_8px_20px_rgba(0,0,0,0.5)] ${
        good ? "bg-[#16a34a]" : "bg-[#ee2124]"
      } ${className}`}
    >
      {children}
    </span>
  );
}

function Check({ good }: { good: boolean }) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden className="mt-[1px] size-[20px] shrink-0">
      <circle cx="10" cy="10" r="10" fill={good ? "#22c55e" : "#ee2124"} />
      {good ? (
        <path d="M6 10.5l2.6 2.6L14 7.6" fill="none" stroke="#0a0a0d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      ) : (
        <path d="M7 7l6 6M13 7l-6 6" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
      )}
    </svg>
  );
}

function InputIcon({ icon }: { icon: "reference" | "product" | "angle" }) {
  const d = {
    /* Page with lines */
    reference: "M6 3h9l4 4v14H6zM15 3v4h4M9 12h7M9 16h5",
    /* Shopping bag */
    product: "M5 8h14l-1 13H6zM9 8a3 3 0 0 1 6 0",
    /* Target */
    angle: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM12 11.5v1",
  }[icon];
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="size-5">
      <path d={d} />
    </svg>
  );
}
