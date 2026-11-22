/**
 * Glowing line illustrations for the home-page service cards, drawn in code
 * so they stay sharp at any size and need no image files.
 *
 * One visual language for all four: brand-red strokes with a soft glow,
 * faint red fills, and off-white for the "content" inside each drawing.
 */

export type ServiceGraphicKind = "shopify" | "funnel" | "landing" | "cro";

const RED = "#ff3b3e";
const FILL = "rgba(238,33,36,0.10)";
const INK = "rgba(244,243,239,0.85)";
const DIM = "rgba(244,243,239,0.28)";

const line = {
  fill: "none",
  stroke: RED,
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export default function ServiceGraphic({ kind }: { kind: ServiceGraphicKind }) {
  return (
    <svg
      viewBox="0 0 320 200"
      aria-hidden
      className="h-full w-full [filter:drop-shadow(0_0_6px_rgba(238,33,36,0.55))_drop-shadow(0_0_18px_rgba(238,33,36,0.25))]"
    >
      {kind === "shopify" && <Shopify />}
      {kind === "funnel" && <Funnel />}
      {kind === "landing" && <Landing />}
      {kind === "cro" && <Cro />}
    </svg>
  );
}

/** A storefront in a browser window: product shot, copy lines, add-to-cart. */
function Shopify() {
  return (
    <>
      <rect x="54" y="28" width="212" height="148" rx="12" {...line} fill={FILL} />
      <path d="M54 48h212" {...line} />
      {[68, 78, 88].map((x) => (
        <circle key={x} cx={x} cy="38" r="2.6" fill={DIM} />
      ))}
      {/* Product image with the bag */}
      <rect x="70" y="62" width="82" height="98" rx="8" {...line} />
      <path d="M94 96h34l-3 40h-28z" {...line} />
      <path d="M103 96c0-9 16-9 16 0" {...line} />
      <path d="M116 108c-3-2-9-2-9 2s9 3 9 8-7 5-10 2" fill="none" stroke={INK} strokeWidth="1.6" strokeLinecap="round" />
      {/* Title, price, copy */}
      <rect x="166" y="64" width="78" height="8" rx="4" fill={INK} />
      <rect x="166" y="80" width="40" height="6" rx="3" fill={RED} />
      {[96, 106, 116].map((y, i) => (
        <rect key={y} x="166" y={y} width={i === 2 ? 52 : 82} height="4" rx="2" fill={DIM} />
      ))}
      {/* Swatches */}
      {[172, 186, 200].map((x, i) => (
        <circle key={x} cx={x} cy="131" r="5" fill={i === 0 ? RED : "none"} stroke={i === 0 ? RED : DIM} strokeWidth="1.4" />
      ))}
      <rect x="166" y="144" width="82" height="16" rx="8" fill={RED} />
      <rect x="187" y="150" width="40" height="4" rx="2" fill="#fff" />
    </>
  );
}

/** A funnel flow: four steps joined by a dashed path, the order step lit. */
function Funnel() {
  const steps = [
    { x: 22, y: 44, label: "Advertorial" },
    { x: 92, y: 116, label: "Checkout" },
    { x: 168, y: 44, label: "Upsell" },
    { x: 238, y: 116, label: "Thank you" },
  ];
  return (
    <>
      <path
        d="M82 60c20 0 10 70 30 70M152 132c20 0 10-72 36-72M228 60c20 0 10 70 30 70"
        fill="none"
        stroke={RED}
        strokeWidth="1.4"
        strokeDasharray="4 5"
        opacity="0.8"
      />
      {steps.map((s, i) => (
        <g key={s.label}>
          <rect x={s.x} y={s.y} width="60" height="34" rx="9" {...line} fill={i === 1 ? "rgba(238,33,36,0.22)" : FILL} />
          <text
            x={s.x + 30}
            y={s.y + 21}
            textAnchor="middle"
            fontSize="9"
            fontFamily="var(--font-body), sans-serif"
            fill={INK}
          >
            {s.label}
          </text>
        </g>
      ))}
      {/* Cart riding the path */}
      <g transform="translate(140 156)">
        <path d="M-14 -8h5l5 14h14l4-10h-21" {...line} />
        <circle cx="-2" cy="10" r="2.4" fill={RED} />
        <circle cx="9" cy="10" r="2.4" fill={RED} />
      </g>
      <circle cx="82" cy="60" r="3" fill={RED} />
      <circle cx="228" cy="60" r="3" fill={RED} />
    </>
  );
}

/** A long landing page running off the bottom, with an ad badge and cursor. */
function Landing() {
  return (
    <>
      <path d="M108 200V24a10 10 0 0 1 10-10h84a10 10 0 0 1 10 10v176" {...line} fill={FILL} />
      <rect x="120" y="26" width="80" height="44" rx="6" {...line} fill="rgba(238,33,36,0.2)" />
      <rect x="128" y="38" width="50" height="6" rx="3" fill={INK} />
      <rect x="128" y="50" width="34" height="4" rx="2" fill={DIM} />
      {[80, 90].map((y, i) => (
        <rect key={y} x="120" y={y} width={i ? 56 : 80} height="4" rx="2" fill={DIM} />
      ))}
      {[106, 122, 138].map((y) => (
        <g key={y}>
          <circle cx="125" cy={y + 2} r="3" fill={RED} />
          <rect x="134" y={y} width="62" height="4" rx="2" fill={DIM} />
        </g>
      ))}
      <rect x="120" y="156" width="80" height="16" rx="8" fill={RED} />
      <rect x="146" y="162" width="28" height="4" rx="2" fill="#fff" />
      <rect x="120" y="182" width="80" height="18" rx="4" {...line} />
      {/* "Ad" badge feeding traffic in */}
      <rect x="40" y="58" width="44" height="24" rx="12" {...line} />
      <text x="62" y="74" textAnchor="middle" fontSize="10" fontFamily="var(--font-body), sans-serif" fill={INK}>
        Ad
      </text>
      <path d="M84 70h18" {...line} strokeDasharray="3 4" />
      {/* Cursor on the button */}
      <path d="M196 160l12 30 4-12 12-4z" fill="#fff" stroke={RED} strokeWidth="1.2" strokeLinejoin="round" />
    </>
  );
}

/** Variant A against B, and a rising chart once the winner ships. */
function Cro() {
  const bars = [30, 38, 34, 48, 44, 62, 70, 86, 104];
  return (
    <>
      <rect x="30" y="22" width="260" height="160" rx="12" {...line} fill={FILL} />
      {[60, 100, 140].map((y) => (
        <path key={y} d={`M44 ${y}h232`} stroke={DIM} strokeWidth="0.6" opacity="0.5" />
      ))}
      {bars.map((h, i) => (
        <rect
          key={i}
          x={52 + i * 25}
          y={170 - h}
          width="15"
          height={h}
          rx="3"
          fill={i === bars.length - 1 ? RED : "rgba(238,33,36,0.28)"}
        />
      ))}
      <polyline
        points={bars.map((h, i) => `${59.5 + i * 25},${160 - h}`).join(" ")}
        fill="none"
        stroke="#fff"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      {bars.map((h, i) => (
        <circle key={i} cx={59.5 + i * 25} cy={160 - h} r="2.4" fill="#fff" />
      ))}
      {/* A / B toggle */}
      <rect x="44" y="34" width="62" height="22" rx="11" {...line} />
      <rect x="47" y="37" width="28" height="16" rx="8" fill="rgba(244,243,239,0.12)" />
      <text x="61" y="49" textAnchor="middle" fontSize="9" fontFamily="var(--font-body), sans-serif" fill={DIM}>
        A
      </text>
      <rect x="76" y="37" width="27" height="16" rx="8" fill={RED} />
      <text x="89.5" y="49" textAnchor="middle" fontSize="9" fontFamily="var(--font-body), sans-serif" fill="#fff">
        B
      </text>
    </>
  );
}
