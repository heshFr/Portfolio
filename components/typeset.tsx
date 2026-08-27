import { Fragment } from "react";

/** Digit runs, keeping internal separators but never a trailing one. */
const NUMERAL = /(\d+(?:[.,]\d+)*)/g;

/* A separate, non-global test: `NUMERAL.test` would carry lastIndex between
   calls and skip every other match. */
const STARTS_WITH_DIGIT = /^\d/;

/**
 * Sets every numeral in a string in the mono face, so the rule holds in copy
 * that comes from data rather than from JSX. Prose stays in the reading face.
 */
export function Typeset({ children }: { children: string }) {
  return (
    <>
      {children.split(NUMERAL).map((part, i) =>
        STARTS_WITH_DIGIT.test(part) ? (
          <span key={i} className="num">
            {part}
          </span>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}
