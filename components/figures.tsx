import { Fragment, type ReactNode } from "react";

/* ---------------------------------------------------------------------------
   Figures.

   These exist because two of the three case studies describe systems that have
   a shape, and prose is a bad way to show a shape. They are built from the same
   material as the rest of the site: hairlines, the mono face for anything a
   machine produced, and the correction red used once per figure at most.

   All HTML and CSS rather than SVG, so they reflow at 360px, stay selectable,
   and are read correctly out loud.
--------------------------------------------------------------------------- */

export function Figure({
  caption,
  children,
}: {
  caption: string;
  children: ReactNode;
}) {
  return (
    <figure className="my-9">
      <div className="border-y border-ink py-7">{children}</div>
      <figcaption className="note mt-3">{caption}</figcaption>
    </figure>
  );
}

/* --------------------------------------------------------------- Pipeline --
   A left-to-right rail with the count surviving each stage. The numbers do the
   narrowing; the geometry does not pretend to be to scale.
--------------------------------------------------------------------------- */

type Stage = { count: string; unit: string; stage: string; parts: string[] };

export function Pipeline({ stages }: { stages: Stage[] }) {
  return (
    /* Stacks below 40rem rather than scrolling sideways: a figure that hides
       half of itself off-screen is worse than one that changes shape. */
    <ol className="flex flex-col sm:flex-row sm:items-stretch">
      {stages.map((s, i) => (
        <Fragment key={s.stage}>
          {i > 0 ? (
            <li aria-hidden="true" className="shrink-0 sm:w-8 sm:pt-[0.6rem]">
              <div className="ml-[3px] h-5 w-px bg-rule sm:ml-0 sm:h-px sm:w-full" />
            </li>
          ) : null}
          <li className="min-w-0 flex-1">
            <p className="num text-[1.45rem] leading-none">{s.count}</p>
            <p className="note mt-1">{s.unit}</p>
            <p className="label mt-4 border-t border-ink pt-3">{s.stage}</p>
            <ul className="note mt-2 space-y-1">
              {s.parts.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </li>
        </Fragment>
      ))}
    </ol>
  );
}

/* ------------------------------------------------------------ Comparison --
   One measure, several configurations. A single series, so no legend: the
   caption names the measure and every bar is labelled with its own value.
   The highlighted bar carries a written label too, never colour alone.
--------------------------------------------------------------------------- */

type Row = { label: string; value: number; display: string; mark?: string };

export function Comparison({ rows, max }: { rows: Row[]; max: number }) {
  return (
    <div className="space-y-3">
      {rows.map((r) => (
        <div key={r.label} className="grid grid-cols-[1fr] gap-1">
          <div className="flex items-baseline justify-between gap-4">
            <p className={r.mark ? "text-red" : undefined}>
              {r.label}
              {r.mark ? (
                <span className="label text-red ml-2">{r.mark}</span>
              ) : null}
            </p>
            <p className="num shrink-0">{r.display}</p>
          </div>
          <div
            className="h-[7px]"
            style={{
              width: `${Math.max((r.value / max) * 100, 1.2)}%`,
              background: r.mark ? "var(--color-red)" : "var(--color-ink)",
              borderRadius: "0 3px 3px 0",
            }}
          />
        </div>
      ))}
    </div>
  );
}

/* ---------------------------------------------------------------- Layers --
   A stack where some rows have a power the others do not. The ones that do are
   named in the row, so the red is reinforcement rather than the only signal.
--------------------------------------------------------------------------- */

type Layer = { n: number; name: string; what: string; veto?: boolean };

export function Layers({ layers }: { layers: Layer[] }) {
  return (
    <ol>
      {layers.map((l) => (
        <li
          key={l.n}
          className="grid grid-cols-[1.6rem_1fr] gap-x-3 border-t border-rule first:border-t-0 py-2 items-baseline"
        >
          <span className="num text-ink-2">{l.n}</span>
          <span>
            <span className={l.veto ? "text-red" : undefined}>{l.name}</span>
            <span className="note"> {l.what}</span>
            {l.veto ? (
              <span className="label text-red ml-2 whitespace-nowrap">
                can veto
              </span>
            ) : null}
          </span>
        </li>
      ))}
    </ol>
  );
}

/* ------------------------------------------------------------------ Chain --
   A request path. Each hop states what it checks, because the point of the
   figure is that the rule is enforced below the application code.
--------------------------------------------------------------------------- */

type Hop = { at: string; does: string; note?: string };

export function Chain({ hops }: { hops: Hop[] }) {
  return (
    <ol className="space-y-0">
      {hops.map((h, i) => (
        <li key={h.at}>
          {i > 0 ? (
            <div aria-hidden="true" className="ml-[0.45rem] h-5 w-px bg-rule" />
          ) : null}
          <div className="grid grid-cols-[1rem_1fr] gap-x-3 items-baseline">
            <span
              aria-hidden="true"
              className="w-[7px] h-[7px] rounded-full bg-ink translate-y-[-0.15em] justify-self-start"
            />
            <div>
              <p className="label">{h.at}</p>
              <p className="mt-1">{h.does}</p>
              {h.note ? <p className="note mt-1">{h.note}</p> : null}
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}

/* ------------------------------------------------------------------ Scale --
   215 tables is a number nobody can picture. One mark per table, with the ones
   that exist only to keep history marked, so the shape of the decision is
   visible rather than asserted.
--------------------------------------------------------------------------- */

export function Scale({
  total,
  marked,
  markedLabel,
  restLabel,
}: {
  total: number;
  marked: number;
  markedLabel: string;
  restLabel: string;
}) {
  return (
    <div>
      <div
        className="flex flex-wrap gap-[3px]"
        role="img"
        aria-label={`${total} marks, of which ${marked} are ${markedLabel}`}
      >
        {Array.from({ length: total }, (_, i) => (
          <span
            key={i}
            className="block w-[5px] h-[13px]"
            style={{
              background: i < marked ? "var(--color-red)" : "var(--color-ink)",
              opacity: i < marked ? 1 : 0.32,
            }}
          />
        ))}
      </div>
      <p className="note mt-4 flex flex-wrap gap-x-5 gap-y-1">
        <span className="inline-flex items-baseline gap-2">
          <span
            aria-hidden="true"
            className="inline-block w-[5px] h-[9px] bg-red translate-y-[1px]"
          />
          <span className="num">{marked}</span> {markedLabel}
        </span>
        <span className="inline-flex items-baseline gap-2">
          <span
            aria-hidden="true"
            className="inline-block w-[5px] h-[9px] bg-ink opacity-[0.32] translate-y-[1px]"
          />
          <span className="num">{total - marked}</span> {restLabel}
        </span>
      </p>
    </div>
  );
}
