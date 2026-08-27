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

  "altus-clients": {
    id: "altus-clients",
    value: "three",
    label: "shipping clients",
    source:
      "A Next.js web app, an Expo and React Native app, and a separate native Android app in Kotlin, all served by a dedicated mobile API of about 45 endpoints under app/api/mobile.",
    checked: "2026-08-27",
    status: "verified",
  },
  "altus-pool": {
    id: "altus-pool",
    value: "8",
    label: "Postgres connections per instance",
    source:
      "Cut from 18 after the pool-exhaustion incident, with idle timeout at about 10s and max lifetime at about 600s. Supabase allows 60 connections in total.",
    checked: "2026-08-27",
    status: "reported",
  },

  /* --------------------------------------------------------- Beauty, depth */

  "beauty-raw": {
    id: "beauty-raw",
    value: "1,028,860",
    label: "raw products before filtering",
    source:
      "Amazon Reviews 2023, Beauty_and_Personal_Care. 407,588 were rejected as not beauty, leaving 621,272 enriched and 60,000 after pruning.",
    checked: "2026-08-27",
    status: "verified",
  },
  "beauty-onereview": {
    id: "beauty-onereview",
    value: "95",
    label: "per cent of reviewers with exactly one interaction",
    source:
      "Density profiling of the corpus: mean 1.07 reviews per user, median 1. This measurement is what decided the architecture.",
    checked: "2026-08-27",
    status: "verified",
  },
  "beauty-recall": {
    id: "beauty-recall",
    value: "15",
    label: "per cent retrieval recall",
    source:
      "Measured directly over 400 queries with a candidate pool of about 500: the ground-truth item is present 15.00% of the time. attribute 9.75%, semantic 3.75%, collaborative 3.00%.",
    checked: "2026-08-27",
    status: "verified",
  },
  "beauty-poison": {
    id: "beauty-poison",
    value: "87.4",
    label: "per cent of training groups poisoned",
    source:
      "Ground-truth items missed by retrieval were injected with raw_score 0.0. At 15% retrieval recall that left 87.4% of training groups with a positive scoring zero on every feature.",
    checked: "2026-08-27",
    status: "verified",
  },
  "beauty-tests": {
    id: "beauty-tests",
    value: "142",
    label: "test functions",
    source:
      "Counted as test functions across the five files in backend/tests, plus six parametrised cases and two Hypothesis property tests, so the collected count pytest reports is higher. I have counted the functions, not the collected cases.",
    checked: "2026-08-27",
    status: "verified",
  },
  "beauty-personalisation": {
    id: "beauty-personalisation",
    value: "0.991",
    label: "personalisation",
    source:
      "From reports/evaluation.json. Almost every user receives a distinct list, which is the opposite of a bestseller list and the thing the product exists to do.",
    checked: "2026-08-27",
    status: "verified",
  },
  "beauty-retrievers": {
    id: "beauty-retrievers",
    value: "four",
    label: "retrievers",
    source:
      "attribute, semantic, collaborative and popularity, all present in backend/recsys/retrieval. Note that the committed evaluation run predates the popularity retriever and records only three, so the accuracy figures on this page describe the three-retriever configuration.",
    checked: "2026-08-27",
    status: "verified",
  },
  "beauty-fairness": {
    id: "beauty-fairness",
    value: "1",
    label: "per cent of users with a real skin tone label",
    source:
      "Skin tone was recovered from review text for only about 1% of users and the rest are sampled from priors, so the fairness figures describe model behaviour across assigned labels, not real-world equity. That caveat is published with the numbers.",
    checked: "2026-08-27",
    status: "verified",
  },

  /* --------------------------------------------------- Satya Drishti, depth */

  "satya-layers": {
    id: "satya-layers",
    value: "nine",
    label: "analysis layers in the audio path",
    source:
      "Self-supervised Wav2Vec2 features, Whisper encoder features, RawNet3 raw waveform, prosodic micro-jitter, breathing detection, formant transitions, phase coherence, cross-chunk temporal tracking, and weighted ensemble fusion. Three of them carry veto power.",
    checked: "2026-08-27",
    status: "verified",
  },
  "satya-weights": {
    id: "satya-weights",
    value: "",
    label: "the models are trained and on disk",
    source:
      "XLS-R 300m at 1.27 GB, image forensics ViT checkpoints through epoch 15, a spatial ViT, an R3D temporal model and a fusion network, plus INT8 ONNX exports at roughly a quarter the size for local inference.",
    checked: "2026-08-27",
    status: "verified",
  },
  "satya-threshold": {
    id: "satya-threshold",
    value: "0.65",
    label: "spoof threshold after the demo",
    source:
      "Raised from 0.50. The biological veto's biomarker bar went from 0.90 to 0.95 and now requires the neural detector to agree above 0.65 before it can fire at all.",
    checked: "2026-08-27",
    status: "verified",
  },

  /* ----------------------------------------------------- MarketPlus, depth */

  "marketplus-shape": {
    id: "marketplus-shape",
    value: "459",
    label: "files across three apps and nine packages",
    source:
      "A Turborepo monorepo: apps for web, api and realtime, with packages including a prediction engine, an outcome tracker, an evaluation harness and an AI cost ledger.",
    checked: "2026-08-27",
    status: "verified",
  },
} as const satisfies Record<string, Claim>;

export type ClaimId = keyof typeof CLAIMS;

export function claim(id: ClaimId): Claim {
  return CLAIMS[id];
}
