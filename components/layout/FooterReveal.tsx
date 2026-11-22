"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * "Reveal" footer: the footer is pinned to the bottom of the viewport and the
 * page scrolls up off it, so it stays still once you reach it.
 *
 * The wrapper holds the footer's height in the page flow and clips with
 * `clip-path: inset(0)`, which also clips its fixed child, so the footer only
 * shows through this slot at the end of the page. If the footer is taller
 * than the screen (small phones) it stays in normal flow, or its top would be
 * unreachable.
 *
 * A strip in the page colour with rounded bottom corners sits on top, so the
 * page reads as a sheet with a rounded edge sliding up off the footer.
 */
export default function FooterReveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => {
      const h = el.offsetHeight;
      setHeight(h <= window.innerHeight ? h : null);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <div
      className={`relative w-full ${className}`}
      /* Clipped 1px from the top: at the slot's top edge the fixed footer
         could peek through as a hairline seam above the rounded strip. */
      style={height ? { height, clipPath: "inset(1px 0 0 0)" } : undefined}
    >
      <div ref={ref} className={height ? "fixed inset-x-0 bottom-0" : ""}>
        {children}
      </div>
      {/* The page's bottom edge, rounded over the footer. It scrolls with
          the page, so the content appears to lift off the footer. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-10 rounded-b-[40px] bg-bg lg:h-12 lg:rounded-b-[56px]"
      />
    </div>
  );
}
