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

import CAN_LEMON from "../assets/HighBall_Lemon3.glb?url";
import CAN_YUZU from "../assets/final22.glb?url";
import CAN_GINGER from "../assets/HighBall_Ginger3.glb?url";

export type FlavorKey = "lemon" | "yuzu" | "ginger";

const CAN_MODELS: Record<FlavorKey, string> = {
  lemon: CAN_LEMON,
  yuzu: CAN_YUZU,
  ginger: CAN_GINGER,
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
        shadows
        dpr={[1, 2]}
        camera={{
          position: [0, 0.2, 5.8],
          fov: 32,
        }}
        gl={{
          antialias: true,
          alpha: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 0.9,
        }}
      >
        <ambientLight intensity={0.35} color="#ffffff" />

        <directionalLight
          position={[4, 6, 3]}
          intensity={0.95}
          castShadow
          color="#ffffff"
        />

        <directionalLight
          position={[-3, 2, -3]}
          intensity={0.3}
          color="#ffffff"
        />

        <spotLight
          position={[0, 4, 2]}
          intensity={0.5}
          penumbra={0.6}
          color="#ffffff"
          castShadow
        />

        <pointLight
          position={[2, 3, 2]}
          intensity={0.3}
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
            preset="studio"
            environmentIntensity={0.55}
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