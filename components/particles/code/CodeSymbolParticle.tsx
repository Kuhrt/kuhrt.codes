'use client';

import { type ThreeElements, useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef, useState } from 'react';
import { CanvasTexture, type Mesh, Vector2, Vector3 } from 'three';

import { COLOR_PRIMARY } from '@/constants/colors';
import { FONT_MONO } from '@/constants/fonts';

interface Props {
  mousePosition: Vector2;
  symbol: string;
}

export default function CodeSymbolParticle(
  props: Props & ThreeElements['mesh']
) {
  const ref = useRef<Mesh>(null!);
  const { mousePosition, symbol, ...rest } = props;

  const [isInteracting, setIsInteracting] = useState(false);

  const velocity = useMemo(
    () =>
      new Vector3(
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02
      ),
    []
  );

  useFrame((state) => {
    // Mouse interaction
    const mouseAttraction = new Vector3(
      mousePosition.x * 25,
      mousePosition.y * 15,
      0
    );

    const distance = ref.current.position.distanceTo(mouseAttraction);
    const interactionDistance = 15;

    if (distance < interactionDistance) {
      setIsInteracting(true);

      const force = Math.max(0.0005, (interactionDistance - distance) * 0.0001);
      const direction = mouseAttraction
        .clone()
        .sub(ref.current.position)
        .normalize();

      velocity.add(direction.multiplyScalar(force));

      if (distance < 5) {
        velocity.add(direction.multiplyScalar(0.01));
      }
    } else {
      setIsInteracting(false);
    }

    // Position
    ref.current.position.add(velocity);

    // Check boundary with bounce
    ['x', 'y', 'z'].forEach((axis) => {
      const axisProp = axis as 'x' | 'y' | 'z';
      if (Math.abs(ref.current.position[axisProp]) > 25) {
        velocity[axisProp] *= -0.8;
        ref.current.position[axisProp] =
          Math.sign(ref.current.position[axisProp]) * 25;
      }
    });

    const rotationSpeed = isInteracting ? 0.03 : 0.01;
    ref.current.rotation.x += rotationSpeed;
    ref.current.rotation.y += rotationSpeed;

    // Always face camera
    ref.current.lookAt(state.camera.position);
  });

  const texture = useMemo(() => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    if (!context) return null;

    // Set canvas size
    const canvasSize = 128;
    canvas.width = canvasSize;
    canvas.height = canvasSize;

    context.fillStyle = COLOR_PRIMARY;
    context.font = `bold 80px ${FONT_MONO}`;
    context.textAlign = 'center';
    context.textBaseline = 'middle';

    // Clear canvas and draw text
    context.fillText(symbol, canvasSize / 2, canvasSize / 2);

    // Create and return texture
    return new CanvasTexture(canvas);
  }, [symbol]);

  // Cleanup texture when component unmounts
  useEffect(() => {
    return () => {
      if (!!texture) {
        texture.dispose();
      }
    };
  }, [texture]);

  return (
    <group>
      <mesh {...rest} ref={ref}>
        <planeGeometry args={[2, 2]} />
        <meshBasicMaterial
          color={COLOR_PRIMARY}
          alphaTest={0.1}
          map={texture}
          transparent
          opacity={0.5}
        />
      </mesh>
    </group>
  );
}
