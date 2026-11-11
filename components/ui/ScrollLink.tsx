"use client";

import { useLenis } from "@/components/providers/SmoothScroll";

/**
 * In-page anchor that smooth-scrolls through Lenis when it's running, and
 * falls back to the browser's normal hash jump when it isn't (no JS, reduced
 * runtime). Same behaviour as the footer's "Let's connect" button.
 */
export default function ScrollLink({
  href,
  className,
  children,
}: {
  href: `#${string}`;
  className?: string;
  children: React.ReactNode;
}) {
  const lenis = useLenis();

  return (
    <a
      href={href}
      data-cursor="grow"
      className={className}
      onClick={(e) => {
        if (!lenis || !document.querySelector(href)) return;
        e.preventDefault();
        lenis.scrollTo(href, { offset: -80 });
      }}
    >
      {children}
    </a>
  );
}
