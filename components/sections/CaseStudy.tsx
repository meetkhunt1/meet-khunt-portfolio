import Image from "next/image";
import Link from "next/link";
import FadeIn from "@/components/anim/FadeIn";
import { ToolTile } from "@/components/sections/Tools";
import MockupHero from "@/components/sections/MockupHero";
import { CASE_STUDY_HERO } from "@/lib/case-study-hero";
import { CONTACT, TOOLS_SECTION, type GalleryImage, type Project } from "@/lib/data";

/**
 * Case-study layout:
 *
 *   hero      the project cover in a browser window on a glowing panel
 *   intro     name, story and live link; facts (industry, platform,
 *             services) on the right
 *   screens   the portrait shots as a strip, then the wide shots
 *   built     what the project covered, as a grid
 *   stack     the platforms it was built on, as app tiles
 *   cta       closing line and the inquiry link
 *
 * Everything is drawn from the project's own data, so no claim appears
 * here that the project entry does not already make.
 */

/** Platforms a project used, read from its category, filters and services. */
function projectTools(project: Project) {
  if (project.tools) return TOOLS_SECTION.tools.filter((t) => project.tools!.includes(t.label));
  const text = [project.category, project.tag, ...project.filters, ...project.services]
    .join(" ")
    .toLowerCase();
  return TOOLS_SECTION.tools.filter((t) => {
    if (t.label === "Figma") return /design|figma/.test(text);
    return text.includes(t.label.toLowerCase());
  });
}

