'use client';

import { Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Environment,
  ContactShadows,
  OrbitControls,
  useGLTF,
  Center,
} from "@react-three/drei";
import * as THREE from "three";

export type FlavorKey = "lemon" | "yuzu" | "ginger";

const CAN_MODELS: Record<FlavorKey, string> = {
  lemon: "/models/HighBall_Lemon3.glb",
  yuzu: "/models/HighBall_Yuzu_Final.glb",
  ginger: "/models/HighBall_Ginger3.glb",
};

function GlbCan({ flavor }: { flavor: FlavorKey }) {
  const modelUrl = CAN_MODELS[flavor];
  const { scene } = useGLTF(modelUrl);

  // Rotate 180 degrees around Y axis
  scene.rotation.y = Math.PI;

  return (
    <Center>
      <primitive object={scene} />
    </Center>
  );
}

type Props = {
  className?: string;
  flavor: FlavorKey;
};

export function CanModel({ className, flavor }: Props) {
  // Lazy load
  useEffect(() => {
    useGLTF.preload(CAN_MODELS[flavor]);
  }, [flavor]);

  return (
    <div className={className}>
      <Canvas
        shadows={{ type: THREE.PCFShadowMap }}
        dpr={[1, 2]}
        camera={{
          position: [0, 0.2, 5.8],
          fov: 32,
        }}
        gl={{
          antialias: true,
          alpha: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 0.75,  // ← Increased from 0.6
        }}
      >
        <ambientLight intensity={0.28} color="#ffffff" />

        <directionalLight
          position={[4, 6, 3]}
          intensity={0.75}  // ← Increased from 0.6
          castShadow
          color="#ffffff"
        />

        <directionalLight
          position={[-3, 2, -3]}
          intensity={0.2}  // ← Increased from 0.15
          color="#ffffff"
        />

        <spotLight
          position={[0, 4, 2]}
          intensity={0.4}  // ← Increased from 0.3
          penumbra={0.6}
          color="#ffffff"
          castShadow
        />

        <pointLight
          position={[2, 3, 2]}
          intensity={0.25}  // ← Increased from 0.15
          color="#ffffff"
        />

        <Suspense fallback={null}>
          <GlbCan key={flavor} flavor={flavor} />

          <ContactShadows
            position={[0, -1.25, 0]}
            opacity={0.25}
            scale={6}
            blur={2.8}
            far={3}
          />

          <Environment
            files="/hdri/studio_small_03_1k.hdr"
            environmentIntensity={0.45}  // ← Increased from 0.35
          />
        </Suspense>

        <OrbitControls
          enablePan={false}
          enableZoom={true}
          minDistance={3.5}
          maxDistance={10}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.8}
        />
      </Canvas>
    </div>
  );
}