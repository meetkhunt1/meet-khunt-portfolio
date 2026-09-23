import type { Metadata } from "next";
import Footer from "@/components/layout/Footer";
import WorkIndex from "@/components/sections/WorkIndex";
import FixedBadge from "@/components/ui/FixedBadge";

export const metadata: Metadata = {
  title: "Work — Meet Khunt",
};

export default function ProjectsPage() {
  return (
    <>
      <main className="flex w-full flex-col items-center overflow-hidden pt-20">
        <WorkIndex />
        <Footer />
      </main>
      <FixedBadge />
    </>
  );
}
