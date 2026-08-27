import type { Metadata } from "next";
import { Bricolage_Grotesque, IBM_Plex_Mono, Source_Serif_4 } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  axes: ["opsz", "wdth"],
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
};

const NAV = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/resume.pdf", label: "Resume" },
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
            <Link href="/" className="label text-ink hover:text-red">
              Hetesh Vichare
            </Link>
            <nav>
              <ul className="flex items-baseline gap-5">
                {NAV.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="label hover:text-red">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </header>

        <main id="main" className="flex-1">
          {children}
        </main>

        <footer className="border-t border-rule mt-24">
          <div className="record !py-0">
            <div className="col-span-full py-8 note">
              <p>
                <a href="mailto:hetesh045@gmail.com" className="hover:text-red">
                  hetesh045@gmail.com
                </a>
                {"  ·  "}
                <span className="num">+91 89760 53362</span>
                {"  ·  "}
                <a href="https://github.com/heshFr" className="hover:text-red">
                  github.com/heshFr
                </a>
                {"  ·  "}
                <a href="https://linkedin.com/in/hetesh-vichare" className="hover:text-red">
                  linkedin.com/in/hetesh-vichare
                </a>
              </p>
              <p className="mt-2">Mumbai, India.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
