import Link from "next/link";
import FadeIn from "@/components/anim/FadeIn";
import RevealText from "@/components/anim/RevealText";
import Breadcrumbs, { type Crumb } from "@/components/content/Breadcrumbs";
import { BLOG, type Category } from "@/lib/blog/config";
import type { Listing } from "@/lib/blog/posts";
import CategoryNav from "./CategoryNav";
import FeaturedPost from "./FeaturedPost";
import Pagination from "./Pagination";
import PostCard from "./PostCard";

export type EmptyState = {
  title: string;
  text: string;
  links: { label: string; href: string }[];
};

/**
 * Shared layout for /blog/, its pages and every category page: header,
 * topic filter, featured article (page 1 of /blog/ only), grid, pagination.
 * Everything is read from article data — publishing an article never means
 * editing this component.
 */
export default function BlogListing({
  trail,
  eyebrow,
  heading,
  description,
  listing,
  categories,
  activeCategory,
  empty,
}: {
  trail: Crumb[];
  eyebrow: string;
  heading: string;
  description: string;
  listing: Listing;
  categories: Category[];
  activeCategory: string | null;
  empty: EmptyState;
}) {
  const { featured, posts, page, totalPages } = listing;
  const hasPosts = Boolean(featured) || posts.length > 0;

  return (
    <section className="section-row pt-[50px] lg:pt-[90px]">
      <Breadcrumbs trail={trail} />

      <p className="category mt-10 lg:mt-14">{eyebrow}</p>
      <RevealText as="h1" className="heading-lg mt-5 max-w-[22ch]" split="lines">
        {page > 1 ? `${heading} — Page ${page}` : heading}
      </RevealText>
      <FadeIn delay={0.15}>
        <p className="mt-6 max-w-[62ch] font-ui text-[16px] leading-[1.6] text-fg/70 lg:text-[18px]">
          {description}
        </p>
      </FadeIn>

      <div className="mt-12 lg:mt-[90px]">
        <CategoryNav categories={categories} active={activeCategory} />
      </div>

      {!hasPosts && (
        <div className="mt-12 rounded-[12px] border border-line bg-surface p-8 lg:mt-16 lg:p-12">
          <h2 className="title-sm">{empty.title}</h2>
          <p className="mt-4 max-w-[60ch] font-ui text-[16px] leading-[1.6] text-fg/70">
            {empty.text}
          </p>
          <ul className="mt-8 flex flex-wrap gap-3">
            {empty.links.map((link, i) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  data-cursor="grow"
                  className={`pill rounded-full ${i > 0 ? "pill-ghost" : ""}`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {featured && (
        <div className="mt-12 lg:mt-16">
          <FeaturedPost post={featured} label={BLOG.featuredLabel} />
        </div>
      )}

      {posts.length > 0 && (
        <div className="mt-16 lg:mt-24">
          {featured && <h2 className="label border-t border-line pt-8">{BLOG.latestLabel}</h2>}
          <ul className="mt-10 grid grid-cols-1 gap-x-10 gap-y-14 md:grid-cols-2 lg:grid-cols-3 lg:gap-x-14 lg:gap-y-20">
            {posts.map((post) => (
              <li key={post.slug}>
                <PostCard post={post} headingLevel={featured ? "h3" : "h2"} />
              </li>
            ))}
          </ul>
        </div>
      )}

      <Pagination category={activeCategory} page={page} totalPages={totalPages} />
    </section>
  );
}
