import RevealText from "@/components/anim/RevealText";
import FadeIn from "@/components/anim/FadeIn";
import ServiceWindow from "@/components/sections/ServiceWindow";
import { SERVICES_SECTION } from "@/lib/data";

/**
 * Home-page services as four macOS-style windows with working controls
 * (see ServiceWindow): close, minimise, and zoom into a detailed view.
 */
export default function Services() {
  return (
    <section id="services" className="section-row pt-[100px] lg:pt-[160px]">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <RevealText as="h2" className="heading-lg" split="lines">
          {SERVICES_SECTION.heading}
        </RevealText>
        <FadeIn delay={0.1}>
          <p className="max-w-[44ch] font-ui text-[16px] leading-[1.6] text-muted lg:text-right lg:text-[18px]">
            {SERVICES_SECTION.sub}
          </p>
        </FadeIn>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:mt-14 lg:grid-cols-4 lg:gap-5">
        {SERVICES_SECTION.cards.map((card, i) => (
          <FadeIn key={card.title} delay={0.06 * i}>
            <ServiceWindow card={card} index={i + 1} />
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
