import { createContext, useContext } from 'react';
import { PerspectiveCamera } from 'three';

export const CameraContext = createContext<PerspectiveCamera | null>(null);

export const useCamera = () => {
  const context = useContext(CameraContext);
  if (!context) {
    throw new Error('useCamera must be used within ParticleScene');
  }
  return context;
};
