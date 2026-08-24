"use client";

import { useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import {
  NORDIA_PATH_DARK,
  NORDIA_PATH_LIGHT,
} from "@/components/brand/nordia-mark";

/**
 * The mark, extruded.
 *
 * Motion follows the Premium archetype from the motion-design skill: a single
 * signature curve (0.4, 0, 0.2, 1), a dramatic-reveal duration (~1.1s), zero
 * overshoot. Three layers are present on purpose —
 *   primary  : the two halves travel in from opposite sides and lock together
 *   secondary: each half un-tilts as it lands (follow-through on the arrival)
 *   ambient  : a slow sine drift plus pointer parallax once the entrance ends
 */

/** Signature easing, sampled as a curve rather than a CSS string. */
const premium = new THREE.CubicBezierCurve(
  new THREE.Vector2(0, 0),
  new THREE.Vector2(0.4, 0),
  new THREE.Vector2(0.2, 1),
  new THREE.Vector2(1, 1),
);
const ease = (t: number) => premium.getPoint(THREE.MathUtils.clamp(t, 0, 1)).y;

const ENTRANCE = 1.1; // seconds — "dramatic reveal" band
const DELAY = 0.15;

/**
 * Both brand paths are pure absolute move/line/close polygons, so parsing them
 * by hand is cheaper and more predictable than pulling in SVGLoader. The SVG
 * y-axis points down and three's points up, hence the negation.
 */
function shapeFromPath(d: string) {
  const points = [...d.matchAll(/([ML])\s*(-?[\d.]+)[\s,]+(-?[\d.]+)/g)].map(
    (m) => new THREE.Vector2(Number(m[2]), -Number(m[3])),
  );
  const shape = new THREE.Shape(points);
  shape.autoClose = true;
  return shape;
}

function useExtruded(d: string) {
  return useMemo(() => {
    const geometry = new THREE.ExtrudeGeometry(shapeFromPath(d), {
      depth: 26,
      bevelEnabled: true,
      bevelThickness: 4,
      bevelSize: 3,
      bevelSegments: 4,
    });
    return geometry;
  }, [d]);
}

type HalfProps = {
  d: string;
  color: string;
  /** Where the half starts, in local units, before it locks into place. */
  from: number;
  /** Its resting offset, so the two halves reassemble into the full mark. */
  to: number;
  metalness: number;
  roughness: number;
  reduced: boolean;
};

function Half({ d, color, from, to, metalness, roughness, reduced }: HalfProps) {
  const geometry = useExtruded(d);
  const mesh = useRef<THREE.Mesh>(null);
  const material = useRef<THREE.MeshStandardMaterial>(null);

  useFrame(({ clock }) => {
    if (!mesh.current || !material.current) return;
    const t = reduced ? 1 : ease((clock.elapsedTime - DELAY) / ENTRANCE);

    mesh.current.position.x = THREE.MathUtils.lerp(from, to, t);
    // secondary: the tilt each half carries in unwinds as it arrives
    mesh.current.rotation.y = THREE.MathUtils.lerp(Math.sign(from) * 0.9, 0, t);
    material.current.opacity = t;
  });

  return (
    <mesh ref={mesh} geometry={geometry} castShadow>
      <meshStandardMaterial
        ref={material}
        color={color}
        metalness={metalness}
        roughness={roughness}
        transparent
        opacity={0}
      />
    </mesh>
  );
}

/** Ambient layer: everything below drifts as one body, so the mark stays whole. */
function Rig({ reduced }: { reduced: boolean }) {
  const group = useRef<THREE.Group>(null);
  const { pointer } = useThree();

  useFrame(({ clock }, delta) => {
    if (!group.current || reduced) return;
    const settled = ease((clock.elapsedTime - DELAY - ENTRANCE) / 0.6);
    const drift = Math.sin(clock.elapsedTime * 0.45) * 0.12;
    const k = 1 - Math.pow(0.001, delta); // frame-rate independent damping

    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      (drift + pointer.x * 0.45) * settled,
      k,
    );
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      -pointer.y * 0.28 * settled,
      k,
    );
  });

  return (
    <group ref={group}>
      {/* the artwork lives in SVG space (320x414, y already flipped); this
          re-centres both halves as one body without disturbing their fit */}
      <group position={[-160, 207, -13]}>
        <Half
          d={NORDIA_PATH_LIGHT}
          color="#f5f4f3"
          from={-260}
          to={0}
          metalness={0.15}
          roughness={0.35}
          reduced={reduced}
        />
        <Half
          d={NORDIA_PATH_DARK}
          color="#121110"
          from={260}
          to={0}
          metalness={0.55}
          roughness={0.3}
          reduced={reduced}
        />
      </group>
    </group>
  );
}

export function NordiaMark3D({ className }: { className?: string }) {
  const [reduced] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0, 620], fov: 40 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={1.1} />
        <directionalLight position={[-320, 340, 480]} intensity={2.4} />
        <directionalLight position={[420, -180, 260]} intensity={1.1} color="#ffb98d" />
        <Rig reduced={reduced} />
      </Canvas>
    </div>
  );
}

export default NordiaMark3D;
