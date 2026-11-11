import type { Post } from "@/lib/blog/posts";

/** "November 11, 2026" — fixed to UTC so a build anywhere prints the same day. */
export function formatDate(date: string) {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

/** Date · reading time, as used on cards. */
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
