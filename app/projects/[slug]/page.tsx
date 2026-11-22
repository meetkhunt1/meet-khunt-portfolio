import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Footer from "@/components/layout/Footer";
import WorkIndex from "@/components/sections/WorkIndex";
import CaseStudy from "@/components/sections/CaseStudy";
import {
  PROJECTS,
  WORK_CATEGORIES,
  workFilterBySlug,
} from "@/lib/data";

type Params = { slug: string };

export const dynamicParams = false;

/**
 * /projects/<slug>/ serves two kinds of page: a case study, or a filtered
 * work index (/projects/shopify/, /projects/landing-pages/, ...). A slug may
 * only mean one of them.
 */
export function generateStaticParams(): Params[] {
  const filterSlugs = Object.values(WORK_CATEGORIES).map((c) => c.slug);
  const clash = PROJECTS.find((p) => filterSlugs.includes(p.slug));
  if (clash) {
    throw new Error(
      `Project slug "${clash.slug}" collides with a /projects/ filter page. Rename one of them.`,
    );
  }
  return [...PROJECTS.map(({ slug }) => ({ slug })), ...filterSlugs.map((slug) => ({ slug }))];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const filter = workFilterBySlug(slug);
  if (filter) {
    const c = WORK_CATEGORIES[filter];
    return {
      title: { absolute: c.title },
      description: c.description,
      alternates: { canonical: `/projects/${c.slug}/` },
      openGraph: { title: c.title, description: c.description, url: `/projects/${c.slug}/` },
    };
  }
  const project = PROJECTS.find((p) => p.slug === slug);
  return {
    title: project ? `${project.title} - Meet Khunt` : "Project",
    description: project?.description[0],
    /* Case studies stay out of search results (and out of the sitemap);
       /projects/ and its filter pages are the indexed entry points. `follow`
       still lets crawlers pass through the page's links. */
    robots: { index: false, follow: true },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;

  const filter = workFilterBySlug(slug);
  if (filter) {
    return (
      <>
        <main className="flex w-full flex-col items-center overflow-hidden pt-20">
          <WorkIndex active={filter} />
          <Footer />
        </main>
      </>
    );
  }

  const index = PROJECTS.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();
  const project = PROJECTS[index];

  return (
    <>
      <main className="flex w-full flex-col items-center overflow-hidden pt-20">
        <CaseStudy project={project} />
        <Footer />
      </main>
    </>
  );
}
