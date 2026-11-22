import Image from "next/image";
import Link from "next/link";
import FadeIn from "@/components/anim/FadeIn";
import ScrollLink from "@/components/ui/ScrollLink";
import { CONTACT, type Project, type ShowcasePage } from "@/lib/data";

/**
 * Showcase layout, for a project that is a collection of separate live pages
 * (e.g. Replo comparison pages and advertorials) rather than one build:
 *
 *   intro     name, story, page/type counts
 *   index     numbered list of the pages, each jumping to its section
 *   pages     per page: type, headline, live link, then the full-length
 *             desktop capture in a browser frame and the mobile capture in a
 *             phone frame — both scroll inside, so the whole page is viewable
 *   cta       closing line and the inquiry link
 *
 * One URL shows every page, so it is the single link to share for the set.
 */

const host = (url: string) => new URL(url).hostname.replace(/^www\./, "");

export default function PageShowcase({ project }: { project: Project }) {
  const pages = project.showcase ?? [];
  const types = [...new Set(pages.map((p) => p.type))];
  const sites = [...new Set(pages.map((p) => host(p.url)))];

  return (
    <>
      {/* Intro */}
      <section className="section-row pt-[24px] lg:pt-[32px]">
        <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#111116] px-6 py-12 lg:px-16 lg:py-20">
          <div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_85%_120%,rgba(238,33,36,0.42),rgba(238,33,36,0.1)_40%,transparent_70%),radial-gradient(ellipse_at_0%_0%,rgba(244,243,239,0.06),transparent_50%)]"
          />
          <div className="relative grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] lg:items-end lg:gap-20">
            <div className="flex flex-col items-start">
              <p className="category">{project.category}</p>
              <h1 className="heading-lg mt-4">{project.brand}</h1>
              <p className="mt-3 font-ui text-[18px] font-medium text-fg lg:text-[20px]">{project.headline}</p>
              {project.description.map((p) => (
                <p key={p.slice(0, 24)} className="mt-5 max-w-[62ch] font-ui text-[16px] leading-[1.7] text-muted">
                  {p}
                </p>
              ))}
            </div>
            <dl className="grid grid-cols-3 gap-4 border-t border-white/10 pt-8 lg:grid-cols-1 lg:gap-7 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
              <Stat value={String(pages.length)} label="Live pages" />
              <Stat value={String(types.length)} label={types.length === 1 ? "Page type" : "Page types"} />
              <Stat value={String(sites.length)} label={sites.length === 1 ? "Brand" : "Brands"} />
            </dl>
          </div>
        </div>
      </section>

      {/* Index */}
      <section className="section-row pt-[56px] lg:pt-[72px]">
        <ol className="border-t border-line">
          {pages.map((page, i) => (
            <li key={page.url}>
              <ScrollLink
                href={`#page-${i + 1}`}
                className="group grid grid-cols-[44px_minmax(0,1fr)_auto] items-baseline gap-4 border-b border-line py-5 lg:grid-cols-[64px_200px_minmax(0,1fr)_auto] lg:py-6"
              >
                <span className="font-ui text-[13px] font-semibold tabular-nums text-muted">{num(i)}</span>
                <span className="hidden font-ui text-[12px] font-semibold uppercase tracking-[0.12em] text-accent lg:block">
                  {page.type}
                </span>
                <span className="min-w-0">
                  <span className="block font-sans text-[18px] leading-snug tracking-[-0.01em] text-fg transition-colors group-hover:text-accent lg:text-[22px]">
                    {page.title}
                  </span>
                  <span className="mt-1 block font-ui text-[13px] text-muted lg:hidden">{page.type}</span>
                </span>
                <span aria-hidden className="text-muted transition-transform group-hover:translate-y-0.5">↓</span>
              </ScrollLink>
            </li>
          ))}
        </ol>
      </section>

      {/* Pages */}
      {pages.map((page, i) => (
        <ShowcaseItem key={page.url} page={page} index={i} />
      ))}

      {/* Closing CTA */}
      <section className="section-row pt-[100px] lg:pt-[140px]">
        <div className="flex flex-col gap-8 border-y border-line py-12 lg:flex-row lg:items-center lg:justify-between lg:py-16">
          <h2 className="heading-lg max-w-[18ch]">Need pages like these for your brand? Let&apos;s talk.</h2>
          <Link href={CONTACT.href} data-cursor="grow" className="pill h-12 shrink-0 self-start rounded-full px-8 text-[15px] lg:self-auto">
            Get in touch
          </Link>
        </div>
      </section>
    </>
  );
}

