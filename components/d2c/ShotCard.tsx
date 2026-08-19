import type { D2CShot } from "@/lib/d2c";

/**
 * Work card: desktop and mobile screenshot side by side inside CSS-drawn
 * frames. With no `desktop`/`mobile` path set it renders a wireframe
 * placeholder — no stock photography, no image request.
 */

function Wireframe({ variant }: { variant: "desktop" | "mobile" }) {
  return (
    <div className="d2c-wire" aria-hidden="true">
      <span className="d2c-wire__hero" />
      <span className="d2c-wire__line d2c-wire__line--lg" />
      <span className="d2c-wire__line" />
      {variant === "desktop" && <span className="d2c-wire__line" />}
      <span className="d2c-wire__cta" />
      <span className="d2c-wire__grid">
        <span />
        <span />
        {variant === "desktop" && <span />}
      </span>
    </div>
  );
}

export default function ShotCard({ shot }: { shot: D2CShot }) {
  const alt = shot.alt ?? shot.caption;

  return (
    <article className="d2c-card" data-reveal>
      <div className="d2c-shots">
        <div className="d2c-frame d2c-frame--desktop">
          <span className="d2c-frame__bar" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <div className="d2c-frame__screen">
            {shot.desktop ? (
              <img
                src={shot.desktop}
                alt={`${alt} — desktop view`}
                width={1280}
                height={800}
                loading="lazy"
                decoding="async"
              />
            ) : (
              <Wireframe variant="desktop" />
            )}
          </div>
        </div>

        <div className="d2c-frame d2c-frame--mobile">
          <span className="d2c-frame__notch" aria-hidden="true" />
          <div className="d2c-frame__screen">
            {shot.mobile ? (
              <img
                src={shot.mobile}
                alt={`${alt} — mobile view`}
                width={390}
                height={780}
                loading="lazy"
                decoding="async"
              />
            ) : (
              <Wireframe variant="mobile" />
            )}
          </div>
        </div>
      </div>

      <div className="d2c-card__foot">
        <p className="d2c-card__caption">{shot.caption}</p>
        {shot.liveUrl && (
          <a
            className="d2c-card__link"
            href={shot.liveUrl}
            target="_blank"
            rel="noreferrer"
          >
            View live
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M2.5 9.5 9.5 2.5M9.5 2.5H4.5M9.5 2.5v5"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        )}
      </div>
    </article>
  );
}
