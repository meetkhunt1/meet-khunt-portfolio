"use client";

import { useId, useState } from "react";
import Image from "next/image";
import RevealText from "@/components/anim/RevealText";
import FadeIn from "@/components/anim/FadeIn";
import { SERVICES, SERVICES_SECTION } from "@/lib/data";

function ArrowDown({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M12 5v14" />
      <path d="m19 12-7 7-7-7" />
    </svg>
  );
}

/** A screenshot in a phone bezel, angled into the pair. */
function Phone({
  src,
  alt,
  className,
  sizes,
}: {
  src: string;
  alt: string;
  className: string;
  sizes: string;
}) {
  return (
    <div
      className={`absolute overflow-hidden rounded-[30px] border-[5px] border-fg bg-fg shadow-[0_28px_60px_-24px_rgba(16,24,40,0.45)] ${className}`}
    >
      <div className="relative aspect-[9/19] w-full overflow-hidden rounded-[25px]">
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          /* Full-page shots, so the top of the page is what shows. */
          className="object-cover object-top"
        />
      </div>
    </div>
  );
}

/**
 * Services: the work shown on real phones, the list of what it covers beside
 * it. Each row opens to a line of detail — exclusive, so only one is ever
 * open, and the panel animates on a 0fr -> 1fr grid row so no height has to be
 * measured in JS.
 */
export default function Services() {
  const [open, setOpen] = useState<number | null>(0);
  const base = useId();
  const [first, second] = SERVICES_SECTION.shots;

  return (
    <section id="services" className="section-row pt-[100px] lg:pt-[160px]">
      <div className="flex flex-col items-center gap-5 text-center">
        <RevealText as="h3" className="heading-md" split="lines">
          {SERVICES_SECTION.heading}
        </RevealText>
        <FadeIn delay={0.1}>
          <p className="max-w-[60ch] font-ui text-[16px] leading-[1.6] text-fg/70 lg:text-[18px]">
            {SERVICES_SECTION.sub}
          </p>
        </FadeIn>
      </div>

      <div className="mt-14 grid grid-cols-1 items-center gap-14 lg:mt-20 lg:grid-cols-2 lg:gap-20">
        {/* Phones */}
        <FadeIn className="order-2 lg:order-1">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-[520px]">
            <Phone
              src={first.src}
              alt={first.alt}
              className="left-0 top-[3%] w-[46%] -rotate-[8deg]"
              sizes="(min-width: 1200px) 22vw, 45vw"
            />
            <Phone
              src={second.src}
              alt={second.alt}
              className="bottom-[2%] right-[2%] z-[1] w-[48%] rotate-[8deg]"
              sizes="(min-width: 1200px) 23vw, 47vw"
            />
          </div>
        </FadeIn>

        {/* List */}
        <FadeIn className="order-1 lg:order-2" delay={0.1}>
          <div className="border-t border-line">
            {SERVICES.map((service, i) => {
              const isOpen = open === i;
              const panelId = `${base}-panel-${i}`;
              const btnId = `${base}-btn-${i}`;

              return (
                <div key={service.label} className="border-b border-line">
                  <h4>
                    <button
                      type="button"
                      id={btnId}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpen(isOpen ? null : i)}
                      data-cursor="grow"
                      className="group flex w-full items-center justify-between gap-6 py-6 text-left"
                    >
                      <span className="font-sans text-[20px] font-medium leading-tight tracking-[-0.01em] text-fg transition-colors duration-300 group-hover:text-muted lg:text-[24px]">
                        {service.label}
                      </span>
                      <ArrowDown
                        className={`size-5 shrink-0 text-fg transition-transform duration-300 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  </h4>

                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={btnId}
                    inert={!isOpen}
                    className={`grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-[52ch] pb-6 font-ui text-[15px] leading-[1.6] text-fg/70">
                        {service.blurb}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
