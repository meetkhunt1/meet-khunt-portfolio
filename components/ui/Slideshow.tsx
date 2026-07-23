"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";

type SlideshowProps = {
  images: string[];
  className?: string;
  /** Seconds each slide stays visible */
  interval?: number;
  sizes?: string;
};

/** Auto-advancing crossfade slideshow (no controls), loops forever. */
export default function Slideshow({
  images,
  className,
  interval = 2.4,
  sizes = "100vw",
}: SlideshowProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;
      const slides = gsap.utils.toArray<HTMLElement>(
        root.querySelectorAll("[data-slide]"),
      );
      if (slides.length < 2) return;

      gsap.set(slides, { autoAlpha: 0 });
      gsap.set(slides[0], { autoAlpha: 1 });

      const tl = gsap.timeline({ repeat: -1 });
      slides.forEach((slide, i) => {
        const next = slides[(i + 1) % slides.length];
        tl.to(next, { autoAlpha: 1, duration: 0.7, ease: "power2.inOut" }, `+=${interval}`)
          .to(slide, { autoAlpha: 0, duration: 0.7, ease: "power2.inOut" }, "<");
      });
    },
    { scope: rootRef },
  );

  return (
    <div ref={rootRef} className={`relative overflow-hidden ${className ?? ""}`}>
      {images.map((src, i) => (
        <div key={src} data-slide className="absolute inset-0">
          <Image
            src={src}
            alt=""
            fill
            sizes={sizes}
            priority={i === 0}
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
        </div>
      ))}
    </div>
  );
}
