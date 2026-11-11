import { notFound } from "next/navigation";
import ListingPage, { listingMetadata } from "@/components/blog/ListingPage";
import { CATEGORIES } from "@/lib/blog/config";
import { extraPages, getPostsInCategory } from "@/lib/blog/posts";

/**
 * /blog/category/<slug>/ and /blog/category/<slug>/page/<n>/ in one route.
 * One optional catch-all (rather than a separate /page/[page] folder) means
 * there is always at least one param per category, which `output: "export"`
 * requires even before a category has enough articles to paginate.
 */
type Params = { category: string; page?: string[] };

export const dynamicParams = false;

export async function generateStaticParams(): Promise<Params[]> {
  const params: Params[] = [];
  for (const c of CATEGORIES) {
    params.push({ category: c.slug, page: [] });
    const count = (await getPostsInCategory(c.slug)).length;
    for (const n of extraPages(count, false)) params.push({ category: c.slug, page: ["page", n] });
  }
  return params;
}

/** [] -> 1, ["page", "3"] -> 3; anything else is not a listing URL. */
function pageNumber(segments: string[] = []) {
  if (segments.length === 0) return 1;
  /* Page 1 lives at the base URL, so /page/1/ (and /page/01/) aren't valid. */
  const [prefix, n] = segments;
  if (segments.length === 2 && prefix === "page" && /^[1-9]\d*$/.test(n) && n !== "1") {
    return Number(n);
  }
  notFound();
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { category, page } = await params;
  return listingMetadata(category, pageNumber(page));
}

export default async function CategoryPage({ params }: { params: Promise<Params> }) {
  const { category, page } = await params;
  return <ListingPage categorySlug={category} page={pageNumber(page)} />;
}
