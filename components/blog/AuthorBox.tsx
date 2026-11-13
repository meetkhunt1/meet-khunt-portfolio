import Image from "next/image";
import Link from "next/link";
import type { Author } from "@/lib/blog/config";

/**
 * Author card at the end of an article: photo beside the name, role, bio and
 * profile links. Stacks on phones. Only facts the site states.
 */
export default function AuthorBox({ author }: { author: Author }) {
  return (
    <section
      aria-label="About the author"
      className="flex flex-col gap-6 rounded-[14px] border border-line bg-bg p-6 shadow-[0_18px_50px_-30px_rgba(16,24,40,0.35)] sm:flex-row sm:items-start lg:p-8"
    >
      <Image
        src={author.image}
        alt={author.name}
        width={160}
        height={160}
        className="size-[120px] shrink-0 rounded-[12px] border border-line object-cover sm:size-[150px]"
      />
      <div className="min-w-0">
        <p className="font-ui text-[12px] font-semibold text-fg">About the author:</p>
        <p className="mt-2 font-sans text-[24px] font-semibold leading-tight tracking-[-0.02em] text-fg">
          <Link
            href={author.href}
            rel="author"
            data-cursor="grow"
            className="transition-colors duration-200 hover:text-muted"
          >
            {author.name}
          </Link>
        </p>
        <p className="mt-1 font-ui text-[14px] text-muted">{author.role}</p>
        <p className="mt-4 max-w-[60ch] font-ui text-[15px] leading-[1.65] text-fg/75">
          {author.bio}
        </p>
        {author.profiles.length > 0 && (
          <div className="mt-5 flex items-center gap-3">
            <span className="font-ui text-[12px] text-muted">Follow:</span>
            <ul className="flex flex-wrap gap-3">
              {author.profiles.map((p) => (
                <li key={p.href}>
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noreferrer me"
                    data-cursor="grow"
                    className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 font-ui text-[12px] font-semibold text-fg transition-colors duration-200 hover:bg-surface"
                  >
                    {p.label === "LinkedIn" && (
                      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className="size-3.5">
                        <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05C20.6 8.65 21 11.2 21 14.5V21h-4v-5.8c0-1.4-.03-3.2-1.95-3.2-1.95 0-2.25 1.5-2.25 3.1V21H9z" />
                      </svg>
                    )}
                    {p.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
