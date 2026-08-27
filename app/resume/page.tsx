import Image from "next/image";

export const metadata = {
  title: "Resume",
  description:
    "Hetesh Vichare's resume, readable in the page and downloadable as a PDF.",
  openGraph: { images: [{ url: "/og/about.png", width: 1200, height: 630 }] },
  alternates: { canonical: "/resume" },
};

const LINKS = [
  { label: "hetesh045@gmail.com", href: "mailto:hetesh045@gmail.com" },
  { label: "+91 89760 53362", href: "tel:+918976053362", num: true },
  { label: "github.com/heshFr", href: "https://github.com/heshFr" },
  { label: "linkedin.com/in/hetesh-vichare", href: "https://linkedin.com/in/hetesh-vichare" },
  { label: "satyadrishti.vercel.app", href: "https://satyadrishti.vercel.app" },
];

export default function Resume() {
  return (
    <div className="record pt-14 pb-24 md:pt-20">
      <h1 className="display text-[length:var(--text-title)]">Resume</h1>
      <p className="mt-6">
        Readable here, or{" "}
        <a href="/resume.pdf" download className="link">
          download the PDF
        </a>
        . One page, current as of August 2026.
      </p>

      <div className="in-margin mt-8">
        <Image
          src="/headshot.jpg"
          alt="Hetesh Vichare"
          width={900}
          height={1200}
          sizes="(min-width: 62rem) 18rem, 10rem"
          className="w-[10rem] lg:w-full max-w-[18rem] rounded-[3px]"
        />
        <ul className="note mt-4 space-y-1">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} className={`link ${l.num ? "num" : ""}`} rel="noreferrer">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8 tilt-stage">
        <div className="tilt-plate overflow-hidden">
          <object
            data="/resume.pdf#view=FitH&toolbar=1"
            type="application/pdf"
            className="block w-full h-[min(88vh,52rem)] bg-panel"
            aria-label="Hetesh Vichare resume, PDF"
          >
            {/* Reached only where the browser will not render a PDF inline,
                which is most mobile browsers. */}
            <div className="p-8">
              <p className="mb-4">
                Your browser will not display the PDF in the page.
              </p>
              <p>
                <a href="/resume.pdf" className="link" download>
                  Download it instead
                </a>
                , or read the same material on{" "}
                <a href="/about" className="link">
                  the about page
                </a>
                .
              </p>
            </div>
          </object>
        </div>
      </div>

      <p className="note mt-4">
        <a href="/resume.pdf" download className="link">
          Download PDF
        </a>
        {"  ·  "}
        <a href="/resume.pdf" className="link" target="_blank" rel="noreferrer">
          Open in a new tab
        </a>
      </p>
    </div>
  );
}
