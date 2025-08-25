'use client';

import { ReactNode, useEffect, useState } from 'react';
import { Vector2, Vector3 } from 'three';

import ParticleScene from '../ParticleScene';
import CodeSymbolParticle from './CodeSymbolParticle';

const SYMBOLS = ['{', '}', '(', ')', '[', ']', '<', '>', ';', '=', '+', '-'];
const SYMBOL_MULTIPLIER = 5;

export default function CodeSymbolParticles() {
  const [particles, setParticles] = useState<ReactNode[]>([]);

  useEffect(() => {
    const mousePosition = new Vector2();
    // TODO: Only do this with the section this is in
    const handleMouseMove = (event: MouseEvent) => {
      const normalizedX = (event.clientX / window.innerWidth) * 2 - 1;
      const normalizedY = -(event.clientY / window.innerHeight) * 2 + 1;
      mousePosition.set(normalizedX, normalizedY);
    };
    window.addEventListener('mousemove', handleMouseMove);

    setParticles(
      SYMBOLS.flatMap((symbol) => {
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
      })
    );

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <ParticleScene cameraPosition={new Vector3(0, 0, 25)}>
      {particles.map((particle) => particle)}
    </ParticleScene>
  );
}
