import ServiceLanding, { serviceMetadata } from "@/components/sections/ServiceLanding";
import { WHITE_LABEL_PAGE } from "@/lib/services-seo";

export const metadata = serviceMetadata(WHITE_LABEL_PAGE);

export default function WhiteLabelShopifyDevelopmentPage() {
  return <ServiceLanding page={WHITE_LABEL_PAGE} />;
}
