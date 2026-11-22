import Link from "next/link";
import RevealText from "@/components/anim/RevealText";
import FadeIn from "@/components/anim/FadeIn";
import Accordion from "@/components/ui/Accordion";
import { CONTACT, HOME_FAQ } from "@/lib/data";

/**
 * Home-page FAQ: heading and a direct-contact link on the left, the answers
 * on the right. The same items are emitted as FAQPage data by app/page.tsx.
 */
export default function HomeFaq() {
  return (
    <section id="faq" className="section-row pt-[100px] lg:pt-[160px]">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <div>
          <RevealText as="h2" className="heading-lg max-w-[12ch]" split="lines">
            {HOME_FAQ.heading}
          </RevealText>
          <FadeIn delay={0.1}>
            <p className="mt-5 max-w-[38ch] font-ui text-[16px] leading-[1.6] text-muted lg:text-[18px]">
              {HOME_FAQ.sub}
            </p>
            <Link
              href={CONTACT.href}
              data-cursor="grow"
              className="pill mt-8 h-12 rounded-full px-7 text-[15px] tracking-[-0.01em]"
            >
              Ask me directly
            </Link>
          </FadeIn>
        </div>
        <FadeIn delay={0.1}>
          <Accordion items={HOME_FAQ.items} />
        </FadeIn>
      </div>
    </section>
  );
}
