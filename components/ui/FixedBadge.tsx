"use client";

import Link from "next/link";
import { useLenis } from "@/components/providers/SmoothScroll";

/**
 * Fixed pill badge, bottom-right of the viewport. Scrolls to this page's
 * contact section when it has one; otherwise goes to the home page's.
 */
export default function FixedBadge() {
  const lenis = useLenis();
  return (
    <Link
      href="/#contact"
      onClick={(e) => {
        if (!document.querySelector("#contact")) return;
        e.preventDefault();
        if (lenis) lenis.scrollTo("#contact");
        else document.querySelector("#contact")?.scrollIntoView();
      }}
      className="pill fixed bottom-16 right-5 z-[9] w-[142px] rounded-[10px]"
      data-cursor="grow"
    >
      Get in touch
    </Link>
  );
}
