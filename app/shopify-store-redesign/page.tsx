import ServiceLanding, { serviceMetadata } from "@/components/sections/ServiceLanding";
import { STORE_REDESIGN_PAGE } from "@/lib/services-seo";

export const metadata = serviceMetadata(STORE_REDESIGN_PAGE);

export default function ShopifyStoreRedesignPage() {
  return <ServiceLanding page={STORE_REDESIGN_PAGE} />;
}
