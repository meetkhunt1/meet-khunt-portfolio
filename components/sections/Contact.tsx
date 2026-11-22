"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import RevealText from "@/components/anim/RevealText";
import { CONTACT, FOOTER } from "@/lib/data";

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
      className="section-row relative flex flex-col items-center py-[120px] pb-[160px] text-center lg:py-[180px]"
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
        className="relative z-[1] will-change-transform"
        data-cursor="grow"
      >
        <RevealText as="h2" className="heading-xl" split="lines">
          {CONTACT.label}
        </RevealText>
      </a>

      <p className="relative z-[1] mt-6 max-w-[40ch] font-ui text-[16px] leading-[1.6] text-muted lg:text-[18px]">
        {CONTACT.closingText}
      </p>
      <a
        href={CONTACT.href}
        data-cursor="grow"
        className="pill relative z-[1] mt-8 h-12 rounded-full px-8 text-[15px] tracking-[-0.01em]"
      >
        {CONTACT.closingCta}
      </a>
      <p className="relative z-[1] mt-6 flex items-center gap-2.5 font-ui text-[14px] text-muted">
        <span className="relative flex size-2">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#4ade80] opacity-60 motion-reduce:animate-none" />
          <span className="relative inline-flex size-2 rounded-full bg-[#4ade80]" />
        </span>
        {FOOTER.status}
      </p>
    </section>
  );
}
