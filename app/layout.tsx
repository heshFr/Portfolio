import type { Metadata } from "next";
import { Bricolage_Grotesque, IBM_Plex_Mono, Source_Serif_4 } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-source-serif",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hetesh.dev"),
  title: {
    default: "Hetesh Vichare",
    template: "%s / Hetesh Vichare",
  },
  description:
    "I build the software companies run on internally: systems that hold work, approvals, payroll and records.",
  openGraph: {
    type: "website",
    siteName: "Hetesh Vichare",
    locale: "en_IN",
    images: [{ url: "/og/home.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
};

const NAV = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bricolage.variable} ${sourceSerif.variable} ${plexMono.variable}`}>
      <body className="min-h-screen flex flex-col">
        <a
          href="#main"
          className="label sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:bg-panel focus:px-3 focus:py-2"
        >
          Skip to content
        </a>

        <header className="border-b border-rule">
          <div className="shell flex items-baseline justify-between gap-6 py-4">
            <Link href="/" className="label text-ink hover:text-red inline-block py-1.5">
              Hetesh Vichare
            </Link>
            <nav>
              <ul className="flex items-baseline gap-5">
                {NAV.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="label hover:text-red inline-block py-1.5">
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/resume"
                    className="label hover:text-red inline-block py-1.5"
                  >
                    Resume
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </header>

        <main id="main" className="flex-1">
          {children}
        </main>

        <footer className="border-t border-rule mt-8">
          <div className="shell py-7 note flex flex-wrap gap-x-6 gap-y-2 justify-between items-baseline">
            <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <a href="mailto:hetesh045@gmail.com" className="link py-1">
                hetesh045@gmail.com
              </a>
              <span aria-hidden="true">·</span>
              <a href="tel:+918976053362" className="link num py-1">
                +91 89760 53362
              </a>
              <span aria-hidden="true">·</span>
              <a href="https://github.com/heshFr" className="link py-1" rel="me noreferrer">
                github.com/heshFr
              </a>
              <span aria-hidden="true">·</span>
              <a
                href="https://linkedin.com/in/hetesh-vichare"
                className="link py-1"
                rel="me noreferrer"
              >
                linkedin.com/in/hetesh-vichare
              </a>
            </p>
            <p>Mumbai, India.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
