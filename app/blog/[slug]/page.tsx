import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/components/layout/Footer";
import AuthorBox from "@/components/blog/AuthorBox";
import PostCard from "@/components/blog/PostCard";
import { CalendarIcon, ClockIcon, formatDate } from "@/components/blog/PostMeta";
import ServiceCtaBlock from "@/components/blog/ServiceCtaBlock";
import ShareLinks from "@/components/blog/ShareLinks";
import TableOfContents, { TocCard } from "@/components/blog/TableOfContents";
import TopicsCard from "@/components/blog/TopicsCard";
import Breadcrumbs from "@/components/content/Breadcrumbs";
import Prose from "@/components/content/Prose";
import { BLOG, BLOG_PATH, categoryPath } from "@/lib/blog/config";
import {
  EMPTY_PARAM,
  getPost,
  getPosts,
  getRelatedPosts,
  type Post,
} from "@/lib/blog/posts";
import { articleGraph } from "@/lib/blog/schema";
import { absoluteUrl, jsonLd } from "@/lib/schema";

type Params = { slug: string };

export const dynamicParams = false;

export async function generateStaticParams(): Promise<Params[]> {
  const slugs = (await getPosts()).map(({ slug }) => ({ slug }));
  return slugs.length ? slugs : [{ slug: EMPTY_PARAM }];
}

const trailFor = (post: Post) => [
  { label: "Home", href: "/" },
  { label: "Blog", href: BLOG_PATH },
  { label: post.category.name, href: categoryPath(post.category.slug) },
  { label: post.title, href: post.path },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};

  const title = post.seoTitle ?? `${post.title} | Meet Khunt`;
  const image = post.featuredImage
    ? {
        url: post.featuredImage.src,
        width: post.featuredImage.width,
        height: post.featuredImage.height,
        alt: post.featuredImage.alt,
      }
    : { url: BLOG.ogImage, width: 1200, height: 630, type: "image/png", alt: BLOG.ogImageAlt };

  return {
    title: { absolute: title },
    description: post.description,
    alternates: { canonical: post.path },
    /* Drafts only render in a local preview build; never let one be indexed. */
    robots: post.draft ? { index: false, follow: false } : { index: true, follow: true },
    authors: [{ name: post.author.name, url: absoluteUrl(post.author.href) }],
    openGraph: {
      type: "article",
      url: post.path,
      siteName: "Meet Khunt",
      locale: "en_US",
      title,
      description: post.description,
      images: [image],
      ...(post.publishedAt ? { publishedTime: post.publishedAt } : {}),
      ...(post.publishedAt ? { modifiedTime: post.updatedAt ?? post.publishedAt } : {}),
      authors: [absoluteUrl(post.author.href)],
      section: post.category.name,
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: post.description,
      images: [image.url],
    },
  };
}

