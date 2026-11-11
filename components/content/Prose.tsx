import "./prose.css";

/**
 * Renders build-time HTML (from lib/blog/markdown.ts) in the site's long-form
 * type styles. The HTML comes from Markdown files in this repository, never
 * from user input, so it is inserted as-is.
 */
export default function Prose({
  html,
  className = "",
}: {
  html: string;
  className?: string;
}) {
  return (
    <div
      className={`prose-content ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
