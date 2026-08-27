import Link from "next/link";
import { Clip, Screen, ScreenRow, Thumb } from "@/components/media";
import { Typeset } from "@/components/typeset";
import { PROJECTS } from "@/content/projects";

export const metadata = {
  title: "Work",
  description:
    "Everything I have built: the Altus Corp platform, a beauty recommendation engine, a live deepfake call screener, and four smaller projects.",
  openGraph: { images: [{ url: "/og/work.png", width: 1200, height: 630 }] },
  alternates: { canonical: "/work" },
};

export default function WorkIndex() {
  return (
    <div className="record pt-14 pb-24 md:pt-20">
      <h1 className="display text-[length:var(--text-title)]">Work</h1>
      <p className="mt-6">
        Three of these have case studies. The rest are here because they are
        real and finished, not because they need a page.
      </p>

      <aside className="in-margin note mt-6">
        <p className="label mb-2">How to read this</p>
        <p>
          The three with a link go into architecture, decisions and what broke.
          Screens live on those pages. MarketPlus has no case study yet, so its
          screens are at the foot of this one.
        </p>
      </aside>

      <ul className="mt-10 border-t border-rule">
        {PROJECTS.map((p) => (
          <li key={p.slug} className="border-b border-rule py-7">
            <div className="flex flex-wrap items-baseline justify-between gap-x-5 gap-y-1">
              {p.caseStudy ? (
                <Link href={`/work/${p.slug}`} className="display text-[1.15rem] link">
                  {p.name}
                </Link>
              ) : (
                <h2 className="display text-[1.15rem]">{p.name}</h2>
              )}
              <p className="label">
                {p.role} · {p.period}
              </p>
            </div>

            <p className="mt-2">
              <Typeset>{p.summary}</Typeset>
            </p>

            {p.caseStudy || p.links ? (
              <p className="note mt-3 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                {p.caseStudy ? (
                  <Link href={`/work/${p.slug}`} className="link">
                    Read the case study
                  </Link>
                ) : null}
                {(p.links ?? []).map((l) => (
                  <a key={l.href} href={l.href} className="link" rel="noreferrer">
                    {l.label}
                  </a>
                ))}
              </p>
            ) : null}
          </li>
        ))}
      </ul>

      <h2 className="in-gutter label mb-3 mt-14">MarketPlus</h2>
      <div className="border-t border-rule pt-6">
        <p className="mb-2">
          It has no case study yet, so here is what it looks like instead. A
          Turborepo monorepo whose interesting part is not the dashboard: a
          prediction engine that emits a calibrated confidence, and an outcome
          tracker that resolves every forecast against the real price and
          corrects that confidence from the result.
        </p>
        <ScreenRow>
          <Thumb
            src="/media/marketplus-dashboard.jpg"
            alt="The MarketPlus dashboard"
            label="Dashboard: an event paired with the symbols the model thinks will respond."
          />
          <Thumb
            src="/media/marketplus-track-record.jpg"
            alt="The MarketPlus track record screen"
            label="Track record: hits and misses, which is the screen most of these products do not ship."
          />
        </ScreenRow>
        <Screen
          src="/media/marketplus-home.jpg"
          alt="The MarketPlus home screen"
          caption="The home screen."
        />
      </div>

      <h2 className="in-gutter label mb-3 mt-14">Elsewhere</h2>
      <div className="border-t border-rule pt-6 note">
        <p className="flex flex-wrap gap-x-5 gap-y-2">
          <a href="https://github.com/heshFr" className="link" rel="me noreferrer">
            github.com/heshFr
          </a>
          <a
            href="https://linkedin.com/in/hetesh-vichare"
            className="link"
            rel="me noreferrer"
          >
            linkedin.com/in/hetesh-vichare
          </a>
          <a href="https://satyadrishti.vercel.app" className="link" rel="noreferrer">
            satyadrishti.vercel.app
          </a>
          <Link href="/resume" className="link">
            Resume
          </Link>
          <a href="mailto:hetesh045@gmail.com" className="link">
            hetesh045@gmail.com
          </a>
        </p>
      </div>
    </div>
  );
}
