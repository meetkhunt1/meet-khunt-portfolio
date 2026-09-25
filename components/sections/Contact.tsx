"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import RevealText from "@/components/anim/RevealText";
import { CONTACT } from "@/lib/data";

export default function Contact() {
  const linkRef = useRef<HTMLAnchorElement>(null);

  useGSAP(
    () => {
      const link = linkRef.current;
      if (!link) return;
      const enter = () =>
        gsap.to(link, { scale: 1.05, duration: 0.4, ease: "power3.out" });
      const leave = () =>
        gsap.to(link, { scale: 1, duration: 0.4, ease: "power3.out" });
      link.addEventListener("mouseenter", enter);
      link.addEventListener("mouseleave", leave);
      return () => {
        link.removeEventListener("mouseenter", enter);
        link.removeEventListener("mouseleave", leave);
      };
    },
    { scope: linkRef },
  );

  return (
    <section
      id="contact"
      className="section-row relative flex justify-center py-[120px] pb-[200px] lg:py-[200px]"
    >
      {/* "Working worldwide", said quietly. A static SVG rather than inline
          markup: ~2,400 dots would be 60KB of home-page HTML, but as a
          background image it is one cacheable request and no DOM at all. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[url('/world-dots.svg')] bg-contain bg-center bg-no-repeat opacity-[0.13]"
      />

      <a
        ref={linkRef}
        href={CONTACT.href}
        target="_blank"
        rel="noreferrer"
        className="relative z-[1] will-change-transform"
        data-cursor="grow"
      >
        <RevealText as="h3" className="heading-xl" split="lines">
          {CONTACT.label}
        </RevealText>
      </a>
    </section>
  );
}
