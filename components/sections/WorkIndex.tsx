"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap, useGSAP } from "@/lib/gsap";
import RevealText from "@/components/anim/RevealText";
import {
  PROJECTS,
  WORK_FILTERS,
  WORK_INDEX,
  type Project,
} from "@/lib/data";

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
export default function WorkIndex() {
  const [active, setActive] = useState<string>(ALL);
  const gridRef = useRef<HTMLDivElement>(null);

  const projects = useMemo(
    () =>
      active === ALL
        ? PROJECTS
        : PROJECTS.filter((p) => (p.filters as string[]).includes(active)),
    [active],
  );

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
        {WORK_INDEX.headline}
      </RevealText>

      {/* Filter row — label left, tabs right, rule underneath */}
      <div className="mt-12 flex flex-col gap-5 border-b border-line pb-6 md:flex-row md:items-center md:justify-between lg:mt-[90px]">
        <p className="font-ui text-[14px] font-semibold tracking-[-0.01em] text-fg">
          {WORK_INDEX.filterLabel}
        </p>

        <div className="flex flex-wrap items-center gap-x-2 gap-y-2">
          {WORK_FILTERS.map((filter) => {
            const isActive = filter === active;
            return (
              <button
                key={filter}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActive(filter)}
                data-cursor="grow"
                className={`rounded-[10px] border px-4 py-2.5 font-ui text-[13px] font-semibold tracking-[-0.01em] text-fg transition-colors duration-300 ${
                  isActive
                    ? "border-line bg-bg"
                    : "border-transparent hover:text-muted"
                }`}
              >
                {filter}
              </button>
            );
          })}
        </div>
      </div>

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
