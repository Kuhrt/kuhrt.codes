'use client';

import { Canvas } from '@react-three/fiber';
import { createContext, useContext, useEffect, useMemo } from 'react';
import { PerspectiveCamera, Vector3 } from 'three';

import { cn } from '@/utils/styles';
import { getCameraAspect } from '@/utils/three';

// Camera context for components to access the camera
const CameraContext = createContext<PerspectiveCamera | null>(null);

export const useCamera = () => {
  const context = useContext(CameraContext);
  if (!context) {
    throw new Error('useCamera must be used within ParticleScene');
  }
  return context;
};

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