export default function CaseStudy({ project }: { project: Project }) {
  const portrait = project.gallery.filter((g) => !g.full && g.height > g.width);
  const wide = project.gallery.filter((g) => !portrait.includes(g));
  const tools = projectTools(project);

  const mockup = CASE_STUDY_HERO[project.slug];

  return (
    <>
      {/* Hero: the live site scrolling in the laptop mockup, or (for a
          project with no hero entry yet) the cover in a browser window */}
      {mockup ? (
        <MockupHero
          hero={mockup}
          label={`${project.brand} website, scrolling`}
          alt={`${project.brand} website`}
        />
      ) : (
      <section className="section-row pt-[24px] lg:pt-[32px]">
        <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#111116] px-5 pb-0 pt-10 lg:px-16 lg:pt-16">
          <div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_110%,rgba(238,33,36,0.45),rgba(238,33,36,0.12)_40%,transparent_70%),radial-gradient(ellipse_at_10%_0%,rgba(244,243,239,0.07),transparent_50%)]"
          />
          <div className="relative mx-auto max-w-[1040px] overflow-hidden rounded-t-[14px] border border-b-0 border-white/15 bg-[#0e0e12] shadow-[0_40px_100px_-30px_rgba(0,0,0,0.9)]">
            <div className="flex items-center gap-[7px] border-b border-white/10 px-4 py-3">
              {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
                <span key={c} className="size-[11px] rounded-full" style={{ background: c }} />
              ))}
              <span className="mx-auto max-w-[60%] truncate rounded-md bg-white/[0.06] px-4 py-1 font-ui text-[12px] text-muted">
                {project.liveUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")}
              </span>
              <span className="w-[47px]" />
            </div>
            <div className="relative aspect-[16/10]">
              <Image
                src={project.image}
                alt={project.title}
                fill
                priority
                sizes="(min-width: 1200px) 1040px, 100vw"
                className="object-cover object-top"
              />
            </div>
          </div>
        </div>
      </section>
      )}

      {/* Intro */}
      <section className="section-row grid grid-cols-1 gap-12 pt-[64px] lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-20 lg:pt-[88px]">
        <div className="flex flex-col items-start">
          <p className="category">{project.category}</p>
          <h1 className="heading-lg mt-4">{project.brand}</h1>
          <p className="mt-3 font-ui text-[18px] font-medium text-fg lg:text-[20px]">{project.headline}</p>
          {project.description.map((p) => (
            <p key={p.slice(0, 24)} className="mt-5 max-w-[62ch] font-ui text-[16px] leading-[1.7] text-muted">
              {p}
            </p>
          ))}
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            data-cursor="grow"
            className="pill pill-ghost mt-8 h-12 rounded-full px-7 text-[15px]"
          >
            Visit website ↗
          </a>
        </div>

        <dl className="flex flex-col gap-7 lg:pt-10">
          <Fact label="Industry">
            <span className="font-ui text-[15px] text-fg">{project.industries.join(", ")}</span>
          </Fact>
          {tools.length > 0 && (
            <Fact label="Platform">
              <Pills items={tools.map((t) => t.label)} />
            </Fact>
          )}
          <Fact label="Services">
            <Pills items={project.services} />
          </Fact>
          {project.links && (
            <Fact label="Live pages">
              <ul className="flex flex-col">
                {project.links.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noreferrer"
                      data-cursor="view"
                      className="group flex items-baseline justify-between gap-4 border-t border-line py-2.5 font-ui text-[14px] text-fg"
                    >
                      <span className="transition-colors group-hover:text-accent">{l.label}</span>
                      <span className="text-muted">↗</span>
                    </a>
                  </li>
                ))}
              </ul>
            </Fact>
          )}
        </dl>
      </section>

      {/* Screens */}
      {portrait.length > 0 && (
        <section className="w-full pt-[80px] lg:pt-[110px]">
          <ul className="flex snap-x snap-mandatory gap-5 overflow-x-auto px-[var(--gutter)] pb-4 [scrollbar-width:none] lg:justify-center [&::-webkit-scrollbar]:hidden">
            {portrait.map((img) => (
              <li key={img.src} className="w-[64vw] max-w-[300px] shrink-0 snap-start">
                <Shot img={img} sizes="300px" />
              </li>
            ))}
          </ul>
        </section>
      )}
      {wide.length > 0 && (
        <section className="section-row flex flex-col gap-6 pt-[48px] lg:pt-[64px]">
          {wide.map((img) => (
            <FadeIn key={img.src}>
              <Shot img={img} sizes="100vw" />
            </FadeIn>
          ))}
        </section>
      )}

      {/* What I built */}
      <section className="section-row grid grid-cols-1 gap-10 pt-[100px] lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16 lg:pt-[140px]">
        <div>
          <h2 className="heading-lg">What I built</h2>
          <p className="mt-4 max-w-[38ch] font-ui text-[16px] leading-[1.6] text-muted">
            Every part of the {project.brand} project, from first layout to launch.
          </p>
        </div>
        <ul className="grid grid-cols-1 border-t border-line md:grid-cols-2">
          {project.services.map((s) => (
            <li key={s} className="flex items-center gap-3 border-b border-line py-6 md:odd:pr-6 md:even:pl-6">
              <span aria-hidden className="text-[14px] text-accent">✦</span>
              <span className="font-sans text-[22px] leading-tight tracking-[-0.01em] text-fg">{s}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Built with */}
      {tools.length > 0 && (
        <section className="section-row flex flex-col items-center pt-[100px] text-center lg:pt-[140px]">
          <h2 className="heading-md max-w-[22ch]">
            Built with the tools {project.brand} runs on
          </h2>
          <ul className="mt-10 flex flex-wrap justify-center gap-8">
            {tools.map((t) => (
              <li key={t.label} className="flex flex-col items-center gap-3">
                <ToolTile tool={t} />
                <span className="font-ui text-[14px] font-semibold text-fg">{t.label}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Closing CTA */}
      <section className="section-row pt-[100px] lg:pt-[140px]">
        <div className="flex flex-col gap-8 border-y border-line py-12 lg:flex-row lg:items-center lg:justify-between lg:py-16">
          <h2 className="heading-lg max-w-[18ch]">Have a project worth shipping? Let&apos;s make it real.</h2>
          <Link href={CONTACT.href} data-cursor="grow" className="pill h-12 shrink-0 self-start rounded-full px-8 text-[15px] lg:self-auto">
            Get in touch
          </Link>
        </div>
      </section>
    </>
  );
}

function Fact({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="font-ui text-[12px] font-semibold uppercase tracking-[0.12em] text-accent">{label}</dt>
      <dd className="mt-3">{children}</dd>
    </div>
  );
}

function Pills({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((i) => (
        <li
          key={i}
          className="rounded-full border border-line-strong px-3 py-1 font-ui text-[12px] font-semibold uppercase tracking-[0.06em] text-fg"
        >
          {i}
        </li>
      ))}
    </ul>
  );
}

function Shot({ img, sizes }: { img: GalleryImage; sizes: string }) {
  return (
    <figure className="flex flex-col gap-3">
      <Image
        src={img.src}
        alt={img.alt}
        width={img.width}
        height={img.height}
        sizes={sizes}
        className="h-auto w-full rounded-[16px] border border-white/10"
      />
      {img.caption && <figcaption className="category">{img.caption}</figcaption>}
    </figure>
  );
}
