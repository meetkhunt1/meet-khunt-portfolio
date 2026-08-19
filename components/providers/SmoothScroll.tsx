"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import type Lenis from "lenis";

const LenisContext = createContext<Lenis | null>(null);

export function useLenis() {
  return useContext(LenisContext);
}

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const rafId = useRef<((time: number) => void) | null>(null);

  /* Lenis and GSAP are pulled in after hydration so they stay out of the shared
     layout chunk — routes that don't animate never download them. */
  useEffect(() => {
    let cancelled = false;
    let instance: Lenis | null = null;
    let ticker: typeof import("@/lib/gsap").gsap.ticker | null = null;

    void (async () => {
      const [{ default: Lenis }, { gsap, ScrollTrigger }] = await Promise.all([
        import("lenis"),
        import("@/lib/gsap"),
      ]);
      if (cancelled) return;

      instance = new Lenis({
        duration: 1.1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });
      setLenis(instance);

      instance.on("scroll", ScrollTrigger.update);

      const tick = (time: number) => instance?.raf(time * 1000);
      rafId.current = tick;
      ticker = gsap.ticker;
      ticker.add(tick);
      ticker.lagSmoothing(0);
    })();

    return () => {
      cancelled = true;
      if (ticker && rafId.current) ticker.remove(rafId.current);
      instance?.destroy();
      setLenis(null);
    };
  }, []);

  return (
    <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
  );
}
