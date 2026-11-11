/**
 * Markdown -> HTML for articles, at build time.
 *
 * Standard Markdown + GFM (tables, strikethrough, task lists), plus:
 *
 *   ## Heading {#custom-id}        explicit, stable heading id (optional)
 *   ![Alt text](/path.webp "Caption")   on its own line -> <figure> with caption
 *   > [!NOTE] / [!TIP] / [!IMPORTANT] / [!WARNING] / [!CAUTION]   callouts
 *   @[youtube](VIDEO_ID "Accessible title")   lazy embedded video
 *   @[vimeo](VIDEO_ID "Accessible title")
 *   ```js title="checkout.js"      highlighted code, optional file name
 *
 * Highlighting runs here (Shiki), so pages ship coloured HTML and no
 * highlighter JavaScript. Problems that would publish something broken —
 * missing alt text, a missing image, an H1 in the body, a relative link —
 * are collected and reported by the caller, which fails the build.
 */

import fs from "node:fs";
import path from "node:path";
import { imageSize } from "image-size";
import { Marked, Renderer, type Tokens } from "marked";
import { createHighlighter, type Highlighter } from "shiki";

export type TocEntry = { id: string; text: string; depth: 2 | 3 };

export type RenderedMarkdown = {
  html: string;
  toc: TocEntry[];
  /** Every heading id on the page, including H4+ (for #anchor checks) */
  headingIds: string[];
  /** Internal hrefs used, e.g. "/checkout-champ-developer/" or "#setup" */
  internalLinks: string[];
  wordCount: number;
  errors: string[];
};

const CODE_LANGS = [
  "html",
  "css",
  "scss",
  "javascript",
  "typescript",
  "jsx",
  "tsx",
  "json",
  "bash",
  "shell",
  "liquid",
  "php",
  "xml",
  "yaml",
  "markdown",
  "diff",
  "sql",
  "http",
] as const;

const CODE_THEME = "github-light";

let highlighter: Promise<Highlighter> | null = null;
const getHighlighter = () =>
  (highlighter ??= createHighlighter({
    themes: [CODE_THEME],
    langs: [...CODE_LANGS],
  }));

const PUBLIC_DIR = path.join(process.cwd(), "public");

