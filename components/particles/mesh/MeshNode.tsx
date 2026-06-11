'use client';

import { useEffect, useRef } from 'react';
import { type Mesh, type MeshBasicMaterial } from 'three';

interface Props {
  nodeIndex: number;
  onRef: (mesh: Mesh | null) => void;
}

export default function MeshNode({ nodeIndex, onRef }: Props) {
  const meshRef = useRef<Mesh>(null!);
  const materialRef = useRef<MeshBasicMaterial>(null!);
  // Only read by the pulse interval, never rendered — a ref avoids re-renders
  const floatOffsetRef = useRef(0);

  useEffect(() => {
    if (meshRef.current) {
      // Random position
      meshRef.current.position.x = (Math.random() - 0.5) * 35;
      meshRef.current.position.y = (Math.random() - 0.5) * 20;
      meshRef.current.position.z = (Math.random() - 0.5) * 35;

      floatOffsetRef.current = nodeIndex * 0.3 + Math.random() * 2;
    }
  }, [nodeIndex]);

  useEffect(() => {
    if (meshRef.current) {
      onRef(meshRef.current);
    }

    return () => {
      onRef(null);
    };
  }, [onRef]);

  // Pulse effect for opacity
  useEffect(() => {
    const interval = setInterval(() => {
      if (materialRef.current) {
        const time = Date.now() * 0.002;
        const pulse = Math.sin(time + floatOffsetRef.current) * 0.2 + 0.6;
        materialRef.current.opacity = pulse * 0.4;
      }
    }, 16); // ~60fps

    return () => clearInterval(interval);
  }, []);

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.15, 16, 16]} />
      <meshBasicMaterial
        ref={materialRef}
        color={0x00ff88}
        transparent
        opacity={0.4}
      />
    </mesh>
  );
}
