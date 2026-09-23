"use client";

import { useId, useState } from "react";
import { ChevronDownIcon } from "./icons";

type Item = { q: string; a: string };

/**
 * Exclusive accordion — one panel open at a time, all closed on load, matching
 * the reference build's behaviour. The panel animates via a 0fr→1fr grid row so
 * no height has to be measured in JS.
 */
export default function Faq({ items }: { items: readonly Item[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const base = useId();

  return (
    <div className="d2c-faq">
      {items.map((item, i) => {
        const isOpen = open === i;
        const panelId = `${base}-panel-${i}`;
        const btnId = `${base}-btn-${i}`;

        return (
          <div
            key={item.q}
            className={`d2c-faq__card${isOpen ? " is-open" : ""}`}
          >
            <button
              type="button"
              id={btnId}
              className="d2c-faq__btn"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpen(isOpen ? null : i)}
            >
              <span>{item.q}</span>
              <span className="d2c-faq__icon">
                <ChevronDownIcon />
              </span>
            </button>

            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              className="d2c-faq__panel"
              /* Keeps collapsed answers out of the tab order and the a11y tree
                 while the grid-row transition still animates. */
              inert={!isOpen}
            >
              <div className="d2c-faq__clip">
                <div className="d2c-faq__body">
                  <p>{item.a}</p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
