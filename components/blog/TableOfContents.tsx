import type { ReactNode } from "react";
import type { TocEntry } from "@/lib/blog/markdown";

function TocList({ toc, square = false }: { toc: TocEntry[]; square?: boolean }) {
  return (
    <ol className="flex flex-col gap-0.5">
      {toc.map((entry) => (
        <li
          key={entry.id}
          className={`flex gap-3 ${entry.depth === 3 ? "pl-4" : ""}`}
        >
          {square && (
            <span aria-hidden className="mt-[11px] size-[6px] shrink-0 bg-fg" />
          )}
          <a
            href={`#${entry.id}`}
            data-cursor="grow"
            className={`block rounded-[6px] py-1.5 font-ui leading-[1.45] transition-colors duration-200 hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg ${
              entry.depth === 2 ? "text-[14px] text-fg/80" : "text-[13px] text-muted"
            }`}
          >
            {entry.text}
          </a>
        </li>
      ))}
    </ol>
  );
}

/**
 * Phones and tablets: a native disclosure above the article, listing H2 and
 * H3 headings. Plain anchor links - no JavaScript.
 */
export default function TableOfContents({ toc }: { toc: TocEntry[] }) {
  if (toc.length < 2) return null;
  return (
    <details className="group rounded-[12px] border border-line bg-surface lg:hidden">
      <summary
        data-cursor="grow"
        className="flex cursor-pointer list-none items-center justify-between px-5 py-4 font-ui text-[14px] font-semibold text-fg [&::-webkit-details-marker]:hidden"
      >
        Table of Contents
        <span aria-hidden className="transition-transform duration-300 group-open:rotate-180">
          ↓
        </span>
      </summary>
      <nav aria-label="Table of contents" className="border-t border-line px-5 py-4">
        <TocList toc={toc} />
      </nav>
    </details>
  );
}

/**
 * Desktop sidebar card: the article's H2 sections only, so the card stays
 * short enough to read at a glance. `actions` sits beside the title (share
 * links).
 */
export function TocCard({
  toc,
  actions,
}: {
  toc: TocEntry[];
  actions?: ReactNode;
}) {
  const sections = toc.filter((e) => e.depth === 2);
  if (sections.length < 2) return null;
  return (
    <nav
      aria-label="Table of contents"
      className="hidden rounded-[14px] border border-line bg-bg p-6 shadow-[0_10px_30px_-22px_rgba(16,24,40,0.35)] lg:block"
    >
      <div className="flex items-center justify-between gap-4 border-b-2 border-fg pb-3">
        <p className="font-sans text-[17px] font-semibold tracking-[-0.01em] text-fg">
          Table of Contents
        </p>
        {actions}
      </div>
      <div className="mt-4">
        <TocList toc={sections} square />
      </div>
    </nav>
  );
}
