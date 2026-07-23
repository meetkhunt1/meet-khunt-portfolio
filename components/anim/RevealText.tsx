"use client";

import { useRef, type ElementType } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";

type RevealTextProps = {
  children: React.ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
  stagger?: number;
  /** "lines" for headings, "words" for large paragraphs */
  split?: "lines" | "words" | "chars";
  once?: boolean;
};

export default function RevealText({
  children,
  as: Tag = "div",
  className,
  delay = 0,
  stagger = 0.08,
  split = "lines",
  once = true,
}: RevealTextProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      const splitter = new SplitText(ref.current, {
        type: split,
        mask: split,
        linesClass: "reveal-line",
      });
      const targets =
        split === "lines"
          ? splitter.lines
          : split === "words"
            ? splitter.words
            : splitter.chars;

      gsap.fromTo(
        targets,
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 1.1,
          ease: "power4.out",
          delay,
          stagger,
          scrollTrigger: {
            trigger: ref.current,
            start: "top 88%",
            once,
          },
        },
      );
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
