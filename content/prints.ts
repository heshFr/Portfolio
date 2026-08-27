/**
 * The three screens on the desk. Shared by the WebGL scene and by the plain
 * HTML controls that sit over it, so the keyboard path and the pointer path can
 * never disagree about what is on the desk or what order it is in.
 */

export type Print = {
  src: string;
  alt: string;
  /** Named in the caption and on the control that opens it. */
  label: string;
  /** What opening it actually shows, for the caption. */
  note: string;
  href?: string;
  linkLabel?: string;
  aspect: number;
  position: [number, number, number];
  rotation: number;
  scale: number;
};

export const PRINTS: Print[] = [
  {
    src: "/media/altus-kanban-redacted.jpg",
    alt: "The Altus kanban board with every task card redacted",
    label: "The Altus board",
    note: "542 tasks across four status columns. Every card is redacted at source: they carry colleagues' names and client payment chases.",
    href: "/work/altus",
    linkLabel: "Read the case study",
    aspect: 1600 / 1099,
    position: [-1.62, 0.09, 0.32],
    rotation: 0.14,
    scale: 2.75,
  },
  {
    src: "/media/satya-landing.jpg",
    alt: "The Satya Drishti landing page",
    label: "Satya Drishti",
    note: "The live deployment. Catches AI-faked voices and faces during a call, with every model running on the user's own machine.",
    href: "https://satyadrishti.vercel.app",
    linkLabel: "satyadrishti.vercel.app",
    aspect: 1600 / 1000,
    position: [1.48, 0.17, -0.52],
    rotation: -0.09,
    scale: 2.5,
  },
  {
    src: "/media/marketplus-dashboard.jpg",
    alt: "The MarketPlus dashboard",
    label: "MarketPlus",
    note: "An event paired with the symbols the model thinks will respond, and a track record that scores whether it was right.",
    href: "/work",
    linkLabel: "See the rest of it",
    aspect: 1600 / 1400,
    position: [0.28, 0.25, 1.16],
    rotation: 0.05,
    scale: 2.0,
  },
];
