import type { TocEntry } from "@/lib/blog/markdown";

function TocList({ toc }: { toc: TocEntry[] }) {
  return (
    <ol className="flex flex-col gap-1">
      {toc.map((entry) => (
        <li key={entry.id} className={entry.depth === 3 ? "pl-4" : ""}>
          <a
            href={`#${entry.id}`}
            data-cursor="grow"
            className={`block rounded-[6px] py-1.5 font-ui leading-[1.4] transition-colors duration-200 hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg ${
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
 * Generated from the article's H2/H3 headings (ids come from the renderer, so
 * they are stable and unique). Phones get a native disclosure above the
 * article; desktop gets a sticky column. Plain anchor links — no JavaScript.
 */
export default function TableOfContents({ toc }: { toc: TocEntry[] }) {
  if (toc.length < 2) return null;
  return (
    <>
      <details className="group rounded-[12px] border border-line bg-surface lg:hidden">
        <summary
          data-cursor="grow"
          className="flex cursor-pointer list-none items-center justify-between px-5 py-4 font-ui text-[14px] font-semibold text-fg [&::-webkit-details-marker]:hidden"
        >
          On this page
          <span aria-hidden className="transition-transform duration-300 group-open:rotate-180">
            ↓
          </span>
        </summary>
        <nav aria-label="Table of contents" className="border-t border-line px-5 py-4">
          <TocList toc={toc} />
        </nav>
      </details>

      <nav
        aria-label="Table of contents"
        className="sticky top-[calc(var(--header-h)+32px)] hidden max-h-[calc(100vh-var(--header-h)-64px)] overflow-y-auto lg:block"
        data-lenis-prevent
      >
        <p className="label pb-4">On this page</p>
        <div className="border-l border-line pl-4">
          <TocList toc={toc} />
        </div>
      </nav>
    </>
  );
}
