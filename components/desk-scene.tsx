"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer, useTexture } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { PRINTS, type Print } from "@/content/prints";

/* ---------------------------------------------------------------------------
   The desk.

   Three of the real screens, printed and dropped on a paper surface. Click one
   and it lifts off the desk, turns square-on to you and opens large enough to
   read; click again and it settles back into exactly the spot it was lying in.

   The canvas is transparent and CSS paints the desk, because three linearises
   material colours twice under this setup and a ground plane rendered in-scene
   drifts several stops away from the design token.
--------------------------------------------------------------------------- */

const PAPER = "#EFF0EA";
const INK = "#1B1E1A";

/** Where the camera rests when nothing is open. */
const CAM = new THREE.Vector3(0, 2.45, 3.05);
/** Camera elevation, so an opened print can turn square-on to the view. */
const OPEN_TILT = -Math.atan2(CAM.y, CAM.z);
/** How far along the line from the desk to the camera an opened print sits. */
const OPEN_POS = CAM.clone().multiplyScalar(0.55);
/** Total opened height in world units, border included. The band shows about
    1.35 at this camera distance, so this leaves a margin either side. */
const OPEN_H = 1.1;

/** Absolute parking slots for the two prints that are not being read: one to
    each side, so the open one stays centred whichever it is. */
const ASIDE: [number, number, number][] = [
  [-3.25, -0.05, 0.7],
  [3.25, -0.05, 0.7],
];

function PrintCard({
  print,
  index,
  active,
  asideSlot,
  onOpen,
}: {
  print: Print;
  index: number;
  active: number | null;
  /** 0 parks left, 1 parks right. Null when nothing is open. */
  asideSlot: 0 | 1 | null;
  onOpen: (i: number | null) => void;
}) {
  const tex = useTexture(print.src);
  const group = useRef<THREE.Group>(null);
  const face = useRef<THREE.MeshBasicMaterial>(null);
  const [hovered, setHovered] = useState(false);

  useMemo(() => {
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 8;
  }, [tex]);

  const isOpen = active === index;
  const aside = active !== null && !isOpen;
  const w = print.scale;
  const h = print.scale / print.aspect;
  const border = 0.055;
  const openScale = OPEN_H / (h + border * 2);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    const d = Math.min(delta, 0.05);
    const to = (a: number, b: number) => THREE.MathUtils.damp(a, b, 6.5, d);

    if (isOpen) {
      if (face.current) {
        const c = face.current.color;
        c.setScalar(THREE.MathUtils.damp(c.r, 1, 6.5, d));
      }
      g.position.x = to(g.position.x, OPEN_POS.x);
      g.position.y = to(g.position.y, OPEN_POS.y);
      g.position.z = to(g.position.z, OPEN_POS.z);
      g.rotation.x = to(g.rotation.x, OPEN_TILT);
      g.rotation.z = to(g.rotation.z, 0);
      g.scale.setScalar(to(g.scale.x, openScale));
      return;
    }

    if (face.current) {
      const want = aside ? 0.62 : 1;
      const c = face.current.color;
      c.setScalar(THREE.MathUtils.damp(c.r, want, 6.5, d));
    }
    const lift = hovered ? 0.07 : 0;
    const slot = aside && asideSlot !== null ? ASIDE[asideSlot]! : null;
    const home = slot ?? print.position;
    g.position.x = to(g.position.x, home[0]!);
    g.position.y = to(
      g.position.y,
      home[1]! + lift + Math.sin(t * 0.45 + index * 2.1) * 0.012,
    );
    g.position.z = to(g.position.z, home[2]!);
    g.rotation.x = to(g.rotation.x, -Math.PI / 2);
    g.rotation.z = to(g.rotation.z, print.rotation);
    g.scale.setScalar(to(g.scale.x, aside ? 0.58 : 1));
  });

  return (
    <group
      ref={group}
      position={print.position}
      rotation={[-Math.PI / 2, 0, print.rotation]}
      onClick={(e) => {
        e.stopPropagation();
        onOpen(isOpen ? null : index);
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = "";
      }}
    >
      {/* The card stock: a real slab with thickness, so it has an edge. */}
      <mesh castShadow={!isOpen} position={[0, 0, -0.012]}>
        <boxGeometry args={[w + border * 2, h + border * 2, 0.024]} />
        <meshPhysicalMaterial
          color={PAPER}
          roughness={0.72}
          clearcoat={0.25}
          clearcoatRoughness={0.6}
        />
      </mesh>

      {/* The screen itself, sitting just proud of the stock. */}
      <mesh position={[0, 0, 0.0012]}>
        <planeGeometry args={[w, h]} />
        <meshBasicMaterial ref={face} map={tex} toneMapped={false} />
      </mesh>
    </group>
  );
}

