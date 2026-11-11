import Link from "next/link";
import { BLOG, BLOG_PATH, categoryPath, type Category } from "@/lib/blog/config";

/**
 * Topic filter, styled like the /projects filter row. Each option is a link
 * to a real, crawlable category page — no client-side filtering, so it works
 * without JavaScript and every filtered view has its own URL.
 */
export default function CategoryNav({
  categories,
  active,
}: {
  categories: Category[];
  active: string | null;
}) {
  if (!categories.length) return null;
  const options = [
    { label: BLOG.allLabel, href: BLOG_PATH, slug: null as string | null },
    ...categories.map((c) => ({ label: c.name, href: categoryPath(c.slug), slug: c.slug })),
  ];

  return (
    <nav
      aria-label="Blog topics"
      className="flex flex-col gap-5 border-b border-line pb-6 md:flex-row md:items-center md:justify-between"
    >
      <p className="font-ui text-[14px] font-semibold tracking-[-0.01em] text-fg">
        {BLOG.filterLabel}
      </p>
      <ul className="flex flex-wrap items-center gap-2">
        {options.map((o) => {
          const isActive = o.slug === active;
          return (
            <li key={o.href}>
              <Link
                href={o.href}
                aria-current={isActive ? "page" : undefined}
                data-cursor="grow"
                className={`inline-block rounded-[10px] border px-4 py-2.5 font-ui text-[13px] font-semibold tracking-[-0.01em] text-fg transition-colors duration-300 ${
                  isActive ? "border-line bg-bg" : "border-transparent hover:text-muted"
                }`}
              >
                {o.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
