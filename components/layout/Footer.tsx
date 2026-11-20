import Link from "next/link";
import { FOOTER, SITE } from "@/lib/data";
import FooterReveal from "@/components/layout/FooterReveal";

/**
 * Full-bleed black footer (brand red #ee2124 for the wordmark and hovers): an oversized wordmark that scrolls sideways, then
 * three link columns and an availability line. It is pinned to the bottom
 * (see FooterReveal), so the page scrolls up off it. Not rendered on /contact/,
 * which ends on its photo reel instead.
 */
export default function Footer() {
  /* The wordmark run is repeated so the loop never shows a gap; the marquee
     moves by exactly one half, which lines up with the second copy. */
  const run = Array.from({ length: 4 }, () => FOOTER.wordmark);

  return (
    <FooterReveal className="mt-[80px] lg:mt-[148px]">
    <footer className="w-full bg-black text-white">
      <div className="overflow-hidden pt-14 lg:pt-20" aria-hidden>
        <div className="footer-marquee flex w-max">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 items-center">
              {run.map((word, i) => (
                <span key={i} className="flex items-center">
                  <span className="whitespace-nowrap font-sans text-[72px] font-bold leading-none tracking-[-0.04em] text-[#ee2124] sm:text-[110px] lg:text-[160px]">
                    {word}
                  </span>
                  <span className="mx-8 text-[44px] leading-none text-[#ee2124] sm:text-[64px] lg:mx-14 lg:text-[90px]">
                    ✦
                  </span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="section-row">
        <div className="grid grid-cols-1 gap-12 pt-16 sm:grid-cols-3 lg:pt-24">
          {FOOTER.columns.map((col) => (
            <div key={col.title}>
              <p className="font-ui text-[13px] font-semibold uppercase tracking-[0.12em] text-white/45">
                {col.title}
              </p>
              <ul className="mt-6 flex flex-col gap-2.5">
                {col.links.map((l) => {
                  const external = l.href.startsWith("http");
                  const cls =
                    "font-sans text-[22px] leading-snug text-white transition-colors hover:text-[#ee2124] lg:text-[26px]";
                  return (
                    <li key={l.label}>
                      {external ? (
                        <a href={l.href} target="_blank" rel="noreferrer" className={cls} data-cursor="grow">
                          {l.label}
                        </a>
                      ) : (
                        <Link href={l.href} className={cls} data-cursor="grow">
                          {l.label}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 py-7 sm:flex-row sm:items-center sm:justify-between lg:mt-24">
          <p className="flex items-center gap-2.5 font-ui text-[15px] text-white">
            <span className="relative flex size-2.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#4ade80] opacity-60 motion-reduce:animate-none" />
              <span className="relative inline-flex size-2.5 rounded-full bg-[#4ade80]" />
            </span>
            {FOOTER.status}
          </p>
          <p className="font-ui text-[13px] uppercase tracking-[0.12em] text-white/45">
            {SITE.year} © {SITE.footerName}
          </p>
        </div>
      </div>
    </footer>
    </FooterReveal>
  );
}
