import Image from "next/image";
import Link from "next/link";
import RevealText from "@/components/anim/RevealText";
import FadeIn from "@/components/anim/FadeIn";
import { PROJECTS, SELECTED_WORK } from "@/lib/data";

/**
 * Home-page work grid: four chosen projects, two by two, each card one link
 * to its case study, and a link on to the full list.
 */
export default function SelectedWork() {
  const projects = SELECTED_WORK.slugs
    .map((slug) => PROJECTS.find((p) => p.slug === slug))
    .filter((p) => p !== undefined);

  return (
    <section id="work" className="section-row pt-[100px] lg:pt-[160px]">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <RevealText as="h2" className="heading-lg" split="lines">
            {SELECTED_WORK.heading}
          </RevealText>
          <FadeIn delay={0.1}>
            <p className="mt-4 max-w-[44ch] font-ui text-[16px] leading-[1.6] text-muted lg:text-[18px]">
              {SELECTED_WORK.sub}
            </p>
          </FadeIn>
        </div>
        <FadeIn delay={0.1}>
          <Link
            href={SELECTED_WORK.allHref}
            data-cursor="grow"
            className="pill pill-ghost h-12 rounded-full px-7 text-[15px] tracking-[-0.01em]"
          >
            {SELECTED_WORK.allLabel}
          </Link>
        </FadeIn>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-x-5 gap-y-12 md:grid-cols-2 lg:mt-14 lg:gap-y-16">
        {projects.map((project, i) => (
          <FadeIn key={project.slug} delay={0.05 * (i % 2)}>
            <Link href={`/projects/${project.slug}/`} data-cursor="grow" className="group block">
              <span className="relative block aspect-[16/11] overflow-hidden rounded-[22px] border border-line bg-surface">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(min-width: 810px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[1.04]"
                />
              </span>
              <span className="mt-5 flex items-start justify-between gap-6">
                <span>
                  <span className="block font-ui text-[12px] font-medium uppercase tracking-[0.08em] text-muted">
                    {project.category}
                  </span>
                  <span className="mt-2 block font-sans text-[26px] leading-[1.1] tracking-[-0.02em] text-fg lg:text-[30px]">
                    {project.brand}
                  </span>
                  <span className="mt-2 block max-w-[48ch] font-ui text-[15px] leading-[1.55] text-muted">
                    {project.summary}
                  </span>
                </span>
                <span
                  aria-hidden
                  className="mt-1 grid size-10 shrink-0 place-items-center rounded-full border border-line text-fg transition-colors duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-white"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="size-4">
                    <path d="M7 17 17 7" />
                    <path d="M8 7h9v9" />
                  </svg>
                </span>
              </span>
            </Link>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
