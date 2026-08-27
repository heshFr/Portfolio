# heshbuilds.vercel.app

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

## Media

`public/media` holds the screens and one clip.

- Satya Drishti and MarketPlus are Hetesh's own, captured from the live
  deployment and from the repo, and shown as they are.
- The Altus board is **redacted at source**: the card region is downsampled to
  1/22 scale and blurred before the JPEG is written, so the names and client
  details are gone from the file rather than hidden with CSS. Never publish a
  raw `.shots` image from that repo. They contain colleagues' names, salaries
  and attendance.
- The clip is `preload="none"` behind a poster, so it costs nothing until
  somebody presses play.

Screens sit on `.tilt-plate` inside `.tilt-stage`: a real CSS perspective with a
small pointer-tracked rotation, disabled for touch and for reduced motion. The
first screen on any page should be `priority`, because a lazy-loaded LCP element
costs about 1.6s of load delay for nothing.

## The desk scene

`components/desk-scene.tsx` is a real WebGL scene: a perspective camera, the
three screens as textured prints with card stock and thickness, a directional
shadow map onto a `shadowMaterial` receiver, contact shadows, and a locally
generated environment map. Nothing is fetched from a CDN.

Two rules keep it from wrecking the page:

- **The canvas is transparent and CSS paints the desk** with `--color-panel`.
  Do not put a ground plane back in and colour it in the scene: three's colour
  management linearises material colours twice under this setup and the surface
  drifts several stops away from the token.
- **It only goes live where the device can afford it**: fine pointer, viewport
  at least 62rem, four or more cores, no reduced-motion preference, and the band
  near the viewport. Everywhere else `public/media/desk-poster.jpg` is shown,
  which is a render of the same scene at its resting camera. Ungated, the WebGL
  bundle costs about 950ms of blocked main thread on a throttled phone and takes
  the home page from 95 to 74.

Clicking a print opens it: the camera stops tracking the pointer and aims at
the print instead, which centres it by construction rather than by arithmetic
that has to stay correct. The other two park in absolute slots, one either side,
so the open one always has one to its left and one to its right. An open print
stops casting, because it is no longer lying on the desk.

`content/prints.ts` is shared by the scene and by the plain HTML controls under
it, so the keyboard path and the pointer path cannot disagree about what is on
the desk. Those controls work when WebGL never loads at all.

To re-render the poster after changing the scene, screenshot `.desk-stage` at
2x with the pointer centred, then downscale to 2000px wide.

## Regenerating the OG images

`public/og/*.png` were rendered at 1200x630 from a temporary route using the
site's own fonts. To redo them, recreate `app/ogcards/page.tsx`, screenshot each
card, and delete the route again.

## Deploying

Nothing here is environment-specific. `pnpm build` produces a fully static site,
deployed on Vercel at https://heshbuilds.vercel.app.

The domain appears in exactly three places, and all three have to move together
or the canonical URLs, the OG image URLs and the sitemap will disagree:

- `metadataBase` in `app/layout.tsx`
- `SITE` in `app/sitemap.ts`
- the sitemap URL in `app/robots.ts`
