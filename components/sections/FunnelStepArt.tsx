/**
 * A generic wireframe of one funnel step, drawn in SVG.
 *
 * Funnel work is usually under NDA, so the project cards can't show client
 * screenshots. These sketches show the shape of each page type instead - an
 * article, a checkout form, an upsell offer - with no client content in them.
 * The page type is read from the step's label, so adding a step to a project
 * needs no extra data.
 */

type Kind = "article" | "list" | "sales" | "checkout" | "upsell" | "thanks";

function kindOf(label: string): Kind {
  const l = label.toLowerCase();
  if (l.includes("thank")) return "thanks";
  if (l.includes("upsell") || l.includes("downsell")) return "upsell";
  if (l.includes("checkout") || l.includes("order")) return "checkout";
  if (l.includes("listicle")) return "list";
  if (l.includes("sales") || l.includes("product") || l.includes("landing"))
    return "sales";
  return "article";
}

/* Shared pieces, on a 50 x 80 canvas. Everything inherits the text colour. */
const Bar = ({
  x = 6,
  y,
  w = 38,
  h = 5,
  o = 0.75,
}: {
  x?: number;
  y: number;
  w?: number;
  h?: number;
  o?: number;
}) => (
  <rect x={x} y={y} width={w} height={h} rx={1} fill="currentColor" opacity={o} />
);

const Line = ({ x = 6, y, w = 38 }: { x?: number; y: number; w?: number }) => (
  <Bar x={x} y={y} w={w} h={2} o={0.25} />
);

const Block = ({
  x = 6,
  y,
  w = 38,
  h,
}: {
  x?: number;
  y: number;
  w?: number;
  h: number;
}) => (
  <rect x={x} y={y} width={w} height={h} rx={2} fill="currentColor" opacity={0.12} />
);

const Button = ({ y }: { y: number }) => (
  <rect x={6} y={y} width={38} height={9} rx={4.5} fill="currentColor" />
);

const Field = ({ x = 6, y, w = 38 }: { x?: number; y: number; w?: number }) => (
  <rect
    x={x}
    y={y}
    width={w}
    height={8}
    rx={1.5}
    fill="none"
    stroke="currentColor"
    strokeOpacity={0.4}
  />
);

function Art({ kind }: { kind: Kind }) {
  switch (kind) {
    case "article":
      return (
        <>
          <Bar y={8} />
          <Bar y={16} w={26} />
          <Block y={26} h={20} />
          <Line y={51} />
          <Line y={56} />
          <Line y={61} />
          <Line y={66} w={22} />
        </>
      );
    case "list":
      return (
        <>
          <Bar y={8} />
          {[20, 34, 48, 62].map((y) => (
            <g key={y}>
              <Block y={y} w={9} h={9} />
              <Bar x={19} y={y + 1} w={25} h={2.5} o={0.6} />
              <Line x={19} y={y + 5.5} w={18} />
            </g>
          ))}
        </>
      );
    case "sales":
      return (
        <>
          <Block y={8} h={28} />
          <Bar y={41} w={30} />
          <Line y={50} />
          <Line y={55} w={28} />
          <Button y={63} />
        </>
      );
    case "checkout":
      return (
        <>
          <Bar y={8} w={18} h={4} />
          <Field y={17} />
          <Field y={28} />
          <Field y={39} w={17.5} />
          <Field x={26.5} y={39} w={17.5} />
          <Line y={52} />
          <Line y={56} w={24} />
          <Button y={63} />
        </>
      );
    case "upsell":
      return (
        <>
          <rect x={13} y={8} width={24} height={6} rx={3} fill="var(--color-accent)" />
          <Bar x={9} y={18} w={32} />
          <Block x={11} y={27} w={28} h={22} />
          <Button y={54} />
          <Line x={15} y={67} w={20} />
        </>
      );
    case "thanks":
      return (
        <>
          <circle
            cx={25}
            cy={24}
            r={10}
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeOpacity={0.8}
          />
          <path
            d="M20.5 24.5l3 3 6-6.5"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Bar x={10} y={42} w={30} />
          <Line x={8} y={52} w={34} />
          <Line x={13} y={57} w={24} />
          <rect
            x={6}
            y={64}
            width={38}
            height={9}
            rx={2}
            fill="none"
            stroke="currentColor"
            strokeOpacity={0.3}
          />
        </>
      );
  }
}

export default function FunnelStepArt({ label }: { label: string }) {
  return (
    <svg
      viewBox="0 0 50 80"
      aria-hidden="true"
      className="block w-full rounded-[6px] border border-fg/25 bg-bg text-fg shadow-[0_6px_14px_-10px_rgba(16,24,40,0.35)]"
    >
      <Art kind={kindOf(label)} />
    </svg>
  );
}
