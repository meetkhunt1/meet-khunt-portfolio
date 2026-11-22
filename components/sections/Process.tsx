import RevealText from "@/components/anim/RevealText";
import FadeIn from "@/components/anim/FadeIn";
import { PROCESS } from "@/lib/data";

type Stage = (typeof PROCESS.stages)[number];

/**
 * "How I work" as a horizontal stage timeline: numbered boxes joined by a
 * dashed rule, each dropping a dashed line to a dot on its stage card.
 *
 * Desktop shows all four stages in a row. Below that the row becomes a
 * horizontal swipe with snap points, so the timeline stays horizontal.
 */
export default function Process() {
  return (
    <section id="process" className="w-full pt-[100px] lg:pt-[160px]">
      <div className="section-row flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <RevealText as="h2" className="heading-lg" split="lines">
          {PROCESS.heading}
        </RevealText>
        <FadeIn delay={0.1}>
          <p className="max-w-[46ch] font-ui text-[16px] leading-[1.6] text-muted lg:text-right lg:text-[18px]">
            {PROCESS.sub}
          </p>
        </FadeIn>
      </div>

      <div className="section-row mt-12 lg:mt-16">
        <ol className="-mx-[var(--gutter)] flex snap-x snap-mandatory gap-5 overflow-x-auto px-[var(--gutter)] pb-4 [scrollbar-width:none] lg:mx-0 lg:grid lg:snap-none lg:grid-cols-4 lg:overflow-visible lg:px-0 lg:pb-0 [&::-webkit-scrollbar]:hidden">
          {PROCESS.stages.map((stage, i) => (
            <li key={stage.title} className="relative flex w-[300px] shrink-0 snap-start flex-col sm:w-[340px] lg:w-auto">
              <FadeIn delay={0.08 * i} className="flex h-full flex-col">
                <StageMarker index={i} last={i === PROCESS.stages.length - 1} />
                <StageCard stage={stage} index={i} />
              </FadeIn>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/**
 * The number box, centred over its card, a dashed rule across to the next
 * box (through the 20px gap), and a dashed drop to a dot on the card.
 */
function StageMarker({ index, last }: { index: number; last: boolean }) {
  return (
    <div aria-hidden className="relative flex h-[92px] flex-col items-center">
      {/* From this box's right edge (centre + 28px) to the next box's left
          edge: half a card, the 20px gap, half a card, minus the box. */}
      {!last && (
        <span className="absolute left-[calc(50%+28px)] right-[calc(-50%+8px)] top-[28px] border-t border-dashed border-white/25" />
      )}
      <span className="relative grid size-[56px] place-items-center rounded-[10px] border border-white/60 bg-bg font-ui text-[20px] font-semibold text-fg">
        {String(index + 1).padStart(2, "0")}
      </span>
      {/* Drop line to the card, ending in a dot on its edge */}
      <span className="w-0 flex-1 border-l border-dashed border-white/25" />
      <span className="-mb-[5px] size-[11px] rounded-full border-2 border-bg bg-accent shadow-[0_0_10px_rgba(238,33,36,0.8)]" />
    </div>
  );
}

function StageCard({ stage, index }: { stage: Stage; index: number }) {
  return (
    <div className="flex flex-1 flex-col rounded-[16px] border border-white/10 bg-gradient-to-b from-[#16161c] to-[#101014] p-6 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.9)] lg:p-7">
      <div className="flex flex-wrap items-center gap-3">
        <span className="inline-flex items-center gap-2 rounded-full border border-accent/35 bg-accent/10 py-1 pl-2.5 pr-1">
          <StageIcon icon={stage.icon} />
          <span className="rounded-full bg-fg px-2.5 py-0.5 font-ui text-[12px] font-semibold text-bg">
            Stage {index + 1}
          </span>
        </span>
        <h3 className="font-ui text-[17px] font-semibold leading-tight text-fg">{stage.title}</h3>
      </div>

      <p className="mt-4 font-ui text-[15px] leading-[1.55] text-muted">{stage.intro}</p>

      <ul className="mb-5 mt-4 flex flex-col gap-2.5">
        {stage.steps.map((step) => (
          <li key={step} className="flex gap-2.5 font-ui text-[14px] leading-[1.5] text-fg/85">
            <svg viewBox="0 0 10 10" aria-hidden className="mt-[6px] size-[8px] shrink-0 fill-muted">
              <path d="M2 1l6 4-6 4z" />
            </svg>
            {step}
          </li>
        ))}
      </ul>

      <p className="mt-auto flex gap-2.5 border-t border-white/[0.07] pt-4 font-ui text-[14px] font-medium leading-[1.5] text-fg">
        <svg viewBox="0 0 20 20" aria-hidden className="mt-[2px] size-[17px] shrink-0">
          <circle cx="10" cy="10" r="10" fill="#22c55e" />
          <path d="M6 10.5l2.6 2.6L14 7.6" fill="none" stroke="#0a0a0d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        {stage.outcome}
      </p>
    </div>
  );
}

function StageIcon({ icon }: { icon: Stage["icon"] }) {
  const paths: Record<Stage["icon"], string> = {
    /* Message */
    brief: "M4 5h16v11H9l-5 4z",
    /* Pen nib */
    design: "M12 3l7 7-7 11-7-11zM12 3v8M12 11a1.5 1.5 0 1 0 0 .01",
    /* Code */
    build: "M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16",
    /* Rising arrow */
    launch: "M4 17l6-6 4 4 6-7M14 8h6v6",
  };
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="#ff4a4d"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className="size-[15px]"
    >
      <path d={paths[icon]} />
    </svg>
  );
}
