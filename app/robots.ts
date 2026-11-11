import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/schema";

/* Required for `output: "export"`: emitted once at build time as robots.txt. */
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
