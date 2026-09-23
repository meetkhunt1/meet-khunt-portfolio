import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
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
        <figure key={img.src} className="flex flex-col gap-3">
          <Image
            src={img.src}
            alt={img.alt}
            width={img.width}
            height={img.height}
            sizes={images.length > 1 ? "(min-width: 768px) 50vw, 100vw" : "100vw"}
            /* Most shots are full-page screenshots that run to a white edge —
               without a frame they bleed into the page background. */
            className="h-auto w-full rounded-[10px] border border-fg/20"
          />
          {img.caption && <figcaption className="category">{img.caption}</figcaption>}
        </figure>
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
    if (!img.full && !img.newRow && last && !last[0].full) last.push(img);
    else rows.push([img]);
  }

  return (
    <>
      <main className="flex w-full flex-col items-center overflow-hidden pt-20">
        {/* Case-study hero */}
        <section className="section-row flex flex-col gap-12 pt-[60px] lg:flex-row lg:gap-16">
          <div className="flex flex-[3] flex-col items-start gap-6">
            <p className="category">{project.tag}</p>
            <h1 className="heading-md">{project.headline}</h1>
            {project.description.map((paragraph) => (
              <p
                key={paragraph.slice(0, 24)}
                className="label max-w-[640px] normal-case leading-[1.6] text-fg/80"
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

            {project.links && (
              <div className="mt-6 flex w-full max-w-[640px] flex-col">
                <p className="label pb-4">Live pages</p>
                {project.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="view"
                    className="group flex items-baseline justify-between gap-6 border-t border-line py-4 last:border-b"
                  >
                    <span className="label normal-case leading-[1.5] text-fg transition-colors group-hover:text-muted">
                      {link.label}
                    </span>
                    <span className="label shrink-0 text-fg/60 transition-transform duration-300 group-hover:translate-x-1">
                      ↗
                    </span>
                  </a>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-[2] gap-12 lg:justify-end lg:pt-24">
            <div className="flex flex-col gap-5">
              <p className="label">Services</p>
              <p className="label text-fg">
                {project.services.map((s) => (
                  <span key={s} className="block">
                    {s}
                  </span>
                ))}
              </p>
            </div>
            <div className="flex flex-col gap-5">
              <p className="label">Industries</p>
              <p className="label text-fg">
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
