import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { PROJECTS, type GalleryImage } from "@/lib/data";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return PROJECTS.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  return {
    title: project ? `${project.title} — Meet Khunt` : "Project",
    description: project?.description[0],
  };
}

function GalleryRow({ images }: { images: GalleryImage[] }) {
  const cols =
    images.length >= 3 ? "md:grid-cols-3" : images.length === 2 ? "md:grid-cols-2" : "";
  return (
    <div className={`grid grid-cols-1 items-start gap-6 ${cols}`}>
      {images.map((img) => (
        <Image
          key={img.src}
          src={img.src}
          alt={img.alt}
          width={img.width}
          height={img.height}
          sizes={images.length > 1 ? "(min-width: 768px) 50vw, 100vw" : "100vw"}
          className="h-auto w-full"
        />
      ))}
    </div>
  );
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const index = PROJECTS.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();
  const project = PROJECTS[index];
  const next = PROJECTS[(index + 1) % PROJECTS.length];

  /* Group the gallery into rows: full-width images stand alone,
     consecutive non-full images share a grid row. */
  const rows: GalleryImage[][] = [];
  for (const img of project.gallery) {
    const last = rows[rows.length - 1];
    if (!img.full && last && !last[0].full) last.push(img);
    else rows.push([img]);
  }

  return (
    <>
      <Header />
      <main className="flex w-full flex-col items-center overflow-hidden pt-20">
        {/* Case-study hero */}
        <section className="section-row flex flex-col gap-12 pt-[60px] lg:flex-row lg:gap-16">
          <div className="flex flex-[3] flex-col items-start gap-6">
            <p className="category">{project.tag}</p>
            <h1 className="heading-xl">{project.headline}</h1>
            {project.description.map((paragraph) => (
              <p
                key={paragraph.slice(0, 24)}
                className="label max-w-[640px] normal-case leading-[1.6] text-paper/80"
              >
                {paragraph}
              </p>
            ))}
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="pill mt-2 rounded-[50px]"
              data-cursor="grow"
            >
              Official website ↗
            </a>
          </div>

          <div className="flex flex-[2] gap-12 lg:justify-end lg:pt-24">
            <div className="flex flex-col gap-5">
              <p className="label">Services</p>
              <p className="label text-paper">
                {project.services.map((s) => (
                  <span key={s} className="block">
                    {s}
                  </span>
                ))}
              </p>
            </div>
            <div className="flex flex-col gap-5">
              <p className="label">Industries</p>
              <p className="label text-paper">
                {project.industries.map((i) => (
                  <span key={i} className="block">
                    {i}
                  </span>
                ))}
              </p>
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section className="section-row flex flex-col gap-6 pt-[80px]">
          {rows.map((row) => (
            <GalleryRow key={row[0].src} images={row} />
          ))}
        </section>

        {/* Next case study */}
        <section className="section-row flex flex-col items-center gap-8 pt-[120px]">
          <p className="label">Next case study</p>
          <Link
            href={`/projects/${next.slug}`}
            className="text-center"
            data-cursor="view"
          >
            <h3 className="heading-xl">{next.title}</h3>
          </Link>
          <Link href="/projects" className="pill rounded-[50px]" data-cursor="grow">
            back to all work
          </Link>
        </section>
        <Footer />
      </main>
    </>
  );
}
