import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, ContactShadows, OrbitControls, useGLTF, Center } from "@react-three/drei";
import * as THREE from "three";
import canAsset from "../assets/FinalCan2.glb.asset.json";

const CAN_URL = canAsset.url;

function GlbCan({ autoRotate = true }: { autoRotate?: boolean }) {
  const group = useRef<THREE.Group>(null);
  const { scene } = useGLTF(CAN_URL);
  useFrame((_, dt) => {
    if (autoRotate && group.current) group.current.rotation.y += dt * 0.35;
  });
  return (
    <Center>
      <group ref={group}>
        <primitive object={scene} />
      </group>
    </Center>
  );
}

useGLTF.preload(CAN_URL);

type Props = {
  tint?: string;
  interactive?: boolean;
  className?: string;
};

export function CanModel({ interactive = false, className }: Props) {
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
        <directionalLight position={[-4, 2, -2]} intensity={0.4} />
        <Suspense fallback={null}>
          <GlbCan autoRotate={!interactive} />
          <ContactShadows position={[0, -1.25, 0]} opacity={0.35} scale={5} blur={2.4} far={3} />
          <Environment preset="studio" />
        </Suspense>
        {interactive && (
          <OrbitControls
            enablePan={false}
            enableZoom={false}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI / 1.8}
          />
        )}
      </Canvas>
    </div>
  );
}
