import Image from "next/image";
import type { Post } from "@/lib/blog/posts";

/**
 * An article's cover: its featured image, or - when it has none - a designed
 * title card, so a new article looks finished before it has artwork. The
 * title card is dark ink with the title set large, the category in the
 * accent colour, and a monogram, in the manner of a branded blog thumbnail.
 */
export default function PostCover({
  post,
  sizes,
  priority = false,
  size = "md",
}: {
  post: Post;
  sizes: string;
  priority?: boolean;
  /** "lg" sets the title larger, for the full-width card. */
  size?: "md" | "lg";
}) {
  if (post.featuredImage) {
    return (
      <Image
        src={post.featuredImage.src}
        alt={post.featuredImage.alt}
        fill
        priority={priority}
        sizes={sizes}
        className="object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[1.04]"
      />
    );
  }

  return (
    <div
      aria-hidden
      className="absolute inset-0 flex flex-col justify-between overflow-hidden bg-fg text-bg transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[1.04]"
      style={{
        backgroundImage:
          "radial-gradient(circle at 100% 0%, rgba(255,217,142,0.22), transparent 55%), radial-gradient(rgba(255,255,255,0.09) 1px, transparent 1px)",
        backgroundSize: "auto, 14px 14px",
      }}
    >
      <div className={size === "lg" ? "p-7 lg:p-10" : "p-5 lg:p-6"}>
        <span className="inline-block rounded-full bg-accent px-2.5 py-1 font-ui text-[10px] font-bold uppercase tracking-[0.06em] text-fg lg:text-[11px]">
          {post.category.name}
        </span>
        <p
          className={`mt-4 line-clamp-4 font-sans font-semibold leading-[1.05] tracking-[-0.02em] ${
            size === "lg"
              ? "max-w-[18ch] text-[28px] lg:text-[42px]"
              : "max-w-[16ch] text-[22px] lg:text-[24px]"
          }`}
        >
          {post.title}
        </p>
      </div>
      <div
        className={`flex items-center gap-2 font-ui text-[11px] font-semibold tracking-[0.04em] text-bg/60 ${
          size === "lg" ? "px-7 pb-7 lg:px-10 lg:pb-10" : "px-5 pb-5 lg:px-6"
        }`}
      >
        <span className="grid size-6 place-items-center rounded-[6px] bg-bg text-[10px] font-bold text-fg">
          MK
        </span>
        <span>{post.author.name}</span>
      </div>
    </div>
  );
}
