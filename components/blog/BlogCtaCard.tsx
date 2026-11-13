import { BLOG } from "@/lib/blog/config";
import { CONTACT } from "@/lib/data";

/**
 * The hire-me card that takes one slot in the article grid. Brand names are
 * set as type - a wordmark wall without logo files - and the button goes to
 * the same place as the header's "Work with me".
 */
export default function BlogCtaCard() {
  const c = BLOG.ctaCard;
  return (
    <aside
      aria-label={c.heading}
      className="flex h-full flex-col rounded-[14px] border border-line bg-surface p-6 lg:p-8"
    >
      <p className="font-sans text-[22px] font-semibold leading-[1.15] tracking-[-0.02em] text-fg lg:text-[24px]">
        {c.heading}
      </p>
      <p className="mt-3 font-ui text-[14px] leading-[1.6] text-fg/70">{c.text}</p>

      <p className="category mt-8">{c.brandsLabel}</p>
      <ul className="mt-3 grid grid-cols-2 gap-2">
        {c.brands.map((brand) => (
          <li
            key={brand}
            className="grid min-h-[64px] place-items-center rounded-[10px] border border-line bg-bg px-3 text-center font-sans text-[15px] font-semibold leading-tight tracking-[-0.02em] text-fg"
          >
            {brand}
          </li>
        ))}
      </ul>

      <div aria-hidden className="min-h-8 flex-1" />
      <a
        href={CONTACT.href}
        target="_blank"
        rel="noopener noreferrer"
        data-cursor="grow"
        className="pill pill-lg w-full"
      >
        {c.label}
        <span className="sr-only"> (opens LinkedIn in a new tab)</span>
      </a>
    </aside>
  );
}
