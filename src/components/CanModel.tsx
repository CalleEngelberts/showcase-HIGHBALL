import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Environment,
  ContactShadows,
  OrbitControls,
  useGLTF,
  Center,
} from "@react-three/drei";
import * as THREE from "three";

import CAN_LEMON from "../assets/HighBall_Lemon2.glb?url";
import CAN_YUZU from "../assets/ClaudeBlenderFile2.glb?url";
import CAN_GINGER from "../assets/HighBall_Ginger2.glb?url";

export type FlavorKey = "lemon" | "yuzu" | "ginger";

const CAN_MODELS: Record<FlavorKey, string> = {
  lemon: CAN_LEMON,
  yuzu: CAN_YUZU,
  ginger: CAN_GINGER,
};

function GlbCan({ flavor }: { flavor: FlavorKey }) {
  const modelUrl = CAN_MODELS[flavor];
  const { scene } = useGLTF(modelUrl);

  return (
    <Center>
      <primitive object={scene} />
    </Center>
  );
}


useGLTF.preload(CAN_LEMON);
useGLTF.preload(CAN_YUZU);
useGLTF.preload(CAN_GINGER);

type Props = {
  className?: string;
  flavor: FlavorKey;
};

export function CanModel({ className, flavor }: Props) {
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
          toneMappingExposure: 0.85,
        }}
      >
        <ambientLight intensity={0.25} />

        <directionalLight
          position={[4, 6, 3]}
          intensity={0.8}
          castShadow
          color="#fff5e6"
        />

        <directionalLight
          position={[-3, 2, -3]}
          intensity={0.25}
          color="#e6f0ff"
        />

        <spotLight
          position={[0, 4, 0]}
          intensity={0.3}
          penumbra={0.8}
          color="#ffffff"
        />

        <pointLight
          position={[0, -2, 2]}
          intensity={0.15}
          color="#ffeacc"
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
            environmentIntensity={0.5}
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