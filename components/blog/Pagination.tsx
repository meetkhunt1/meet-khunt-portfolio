import Link from "next/link";
import { listingPath } from "@/lib/blog/config";

/**
 * Numbered pagination with previous/next. Plain links to static pages
 * (/blog/page/2/ …), so every page is crawlable and keyboard-reachable.
 */
export default function Pagination({
  category,
  page,
  totalPages,
}: {
  category: string | null;
  page: number;
  totalPages: number;
}) {
  if (totalPages <= 1) return null;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const base =
    "inline-flex h-11 min-w-11 items-center justify-center rounded-[10px] border px-3 font-ui text-[13px] font-semibold tracking-[-0.01em] transition-colors duration-300";

  return (
    <nav aria-label="Pagination" className="mt-16 flex justify-center lg:mt-24">
      <ul className="flex flex-wrap items-center justify-center gap-2">
        {page > 1 && (
          <li>
            <Link
              href={listingPath(category, page - 1)}
              rel="prev"
              data-cursor="grow"
              className={`${base} border-line text-fg hover:bg-surface`}
            >
              ← Previous
            </Link>
          </li>
        )}
        {pages.map((n) => (
          <li key={n}>
            <Link
              href={listingPath(category, n)}
              aria-current={n === page ? "page" : undefined}
              aria-label={`Page ${n}`}
              data-cursor="grow"
              className={`${base} ${
                n === page
                  ? "border-fg bg-fg text-bg"
                  : "border-line text-fg hover:bg-surface"
              }`}
            >
              {n}
            </Link>
          </li>
        ))}
        {page < totalPages && (
          <li>
            <Link
              href={listingPath(category, page + 1)}
              rel="next"
              data-cursor="grow"
              className={`${base} border-line text-fg hover:bg-surface`}
            >
              Next →
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
