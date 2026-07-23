import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Works from "@/components/sections/Works";
import FixedBadge from "@/components/ui/FixedBadge";

export const metadata: Metadata = {
  title: "Work — Meet Khunt",
};

export default function ProjectsPage() {
  return (
    <>
      <Header />
      <main className="flex w-full flex-col items-center overflow-hidden pt-20">
        <Works />
        <Footer />
      </main>
      <FixedBadge />
    </>
  );
}
