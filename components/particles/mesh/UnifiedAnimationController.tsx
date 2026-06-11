'use client';

import { useFrame } from '@react-three/fiber';
import { RefObject, useEffect, useRef } from 'react';
import { PerspectiveCamera } from 'three';

import useCapabilityInteractionStore from '@/stores/particles/mesh/capabilityInteractionStore';
import useMeshAnimationStore from '@/stores/particles/mesh/meshAnimationStore';
import useMeshHoverStore from '@/stores/particles/mesh/meshHoverStore';

interface Props {
  camera: PerspectiveCamera;
  connectionsGroupRef: RefObject<{
    updateConnections: () => void;
  } | null>;
}

export default function UnifiedAnimationController({
  camera,
  connectionsGroupRef
}: Props) {
  const { isAnimating, isPaused } = useMeshAnimationStore();
  const { isZoomed, zoomTarget, zoomLookAt } = useCapabilityInteractionStore();
  const { hoveredNodeId } = useMeshHoverStore();

  const timeRef = useRef(0);
  const isInitialized = useRef(false);

  // Initialize camera position
  useEffect(() => {
    if (!isInitialized.current) {
      camera.position.set(0, 0, 30);
      camera.lookAt(0, 0, 0);
      isInitialized.current = true;
    }
  }, [camera]);

  // Handle hover state changes - pause animation when hovering
  useEffect(() => {
    if (hoveredNodeId && !isZoomed) {
      useMeshAnimationStore.getState().pauseAnimation();
    } else if (!hoveredNodeId && !isZoomed && !isAnimating) {
      useMeshAnimationStore.getState().resumeAnimation();
    }
  }, [hoveredNodeId, isZoomed, isAnimating]);

  useFrame((state, delta) => {
    if (isZoomed && zoomTarget && zoomLookAt) {
      camera.position.lerp(zoomTarget, 0.08);
      camera.lookAt(zoomLookAt);
    } else if (!isZoomed && !isPaused) {
      timeRef.current += delta;
      const cameraTime = timeRef.current * 0.2;
      camera.position.set(
        Math.sin(cameraTime) * 28,
        8 + Math.sin(cameraTime * 0.7) * 4,
        Math.cos(cameraTime) * 28
      );
      camera.lookAt(0, 0, 0);

      // Update connection lines to follow nodes
      if (connectionsGroupRef.current?.updateConnections) {
        connectionsGroupRef.current.updateConnections();
      }
    }
  });

  return null;
}
