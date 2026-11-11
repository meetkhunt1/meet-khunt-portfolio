import ListingPage, { listingMetadata } from "@/components/blog/ListingPage";

export const generateMetadata = () => listingMetadata(null, 1);

export default function BlogPage() {
  return <ListingPage categorySlug={null} page={1} />;
}
