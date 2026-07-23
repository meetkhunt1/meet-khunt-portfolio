"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap, useGSAP } from "@/lib/gsap";
import RevealText from "@/components/anim/RevealText";
import { PROJECTS, type Project } from "@/lib/data";

function ProjectCard({ project }: { project: Project }) {
  const spanClass =
    project.span === 4 ? "lg:col-span-4" : "lg:col-span-2";
  const aspectClass =
    project.span === 4 ? "aspect-[16/10]" : "aspect-[4/3]";

  return (
    <Link
      href={`/projects/${project.slug}`}
      data-card
      data-cursor="view"
      className={`group flex flex-col opacity-0 lg:pb-[150px] ${spanClass}`}
    >
      <div className={`relative w-full overflow-hidden ${aspectClass}`}>
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(min-width: 1200px) 50vw, 100vw"
          className="object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[1.06]"
        />
      </div>
      <div className="mt-2.5 flex flex-col gap-2">
        <h6 className="title-sm">{project.title}</h6>
        <p className="category">{project.category}</p>
      </div>
    </Link>
  );
}

export default function Works() {
  const gridRef = useRef<HTMLDivElement>(null);

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
            delay: (i % 2) * 0.12,
            scrollTrigger: { trigger: card, start: "top 85%", once: true },
          },
        );
      });
    },
    { scope: gridRef },
  );

  return (
    <section id="works" className="section-row pt-[100px]">
      {/* Heading on a 12-col grid */}
      <div className="grid grid-cols-12 gap-2.5 py-[60px] pb-12">
        <RevealText
          as="h3"
          className="heading-xl col-span-12"
          split="lines"
        >
          Selected work
        </RevealText>
      </div>

      {/* Asymmetric editorial grid: 2+4 / 4+2 / 2+4 */}
      <div
        ref={gridRef}
        className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-6"
      >
        {PROJECTS.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>

      {/* CTA */}
      <div className="flex w-full justify-center pb-4 pt-8 lg:pt-0">
        <Link href="/projects" className="pill rounded-[50px]" data-cursor="grow">
          see them all
        </Link>
      </div>
    </section>
  );
}
