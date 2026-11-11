/**
 * Article loading, validation and querying. Server-only (reads the
 * filesystem); runs during `next build`, so every check here is a build
 * check — a bad article fails the build instead of publishing broken.
 *
 * Articles are Markdown files in content/blog/<slug>.md with YAML
 * frontmatter. See content/blog/README.md for the format.
 */

import fs from "node:fs";
import path from "node:path";
import YAML from "yaml";
import { SITE_ROUTES } from "@/lib/routes";
import {
  BLOG_PATH,
  CATEGORIES,
  PAGE_SIZE,
  RESERVED_SLUGS,
  SERVICE_CTAS,
  authorByRef,
  categoryBySlug,
  categoryPath,
  listingPath,
  postPath,
  type Author,
  type Category,
  type ServiceCta,
  type ServiceCtaKey,
} from "@/lib/blog/config";
import {
  localImageSize,
  renderMarkdown,
  type TocEntry,
} from "@/lib/blog/markdown";

const CONTENT_DIR = path.join(process.cwd(), "content", "blog");

/**
 * Local preview of drafts: `BLOG_DRAFTS=1 npm run dev` (or build). Drafts are
 * then rendered with a banner and `noindex`, and are still never put in the
 * sitemap. Production builds leave this unset.
 */
export const INCLUDE_DRAFTS = process.env.BLOG_DRAFTS === "1";

export type Post = {
  slug: string;
  path: string;
  title: string;
  /** <title> override; defaults to "<title> | Meet Khunt" */
  seoTitle?: string;
  description: string;
  /** Card text; defaults to the description */
  excerpt: string;
  category: Category;
  tags: string[];
  author: Author;
  /** YYYY-MM-DD. Absent only on unpublished drafts. */
  publishedAt?: string;
  updatedAt?: string;
  featuredImage?: { src: string; alt: string; width: number; height: number };
  featured: boolean;
  draft: boolean;
  cta: ServiceCta | null;
  relatedSlugs: string[];
  html: string;
  toc: TocEntry[];
  wordCount: number;
  readingMinutes: number;
};

/* ------------------------------------------------------------ validation */

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

const KNOWN_FIELDS = new Set([
  "title",
  "seoTitle",
  "slug",
  "description",
  "excerpt",
  "category",
  "tags",
  "author",
  "publishedAt",
  "updatedAt",
  "featuredImage",
  "featuredImageAlt",
  "featured",
  "draft",
  "cta",
  "related",
]);

/** YAML may hand back a Date for an unquoted date; normalise to YYYY-MM-DD. */
function toDateString(value: unknown): string | undefined {
  if (value === undefined || value === null || value === "") return undefined;
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return String(value);
}

function isRealDate(value: string) {
  if (!DATE_RE.test(value)) return false;
  const d = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === value;
}

const today = () => new Date().toISOString().slice(0, 10);

type Raw = { file: string; data: Record<string, unknown>; body: string };

function readRawPosts(): Raw[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".md") && !f.startsWith("_") && f !== "README.md")
    .sort()
    .map((file) => {
      const source = fs.readFileSync(path.join(CONTENT_DIR, file), "utf8");
      const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
      const data = match ? (YAML.parse(match[1]) ?? {}) : {};
      return { file, data, body: match ? source.slice(match[0].length) : source };
    });
}

/** A post plus the internal links it uses, checked once all posts are known. */
type Built = { post: Post; internalLinks: string[] };

