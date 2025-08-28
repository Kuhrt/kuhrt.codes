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
  const [opacity, setOpacity] = useState(0.5);

  const velocity = useMemo(
    () =>
      new Vector3(
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02
      ),
    []
  );

  // TODO: Use delta time where needed
  useFrame((state, delta) => {
    // Give the mouse gravity
    const mouseAttraction = new Vector3(
      mousePosition.x * 25,
      mousePosition.y * 15,
      0
    );

    const distance = ref.current.position.distanceTo(mouseAttraction);
    const interactionDistance = 15;

    // Only interact if the mouse has moved (Defaults to 0,0)
    // TODO: "Let go" of interactions if mouse is at the edge of the section
    if (
      mousePosition.x !== 0 &&
      mousePosition.y !== 0 &&
      distance < interactionDistance
    ) {
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
    ref.current.position.add(velocity.clone().multiplyScalar(delta * 60));

    // Boundaries
    const maxDistance = 25;
    const fadeStartDistance = maxDistance * 0.6;
    const calculateAxisOpacity = (distance: number) => {
      const fadeProgress =
        (distance - fadeStartDistance) / (maxDistance - fadeStartDistance);
      return Math.max(0, 1 - fadeProgress);
    };

    const horizontalDistance = Math.abs(ref.current.position.x);
    const verticalDistance = Math.abs(ref.current.position.y);
    const depthDistance = Math.abs(ref.current.position.z);

    // Multipliers for each axis
    let horizontalOpacity = 1;
    let verticalOpacity = 1;
    let depthOpacity = 1;

    if (horizontalDistance > fadeStartDistance) {
      horizontalOpacity = calculateAxisOpacity(horizontalDistance);
    }

    if (verticalDistance > fadeStartDistance) {
      verticalOpacity = calculateAxisOpacity(verticalDistance);
    }

    if (depthDistance > fadeStartDistance) {
      depthOpacity = calculateAxisOpacity(depthDistance);
    }

    const minimumOpacity = Math.min(
      horizontalOpacity,
      verticalOpacity,
      depthOpacity
    );
    setOpacity(0.5 * minimumOpacity);

    // Check boundary
    ['x', 'y', 'z'].forEach((axis) => {
      const axisProp = axis as 'x' | 'y' | 'z';
      if (Math.abs(ref.current.position[axisProp]) > maxDistance) {
        // Bounce back with reduced velocity
        velocity[axisProp] *= -0.8;

        ref.current.position[axisProp] =
          Math.sign(ref.current.position[axisProp]) * maxDistance;
      }
    });

    const rotationSpeed = isInteracting ? 0.03 : 0.01;
    ref.current.rotation.x += rotationSpeed * delta * 60;
    ref.current.rotation.y += rotationSpeed * delta * 60;

    // Always face camera
    ref.current.lookAt(state.camera.position);
  });

  // Turn text symbol into a texture
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    if (!context) return null;

    const canvasSize = 256;
    canvas.width = canvasSize;
    canvas.height = canvasSize;

    context.fillStyle = COLOR_PRIMARY;
    context.font = `bold 160px ${FONT_MONO}`;
    context.textAlign = 'center';
    context.textBaseline = 'middle';

    context.fillText(symbol, canvasSize / 2, canvasSize / 2);

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
    <mesh {...rest} ref={ref}>
      <planeGeometry args={[2, 2]} />
      <meshBasicMaterial
        color={COLOR_PRIMARY}
        alphaTest={0.1}
        map={texture}
        transparent
        opacity={opacity}
      />
    </mesh>
  );
}
