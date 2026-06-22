import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, ContactShadows, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

/**
 * Interactive 3D can.
 *
 * TODO (when you have the GLB):
 *   1. Drop your model at: public/models/can.glb
 *   2. Replace <PlaceholderCan /> with <GlbCan />
 *   3. Uncomment the useGLTF lines below.
 *
 * import { useGLTF } from "@react-three/drei";
 * function GlbCan(props: JSX.IntrinsicElements["group"]) {
 *   const { scene } = useGLTF("/models/can.glb");
 *   return <primitive object={scene} {...props} />;
 * }
 * useGLTF.preload("/models/can.glb");
 */

function PlaceholderCan({ tint = "#7ac142" }: { tint?: string }) {
  const group = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (group.current) group.current.rotation.y += dt * 0.4;
  });
  return (
    <group ref={group}>
      {/* body */}
      <mesh castShadow position={[0, 0, 0]}>
        <cylinderGeometry args={[0.55, 0.55, 2.2, 64, 1, false]} />
        <meshPhysicalMaterial
          color="#fafafa"
          roughness={0.35}
          metalness={0.15}
          clearcoat={0.6}
          clearcoatRoughness={0.2}
        />
      </mesh>
      {/* top rim */}
      <mesh position={[0, 1.12, 0]}>
        <cylinderGeometry args={[0.5, 0.55, 0.08, 64]} />
        <meshStandardMaterial color="#c9c9c9" metalness={0.9} roughness={0.25} />
      </mesh>
      {/* bottom flavor band */}
      <mesh position={[0, -1.08, 0]}>
        <cylinderGeometry args={[0.555, 0.555, 0.12, 64]} />
        <meshStandardMaterial color={tint} roughness={0.45} />
      </mesh>
    </group>
  );
}

type Props = {
  tint?: string;
  interactive?: boolean;
  className?: string;
};

export function CanModel({ tint, interactive = false, className }: Props) {
  return (
    <div className={className}>
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 0.4, 4.2], fov: 32 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 5, 4]} intensity={1.2} castShadow />
        <Suspense fallback={null}>
          <PlaceholderCan tint={tint} />
          <ContactShadows position={[0, -1.25, 0]} opacity={0.35} scale={5} blur={2.4} far={3} />
          <Environment preset="studio" />
        </Suspense>
        {interactive && <OrbitControls enablePan={false} enableZoom={false} />}
      </Canvas>
    </div>
  );
}
