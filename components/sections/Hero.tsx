import Image from "next/image";
import RevealText from "@/components/anim/RevealText";
import FadeIn from "@/components/anim/FadeIn";
import { CONTACT, HERO } from "@/lib/data";

/* Cards cycle through these so a column reads as a collage rather than a
   column of identical tiles. The shape is picked from the position in the
   ORIGINAL list, never the doubled one — if the two copies differed in height,
   the -50% translate would no longer land cleanly and the loop would jump. */
const CARD_SHAPES = ["aspect-[3/5]", "aspect-[4/5]", "aspect-[3/4]"];

/** Seconds for one full loop. Slower on the outer columns so they desync. */
const COLUMN_DURATIONS = [82, 64, 94];

function CollageColumn({
  images,
  index,
}: {
  images: readonly string[];
  index: number;
}) {
  /* Rendered twice: the animation translates the track by -50%, which lands
     copy two exactly where copy one began. */
  const doubled = [...images, ...images];

  return (
    <div
      className={index === 2 ? "hidden overflow-hidden lg:block" : "overflow-hidden"}
    >
      <div
        className={`hero-drift${index === 1 ? " hero-drift--reverse" : ""}`}
        style={
          { "--hero-drift-dur": `${COLUMN_DURATIONS[index]}s` } as React.CSSProperties
        }
      >
        {doubled.map((src, i) => (
          <div
            key={`${src}-${i}`}
            className={`relative mb-4 w-full overflow-hidden rounded-[5px] border border-fg/35 bg-surface ${
              CARD_SHAPES[(i % images.length) % CARD_SHAPES.length]
            }`}
          >
            <Image
              src={src}
              alt=""
              fill
              sizes="(min-width: 1200px) 17vw, 45vw"
              /* Top-anchored: these are full-page shots, and the top of a page
                 is the part worth recognising. */
              className="object-cover object-top"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Home hero: the pitch on the left, a drifting collage of shipped work on the
 * right. The collage runs to the container edge and is clipped top and bottom
 * by the section, so it reads as a window onto a larger wall of work.
 */
export default function Hero() {
  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden pt-[var(--header-h)]"
    >
      <div className="mx-auto grid w-full max-w-[var(--max-w)] grid-cols-1 items-center lg:grid-cols-2">
        {/* Pitch */}
        <div className="flex flex-col items-start px-[var(--gutter)] pb-14 pt-14 lg:py-24">
          <RevealText as="h1" className="heading-lg max-w-[22ch]" split="lines">
            {HERO.headline}
          </RevealText>

          <FadeIn delay={0.15} className="w-full">
            <p className="mt-6 max-w-[46ch] font-ui text-[16px] leading-[1.6] text-fg/70 lg:text-[18px]">
              {HERO.sub}
            </p>

            <div className="mt-9 flex flex-col items-start gap-5">
              <a
                href={CONTACT.href}
                target="_blank"
                rel="noreferrer"
                data-cursor="grow"
                className="pill rounded-[10px] px-7 py-4 text-[14px] tracking-[-0.01em]"
              >
                {HERO.cta}
              </a>

              <p className="font-ui text-[13px] leading-[1.5] text-muted">
                {HERO.proof}
              </p>
            </div>
          </FadeIn>
        </div>

        {/* Collage */}
        <div
          aria-hidden
          className="h-[420px] overflow-hidden pb-16 lg:h-[calc(100svh-var(--header-h))] lg:max-h-[900px] lg:min-h-[620px] lg:pb-0"
        >
          <div className="grid h-full grid-cols-2 gap-4 pl-[var(--gutter)] lg:grid-cols-3 lg:pl-0">
            {HERO.collage.map((images, i) => (
              <CollageColumn key={i} images={images} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
