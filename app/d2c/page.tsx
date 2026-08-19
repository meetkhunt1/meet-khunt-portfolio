import type { Metadata } from "next";
import Reveal from "@/components/d2c/Reveal";
import ShotCard from "@/components/d2c/ShotCard";
import {
  D2C_BUILDS,
  D2C_FOOTER,
  D2C_HERO,
  D2C_LINKEDIN,
  D2C_LOOM,
  D2C_META,
  D2C_OFFER,
  D2C_PROBLEM,
  D2C_STEPS,
  D2C_STICKY,
  D2C_WORK,
  D2C_WORK_NOTE,
} from "@/lib/d2c";
import "./d2c.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://meetkhunt.com"),
  title: D2C_META.title,
  description: D2C_META.description,
  alternates: { canonical: "/d2c/" },
  openGraph: {
    type: "website",
    url: D2C_META.url,
    siteName: D2C_META.siteName,
    title: D2C_META.title,
    description: D2C_META.description,
    images: [
      {
        url: D2C_META.ogImage,
        width: 1200,
        height: 630,
        type: "image/png",
        alt: D2C_META.ogImageAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: D2C_META.title,
    description: D2C_META.description,
    images: [D2C_META.ogImage],
  },
};

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M2.5 8.5 6 12l7.5-8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function D2CPage() {
  return (
    <div className="d2c">
      <noscript>
        {/* Scroll-reveal elements are hidden by default; restore them without JS. */}
        <style>{`[data-reveal]{opacity:1 !important;transform:none !important}`}</style>
      </noscript>

      <main>
        {/* ---------------------------------------------------------------- Hero */}
        <section className="d2c-hero">
          <div className="d2c-wrap d2c-hero__inner">
            <p className="d2c-label d2c-hero__eyebrow">
              <span aria-hidden="true" />
              {D2C_HERO.eyebrow}
            </p>

            <h1 className="d2c-h1">
              {D2C_HERO.headline[0]} {D2C_HERO.headline[1]}{" "}
              <span className="d2c-mark">{D2C_HERO.headlineAccent}</span>
            </h1>

            <p className="d2c-lead d2c-hero__sub">{D2C_HERO.sub}</p>

            <div className="d2c-hero__actions">
              <a
                className="d2c-btn"
                href={D2C_LINKEDIN}
                target="_blank"
                rel="noreferrer"
              >
                {D2C_HERO.cta}
              </a>
            </div>

            <p className="d2c-hero__trust">{D2C_HERO.trust}</p>
          </div>
        </section>

        {/* ------------------------------------------------------------- Problem */}
        <section className="d2c-section d2c-section--tint">
          <div className="d2c-wrap">
            <div className="d2c-problem__grid" data-reveal>
              <div>
                <p className="d2c-label">{D2C_PROBLEM.label}</p>
                <h2 className="d2c-h2" style={{ marginTop: 16 }}>
                  {D2C_PROBLEM.headline}
                </h2>
              </div>
              <p className="d2c-body">{D2C_PROBLEM.text}</p>
            </div>
          </div>
        </section>

        {/* --------------------------------------------------------- How it works */}
        <section className="d2c-section">
          <div className="d2c-wrap">
            <div data-reveal>
              <p className="d2c-label">How it works</p>
              <h2 className="d2c-h2" style={{ marginTop: 16, maxWidth: "22ch" }}>
                From reference to live page in one day.
              </h2>
            </div>

            <ol className="d2c-steps">
              {D2C_STEPS.map((step) => (
                <li key={step.n} className="d2c-step" data-reveal>
                  <span className="d2c-step__n">{step.n}</span>
                  <h3 className="d2c-h3">{step.title}</h3>
                  <p className="d2c-body">{step.text}</p>
                </li>
              ))}
            </ol>

            {/* Loom embed — set D2C_LOOM.embedUrl in lib/d2c.ts to go live */}
            <figure className="d2c-video" data-reveal>
              {D2C_LOOM.embedUrl ? (
                <iframe
                  src={D2C_LOOM.embedUrl}
                  title={D2C_LOOM.title}
                  loading="lazy"
                  allowFullScreen
                />
              ) : (
                <div className="d2c-video__ph">
                  <span className="d2c-video__play" aria-hidden="true">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M7 4.5l9 5.5-9 5.5V4.5z" fill="currentColor" />
                    </svg>
                  </span>
                  <figcaption className="d2c-label">
                    {D2C_LOOM.placeholder}
                  </figcaption>
                </div>
              )}
            </figure>
          </div>
        </section>

        {/* ------------------------------------------------------------ The work */}
        <section className="d2c-section d2c-section--tint">
          <div className="d2c-wrap">
            <div data-reveal>
              <p className="d2c-label">The work</p>
              <h2 className="d2c-h2" style={{ marginTop: 16 }}>
                Pages built with this system
              </h2>
            </div>

            <div className="d2c-grid">
              {D2C_WORK.map((shot) => (
                <ShotCard key={shot.caption} shot={shot} />
              ))}
            </div>

            <p className="d2c-note" data-reveal>
              {D2C_WORK_NOTE}
            </p>
          </div>
        </section>

        {/* -------------------------------------------------------- What I build */}
        <section className="d2c-section">
          <div className="d2c-wrap">
            <div data-reveal>
              <p className="d2c-label">What I build</p>
              <h2 className="d2c-h2" style={{ marginTop: 16, maxWidth: "20ch" }}>
                Every page type your funnel needs.
              </h2>
            </div>

            <ul className="d2c-builds">
              {D2C_BUILDS.map((item) => (
                <li key={item.title} className="d2c-build" data-reveal>
                  <CheckIcon />
                  <div>
                    <h3 className="d2c-build__title">{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* --------------------------------------------------------------- Offer */}
        <section className="d2c-section d2c-section--accent d2c-offer">
          <div className="d2c-wrap" data-reveal>
            <p className="d2c-label">{D2C_OFFER.label}</p>
            <h2 className="d2c-h2">{D2C_OFFER.headline}</h2>
            <p className="d2c-body">{D2C_OFFER.text}</p>
            <div className="d2c-offer__actions">
              <a
                className="d2c-btn"
                href={D2C_LINKEDIN}
                target="_blank"
                rel="noreferrer"
              >
                {D2C_OFFER.cta}
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* -------------------------------------------------------------- Footer */}
      <footer className="d2c-footer">
        <div className="d2c-wrap d2c-footer__inner">
          <div>
            <p className="d2c-footer__name">{D2C_FOOTER.name}</p>
            <p className="d2c-footer__role">{D2C_FOOTER.role}</p>
          </div>

          <nav className="d2c-footer__links" aria-label="Elsewhere">
            <a href={D2C_FOOTER.portfolioHref}>{D2C_FOOTER.portfolioLabel}</a>
            <a
              href={D2C_LINKEDIN}
              target="_blank"
              rel="noreferrer"
              aria-label="Meet Khunt on LinkedIn"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM10 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.4c0-1.3-.02-2.96-1.8-2.96-1.8 0-2.07 1.4-2.07 2.86V21h-4z" />
              </svg>
              LinkedIn
            </a>
          </nav>
        </div>
      </footer>

      {/* ---------------------------------------------------- Sticky mobile CTA */}
      <div className="d2c-sticky">
        <a
          className="d2c-btn d2c-btn--full"
          href={D2C_LINKEDIN}
          target="_blank"
          rel="noreferrer"
        >
          {D2C_STICKY}
        </a>
      </div>

      <Reveal />
    </div>
  );
}
