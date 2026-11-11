import { CC_ICEBERG } from "@/lib/checkout-champ";

/*
 * Flat (2D) iceberg infographic for the Checkout Champ hero.
 *
 * The illustration is two SVGs — the tip above the waterline and the body
 * below it — sharing one 200-unit-wide coordinate system, so the tip's base
 * (x 52..148) lands exactly on the body's top edge when both render at the
 * same width. Everything readable is HTML, not SVG text: it reflows on a
 * phone, stays sharp, and is crawlable like the rest of the page.
 *
 * Palette is scoped to this component: the site's ink and white, plus a
 * sky-to-deep-water blue range.
 */

const ICE_OUTLINE = "#8fb4dc";

function IcebergTip({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 150" className={className} aria-hidden="true">
      {/* Lit face */}
      <polygon points="52,150 66,88 92,8 98,150" fill="#ffffff" />
      {/* Mid face */}
      <polygon points="92,8 112,40 128,58 118,150 98,150" fill="#dfeaf6" />
      {/* Shadow face */}
      <polygon points="128,58 148,150 118,150" fill="#bcd3ec" />
      {/* Small shoulder facet */}
      <polygon points="66,88 92,8 82,104" fill="#f2f7fc" />
      {/* Outline + facet edges */}
      <polyline
        points="52,150 66,88 92,8 112,40 128,58 148,150"
        fill="none"
        stroke={ICE_OUTLINE}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M92 8 L98 150 M128 58 L118 150 M66 88 L82 104 L98 150"
        stroke={ICE_OUTLINE}
        strokeWidth="1"
        strokeOpacity="0.7"
        fill="none"
      />
    </svg>
  );
}

function IcebergBody({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 300" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="iceberg-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#d6e9fc" stopOpacity="0.62" />
          <stop offset="1" stopColor="#8cb9eb" stopOpacity="0.14" />
        </linearGradient>
      </defs>
      <polygon
        points="52,0 148,0 176,46 188,118 168,196 132,262 96,292 62,262 30,196 14,120 26,52"
        fill="url(#iceberg-body)"
        stroke="#cfe3f8"
        strokeOpacity="0.55"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* Facets: lighter planes catching the light from the surface */}
      <polygon points="52,0 148,0 104,62" fill="#ffffff" fillOpacity="0.16" />
      <polygon points="26,52 52,0 104,62 60,120" fill="#ffffff" fillOpacity="0.1" />
      <polygon points="148,0 176,46 150,110 104,62" fill="#ffffff" fillOpacity="0.07" />
      <polygon points="60,120 104,62 150,110 100,170" fill="#ffffff" fillOpacity="0.08" />
      <path
        d="M52 0 L104 62 L148 0 M104 62 L60 120 L14 120 M104 62 L150 110 L188 118 M60 120 L100 170 L150 110 M100 170 L96 292 M100 170 L30 196 M100 170 L168 196 M62 262 L100 170 L132 262"
        stroke="#ffffff"
        strokeOpacity="0.2"
        strokeWidth="1"
        fill="none"
      />
    </svg>
  );
}

/** A label chip with a short leader line pointing at the iceberg (tablet+). */
function Chip({
  text,
  side,
  tone,
}: {
  text: string;
  side: "left" | "right";
  tone: "above" | "below";
}) {
  const above = tone === "above";
  return (
    <li className="relative">
      <span
        className={`block rounded-[10px] border px-3 py-2 font-ui text-[12px] font-semibold leading-[1.3] tracking-[-0.01em] lg:text-[12.5px] ${
          above
            ? "border-[#c6daef] bg-white text-fg shadow-[0_6px_16px_-10px_rgba(16,24,40,0.35)]"
            : "border-white/20 bg-white/[0.08] text-white backdrop-blur-sm"
        } ${side === "left" ? "sm:text-right" : ""}`}
      >
        {text}
      </span>
      {/* Leader: hairline + dot, toward the centre column */}
      <span
        aria-hidden
        className={`pointer-events-none absolute top-1/2 hidden h-px w-4 sm:block lg:w-5 ${
          side === "left" ? "left-full" : "right-full"
        } ${above ? "bg-[#8fb4dc]" : "bg-white/40"}`}
      >
        <span
          className={`absolute top-1/2 size-1.5 -translate-y-1/2 rounded-full ${
            side === "left" ? "right-0 translate-x-1/2" : "left-0 -translate-x-1/2"
          } ${above ? "bg-[#4f86c6]" : "bg-[#9cc8f5]"}`}
        />
      </span>
    </li>
  );
}

const ROW =
  "grid grid-cols-2 gap-x-3 sm:grid-cols-[minmax(0,1fr)_150px_minmax(0,1fr)] sm:gap-x-5 lg:grid-cols-[minmax(0,1fr)_170px_minmax(0,1fr)]";
const ART = "mx-auto block w-[150px] sm:w-full";

