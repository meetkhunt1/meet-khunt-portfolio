import Image from "next/image";
import Link from "next/link";
import type { Author } from "@/lib/blog/config";

/** Author card at the end of an article. Only facts the site states. */
export default function AuthorBox({ author }: { author: Author }) {
  return (
    <section
      aria-label="About the author"
      className="flex flex-col gap-5 rounded-[12px] border border-line bg-surface p-6 sm:flex-row sm:items-start lg:p-8"
    >
      <Image
        src={author.image}
        alt=""
        width={72}
        height={72}
        className="size-[72px] shrink-0 rounded-full object-cover object-[center_22%]"
      />
      <div>
        <p className="category">Written by</p>
        <p className="mt-2 font-sans text-[22px] font-medium leading-tight tracking-[-0.02em] text-fg">
          <Link
            href={author.href}
            rel="author"
            data-cursor="grow"
            className="transition-colors duration-200 hover:text-muted"
          >
            {author.name}
          </Link>
        </p>
        <p className="mt-2 max-w-[60ch] font-ui text-[15px] leading-[1.6] text-fg/75">
          {author.bio}
        </p>
        <ul className="mt-4 flex flex-wrap gap-4">
          {author.profiles.map((p) => (
            <li key={p.href}>
              <a
                href={p.href}
                target="_blank"
                rel="noreferrer me"
                data-cursor="grow"
                className="link-fade small-caps"
              >
                {p.label} ↗
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
