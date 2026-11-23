import RevealText from "@/components/anim/RevealText";
import FadeIn from "@/components/anim/FadeIn";
import { TOOLS_SECTION } from "@/lib/data";

type Tool = (typeof TOOLS_SECTION.tools)[number];

/**
 * The stack: a centred heading, the five platforms as app tiles, and the
 * things a client can ask for as chips underneath.
 */
export default function Tools() {
  return (
    <section className="section-row flex flex-col items-center pt-[100px] text-center lg:pt-[160px]">
      <RevealText as="h2" className="heading-lg max-w-[18ch]" split="lines">
        {TOOLS_SECTION.heading}
      </RevealText>
      <FadeIn delay={0.1}>
        <p className="mx-auto mt-5 max-w-[46ch] font-ui text-[17px] leading-[1.55] text-muted lg:text-[19px]">
          {TOOLS_SECTION.sub}
        </p>
      </FadeIn>

      <FadeIn delay={0.15}>
        <ul className="mt-12 flex flex-wrap justify-center gap-3 md:gap-4 lg:mt-14">
          {TOOLS_SECTION.tools.filter((tool) => !tool.hidden).map((tool) => (
            <li key={tool.label}>
              <ToolTile tool={tool} />
            </li>
          ))}
        </ul>
      </FadeIn>

      <FadeIn delay={0.2}>
        <ul className="mx-auto mt-12 flex max-w-[760px] flex-wrap justify-center gap-3 lg:mt-14">
          {TOOLS_SECTION.chips.map((chip) => (
            <li
              key={chip}
              className="rounded-full border border-line bg-surface px-5 py-2.5 font-ui text-[15px] text-fg lg:text-[17px]"
            >
              {chip}
            </li>
          ))}
        </ul>
      </FadeIn>
    </section>
  );
}

/** One platform as an app icon: brand-coloured tile, logo centred. */
export function ToolTile({ tool }: { tool: Tool }) {
  return (
    <div
      title={tool.label}
      className="grid size-[64px] place-items-center rounded-[22.5%] border border-white/10 transition-transform duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] hover:-translate-y-1 md:size-[88px] lg:size-[104px]"
      style={{
        background: tool.bg,
        boxShadow:
          "0 0.6px 0.6px -1.3px rgba(0,0,0,0.19), 0 2.3px 2.3px -2.7px rgba(0,0,0,0.16), 0 10px 18px -6px rgba(0,0,0,0.45)",
      }}
    >
      {tool.src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={tool.src}
          alt={`${tool.label} logo`}
          loading="lazy"
          className={tool.knockout ? "brightness-0 invert" : undefined}
          style={{ width: tool.size }}
        />
      ) : (
        <FigmaMark width={tool.size} />
      )}
    </div>
  );
}

/** The Figma mark in its five brand colours. */
function FigmaMark({ width }: { width: string }) {
  return (
    <svg viewBox="0 0 38 57" role="img" aria-label="Figma logo" style={{ width }}>
      <path d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" fill="#1ABCFE" />
      <path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z" fill="#0ACF83" />
      <path d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z" fill="#FF7262" />
      <path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" fill="#F24E1E" />
      <path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" fill="#A259FF" />
    </svg>
  );
}
