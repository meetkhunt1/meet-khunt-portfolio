import Image from "next/image";
import Link from "next/link";
import { caseStudyHref, type FunnelProject } from "@/lib/checkout-champ";

/**
 * Card for a funnel project: cover (screenshot, or the funnel's step map when
 * there is no screenshot yet), then title, description, technologies and
 * contributions. The CTA is a real link only when the case-study page exists;
 * otherwise a plain, non-interactive note is shown in its place.
 */
export default function FunnelProjectCard({
  project,
  ctaLabel,
  pendingLabel,
  headingLevel: Heading = "h3",
}: {
  project: FunnelProject;
  ctaLabel: string;
  pendingLabel: string;
  headingLevel?: "h2" | "h3";
}) {
  const href = caseStudyHref(project);

  return (
    <article className="flex h-full flex-col rounded-[14px] border border-line bg-bg p-5 lg:p-7">
      {/* Cover */}
      {/* A screenshot needs a fixed frame; the step map sizes to its content
          on phones, where the pills wrap onto more lines. */}
      <div
        className={`relative w-full overflow-hidden rounded-[10px] border border-fg/20 bg-surface ${
          !project.image && project.funnelSteps?.length
            ? "min-h-[200px] md:aspect-[16/10] md:min-h-0"
            : "aspect-[16/10]"
        }`}
      >
        {project.image ? (
          <Image
            src={project.image.src}
            alt={project.image.alt}
            fill
            sizes="(min-width: 810px) 45vw, 100vw"
            className="object-cover object-top"
          />
        ) : project.funnelSteps?.length ? (
          <div className="flex h-full flex-col justify-center gap-4 p-5 lg:p-8">
            <p className="category">Funnel flow</p>
            <ol
              aria-label={`${project.title} funnel steps`}
              className="flex flex-wrap items-center gap-x-2 gap-y-2.5"
            >
              {project.funnelSteps.map((step, i) => (
                <li key={step} className="flex items-center gap-2">
                  <span className="rounded-full border border-fg/25 bg-bg px-3 py-1.5 font-ui text-[12px] font-semibold tracking-[-0.01em] text-fg lg:text-[13px]">
                    {step}
                  </span>
                  {i < project.funnelSteps!.length - 1 && (
                    <span aria-hidden className="font-ui text-[13px] text-muted">
                      →
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </div>
        ) : (
          <div className="flex h-full items-center justify-center p-6">
            <p
              aria-hidden
              className="text-center font-sans text-[22px] font-medium leading-[1.1] tracking-[-0.02em] text-fg/40 lg:text-[28px]"
            >
              {project.title}
            </p>
          </div>
        )}
      </div>

      <p className="category mt-7">Checkout Champ</p>
      <Heading className="mt-2.5 font-sans text-[24px] font-medium leading-[1.1] tracking-[-0.02em] text-fg lg:text-[30px]">
        {project.title}
      </Heading>
      <p className="mt-3 font-ui text-[16px] leading-[1.6] text-fg/75">
        {project.description}
      </p>

      <div className="mt-7 grid grid-cols-1 gap-7 border-t border-line pt-6 sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
        <div>
          <p className="label">Technologies</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <li
                key={tech}
                className="rounded-[8px] border border-line px-2.5 py-1 font-ui text-[13px] text-fg"
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="label">My contributions</p>
          <ul className="mt-3 flex flex-col gap-1.5">
            {project.contributions.map((item) => (
              <li
                key={item}
                className="flex gap-2 font-ui text-[14px] leading-[1.5] text-fg/80"
              >
                <span aria-hidden className="text-muted">
                  —
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-auto pt-8">
        {href ? (
          <Link
            href={href}
            data-cursor="view"
            className="pill rounded-[50px]"
          >
            {ctaLabel}
          </Link>
        ) : (
          <p className="category">{pendingLabel}</p>
        )}
      </div>
    </article>
  );
}
