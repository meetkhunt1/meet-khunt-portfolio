"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import type { CaseStudyHero } from "@/lib/case-study-hero";

/**
 * Case-study hero: the client's live site inside a laptop held on a hand,
 * on a grainy gradient in the brand's colours.
 *
 * The mockup (public/mockups/laptop-hand.webp, 1160×1210) has a transparent
 * screen opening at x 138, y 52, 884×553. The site capture sits underneath,
 * slightly larger than the opening so the bezel hides its edges and rounded
 * corners come from the mockup itself.
 *
 * The capture scrolls the way a person reads with a mouse: a short eased
 * glide, a pause, another glide — then back to the top and round again.
 * It pauses off-screen and stays still for reduced-motion visitors.
 */

const MOCKUP = { w: 1160, h: 1210 };
const SCREEN = { x: 138, y: 52, w: 884, h: 553 };
/** Show the laptop and the top of the hand; the panel crops the rest. */
const VISIBLE_H = 905;
const pct = (v: number, of: number) => `${(v / of) * 100}%`;

/** Grain: fractal noise as an inline SVG, laid over the gradient. */
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.55 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

export default function MockupHero({
  hero,
  label,
  alt,
}: {
  hero: CaseStudyHero;
  /** URL shown nowhere visually; used for the screen's accessible name */
  label: string;
  alt: string;
}) {
  const screenRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [c1, c2, c3] = hero.colors;

  useGSAP(
    () => {
      const screen = screenRef.current;
      const img = imgRef.current;
      if (!screen || !img) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      let tl: gsap.core.Timeline | null = null;
      let visible = true;

      const build = () => {
        tl?.kill();
        gsap.set(img, { y: 0 });
        const view = screen.clientHeight;
        const travel = img.clientHeight - view;
        if (view === 0 || travel <= 0) return;

        tl = gsap.timeline({ repeat: -1, delay: 1, paused: !visible });
        /* Uneven steps and pauses read as a hand on a mouse, not a machine. */
        const steps = [0.42, 0.55, 0.36, 0.6, 0.48, 0.4];
        const holds = [1.1, 1.5, 0.9, 1.7, 1.2, 1.0];
        let y = 0;
        let i = 0;
        while (y < travel) {
          const step = Math.min(view * steps[i % steps.length], travel - y);
          y += step;
          tl.to(img, {
            y: -y,
            duration: 0.9 + (step / view) * 0.9,
            ease: "power2.inOut",
          }).to({}, { duration: holds[i % holds.length] });
          i++;
        }
        tl.to({}, { duration: 1 }).to(img, {
          y: 0,
          duration: Math.min(3.2, 1.4 + travel / view / 3),
          ease: "power3.inOut",
        }).to({}, { duration: 1.4 });
      };

      if (img.complete) build();
      else img.addEventListener("load", build, { once: true });

      const io = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        if (visible) tl?.resume();
        else tl?.pause();
      });
      io.observe(screen);

      let t: ReturnType<typeof setTimeout>;
      const onResize = () => {
        clearTimeout(t);
        t = setTimeout(build, 200);
      };
      window.addEventListener("resize", onResize);

      return () => {
        io.disconnect();
        window.removeEventListener("resize", onResize);
        clearTimeout(t);
        tl?.kill();
      };
    },
    { dependencies: [hero.screen.src] },
  );

  return (
    <section className="section-row pt-[24px] lg:pt-[32px]">
      <div
        className="relative overflow-hidden rounded-[28px] border border-white/10"
        style={{
          backgroundColor: c2,
          backgroundImage: `radial-gradient(ellipse at 0% 0%, ${c1} 0%, transparent 60%), radial-gradient(ellipse at 100% 100%, ${c3} 0%, transparent 65%), linear-gradient(135deg, ${c1} 0%, ${c2} 50%, ${c3} 100%)`,
        }}
      >
        {/* Grain over the gradient */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.28] mix-blend-overlay"
          style={{ backgroundImage: GRAIN, backgroundSize: "220px 220px" }}
        />
        {/* Soft light behind the laptop */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(255,255,255,0.16),transparent_60%)]"
        />

        <div className="relative mx-auto w-[86%] max-w-[860px] pt-8 sm:w-[78%] lg:pt-12">
          {/* Crops the hand at the bottom of the panel */}
          <div className="relative w-full overflow-hidden" style={{ aspectRatio: `${MOCKUP.w} / ${VISIBLE_H}` }}>
            <div className="absolute inset-x-0 top-0" style={{ aspectRatio: `${MOCKUP.w} / ${MOCKUP.h}` }}>
              {/* Site capture, under the mockup's screen opening */}
              <div
                ref={screenRef}
                role="img"
                aria-label={label}
                className="absolute overflow-hidden bg-white"
                style={{
                  left: pct(SCREEN.x - 2, MOCKUP.w),
                  top: pct(SCREEN.y - 2, MOCKUP.h),
                  width: pct(SCREEN.w + 4, MOCKUP.w),
                  height: pct(SCREEN.h + 4, MOCKUP.h),
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  ref={imgRef}
                  src={hero.screen.src}
                  alt={alt}
                  width={hero.screen.width}
                  height={hero.screen.height}
                  fetchPriority="high"
                  decoding="async"
                  className="block h-auto w-full will-change-transform"
                />
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/mockups/laptop-hand.webp"
                alt=""
                aria-hidden
                width={MOCKUP.w}
                height={MOCKUP.h}
                className="pointer-events-none relative block h-auto w-full select-none drop-shadow-[0_40px_60px_rgba(0,0,0,0.35)]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
