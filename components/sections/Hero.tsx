"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import Slideshow from "@/components/ui/Slideshow";
import { HERO, SITE } from "@/lib/data";

/** Cursor travel (px) between trail image spawns */
const TRAIL_THRESHOLD = 110;

/**
 * Immersive hero:
 * - Giant "MEET KHUNT" wordmark (live text), revealed by a left-to-right
 *   wipe, sitting against the dark background above the image trail.
 * - Desktop: moving the mouse spawns project images at the cursor that
 *   scale in and fade away (image-trail effect).
 * - Below 1200px: the wordmark splits in two halves with a mini slideshow
 *   window between them.
 */
export default function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const trailState = useRef({ x: 0, y: 0, idx: 0, z: 1, primed: false });

  useGSAP(
    () => {
      const tl = gsap.timeline({ delay: 0.3 });
      if (logoRef.current) {
        tl.fromTo(
          logoRef.current,
          { scale: 0.7, autoAlpha: 0 },
          { scale: 1, autoAlpha: 1, duration: 1.4, ease: "expo.out" },
          0.2,
        );
      }
      if (taglineRef.current) {
        tl.fromTo(
          taglineRef.current,
          { y: 20, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.8, ease: "power3.out" },
          "-=0.7",
        );
      }
    },
    { scope: rootRef },
  );

  const onMouseMove = (e: React.MouseEvent) => {
    if (!window.matchMedia("(min-width: 1200px)").matches) return;
    const container = trailRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const s = trailState.current;

    if (!s.primed) {
      s.primed = true;
      s.x = x;
      s.y = y;
      return;
    }
    if (Math.hypot(x - s.x, y - s.y) < TRAIL_THRESHOLD) return;
    s.x = x;
    s.y = y;

    const el = container.children[s.idx % container.children.length] as HTMLElement;
    s.idx += 1;

    gsap.killTweensOf(el);
    gsap
      .timeline()
      .set(el, { xPercent: -50, yPercent: -50, x, y, zIndex: s.z++ })
      .fromTo(
        el,
        { scale: 0.55, autoAlpha: 0, rotation: gsap.utils.random(-8, 8) },
        { scale: 1, autoAlpha: 1, rotation: 0, duration: 0.45, ease: "expo.out" },
      )
      .to(el, { scale: 0.92, autoAlpha: 0, duration: 0.55, ease: "power2.in" }, "+=0.25");
  };

  return (
    <section
      id="hero"
      ref={rootRef}
      className="relative flex h-svh w-full flex-col items-center justify-center overflow-hidden pt-20 lg:pt-12"
      onMouseMove={onMouseMove}
    >
      {/* Image trail layer (desktop), behind the wordmark */}
      <div
        ref={trailRef}
        className="pointer-events-none absolute inset-0 z-[1] hidden lg:block"
        aria-hidden
      >
        {HERO.trail.map((src) => (
          <div
            key={src}
            className="absolute left-0 top-0 aspect-square w-[clamp(140px,12vw,210px)] overflow-hidden opacity-0 will-change-transform"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt=""
              className="h-full w-full object-cover object-center"
              loading="eager"
              decoding="async"
              draggable={false}
            />
          </div>
        ))}
      </div>

      {/* Desktop wordmark, wipe-revealed, above the trail */}
      <div className="section-row relative z-[2] hidden w-full items-center justify-center lg:flex">
        <div ref={logoRef} className="relative opacity-0">
          <h1 className="whitespace-nowrap text-center text-[11.5vw] font-medium uppercase leading-[0.9] tracking-[-0.04em] text-paper opacity-90">
            {HERO.wordmark}
          </h1>
        </div>
      </div>

      {/* Tablet / phone: split wordmark with mini slideshow between */}
      <div className="flex w-full flex-col items-center gap-4 px-5 lg:hidden">
        <h1 className="sr-only">{HERO.wordmark}</h1>
        <span
          aria-hidden
          className="text-[26vw] font-medium uppercase leading-[0.85] tracking-[-0.04em] text-paper opacity-90"
        >
          {HERO.wordmarkTop}
        </span>
        <Slideshow
          images={HERO.slides}
          className="h-[130px] w-[200px] shrink-0 md:h-[150px]"
          sizes="200px"
        />
        <span
          aria-hidden
          className="text-[26vw] font-medium uppercase leading-[0.85] tracking-[-0.04em] text-paper opacity-90"
        >
          {HERO.wordmarkBottom}
        </span>
      </div>

      {/* Tagline pinned to the bottom */}
      <p
        ref={taglineRef}
        className="absolute bottom-10 z-[3] w-full max-w-[490px] px-5 text-center text-[13px] font-medium uppercase leading-[1.4] tracking-[0.02em] text-paper opacity-0 lg:text-sm"
      >
        {SITE.tagline}
      </p>
    </section>
  );
}
