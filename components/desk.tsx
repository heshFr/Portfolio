"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { PRINTS } from "@/content/prints";

/* ---------------------------------------------------------------------------
   The desk band.

   Everyone gets the same picture. On a machine that can clearly afford it, the
   picture is replaced by the live scene it was rendered from, so the upgrade is
   invisible: same camera, same composition, it just starts responding and the
   prints become things you can open.

   The WebGL bundle costs about a second of blocked main thread on a mid-range
   phone, which is a bad trade for an image that already shows the same thing.
   So it is gated on a real pointer, a wide viewport, enough cores, and the band
   actually being near the viewport.
--------------------------------------------------------------------------- */

const DeskScene = dynamic(() => import("./desk-scene"), { ssr: false });

function deviceCanAfford() {
  if (typeof window === "undefined") return false;
  try {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
    // A coarse pointer means a touch device, where this costs the most and
    // buys the least: there is no pointer to lean with.
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return false;
    if (!window.matchMedia("(min-width: 62rem)").matches) return false;
    if ((navigator.hardwareConcurrency ?? 2) < 4) return false;
    const c = document.createElement("canvas");
    return Boolean(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

export function Desk() {
  const ref = useRef<HTMLDivElement>(null);
  const [live, setLive] = useState(false);
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    if (!ref.current || !deviceCanAfford()) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          setLive(true);
          io.disconnect();
        }
      },
      { rootMargin: "120px" },
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  const open = useCallback((i: number | null) => setActive(i), []);
  const shown = active === null ? null : PRINTS[active];

  return (
    <div className="desk-band">
      <div ref={ref} className="desk-stage">
        {live ? (
          <DeskScene active={active} onOpen={open} />
        ) : (
          <Image
            src="/media/desk-poster.jpg"
            alt="Three of the screens, printed and dropped on a desk: the redacted Altus board, the Satya Drishti landing page, and the MarketPlus dashboard"
            width={2000}
            height={650}
            sizes="100vw"
            className="h-full w-full object-cover"
          />
        )}
      </div>

      <div className="shell mt-3 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        {shown ? (
          <p className="note max-w-[62ch]">
            <span className="text-ink">{shown.label}.</span> {shown.note}
          </p>
        ) : (
          <p className="note max-w-[62ch]">
            Three of the screens, printed and dropped on a desk. On a desktop
            this is live: lean on it with the pointer, and click a print to open
            it.
          </p>
        )}

        <p className="note flex flex-wrap items-baseline gap-x-4 gap-y-1">
          {/* The real controls. They work with a keyboard, they work when
              WebGL never loads, and they drive the same state the scene does. */}
          {PRINTS.map((p, i) => (
            <button
              key={p.src}
              type="button"
              onClick={() => setActive(active === i ? null : i)}
              aria-pressed={active === i}
              className={`link ${active === i ? "text-red" : ""}`}
            >
              {p.label}
            </button>
          ))}
          {shown?.href ? (
            shown.href.startsWith("/") ? (
              <Link href={shown.href} className="link text-ink">
                {shown.linkLabel}
              </Link>
            ) : (
              <a href={shown.href} className="link text-ink" rel="noreferrer">
                {shown.linkLabel}
              </a>
            )
          ) : null}
          {active !== null ? (
            <button type="button" onClick={() => setActive(null)} className="link">
              Close
            </button>
          ) : null}
        </p>
      </div>
    </div>
  );
}
