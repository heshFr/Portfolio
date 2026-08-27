/**
 * The work manifest. One entry per project, whether or not it has a case study
 * yet. Promoting a project to a full case study means adding its MDX page and
 * flipping `caseStudy` to true. Nothing else changes.
 */

export type Project = {
  slug: string;
  name: string;
  /** Shown on /work and in the compressed list on the home page. */
  summary: string;
  role: string;
  period: string;
  /** True once app/work/<slug>/page.mdx exists. */
  caseStudy: boolean;
  /** Ordering on /work. Lower is higher up. */
  rank: number;
  /** A screen or clip on the work index, where one exists. */
  media?: { src: string; alt: string; poster?: string; kind?: "clip"; height?: number };
  /** Anything a reader can go and look at themselves. */
  links?: { label: string; href: string }[];
  link?: { label: string; href: string };
};

export const PROJECTS: Project[] = [
  {
    slug: "altus",
    name: "Altus Corp Dashboard",
    summary:
      "The internal platform a Mumbai company runs its whole business on: work and approvals, goals, reviews, payroll, collections, hiring and training.",
    role: "Lead developer",
    period: "May 2026 to present",
    caseStudy: true,
    rank: 1,
    media: {
      src: "/media/altus-kanban-redacted.jpg",
      alt: "The Altus kanban board with task cards redacted",
      height: 1099,
    },
  },
  {
    slug: "beauty-rec",
    name: "Beauty Recommendation System and Storefront",
    summary:
      "A recommendation engine over two million real shopping interactions, with foundation shade matching from a selfie and a storefront to buy from.",
    role: "Solo build",
    period: "2026",
    caseStudy: true,
    rank: 2,
  },
  {
    slug: "satya-drishti",
    name: "Satya Drishti",
    summary:
      "Catches AI-faked voices, faces and coerced language during a live call, with every model running on the user's own machine.",
    role: "Founder and sole developer",
    period: "2026",
    caseStudy: true,
    rank: 3,
    link: { label: "satyadrishti.vercel.app", href: "https://satyadrishti.vercel.app" },
    media: { src: "/media/satya-landing.jpg", alt: "The Satya Drishti landing page" },
    links: [
      { label: "satyadrishti.vercel.app", href: "https://satyadrishti.vercel.app" },
      { label: "Scanner", href: "https://satyadrishti.vercel.app/scanner" },
      { label: "Call protection", href: "https://satyadrishti.vercel.app/call-protection" },
    ],
  },
  {
    slug: "marketplus",
    name: "MarketPlus",
    summary:
      "A live markets dashboard for US and international stocks, crypto, forex and commodities. It writes an explanation of why a price moved, then scores its own forecasts against what actually happened and corrects its confidence from the result.",
    role: "Solo build",
    period: "Launching Q3 2026",
    caseStudy: false,
    rank: 4,
    media: {
      src: "/media/marketplus-globe.mp4",
      poster: "/media/marketplus-globe-poster.jpg",
      alt: "The MarketPlus globe",
      kind: "clip",
    },
  },
  {
    slug: "monte-karlo",
    name: "Monte Karlo",
    summary:
      "Scores which of your relationships are quietly going cold, then simulates which single action is most likely to bring one back.",
    role: "Solo build",
    period: "2026",
    caseStudy: false,
    rank: 5,
    link: { label: "github.com/heshFr/MonteKarlo", href: "https://github.com/heshFr/MonteKarlo" },
    links: [{ label: "github.com/heshFr/MonteKarlo", href: "https://github.com/heshFr/MonteKarlo" }],
  },
  {
    slug: "silent-drift",
    name: "Silent Drift",
    summary:
      "Forecasts seawater creeping into coastal groundwater through 2030 for Indian districts, with a simulator that costs out each fix.",
    role: "Team of two, DUHacks 5.0",
    period: "2026",
    caseStudy: false,
    rank: 6,
  },
  {
    slug: "heshclicks",
    name: "HeshClicks",
    summary:
      "A desktop auto-clicker. You set the clicks per second and the number of clicks, and it does exactly that.",
    role: "Solo build",
    period: "2026",
    caseStudy: false,
    rank: 7,
  },
];

export const FLAGSHIPS = PROJECTS.filter((p) => p.rank <= 2);

export function projectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}
