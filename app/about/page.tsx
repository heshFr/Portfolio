import Image from "next/image";

export const metadata = {
  title: "About",
  description:
    "Hetesh Vichare, Mumbai. Lead developer on Altus Corp's internal platform, second-year data science student, and I build AI products end to end.",
  openGraph: { images: [{ url: "/og/about.png", width: 1200, height: 630 }] },
  alternates: { canonical: "/about" },
};

export default function About() {
  return (
    <div className="record pt-14 pb-24 md:pt-20">
      <h1 className="display text-[length:var(--text-title)]">About</h1>

      <div className="in-margin mt-8">
        <Image
          src="/headshot.jpg"
          alt="Hetesh Vichare"
          width={900}
          height={1200}
          sizes="(min-width: 62rem) 18rem, 12rem"
          className="w-[12rem] lg:w-full max-w-[18rem] rounded-[3px]"
          priority
        />
        <p className="note mt-3">
          Hetesh Vichare. Mumbai, India.
        </p>
      </div>

      <p className="mt-7">
        I am a second-year B.Sc. Data Science student at Patkar-Varde College in
        Mumbai, and since May 2026 I have been the lead developer on the
        internal platform Altus Corp runs its business on. Outside that I build
        AI products end to end, from the model to the interface someone
        actually uses.
      </p>

      <h2 className="in-gutter label mb-3 mt-12">How I work</h2>
      <div className="border-t border-rule pt-6">
        <p className="mb-5">
          I own things end to end. On Altus I am the only developer across a web
          app and two mobile apps, and I ship to production continuously rather
          than in releases. That is not a preference so much as the only way a
          system that people depend on daily stays close to what they need.
        </p>
        <p className="mb-5">
          I measure before I design, and I publish what the measurement said
          rather than what I hoped it would say. The recommendation engine on
          this site loses to a bestseller list, and that result is on its case
          study in a table, because a number you only quote when it flatters you
          is not a number, it is marketing.
        </p>
        <p className="mb-5">
          I write things down. Every project here has an architecture document,
          a debugging log and an evaluation with its caveats attached. It is
          also why this site can show you where each of its figures came from,
          and why one figure is marked as withheld rather than estimated.
        </p>
        <p>
          The work I like best is the kind where being wrong is expensive.
          Payroll, receivables, approval chains, fraud detection. Systems where
          somebody has to be able to ask why, months later, and get a real
          answer.
        </p>
      </div>

      <h2 className="in-gutter label mb-3 mt-12">What I am looking for</h2>
      <div className="border-t border-rule pt-6">
        <p className="mb-5">
          Backend and full-stack work on systems that hold real state, or
          applied AI work where the model has to survive contact with the actual
          input distribution rather than the benchmark. I am comfortable being
          the person responsible for something in production.
        </p>
        <p>
          The fastest way to reach me is{" "}
          <a href="mailto:hetesh045@gmail.com" className="link">
            hetesh045@gmail.com
          </a>
          . My resume is{" "}
          <a href="/resume.pdf" className="link">
            here as a PDF
          </a>
          , and the code is on{" "}
          <a href="https://github.com/heshFr" className="link" rel="noreferrer">
            GitHub
          </a>
          .
        </p>
      </div>

      <h2 className="in-gutter label mb-3 mt-12">Elsewhere</h2>
      <div className="border-t border-rule pt-6 note">
        <p>
          Hackathons: DUHacks 5.0, DevFest Goa, BeachHack S7, ETHDenver 2026.
          Certifications: Deloitte Data Analytics, HackerRank Python, ScholarHat
          .NET. Languages: English, Hindi, Marathi.
        </p>
      </div>
    </div>
  );
}
