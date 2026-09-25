import Image from "next/image";
import Marquee from "@/components/ui/Marquee";
import RevealText from "@/components/anim/RevealText";
import { TOOLS_SECTION } from "@/lib/data";

type Tool = (typeof TOOLS_SECTION.tools)[number];

/**
 * One row of the wall.
 *
 * Every logo is forced to a flat silhouette with `brightness-0`: the files come
 * from mixed sources — white-on-transparent wordmarks lifted from a dark-themed
 * site, ink-coloured Simple Icons marks, a full-colour PNG — and without it the
 * white ones are invisible on this light band and the rest clash. Alpha is
 * untouched by the filter, so only the artwork goes dark.
 *
 * Square marks get a narrower slot than wordmarks, or `object-contain` would
 * leave them swimming in a box sized for lettering.
 */
function Row({ tools }: { tools: readonly Tool[] }) {
  return (
    <div className="flex items-center">
      {tools.map((tool) =>
        tool.src ? (
          <div
            key={tool.label}
            className={`relative h-9 shrink-0 lg:h-11 ${
              tool.mark
                ? "mx-5 w-9.5 lg:mx-7 lg:w-11"
                : "mx-6 w-29.5 lg:mx-8 lg:w-35.5"
            }`}
          >
            <Image
              src={tool.src}
              alt={tool.label}
              fill
              sizes="142px"
              className="object-contain object-center brightness-0"
            />
          </div>
        ) : (
          /* No usable logo exists for these; set as type so the row stays a
             wordmark wall rather than gaining three coloured favicon tiles. */
          <span
            key={tool.label}
            className="mx-6 shrink-0 whitespace-nowrap font-sans text-[19px] font-medium tracking-[-0.02em] text-fg lg:mx-8 lg:text-[23px]"
          >
            {tool.label}
          </span>
        ),
      )}
    </div>
  );
}

/**
 * Tinted full-bleed band under the services list: two rows drifting in
 * opposite directions. The second row is reversed so the two never line up.
 */
export default function Tools() {
  const { tools } = TOOLS_SECTION;

  return (
    <section
      id="tools"
      className="mt-[100px] w-full overflow-hidden bg-surface py-16 lg:mt-[160px] lg:py-24"
    >
      <div className="section-row flex justify-center">
        <RevealText as="h3" className="heading-md text-center" split="lines">
          {TOOLS_SECTION.heading}
        </RevealText>
      </div>

      <div className="mt-12 flex flex-col gap-7 opacity-60 lg:mt-14 lg:gap-9">
        <Marquee speed={38} direction="left">
          <Row tools={tools} />
        </Marquee>
        <Marquee speed={32} direction="right">
          <Row tools={[...tools].reverse()} />
        </Marquee>
      </div>
    </section>
  );
}
