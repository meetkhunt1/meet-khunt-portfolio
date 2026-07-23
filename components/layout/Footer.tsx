"use client";

import FadeIn from "@/components/anim/FadeIn";
import { useLenis } from "@/components/providers/SmoothScroll";
import { FOOTER, SITE } from "@/lib/data";

export default function Footer() {
  const lenis = useLenis();

  return (
    <footer className="section-row pt-[50px] lg:pt-[148px]">
      <FadeIn>
        {/* Top: 12-col grid */}
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-6 flex flex-col gap-2 lg:col-span-2">
            {FOOTER.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="link-fade small-caps"
                data-cursor="grow"
              >
                {s.label}
              </a>
            ))}
          </div>

          <div className="col-span-6 flex flex-col gap-2 lg:col-span-2">
            {FOOTER.address.map((line) => (
              <p key={line} className="small-caps text-muted">
                {line}
              </p>
            ))}
          </div>

          <div className="col-span-12 h-6 lg:col-span-4" aria-hidden />

          <div className="col-span-12 lg:col-span-4 lg:text-right">
            {FOOTER.teaser.map((line) => (
              <h6 key={line} className="title-sm">
                {line}
              </h6>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex items-center justify-between py-6 lg:pb-8">
          <p className="small-caps">
            {SITE.year} ® {SITE.footerName}
          </p>
          <a
            href={FOOTER.contactHref}
            onClick={(e) => {
              e.preventDefault();
              lenis?.scrollTo(FOOTER.contactHref);
            }}
            className="pill rounded-[50px]"
            data-cursor="grow"
          >
            Let&apos;s connect
          </a>
        </div>
      </FadeIn>
    </footer>
  );
}