async function buildPost(raw: Raw, errors: string[]): Promise<Built | null> {
  const { file, data, body } = raw;
  const fail = (msg: string) => errors.push(`content/blog/${file}: ${msg}`);
  const startErrors = errors.length;

  for (const key of Object.keys(data)) {
    if (!KNOWN_FIELDS.has(key)) fail(`unknown frontmatter field "${key}".`);
  }

  const str = (key: string, required = true) => {
    const v = data[key];
    if (v === undefined || v === null || v === "") {
      if (required) fail(`"${key}" is required.`);
      return undefined;
    }
    if (typeof v !== "string") {
      fail(`"${key}" must be text.`);
      return undefined;
    }
    return v.trim();
  };

  const title = str("title");
  const slug = str("slug");
  const description = str("description");
  const excerpt = str("excerpt", false);
  const seoTitle = str("seoTitle", false);
  const draft = data.draft === true;
  const featured = data.featured === true;

  for (const key of ["draft", "featured"]) {
    if (data[key] !== undefined && typeof data[key] !== "boolean") {
      fail(`"${key}" must be true or false.`);
    }
  }

  if (slug) {
    if (!SLUG_RE.test(slug)) {
      fail(`slug "${slug}" must be lowercase letters, numbers and single hyphens.`);
    }
    if (`${slug}.md` !== file) fail(`slug "${slug}" must match the file name.`);
    if (RESERVED_SLUGS.includes(slug)) fail(`slug "${slug}" is reserved.`);
  }

  const categoryRef = str("category");
  const category = categoryRef ? categoryBySlug(categoryRef) : undefined;
  if (categoryRef && !category) {
    fail(
      `category "${categoryRef}" doesn't exist. Use one of: ${CATEGORIES.map((c) => c.slug).join(", ")}.`,
    );
  }

  const authorRef = str("author");
  const author = authorRef ? authorByRef(authorRef) : undefined;
  if (authorRef && !author) fail(`author "${authorRef}" isn't in AUTHORS.`);

  let tags: string[] = [];
  if (data.tags !== undefined) {
    if (!Array.isArray(data.tags) || data.tags.some((t) => typeof t !== "string")) {
      fail(`"tags" must be a list of text values.`);
    } else {
      tags = [...new Set((data.tags as string[]).map((t) => t.trim()).filter(Boolean))];
    }
  }

  const publishedAt = toDateString(data.publishedAt);
  const updatedAt = toDateString(data.updatedAt);
  if (!draft && !publishedAt) fail(`"publishedAt" is required unless the article is a draft.`);
  for (const [key, value] of [
    ["publishedAt", publishedAt],
    ["updatedAt", updatedAt],
  ] as const) {
    if (!value) continue;
    if (!isRealDate(value)) fail(`"${key}" must be a real date in YYYY-MM-DD form.`);
    else if (value > today()) fail(`"${key}" (${value}) is in the future.`);
  }
  if (updatedAt && !publishedAt) fail(`"updatedAt" needs a "publishedAt".`);
  if (updatedAt && publishedAt && updatedAt < publishedAt) {
    fail(`"updatedAt" is earlier than "publishedAt".`);
  }

  let featuredImage: Post["featuredImage"];
  const imageSrc = str("featuredImage", false);
  const imageAlt = str("featuredImageAlt", false);
  if (imageSrc) {
    const size = localImageSize(imageSrc);
    if (!size) fail(`featuredImage "${imageSrc}" was not found in /public.`);
    if (!imageAlt) fail(`"featuredImageAlt" is required when there is a featuredImage.`);
    if (size && imageAlt) featuredImage = { src: imageSrc, alt: imageAlt, ...size };
  }

  let cta: ServiceCta | null = category?.defaultCta
    ? SERVICE_CTAS[category.defaultCta]
    : null;
  if (data.cta === false) cta = null;
  else if (data.cta !== undefined) {
    if (typeof data.cta === "string" && data.cta in SERVICE_CTAS) {
      cta = SERVICE_CTAS[data.cta as ServiceCtaKey];
    } else {
      fail(`"cta" must be false or one of: ${Object.keys(SERVICE_CTAS).join(", ")}.`);
    }
  }

  let relatedSlugs: string[] = [];
  if (data.related !== undefined) {
    if (!Array.isArray(data.related) || data.related.some((r) => typeof r !== "string")) {
      fail(`"related" must be a list of article slugs.`);
    } else relatedSlugs = data.related as string[];
  }

  if (!body.trim()) fail("the article has no body.");
  const rendered = await renderMarkdown(body);
  rendered.errors.forEach(fail);

  if (errors.length > startErrors || !title || !slug || !description || !category || !author) {
    return null;
  }

  /* Internal #anchors must point at a heading on this page. */
  for (const href of rendered.internalLinks) {
    if (href.startsWith("#") && !rendered.headingIds.includes(href.slice(1))) {
      fail(`link "${href}" doesn't match a heading on this page.`);
    }
  }

  const post: Post = {
    slug,
    path: postPath(slug),
    title,
    seoTitle,
    description,
    excerpt: excerpt ?? description,
    category,
    tags,
    author,
    publishedAt,
    updatedAt,
    featuredImage,
    featured,
    draft,
    cta,
    relatedSlugs,
    html: rendered.html,
    toc: rendered.toc,
    wordCount: rendered.wordCount,
    /* ~225 words a minute for technical reading; never "0 min". */
    readingMinutes: Math.max(1, Math.round(rendered.wordCount / 225)),
  };
  return { post, internalLinks: rendered.internalLinks };
}

