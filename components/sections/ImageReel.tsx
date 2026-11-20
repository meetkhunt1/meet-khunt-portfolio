"use client";

import { useEffect, useState } from "react";

/**
 * A stack of photos laid on top of each other; one is shown at a time and the
 * next cuts in every `interval` ms. A still, tiled grain texture sits over it.
 * Visitors who prefer reduced motion see the first photo only.
 */
export default function ImageReel({
  images,
  grain,
  interval = 1000,
  className = "",
}: {
  images: string[];
  grain?: string;
  interval?: number;
  className?: string;
}) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setActive((i) => (i + 1) % images.length), interval);
    return () => window.clearInterval(id);
  }, [images.length, interval]);

  return (
    <div className={`relative overflow-hidden bg-fg ${className}`} aria-hidden>
      {images.map((src, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={src}
          src={src}
          alt=""
          loading="eager"
          decoding="async"
          className={`absolute inset-0 h-full w-full object-cover object-top ${
            i === active ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      {grain && (
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.22] mix-blend-screen"
          style={{ backgroundImage: `url(${grain})`, backgroundSize: "256px 256px", backgroundRepeat: "repeat" }}
        />
      )}
    </div>
  );
}
