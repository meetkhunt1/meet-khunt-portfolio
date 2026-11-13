import Link from "next/link";
import type { Post } from "@/lib/blog/posts";
import PostCover from "./PostCover";
import { PostByline, PostTopline } from "./PostMeta";

/**
 * Article card: cover, then category and reading time, title, excerpt, and
 * the author and date in a footer. The whole card is one link, and every
 * card in a row ends at the same line because the body stretches.
 */
export default function PostCard({
  post,
  headingLevel: Heading = "h2",
  sizes = "(min-width: 1200px) 30vw, (min-width: 810px) 45vw, 100vw",
}: {
  post: Post;
  headingLevel?: "h2" | "h3";
  sizes?: string;
}) {
  return (
    <Link
      href={post.path}
      data-cursor="view"
      className="group flex h-full flex-col overflow-hidden rounded-[14px] border border-line bg-bg transition-[box-shadow,translate] duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-20px_rgba(16,24,40,0.3)]"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-line bg-surface">
        <PostCover post={post} sizes={sizes} />
      </div>

      <div className="flex flex-1 flex-col p-5 lg:p-6">
        <PostTopline post={post} />
        <Heading className="mt-3 line-clamp-3 font-sans text-[19px] font-semibold leading-[1.2] tracking-[-0.015em] text-fg transition-colors duration-300 group-hover:text-muted lg:text-[20px]">
          {post.title}
        </Heading>
        <p className="mt-2.5 line-clamp-3 font-ui text-[14px] leading-[1.6] text-fg/70">
          {post.excerpt}
        </p>
        {/* Spacer: pushes the byline to the bottom, never less than 24px. */}
        <div aria-hidden className="min-h-6 flex-1" />
        <div className="border-t border-line pt-4">
          <PostByline post={post} />
        </div>
      </div>
    </Link>
  );
}
