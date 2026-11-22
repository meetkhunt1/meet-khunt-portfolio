import ServiceLanding, { serviceMetadata } from "@/components/sections/ServiceLanding";
import { CRO_PAGE } from "@/lib/services-landing-cro";

export const metadata = serviceMetadata(CRO_PAGE);

export default function ConversionOptimizationPage() {
  return <ServiceLanding page={CRO_PAGE} />;
}
