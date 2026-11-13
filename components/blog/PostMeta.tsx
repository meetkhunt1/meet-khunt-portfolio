import Image from "next/image";
import type { Post } from "@/lib/blog/posts";

/** "November 11, 2026" - fixed to UTC so a build anywhere prints the same day. */
export function formatDate(date: string) {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

/** "Nov 11, 2026", for the tight card footer. */
function formatShortDate(date: string) {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

const icon = {
  viewBox: "0 0 16 16",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  className: "size-3.5 shrink-0",
};

export function ClockIcon() {
  return (
    <svg {...icon}>
      <circle cx="8" cy="8" r="6.25" />
      <path d="M8 4.75V8l2.25 1.5" />
    </svg>
  );
}

export function CalendarIcon() {
  return (
    <svg {...icon}>
      <rect x="2.25" y="3.25" width="11.5" height="10.5" rx="1.75" />
      <path d="M2.25 6.5h11.5M5.5 1.75v3M10.5 1.75v3" />
    </svg>
  );
}

/** Category on the left, reading time on the right: the line above a title. */
export function PostTopline({ post }: { post: Post }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <p className="category">
        {post.category.name}
        {post.draft && <span className="ml-2 text-fg">· Draft</span>}
      </p>
      <p className="flex items-center gap-1.5 font-ui text-[12px] text-muted">
        <ClockIcon />
        {post.readingMinutes} min
      </p>
    </div>
  );
}

/** Author and date: the footer of an article card. */
export function PostByline({ post }: { post: Post }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex min-w-0 items-center gap-3">
        <Image
          src={post.author.image}
          alt=""
          width={36}
          height={36}
          className="size-9 shrink-0 rounded-full border border-line object-cover"
        />
        <div className="min-w-0">
          <p className="truncate font-ui text-[13px] font-semibold leading-tight text-fg">
            {post.author.name}
          </p>
          <p className="truncate font-ui text-[12px] leading-tight text-muted">
            {post.author.role}
          </p>
        </div>
      </div>
      <p className="flex shrink-0 items-center gap-1.5 font-ui text-[12px] text-muted">
        <CalendarIcon />
        {post.publishedAt ? (
          <time dateTime={post.publishedAt}>{formatShortDate(post.publishedAt)}</time>
        ) : (
          <span>Draft</span>
        )}
      </p>
    </div>
  );
}

/** Date · reading time, on one line. */
export default function PostMeta({ post }: { post: Post }) {
  return (
    <p className="font-ui text-[13px] leading-[1.4] text-muted">
      {post.publishedAt ? (
        <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
      ) : (
        <span>Draft</span>
      )}
      <span aria-hidden> · </span>
      <span>{post.readingMinutes} min read</span>
    </p>
  );
}
