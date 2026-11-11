/**
 * JSON-LD for blog pages. Reuses the shared Person/WebSite nodes from
 * lib/schema.ts by @id, so Meet is described once and referenced everywhere.
 */

import { BLOG, BLOG_PATH, type Category } from "@/lib/blog/config";
import type { Post } from "@/lib/blog/posts";
import {
  PERSON_ID,
  WEBSITE_ID,
  absoluteUrl,
  breadcrumbSchema,
  personSchema,
  websiteSchema,
} from "@/lib/schema";

export const BLOG_ID = `${absoluteUrl(BLOG_PATH)}#blog`;

const blogNode = () => ({
  "@type": "Blog",
  "@id": BLOG_ID,
  url: absoluteUrl(BLOG_PATH),
  name: BLOG.heading,
  description: BLOG.seoDescription,
  publisher: { "@id": PERSON_ID },
  isPartOf: { "@id": WEBSITE_ID },
  inLanguage: "en",
});

const postSummary = (p: Post) => ({
  "@type": "BlogPosting",
  "@id": `${absoluteUrl(p.path)}#article`,
  url: absoluteUrl(p.path),
  headline: p.title,
  ...(p.publishedAt ? { datePublished: p.publishedAt } : {}),
});

/** /blog/ and category pages: a CollectionPage listing what it shows. */
export function listingGraph({
  path,
  name,
  description,
  trail,
  posts,
  category,
}: {
  path: string;
  name: string;
  description: string;
  trail: { label: string; href: string }[];
  posts: Post[];
  category?: Category;
}) {
  const url = absoluteUrl(path);
  return [
    personSchema(),
    websiteSchema(),
    {
      ...blogNode(),
      ...(category ? {} : { blogPost: posts.filter((p) => !p.draft).map(postSummary) }),
    },
    {
      "@type": "CollectionPage",
      "@id": `${url}#webpage`,
      url,
      name,
      description,
      isPartOf: { "@id": WEBSITE_ID },
      about: category ? { "@type": "Thing", name: category.name } : { "@id": BLOG_ID },
      breadcrumb: { "@id": `${url}#breadcrumb` },
      inLanguage: "en",
      ...(posts.length
        ? {
            mainEntity: {
              "@type": "ItemList",
              itemListElement: posts.map((p, i) => ({
                "@type": "ListItem",
                position: i + 1,
                url: absoluteUrl(p.path),
                name: p.title,
              })),
            },
          }
        : {}),
    },
    { ...breadcrumbSchema(trail), "@id": `${url}#breadcrumb` },
  ];
}

/** An article: BlogPosting with author and publisher pointing at the Person. */
export function articleGraph(post: Post, trail: { label: string; href: string }[]) {
  const url = absoluteUrl(post.path);
  return [
    personSchema(),
    websiteSchema(),
    blogNode(),
    {
      "@type": "BlogPosting",
      "@id": `${url}#article`,
      headline: post.title,
      description: post.description,
      url,
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": url,
        breadcrumb: { "@id": `${url}#breadcrumb` },
      },
      author: { "@id": PERSON_ID },
      publisher: { "@id": PERSON_ID },
      isPartOf: { "@id": BLOG_ID },
      ...(post.publishedAt
        ? { datePublished: post.publishedAt, dateModified: post.updatedAt ?? post.publishedAt }
        : {}),
      ...(post.featuredImage
        ? {
            image: {
              "@type": "ImageObject",
              url: absoluteUrl(post.featuredImage.src),
              width: post.featuredImage.width,
              height: post.featuredImage.height,
            },
          }
        : {}),
      articleSection: post.category.name,
      ...(post.tags.length ? { keywords: post.tags } : {}),
      wordCount: post.wordCount,
      inLanguage: "en",
    },
    { ...breadcrumbSchema(trail), "@id": `${url}#breadcrumb` },
  ];
}
