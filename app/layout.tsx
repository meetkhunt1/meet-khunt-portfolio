import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import SiteChrome from "@/components/providers/SiteChrome";
import Header from "@/components/layout/Header";
import { SITE } from "@/lib/data";
import { getPosts } from "@/lib/blog/posts";

const switzer = localFont({
  src: [
    { path: "./fonts/Switzer-Medium.woff2", weight: "500", style: "normal" },
    { path: "./fonts/Switzer-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-switzer",
  display: "swap",
});

const inter = localFont({
  src: [
    { path: "./fonts/Inter-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/Inter-SemiBold.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-inter",
  display: "swap",
});

/* Display serif, shared with sketfuture.com so the two sites read as one
   brand. Used for the About pull quote. */
const perfectlyNineties = localFont({
  src: [
    {
      path: "./fonts/PerfectlyNineties-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/PerfectlyNineties-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-perfectly-nineties",
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
      className={`${switzer.variable} ${inter.variable} ${perfectlyNineties.variable}`}
    >
      <body className="min-h-screen bg-bg text-fg antialiased">
        <SiteChrome>
          <Header showBlog={showBlog} />
          {children}
        </SiteChrome>
      </body>
    </html>
  );
}
