import ServiceLanding, { serviceMetadata } from "@/components/sections/ServiceLanding";
import { LANDING_PAGE } from "@/lib/services-landing-cro";

export const metadata = serviceMetadata(LANDING_PAGE);

export default function LandingPageDeveloperPage() {
  return <ServiceLanding page={LANDING_PAGE} />;
}
