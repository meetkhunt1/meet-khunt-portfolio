import { getPosts } from "@/lib/blog/posts";
import { CC_META, CC_PATH } from "@/lib/checkout-champ";
import {
  FOOTER,
  HERO,
  HIDDEN_PROFILES,
  INQUIRY,
  PROJECTS,
  SITE,
  UPCOMING_PROJECTS,
  WORK_CATEGORIES,
} from "@/lib/data";
import { D2C_META } from "@/lib/d2c";
import { SHOPIFY_PAGE } from "@/lib/services";
import { CRO_PAGE, LANDING_PAGE } from "@/lib/services-landing-cro";
import { AS_META, AS_PATH } from "@/lib/advertorial-system";
import { absoluteUrl } from "@/lib/schema";

/* Emitted once at build time as /llms.txt (static export). */
export const dynamic = "force-static";

/**
 * /llms.txt: a plain-language map of the site for AI assistants and
 * crawlers (llmstxt.org format). Generated from the same data as the pages,
 * so new articles and service pages appear here automatically.
 */
export async function GET() {
  const posts = (await getPosts()).filter((p) => !p.draft);
  const link = (label: string, path: string, note: string) =>
    `- [${label}](${absoluteUrl(path)}): ${note}`;

  const body = [
    "# Meet Khunt",
    "",
    `> ${SITE.description}`,
    "",
    "Meet Khunt is an ecommerce front-end developer working worldwide with DTC brands and agencies. " +
      "He builds Shopify stores and pages, landing pages and advertorials for paid traffic, and complete sales funnels in Checkout Champ and Funnelish. " +
      `${HERO.proof}.`,
    "",
    "## Services",
    link("Shopify development", SHOPIFY_PAGE.path, SHOPIFY_PAGE.meta.description),
    link("Checkout Champ development", CC_PATH, CC_META.description),
    link("Landing page development", LANDING_PAGE.path, LANDING_PAGE.meta.description),
    link("Conversion optimization", CRO_PAGE.path, CRO_PAGE.meta.description),
    link("Claude-based advertorial system", AS_PATH, AS_META.description),
    link("Landing pages and advertorials", "/d2c/", D2C_META.description),
    "",
    "## Work",
    link("All projects", "/projects/", "Ecommerce case studies."),
    ...Object.values(WORK_CATEGORIES).map((c) => link(c.title.replace(" | Meet Khunt", ""), `/projects/${c.slug}/`, c.description)),
    "",
    "## Projects",
    ...PROJECTS.map((p) => link(`${p.brand} (${p.category.toLowerCase().replace(" · ", ", ")})`, `/projects/${p.slug}/`, p.summary)),
    ...(UPCOMING_PROJECTS.length
      ? [`- Also built, case studies coming soon: ${UPCOMING_PROJECTS.map((p) => `${p.brand} (${p.category.toLowerCase().replace(" · ", ", ")})`).join("; ")}.`]
      : []),
    "",
    ...(posts.length
      ? ["## Articles", ...posts.map((p) => link(p.title, p.path, p.description)), ""]
      : []),
    "## Profiles",
    ...[...FOOTER.socials.filter((s) => s.href.includes("linkedin.com")).map((s) => ({ label: "LinkedIn", href: s.href })), ...HIDDEN_PROFILES].map((p) => `- [${p.label}](${p.href})`),
    "",
    "## Contact",
    link("Project inquiry form", INQUIRY.path, "The way to hire Meet: describe the project and he replies by email."),
    "",
  ].join("\n");

  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
