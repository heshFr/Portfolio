/**
 * Every load-bearing figure on this site is a claim with a source.
 *
 * `verified`  I counted it myself, from the artifact named in `source`.
 * `reported`  Hetesh's figure. Real, but not something I could count independently.
 * `withheld`  A claim deliberately not made, and the reason why.
 *
 * The same records drive the inline markers and the sources ledger at the foot
 * of each case study, so the two can never drift apart.
 */

export type ClaimStatus = "verified" | "reported" | "withheld";

export type Claim = {
  /** Stable id used by the inline marker and the ledger. */
  id: string;
  /** The figure as it is set in prose. Empty for withheld claims. */
  value: string;
  /** What the figure counts. */
  label: string;
  /** How it was arrived at. Written to be checkable by someone else. */
  source: string;
  /** ISO date the check was made. */
  checked: string;
  status: ClaimStatus;
};

export const CLAIMS = {
  /* ---------------------------------------------------------------- Altus */

  "altus-months": {
    id: "altus-months",
    value: "four months",
    label: "elapsed build time",
    source:
      "First commit 23 May 2026, most recent 27 Aug 2026, read from the production repository's git log.",
    checked: "2026-08-27",
    status: "verified",
  },
  "altus-screens": {
    id: "altus-screens",
    value: "190",
    label: "screens",
    source: "Count of page.tsx files under app/ in the production repository.",
    checked: "2026-08-27",
    status: "verified",
  },
  "altus-tables": {
    id: "altus-tables",
    value: "215",
    label: "database tables",
    source: "Count of pgTable declarations in db/schema.ts, a 6,281 line file.",
    checked: "2026-08-27",
    status: "verified",
  },
  "altus-lines": {
    id: "altus-lines",
    value: "100,000",
    label: "lines of code",
    source:
      "101,297 lines of TypeScript and TSX across app/, components/, lib/ and db/, counted with wc -l. Rounded down in prose.",
    checked: "2026-08-27",
    status: "verified",
  },
  "altus-crons": {
    id: "altus-crons",
    value: "26",
    label: "scheduled jobs",
    source: "Entries in the crons array of vercel.json.",
    checked: "2026-08-27",
    status: "verified",
  },
  "altus-migrations": {
    id: "altus-migrations",
    value: "183",
    label: "database migrations",
    source: "Files in db/migrations.",
    checked: "2026-08-27",
    status: "verified",
  },
  "altus-spreadsheets": {
    id: "altus-spreadsheets",
    value: "15",
    label: "spreadsheets replaced",
    source:
      "Hetesh's figure, counted from the work the system took over. I found a comparable number of .xlsx files still in the repository, which is corroboration rather than a count.",
    checked: "2026-08-27",
    status: "reported",
  },
  "altus-commits": {
    id: "altus-commits",
    value: "",
    label: "commits",
    source:
      "Not claimed on this site. The branch carries 639 commits and roughly 830 are attributed to Hetesh across two email addresses, which cannot both be right. Until that is reconciled there is no honest number to print.",
    checked: "2026-08-27",
    status: "withheld",
  },

  /* --------------------------------------------------------------- Beauty */

  "beauty-interactions": {
    id: "beauty-interactions",
    value: "two million",
    label: "shopping interactions",
    source:
      "2,000,000 interactions from the Amazon Reviews 2023 beauty corpus after asymmetric k-core filtering and capping, split 1.6M train and 400k test on a global temporal cutoff.",
    checked: "2026-08-27",
    status: "verified",
  },
  "beauty-products": {
    id: "beauty-products",
    value: "60,000",
    label: "products",
    source:
      "Catalog after pruning. The evaluated run reports a catalog size of 60,008, down from 1,028,860 raw products.",
    checked: "2026-08-27",
    status: "verified",
  },
  "beauty-latency": {
    id: "beauty-latency",
    value: "68",
    label: "milliseconds, median",
    source:
      "p50 of 67.6 ms over 1,732 queries in reports/evaluation.json, with p95 at 90.7 ms and p99 at 104.0 ms. Reproducible by cloning the repository and running the evaluation.",
    checked: "2026-08-27",
    status: "verified",
  },
  "beauty-baseline": {
    id: "beauty-baseline",
    value: "",
    label: "the pipeline loses to a bestseller list",
    source:
      "hit@20 of 0.0116 for the full pipeline against 0.0504 for the twenty most-reviewed products shown to everyone, from reports/evaluation.json. Semantic retrieval alone and the pipeline with re-ranking switched off both also score higher than the full system.",
    checked: "2026-08-27",
    status: "verified",
  },

  /* --------------------------------------------------------- Satya Drishti */

  "satya-local": {
    id: "satya-local",
    value: "",
    label: "runs on the user's own machine",
    source:
      "Trained weights ship as INT8 ONNX exports for local inference: the audio, video, forensics and fusion models are all present in models/exported.",
    checked: "2026-08-27",
    status: "verified",
  },

  /* ----------------------------------------------------------- MarketPlus */

  "marketplus-lines": {
    id: "marketplus-lines",
    value: "37,000",
    label: "lines of code",
    source:
      "37,770 lines of TypeScript and TSX across 459 files in a Turborepo monorepo of three apps and nine packages.",
    checked: "2026-08-27",
    status: "verified",
  },
} as const satisfies Record<string, Claim>;

export type ClaimId = keyof typeof CLAIMS;

export function claim(id: ClaimId): Claim {
  return CLAIMS[id];
}
