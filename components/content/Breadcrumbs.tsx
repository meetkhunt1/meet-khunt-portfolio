import Link from "next/link";

export type Crumb = { label: string; href: string };

/**
 * Visible breadcrumb trail. Every crumb but the last is a real link; the last
 * is the current page. Mirror the same trail in BreadcrumbList JSON-LD.
 */
export default function Breadcrumbs({ trail }: { trail: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 font-ui text-[13px] text-muted">
        {trail.map((crumb, i) => {
          const last = i === trail.length - 1;
          return (
            <li key={crumb.href} className="flex min-w-0 items-center gap-2">
              {last ? (
                <span aria-current="page" className="line-clamp-1 text-fg">
                  {crumb.label}
                </span>
              ) : (
                <>
                  <Link
                    href={crumb.href}
                    data-cursor="grow"
                    className="transition-colors duration-200 hover:text-fg"
                  >
                    {crumb.label}
                  </Link>
                  <span aria-hidden>/</span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
