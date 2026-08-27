"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { CLAIMS, type Claim, type ClaimId } from "@/content/claims";

/* ---------------------------------------------------------------------------
   One open note per section. The marker sits in the prose, the note opens in
   the verification margin beside it, and falls inline below 62rem.
--------------------------------------------------------------------------- */

type Ctx = { open: ClaimId | null; toggle: (id: ClaimId) => void };

const SectionCtx = createContext<Ctx | null>(null);

export function Sourced({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState<ClaimId | null>(null);
  const toggle = (id: ClaimId) => setOpen((cur) => (cur === id ? null : id));
  return <SectionCtx.Provider value={{ open, toggle }}>{children}</SectionCtx.Provider>;
}

function useSection(): Ctx {
  const ctx = useContext(SectionCtx);
  if (!ctx) throw new Error("A source marker must sit inside <Sourced>.");
  return ctx;
}

/**
 * A figure in prose. Always set in the mono face, always clickable to reveal
 * where it came from.
 */
export function Fig({ id, children }: { id: ClaimId; children?: ReactNode }) {
  const { open, toggle } = useSection();
  const record = CLAIMS[id];
  const isOpen = open === id;
  const text = children ?? record.value;

  /* The mono face is reserved for actual numerals. A marked phrase, or a
     number written out in words, stays in the reading face. */
  const isNumeral = typeof text === "string" && /\d/.test(text);

  return (
    <button
      type="button"
      onClick={() => toggle(id)}
      aria-expanded={isOpen}
      aria-controls={`note-${id}`}
      className={`mark ${isNumeral ? "num" : ""} ${isOpen ? "mark-open" : ""}`}
    >
      {text}
    </button>
  );
}

/** The margin slot for a section. Shows `standing` until a marker is opened. */
export function Margin({ standing }: { standing?: ReactNode }) {
  const { open } = useSection();
  const record: Claim | null = open ? CLAIMS[open] : null;

  if (!record) {
    return standing ? <aside className="in-margin note mt-6">{standing}</aside> : null;
  }

  return (
    <aside id={`note-${record.id}`} className="in-margin note mt-6 note-panel">
      <p className="label mb-2">
        {record.status === "withheld" ? "Withheld" : record.label}
      </p>
      <p>{record.source}</p>
      <p className="mt-2 opacity-70">
        {record.status === "reported" ? "Reported, not counted here. " : ""}
        Checked {record.checked}.
      </p>
    </aside>
  );
}
