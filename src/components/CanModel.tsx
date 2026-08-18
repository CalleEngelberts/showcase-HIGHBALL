'use client';
import { Suspense, useEffect, useState } from "react";
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

const yuzu = {
  name: "Yuzu",
  hex: "#7ac142",
  stats: { calories: 105, sugar: "2g", sweetness: 3, sour: 3, bitterness: 3, refreshing: 5 },
};

function GlbCan({ flavor }: { flavor: FlavorKey }) {
  const modelUrl = CAN_MODELS[flavor];
  const { scene } = useGLTF(modelUrl);

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
  const [showInfo, setShowInfo] = useState(false);

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
          toneMappingExposure: 0.75,
        }}
      >
        <ambientLight intensity={0.28} color="#ffffff" />

        <directionalLight
          position={[4, 6, 3]}
          intensity={0.75}
          castShadow
          color="#ffffff"
        />

        <directionalLight
          position={[-3, 2, -3]}
          intensity={0.2}
          color="#ffffff"
        />

        <spotLight
          position={[0, 4, 2]}
          intensity={0.4}
          penumbra={0.6}
          color="#ffffff"
          castShadow
        />

        <pointLight
          position={[2, 3, 2]}
          intensity={0.25}
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
            environmentIntensity={0.45}
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

      <button
        onClick={() => setShowInfo(!showInfo)}
        className="absolute top-4 right-4 z-20 text-2xl hover:opacity-70 transition"
        title="Product info"
      >
        <span className="text-white">ℹ</span>
      </button>

      {showInfo && (
        <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none">
          <div
            className="pointer-events-auto bg-card text-card-foreground rounded-2xl p-8 shadow-lg w-80 animate-in slide-in-from-bottom-4 duration-300 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowInfo(false)}
              className="absolute top-6 right-6 text-xl hover:opacity-50 transition text-foreground"
            >
              ✕
            </button>

            <h3 className="text-2xl font-display mb-6" style={{ color: yuzu.hex }}>
              {yuzu.name}
            </h3>

            <div className="space-y-4">
              <div>
                <p className="text-xs text-card-foreground/60 uppercase tracking-wide">Calories</p>
                <p className="text-lg font-semibold">{yuzu.stats.calories} kcal</p>
              </div>

              <div>
                <p className="text-xs text-card-foreground/60 uppercase tracking-wide">Sugar</p>
                <p className="text-lg font-semibold">{yuzu.stats.sugar}</p>
              </div>

              <div>
                <p className="text-xs text-card-foreground/60 uppercase tracking-wide">Sweetness</p>
                <p className="text-lg font-semibold">{yuzu.stats.sweetness}/5</p>
              </div>

              <div>
                <p className="text-xs text-card-foreground/60 uppercase tracking-wide">Sourness</p>
                <p className="text-lg font-semibold">{yuzu.stats.sour}/5</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {showInfo && (
        <div
          className="absolute inset-0 z-10 bg-black/20"
          onClick={() => setShowInfo(false)}
        />
      )}
    </div>
  );
}