import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Footer from "@/components/layout/Footer";
import FixedBadge from "@/components/ui/FixedBadge";
import BlogListing, { type EmptyState } from "@/components/blog/BlogListing";
import { CC_PATH } from "@/lib/checkout-champ";
import {
  BLOG,
  BLOG_PATH,
  categoryBySlug,
  categoryPath,
  listingPath,
} from "@/lib/blog/config";
import {
  getActiveCategories,
  getPosts,
  getPostsInCategory,
  isListingIndexable,
  paginate,
} from "@/lib/blog/posts";
import { listingGraph } from "@/lib/blog/schema";
import { jsonLd } from "@/lib/schema";

/**
 * Data, metadata and markup for every listing URL:
 *   /blog/, /blog/page/N/, /blog/category/X/, /blog/category/X/page/N/
 * The route files are one-liners that call into here.
 */

async function resolve(categorySlug: string | null, page: number) {
  const category = categorySlug ? categoryBySlug(categorySlug) : null;
  if (categorySlug && !category) notFound();
  const all = category ? await getPostsInCategory(category.slug) : await getPosts();
  const listing = paginate(all, page, !category);
  if (page > listing.totalPages || !Number.isInteger(page) || page < 1) notFound();
  return { category, all, listing };
}

export async function listingMetadata(
  categorySlug: string | null,
  page: number,
): Promise<Metadata> {
  const { category } = await resolve(categorySlug, page);
  const indexable = await isListingIndexable(categorySlug);
  const baseTitle = category ? category.seoTitle : BLOG.seoTitle;
  const title = page > 1 ? baseTitle.replace(" | ", ` — Page ${page} | `) : baseTitle;
  const description = category ? category.seoDescription : BLOG.seoDescription;
  const path = listingPath(categorySlug, page);

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    robots: indexable ? { index: true, follow: true } : { index: false, follow: true },
    openGraph: {
      type: "website",
      url: path,
      siteName: "Meet Khunt",
      locale: "en_US",
      title,
      description,
      images: [
        { url: BLOG.ogImage, width: 1200, height: 630, type: "image/png", alt: BLOG.ogImageAlt },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [BLOG.ogImage],
    },
  };
}

export default async function ListingPage({
  categorySlug,
  page,
}: {
  categorySlug: string | null;
  page: number;
}) {
  const { category, listing } = await resolve(categorySlug, page);
  const categories = await getActiveCategories();
  const blogHasPosts = (await getPosts()).length > 0;

  const trail = [
    { label: "Home", href: "/" },
    { label: "Blog", href: BLOG_PATH },
    ...(category ? [{ label: category.name, href: categoryPath(category.slug) }] : []),
    ...(page > 1 ? [{ label: `Page ${page}`, href: listingPath(categorySlug, page) }] : []),
  ];

  const empty: EmptyState = category
    ? {
        title: `No ${category.name} articles yet`,
        text: blogHasPosts
          ? "Nothing has been published in this topic yet. Browse the other articles in the meantime."
          : "Nothing has been published in this topic yet. In the meantime, have a look at the services and shipped work.",
        links: blogHasPosts
          ? [{ label: "All articles", href: BLOG_PATH }]
          : [
              { label: "Checkout Champ development", href: CC_PATH },
              { label: "Case studies", href: "/projects/" },
            ],
      }
    : {
        title: "The first articles are on the way",
        text: "Guides and tutorials on Checkout Champ, Shopify and eCommerce development will be published here. Until then, the service pages and case studies show the work itself.",
        links: [
          { label: "Checkout Champ development", href: CC_PATH },
          { label: "Case studies", href: "/projects/" },
        ],
      };

  const shown = [...(listing.featured ? [listing.featured] : []), ...listing.posts];
  const path = listingPath(categorySlug, page);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            listingGraph({
              path,
              name: category ? category.heading : BLOG.heading,
              description: category ? category.description : BLOG.description,
              trail,
              posts: shown,
              category: category ?? undefined,
            }),
          ),
        }}
      />
      <main className="flex w-full flex-col items-center overflow-hidden pt-20">
        <BlogListing
          trail={trail}
          eyebrow={category ? "Blog" : BLOG.eyebrow}
          heading={category ? category.heading : BLOG.heading}
          description={category ? category.description : BLOG.description}
          listing={listing}
          categories={categories}
          activeCategory={categorySlug}
          empty={empty}
        />
        <Footer />
      </main>
      <FixedBadge />
    </>
  );
}
