import Link from "next/link";
import { BLOG, BLOG_PATH, categoryPath, type Category } from "@/lib/blog/config";

/**
 * Topic filter: a centred, wrapping row of pills. Each option is a link to a
 * real, crawlable category page - no client-side filtering, so it works
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
    <nav aria-label="Blog topics">
      <ul className="flex flex-wrap items-center justify-center gap-2">
        {options.map((o) => {
          const isActive = o.slug === active;
          return (
            <li key={o.href}>
              <Link
                href={o.href}
                aria-current={isActive ? "page" : undefined}
                data-cursor="grow"
                className={`inline-block rounded-full border px-4 py-2 font-ui text-[13px] font-semibold tracking-[-0.01em] transition-colors duration-300 ${
                  isActive
                    ? "border-fg bg-fg text-bg"
                    : "border-line bg-bg text-fg hover:border-fg/40 hover:bg-surface"
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
