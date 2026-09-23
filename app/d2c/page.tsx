import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import Faq from "@/components/d2c/Faq";
import {
  BanIcon,
  CaretRightIcon,
  CheckCircleIcon,
  CheckIcon,
  CheckSquareIcon,
  CrossIcon,
  PlayIcon,
} from "@/components/d2c/icons";
import {
  D2C_AUDIENCE,
  D2C_CTA_HREF,
  D2C_FAQ,
  D2C_FOOTER,
  D2C_FOUNDER,
  D2C_HERO,
  D2C_HOW,
  D2C_META,
  D2C_PROBLEM,
  D2C_RESULTS,
  D2C_STICKY,
  D2C_SYSTEM,
  type D2CShot,
} from "@/lib/d2c";
import "./d2c.css";

/**
 * Page-scoped font. The reference build is set in Inter Tight across every
 * element, including the 900-weight hero, which the site's local Switzer/Inter
 * pair doesn't cover — so this route loads its own self-hosted family.
 */
const interTight = Inter_Tight({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter-tight",
  display: "swap",
});

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

/* -------------------------------------------------------------- fragments */

/** Decorative shape divider sitting on a section's top edge. */
function ShapeNotch() {
  return (
    <div className="d2c-shape" aria-hidden="true">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 4080 400" preserveAspectRatio="none">
        <path d="M2091.6,272.9c-21.8-43-35.2-89.7-35.2-137.9v-1c0-58.8,47.6-106.4,106.4-106.4H4080V0H0v27.6h1917.7c58.8,0,106.4,47.6,106.4,106.4v0c0,48.4-12.9,95.8-35.6,138.5c-5.5,10.3-8,22.5-5.8,35.3c4.6,27.6,29,48.6,57,48.4c31.7-0.1,58-25.9,58-57.6C2097.7,289.4,2095.5,280.6,2091.6,272.9z" />
      </svg>
    </div>
  );
}

function ShapeWave() {
  return (
    <div className="d2c-shape d2c-shape--flip" aria-hidden="true">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" preserveAspectRatio="none">
        <path d="M790.5,93.1c-59.3-5.3-116.8-18-192.6-50c-29.6-12.7-76.9-31-100.5-35.9c-23.6-4.9-52.6-7.8-75.5-5.3c-10.2,1.1-22.6,1.4-50.1,7.4c-27.2,6.3-58.2,16.6-79.4,24.7c-41.3,15.9-94.9,21.9-134,22.6C72,58.2,0,25.8,0,25.8V100h1000V65.3c0,0-51.5,19.4-106.2,25.7C839.5,97,814.1,95.2,790.5,93.1z" />
      </svg>
    </div>
  );
}

function Cta({ label, padded }: { label: string; padded?: boolean }) {
  return (
    <div className={`d2c-btnrow${padded ? " d2c-btnrow--pad" : ""}`}>
      <a className="d2c-btn" href={D2C_CTA_HREF} target="_blank" rel="noreferrer">
        {label}
      </a>
    </div>
  );
}

/**
 * A full-page screenshot in a short frame that scrolls on its own, so a
 * 7,000px page shot costs ~460px of document height and can still be read
 * end to end.
 */
function ScrollShot({ shot }: { shot: D2CShot }) {
  return (
    <div className="d2c-shot">
      <div className="d2c-shot__scroll" tabIndex={0} role="group" aria-label={shot.alt}>
        <img
          src={shot.src}
          alt={shot.alt}
          width={shot.width}
          height={shot.height}
          loading="lazy"
          decoding="async"
        />
      </div>
      <span className="d2c-shot__hint">Scroll</span>
    </div>
  );
}

/* ------------------------------------------------------------------- page */

