import Image from "next/image";
import Link from "next/link";
import type { Post } from "@/lib/blog/posts";
import PostMeta from "./PostMeta";

/**
 * Article card in the /projects card style: rounded cover, then category,
 * title, excerpt and meta. The whole card is one link. Articles without a
 * cover get a typographic panel so the grid still lines up.
 */
export default function PostCard({
  post,
  headingLevel: Heading = "h2",
  sizes = "(min-width: 1200px) 33vw, (min-width: 810px) 50vw, 100vw",
}: {
  post: Post;
  headingLevel?: "h2" | "h3";
  sizes?: string;
}) {
  return (
    <Link href={post.path} data-cursor="view" className="group flex h-full flex-col">
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[14px] border border-fg/20 bg-surface">
        {post.featuredImage ? (
          <Image
            src={post.featuredImage.src}
            alt={post.featuredImage.alt}
            fill
            sizes={sizes}
            className="object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[1.04]"
          />
        ) : (
          <div aria-hidden className="flex h-full flex-col justify-between p-6">
            <span className="category">{post.category.name}</span>
            <span className="line-clamp-3 font-sans text-[22px] font-medium leading-[1.1] tracking-[-0.02em] text-fg/35 lg:text-[26px]">
              {post.title}
            </span>
          </div>
        )}
      </div>

      <p className="category mt-6">
        {post.category.name}
        {post.draft && <span className="ml-2 text-fg">· Draft</span>}
      </p>
      <Heading className="mt-2.5 font-sans text-[22px] font-medium leading-[1.15] tracking-[-0.02em] text-fg transition-colors duration-300 group-hover:text-muted lg:text-[26px]">
        {post.title}
      </Heading>
      <p className="mt-2.5 line-clamp-3 font-ui text-[16px] leading-[1.6] text-fg/75">
        {post.excerpt}
      </p>
      <div className="mt-4">
        <PostMeta post={post} />
      </div>
    </Link>
  );
}
