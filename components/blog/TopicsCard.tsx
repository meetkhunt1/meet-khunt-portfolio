import Link from "next/link";
import { CATEGORIES, categoryPath } from "@/lib/blog/config";

/** Sidebar list of every blog topic, linking to its category page. */
export default function TopicsCard({ active }: { active?: string }) {
  return (
    <nav
      aria-label="Blog topics"
      className="rounded-[14px] border border-line bg-bg p-6 shadow-[0_10px_30px_-22px_rgba(16,24,40,0.35)]"
    >
      <p className="border-b-2 border-fg pb-3 font-sans text-[17px] font-semibold tracking-[-0.01em] text-fg">
        Guides by Topic
      </p>
      <ul className="mt-4 flex flex-col gap-0.5">
        {CATEGORIES.map((c) => (
          <li key={c.slug} className="flex gap-3">
            <span aria-hidden className="mt-[11px] size-[6px] shrink-0 bg-fg" />
            <Link
              href={categoryPath(c.slug)}
              aria-current={c.slug === active ? "page" : undefined}
              data-cursor="grow"
              className={`block py-1.5 font-ui text-[14px] leading-[1.45] transition-colors duration-200 hover:text-fg ${
                c.slug === active ? "font-semibold text-fg" : "text-fg/80"
              }`}
            >
              {c.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
