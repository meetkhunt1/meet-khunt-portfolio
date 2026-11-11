import Link from "next/link";
import type { ServiceCta } from "@/lib/blog/config";

/** Optional end-of-article pointer to the most relevant service page. */
export default function ServiceCtaBlock({ cta }: { cta: ServiceCta }) {
  return (
    <aside
      aria-label="Related service"
      className="relative overflow-hidden rounded-[12px] border border-fg bg-fg p-7 text-bg lg:p-10"
    >
      <h2 className="font-sans text-[24px] font-medium leading-[1.1] tracking-[-0.02em] text-bg lg:text-[30px]">
        {cta.heading}
      </h2>
      <p className="mt-3 max-w-[56ch] font-ui text-[15px] leading-[1.6] text-bg/75 lg:text-[16px]">
        {cta.text}
      </p>
      <Link
        href={cta.href}
        data-cursor="grow"
        className="pill mt-7 rounded-full border-bg bg-bg px-6 py-3 text-[13px] text-fg"
      >
        {cta.label}
      </Link>
    </aside>
  );
}
