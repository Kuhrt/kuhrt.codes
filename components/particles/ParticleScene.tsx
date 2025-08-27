'use client';

import { Canvas } from '@react-three/fiber';
import { useEffect, useMemo } from 'react';
import { PerspectiveCamera, Vector3 } from 'three';

import { CameraContext } from '@/contexts/ParticleCameraContext';
import { cn } from '@/utils/styles';
import { getCameraAspect } from '@/utils/three';

interface Props {
  cameraPosition?: Vector3;
  children: React.ReactNode;
  className?: string;
}

export default function ParticleScene({
  cameraPosition = new Vector3(0, 0, 10),
  children,
  className
}: Props) {
  const camera = useMemo(() => {
    const newCamera = new PerspectiveCamera(75, getCameraAspect(), 0.1, 1000);
    newCamera.position.set(
      cameraPosition.x,
      cameraPosition.y,
      cameraPosition.z
    );
    return newCamera;
  }, [cameraPosition]);

  useEffect(() => {
    if (!camera) return;

    const handleResize = () => {
      camera.aspect = getCameraAspect();
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [camera]);

  if (!camera) return null;
  return (
    <Canvas
      camera={camera}
      className={cn('!absolute top-0 left-0 z-50', className)}
    >
      <CameraContext.Provider value={camera}>
        {children}
        <ambientLight intensity={1} />
      </CameraContext.Provider>
    </Canvas>
  );
}
