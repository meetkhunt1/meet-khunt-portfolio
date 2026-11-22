import type { Metadata } from "next";
import Footer from "@/components/layout/Footer";
import WorkIndex from "@/components/sections/WorkIndex";
import { WORK_INDEX } from "@/lib/data";
import { workSchema } from "@/lib/work-schema";

export const metadata: Metadata = {
  title: WORK_INDEX.title,
  description: WORK_INDEX.description,
  alternates: { canonical: "/projects/" },
};

/** All projects. Each filter tab has its own page: see app/projects/[slug]. */
export default function ProjectsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: workSchema() }} />
      <main className="flex w-full flex-col items-center overflow-hidden pt-20">
        <WorkIndex />
        <Footer />
      </main>
    </>
  );
}
