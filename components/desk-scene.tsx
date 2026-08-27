"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  Lightformer,
  useTexture,
} from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

/* ---------------------------------------------------------------------------
   The desk.

   Three of the real screens, printed and dropped on a paper surface, lit from
   above left. Actual WebGL: a perspective camera, a physical material with a
   paper-white border, soft contact shadows under each print, and a small
   locally generated environment so the card stock catches light at its edges
   instead of looking like a flat sticker.

   The camera drifts with the pointer rather than the cards spinning, which is
   what makes it read as a real surface you are leaning over.
--------------------------------------------------------------------------- */

const PAPER = "#EFF0EA";
const INK = "#1B1E1A";

type Print = {
  src: string;
  aspect: number;
  position: [number, number, number];
  rotation: number;
  scale: number;
};

const PRINTS: Print[] = [
  { src: "/media/altus-kanban-redacted.jpg", aspect: 1600 / 1099, position: [-1.62, 0.09, 0.32], rotation: 0.14, scale: 2.75 },
  { src: "/media/satya-landing.jpg", aspect: 1600 / 1000, position: [1.48, 0.17, -0.52], rotation: -0.09, scale: 2.5 },
  { src: "/media/marketplus-dashboard.jpg", aspect: 1600 / 1400, position: [0.28, 0.25, 1.16], rotation: 0.05, scale: 2.0 },
];

function PrintCard({ print, index }: { print: Print; index: number }) {
  const tex = useTexture(print.src);
  const group = useRef<THREE.Group>(null);

  useMemo(() => {
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 8;
  }, [tex]);

  const w = print.scale;
  const h = print.scale / print.aspect;
  const border = 0.055;

  useFrame((state) => {
    if (!group.current) return;
    // A slow, barely-there breathe so the surface is not dead. Different phase
    // per card so they never move together.
    const t = state.clock.elapsedTime;
    group.current.position.y =
      print.position[1] + Math.sin(t * 0.45 + index * 2.1) * 0.012;
  });

  return (
    <group
      ref={group}
      position={print.position}
      rotation={[-Math.PI / 2, 0, print.rotation]}
    >
      {/* The card stock: a real slab with thickness, so it has an edge. */}
      <mesh castShadow position={[0, 0, -0.012]}>
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
        <meshBasicMaterial map={tex} toneMapped={false} />
      </mesh>
    </group>
  );
}

function Rig() {
  const { camera, pointer } = useThree();
  const target = useMemo(() => new THREE.Vector3(0, 0, 0), []);

  useFrame(() => {
    // Lean over the desk toward the pointer. Damped, never snapping.
    camera.position.x += (pointer.x * 1.0 - camera.position.x) * 0.035;
    camera.position.y += (2.45 - pointer.y * 0.5 - camera.position.y) * 0.035;
    camera.lookAt(target);
  });

  return null;
}

function Scene() {
  return (
    <>
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
        <PrintCard key={p.src} print={p} index={i} />
      ))}

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[60, 60]} />
        <shadowMaterial transparent opacity={0.17} color={INK} />
      </mesh>

      <ContactShadows
        position={[0, 0.004, 0]}
        opacity={0.36}
        scale={10}
        blur={1.1}
        far={0.5}
        resolution={1024}
        color={INK}
      />

      <Rig />
    </>
  );
}

export default function DeskScene() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(m.matches);
    const on = () => setReduced(m.matches);
    m.addEventListener("change", on);
    return () => m.removeEventListener("change", on);
  }, []);

  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 2.45, 3.05], fov: 42 }}
      flat
      gl={{
        antialias: true,
        alpha: true,
        toneMapping: THREE.NoToneMapping,
        outputColorSpace: THREE.SRGBColorSpace,
      }}
      frameloop={reduced ? "demand" : "always"}
      style={{ width: "100%", height: "100%", display: "block" }}
    >
      <Scene />
    </Canvas>
  );
}