export function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Lowercase, ASCII, hyphenated. "Shopify & Checkout Champ" -> "shopify-and-checkout-champ" */
export function slugify(text: string) {
  return text
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Read an image's intrinsic size from /public so it renders without layout shift. */
export function localImageSize(src: string) {
  if (!src.startsWith("/")) return null;
  const file = path.join(PUBLIC_DIR, decodeURIComponent(src.split(/[?#]/)[0]));
  if (!file.startsWith(PUBLIC_DIR) || !fs.existsSync(file)) return null;
  const { width, height } = imageSize(fs.readFileSync(file));
  return width && height ? { width, height } : null;
}

const CALLOUTS: Record<string, string> = {
  NOTE: "Note",
  TIP: "Tip",
  IMPORTANT: "Important",
  WARNING: "Warning",
  CAUTION: "Caution",
};

const stripTags = (html: string) =>
  html
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");

export async function renderMarkdown(source: string): Promise<RenderedMarkdown> {
  const shiki = await getHighlighter();
  const loadedLangs = new Set(shiki.getLoadedLanguages());

  const toc: TocEntry[] = [];
  const headingIds: string[] = [];
  const internalLinks: string[] = [];
  const errors: string[] = [];
  const usedIds = new Map<string, number>();

  const uniqueId = (base: string) => {
    const id = base || "section";
    const n = usedIds.get(id) ?? 0;
    usedIds.set(id, n + 1);
    return n === 0 ? id : `${id}-${n + 1}`;
  };

  const marked = new Marked({ gfm: true });

  marked.use({
    /* Pull an explicit `{#id}` off the end of a heading before it renders. */
    walkTokens(token) {
      if (token.type !== "heading") return;
      const match = token.text.match(/\s*\{#([a-z0-9-]+)\}\s*$/);
      if (!match) return;
      (token as Tokens.Heading & { customId?: string }).customId = match[1];
      token.text = token.text.slice(0, match.index);
      const last = token.tokens?.at(-1);
      if (last && "text" in last) {
        last.text = last.text.replace(/\s*\{#[a-z0-9-]+\}\s*$/, "");
        if ("raw" in last) last.raw = last.raw.replace(/\s*\{#[a-z0-9-]+\}\s*$/, "");
      }
    },

    extensions: [
      {
        name: "video",
        level: "block",
        start: (src) => src.match(/^@\[(youtube|vimeo)\]/m)?.index,
        tokenizer(src) {
          const m = /^@\[(youtube|vimeo)\]\(([\w-]+)\s+"([^"]+)"\)[ \t]*(?:\n+|$)/.exec(src);
          if (!m) return;
          return {
            type: "video",
            raw: m[0],
            provider: m[1],
            id: m[2],
            title: m[3],
          };
        },
        renderer(token) {
          const src =
            token.provider === "youtube"
              ? `https://www.youtube-nocookie.com/embed/${token.id}`
              : `https://player.vimeo.com/video/${token.id}`;
          return `<figure class="prose-video"><div class="prose-video__frame"><iframe src="${src}" title="${escapeHtml(token.title)}" loading="lazy" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe></div><figcaption>${escapeHtml(token.title)}</figcaption></figure>\n`;
        },
      },
    ],

    renderer: {
      heading(token) {
        const { tokens, depth } = token;
        const inner = this.parser.parseInline(tokens);
        if (depth === 1) {
          errors.push(
            `Body contains an H1 ("${stripTags(inner)}"). The title is the page's only H1 — start sections at ##.`,
          );
        }
        const custom = (token as Tokens.Heading & { customId?: string }).customId;
        const text = stripTags(inner).trim();
        const id = uniqueId(custom ?? slugify(text));
        headingIds.push(id);
        if (depth === 2 || depth === 3) toc.push({ id, text, depth });
        const level = Math.max(depth, 2);
        return `<h${level} id="${id}">${inner}<a class="prose-anchor" href="#${id}" aria-label="Link to this section: ${escapeHtml(text)}">#</a></h${level}>\n`;
      },

      paragraph(token) {
        /* An image alone on its line becomes a figure, not <p><figure>. */
        const only = token.tokens.filter((t) => !(t.type === "text" && !t.raw.trim()));
        if (only.length === 1 && only[0].type === "image") {
          return this.image(only[0] as Tokens.Image) + "\n";
        }
        return `<p>${this.parser.parseInline(token.tokens)}</p>\n`;
      },

      image({ href, title, text }) {
        if (!text.trim()) {
          errors.push(`Image ${href} has no alt text.`);
        }
        const size = localImageSize(href);
        if (!size) {
          errors.push(
            `Image ${href} was not found in /public. Article images must be local files so their dimensions are known.`,
          );
        }
        const dims = size ? ` width="${size.width}" height="${size.height}"` : "";
        const img = `<img src="${escapeHtml(href)}" alt="${escapeHtml(text)}"${dims} loading="lazy" decoding="async">`;
        return title
          ? `<figure class="prose-figure">${img}<figcaption>${escapeHtml(title)}</figcaption></figure>`
          : `<figure class="prose-figure">${img}</figure>`;
      },

      link({ href, title, tokens }) {
        const inner = this.parser.parseInline(tokens);
        const titleAttr = title ? ` title="${escapeHtml(title)}"` : "";
        if (/^https?:\/\//i.test(href)) {
          return `<a href="${escapeHtml(href)}"${titleAttr} target="_blank" rel="noopener noreferrer">${inner}<span class="sr-only"> (opens in a new tab)</span></a>`;
        }
        if (href.startsWith("/") || href.startsWith("#")) {
          internalLinks.push(href);
        } else if (!/^(mailto|tel):/i.test(href)) {
          errors.push(
            `Link "${href}" is relative. Use a root path like /blog/some-article/ or a full https:// URL.`,
          );
        }
        return `<a href="${escapeHtml(href)}"${titleAttr}>${inner}</a>`;
      },

      blockquote({ tokens }) {
        const inner = this.parser.parse(tokens);
        const match = inner.match(/^<p>\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\][ \t]*\n?/i);
        if (!match) return `<blockquote>\n${inner}</blockquote>\n`;
        const kind = match[1].toUpperCase();
        const body = inner.slice(match[0].length).replace(/^<p><\/p>\n?/, "");
        const content = body.startsWith("<") ? body : `<p>${body}`;
        return `<aside class="prose-callout prose-callout--${kind.toLowerCase()}" role="note" aria-label="${CALLOUTS[kind]}"><p class="prose-callout__label">${CALLOUTS[kind]}</p>${content}</aside>\n`;
      },

      table(token) {
        const table = Renderer.prototype.table.call(this, token);
        return `<div class="prose-table" role="region" aria-label="Table" tabindex="0">${table}</div>\n`;
      },

      code({ text, lang }) {
        /* Info string: ```lang title="file.js" */
        const info = (lang ?? "").trim();
        const language = info.split(/\s+/)[0]?.toLowerCase() || "text";
        const fileName = info.match(/title="([^"]+)"/)?.[1];
        const highlighted = loadedLangs.has(language)
          ? shiki.codeToHtml(text, { lang: language, theme: CODE_THEME })
          : `<pre class="shiki" tabindex="0"><code>${escapeHtml(text)}</code></pre>`;
        /* Shiki already gives <pre> tabindex=0, so long lines can be scrolled
           with the keyboard; label the region so that stop is announced. */
        const label = fileName ?? (language === "text" ? "Code" : language.toUpperCase());
        const pre = highlighted.replace(
          "<pre ",
          `<pre aria-label="${escapeHtml(label)} code" `,
        );
        return `<figure class="prose-code"><figcaption class="prose-code__label">${escapeHtml(label)}</figcaption>${pre}</figure>\n`;
      },
    },
  });

  const html = marked.parse(source, { async: false }) as string;

  /* Reading time ignores code: nobody reads a 40-line snippet word by word. */
  const prose = source.replace(/```[\s\S]*?```/g, " ").replace(/[#>*_`|[\]()!-]/g, " ");
  const wordCount = prose.split(/\s+/).filter(Boolean).length;

  return { html, toc, headingIds, internalLinks, wordCount, errors };
}
