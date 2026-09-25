"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap, useGSAP } from "@/lib/gsap";
import RevealText from "@/components/anim/RevealText";
import { FEATURED_PROJECTS, WORKS, type Project } from "@/lib/data";

function ArrowUpRight({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}

/* ---------------------------------------------------------------------------
   Carousel card — home page
--------------------------------------------------------------------------- */
function CarouselCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      data-card
      data-cursor="view"
      className="works-slide group relative snap-start overflow-hidden rounded-[18px] opacity-0"
    >
      <div className="relative aspect-square w-full overflow-hidden bg-black/5">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(min-width: 1200px) 25vw, (min-width: 810px) 50vw, 78vw"
          className="object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[1.06]"
        />

        {/* Scrims: several cards are light screenshots, so the label and the
            corner arrow need their own contrast, not the photo's. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-3/5 bg-linear-to-t from-black/85 via-black/40 to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-linear-to-b from-black/40 to-transparent"
        />

        {/* Corner arrow */}
        <span className="absolute right-4 top-4 text-white transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
          <ArrowUpRight className="h-6 w-6" />
        </span>

        {/* Label */}
        <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1.5 p-5">
          <h6 className="text-[22px] font-medium leading-[1.1] tracking-[-0.02em] text-white">
            {project.title}
          </h6>
          <p className="category text-white/75">{project.category}</p>
        </div>
      </div>
    </Link>
  );
}

type WorksProps = {
  eyebrow?: string;
  heading?: string;
  subheading?: string;
  showCta?: boolean;
};

export default function Works({
  eyebrow = WORKS.eyebrow,
  heading = WORKS.heading,
  subheading = WORKS.subheading,
  showCta = true,
}: WorksProps) {
  const projects = FEATURED_PROJECTS;
  const gridRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(true);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>(
        gridRef.current?.querySelectorAll("[data-card]") ?? [],
      );
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { autoAlpha: 0, y: 30 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            delay: (i % 4) * 0.1,
            scrollTrigger: { trigger: card, start: "top 92%", once: true },
          },
        );
      });
    },
    { scope: gridRef },
  );

  /* Arrow state comes from the real scroll position, so it stays right on
     resize and after a native swipe. */
  const syncArrows = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setAtStart(el.scrollLeft <= 2);
    setAtEnd(max <= 2 || el.scrollLeft >= max - 2);
  }, []);

  useEffect(() => {
    syncArrows();
    window.addEventListener("resize", syncArrows);
    return () => window.removeEventListener("resize", syncArrows);
  }, [syncArrows]);

  const scrollByCard = (direction: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const step = card ? card.offsetWidth + 20 : el.clientWidth * 0.8;
    el.scrollBy({ left: step * direction, behavior: "smooth" });
  };

  /* ------------------- home: light panel + carousel ----------------------- */
  return (
    <section id="works" className="section-row pt-[100px]">
      <div className="rounded-[28px] bg-surface px-5 py-14 md:rounded-[40px] md:px-10 md:py-20 lg:px-14">
        {/* Eyebrow */}
        <div className="flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-[0_1px_3px_rgba(15,14,14,0.08)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#2f7cf6]" />
            <span className="font-ui text-[13px] font-semibold tracking-[-0.01em] text-fg">
              {eyebrow}
            </span>
          </span>
        </div>

        {/* Heading + sub */}
        <div className="mt-6 flex flex-col items-center gap-4 text-center">
          {/* A section heading inside the page, so it sits a step below the
              hero rather than competing with it. */}
          <RevealText as="h3" className="heading-md" split="lines">
            {heading}
          </RevealText>
          <p className="max-w-[46ch] font-ui text-[15px] leading-[1.5] text-fg/60 md:text-[17px]">
            {subheading}
          </p>
        </div>

        {/* Carousel */}
        <div ref={gridRef} className="relative mt-12 md:mt-16">
          <div
            ref={trackRef}
            onScroll={syncArrows}
            /* Horizontal only. `data-lenis-prevent` makes Lenis bail on every
               gesture over this element, so a vertical wheel here dropped the
               page out of smooth scroll and back to native jumps. Lenis derives
               the axis per event, so the -horizontal form hands sideways
               gestures to the carousel and leaves vertical ones smooth. */
            data-lenis-prevent-horizontal
            className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth"
          >
            {projects.map((project) => (
              <CarouselCard key={project.slug} project={project} />
            ))}
          </div>

          {/* Prev / next */}
          <button
            type="button"
            aria-label="Previous projects"
            onClick={() => scrollByCard(-1)}
            disabled={atStart}
            data-cursor="grow"
            className="absolute left-0 top-1/2 hidden h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl bg-fg text-bg shadow-[0_6px_20px_rgba(15,14,14,0.18)] transition-all duration-300 hover:scale-105 disabled:pointer-events-none disabled:opacity-25 md:flex"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <path d="M19 12H5" />
              <path d="m12 19-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Next projects"
            onClick={() => scrollByCard(1)}
            disabled={atEnd}
            data-cursor="grow"
            className="absolute right-0 top-1/2 hidden h-14 w-14 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-2xl bg-fg text-bg shadow-[0_6px_20px_rgba(15,14,14,0.18)] transition-all duration-300 hover:scale-105 disabled:pointer-events-none disabled:opacity-25 md:flex"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* CTA */}
        {showCta && (
          <div className="mt-12 flex w-full justify-center">
            <Link
              href="/projects"
              data-cursor="grow"
              className="inline-flex items-center justify-center rounded-[50px] bg-fg px-5 py-3 font-ui text-[12px] font-semibold tracking-[-0.01em] text-bg transition-transform duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] hover:scale-105"
            >
              see them all
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
