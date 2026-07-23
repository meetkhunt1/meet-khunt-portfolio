"use client";

import { useRef, type ElementType } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

type FadeInProps = {
  children: React.ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
  y?: number;
  duration?: number;
  once?: boolean;
};

export default function FadeIn({
  children,
  as: Tag = "div",
  className,
  delay = 0,
  y = 40,
  duration = 1,
  once = true,
}: FadeInProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      gsap.fromTo(
        ref.current,
        { autoAlpha: 0, y },
        {
          autoAlpha: 1,
          y: 0,
          duration,
          ease: "power3.out",
          delay,
          scrollTrigger: {
            trigger: ref.current,
            start: "top 90%",
            once,
          },
        },
      );
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} className={className} style={{ visibility: "hidden" }}>
      {children}
    </Tag>
  );
}
