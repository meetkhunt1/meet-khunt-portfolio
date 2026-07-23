"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

type MarqueeProps = {
  children: React.ReactNode;
  className?: string;
  /** Pixels per second */
  speed?: number;
  direction?: "left" | "right";
  copies?: number;
};

export default function Marquee({
  children,
  className,
  speed = 80,
  direction = "left",
  copies = 4,
}: MarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const track = trackRef.current;
      if (!track) return;
      const item = track.children[0] as HTMLElement;
      if (!item) return;

      const distance = item.offsetWidth;
      const duration = distance / speed;

      gsap.to(track, {
        x: direction === "left" ? -distance : distance,
        duration,
        ease: "none",
        repeat: -1,
        modifiers: {
          x: (x) => `${parseFloat(x) % distance}px`,
        },
      });
    },
    { scope: trackRef, dependencies: [speed, direction] },
  );

  return (
    <div className={className} style={{ overflow: "hidden", width: "100%" }}>
      <div
        ref={trackRef}
        style={{
          display: "flex",
          width: "max-content",
          willChange: "transform",
          transform: direction === "right" ? "translateX(-100%)" : undefined,
        }}
      >
        {Array.from({ length: copies }).map((_, i) => (
          <div key={i} style={{ display: "flex", flexShrink: 0 }} aria-hidden={i > 0}>
            {children}
          </div>
        ))}
      </div>
    </div>
  );
}
