"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import RevealText from "@/components/anim/RevealText";
import FadeIn from "@/components/anim/FadeIn";
import ParallaxImage from "@/components/anim/ParallaxImage";
import { ABOUT } from "@/lib/data";

export default function About() {
  const portraitRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!portraitRef.current) return;
      gsap.fromTo(
        portraitRef.current,
        { autoAlpha: 0 },
        {
          autoAlpha: 1,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: portraitRef.current,
            start: "top 85%",
            once: true,
          },
        },
      );
    },
    { scope: portraitRef },
  );

  return (
    <section id="about" className="section-row pt-[120px] lg:pt-[200px]">
      <div className="flex flex-col gap-6 lg:flex-row lg:gap-0">
        {/* Left: text + info columns */}
        <div className="flex flex-3 flex-col gap-24 lg:gap-40 lg:pt-[60px]">
          <div className="flex flex-col gap-12">
            <h3 className="heading-xl">
              <RevealText as="span" split="lines" className="block">
                {ABOUT.headingLines[0]}
              </RevealText>
              <RevealText
                as="span"
                split="lines"
                delay={0.1}
                className="block"
              >
                {ABOUT.headingLines[1]}
              </RevealText>
            </h3>
            <FadeIn className="max-w-[560px]">
              <p className="label normal-case leading-[1.5] text-paper/80">
                {ABOUT.paragraph}
              </p>
            </FadeIn>
          </div>

          <FadeIn className="flex items-end" delay={0.1}>
            <div className="flex flex-col gap-5 pr-[60px]">
              <p className="label">Services</p>
              <p className="label text-paper">
                {ABOUT.services.map((s) => (
                  <span key={s} className="block">
                    {s}
                  </span>
                ))}
              </p>
            </div>
            <div className="flex flex-col gap-5">
              <p className="label">Clients</p>
              <p className="label text-paper">
                {ABOUT.clients.map((c) => (
                  <span key={c} className="block">
                    {c}
                  </span>
                ))}
              </p>
            </div>
          </FadeIn>
        </div>

        {/* Right: portrait (desktop only) */}
        <div
          className="hidden flex-2 self-start lg:sticky lg:top-24 lg:block"
          ref={portraitRef}
        >
          <ParallaxImage
            src={ABOUT.portrait}
            alt="Portrait of Meet Khunt"
            /* Capped so the portrait stays fully visible while it sticks */
            className="aspect-[4/5] max-h-[calc(100svh-9rem)] w-full"
            strength={6}
            sizes="(min-width: 1200px) 40vw, 0px"
          />
        </div>
      </div>
    </section>
  );
}