const ORIGIN = new THREE.Vector3(0, 0, 0);

/** Of the two prints that are not open, the earlier one parks left and the
    later one parks right, so the open print always has one either side. */
function asideSlotFor(index: number, active: number | null): 0 | 1 | null {
  if (active === null || active === index) return null;
  const others = PRINTS.map((_, i) => i).filter((i) => i !== active);
  return others.indexOf(index) === 0 ? 0 : 1;
}

function Rig({ active }: { active: number | null }) {
  const { camera, pointer } = useThree();
  const look = useRef(new THREE.Vector3(0, 0, 0));

  useFrame((_, delta) => {
    const d = Math.min(delta, 0.05);
    // With something open the camera stops following the pointer and aims at
    // the print instead, so what you opened is centred and holds still.
    const wantX = active === null ? pointer.x : 0;
    const wantY = active === null ? CAM.y - pointer.y * 0.5 : CAM.y;
    camera.position.x = THREE.MathUtils.damp(camera.position.x, wantX, 4, d);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, wantY, 4, d);

    const aim = active === null ? ORIGIN : OPEN_POS;
    look.current.x = THREE.MathUtils.damp(look.current.x, aim.x, 5, d);
    look.current.y = THREE.MathUtils.damp(look.current.y, aim.y, 5, d);
    look.current.z = THREE.MathUtils.damp(look.current.z, aim.z, 5, d);
    camera.lookAt(look.current);
  });

  return null;
}

export default function DeskScene({
  active,
  onOpen,
}: {
  active: number | null;
  onOpen: (i: number | null) => void;
}) {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(m.matches);
    const on = () => setReduced(m.matches);
    m.addEventListener("change", on);
    return () => m.removeEventListener("change", on);
  }, []);

  // Leaving the band with a print open would strand the cursor style.
  useEffect(() => () => void (document.body.style.cursor = ""), []);

  return (
    <Canvas
      shadows="soft"
      flat
      dpr={[1, 1.75]}
      camera={{ position: [CAM.x, CAM.y, CAM.z], fov: 42 }}
      gl={{
        antialias: true,
        alpha: true,
        toneMapping: THREE.NoToneMapping,
        outputColorSpace: THREE.SRGBColorSpace,
      }}
      frameloop={reduced ? "demand" : "always"}
      onPointerMissed={() => onOpen(null)}
      style={{ width: "100%", height: "100%", display: "block" }}
    >
      <ambientLight intensity={1.3} />
      <directionalLight
        position={[-4, 5.5, 2.5]}
        intensity={1.45}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-left={-6}
        shadow-camera-right={6}
        shadow-camera-top={6}
        shadow-camera-bottom={-6}
        shadow-camera-near={0.5}
        shadow-camera-far={20}
        shadow-bias={-0.0008}
        shadow-normalBias={0.02}
      />
      <directionalLight position={[4, 3, -2]} intensity={0.4} />

      {/* Generated in-process. No HDR is fetched from anywhere. */}
      <Environment resolution={128}>
        <Lightformer intensity={1.1} position={[-2, 4, 2]} scale={[6, 6, 1]} />
        <Lightformer intensity={0.5} position={[3, 3, -2]} scale={[4, 4, 1]} />
      </Environment>

      {PRINTS.map((p, i) => (
        <PrintCard
          key={p.src}
          print={p}
          index={i}
          active={active}
          asideSlot={asideSlotFor(i, active)}
          onOpen={onOpen}
        />
      ))}

      {/* Shadow-only receiver: draws where the light is blocked and nowhere
          else, so it composites straight onto the CSS surface underneath. */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[60, 60]} />
        <shadowMaterial transparent opacity={0.17} color={INK} />
      </mesh>

      <Rig active={active} />
    </Canvas>
  );
}
