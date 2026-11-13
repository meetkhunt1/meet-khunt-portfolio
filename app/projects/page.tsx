import type { Metadata } from "next";
import Footer from "@/components/layout/Footer";
import WorkIndex from "@/components/sections/WorkIndex";
import FixedBadge from "@/components/ui/FixedBadge";
import { WORK_INDEX } from "@/lib/data";

export const metadata: Metadata = {
  title: WORK_INDEX.title,
  description: WORK_INDEX.description,
  alternates: { canonical: "/projects/" },
};

/** All projects. Each filter tab has its own page: see app/projects/[slug]. */
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
