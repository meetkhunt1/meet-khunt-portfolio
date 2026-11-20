import ServiceLanding, { serviceMetadata } from "@/components/sections/ServiceLanding";
import { SHOPIFY_PAGE } from "@/lib/services";

export const metadata = serviceMetadata(SHOPIFY_PAGE);

export default function ShopifyDeveloperPage() {
  return <ServiceLanding page={SHOPIFY_PAGE} />;
}
