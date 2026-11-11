import ListingPage, { listingMetadata } from "@/components/blog/ListingPage";
import { notFound } from "next/navigation";
import { EMPTY_PARAM, extraPages, getPosts } from "@/lib/blog/posts";

type Params = { page: string };

export const dynamicParams = false;

export async function generateStaticParams(): Promise<Params[]> {
  const pages = extraPages((await getPosts()).length, true).map((page) => ({ page }));
  return pages.length ? pages : [{ page: EMPTY_PARAM }];
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { page } = await params;
  if (page === EMPTY_PARAM) notFound();
  return listingMetadata(null, Number(page));
}

export default async function BlogPaginatedPage({ params }: { params: Promise<Params> }) {
  const { page } = await params;
  if (page === EMPTY_PARAM) notFound();
  return <ListingPage categorySlug={null} page={Number(page)} />;
}
