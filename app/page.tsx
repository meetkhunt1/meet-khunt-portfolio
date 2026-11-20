import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Works from "@/components/sections/Works";
import Services from "@/components/sections/Services";
import Tools from "@/components/sections/Tools";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import { SERVICES, SITE } from "@/lib/data";
import { CC_PATH } from "@/lib/checkout-champ";
import {
  PERSON_ID,
  SITE_URL,
  WEBSITE_ID,
  jsonLd,
  personSchema,
  websiteSchema,
} from "@/lib/schema";

/* Who Meet is and what he sells, for search engines and AI assistants. */
const structuredData = jsonLd([
  personSchema([
    "Shopify development",
    "Shopify Liquid",
    "Checkout Champ",
    "Funnelish",
    "Landing pages",
    "Advertorials",
    "Conversion rate optimization",
    "Figma to Shopify",
    "HTML",
    "CSS",
    "JavaScript",
  ]),
  websiteSchema(),
  {
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}/#service`,
    name: "Meet Khunt - Ecommerce Development",
    url: `${SITE_URL}/`,
    description: SITE.description,
    founder: { "@id": PERSON_ID },
    areaServed: "Worldwide",
    knowsLanguage: "en",
    makesOffer: [
      ...SERVICES.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.label, description: s.blurb },
      })),
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Checkout Champ Development",
          url: `${SITE_URL}${CC_PATH}`,
        },
      },
    ],
  },
  {
    "@type": "WebPage",
    "@id": `${SITE_URL}/#webpage`,
    url: `${SITE_URL}/`,
    name: SITE.title,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": PERSON_ID },
  },
]);

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: structuredData }} />
      <main className="flex w-full flex-col items-center overflow-hidden">
        <Hero />
        <Works />
        <Services />
        <Tools />
        <About />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
