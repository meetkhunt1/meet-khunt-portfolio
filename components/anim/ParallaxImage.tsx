"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";

type ParallaxImageProps = {
  src: string;
  alt: string;
  className?: string;
  /** How far the inner image travels, in % of its own height */
  strength?: number;
  sizes?: string;
  priority?: boolean;
};

export default function ParallaxImage({
  src,
  alt,
  className,
  strength = 12,
  sizes = "100vw",
  priority = false,
}: ParallaxImageProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useGSAP(
    () => {
      if (!wrapRef.current || !imgRef.current) return;
      gsap.fromTo(
        imgRef.current,
        { yPercent: -strength },
        {
          yPercent: strength,
          ease: "none",
          scrollTrigger: {
            trigger: wrapRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    },
    { scope: wrapRef },
  );

  return (
    <div
      ref={wrapRef}
      className={className}
      style={{ overflow: "hidden", position: "relative" }}
    >
      <Image
        ref={imgRef}
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        style={{ objectFit: "cover", scale: `${1 + strength / 60}` }}
      />
    </div>
  );
}
