import Link from "next/link";
import FadeIn from "@/components/anim/FadeIn";
import RevealText from "@/components/anim/RevealText";
import Breadcrumbs, { type Crumb } from "@/components/content/Breadcrumbs";
import type { Category } from "@/lib/blog/config";
import type { Listing, Post } from "@/lib/blog/posts";
import BlogCtaCard from "./BlogCtaCard";
import CategoryNav from "./CategoryNav";
import Pagination from "./Pagination";
import PostCard from "./PostCard";

export type EmptyState = {
  title: string;
  text: string;
  links: { label: string; href: string }[];
};

type Slot = { kind: "card"; post: Post } | { kind: "cta" };

/**
 * Every article is a one-third-width card. The hire-me card takes the slot
 * after the fifth article (the end of the second row on desktop), once per
 * page. Until a page has five articles it is left out, so a short list
 * shows just the articles.
 */
function layout(posts: Post[]): Slot[] {
  const slots: Slot[] = [];
  posts.forEach((post, i) => {
    slots.push({ kind: "card", post });
    if (i === 4) slots.push({ kind: "cta" });
  });
  return slots;
}

/**
 * Shared layout for /blog/, its pages and every category page: centred
 * header, topic pills, then a three-column grid of article cards with a
 * hire-me card in it, and pagination. Everything is read from
 * article data; publishing an article never means editing this component.
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
  /* The featured article simply leads the grid on page 1. */
  const slots = layout(featured ? [featured, ...posts] : posts);

  return (
    <section className="section-row pt-[50px] lg:pt-[70px]">
      <Breadcrumbs trail={trail} />

      <header className="mx-auto mt-10 flex max-w-[760px] flex-col items-center text-center lg:mt-14">
        <p className="category">{eyebrow}</p>
        <RevealText as="h1" className="heading-lg mt-5" split="lines">
          {page > 1 ? `${heading} - Page ${page}` : heading}
        </RevealText>
        <FadeIn delay={0.15}>
          <p className="mt-6 max-w-[62ch] font-ui text-[16px] leading-[1.6] text-fg/70 lg:text-[18px]">
            {description}
          </p>
        </FadeIn>
      </header>

      <FadeIn delay={0.2} className="mt-10 lg:mt-14">
        <CategoryNav categories={categories} active={activeCategory} />
      </FadeIn>

      {!hasPosts && (
        <div className="mx-auto mt-12 max-w-[760px] rounded-[14px] border border-line bg-surface p-8 text-center lg:mt-16 lg:p-12">
          <h2 className="title-sm">{empty.title}</h2>
          <p className="mx-auto mt-4 max-w-[60ch] font-ui text-[16px] leading-[1.6] text-fg/70">
            {empty.text}
          </p>
          <ul className="mt-8 flex flex-wrap justify-center gap-3">
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

      {hasPosts && (
        <ul className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-8">
          {slots.map((slot, i) =>
            slot.kind === "cta" ? (
              <li key="cta">
                <BlogCtaCard />
              </li>
            ) : (
              <li key={slot.post.slug}>
                <FadeIn delay={(i % 3) * 0.08} className="h-full">
                  <PostCard post={slot.post} />
                </FadeIn>
              </li>
            ),
          )}
        </ul>
      )}

      <Pagination category={activeCategory} page={page} totalPages={totalPages} />
    </section>
  );
}
