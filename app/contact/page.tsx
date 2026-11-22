import type { Metadata } from "next";
import Image from "next/image";
import ContactForm from "@/components/sections/ContactForm";
import ImageReel from "@/components/sections/ImageReel";
import { INQUIRY } from "@/lib/data";
import {
  PERSON_ID,
  WEBSITE_ID,
  absoluteUrl,
  breadcrumbSchema,
  jsonLd,
  personSchema,
  websiteSchema,
} from "@/lib/schema";

const TITLE = "Contact Meet Khunt | Hire a Shopify & Funnel Developer";
const DESCRIPTION =
  "Send a project inquiry to Meet Khunt for Shopify development, Checkout Champ and Funnelish funnels, landing pages and advertorials for DTC brands.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: INQUIRY.path },
  openGraph: { title: TITLE, description: DESCRIPTION, url: INQUIRY.path },
};

const trail = [
  { label: "Home", href: "/" },
  { label: "Contact", href: INQUIRY.path },
];

const structuredData = jsonLd([
  personSchema(),
  websiteSchema(),
  {
    "@type": "ContactPage",
    "@id": `${absoluteUrl(INQUIRY.path)}#webpage`,
    url: absoluteUrl(INQUIRY.path),
    name: TITLE,
    description: DESCRIPTION,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": PERSON_ID },
  },
  breadcrumbSchema(trail),
]);

/**
 * Project inquiry page: the destination of every "Work with me" button.
 * A centered lead-capture layout: client proof, one headline, a single-column
 * form, then a photo reel that runs off the bottom of the page.
 */
export default function ContactPage() {
  const { proof } = INQUIRY;
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: structuredData }} />
      <main className="flex w-full flex-col items-center overflow-hidden pt-20">
        <section className="section-row">
          {/* First screen: sized so the top 10% of the photo reel peeks in
              under it (100svh minus the 80px header and 10% of the reel). */}
          <div className="flex min-h-[calc(100svh-80px-34px)] flex-col justify-center py-5 md:min-h-[calc(100svh-80px-42px)] lg:min-h-[calc(100svh-80px-48px)]">
          <div className="mx-auto flex w-full max-w-[920px] flex-col items-center text-center">
            {/* Client proof */}
            <div className="flex items-center gap-3">
              <div className="flex -space-x-3">
                {proof.avatars.map((src) => (
                  <span
                    key={src}
                    className="relative size-11 overflow-hidden rounded-full border-2 border-bg bg-surface"
                  >
                    <Image src={src} alt="" fill sizes="44px" className="object-cover" />
                  </span>
                ))}
              </div>
              <div className="text-left">
                <p className="font-ui text-[14px] font-semibold leading-tight text-fg">
                  {proof.title}
                </p>
                <p className="mt-0.5 font-ui text-[14px] leading-tight text-fg/65">
                  {proof.text}
                </p>
              </div>
            </div>

            <h1 className="mt-5 font-sans text-[34px] font-medium leading-[1.12] tracking-[-0.035em] text-balance text-fg md:text-[44px] lg:text-[52px]">
              {INQUIRY.heading}
            </h1>
            <p className="mt-4 max-w-[52ch] font-ui text-[16px] leading-[1.6] text-fg/65 lg:text-[17px]">
              {INQUIRY.intro}
            </p>
          </div>

          <div className="mx-auto mt-6 w-full max-w-[760px]">
            <ContactForm />
          </div>
          </div>

          {/* Photo reel: stacked images, one cut in per second. It is the last thing
              on the page and runs off the bottom edge, so the scroll ends here. */}
          <ImageReel
            images={INQUIRY.reel.images}
            grain={INQUIRY.reel.grain}
            className="mx-auto h-[340px] w-full max-w-[1180px] rounded-t-[16px] md:h-[420px] lg:h-[480px]"
          />
        </section>
      </main>
    </>
  );
}
