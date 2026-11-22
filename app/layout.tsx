import type { Metadata } from "next";
import localFont from "next/font/local";
import { Instrument_Sans } from "next/font/google";
import "./globals.css";
import SiteChrome from "@/components/providers/SiteChrome";
import Header from "@/components/layout/Header";
import Analytics from "@/components/providers/Analytics";
import { PROJECTS, SITE } from "@/lib/data";
import { getPosts } from "@/lib/blog/posts";

/* Type is shared with sketfuture.com so the two sites read as one brand:
   Perfectly Nineties for display, Instrument Sans for everything else. */
const display = localFont({
  src: [
    { path: "./fonts/PerfectlyNineties-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/PerfectlyNineties-SemiBold.woff2", weight: "600", style: "normal" },
    { path: "./fonts/PerfectlyNineties-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-display",
  display: "swap",
});

/* Self-hosted at build time by next/font; visitors never request Google. */
const body = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://meetkhunt.com"),
  title: SITE.title,
  description: SITE.description,
  openGraph: {
    type: "website",
    title: SITE.title,
    description: SITE.description,
    images: [SITE.ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description: SITE.description,
    images: [SITE.ogImage],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  /* The header links to /blog/ only once there is something published to read. */
  const showBlog = (await getPosts()).some((p) => !p.draft);

  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable}`}
    >
      <body className="min-h-screen bg-bg text-fg antialiased">
        <SiteChrome>
          <Header showBlog={showBlog} caseStudySlugs={PROJECTS.map((p) => p.slug)} />
          {children}
        </SiteChrome>
        <div className="site-grain" aria-hidden />
        <Analytics />
      </body>
    </html>
  );
}
