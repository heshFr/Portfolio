import type { ReactNode } from "react";
import { CLAIMS, type ClaimId } from "@/content/claims";
import { Margin, Sourced } from "./claim";

/* ---------------------------------------------------------------------------
   Case study furniture. Every case study is built from these, in the same
   order, so a reader who has seen one knows where to look in the next.
--------------------------------------------------------------------------- */

export function CaseHeader({
  title,
  role,
  period,
  lede,
  link,
}: {
  title: string;
  role: string;
  period: string;
  lede: string;
  link?: { label: string; href: string };
}) {
  return (
    <section className="record pt-14 pb-10 md:pt-20">
      <p className="label mb-3">
        {role} · {period}
      </p>
      <h1 className="display text-[length:var(--text-title)]">{title}</h1>
      <p className="mt-6 text-[1.08em]">{lede}</p>
      {link ? (
        <p className="mt-4 note">
          <a href={link.href} className="link" rel="noreferrer">
            {link.label}
          </a>
        </p>
      ) : null}
    </section>
  );
}

/**
 * A titled section. The title is the document's real h2 and is set as a small
 * label that hangs in the left gutter on wide screens, so the reading column
 * stays unbroken and the structure is still skimmable down the left edge.
 */
export function Section({
  label,
  tone,
  note,
  children,
}: {
  label: string;
  tone?: "red";
  note?: ReactNode;
  children: ReactNode;
}) {
  return (
    <Sourced>
      <section className="record pb-12">
        <h2 className={`in-gutter label mb-3 ${tone === "red" ? "text-red" : ""}`}>
          {label}
        </h2>
        <div className="border-t border-rule pt-6">{children}</div>
        <Margin standing={note} />
      </section>
    </Sourced>
  );
}

/** One choice a reasonable engineer would have made differently. */
export function Decision({
  title,
  instead,
  children,
}: {
  title: string;
  instead: string;
  children: ReactNode;
}) {
  return (
    <div className="mt-9 first:mt-0">
      <h3 className="display text-[1.15rem]">{title}</h3>
      <p className="note mt-2 mb-4">
        <span className="text-ink">The obvious alternative:</span> {instead}
      </p>
      {children}
    </div>
  );
}

/** The plain line at the bottom. */
export function Stack({ children }: { children: ReactNode }) {
  return (
    <section className="record pb-12">
      <h2 className="in-gutter label mb-3">Stack</h2>
      <div className="note border-t border-rule pt-6 [&>p]:mb-0">{children}</div>
    </section>
  );
}

/** A slot for screens that do not exist publicly yet. */
export function ScreenSlot({ children }: { children: ReactNode }) {
  return (
    <div className="mt-8 border border-rule bg-panel px-5 py-6 rounded-[3px]">
      <p className="label mb-2">No screens here</p>
      <div className="note [&>p]:mb-0">{children}</div>
    </div>
  );
}

/**
 * The sources ledger. Every claim the page makes, how it was arrived at, and
 * the ones deliberately not made.
 */
export function Ledger({ ids }: { ids: readonly ClaimId[] }) {
  const records = ids.map((id) => CLAIMS[id]);
  const stated = records.filter((r) => r.status !== "withheld");
  const withheld = records.filter((r) => r.status === "withheld");

  return (
    <section className="record pb-24 pt-4">
      <h2 className="in-gutter label mb-3">Sources</h2>
      <div className="border-t border-rule pt-6">
        <p className="mb-6">
          Every figure on this page, and where it came from. The last entry is a
          claim I could have made and did not.
        </p>

        <dl className="note">
          {stated.map((r) => (
            <div key={r.id} className="border-t border-rule py-3">
              <dt className="text-ink">
                {r.value ? <span className="num">{r.value}</span> : null}
                {r.value ? " " : ""}
                {r.label}
              </dt>
              <dd className="mt-1">
                {r.source}{" "}
                <span className="text-ink-2">
                  {r.status === "reported" ? "Reported, not counted here. " : ""}
                  Checked {r.checked}.
                </span>
              </dd>
            </div>
          ))}

          {withheld.map((r) => (
            <div key={r.id} className="border-t border-rule py-3">
              <dt className="text-red">Withheld: {r.label}</dt>
              <dd className="mt-1">{r.source}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
