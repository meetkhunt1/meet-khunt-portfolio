import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/layout/Footer";
import { CONTACT, MAIN_SERVICES } from "@/lib/data";

/**
 * Site-wide 404. With `output: "export"` this builds to out/404.html, which
 * Hostinger serves for unknown URLs via `ErrorDocument` in public/.htaccess.
 * Instead of a dead end it sends the visitor on to the pages people usually
 * come for: home, work, the main services and contact.
 */

export const metadata: Metadata = {
  title: { absolute: "Page not found | Meet Khunt" },
  description: "This page doesn't exist. Head back home, browse the work, or pick a service.",
  robots: { index: false, follow: true },
};

const NEXT_STEPS = [
  ...MAIN_SERVICES.map((s) => ({ label: s.label, href: s.href, note: "Service" })),
  { label: "Projects", href: "/projects/", note: "Work" },
  { label: "Start a project", href: CONTACT.href, note: "Contact" },
];

export default function NotFound() {
  return (
    <main className="flex w-full flex-col items-center overflow-hidden pt-20">
      <section className="section-row pt-[24px] lg:pt-[32px]">
        <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#111116] px-6 py-16 lg:px-16 lg:py-24">
          <div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_120%,rgba(238,33,36,0.45),rgba(238,33,36,0.1)_40%,transparent_70%),radial-gradient(ellipse_at_0%_0%,rgba(244,243,239,0.06),transparent_50%)]"
          />
          {/* Oversized outline numerals behind the copy */}
          <p
            aria-hidden
            className="pointer-events-none absolute -bottom-[0.18em] right-[-0.04em] select-none font-sans text-[42vw] font-medium leading-none tracking-[-0.06em] text-transparent [-webkit-text-stroke:1px_rgba(244,243,239,0.18)] lg:text-[440px]"
          >
            404
          </p>

          <div className="relative flex max-w-[640px] flex-col items-start">
            <p className="category">Error 404 · Page not found</p>
            <h1 className="heading-xl mt-5">This page bounced.</h1>
            <p className="mt-6 max-w-[48ch] font-ui text-[17px] leading-[1.7] text-muted">
              The link may be old or mistyped, or the page has moved. No point losing you here, so
              here&apos;s where people usually go next.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/" data-cursor="grow" className="pill h-12 rounded-full px-7 text-[15px]">
                Back to home
              </Link>
              <Link
                href="/projects/"
                data-cursor="grow"
                className="pill pill-ghost h-12 rounded-full px-7 text-[15px]"
              >
                See the work
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section-row grid grid-cols-1 gap-8 pt-[64px] lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-16 lg:pt-[88px]">
        <h2 className="heading-md max-w-[16ch]">Looking for one of these?</h2>
        <ul className="border-t border-line">
          {NEXT_STEPS.map((s) => (
            <li key={s.href + s.label}>
              <Link
                href={s.href}
                data-cursor="view"
                className="group flex items-baseline justify-between gap-6 border-b border-line py-5 lg:py-6"
              >
                <span className="font-sans text-[22px] leading-tight tracking-[-0.01em] text-fg transition-colors group-hover:text-accent lg:text-[26px]">
                  {s.label}
                </span>
                <span className="flex shrink-0 items-baseline gap-4">
                  <span className="hidden font-ui text-[12px] font-semibold uppercase tracking-[0.12em] text-muted sm:inline">
                    {s.note}
                  </span>
                  <span aria-hidden className="text-muted transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <div className="pt-[100px] lg:pt-[140px]" />
      <Footer />
    </main>
  );
}