function ShowcaseItem({ page, index }: { page: ShowcasePage; index: number }) {
  return (
    <section id={`page-${index + 1}`} className="section-row scroll-mt-28 pt-[88px] lg:pt-[120px]">
      <FadeIn>
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <div className="min-w-0">
            <p className="flex items-center gap-3 font-ui text-[12px] font-semibold uppercase tracking-[0.12em]">
              <span className="tabular-nums text-muted">{num(index)}</span>
              <span className="text-accent">{page.type}</span>
            </p>
            <h2 className="mt-3 max-w-[30ch] font-sans text-[26px] font-medium leading-[1.15] tracking-[-0.02em] text-fg lg:text-[36px]">
              {page.title}
            </h2>
          </div>
          <a
            href={page.url}
            target="_blank"
            rel="noreferrer"
            data-cursor="grow"
            className="pill pill-ghost h-11 shrink-0 self-start rounded-full px-6 text-[14px] lg:self-auto"
          >
            View live page ↗
          </a>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:mt-10 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-8">
          {/* Desktop */}
          <figure className="min-w-0">
            <div className="overflow-hidden rounded-[14px] border border-white/15 bg-[#0e0e12] shadow-[0_30px_80px_-40px_rgba(0,0,0,0.9)]">
              <div className="flex items-center gap-[7px] border-b border-white/10 px-4 py-3">
                {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
                  <span key={c} className="size-[10px] rounded-full" style={{ background: c }} />
                ))}
                <span className="mx-auto max-w-[70%] truncate rounded-md bg-white/[0.06] px-4 py-1 font-ui text-[12px] text-muted">
                  {host(page.url)}
                </span>
                <span className="w-[44px]" />
              </div>
              <ScrollFrame className="h-[420px] lg:h-[640px]" label={`${page.title}, desktop`}>
                <Image
                  src={page.desktop.src}
                  alt={`${page.title}: full desktop page`}
                  width={page.desktop.width}
                  height={page.desktop.height}
                  sizes="(min-width: 1200px) 860px, 100vw"
                  className="block h-auto w-full"
                />
              </ScrollFrame>
            </div>
            <figcaption className="mt-3 font-ui text-[12px] font-semibold uppercase tracking-[0.12em] text-muted">
              Desktop · scroll to see the full page
            </figcaption>
          </figure>

          {/* Mobile */}
          <figure className="mx-auto w-full max-w-[300px]">
            <div className="rounded-[40px] border border-white/20 bg-[#0b0b0e] p-[9px] shadow-[0_30px_80px_-40px_rgba(0,0,0,0.9)]">
              <ScrollFrame className="h-[560px] rounded-[31px] lg:h-[631px]" label={`${page.title}, mobile`}>
                <Image
                  src={page.mobile.src}
                  alt={`${page.title}: full mobile page`}
                  width={page.mobile.width}
                  height={page.mobile.height}
                  sizes="282px"
                  className="block h-auto w-full"
                />
              </ScrollFrame>
            </div>
            <figcaption className="mt-3 text-center font-ui text-[12px] font-semibold uppercase tracking-[0.12em] text-muted">
              Mobile
            </figcaption>
          </figure>
        </div>
      </FadeIn>
    </section>
  );
}

/** A fixed-height window onto a full-length capture, scrolled from inside. */
function ScrollFrame({
  className,
  label,
  children,
}: {
  className: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div
      tabIndex={0}
      role="region"
      aria-label={label}
      data-lenis-prevent
      className={`overflow-y-auto overscroll-contain bg-white [scrollbar-color:rgba(255,255,255,0.25)_transparent] [scrollbar-width:thin] ${className}`}
    >
      {children}
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <dt className="sr-only">{label}</dt>
      <dd className="font-sans text-[40px] font-medium leading-none tracking-[-0.03em] text-fg lg:text-[56px]">{value}</dd>
      <dd className="mt-2 font-ui text-[12px] font-semibold uppercase tracking-[0.12em] text-muted">{label}</dd>
    </div>
  );
}

const num = (i: number) => String(i + 1).padStart(2, "0");
