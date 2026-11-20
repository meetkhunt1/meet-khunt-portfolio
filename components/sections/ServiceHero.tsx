import Link from "next/link";
import RevealText from "@/components/anim/RevealText";
import FadeIn from "@/components/anim/FadeIn";
import { CONTACT } from "@/lib/data";

export type ToolMark = "shopify" | "checkout-champ";

export type ServiceHeroContent = {
  /** Two-line headline: the first line in ink, the second in grey. */
  lines: [string, string];
  /** Short lead paragraph; runs marked `bold` are set heavier. */
  lead: { text: string; bold?: boolean }[];
  /** Tool whose mark is drawn beside the lead. */
  mark: ToolMark;
  cta: string;
};

/**
 * Above-the-fold hero shared by the service pages: an oversized two-line
 * headline, then the tool's logo on a tilted app-style tile beside a short
 * lead and one call to action.
 */
export default function ServiceHero({ content }: { content: ServiceHeroContent }) {
  return (
    <section className="section-row pt-[56px] lg:pt-[96px]">
      <h1 className="font-sans text-[clamp(44px,7.2vw,112px)] font-normal leading-[1.04] tracking-[-0.04em]">
        <RevealText as="span" split="lines" className="block text-fg">
          {content.lines[0]}
        </RevealText>
        <RevealText as="span" split="lines" delay={0.1} className="block text-fg/35">
          {content.lines[1]}
        </RevealText>
      </h1>

      <FadeIn
        delay={0.2}
        className="mt-14 grid grid-cols-1 items-center gap-10 lg:mt-20 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16"
      >
        <div className="flex justify-start lg:justify-end lg:pr-6">
          <ToolTile mark={content.mark} />
        </div>

        <div>
          <p className="max-w-[46ch] font-ui text-[18px] leading-[1.5] text-fg/80 lg:text-[22px]">
            {content.lead.map((run, i) =>
              run.bold ? (
                <strong key={i} className="font-semibold text-fg">
                  {run.text}
                </strong>
              ) : (
                <span key={i}>{run.text}</span>
              ),
            )}
          </p>
          <Link
            href={CONTACT.href}
            data-cursor="grow"
            className="pill mt-8 h-14 rounded-full px-12 text-[18px] tracking-[-0.01em]"
          >
            {content.cta}
          </Link>
        </div>
      </FadeIn>
    </section>
  );
}

const MARKS: Record<ToolMark, { src: string; label: string; width: string }> = {
  shopify: { src: "/tools/shopify-bag.webp", label: "Shopify", width: "52%" },
  "checkout-champ": { src: "/tools/checkout-champ-mark.webp", label: "Checkout Champ", width: "62%" },
};

/**
 * The tool's real logo on a white app tile: rounded corners (16px at 90px,
 * scaled), a light grey border, a soft layered shadow and a slight tilt.
 */
function ToolTile({ mark }: { mark: ToolMark }) {
  const m = MARKS[mark];
  return (
    <div
      className="relative grid size-[140px] -rotate-[8deg] place-items-center rounded-[17.8%] border border-[#d9d9d9] bg-white lg:size-[190px]"
      style={{
        boxShadow:
          "0 0.602187px 0.602187px -1.33333px #00000030, 0 2.28853px 2.28853px -2.66667px #0000002a, 0 10px 10px -4px #0000000d",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={m.src}
        alt={`${m.label} logo`}
        style={{ width: m.width }}
      />
    </div>
  );
}
