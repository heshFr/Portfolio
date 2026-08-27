import Link from "next/link";
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
          The others are one line each, which is all they need.
        </p>
      </aside>

      <ul className="mt-10 border-t border-rule">
        {PROJECTS.map((p) => (
          <li key={p.slug} className="border-b border-rule py-5">
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
            {p.link ? (
              <p className="mt-2 note">
                <a href={p.link.href} className="link" rel="noreferrer">
                  {p.link.label}
                </a>
              </p>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
}
