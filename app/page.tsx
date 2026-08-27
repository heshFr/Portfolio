import Image from "next/image";
import Link from "next/link";
import { Fig, Margin, Sourced } from "@/components/claim";
import { Desk } from "@/components/desk";
import { Comparison } from "@/components/figures";
import { Typeset } from "@/components/typeset";
import { PROJECTS } from "@/content/projects";

const OTHERS = PROJECTS.filter((p) => p.rank >= 3);

export default function Home() {
  return (
    <>
      {/* ------------------------------------------------------------- Hero */}
      <Sourced>
        <section className="record pt-16 pb-20 md:pt-24 md:pb-28">
          <h1 className="display text-[length:var(--text-hero)] max-w-[22ch]">
            I build the software companies run on internally.
          </h1>
          <p className="mt-7">
            Systems that hold work, approvals, payroll and records, where being
            wrong is expensive and every change has to leave a trace. I am
            Hetesh Vichare. I lead the build of one of those at Altus Corp in
            Mumbai, alongside a data science degree. Outside both, I build AI
            products end to end, model to interface.
          </p>
          <Margin
            standing={
              <>
                <Image
                  src="/headshot.jpg"
                  alt="Hetesh Vichare"
                  width={900}
                  height={1200}
                  sizes="(min-width: 62rem) 18rem, 9rem"
                  priority
                  className="w-[9rem] lg:w-full max-w-[18rem] rounded-[3px] mb-4"
                />
                <p className="label mb-2">About the figures</p>
                <p>
                  Every number on this site is a claim with a source. The ones
                  underlined in red can be opened to show where they came from
                  and when they were last checked.
                </p>
              </>
            }
          />
        </section>
      </Sourced>

      <Desk />

      {/* ------------------------------------------------------------ Altus */}
      <Sourced>
        <section className="record pb-20 md:pb-24">
          <p className="in-gutter label mb-3">Flagship</p>

          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-t border-rule pt-5">
            <h2 className="display text-[1.4rem]">Altus Corp Dashboard</h2>
            <p className="label">Lead developer, May 2026 to now</p>
          </div>

          <p className="mt-5">
            In <Fig id="altus-months" /> this went from a task tracker to the
            system the whole company runs on: <Fig id="altus-screens" /> screens,{" "}
            <Fig id="altus-tables" /> database tables and about{" "}
            <Fig id="altus-lines" /> lines of code, with{" "}
            <Fig id="altus-crons" /> jobs that run on their own overnight,
            delivered as a web app and two mobile apps.
          </p>
          <p className="mt-5">
            It replaced about <Fig id="altus-spreadsheets" /> spreadsheets. It
            now holds work assignment and approvals, quarterly goals,
            performance reviews, payroll, client collections, hiring from the
            first interview through to exit paperwork, and staff training. Real
            money moves through the payroll and the collections every month,
            which sets the tolerance for getting it wrong.
          </p>
          <p className="mt-5">
            <Link href="/work/altus" className="link">
              How it was built
            </Link>
          </p>

          <Margin
            standing={
              <>
                <p className="label mb-2">Counted from</p>
                <p>
                  The production repository, on 27 Aug 2026. It is a private,
                  invite-only system, so there is no public URL to check it
                  against and the sources are the next best thing.
                </p>
              </>
            }
          />
        </section>
      </Sourced>

      {/* ----------------------------------------------------------- Beauty */}
      <Sourced>
        <section className="record pb-20 md:pb-24">
          <p className="in-gutter label mb-3">Flagship</p>

          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-t border-rule pt-5">
            <h2 className="display text-[1.4rem]">
              Beauty recommendation system and storefront
            </h2>
            <p className="label">Solo build, 2026</p>
          </div>

          <p className="mt-5">
            A recommendation engine trained on <Fig id="beauty-interactions" />{" "}
            real Amazon shopping interactions across{" "}
            <Fig id="beauty-products" /> beauty products, answering in about{" "}
            <Fig id="beauty-latency" /> milliseconds, paired with a storefront
            you can actually buy from.
          </p>
          <p className="mt-5">
            It matches foundation shades to skin tone from a selfie using real
            colour science, and says so when it cannot be confident, because a
            wrong shade is the main reason beauty orders get sent back.
          </p>
          <p className="mt-5">
            It also{" "}
            <Fig id="beauty-baseline">
              loses to a list of the twenty most-reviewed products
            </Fig>
            . That is what the evaluation produced, so that is what I published,
            with the diagnosis of why.
          </p>
          <div className="mt-7 border-y border-ink py-6">
            <Comparison
              max={0.0504}
              rows={[
                { label: "Twenty most-reviewed products, one list for everyone", value: 0.0504, display: "0.0504" },
                { label: "Semantic retrieval alone", value: 0.0127, display: "0.0127" },
                { label: "The full pipeline", value: 0.0116, display: "0.0116", mark: "as shipped" },
              ]}
            />
          </div>
          <p className="note mt-3">hit@20, higher is better. The full result set is on the case study.</p>

          <p className="mt-5">
            <Link href="/work/beauty-rec" className="link">
              How it was built, and what the numbers actually say
            </Link>
          </p>

          <Margin
            standing={
              <>
                <p className="label mb-2">Checkable</p>
                <p>
                  Every figure here comes out of the evaluation run committed to
                  the repository. Clone it and you get the same numbers.
                </p>
              </>
            }
          />
        </section>
      </Sourced>

      {/* ------------------------------------------------------------- Also */}
      <section className="record pb-24">
        <p className="in-gutter label mb-3">Also</p>
        <ul className="border-t border-rule">
          {OTHERS.map((p) => (
            <li key={p.slug} className="border-b border-rule py-4">
              <div className="flex flex-wrap items-baseline justify-between gap-x-5 gap-y-1">
                {p.caseStudy ? (
                  <Link
                    href={`/work/${p.slug}`}
                    className="display text-[1.05rem] link"
                  >
                    {p.name}
                  </Link>
                ) : (
                  <h3 className="display text-[1.05rem]">{p.name}</h3>
                )}
                <p className="label">{p.period}</p>
              </div>
              <p className="mt-1 text-[0.95em]">
                <Typeset>{p.summary}</Typeset>
              </p>
            </li>
          ))}
        </ul>
        <p className="mt-6">
          <Link href="/work" className="link">
            All of it, in one list
          </Link>
        </p>
      </section>
    </>
  );
}
