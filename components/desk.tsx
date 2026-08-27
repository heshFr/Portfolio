"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/* ---------------------------------------------------------------------------
   The desk band.

   Everyone gets the same picture. On a machine that can clearly afford it, the
   picture is replaced by the live scene it was rendered from, so the upgrade is
   invisible: same camera, same composition, it just starts responding.

   The WebGL bundle is heavy enough to cost about a second of blocked main
   thread on a mid-range phone, which is a bad trade for an image that already
   shows the same thing. So it is gated on a real pointer, a wide viewport,
   enough cores, and the band actually being near the viewport.
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

  return (
    <div className="desk-band">
      <div ref={ref} className="desk-stage">
        {live ? (
          <DeskScene />
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
      <p className="shell note mt-3">
        Three of the screens, printed and dropped on a desk. On a desktop this
        is a live scene: move the pointer to lean over it. The Altus board is
        redacted at source; the other two are live products.
      </p>
    </div>
  );
}