/** Newest first; undated drafts last. */
const byDateDesc = (a: Post, b: Post) =>
  (b.publishedAt ?? "0").localeCompare(a.publishedAt ?? "0") ||
  a.title.localeCompare(b.title);

async function loadPosts(): Promise<Post[]> {
  const errors: string[] = [];
  const built: Built[] = [];
  for (const raw of readRawPosts()) {
    const result = await buildPost(raw, errors);
    if (result) built.push(result);
  }

  /* File names are unique, but slugs are compared case-insensitively too. */
  const seen = new Set<string>();
  for (const { post } of built) {
    if (seen.has(post.slug.toLowerCase())) errors.push(`Duplicate slug "${post.slug}".`);
    seen.add(post.slug.toLowerCase());
  }

  const visibleBuilt = built.filter(({ post }) => !post.draft || INCLUDE_DRAFTS);
  const visible = visibleBuilt.map((b) => b.post);

  /* Every internal link must reach a page that will exist in this build. */
  const routes = new Set([
    ...SITE_ROUTES,
    BLOG_PATH,
    ...CATEGORIES.map((c) => categoryPath(c.slug)),
    ...visible.map((p) => p.path),
  ]);
  const ctaHrefs = Object.values(SERVICE_CTAS).map((c) => c.href);
  for (const href of ctaHrefs) {
    if (!routes.has(href.split("#")[0] || "/")) {
      errors.push(`SERVICE_CTAS link "${href}" isn't a page on the site.`);
    }
  }

  for (const { post, internalLinks } of visibleBuilt) {
    for (const href of internalLinks) {
      if (href.startsWith("#")) continue;
      const pathname = href.split(/[?#]/)[0];
      if (!routes.has(pathname)) {
        const hint = routes.has(`${pathname}/`)
          ? ` (did you mean "${pathname}/"? Site URLs end in a slash)`
          : built.some((b) => b.post.path === pathname)
            ? " (that article is still a draft)"
            : "";
        errors.push(`content/blog/${post.slug}.md: link "${href}" doesn't match a page${hint}.`);
      }
    }
    for (const slug of post.relatedSlugs) {
      if (!visible.some((p) => p.slug === slug && p.slug !== post.slug)) {
        errors.push(
          `content/blog/${post.slug}.md: related article "${slug}" doesn't exist or isn't published.`,
        );
      }
    }
  }

  if (errors.length) {
    throw new Error(
      `Blog content has ${errors.length} problem(s):\n  - ${errors.join("\n  - ")}`,
    );
  }

  const titles = new Map<string, string>();
  for (const post of visible) {
    const t = post.seoTitle ?? post.title;
    if (titles.has(t)) {
      console.warn(`[blog] "${post.slug}" and "${titles.get(t)}" share the title "${t}".`);
    }
    titles.set(t, post.slug);
    if (post.description.length > 165) {
      console.warn(
        `[blog] "${post.slug}" description is ${post.description.length} characters; search results usually show about 155.`,
      );
    }
  }

  return visible.sort(byDateDesc);
}

let cache: Promise<Post[]> | null = null;

/** Every article that is public in this build (plus drafts in preview). */
export function getPosts(): Promise<Post[]> {
  return (cache ??= loadPosts());
}

export async function getPost(slug: string) {
  return (await getPosts()).find((p) => p.slug === slug);
}

export async function getPostsInCategory(category: string) {
  return (await getPosts()).filter((p) => p.category.slug === category);
}

/** Categories that have at least one article, in config order. */
export async function getActiveCategories() {
  const posts = await getPosts();
  return CATEGORIES.filter((c) => posts.some((p) => p.category.slug === c.slug));
}

/* --------------------------------------------------------------- listing */

/** The featured article: newest flagged one, else the newest article. */
export function pickFeatured(posts: Post[]) {
  return posts.find((p) => p.featured) ?? posts[0];
}

export type Listing = {
  featured: Post | null;
  posts: Post[];
  page: number;
  totalPages: number;
  total: number;
};

/**
 * One page of a listing. The unfiltered /blog/ listing lifts its featured
 * article out on page 1; category listings are a plain grid.
 */
export function paginate(all: Post[], page: number, withFeatured: boolean): Listing {
  const featured = withFeatured && all.length ? pickFeatured(all) : null;
  const rest = featured ? all.filter((p) => p !== featured) : all;
  const totalPages = Math.max(1, Math.ceil(rest.length / PAGE_SIZE));
  return {
    featured: page === 1 ? featured : null,
    posts: rest.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    page,
    totalPages,
    total: all.length,
  };
}

export const pageCount = (count: number, withFeatured: boolean) =>
  Math.max(1, Math.ceil(Math.max(0, count - (withFeatured && count ? 1 : 0)) / PAGE_SIZE));

/** Page numbers 2..n for generateStaticParams (page 1 is the base URL). */
export const extraPages = (count: number, withFeatured: boolean) =>
  Array.from({ length: pageCount(count, withFeatured) - 1 }, (_, i) => String(i + 2));

/**
 * Related articles: explicit `related` slugs first, then articles that share
 * the category or tags, ranked by overlap. Nothing unrelated is padded in.
 */
export async function getRelatedPosts(post: Post, limit = 3) {
  const posts = (await getPosts()).filter((p) => p.slug !== post.slug);
  const picked = post.relatedSlugs
    .map((slug) => posts.find((p) => p.slug === slug))
    .filter((p): p is Post => Boolean(p));

  const tags = new Set(post.tags.map((t) => t.toLowerCase()));
  const scored = posts
    .filter((p) => !picked.includes(p))
    .map((p) => ({
      post: p,
      score:
        (p.category.slug === post.category.slug ? 2 : 0) +
        p.tags.filter((t) => tags.has(t.toLowerCase())).length,
    }))
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score || byDateDesc(a.post, b.post))
    .map((s) => s.post);

  return [...picked, ...scored].slice(0, limit);
}

/**
 * `output: "export"` refuses a dynamic route with zero params, which is the
 * normal state of /blog/[slug] before the first article and of /blog/page/[n]
 * before a second page. Routes return this placeholder instead; it renders
 * notFound(), and scripts/postbuild.mjs removes its output from out/.
 * It can't collide with a real slug: underscores fail slug validation.
 */
export const EMPTY_PARAM = "__empty";

/* ------------------------------------------------------- indexing rules */

/**
 * A listing with no published articles is an empty shell — it renders (so
 * links never 404) but is `noindex` and stays out of the sitemap until the
 * first article lands. Drafts never count.
 */
export async function isListingIndexable(category: string | null) {
  const posts = (await getPosts()).filter((p) => !p.draft);
  return category ? posts.some((p) => p.category.slug === category) : posts.length > 0;
}

/** Sitemap entries for the blog: indexable listings and published articles. */
export async function getBlogSitemapEntries() {
  const posts = (await getPosts()).filter((p) => !p.draft);
  const latest = (list: Post[]) =>
    list.map((p) => p.updatedAt ?? p.publishedAt!).sort().at(-1);

  const entries: { path: string; lastModified?: string }[] = [];
  if (posts.length) entries.push({ path: BLOG_PATH, lastModified: latest(posts) });
  for (const c of CATEGORIES) {
    const inCategory = posts.filter((p) => p.category.slug === c.slug);
    if (inCategory.length) {
      entries.push({ path: listingPath(c.slug, 1), lastModified: latest(inCategory) });
    }
  }
  for (const p of posts) {
    entries.push({ path: p.path, lastModified: p.updatedAt ?? p.publishedAt });
  }
  return entries;
}
