# hetesh.dev

Portfolio site. Next.js 16 (App Router), React 19, TypeScript strict, Tailwind v4,
MDX for case studies. No database, no CMS, no analytics.

```
pnpm install
pnpm dev        # http://localhost:3000
pnpm build
pnpm typecheck
```

## How it is put together

- `content/claims.ts` is the single source of truth for every figure on the site.
  Each claim carries how it was counted, when it was checked, and a status:
  `verified` (counted from the named artifact), `reported` (Hetesh's figure, not
  independently counted), or `withheld` (a claim deliberately not made, with the
  reason). The inline markers and the sources ledger at the foot of each case
  study both read from it, so they cannot drift apart.
- `content/projects.ts` is the work manifest. Promoting a project to a full case
  study means adding `app/work/<slug>/page.mdx` and flipping `caseStudy` to true.
  Nothing else changes.
- `components/case.tsx` is the case-study furniture. Every case study uses the
  same components in the same order.
- Numerals are always set in the mono face. `components/typeset.tsx` applies that
  to copy coming from the manifests so the rule holds without hand-wrapping.

## Adding or changing a figure

Add a record to `content/claims.ts`, then reference it as `<Fig id="..." />` in
the prose and add its id to that page's `<Ledger ids={[...]} />`. If you cannot
source it, give it `status: "withheld"` and say why. Do not print an unsourced
number.

## Regenerating the OG images

`public/og/*.png` were rendered at 1200x630 from a temporary route using the
site's own fonts. To redo them, recreate `app/ogcards/page.tsx`, screenshot each
card, and delete the route again.

## Deploying

Nothing here is environment-specific. `pnpm build` produces a fully static site.
Set the real domain in `metadataBase` in `app/layout.tsx` and in `app/sitemap.ts`
and `app/robots.ts` before going live.
