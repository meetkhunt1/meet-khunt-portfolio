"use client";

import { useId, useState } from "react";

function ArrowDown({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M12 5v14" />
      <path d="m19 12-7 7-7-7" />
    </svg>
  );
}

type Item = { q: string; a: string };

/**
 * Exclusive accordion in the home-page Services style: hairline rows, arrow
 * that flips, a 0fr -> 1fr grid row so no height is measured in JS.
 *
 * Collapsed answers stay in the server-rendered HTML (only `inert`, never
 * removed), so the full text is crawlable and quotable.
 */
export default function Accordion({
  items,
  headingLevel: Heading = "h3",
  defaultOpen = 0,
}: {
  items: readonly Item[];
  headingLevel?: "h3" | "h4";
  defaultOpen?: number | null;
}) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const base = useId();

  return (
    <div className="border-t border-line">
      {items.map((item, i) => {
        const isOpen = open === i;
        const panelId = `${base}-panel-${i}`;
        const btnId = `${base}-btn-${i}`;

        return (
          <div key={item.q} className="border-b border-line">
            <Heading>
              <button
                type="button"
                id={btnId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                data-cursor="grow"
                className="group flex w-full items-center justify-between gap-6 py-6 text-left"
              >
                <span className="font-sans text-[18px] font-medium leading-tight tracking-[-0.01em] text-fg transition-colors duration-300 group-hover:text-muted lg:text-[22px]">
                  {item.q}
                </span>
                <ArrowDown
                  className={`size-5 shrink-0 text-fg transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
            </Heading>

            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              inert={!isOpen}
              className={`grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <p className="max-w-[72ch] pb-6 font-ui text-[15px] leading-[1.65] text-fg/70 lg:text-[16px]">
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
