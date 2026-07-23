# Meet Khunt — Portfolio

Personal portfolio of Meet Khunt, ecommerce frontend specialist. Built with Next.js (static export), Tailwind CSS, and GSAP.

## Development

```bash
npm install
npm run dev
```

## Deployment

Pushing to `main` triggers a GitHub Actions workflow that builds the site and publishes the static output (`out/`) to the `build` branch. Hostinger deploys from that branch.

Content lives in `lib/data.ts` — projects, about copy, links, and hero images are all edited there.
