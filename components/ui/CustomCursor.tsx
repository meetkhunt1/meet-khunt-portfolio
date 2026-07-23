"use client";

import { useEffect, useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/**
 * Page-wide custom cursor dot. Grows over interactive elements
 * ([data-cursor="grow"]) and shows a "VIEW" state over project cards
 * ([data-cursor="view"]). Fine pointers only.
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    document.documentElement.classList.add("has-custom-cursor");
    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);

  useGSAP(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const dot = dotRef.current;
    const label = labelRef.current;
    if (!dot || !label) return;

    const xTo = gsap.quickTo(dot, "x", { duration: 0.35, ease: "power3.out" });
    const yTo = gsap.quickTo(dot, "y", { duration: 0.35, ease: "power3.out" });

    const onMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      gsap.to(dot, { autoAlpha: 1, duration: 0.2 });
    };

    const onOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest?.("[data-cursor]");
      const mode = target?.getAttribute("data-cursor");
      if (mode === "view") {
        gsap.to(dot, { scale: 6, duration: 0.3, ease: "power3.out" });
        gsap.to(label, { autoAlpha: 1, duration: 0.2 });
      } else if (mode === "grow") {
        gsap.to(dot, { scale: 3, duration: 0.3, ease: "power3.out" });
        gsap.to(label, { autoAlpha: 0, duration: 0.2 });
      } else {
        gsap.to(dot, { scale: 1, duration: 0.3, ease: "power3.out" });
        gsap.to(label, { autoAlpha: 0, duration: 0.2 });
      }
    };

    const onLeave = () => gsap.to(dot, { autoAlpha: 0, duration: 0.2 });

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  });

  return (
    <div
      ref={dotRef}
      className="pointer-events-none fixed left-0 top-0 z-[100] hidden size-3 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-paper opacity-0 mix-blend-difference lg:flex"
      aria-hidden
    >
      <span
        ref={labelRef}
        className="text-[2.5px] font-semibold uppercase tracking-[0.05em] text-ink opacity-0"
        style={{ fontFamily: "var(--font-inter)" }}
      >
        View
      </span>
    </div>
  );
}
