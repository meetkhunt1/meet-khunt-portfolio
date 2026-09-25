import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Works from "@/components/sections/Works";
import Services from "@/components/sections/Services";
import Tools from "@/components/sections/Tools";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import FixedBadge from "@/components/ui/FixedBadge";

export default function Home() {
  return (
    <>
      <main className="flex w-full flex-col items-center overflow-hidden">
        <Hero />
        <Works />
        <Services />
        <Tools />
        <About />
        <Contact />
        <Footer />
      </main>
      <FixedBadge />
    </>
  );
}
