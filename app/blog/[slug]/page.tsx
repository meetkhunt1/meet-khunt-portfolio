import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/components/layout/Footer";
import AuthorBox from "@/components/blog/AuthorBox";
import PostCard from "@/components/blog/PostCard";
import { formatDate } from "@/components/blog/PostMeta";
import ServiceCtaBlock from "@/components/blog/ServiceCtaBlock";
import TableOfContents from "@/components/blog/TableOfContents";
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
  const hasToc = post.toc.length >= 2;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(articleGraph(post, trail)) }}
      />

      <main className="flex w-full flex-col items-center overflow-hidden pt-20">
        <article className="w-full">
          {post.draft && (
            <p
              role="status"
              className="section-row bg-accent py-3 text-center font-ui text-[13px] font-semibold text-fg"
            >
              Draft preview — not published, not indexed, not in the sitemap.
            </p>
          )}

          {/* Header ------------------------------------------------------ */}
          <header className="section-row pt-[50px] lg:pt-[90px]">
            <Breadcrumbs trail={trail} />

            <div className="mt-10 max-w-[900px] lg:mt-14">
              <Link
                href={categoryPath(post.category.slug)}
                data-cursor="grow"
                className="category transition-colors duration-200 hover:text-fg"
              >
                {post.category.name}
              </Link>
              <h1 className="heading-md mt-4">{post.title}</h1>
              <p className="mt-6 max-w-[68ch] font-ui text-[17px] leading-[1.6] text-fg/75 lg:text-[19px]">
                {post.excerpt}
              </p>

              <dl className="mt-8 flex flex-wrap gap-x-8 gap-y-4 border-t border-line pt-6 font-ui text-[14px]">
                <div>
                  <dt className="category">Author</dt>
                  <dd className="mt-1.5 text-fg">
                    <Link
                      href={post.author.href}
                      rel="author"
                      data-cursor="grow"
                      className="underline decoration-fg/30 underline-offset-4 transition-colors hover:text-muted"
                    >
                      {post.author.name}
                    </Link>
                  </dd>
                </div>
                <div>
                  <dt className="category">Published</dt>
                  <dd className="mt-1.5 text-fg">
                    {post.publishedAt ? (
                      <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                    ) : (
                      "Not yet published"
                    )}
                  </dd>
                </div>
                {post.updatedAt && post.updatedAt !== post.publishedAt && (
                  <div>
                    <dt className="category">Updated</dt>
                    <dd className="mt-1.5 text-fg">
                      <time dateTime={post.updatedAt}>{formatDate(post.updatedAt)}</time>
                    </dd>
                  </div>
                )}
                <div>
                  <dt className="category">Reading time</dt>
                  <dd className="mt-1.5 text-fg">{post.readingMinutes} min read</dd>
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
                sizes="(min-width: 1800px) 1704px, 100vw"
                className="mt-12 h-auto w-full rounded-[14px] border border-fg/20 lg:mt-16"
              />
            )}
          </header>

          {/* Body -------------------------------------------------------- */}
          <div
            className={`section-row mt-12 grid grid-cols-1 gap-10 lg:mt-20 ${
              hasToc ? "lg:grid-cols-[minmax(0,260px)_minmax(0,760px)] lg:gap-16 xl:gap-24" : ""
            }`}
          >
            {hasToc && (
              <aside className="lg:row-span-2">
                <TableOfContents toc={post.toc} />
              </aside>
            )}

            <div className="min-w-0 max-w-[760px]">
              <Prose html={post.html} />

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

              {post.cta && (
                <div className="mt-12">
                  <ServiceCtaBlock cta={post.cta} />
                </div>
              )}

              <div className="mt-8">
                <AuthorBox author={post.author} />
              </div>
            </div>
          </div>
        </article>

        {/* Related ------------------------------------------------------- */}
        {related.length > 0 && (
          <section aria-labelledby="related-heading" className="section-row pt-[100px] lg:pt-[140px]">
            <h2 id="related-heading" className="heading-md">
              Related articles
            </h2>
            <ul className="mt-10 grid grid-cols-1 gap-x-10 gap-y-14 md:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-x-14">
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
