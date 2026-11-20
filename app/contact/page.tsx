import type { Metadata } from "next";
import Footer from "@/components/layout/Footer";
import ContactForm from "@/components/sections/ContactForm";
import Breadcrumbs from "@/components/content/Breadcrumbs";
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

const TITLE = "Contact Meet Khunt - Hire a Shopify & Funnel Developer";
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

/** Project inquiry page: the destination of every "Work with me" button. */
export default function ContactPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: structuredData }} />
      <main className="flex w-full flex-col items-center overflow-hidden pt-20">
        <section className="section-row pt-[40px] lg:pt-[60px]">
          <div className="mx-auto w-full max-w-[1100px]">
            <Breadcrumbs trail={trail} />

            <div className="mt-10 grid grid-cols-1 gap-12 lg:mt-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
              <div>
                <p className="category">{INQUIRY.eyebrow}</p>
                <h1 className="mt-4 font-sans text-[34px] font-semibold leading-[1.1] tracking-[-0.025em] text-fg lg:text-[48px]">
                  {INQUIRY.heading}
                </h1>
                <p className="mt-5 max-w-[46ch] font-ui text-[16px] leading-[1.6] text-fg/70 lg:text-[18px]">
                  {INQUIRY.intro}
                </p>

                <ol className="mt-10 flex flex-col gap-6 border-t border-line pt-8">
                  {INQUIRY.steps.map((step, i) => (
                    <li key={step.title} className="flex gap-4">
                      <span className="grid size-8 shrink-0 place-items-center rounded-full bg-fg font-ui text-[13px] font-bold text-bg">
                        {i + 1}
                      </span>
                      <div>
                        <p className="font-ui text-[15px] font-semibold text-fg">{step.title}</p>
                        <p className="mt-1 font-ui text-[14px] leading-[1.6] text-fg/70">
                          {step.text}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="rounded-[14px] border border-line bg-bg p-6 shadow-[0_18px_50px_-30px_rgba(16,24,40,0.35)] lg:p-8">
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
}
