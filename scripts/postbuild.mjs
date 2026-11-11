/**
 * Runs automatically after `npm run build` (npm's post-script convention).
 *
 * Removes the placeholder pages that empty blog routes emit. `output: "export"`
 * won't build a dynamic route with zero params, so /blog/[slug] and
 * /blog/page/[page] return a "__empty" param while they have nothing to show
 * (see EMPTY_PARAM in lib/blog/posts.ts). Those render a 404 and must not be
 * deployed as URLs.
 */
import fs from "node:fs";
import path from "node:path";

const OUT = path.join(process.cwd(), "out");
const PLACEHOLDER = "__empty";

function sweep(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const full = path.join(dir, entry.name);
    if (entry.name === PLACEHOLDER) {
      fs.rmSync(full, { recursive: true, force: true });
      console.log(`postbuild: removed placeholder ${path.relative(OUT, full)}/`);
    } else {
      sweep(full);
    }
  }
}

if (fs.existsSync(OUT)) sweep(OUT);
