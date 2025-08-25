'use client';

import { Canvas } from '@react-three/fiber';
import { Vector3 } from 'three';

interface Props {
  cameraPosition?: Vector3;
  children: React.ReactNode;
}

export default function ParticleScene({
  cameraPosition = new Vector3(0, 0, 10),
  children
}: Props) {
  const canvasAspect =
    typeof window === 'undefined' ? 1 : window.innerWidth / window.innerHeight;
  return (
    <Canvas
      camera={{
        fov: 75,
        near: 0.1,
        far: 1000,
        aspect: canvasAspect,
        position: cameraPosition
      }}
      className="!absolute top-0 left-0 z-10"
    >
      {children}
      <ambientLight intensity={1} />
    </Canvas>
  );
}
