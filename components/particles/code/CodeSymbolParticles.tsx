'use client';

import { ReactNode, useEffect, useState } from 'react';
import { Vector2, Vector3 } from 'three';

import { threeSectionMouseMove } from '@/utils/three';

import ParticleScene from '../ParticleScene';
import CodeSymbolParticle from './CodeSymbolParticle';

const SYMBOLS = ['{', '}', '(', ')', '[', ']', '<', '>', ';', '=', '+', '-'];
const SYMBOL_MULTIPLIER = 5;

function generateParticles(mousePosition: Vector2): ReactNode[] {
  return SYMBOLS.flatMap((symbol) => {
    const particleNodes: ReactNode[] = [];
    for (let i = 0; i < SYMBOL_MULTIPLIER; i++) {
      // Random position
      const positionX = (Math.random() - 0.5) * 50;
      const positionY = (Math.random() - 0.5) * 30;
      const positionZ = (Math.random() - 0.5) * 30;

      // Random rotation
      const rotationX = Math.random() * Math.PI;
      const rotationY = Math.random() * Math.PI;

      particleNodes.push(
        <CodeSymbolParticle
          key={`${symbol}-${i}`}
          mousePosition={mousePosition}
          position={new Vector3(positionX, positionY, positionZ)}
          rotateX={rotationX}
          rotateY={rotationY}
          symbol={symbol}
        />
      );
    }

    return particleNodes;
  });
}

export default function CodeSymbolParticles() {
  const [particles, setParticles] = useState<ReactNode[]>([]);

  useEffect(() => {
    const mousePosition = new Vector2();

    const handleMouseMove = (event: MouseEvent) => {
      threeSectionMouseMove(event, mousePosition);
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Particles are random, so they're generated after mount — and outside the
    // synchronous effect body to avoid a cascading re-render
    const frame = requestAnimationFrame(() => {
      setParticles(generateParticles(mousePosition));
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <ParticleScene cameraPosition={new Vector3(0, 0, 25)}>
      <group>{particles.map((particle) => particle)}</group>
    </ParticleScene>
  );
}