export default function IcebergInfographic() {
  const { above, below } = CC_ICEBERG;
  const half = (items: string[]) => {
    const mid = Math.ceil(items.length / 2);
    return [items.slice(0, mid), items.slice(mid)] as const;
  };
  const [aboveLeft, aboveRight] = half(above.items);
  const [belowLeft, belowRight] = half(below.items);

  return (
    <figure
      aria-labelledby="iceberg-title"
      aria-describedby="iceberg-desc"
      className="overflow-hidden rounded-[16px] border border-line shadow-[0_24px_60px_-30px_rgba(16,24,40,0.45)]"
    >
      {/* Sky: headline + what customers see */}
      <div className="bg-[linear-gradient(180deg,#ffffff_0%,#eef5fc_100%)] px-5 pt-6 sm:px-7 sm:pt-8">
        <p
          id="iceberg-title"
          className="max-w-[20ch] font-sans text-[22px] font-medium leading-[1.1] tracking-[-0.02em] text-fg sm:text-[26px]"
        >
          {CC_ICEBERG.headline}
        </p>
        <p
          id="iceberg-desc"
          className="mt-3 max-w-[46ch] font-ui text-[14px] leading-[1.55] text-fg/70"
        >
          {CC_ICEBERG.supporting}
        </p>

        <div className="mt-6 flex items-center justify-between gap-3 border-t border-[#d5e4f3] pt-4">
          <span className="category">{above.label}</span>
          <span className="rounded-full border border-[#c6daef] bg-white px-2.5 py-1 font-ui text-[11px] font-semibold text-fg">
            {above.platform}
          </span>
        </div>

        <div className={`${ROW} mt-4`}>
          <ul aria-label={`${above.platform}: ${above.label}`} className="flex flex-col justify-center gap-2.5 pb-5 sm:pb-6">
            {aboveLeft.map((t) => (
              <Chip key={t} text={t} side="left" tone="above" />
            ))}
          </ul>
          <div className="order-last col-span-2 self-end sm:order-none sm:col-span-1">
            <IcebergTip className={ART} />
          </div>
          <ul aria-label={`${above.platform}: ${above.label} (continued)`} className="flex flex-col justify-center gap-2.5 pb-5 sm:pb-6">
            {aboveRight.map((t) => (
              <Chip key={t} text={t} side="right" tone="above" />
            ))}
          </ul>
        </div>
      </div>

      {/* Water: the infrastructure underneath */}
      <div className="relative bg-[linear-gradient(180deg,#2a6fbb_0%,#174b86_38%,#0c2a4f_100%)] px-5 pb-6 sm:px-7 sm:pb-8">
        {/* Waterline */}
        <svg
          aria-hidden
          viewBox="0 0 400 12"
          preserveAspectRatio="none"
          className="absolute inset-x-0 top-0 h-3 w-full -translate-y-1/2"
        >
          <path
            d="M0 6 Q 25 0 50 6 T 100 6 T 150 6 T 200 6 T 250 6 T 300 6 T 350 6 T 400 6"
            fill="none"
            stroke="#ffffff"
            strokeOpacity="0.75"
            strokeWidth="1.5"
          />
        </svg>

        {/* Connector on the waterline (tablet+; repeated below on phones) */}
        <span className="absolute right-5 top-0 z-[1] hidden -translate-y-1/2 items-center gap-1.5 rounded-full border border-[#c6daef] bg-white px-3 py-1.5 font-ui text-[11px] font-semibold text-fg shadow-[0_6px_16px_-8px_rgba(16,24,40,0.4)] sm:inline-flex sm:right-7">
          <span aria-hidden>⇅</span>
          {CC_ICEBERG.connector}
        </span>

        {/* Bubbles */}
        <span aria-hidden className="absolute left-[9%] top-[38%] size-1.5 rounded-full bg-white/25" />
        <span aria-hidden className="absolute left-[13%] top-[30%] size-1 rounded-full bg-white/20" />
        <span aria-hidden className="absolute right-[11%] top-[64%] size-2 rounded-full bg-white/15" />
        <span aria-hidden className="absolute right-[16%] top-[56%] size-1 rounded-full bg-white/25" />

        <div className={ROW}>
          <div className="order-first col-span-2 self-start sm:order-none sm:col-span-1 sm:col-start-2 sm:row-start-1">
            <IcebergBody className={ART} />
          </div>
          <ul
            aria-label={`${below.platform}: ${below.label}`}
            className="flex flex-col justify-center gap-2.5 pt-5 sm:col-start-1 sm:row-start-1 sm:pt-6"
          >
            {belowLeft.map((t) => (
              <Chip key={t} text={t} side="left" tone="below" />
            ))}
          </ul>
          <ul
            aria-label={`${below.platform}: ${below.label} (continued)`}
            className="flex flex-col justify-center gap-2.5 pt-5 sm:col-start-3 sm:row-start-1 sm:pt-6"
          >
            {belowRight.map((t) => (
              <Chip key={t} text={t} side="right" tone="below" />
            ))}
          </ul>
        </div>

        <div className="mt-6 flex items-center justify-between gap-3 border-t border-white/15 pt-4">
          <span className="font-ui text-[12px] font-medium uppercase tracking-[0.03em] text-white/60">
            {below.label}
          </span>
          <span className="rounded-full border border-white/25 bg-white/10 px-2.5 py-1 font-ui text-[11px] font-semibold text-white">
            {below.platform}
          </span>
        </div>
        <p className="mt-4 flex items-center justify-center gap-1.5 font-ui text-[12px] font-semibold text-white/80 sm:hidden">
          <span aria-hidden>⇅</span>
          {CC_ICEBERG.connector}
        </p>
      </div>
    </figure>
  );
}
