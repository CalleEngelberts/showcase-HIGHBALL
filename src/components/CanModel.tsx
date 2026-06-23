import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, ContactShadows, OrbitControls, useGLTF, Center } from "@react-three/drei";
import * as THREE from "three";
import CAN_URL from "../assets/FinalCan3.glb?url";



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
        camera={{ position: [0, 0.2, 5.8], fov: 32 }}
        gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.1 }}
      >
        <ambientLight intensity={0.45} />
        <directionalLight position={[4, 6, 3]} intensity={1.6} castShadow color="#fff5e6" />
        <directionalLight position={[-3, 2, -3]} intensity={0.5} color="#e6f0ff" />
        <spotLight position={[0, 4, 0]} intensity={0.6} angle={Math.PI / 4} penumbra={0.8} color="#ffffff" />
        <pointLight position={[0, -2, 2]} intensity={0.3} color="#ffeacc" />
        <Suspense fallback={null}>
          <GlbCan autoRotate={!interactive} />
          <ContactShadows position={[0, -1.25, 0]} opacity={0.25} scale={6} blur={2.8} far={3} />
          <Environment preset="studio" environmentIntensity={0.8} />
        </Suspense>
        {interactive && (
          <OrbitControls
            enablePan={false}
            enableZoom={true}
            minDistance={3.5}
            maxDistance={10}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI / 1.8}
          />
        )}
      </Canvas>
    </div>
  );
}
