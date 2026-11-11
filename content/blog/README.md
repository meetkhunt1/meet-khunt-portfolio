# Blog articles

Every article is one Markdown file in this folder: `content/blog/<slug>.md`.
Publishing an article is adding a file and pushing — the listing, category
pages, pagination, related articles, sitemap and structured data all update
from it on the next build. No component needs editing.

Files starting with `_` and this README are ignored.

## Frontmatter

```yaml
---
title: "How to Customize a Checkout Champ Checkout Page"
slug: "customize-checkout-champ-checkout-page"   # must equal the file name
description: "What you can change on a Checkout Champ checkout page, what needs custom code, and how to test it."   # meta description, ~155 characters
excerpt: "Optional. Card and intro text; defaults to the description."
seoTitle: "Optional. Full <title>; defaults to '<title> | Meet Khunt'."
category: "checkout-champ"        # checkout-champ | shopify | ecommerce-development | web-development | tutorials-guides
tags:
  - "Checkout Champ"
  - "Checkout"
author: "Meet Khunt"              # or "meet-khunt"
publishedAt: "2026-11-20"         # the real publish date — required unless draft
updatedAt: "2026-12-02"           # optional; only when the article was actually revised
featuredImage: "/images/blog/customize-checkout-champ-checkout-page.webp"   # optional, in /public
featuredImageAlt: "Checkout Champ checkout page with a custom package selector"   # required with an image
featured: false                   # true = lead article on /blog/ (newest featured wins)
draft: false                      # true = never built, listed or put in the sitemap
cta: "checkout-champ"             # optional: checkout-champ | shopify | landing-pages | general | false
related:                          # optional: hand-picked related article slugs
  - "checkout-champ-shopify-integration"
---
```

Categories, service CTAs and the author live in `lib/blog/config.ts`.
If `cta` is left out, the article uses its category's default.

## Writing

Standard Markdown plus GitHub tables. Start sections at `##` — the title is
the page's only H1. `##` and `###` headings build the table of contents.

| Need | Write |
| --- | --- |
| Fixed heading id | `## Order sync {#order-sync}` |
| Image with caption | `![Alt text](/images/blog/file.webp "Caption")` on its own line |
| Note / tip / warning | `> [!NOTE]`, `> [!TIP]`, `> [!IMPORTANT]`, `> [!WARNING]`, `> [!CAUTION]` on the first line of a quote |
| Code with file name | ` ```js title="checkout.js" ` |
| Video | `@[youtube](VIDEO_ID "Accessible title")` or `@[vimeo](VIDEO_ID "Title")` on its own line |
| Internal link | `[Checkout Champ development services](/checkout-champ-developer/)` — root path, trailing slash |
| Link to a section | `[see the setup steps](#setup)` |

Put article images in `public/images/blog/`. Their dimensions are read at
build time, so they render without layout shift.

Vary the anchor text when linking to service pages, and only link where it
helps the reader.

## What the build checks

`npm run build` fails, naming the file and the problem, when an article has:

- a missing or unknown frontmatter field, or a slug that doesn't match its file name
- an unknown category, author or CTA
- an invalid or future date, or `updatedAt` before `publishedAt`
- a missing image, or an image without alt text
- an H1 in the body, or a relative link
- an internal link to a page that doesn't exist — including a draft article
- a `#link` to a heading that isn't on the page
- a duplicate slug, or a `related` slug that isn't published

## Previewing drafts

```bash
BLOG_DRAFTS=1 npm run dev
```

Drafts then appear with a "Draft preview" banner, `noindex`, and are still
never in the sitemap. Production builds don't set `BLOG_DRAFTS`.
