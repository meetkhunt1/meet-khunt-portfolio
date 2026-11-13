/**
 * Share links for an article: plain URLs to each network's share dialog, so
 * they work without JavaScript and load no third-party scripts.
 */
const icons = {
  LinkedIn: (
    <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05C20.6 8.65 21 11.2 21 14.5V21h-4v-5.8c0-1.4-.03-3.2-1.95-3.2-1.95 0-2.25 1.5-2.25 3.1V21H9z" />
  ),
  X: (
    <path d="M17.75 3h3.07l-6.7 7.66L22 21h-6.17l-4.83-6.32L5.47 21H2.4l7.17-8.2L2 3h6.33l4.37 5.77zm-1.08 16.2h1.7L7.4 4.73H5.58z" />
  ),
  Facebook: (
    <path d="M14 8.5V6.8c0-.8.5-1.3 1.4-1.3H17V2.2h-2.6C11.6 2.2 10.6 4 10.6 6.4v2.1H8v3.3h2.6V22H14V11.8h2.7l.4-3.3z" />
  ),
};

export default function ShareLinks({ url, title }: { url: string; title: string }) {
  const u = encodeURIComponent(url);
  const links = [
    { label: "LinkedIn" as const, href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}` },
    { label: "X" as const, href: `https://twitter.com/intent/tweet?url=${u}&text=${encodeURIComponent(title)}` },
    { label: "Facebook" as const, href: `https://www.facebook.com/sharer/sharer.php?u=${u}` },
  ];
  return (
    <ul className="flex items-center gap-1.5">
      {links.map((l) => (
        <li key={l.label}>
          <a
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="grow"
            aria-label={`Share on ${l.label} (opens in a new tab)`}
            className="grid size-7 place-items-center rounded-full text-fg/70 transition-colors duration-200 hover:bg-surface hover:text-fg"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className="size-[15px]">
              {icons[l.label]}
            </svg>
          </a>
        </li>
      ))}
    </ul>
  );
}
