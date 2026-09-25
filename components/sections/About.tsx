import Link from "next/link";
import RevealText from "@/components/anim/RevealText";
import FadeIn from "@/components/anim/FadeIn";
import ParallaxImage from "@/components/anim/ParallaxImage";
import { ABOUT, CONTACT } from "@/lib/data";

/**
 * Intro, laid out to the reference proportions:
 *
 *   columns   36% / 64% with a 104px gutter at full width
 *   quote     46px serif on 1.26 leading, two lines
 *   bio       16px on 1.53 leading, capped at 490px
 *   actions   two full-round pills, solid then outlined
 *   figures   content-sized cards, not a stretched two-up grid
 *   portrait  fills the row, name card inset 25px / 30px from the bottom
 *
 * Both columns start and finish on the same line. That is enforced rather than
 * tuned: the portrait carries no aspect ratio of its own on desktop, so the row
 * height is set by the copy and the image stretches to meet it. Give the left
 * column a fixed ratio instead and the two ends drift apart the moment the copy
 * rewraps at a different width.
 *
 * The 36/64 split only applies once there is room for it — below 1536px the
 * left column widens to 42%, or the 46px quote has nowhere to sit.
 *
 * The services and client lists sit underneath. They are not in the reference,
 * but the header's Services dropdown links here, so this stays the place where
 * the offer is actually written out.
 */
export default function About() {
  return (
    <section id="about" className="section-row pt-[120px] lg:pt-[200px]">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,42fr)_minmax(0,58fr)] lg:gap-x-16 lg:gap-y-0 2xl:grid-cols-[minmax(0,36fr)_minmax(0,64fr)] 2xl:gap-x-[104px]">
        {/* Left: quote, bio, actions, figures */}
        <div className="flex flex-col items-start">
          <h2 className="font-serif text-[30px] leading-[1.26] tracking-[-0.01em] text-fg lg:text-[34px] xl:text-[38px] 2xl:text-[42px] min-[1700px]:text-[46px]">
            <RevealText as="span" split="lines" className="block">
              {`“${ABOUT.quote[0]}`}
            </RevealText>
            <RevealText as="span" split="lines" delay={0.1} className="block">
              {`${ABOUT.quote[1]}”`}
            </RevealText>
          </h2>

          <FadeIn className="w-full" delay={0.1}>
            <p className="mt-[34px] max-w-[490px] font-ui text-[16px] leading-[1.53] text-fg/75">
              {ABOUT.paragraph}
            </p>

            <div className="mt-[38px] flex flex-wrap items-center gap-4">
              <a
                href={CONTACT.href}
                target="_blank"
                rel="noreferrer"
                data-cursor="grow"
                className="pill h-12 rounded-full px-7 text-[15px] tracking-[-0.01em]"
              >
                {ABOUT.ctaPrimary}
              </a>
              <Link
                href="/projects/"
                data-cursor="grow"
                className="pill pill-ghost h-12 rounded-full px-7 text-[15px] tracking-[-0.01em]"
              >
                {ABOUT.ctaSecondary}
              </Link>
            </div>

            {/* Cards size to their own label, as in the reference — they are
                not two equal halves of a row. */}
            <dl className="mt-[40px] flex flex-wrap gap-4">
              {ABOUT.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-[10px] border border-line bg-surface px-[22px] py-5"
                >
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="m-0">
                    <span className="block font-sans text-[26px] font-bold leading-none tracking-[-0.02em] text-fg">
                      {stat.value}
                    </span>
                    <span className="mt-2.5 block whitespace-nowrap font-ui text-[15px] leading-none text-muted">
                      {stat.label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </FadeIn>
        </div>

        {/* Right: portrait with the name card floated over it. On desktop it
            has no ratio of its own — it stretches to whatever height the copy
            sets, which is what keeps the two columns level. */}
        <div className="relative aspect-[5/3] w-full lg:aspect-auto">
          {/* ParallaxImage pins its own root `position: relative` inline, so
              the absolute frame has to be this wrapper, not the component. */}
          <div className="absolute inset-0 overflow-hidden rounded-[12px]">
            <ParallaxImage
              src={ABOUT.portrait}
              alt={`${ABOUT.portraitName}, ${ABOUT.portraitRole}`}
              /* The source is portrait (825x1024) in a landscape frame, so it
                 is anchored high: the lower body is cropped, not the face. */
              className="h-full w-full [&_img]:object-[center_22%]"
              strength={6}
              sizes="(min-width: 1200px) 58vw, 100vw"
            />
          </div>

          {/* Frosted over a photograph, so the text answers to the image
              rather than to the theme — literal white, both modes. */}
          <div className="absolute inset-x-[25px] bottom-[30px] rounded-[10px] border border-white/15 bg-black/35 px-6 py-[18px] backdrop-blur-md">
            <p className="font-sans text-[20px] font-bold leading-tight tracking-[-0.01em] text-white">
              {ABOUT.portraitName}
            </p>
            <p className="mt-1.5 font-ui text-[15px] leading-none text-white/70">
              {ABOUT.portraitRole}
            </p>
          </div>
        </div>
      </div>

      {/* Services + clients */}
      <FadeIn className="mt-20 flex flex-wrap gap-x-[60px] gap-y-10 border-t border-line pt-12 lg:mt-28">
        <div className="flex flex-col gap-5">
          <p className="label">Services</p>
          <p className="label text-fg">
            {ABOUT.services.map((s) => (
              <span key={s} className="block">
                {s}
              </span>
            ))}
          </p>
        </div>
        <div className="flex flex-col gap-5">
          <p className="label">Clients</p>
          <p className="label text-fg">
            {ABOUT.clients.map((c) => (
              <span key={c} className="block">
                {c}
              </span>
            ))}
          </p>
        </div>
      </FadeIn>
    </section>
  );
}
