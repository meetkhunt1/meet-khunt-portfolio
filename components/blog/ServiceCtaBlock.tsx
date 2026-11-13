import Link from "next/link";
import type { ServiceCta } from "@/lib/blog/config";

/**
 * Article sidebar card pointing at the most relevant service page: heading,
 * an optional checklist of what the service covers, and one button.
 */
export default function ServiceCtaBlock({ cta }: { cta: ServiceCta }) {
  return (
    <aside
      aria-label="Related service"
      className="relative overflow-hidden rounded-[14px] border border-line bg-bg p-6 shadow-[0_10px_30px_-22px_rgba(16,24,40,0.35)]"
    >
      <span
        aria-hidden
        className="absolute -right-9 top-5 rotate-45 bg-accent px-10 py-1 font-ui text-[10px] font-bold uppercase tracking-[0.08em] text-fg"
      >
        Hire me
      </span>
      <p className="pr-10 font-sans text-[19px] font-semibold leading-[1.2] tracking-[-0.015em] text-fg">
        {cta.heading}
      </p>
      {cta.points?.length ? (
        <ul className="mt-5 flex flex-col gap-2.5">
          {cta.points.map((point) => (
            <li key={point} className="flex items-start gap-2.5 font-ui text-[14px] leading-[1.4] text-fg/80">
              <svg
                viewBox="0 0 16 16"
                aria-hidden
                className="mt-[1px] size-4 shrink-0"
              >
                <circle cx="8" cy="8" r="8" fill="var(--color-accent)" />
                <path
                  d="M4.75 8.25l2.1 2.1 4.4-4.6"
                  fill="none"
                  stroke="var(--color-fg)"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {point}
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-3 font-ui text-[14px] leading-[1.6] text-fg/75">{cta.text}</p>
      )}
      <Link href={cta.href} data-cursor="grow" className="pill pill-lg mt-6 w-full">
        {cta.label}
      </Link>
    </aside>
  );
}
