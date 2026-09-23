"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useLenis } from "@/components/providers/SmoothScroll";
import { CONTACT, NAV, SITE } from "@/lib/data";

function ChevronDown({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M4 8l8 8 8-8" />
    </svg>
  );
}

/**
 * Fixed top bar: heavy wordmark left, caret dropdowns and a solid CTA right.
 *
 * The dropdowns are CSS-only (`group-hover` / `group-focus-within`), so they
 * open for a pointer and for the keyboard without any measuring in JS. The
 * only state here is the phone menu, which needs a toggle and a scroll lock.
 */
export default function Header() {
  const [open, setOpen] = useState(false);
  const lenis = useLenis();

  /* Lock the page behind the phone menu; the panel is its own scroll area. */
  useEffect(() => {
    if (!open) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  /* Smooth-scroll when the section exists on the current page;
     otherwise let the browser navigate to /#hash normally. */
  const scrollTo = (hash?: string) => (e: React.MouseEvent) => {
    setOpen(false);
    if (!hash || !document.querySelector(hash)) return;
    e.preventDefault();
    lenis?.scrollTo(hash, { offset: 0 });
  };

  return (
    <header className="fixed inset-x-0 top-0 z-30 border-b border-line bg-bg">
      <div className="section-row flex h-[var(--header-h)] items-center">
        <div className="header-in flex w-full items-center gap-8">
          <Link
            href="/"
            data-cursor="grow"
            className="font-sans text-[22px] font-bold uppercase leading-none tracking-[-0.01em] text-fg transition-colors duration-200 hover:text-muted"
          >
            {SITE.headerName}
          </Link>

          {/* Desktop nav */}
          <nav
            aria-label="Main"
            className="ml-auto hidden h-[var(--header-h)] items-stretch gap-8 md:flex"
          >
            {NAV.items.map((entry) => (
              <div
                key={entry.label}
                className="group relative flex items-center"
              >
                <Link
                  href={entry.href}
                  onClick={scrollTo(entry.hash)}
                  data-cursor="grow"
                  className="inline-flex items-center gap-2 font-ui text-[13px] font-semibold uppercase tracking-[0.06em] text-fg transition-colors duration-200 group-hover:text-muted group-focus-within:text-muted"
                >
                  {entry.label}
                  {entry.items && (
                    <ChevronDown className="size-3 transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180" />
                  )}
                </Link>

                {/* Panel sits flush under the bar, so the pointer never
                    crosses dead space on the way down. */}
                {entry.items && (
                  <div className="invisible absolute left-1/2 top-full min-w-[248px] -translate-x-1/2 translate-y-1.5 rounded-[14px] border border-line bg-bg p-2 opacity-0 shadow-[0_24px_48px_-24px_rgba(16,24,40,0.45)] transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                    {entry.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={scrollTo(item.hash)}
                        data-cursor="grow"
                        className="block whitespace-nowrap rounded-[8px] px-3.5 py-2.5 font-ui text-[14px] font-medium text-fg transition-colors duration-200 hover:bg-surface hover:text-muted"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <a
              href={CONTACT.href}
              target="_blank"
              rel="noreferrer"
              data-cursor="grow"
              className="pill pill-lg self-center"
            >
              {NAV.cta}
            </a>
          </nav>

          {/* Phone: burger only */}
          <button
            type="button"
            aria-expanded={open}
            aria-controls="site-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="-mr-2.5 ml-auto p-2.5 text-fg md:hidden"
          >
            <span
              aria-hidden
              className="flex h-4 w-[22px] flex-col justify-between"
            >
              <i
                className={`block h-0.5 rounded-sm bg-current transition-transform duration-300 ${open ? "translate-y-[7px] rotate-45" : ""}`}
              />
              <i
                className={`block h-0.5 rounded-sm bg-current transition-opacity duration-200 ${open ? "opacity-0" : ""}`}
              />
              <i
                className={`block h-0.5 rounded-sm bg-current transition-transform duration-300 ${open ? "-translate-y-[7px] -rotate-45" : ""}`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Phone menu: every group flattened, nothing to expand twice. */}
      <div
        id="site-menu"
        inert={!open}
        className={`absolute inset-x-0 top-full max-h-[calc(100dvh-var(--header-h))] overflow-y-auto border-b border-line bg-bg shadow-[0_24px_40px_-28px_rgba(16,24,40,0.5)] transition-all duration-200 md:hidden ${
          open
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-2 opacity-0"
        }`}
      >
        <div className="section-row flex flex-col gap-6 py-6">
          {NAV.items.map((entry) =>
            entry.items ? (
              <div key={entry.label}>
                <p className="category pb-2">{entry.label}</p>
                {entry.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={scrollTo(item.hash)}
                    className="block py-2 font-sans text-[18px] font-medium leading-[1.3] text-fg"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            ) : (
              <Link
                key={entry.label}
                href={entry.href}
                onClick={scrollTo(entry.hash)}
                className="block font-sans text-[18px] font-medium leading-[1.3] text-fg"
              >
                {entry.label}
              </Link>
            ),
          )}

          <a
            href={CONTACT.href}
            target="_blank"
            rel="noreferrer"
            onClick={() => setOpen(false)}
            className="pill pill-lg w-full"
          >
            {NAV.cta}
          </a>
        </div>
      </div>
    </header>
  );
}
