import Image from "next/image";
import Link from "next/link";
import type { Post } from "@/lib/blog/posts";
import PostMeta from "./PostMeta";

/** Lead article on /blog/: cover beside the copy on desktop, stacked on phones. */
export default function FeaturedPost({ post, label }: { post: Post; label: string }) {
  return (
    <Link
      href={post.path}
      data-cursor="view"
      className="group grid grid-cols-1 items-center gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-14"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[14px] border border-fg/20 bg-surface shadow-[0_16px_40px_-18px_rgba(16,24,40,0.25)]">
        {post.featuredImage ? (
          <Image
            src={post.featuredImage.src}
            alt={post.featuredImage.alt}
            fill
            priority
            sizes="(min-width: 1200px) 58vw, 100vw"
            className="object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[1.04]"
          />
        ) : (
          <div aria-hidden className="flex h-full flex-col justify-between p-8 lg:p-12">
            <span className="category">{post.category.name}</span>
            <span className="line-clamp-3 font-sans text-[30px] font-medium leading-[1.05] tracking-[-0.03em] text-fg/35 lg:text-[48px]">
              {post.title}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-col items-start">
        <p className="label">{label}</p>
        <p className="category mt-6">{post.category.name}</p>
        <h2 className="mt-3 font-sans text-[28px] font-medium leading-[1.08] tracking-[-0.02em] text-fg transition-colors duration-300 group-hover:text-muted lg:text-[40px]">
          {post.title}
        </h2>
        <p className="mt-4 font-ui text-[16px] leading-[1.6] text-fg/75 lg:text-[18px]">
          {post.excerpt}
        </p>
        <div className="mt-5">
          <PostMeta post={post} />
        </div>
        <span className="pill mt-8 rounded-[50px]">Read article</span>
      </div>
    </Link>
  );
}