export default async function ArticlePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const trail = trailFor(post);
  const related = await getRelatedPosts(post);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(articleGraph(post, trail)) }}
      />

      <main className="flex w-full flex-col items-center overflow-hidden pt-20">
        {post.draft && (
          <p
            role="status"
            className="section-row bg-accent py-3 text-center font-ui text-[13px] font-semibold text-fg"
          >
            Draft preview - not published, not indexed, not in the sitemap.
          </p>
        )}

        {/* Article column + sidebar. The sidebar follows the article on
            phones (its table of contents is replaced by a disclosure above
            the body there). */}
        <div className="section-row pt-[40px] lg:pt-[60px]">
          <div className="mx-auto w-full max-w-[1200px]">
            <Breadcrumbs trail={trail} />

            <div className="mt-8 grid grid-cols-1 gap-12 lg:mt-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-12 xl:grid-cols-[minmax(0,1fr)_360px] xl:gap-20">
              <article className="min-w-0">
                {/* Header ---------------------------------------------- */}
                <header>
                  <Link
                    href={categoryPath(post.category.slug)}
                    data-cursor="grow"
                    className="category transition-colors duration-200 hover:text-fg"
                  >
                    {post.category.name}
                  </Link>
                  <h1 className="mt-3 font-sans text-[30px] font-semibold leading-[1.15] tracking-[-0.025em] text-fg lg:text-[40px]">
                    {post.title}
                  </h1>

                  <div className="mt-7 flex flex-wrap items-center justify-between gap-x-8 gap-y-4">
                    <div className="flex items-center gap-3">
                      <Image
                        src={post.author.image}
                        alt=""
                        width={48}
                        height={48}
                        className="size-12 shrink-0 rounded-full border border-line object-cover"
                      />
                      <div>
                        <Link
                          href={post.author.href}
                          rel="author"
                          data-cursor="grow"
                          className="font-ui text-[14px] font-semibold text-fg transition-colors hover:text-muted"
                        >
                          {post.author.name}
                        </Link>
                        <p className="font-ui text-[12px] text-muted">{post.author.role}</p>
                      </div>
                    </div>

                    <dl className="flex flex-col items-start gap-1 font-ui text-[12px] text-muted sm:items-end">
                      <div className="flex items-center gap-1.5">
                        <dt className="sr-only">Published</dt>
                        <dd>
                          {post.publishedAt ? (
                            <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                          ) : (
                            "Not yet published"
                          )}
                        </dd>
                        <CalendarIcon />
                      </div>
                      {post.updatedAt && post.updatedAt !== post.publishedAt && (
                        <div className="flex items-center gap-1.5">
                          <dt>Updated</dt>
                          <dd>
                            <time dateTime={post.updatedAt}>{formatDate(post.updatedAt)}</time>
                          </dd>
                          <CalendarIcon />
                        </div>
                      )}
                      <div className="flex items-center gap-1.5">
                        <dt className="sr-only">Reading time</dt>
                        <dd>{post.readingMinutes} min read</dd>
                        <ClockIcon />
                      </div>
                    </dl>
                  </div>

                  {post.featuredImage && (
                    <Image
                      src={post.featuredImage.src}
                      alt={post.featuredImage.alt}
                      width={post.featuredImage.width}
                      height={post.featuredImage.height}
                      priority
                      sizes="(min-width: 1200px) 780px, 100vw"
                      className="mt-8 h-auto w-full rounded-[14px] border border-line"
                    />
                  )}
                </header>

                {/* Body ------------------------------------------------ */}
                <div className="mt-10 lg:hidden">
                  <TableOfContents toc={post.toc} />
                </div>

                <div className="mt-10 lg:mt-12">
                  <Prose html={post.html} />
                </div>

                {post.tags.length > 0 && (
                  <div className="mt-14 border-t border-line pt-6">
                    <p className="label">Topics</p>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <li
                          key={tag}
                          className="rounded-[8px] border border-line px-2.5 py-1 font-ui text-[13px] text-fg"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="mt-12">
                  <AuthorBox author={post.author} />
                </div>
              </article>

              {/* Sidebar ----------------------------------------------- */}
              <aside className="flex flex-col gap-6" aria-label="Article sidebar">
                <TocCard
                  toc={post.toc}
                  actions={<ShareLinks url={absoluteUrl(post.path)} title={post.title} />}
                />
                <TopicsCard active={post.category.slug} />
                {post.cta && (
                  <div className="lg:sticky lg:top-[calc(var(--header-h)+24px)]">
                    <ServiceCtaBlock cta={post.cta} />
                  </div>
                )}
              </aside>
            </div>
          </div>
        </div>

        {/* Related ------------------------------------------------------- */}
        {related.length > 0 && (
          <section aria-labelledby="related-heading" className="section-row pt-[100px] lg:pt-[140px]">
            <h2 id="related-heading" className="heading-md text-center">
              <span className="bg-[linear-gradient(transparent_62%,var(--color-accent)_62%)] px-1">
                Related Content You Might Like
              </span>
            </h2>
            <ul className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-8">
              {related.map((p) => (
                <li key={p.slug}>
                  <PostCard post={p} headingLevel="h3" />
                </li>
              ))}
            </ul>
          </section>
        )}

        <Footer />
      </main>
    </>
  );
}
