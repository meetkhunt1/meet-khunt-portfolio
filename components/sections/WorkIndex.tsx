"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap, useGSAP } from "@/lib/gsap";
import RevealText from "@/components/anim/RevealText";
import {
  PROJECTS,
  WORK_CATEGORIES,
  WORK_FILTERS,
  WORK_INDEX,
  workFilterPath,
  type Project,
} from "@/lib/data";

type Filter = (typeof WORK_FILTERS)[number];
const ALL = WORK_FILTERS[0];

/* ---------------------------------------------------------------------------
   Card: rounded cover, then category / brand / one-line pitch stacked under it
--------------------------------------------------------------------------- */
function WorkCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      data-card
      data-cursor="view"
      className="group flex flex-col"
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-[14px] border border-fg/20 bg-fg/5 shadow-[0_16px_40px_-18px_rgba(16,24,40,0.25)]">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(min-width: 1200px) 33vw, (min-width: 810px) 50vw, 100vw"
          className="object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[1.06]"
        />
      </div>

      <p className="category mt-8">{project.category}</p>

      <h2 className="mt-2.5 font-sans text-[28px] font-medium leading-[1.1] tracking-[-0.02em] text-fg transition-colors duration-300 group-hover:text-muted lg:text-[34px]">
        {project.brand}
      </h2>

      <p className="mt-2.5 max-w-[34ch] font-ui text-[17px] leading-[1.6] text-fg/75 lg:text-[18px]">
        {project.summary}
      </p>
    </Link>
  );
}

/* ---------------------------------------------------------------------------
   /projects index
--------------------------------------------------------------------------- */
const inFilter = (filter: Filter) =>
  filter === ALL
    ? PROJECTS
    : PROJECTS.filter((p) => (p.filters as string[]).includes(filter));

/**
 * The work index, showing one filter tab. Each tab is a real link to its own
 * page (/projects/, /projects/shopify/, ...), so any tab can be shared or
 * opened directly; the page passes in which one is active.
 */
export default function WorkIndex({ active = ALL }: { active?: Filter }) {
  const gridRef = useRef<HTMLDivElement>(null);
  const projects = inFilter(active);
  const headline =
    active === ALL ? WORK_INDEX.headline : WORK_CATEGORIES[active].headline;

  /* Cards fade up on load and again on every filter change; `revertOnUpdate`
     clears the previous tween's inline styles first, so nothing gets stranded
     at opacity 0 when the list is swapped out. */
  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>(
        gridRef.current?.querySelectorAll("[data-card]") ?? [],
      );
      if (!cards.length) return;
      gsap.fromTo(
        cards,
        { autoAlpha: 0, y: 24 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.07,
          clearProps: "transform",
        },
      );
    },
    { scope: gridRef, dependencies: [active], revertOnUpdate: true },
  );

  return (
    <section id="works" className="section-row pt-[90px] lg:pt-[130px]">
      <RevealText
        as="h1"
        className="heading-lg max-w-[26ch]"
        split="lines"
      >
        {headline}
      </RevealText>

      {/* Filter row - label left, tabs right, rule underneath. Each tab is a
          link to its own page; scroll={false} keeps the reader where they are
          when switching tabs. */}
      <nav
        aria-label="Filter work"
        className="mt-12 flex flex-col gap-5 border-b border-line pb-6 md:flex-row md:items-center md:justify-between lg:mt-[90px]"
      >
        <p className="font-ui text-[14px] font-semibold tracking-[-0.01em] text-fg">
          {WORK_INDEX.filterLabel}
        </p>

        <ul className="flex flex-wrap items-center gap-x-2 gap-y-2">
          {WORK_FILTERS.map((filter) => {
            const isActive = filter === active;
            return (
              <li key={filter}>
                <Link
                  href={workFilterPath(filter)}
                  scroll={false}
                  aria-current={isActive ? "page" : undefined}
                  data-cursor="grow"
                  className={`inline-flex items-center gap-2 rounded-[10px] border px-4 py-2.5 font-ui text-[13px] font-semibold tracking-[-0.01em] transition-colors duration-300 ${
                    isActive
                      ? "border-fg bg-fg text-bg"
                      : "border-line text-fg hover:border-fg/40 hover:bg-surface"
                  }`}
                >
                  {filter}
                  <span
                    className={`rounded-full px-1.5 py-px text-[11px] tabular-nums ${
                      isActive ? "bg-bg/15 text-bg" : "bg-surface text-muted"
                    }`}
                  >
                    {inFilter(filter).length}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div
        ref={gridRef}
        className="mt-12 grid grid-cols-1 gap-x-10 gap-y-14 md:grid-cols-2 lg:mt-[60px] lg:grid-cols-3 lg:gap-x-16 lg:gap-y-[90px]"
      >
        {projects.map((project) => (
          <WorkCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}
