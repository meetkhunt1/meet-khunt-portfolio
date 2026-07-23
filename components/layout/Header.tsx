"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap, useGSAP } from "@/lib/gsap";
import { useLenis } from "@/components/providers/SmoothScroll";
import { SITE } from "@/lib/data";

const NAV = [
  { label: "WORK", href: "/projects" },
  { label: "ABOUT", href: "/#about", hash: "#about" },
  { label: "CONTACT", href: "/#contact", hash: "#contact" },
];

export default function Header() {
  const contentRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  useGSAP(() => {
    if (!contentRef.current) return;
    gsap.fromTo(
      contentRef.current,
      { y: -30, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.6, ease: "power2.out", delay: 0.2 },
    );
  });

  /* Smooth-scroll when the section exists on the current page;
     otherwise let the browser navigate to /#hash normally. */
  const scrollTo = (hash: string) => (e: React.MouseEvent) => {
    if (!document.querySelector(hash)) return;
    e.preventDefault();
    lenis?.scrollTo(hash, { offset: 0 });
  };

  return (
    <header className="fixed inset-x-0 top-0 z-10 h-20">
      <div className="section-row flex h-full items-center">
        <div
          ref={contentRef}
          className="flex w-full items-center justify-between opacity-0"
        >
          <div className="flex flex-1 justify-start">
            <Link href="/" className="link-fade small-caps" data-cursor="grow">
              {SITE.headerName}
            </Link>
          </div>

          <nav className="hidden flex-[2] items-center justify-center gap-6 lg:flex">
            {NAV.map((item) =>
              item.hash ? (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={scrollTo(item.hash)}
                  className="link-fade small-caps"
                  data-cursor="grow"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className="link-fade small-caps"
                  data-cursor="grow"
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>

          <div className="flex flex-1 justify-end">
            <p className="small-caps">®{SITE.year}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
