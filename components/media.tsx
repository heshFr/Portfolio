"use client";

import Image from "next/image";
import { useRef, useState, type ReactNode } from "react";

/* ---------------------------------------------------------------------------
   Media.

   Screens sit on a card that tilts toward the pointer in real 3D: a perspective
   on the frame, a rotation on the plate, and the caption lifted forward on its
   own Z so it separates from the image rather than sitting on it.

   The tilt is small on purpose. It is there to make a flat screenshot read as an
   object you could pick up, not to be the thing you notice. Touch devices and
   anyone who asked for reduced motion get the card flat and still.
--------------------------------------------------------------------------- */

const MAX_TILT = 4;

function useTilt() {
  const ref = useRef<HTMLDivElement>(null);
  const [t, setT] = useState({ x: 0, y: 0, on: false });

  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  function onMove(e: React.PointerEvent) {
    if (reduced || e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setT({ x: -py * MAX_TILT * 2, y: px * MAX_TILT * 2, on: true });
  }

  function onLeave() {
    setT({ x: 0, y: 0, on: false });
  }

  return { ref, t, onMove, onLeave };
}

export function Screen({
  src,
  alt,
  caption,
  href,
  linkLabel,
  priority,
  width = 1600,
  height = 1000,
}: {
  src: string;
  alt: string;
  caption: string;
  href?: string;
  linkLabel?: string;
  priority?: boolean;
  width?: number;
  height?: number;
}) {
  const { ref, t, onMove, onLeave } = useTilt();

  const plate = (
    <div
      className="tilt-plate"
      style={{
        transform: `rotateX(${t.x}deg) rotateY(${t.y}deg) translateZ(0)`,
        transition: t.on ? "transform 90ms linear" : "transform 500ms cubic-bezier(.2,.8,.2,1)",
      }}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes="(min-width: 62rem) 46rem, 100vw"
        priority={priority}
        className="block w-full h-auto rounded-[3px]"
      />
    </div>
  );

  return (
    <figure className="my-9">
      <div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        className="tilt-stage"
      >
        {href ? (
          <a href={href} rel="noreferrer" className="block rounded-[3px]">
            {plate}
          </a>
        ) : (
          plate
        )}
      </div>
      <figcaption className="note mt-4 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <span className="max-w-[46ch]">{caption}</span>
        {href && linkLabel ? (
          <a href={href} className="link shrink-0" rel="noreferrer">
            {linkLabel}
          </a>
        ) : null}
      </figcaption>
    </figure>
  );
}

/** A muted, poster-backed clip. Nothing downloads until it is asked for. */
export function Clip({
  src,
  poster,
  caption,
}: {
  src: string;
  poster: string;
  caption: string;
}) {
  const { ref, t, onMove, onLeave } = useTilt();

  return (
    <figure className="my-9">
      <div ref={ref} onPointerMove={onMove} onPointerLeave={onLeave} className="tilt-stage">
        <div
          className="tilt-plate"
          style={{
            transform: `rotateX(${t.x}deg) rotateY(${t.y}deg)`,
            transition: t.on ? "transform 90ms linear" : "transform 500ms cubic-bezier(.2,.8,.2,1)",
          }}
        >
          <video
            src={src}
            poster={poster}
            controls
            muted
            playsInline
            loop
            preload="none"
            className="block w-full h-auto rounded-[3px]"
          />
        </div>
      </div>
      <figcaption className="note mt-4">{caption}</figcaption>
    </figure>
  );
}

/** Two or three screens side by side, each tilting on its own. */
export function ScreenRow({ children }: { children: ReactNode }) {
  return <div className="my-9 grid gap-6 sm:grid-cols-2">{children}</div>;
}

export function Thumb({
  src,
  alt,
  label,
  href,
  priority,
}: {
  src: string;
  alt: string;
  label: string;
  href?: string;
  priority?: boolean;
}) {
  const { ref, t, onMove, onLeave } = useTilt();

  const body = (
    <>
      <div
        className="tilt-plate"
        style={{
          transform: `rotateX(${t.x}deg) rotateY(${t.y}deg)`,
          transition: t.on ? "transform 90ms linear" : "transform 500ms cubic-bezier(.2,.8,.2,1)",
        }}
      >
        <Image
          src={src}
          alt={alt}
          width={1600}
          height={1000}
          sizes="(min-width: 40rem) 22rem, 100vw"
          priority={priority}
          className="block w-full h-auto rounded-[3px]"
        />
      </div>
      <p className="note mt-3">{label}</p>
    </>
  );

  return (
    <div ref={ref} onPointerMove={onMove} onPointerLeave={onLeave} className="tilt-stage">
      {href ? (
        <a href={href} rel="noreferrer" className="block">
          {body}
        </a>
      ) : (
        body
      )}
    </div>
  );
}