export default function D2CPage() {
  return (
    <div className={`d2c ${interTight.variable}`}>
      <main>
        {/* ------------------------------------------------------------ hero */}
        <section className="d2c-sec d2c-hero" id="top">
          <div className="d2c-sec__in">
            <p className="d2c-hero__eyebrow">{D2C_HERO.eyebrow}</p>

            <h1 className="d2c-h1">
              {D2C_HERO.headline.before}{" "}
              <span className="d2c-mark">{D2C_HERO.headline.accent}</span>{" "}
              {D2C_HERO.headline.after}
            </h1>

            <p className="d2c-hero__sub">{D2C_HERO.sub}</p>

            <div className="d2c-videocard">
              <p className="d2c-videocard__label">{D2C_HERO.videoLabel}</p>
              <div className="d2c-videocard__frame">
                {D2C_HERO.videoEmbedUrl ? (
                  <iframe
                    src={D2C_HERO.videoEmbedUrl}
                    title={D2C_HERO.videoTitle}
                    loading="lazy"
                    allow="clipboard-write; fullscreen"
                    allowFullScreen
                  />
                ) : (
                  <div className="d2c-videocard__ph">
                    <span className="d2c-videocard__play">
                      <PlayIcon />
                    </span>
                    <span className="d2c-videocard__phlabel">
                      {D2C_HERO.videoPlaceholder}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <Cta label={D2C_HERO.cta} />
          </div>
        </section>

        {/* -------------------------------------------------- who is this for */}
        <section className="d2c-sec d2c-audience" id="who">
          <ShapeNotch />
          <div className="d2c-sec__in">
            <h2 className="d2c-h2 d2c-h2--pb">{D2C_AUDIENCE.title}</h2>

            <div className="d2c-cols">
              <div className="d2c-card">
                <p className="d2c-card__cap">{D2C_AUDIENCE.forTitle}</p>
                <ul className="d2c-iconlist d2c-iconlist--yes">
                  {D2C_AUDIENCE.forItems.map((item) => (
                    <li key={item}>
                      <CheckCircleIcon />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="d2c-card">
                <p className="d2c-card__cap">{D2C_AUDIENCE.notTitle}</p>
                <ul className="d2c-iconlist d2c-iconlist--no">
                  {D2C_AUDIENCE.notItems.map((item) => (
                    <li key={item}>
                      <BanIcon />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------- proof */}
        <section className="d2c-sec d2c-results" id="results">
          <ShapeWave />
          <div className="d2c-sec__in">
            <h2 className="d2c-h2">{D2C_RESULTS.title}</h2>
            <p className="d2c-sub">{D2C_RESULTS.sub}</p>

            {D2C_RESULTS.boxes.map((box) => (
              <div className="d2c-proofbox" id={box.id} key={box.id}>
                <div className="d2c-proofgrid">
                  {box.shots.map((shot) => (
                    <ScrollShot key={shot.src} shot={shot} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* --------------------------------------------------------- problem */}
        <section className="d2c-sec d2c-problem">
          <div className="d2c-sec__in">
            <h2 className="d2c-h2">{D2C_PROBLEM.title}</h2>
            <p className="d2c-sub">{D2C_PROBLEM.sub}</p>

            <div className="d2c-featbox">
              <ul className="d2c-feat d2c-feat--no">
                {D2C_PROBLEM.items.map((item) => (
                  <li key={item.title}>
                    <span className="d2c-feat__icon">
                      <CrossIcon />
                    </span>
                    <div>
                      <h3 className="d2c-feat__title">{item.title}</h3>
                      <p className="d2c-feat__text">{item.text}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="d2c-divider">
                <span />
              </div>

              <p className="d2c-close">{D2C_PROBLEM.closing}</p>

              <Cta label={D2C_PROBLEM.cta} padded />
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------- system */}
        <section className="d2c-sec d2c-system" id="system">
          <div className="d2c-sec__in">
            <h2 className="d2c-h2">{D2C_SYSTEM.title}</h2>
            <p className="d2c-sub">{D2C_SYSTEM.sub}</p>

            <div className="d2c-featbox">
              <ul className="d2c-feat d2c-feat--yes">
                {D2C_SYSTEM.items.map((item) => (
                  <li key={item.title}>
                    <span className="d2c-feat__icon">
                      <CheckIcon />
                    </span>
                    <div>
                      <h3 className="d2c-feat__title">{item.title}</h3>
                      <p className="d2c-feat__text">{item.text}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="d2c-divider">
                <span />
              </div>

              <p className="d2c-close">{D2C_SYSTEM.closing}</p>

              <Cta label={D2C_SYSTEM.cta} padded />
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------- how it works */}
        <section className="d2c-sec d2c-how" id="how">
          <div className="d2c-sec__in">
            <h2 className="d2c-h2 d2c-h2--pb">{D2C_HOW.title}</h2>

            {D2C_HOW.phases.map((phase) => (
              <div className="d2c-phase" key={phase.title}>
                <h3 className="d2c-phase__title">{phase.title}</h3>
                <div className="d2c-phase__body">
                  <p>{phase.intro}</p>
                  <ul>
                    {phase.bullets.map((b) => (
                      <li key={b}>
                        <p>{b}</p>
                      </li>
                    ))}
                  </ul>
                  <p>{phase.outro}</p>
                </div>
              </div>
            ))}

            <div className="d2c-roles">
              {D2C_HOW.roles.map((role) => (
                <div className="d2c-role" key={role.title}>
                  <h3>{role.title}</h3>
                  <p>{role.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --------------------------------------------------------- founder */}
        <section className="d2c-sec d2c-founderwrap">
          <div className="d2c-sec__in">
            <div className="d2c-founder">
              <div className="d2c-founder__row">
                <div className="d2c-founder__text">
                  <h2 className="d2c-founder__h2">
                    {D2C_FOUNDER.greeting}{" "}
                    <span className="d2c-gradient">{D2C_FOUNDER.name}</span>
                  </h2>

                  <p className="d2c-founder__bio">{D2C_FOUNDER.bio}</p>

                  <p className="d2c-founder__listtitle">
                    {D2C_FOUNDER.listTitle}
                  </p>

                  <ul className="d2c-founder__list">
                    {D2C_FOUNDER.listItems.map((item) => (
                      <li key={item}>
                        <CheckSquareIcon />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <p className="d2c-founder__closing">{D2C_FOUNDER.closing}</p>
                </div>

                <div className="d2c-founder__img">
                  <img
                    src={D2C_FOUNDER.portrait}
                    alt={D2C_FOUNDER.portraitAlt}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------- FAQ */}
        <section className="d2c-sec d2c-faqwrap" id="faq">
          <div className="d2c-sec__in">
            <h2 className="d2c-h2 d2c-h2--pb">{D2C_FAQ.title}</h2>
            <Faq items={D2C_FAQ.items} />
            <Cta label={D2C_FAQ.cta} />
          </div>
        </section>
      </main>

      {/* ---------------------------------------------------------- footer */}
      <footer className="d2c-sec d2c-footer">
        <div className="d2c-sec__in">
          <nav className="d2c-footer__links" aria-label="Legal and contact">
            {D2C_FOOTER.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                {...(link.href.startsWith("http")
                  ? { target: "_blank", rel: "noreferrer" }
                  : {})}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <p className="d2c-footer__disclaimer">{D2C_FOOTER.disclaimer}</p>
          <p className="d2c-footer__copy">{D2C_FOOTER.copyright}</p>
        </div>
      </footer>

      {/* ------------------------------------------------------- sticky CTA */}
      <div className="d2c-sticky">
        <div className="d2c-sticky__in">
          <p className="d2c-sticky__text">{D2C_STICKY.text}</p>
          <a
            className="d2c-sticky__btn"
            href={D2C_CTA_HREF}
            target="_blank"
            rel="noreferrer"
          >
            <span>{D2C_STICKY.cta}</span>
            <span className="d2c-sticky__tab">
              <CaretRightIcon />
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}
